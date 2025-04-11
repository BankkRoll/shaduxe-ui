import { Badge } from "../ui/badge";

// Basic demo
export function BadgeDemo() {
  return <Badge>Badge</Badge>;
}

// Variant demos
export function BadgeVariants() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </div>
  );
}

// Special variant demos
export function BadgeSpecialVariants() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  );
}

// Size demos
export function BadgeSizes() {
  return (
    <div className="flex items-center gap-4">
      <Badge size="xs">XS</Badge>
      <Badge size="sm">SM</Badge>
      <Badge size="md">MD</Badge>
      <Badge size="lg">LG</Badge>
    </div>
  );
}

// Shape demos
export function BadgeShapes() {
  return (
    <div className="flex items-center gap-4">
      <Badge shape="default">Default</Badge>
      <Badge shape="rounded">Rounded</Badge>
      <Badge shape="square">Square</Badge>
    </div>
  );
}

// Individual variants for reference
export function BadgeDefault() {
  return <Badge variant="default">Default</Badge>;
}

export function BadgeSecondary() {
  return <Badge variant="secondary">Secondary</Badge>;
}

export function BadgeDestructive() {
  return <Badge variant="destructive">Destructive</Badge>;
}

export function BadgeOutline() {
  return <Badge variant="outline">Outline</Badge>;
}

export function BadgeGhost() {
  return <Badge variant="ghost">Ghost</Badge>;
}

export function BadgeLink() {
  return <Badge variant="link">Link</Badge>;
}

export function BadgeSuccess() {
  return <Badge variant="success">Success</Badge>;
}

export function BadgeWarning() {
  return <Badge variant="warning">Warning</Badge>;
}

export function BadgeInfo() {
  return <Badge variant="info">Info</Badge>;
}

export default function BadgeDemos() {
  return (
    <div className="grid gap-6">
      <div>
        <h3 className="mb-2 text-sm font-medium">Default</h3>
        <BadgeDemo />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Variants</h3>
        <BadgeVariants />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Special Variants</h3>
        <BadgeSpecialVariants />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Sizes</h3>
        <BadgeSizes />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Shapes</h3>
        <BadgeShapes />
      </div>
    </div>
  );
}

export const badgeVariants = {
  demo: BadgeDemo,
  variants: BadgeVariants,
  specialVariants: BadgeSpecialVariants,
  default: BadgeDefault,
  secondary: BadgeSecondary,
  destructive: BadgeDestructive,
  outline: BadgeOutline,
  ghost: BadgeGhost,
  link: BadgeLink,
  success: BadgeSuccess,
  warning: BadgeWarning,
  info: BadgeInfo,
  sizes: BadgeSizes,
  shapes: BadgeShapes,
};
