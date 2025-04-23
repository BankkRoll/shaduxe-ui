import { CodeBlockCommand } from "@/components/docs/codeblock-command";
import { CopyButton } from "@/components/docs/copy-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Callout } from "@/components/docs/callout";
import ClientButton from "@/components/docs/client-button";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentSource } from "@/components/docs/component-source";
import TechStack, { TechStackFull } from "@/components/docs/tech-stack";
import TemplateDownloadWrapper from "@/components/docs/template-download-wrapper";
import { Event } from "@/lib/events";
import { cn } from "@/lib/utils";
import { useMDXComponent } from "@content-collections/mdx/react";
import * as LucideIcons from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CustomLink = (props: any) => {
  const href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link {...props} href={href}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const components = {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button: ClientButton,
  Callout,
  TechStack,
  TechStackFull,
  TemplateDownloadButton: TemplateDownloadWrapper,
  Image,
  ComponentPreview,
  CodeBlockCommand,
  ComponentSource: (props: any) => <ComponentSource {...props} />,
  VariantPreview: ({
    name,
    variant,
    ...props
  }: {
    name: string;
    variant: string;
    className?: string;
  }) => <ComponentPreview name={name} variant={variant} {...props} />,
  VariantSource: ({
    name,
    variant,
    children,
    ...props
  }: {
    name: string;
    variant: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <ComponentSource component={name} variant={variant} src="" {...props}>
      {children}
    </ComponentSource>
  ),
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "font-heading mt-2 scroll-m-20 text-4xl font-bold",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "font-heading mt-12 scroll-m-20 border-b border-dashed pb-2 text-2xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <CustomLink
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <div
      className={cn(
        "text-base leading-7 [&:not(:first-child)]:mt-6",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md", className)} alt={alt} {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto rounded-md border">
      <table
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        "border-b transition-colors data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "p-4 align-middle [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  ),
  Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h3
      className={cn(
        "font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  Steps: ({ ...props }) => (
    <div
      className="[&>h3]:step steps mb-12 ml-4 border-dashed border-l pl-8 [counter-reset:step]"
      {...props}
    />
  ),
  Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => (
    <Tabs className={cn("relative mt-6 w-full", className)} {...props} />
  ),
  TabsList: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsList>) => (
    <TabsList
      className={cn(
        "w-full justify-start rounded-none border-dashed border-b bg-transparent p-0",
        className,
      )}
      {...props}
    />
  ),
  TabsTrigger: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsTrigger>) => (
    <TabsTrigger
      className={cn(
        "cursor-pointer relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none",
        className,
      )}
      {...props}
    />
  ),
  TabsContent: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsContent>) => (
    <TabsContent
      className={cn(
        "relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold",
        className,
      )}
      {...props}
    />
  ),
  pre: ({
    className,
    __rawString__,
    __npmCommand__,
    __pnpmCommand__,
    __yarnCommand__,
    __bunCommand__,
    __withMeta__,
    __src__,
    __event__,
    __meta__,
    __name__,
    ...props
  }: React.HTMLAttributes<HTMLPreElement> & {
    __rawString__?: string;
    __npmCommand__?: string;
    __pnpmCommand__?: string;
    __yarnCommand__?: string;
    __bunCommand__?: string;
    __withMeta__?: boolean;
    __src__?: string;
    __event__?: Event["name"];
    __meta__?: string;
    __name__?: string;
  }) => {
    if (
      __npmCommand__ &&
      __yarnCommand__ &&
      __pnpmCommand__ &&
      __bunCommand__
    ) {
      return (
        <CodeBlockCommand
          __npmCommand__={__npmCommand__}
          __pnpmCommand__={__pnpmCommand__}
          __yarnCommand__={__yarnCommand__}
          __bunCommand__={__bunCommand__}
        />
      );
    }

    const language = className?.match(/language-(\w+)/)?.[1];
    if (
      language === "bash" &&
      __meta__ &&
      (__meta__.includes("npm:") ||
        __meta__.includes("yarn:") ||
        __meta__.includes("pnpm:") ||
        __meta__.includes("bun:"))
    ) {
      console.log("Found bash code block with package manager meta", __meta__);
    }

    return (
      <>
        <pre
          className={cn(
            "mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900",
            className,
          )}
          {...props}
        />
        {__rawString__ && __src__ && (
          <CopyButton
            value={__rawString__}
            src={__src__}
            event={__event__}
            className={cn("absolute right-4 top-4", __withMeta__ && "top-16")}
          />
        )}
      </>
    );
  },
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className,
      )}
      {...props}
    />
  ),
  LinkedCard: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn(
        "flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10",
        className,
      )}
      {...props}
    />
  ),
  ...Object.entries(LucideIcons).reduce(
    (acc, [name, Icon]) => ({
      ...acc,
      [`Icon${name}`]: Icon,
    }),
    {},
  ),
};

interface MDXProps {
  code: string;
  className?: string;
}

export function Mdx({ code, className }: MDXProps) {
  const Component = useMDXComponent(code);

  return (
    <article className={cn("mx-auto max-w-[120ch]", className)}>
      <Component components={components} />
    </article>
  );
}
