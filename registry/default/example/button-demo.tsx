import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

// Basic demo
export function ButtonDemo() {
  return <Button>Click me</Button>;
}

// Variant demos
export function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}

// Special variants
export function ButtonSpecialVariants() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="expandIcon">Expand</Button>
      <Button variant="ringHover">Ring Hover</Button>
      <Button variant="ringHoverOutline">Ring Outline</Button>
      <Button variant="shine">Shine</Button>
      <Button variant="gooeyRight">Gooey Right</Button>
      <Button variant="gooeyLeft">Gooey Left</Button>
      <Button variant="linkHover1">Link Hover 1</Button>
      <Button variant="linkHover2">Link Hover 2</Button>
    </div>
  );
}

// Size demos
export function ButtonSizes() {
  return (
    <div className="flex items-center gap-4">
      <Button size="icon">
        <ArrowRight className="h-4 w-4" />
      </Button>
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button size="md">MD</Button>
      <Button size="lg">LG</Button>
      <Button size="xl">XL</Button>
      <Button size="2xl">2XL</Button>
    </div>
  );
}

// Icon placement demos
export function ButtonIcons() {
  return (
    <div className="flex items-center gap-4">
      <Button Icon={ArrowLeft} iconPlacement="left">
        Left Icon
      </Button>
      <Button Icon={ArrowRight} iconPlacement="right">
        Right Icon
      </Button>
    </div>
  );
}

// Individual variants for reference
export function ButtonDefault() {
  return <Button variant="default">Default</Button>;
}

export function ButtonDestructive() {
  return <Button variant="destructive">Delete</Button>;
}

export function ButtonOutline() {
  return <Button variant="outline">Outline</Button>;
}

export function ButtonSecondary() {
  return <Button variant="secondary">Secondary</Button>;
}

export function ButtonGhost() {
  return <Button variant="ghost">Ghost</Button>;
}

export function ButtonLink() {
  return <Button variant="link">Link</Button>;
}

export function ButtonExpandIcon() {
  return <Button variant="expandIcon">Expand</Button>;
}

export function ButtonRingHover() {
  return <Button variant="ringHover">Ring Hover</Button>;
}

export function ButtonRingHoverOutline() {
  return <Button variant="ringHoverOutline">Ring Hover Outline</Button>;
}

export function ButtonShine() {
  return <Button variant="shine">Shine</Button>;
}

export function ButtonGooeyRight() {
  return <Button variant="gooeyRight">Gooey Right</Button>;
}

export function ButtonGooeyLeft() {
  return <Button variant="gooeyLeft">Gooey Left</Button>;
}

export function ButtonLinkHover1() {
  return <Button variant="linkHover1">Link Hover 1</Button>;
}

export function ButtonLinkHover2() {
  return <Button variant="linkHover2">Link Hover 2</Button>;
}

export function ButtonIconLeft() {
  return (
    <Button Icon={ArrowLeft} iconPlacement="left">
      Left Icon
    </Button>
  );
}

export function ButtonIconRight() {
  return (
    <Button Icon={ArrowRight} iconPlacement="right">
      Right Icon
    </Button>
  );
}

export default function ButtonDemos() {
  return (
    <div className="grid gap-6">
      <div>
        <h3 className="mb-2 text-sm font-medium">Default</h3>
        <ButtonDemo />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Basic Variants</h3>
        <ButtonVariants />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Special Variants</h3>
        <ButtonSpecialVariants />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Sizes</h3>
        <ButtonSizes />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Icons</h3>
        <ButtonIcons />
      </div>
    </div>
  );
}

export const buttonVariants = {
  demo: ButtonDemo,
  variants: ButtonVariants,
  specialVariants: ButtonSpecialVariants,
  default: ButtonDefault,
  destructive: ButtonDestructive,
  outline: ButtonOutline,
  secondary: ButtonSecondary,
  ghost: ButtonGhost,
  link: ButtonLink,
  expandIcon: ButtonExpandIcon,
  ringHover: ButtonRingHover,
  ringHoverOutline: ButtonRingHoverOutline,
  shine: ButtonShine,
  gooeyRight: ButtonGooeyRight,
  gooeyLeft: ButtonGooeyLeft,
  linkHover1: ButtonLinkHover1,
  linkHover2: ButtonLinkHover2,
  sizes: ButtonSizes,
  icons: ButtonIcons,
  iconLeft: ButtonIconLeft,
  iconRight: ButtonIconRight,
};
