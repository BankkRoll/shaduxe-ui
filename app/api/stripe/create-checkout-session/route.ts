// app/api/stripe/create-checkout-session/route.ts

import pricingConfig from "@/config/pricing";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();

    if (authError || !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { user, productType, licenseType, productId, price } =
      await req.json();

    if (!user?.email || user.id !== session.user.id) {
      return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
    }

    const headersList = await headers();
    const origin = headersList.get("origin") || headersList.get("host");
    const baseUrl = origin?.startsWith("http") ? origin : `https://${origin}`;

    // Get or create Stripe customer
    let stripeCustomerId: string;

    // Check if user already has a Stripe customer ID
    const { data: userProfile } = await supabase
      .from("user_profiles")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .single();

    if (userProfile?.stripe_customer_id) {
      // Use existing Stripe customer
      stripeCustomerId = userProfile.stripe_customer_id;

      // Update customer email if needed
      await stripe.customers.update(stripeCustomerId, {
        email: user.email,
      });
    } else {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id,
        },
      });

      stripeCustomerId = customer.id;

      // Store Stripe customer ID in user profile
      await supabase.from("user_profiles").upsert({
        user_id: user.id,
        stripe_customer_id: stripeCustomerId,
      });
    }

    // Determine price and product data based on product type and license type
    let priceData;
    let productTitle: string;

    if (productType === "lifetime") {
      const licenseConfig =
        licenseType === "personal"
          ? pricingConfig.pricing.personal
          : pricingConfig.pricing.team;

      productTitle = licenseConfig.title;

      priceData = {
        currency: "usd",
        product_data: {
          name: productTitle,
          description: `Lifetime access to all templates - ${licenseType} license`,
        },
        // Use price from the request if provided, otherwise use the default from config
        unit_amount: price || licenseConfig.basePrice,
      };
    } else if (productType === "template" && productId) {
      // Get template price from database
      const { data: template, error } = await supabase
        .from("templates")
        .select("name, description, price")
        .eq("id", productId)
        .single();

      if (error || !template) {
        return NextResponse.json(
          { error: "Template not found" },
          { status: 404 },
        );
      }

      productTitle = template.name;

      priceData = {
        currency: "usd",
        product_data: {
          name: productTitle,
          description: template.description || "Premium template",
        },
        unit_amount: template.price,
      };
    } else {
      return NextResponse.json(
        { error: "Invalid product type or missing product ID" },
        { status: 400 },
      );
    }

    // Create the checkout session with promotion code support
    const checkoutSessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: priceData,
          quantity: 1,
        },
      ],
      customer: stripeCustomerId,
      // Allow promotion codes directly in the Stripe Checkout UI
      allow_promotion_codes: true,
      success_url: `${baseUrl}/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/stripe/error`,
      metadata: {
        user_id: user.id,
        product_type: productType,
        license_type: licenseType || null,
        product_id: productId || null,
        product_title: productTitle,
        price: priceData.unit_amount.toString(),
      },
    };

    const checkoutSession = await stripe.checkout.sessions.create(
      checkoutSessionParams,
    );

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);

    // Enhanced error handling
    let errorMessage = "Internal Server Error";
    let statusCode = 500;

    if (error instanceof Stripe.errors.StripeError) {
      errorMessage = error.message;
      statusCode = error.statusCode || 500;
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
