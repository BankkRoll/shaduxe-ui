import { createClient } from "@/utils/supabase/server";

interface AccessCheckParams {
  userId: string;
  templateId?: string;
}

/**
 * Check if a user has access to a template or section
 * A user has access if:
 * 1. They have lifetime access
 * 2. They have purchased the specific template
 */
export async function checkUserAccess({
  userId,
  templateId,
}: AccessCheckParams): Promise<boolean> {
  try {
    const supabase = await createClient();

    // First check if user has lifetime access
    const { data: userProfile, error: profileError } = await supabase
      .from("user_profiles")
      .select("has_lifetime_access")
      .eq("user_id", userId)
      .single();

    if (userProfile?.has_lifetime_access) {
      return true; // User has lifetime access to everything
    }

    // If checking for a specific template, see if they purchased it
    if (templateId) {
      const { data: userTemplate, error: templateError } = await supabase
        .from("user_templates")
        .select("*")
        .eq("user_id", userId)
        .eq("template_id", templateId)
        .single();

      return !!userTemplate; // User has access if they purchased this template
    }

    return false; // No lifetime access and no specific template access
  } catch (error) {
    console.error("Error checking user access:", error);
    return false; // Default to no access on error
  }
}
