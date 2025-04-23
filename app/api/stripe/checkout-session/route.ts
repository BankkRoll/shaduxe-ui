// app/api/stripe/checkout-session/route.ts

import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const session_id = searchParams.get("session_id");

  if (!session_id) {
    return NextResponse.json(
      { error: "Session ID is required" },
      { status: 400 },
    );
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }

    // Get the purchase record
    const { data: purchase, error: purchaseError } = await supabase
      .from("paid_users")
      .select(
        `
        *,
        user_profiles!inner (
          has_lifetime_access,
          access_granted_date
        )
      `,
      )
      .eq("stripe_checkout_session_id", session_id)
      .eq("user_id", user.id)
      .single();

    if (purchaseError || !purchase) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // If this was a template purchase, get template details
    let templateDetails = null;
    if (purchase.product_type === "template" && purchase.product_id) {
      const { data: template } = await supabase
        .from("templates")
        .select("name, description, price")
        .eq("id", purchase.product_id)
        .single();

      if (template) {
        templateDetails = template;
      }
    }

    return NextResponse.json({
      ...purchase,
      template: templateDetails,
    });
  } catch (err) {
    console.error("Error fetching session data:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
