import { Mail, Search } from "lucide-react";
import { Input } from "../ui/input";

// Basic demo
export function InputDemo() {
  return (
    <div className="flex items-center p-2">
      <Input placeholder="Input" />
    </div>
  );
}

// All variants and sizes in a responsive grid
export function InputVariants() {
  // All variants and sizes
  const variants = ["default", "underline", "pill"] as const;

  const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

  return (
    <div className="grid gap-8 p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <h4 className="text-sm font-medium col-span-full mb-2">
          Variants (with default size)
        </h4>
        {variants.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <Input variant={variant} placeholder={`${variant} input`} />
            <span className="text-xs text-muted-foreground">{variant}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <h4 className="text-sm font-medium col-span-full mb-2">
          Sizes (with default variant)
        </h4>
        {sizes.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <Input inputSize={size} placeholder={`${size} size`} />
            <span className="text-xs text-muted-foreground">{size}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <h4 className="text-sm font-medium col-span-full mb-2">
          Icon Placement
        </h4>
        <div className="flex flex-col gap-2">
          <Input Icon={Search} iconPlacement="left" placeholder="Search..." />
          <span className="text-xs text-muted-foreground">Left icon</span>
        </div>
        <div className="flex flex-col gap-2">
          <Input Icon={Mail} iconPlacement="right" placeholder="Email" />
          <span className="text-xs text-muted-foreground">Right icon</span>
        </div>
      </div>
    </div>
  );
}

// Individual variants
export function InputDefault() {
  return (
    <div className="flex items-center p-2">
      <Input variant="default" placeholder="Default input" />
    </div>
  );
}

export function InputUnderline() {
  return (
    <div className="flex items-center p-2">
      <Input variant="underline" placeholder="Underline input" />
    </div>
  );
}

export function InputPill() {
  return (
    <div className="flex items-center p-2">
      <Input variant="pill" placeholder="Pill input" />
    </div>
  );
}

export function InputIconLeft() {
  return (
    <div className="flex items-center p-2">
      <Input Icon={Search} iconPlacement="left" placeholder="Search..." />
    </div>
  );
}

export function InputIconRight() {
  return (
    <div className="flex items-center p-2">
      <Input Icon={Mail} iconPlacement="right" placeholder="Email" />
    </div>
  );
}

export const inputVariants = {
  demo: InputDemo,
  variants: InputVariants,
  default: InputDefault,
  underline: InputUnderline,
  pill: InputPill,
  iconLeft: InputIconLeft,
  iconRight: InputIconRight,
};
