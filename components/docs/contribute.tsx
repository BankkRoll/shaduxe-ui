import { Doc } from "content-collections";
import { BugIcon, GithubIcon, LightbulbIcon, PencilIcon } from "lucide-react";
import Link from "next/link";

import { getGithubFileUrl, getGitHubIssueUrl } from "@/lib/github";

export function Contribute({ doc }: { doc: Doc }) {
  const contributeLinks = [
    {
      text: "Report issue",
      icon: BugIcon,
      href: getGitHubIssueUrl({
        owner: "BankkRoll",
        repo: "shaduxe-ui",
        title: `[bug]: ${doc.slug}`,
        labels: ["bug", "documentation"],
        template: "bug_report.md",
      }),
    },
    {
      text: "Request feature",
      icon: LightbulbIcon,
      href: getGitHubIssueUrl({
        owner: "BankkRoll",
        repo: "shaduxe-ui",
        title: `[feat]: ${doc.slug}`,
        labels: ["enhancement"],
        template: "feature_request.md",
      }),
    },
    {
      text: "Edit this page",
      icon: PencilIcon,
      href: getGithubFileUrl(doc.slug),
    },
  ];

  return (
    <div className="mt-8 pt-4 border-t flex flex-col md:flex-row items-center justify-between text-sm">
      <div className="flex items-center text-muted-foreground">
        <GithubIcon className="mr-2 size-3.5" />
        <span>Contribute</span>
      </div>
      <div className="flex items-center gap-4">
        {contributeLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <link.icon className="mr-1.5 size-3.5" />
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
}
