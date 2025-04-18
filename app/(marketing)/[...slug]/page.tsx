import { Mdx } from "@/components/docs/mdx-components";
import { absoluteUrl } from "@/lib/utils";
import { allPages } from "content-collections";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function getPageFromParams(params: PageProps["params"]) {
  const { slug = [] } = await params;
  const slugPath = slug.join("/");
  const page = allPages.find((page) => page.slugAsParams === slugPath);

  if (!page) {
    return null;
  }

  return page;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  return {
    title: `${page.title} | shaduxe/ui`,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article",
      url: absoluteUrl(page.slug),
      images: [
        {
          url: "https://ui.shaduxe.com/og-meta.png",
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["https://ui.shaduxe.com/og-meta.png"],
    },
  };
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }));
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    notFound();
  }

  return (
    <article className="container max-w-3xl py-6 lg:py-12">
      <div className="space-y-4">
        <h1 className="font-heading inline-block text-4xl lg:text-5xl">
          {page.title}
        </h1>
        {page.description && (
          <p className="text-xl text-muted-foreground">{page.description}</p>
        )}
      </div>
      <hr className="my-4" />
      <Mdx code={page.body.code} />
    </article>
  );
}
