import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

// Basic demo
export function ButtonDemo() {
  return (
    <div className="flex items-center p-2">
      <Button>Click me</Button>
    </div>
  );
}

// All variants and sizes in a responsive grid
export function ButtonVariants() {
  return (
    <div className="grid gap-8 p-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <h4 className="text-sm font-medium col-span-full mb-2">
          Variants (with default size)
        </h4>
        <div className="flex flex-col items-center gap-2">
          <Button variant="default">default</Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button variant="destructive">destructive</Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button variant="outline">outline</Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button variant="secondary">secondary</Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button variant="ghost">ghost</Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button variant="link">link</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <h4 className="text-sm font-medium col-span-full mb-2">
          Effects (with appropriate variants)
        </h4>
        <div className="flex flex-col items-center gap-2">
          <Button effect="ringHover">ringHover</Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button effect="ringHoverOutline">ringHoverOutline</Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button effect="shine">shine</Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button effect="gooeyRight">gooeyRight</Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button effect="gooeyLeft">gooeyLeft</Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button variant="link" effect="underline">
            underline
          </Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button variant="link" effect="hoverUnderline">
            hoverUnderline
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <h4 className="text-sm font-medium col-span-full mb-2">
          Sizes (with default variant)
        </h4>
        <div className="flex flex-col items-center gap-2">
          <Button size="icon">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="xs">xs</Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="sm">sm</Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="md">md</Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="default">default</Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="lg">lg</Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="xl">xl</Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="2xl">2xl</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <h4 className="text-sm font-medium col-span-full mb-2">
          Expandable Icons
        </h4>
        <div className="flex flex-col items-center gap-2">
          <Button effect="expandIcon" Icon={ArrowLeft} iconPlacement="left">
            Expand Left
          </Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button effect="expandIcon" Icon={ArrowRight} iconPlacement="right">
            Expand Right
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <h4 className="text-sm font-medium col-span-full mb-2">
          Variant + Effect Combinations
        </h4>
        <div className="flex flex-col items-center gap-2">
          <Button variant="destructive" effect="gooeyRight" size="lg">
            Destructive Gooey
          </Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button variant="outline" effect="shine" size="sm">
            Outline Shine
          </Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button variant="secondary" effect="ringHover" size="xl">
            Secondary Ring
          </Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button variant="destructive" effect="gooeyLeft">
            Destructive Gooey Left
          </Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button variant="link" effect="underline">
            Link Underline
          </Button>
        </div>
      </div>
    </div>
  );
}

// Individual variants
export function ButtonDefault() {
  return (
    <div className="flex items-center p-2">
      <Button variant="default">Default</Button>
    </div>
  );
}

export function ButtonDestructive() {
  return (
    <div className="flex items-center p-2">
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}

export function ButtonOutline() {
  return (
    <div className="flex items-center p-2">
      <Button variant="outline">Outline</Button>
    </div>
  );
}

export function ButtonSecondary() {
  return (
    <div className="flex items-center p-2">
      <Button variant="secondary">Secondary</Button>
    </div>
  );
}

export function ButtonGhost() {
  return (
    <div className="flex items-center p-2">
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}

export function ButtonLink() {
  return (
    <div className="flex items-center p-2">
      <Button variant="link">Link</Button>
    </div>
  );
}

// Individual effect examples
export function ButtonRingHover() {
  return (
    <div className="flex items-center p-2">
      <Button effect="ringHover">Ring Hover</Button>
    </div>
  );
}

export function ButtonRingHoverOutline() {
  return (
    <div className="flex items-center p-2">
      <Button effect="ringHoverOutline">Ring Hover Outline</Button>
    </div>
  );
}

export function ButtonShine() {
  return (
    <div className="flex items-center p-2">
      <Button effect="shine">Shine</Button>
    </div>
  );
}

export function ButtonGooeyRight() {
  return (
    <div className="flex items-center p-2">
      <Button effect="gooeyRight">Gooey Right</Button>
    </div>
  );
}

export function ButtonGooeyLeft() {
  return (
    <div className="flex items-center p-2">
      <Button effect="gooeyLeft">Gooey Left</Button>
    </div>
  );
}

export function ButtonUnderline() {
  return (
    <div className="flex items-center p-2">
      <Button variant="link" effect="underline">
        Underline
      </Button>
    </div>
  );
}

export function ButtonHoverUnderline() {
  return (
    <div className="flex items-center p-2">
      <Button variant="link" effect="hoverUnderline">
        Hover Underline
      </Button>
    </div>
  );
}

export function ButtonIconLeft() {
  return (
    <div className="flex items-center p-2">
      <Button Icon={ArrowLeft} iconPlacement="left">
        Left Icon
      </Button>
    </div>
  );
}

export function ButtonIconRight() {
  return (
    <div className="flex items-center p-2">
      <Button Icon={ArrowRight} iconPlacement="right">
        Right Icon
      </Button>
    </div>
  );
}

export function ButtonExpandIconLeft() {
  return (
    <div className="flex items-center p-2">
      <Button effect="expandIcon" Icon={ArrowLeft} iconPlacement="left">
        Expand Left
      </Button>
    </div>
  );
}

export function ButtonExpandIconRight() {
  return (
    <div className="flex items-center p-2">
      <Button effect="expandIcon" Icon={ArrowRight} iconPlacement="right">
        Expand Right
      </Button>
    </div>
  );
}

export const buttonVariants = {
  demo: ButtonDemo,
  variants: ButtonVariants,
  default: ButtonDefault,
  destructive: ButtonDestructive,
  outline: ButtonOutline,
  secondary: ButtonSecondary,
  ghost: ButtonGhost,
  link: ButtonLink,
  ringHover: ButtonRingHover,
  ringHoverOutline: ButtonRingHoverOutline,
  shine: ButtonShine,
  gooeyRight: ButtonGooeyRight,
  gooeyLeft: ButtonGooeyLeft,
  underline: ButtonUnderline,
  hoverUnderline: ButtonHoverUnderline,
  iconLeft: ButtonIconLeft,
  iconRight: ButtonIconRight,
  expandIconLeft: ButtonExpandIconLeft,
  expandIconRight: ButtonExpandIconRight,
};
