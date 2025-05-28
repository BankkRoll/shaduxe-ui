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
    const { data: purchase, error: purchaseError } = await supabase
      .from("paid_users")
      .select(
        `
        *
      `,
      )
      .eq("stripe_checkout_session_id", session_id)
      .single();

    if (purchaseError || !purchase) {
      console.error("Purchase error:", purchaseError);
      return NextResponse.json(
        {
          error: "Session not found",
          details: purchaseError?.message,
        },
        { status: 404 },
      );
    }

    const { data: userProfile } = await supabase
      .from("user_profiles")
      .select("has_lifetime_access, access_granted_date")
      .eq("user_id", purchase.user_id)
      .single();

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

    let teamLicense = null;
    if (
      purchase.product_type === "lifetime" &&
      purchase.license_type === "team"
    ) {
      const { data: license } = await supabase
        .from("team_licenses")
        .select("max_seats, used_seats")
        .eq("stripe_checkout_session_id", session_id)
        .single();

      if (license) {
        teamLicense = license;
      }
    }

    return NextResponse.json({
      ...purchase,
      user_profile: userProfile || null,
      template: templateDetails,
      team_license: teamLicense,
    });
  } catch (err) {
    console.error("Error fetching session data:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: (err as Error).message },
      { status: 500 },
    );
  }
}
