import { absoluteUrl, cn } from "@/lib/utils";
import { ChevronRightIcon, ExternalLinkIcon } from "@radix-ui/react-icons";

import { Contribute } from "@/components/docs/contribute";
import { Mdx } from "@/components/docs/mdx-components";
import { DocPager } from "@/components/docs/pager";
import { TableOfContents } from "@/components/docs/toc";
import { MotionWrapper } from "@/components/motion-wrapper";
import { badgeVariants } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { siteConfig } from "@/config/site";
import { getTableOfContents } from "@/lib/toc";
import { allDocs } from "content-collections";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface DocPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function getDocFromParams({ params }: DocPageProps) {
  // For the root /docs route, slug will be undefined or an empty array
  // We want to use an empty string to match our docs/index.mdx that has slugAsParams=""
  const { slug = [] } = await params;
  const slugPath = slug.length ? slug.join("/") : "";

  const doc = allDocs.find((doc) => doc.slugAsParams === slugPath);

  if (!doc) {
    return null;
  }

  return doc;
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams({ params });

  if (!doc) {
    return {};
  }

  const ogImage = new URL("/og.png", siteConfig.url).toString();

  return {
    title: `${doc.title} | ${siteConfig.name}`,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(doc.slug),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [ogImage],
      creator: siteConfig.links.twitter,
    },
  };
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }));
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams({ params });

  if (!doc || !doc.published) {
    notFound();
  }

  const toc = await getTableOfContents(doc.body.raw);

  return (
    <main className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto py-6 lg:py-8 w-full min-w-0">
        <MotionWrapper animate="fadeIn">
          <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
            <div className="truncate">Docs</div>
            <ChevronRightIcon className="size-4" />
            <div className="font-medium text-foreground">{doc.title}</div>
          </div>
          <div className="space-y-2">
            <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
              {doc.title}
            </h1>
            {doc.description && (
              <p className="text-balance text-lg text-muted-foreground">
                {doc.description}
              </p>
            )}
          </div>
          {doc.links ? (
            <div className="flex items-center space-x-2 pt-4">
              {doc.links?.doc && (
                <Link
                  href={doc.links.doc}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    badgeVariants({ variant: "secondary" }),
                    "gap-1",
                  )}
                >
                  Docs
                  <ExternalLinkIcon className="size-3" />
                </Link>
              )}
              {doc.links?.api && (
                <Link
                  href={doc.links.api}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    badgeVariants({ variant: "secondary" }),
                    "gap-1",
                  )}
                >
                  API Reference
                  <ExternalLinkIcon className="size-3" />
                </Link>
              )}
            </div>
          ) : null}
          <div className="pb-12 pt-8">
            <Mdx code={doc.body.code} />
          </div>
          <DocPager doc={doc} />
        </MotionWrapper>
      </div>
      {doc.toc && (
        <div className="hidden border-l border-dashed border-border/50 pl-6 text-sm xl:block">
          <div className="sticky top-12">
            <ScrollArea className="pb-10">
              <div className="sticky h-[calc(100vh-3.5rem)] space-y-4 py-12">
                <TableOfContents toc={toc} />
                <Contribute doc={doc} />
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </main>
  );
}
