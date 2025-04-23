// app/api/stripe/webhook/route.ts

import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed." },
      { status: 400 },
    );
  }

  const supabase = await createClient();

  try {
    // Implement idempotency protection
    // Check if this event has already been processed
    const { data: existingEvent } = await supabase
      .from("stripe_events")
      .select("id")
      .eq("stripe_event_id", event.id)
      .single();

    if (existingEvent) {
      // Event already processed - return success to avoid retries
      console.log(`Event ${event.id} already processed, skipping.`);
      return NextResponse.json({ received: true, idempotent: true });
    }

    // Process the event based on its type
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSession(session, supabase);
        break;
      }
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment failed:", paymentIntent.id);
        // We don't need to handle this specifically as our system
        // only grants access after confirmed payment
        break;
      }
      case "customer.created":
      case "customer.updated": {
        const customer = event.data.object as Stripe.Customer;
        await syncCustomerData(customer, supabase);
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Record this event as processed to prevent duplicate processing
    await supabase.from("stripe_events").insert({
      stripe_event_id: event.id,
      event_type: event.type,
      processed_at: new Date().toISOString(),
      event_data: JSON.stringify(event.data.object),
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(`Error processing webhook event ${event.id}:`, error);

    // Return 200 to acknowledge receipt (prevents Stripe retries)
    return NextResponse.json(
      { received: true, error: "Processing error occurred but was logged" },
      { status: 200 },
    );
  }
}

async function handleCheckoutSession(
  session: Stripe.Checkout.Session,
  supabase: any,
) {
  if (!session?.metadata?.user_id) {
    throw new Error("User ID not found in session metadata");
  }

  const userId = session.metadata.user_id;
  const productType = session.metadata.product_type;
  const licenseType = session.metadata.license_type;
  const productId = session.metadata.product_id;
  const productTitle = session.metadata.product_title || "";

  // Store the purchase data in the paid_users table
  const { error: paidUserError } = await supabase.from("paid_users").insert({
    user_id: userId,
    stripe_checkout_session_id: session.id,
    payment_status: session.payment_status,
    purchase_date: new Date().toISOString(),
    amount_paid: session.amount_total ? session.amount_total / 100 : 0,
    email: session.customer_details?.email || null,
    product_type: productType,
    product_id: productId || null,
    license_type: licenseType || null,
  });

  if (paidUserError) {
    throw new Error(`Failed to save paid user data: ${paidUserError.message}`);
  }

  // Handle different purchase types
  if (productType === "lifetime") {
    // Update user profile for lifetime access
    const { error: profileError } = await supabase
      .from("user_profiles")
      .upsert({
        user_id: userId,
        has_lifetime_access: true,
        access_granted_date: new Date().toISOString(),
      });

    if (profileError) {
      throw new Error(`Failed to update user profile: ${profileError.message}`);
    }

    // If this is a team license, create a team license entry
    if (licenseType === "team") {
      const { error: teamLicenseError } = await supabase
        .from("team_licenses")
        .insert({
          owner_user_id: userId,
          stripe_checkout_session_id: session.id,
          purchase_date: new Date().toISOString(),
          max_seats: 20, // From your pricing config
          used_seats: 0,
        });

      if (teamLicenseError) {
        throw new Error(
          `Failed to create team license: ${teamLicenseError.message}`,
        );
      }
    }
  } else if (productType === "template" && productId) {
    // Add template access for individual template purchase
    const { error: templateError } = await supabase
      .from("user_templates")
      .insert({
        user_id: userId,
        template_id: productId,
        purchase_date: new Date().toISOString(),
        stripe_checkout_session_id: session.id,
      });

    if (templateError) {
      throw new Error(
        `Failed to save template access: ${templateError.message}`,
      );
    }
  }
}

async function syncCustomerData(customer: Stripe.Customer, supabase: any) {
  // Skip if the customer has no metadata
  if (!customer.metadata?.supabase_user_id) {
    return;
  }

  const userId = customer.metadata.supabase_user_id;

  // Update the user's stripe_customer_id if needed
  await supabase.from("user_profiles").upsert({
    user_id: userId,
    stripe_customer_id: customer.id,
  });
}
