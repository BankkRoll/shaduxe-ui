import { createClient } from "@/utils/supabase/server";

interface AccessCheckParams {
  userId: string;
  templateId?: string;
}

export async function checkUserAccess({
  userId,
  templateId,
}: AccessCheckParams): Promise<boolean> {
  try {
    const supabase = await createClient();

    const { data: userProfile } = await supabase
      .from("user_profiles")
      .select("has_lifetime_access")
      .eq("user_id", userId)
      .single();

    if (userProfile?.has_lifetime_access) {
      return true;
    }

    if (templateId) {
      const { data: userTemplate } = await supabase
        .from("user_templates")
        .select("id")
        .eq("user_id", userId)
        .eq("template_id", templateId)
        .maybeSingle();

      if (userTemplate) {
        return true;
      }
    }

    const { data: teamMemberships, error: teamError } = await supabase
      .from("team_members")
      .select("team_license_id")
      .eq("user_id", userId)
      .eq("status", "active");

    if (teamError || !teamMemberships || teamMemberships.length === 0) {
      return false;
    }

    const licenseIds = teamMemberships.map((m) => m.team_license_id);

    const { data: licenses, error: licenseError } = await supabase
      .from("team_licenses")
      .select("owner_user_id")
      .in("id", licenseIds);

    if (licenseError || !licenses || licenses.length === 0) {
      return false;
    }

    const ownerIds = [...new Set(licenses.map((l) => l.owner_user_id))];

    const { data: ownerProfile, error: ownerProfileError } = await supabase
      .from("user_profiles")
      .select("user_id")
      .in("user_id", ownerIds)
      .eq("has_lifetime_access", true)
      .limit(1)
      .maybeSingle();

    return !!ownerProfile;
  } catch (error) {
    console.error("Error checking user access:", error);
    return false;
  }
}
