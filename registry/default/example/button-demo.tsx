import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

// Basic demo
export function ButtonDemo() {
  return <Button>Click me</Button>;
}

// Variant demos
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

// Size demo
export function ButtonSizes() {
  return (
    <div className="flex flex-col space-y-4">
      <Button size="icon">
        <ArrowRight className="h-4 w-4" />
      </Button>
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
      <Button size="2xl">2XL</Button>
    </div>
  );
}

// Icon placement demos
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

export const buttonVariants = {
  demo: ButtonDemo,
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
  iconLeft: ButtonIconLeft,
  iconRight: ButtonIconRight,
};
