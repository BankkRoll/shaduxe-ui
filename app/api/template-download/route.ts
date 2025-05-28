import { checkUserAccess } from "@/utils/supabase/access";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

const templateRepos: Record<string, { owner: string; repo: string }> = {
  emaily: { owner: "BankkRoll", repo: "Emaily-Nextjs-Starter-Template" },
  fluxio: { owner: "BankkRoll", repo: "Fluxio-Nextjs-Starter-Template" },

};

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { templateId } = await request.json();

    if (!templateId) {
      return NextResponse.json(
        { error: "Template ID is required" },
        { status: 400 },
      );
    }

    const hasAccess = await checkUserAccess({ userId: user.id, templateId });

    if (!hasAccess) {
      return NextResponse.json(
        { error: "Access denied to this template" },
        { status: 403 },
      );
    }

    const repoInfo = templateRepos[templateId];

    if (!repoInfo) {
      return NextResponse.json(
        { error: "Template repository not found" },
        { status: 404 },
      );
    }

    try {
      const clientIp = request.headers.get("x-forwarded-for") || "unknown";
      const userAgent = request.headers.get("user-agent") || "unknown";

      await supabase.from("template_downloads").insert({
        user_id: user.id,
        template_id: templateId,
        download_date: new Date().toISOString(),
        ip_address: clientIp,
        user_agent: userAgent,
      });

      const { data: archive } = await octokit.rest.repos.downloadZipballArchive(
        {
          owner: repoInfo.owner,
          repo: repoInfo.repo,
          ref: "main", 
        },
      );

      const base64Archive = Buffer.from(archive as any).toString("base64");

      return NextResponse.json({
        archive: base64Archive,
        fileName: `${repoInfo.repo}-${Date.now()}.zip`,
      });
    } catch (githubError: any) {
      console.error("GitHub API error:", githubError?.message);
      return NextResponse.json(
        { error: "Failed to download repository" },
        { status: 500 },
      );
    }
  } catch (error: any) {
    console.error("Error processing template download:", error?.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
