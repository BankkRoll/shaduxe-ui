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

    const { data: userProfile, error: profileError } = await supabase
      .from("user_profiles")
      .select("has_lifetime_access")
      .eq("user_id", userId)
      .single();

    if (userProfile?.has_lifetime_access) {
      return true; 
    }

    if (templateId) {
      const { data: userTemplate, error: templateError } = await supabase
        .from("user_templates")
        .select("*")
        .eq("user_id", userId)
        .eq("template_id", templateId)
        .single();

      return !!userTemplate; 
    }

    return false; 
  } catch (error) {
    console.error("Error checking user access:", error);
    return false; 
  }
}
