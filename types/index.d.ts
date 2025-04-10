import { Icons } from "@/components/icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string | string[];
  event?: string;
  items?: NavItemWithChildren[];
  isAccordion?: boolean;
  defaultOpen?: boolean;
  description?: string;
  badge?: {
    text: string;
    variant: "new" | "premium" | "beta" | "popular" | "custom" | "coming-soon";
    color?: string;
  }[];
}

export interface NavItemWithChildren extends NavItem {
  subItems?: NavItemWithChildren[];
}

export interface MainNavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  label?: string | string[];
  description?: string;
}

export interface SidebarNavItem extends NavItemWithChildren {}

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};
