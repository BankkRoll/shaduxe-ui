import { Badge } from "../ui/badge";

// Basic demo
export function BadgeDemo() {
  return (
    <div className="flex items-center p-2">
      <Badge>Badge</Badge>
    </div>
  );
}

// All variants and sizes in a responsive grid
export function BadgeVariants() {
  // All variants and sizes
  const variants = [
    "default",
    "secondary",
    "destructive",
    "outline",
    "ghost",
    "link",
    "success",
    "warning",
    "info",
  ] as const;

  const sizes = ["icon", "xs", "sm", "md", "lg", "xl", "2xl"] as const;

  return (
    <div className="grid gap-8 p-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <h4 className="text-sm font-medium col-span-full mb-2">
          Variants (with default size & shape)
        </h4>
        {variants.map((variant) => (
          <div key={variant} className="flex flex-col items-center gap-2">
            <Badge variant={variant}>{variant}</Badge>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <h4 className="text-sm font-medium col-span-full mb-2">
          Sizes (with default variant)
        </h4>
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <Badge size={size}>{size}</Badge>
            <span className="text-xs text-muted-foreground">{size}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <h4 className="text-sm font-medium col-span-full mb-2">
          Shapes (with default variant & size)
        </h4>
      </div>
    </div>
  );
}

// Individual variants
export function BadgeDefault() {
  return (
    <div className="flex items-center p-2">
      <Badge variant="default">Default</Badge>
    </div>
  );
}

export function BadgeSecondary() {
  return (
    <div className="flex items-center p-2">
      <Badge variant="secondary">Secondary</Badge>
    </div>
  );
}

export function BadgeDestructive() {
  return (
    <div className="flex items-center p-2">
      <Badge variant="destructive">Destructive</Badge>
    </div>
  );
}

export function BadgeOutline() {
  return (
    <div className="flex items-center p-2">
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}

export function BadgeGhost() {
  return (
    <div className="flex items-center p-2">
      <Badge variant="ghost">Ghost</Badge>
    </div>
  );
}

export function BadgeLink() {
  return (
    <div className="flex items-center p-2">
      <Badge variant="link">Link</Badge>
    </div>
  );
}

export function BadgeSuccess() {
  return (
    <div className="flex items-center p-2">
      <Badge variant="success">Success</Badge>
    </div>
  );
}

export function BadgeWarning() {
  return (
    <div className="flex items-center p-2">
      <Badge variant="warning">Warning</Badge>
    </div>
  );
}

export function BadgeInfo() {
  return (
    <div className="flex items-center p-2">
      <Badge variant="info">Info</Badge>
    </div>
  );
}

export const badgeVariants = {
  demo: BadgeDemo,
  variants: BadgeVariants,
  default: BadgeDefault,
  secondary: BadgeSecondary,
  destructive: BadgeDestructive,
  outline: BadgeOutline,
  ghost: BadgeGhost,
  link: BadgeLink,
  success: BadgeSuccess,
  warning: BadgeWarning,
  info: BadgeInfo,
};
