import { MainNavItem, SidebarNavItem } from "@/types";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Docs",
      href: "/docs",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [],
        },
      ],
    },
    {
      title: "Templates",
      items: [
        {
          title: "Emaily",
          href: "/docs/templates/emaily",
          badge: [{ text: "COMING SOON", variant: "coming-soon" }],
          items: [],
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Avatar",
          href: "/docs/components/avatar",
          items: [],
        },
        {
          title: "Button",
          href: "/docs/components/button",
          items: [],
        },
        {
          title: "Input",
          href: "/docs/components/input",
          items: [],
        },
        {
          title: "Switch",
          href: "/docs/components/switch",
          items: [],
        },
        {
          title: "Tabs",
          href: "/docs/components/tabs",
          items: [],
        },
      ],
    },
    {
      title: "Blocks",
      items: [
        {
          title: "Pricing Sections",
          isAccordion: true,
          defaultOpen: true,
          subItems: [
            {
              title: "Pricing One",
              href: "/docs/blocks/pricing-one",
            },
            {
              title: "Pricing Two",
              href: "/docs/blocks/pricing-two",
            },
            {
              title: "Pricing Three",
              href: "/docs/blocks/pricing-three",
            },
          ],
        },
      ],
    },
  ],
};
