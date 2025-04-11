import { Mail, Search } from "lucide-react";
import { Input } from "../ui/input";

// Basic demo
export function InputDemo() {
  return <Input placeholder="Input" />;
}

// Variant demos
export function InputVariants() {
  return (
    <div className="flex flex-col gap-4 max-w-md">
      <Input variant="default" placeholder="Default input" />
      <Input variant="underline" placeholder="Underline input" />
      <Input variant="pill" placeholder="Pill input" />
    </div>
  );
}

// Size demos
export function InputSizes() {
  return (
    <div className="flex flex-col gap-4 max-w-md">
      <Input inputSize="xs" placeholder="Extra Small" />
      <Input inputSize="sm" placeholder="Small" />
      <Input inputSize="md" placeholder="Medium" />
      <Input inputSize="lg" placeholder="Large" />
      <Input inputSize="xl" placeholder="Extra Large" />
    </div>
  );
}

// Icon demos
export function InputIcons() {
  return (
    <div className="flex flex-col gap-4 max-w-md">
      <Input Icon={Search} iconPlacement="left" placeholder="Search..." />
      <Input Icon={Mail} iconPlacement="right" placeholder="Email" />
    </div>
  );
}

// Individual variants for reference
export function InputDefault() {
  return <Input variant="default" placeholder="Default input" />;
}

export function InputUnderline() {
  return <Input variant="underline" placeholder="Underline input" />;
}

export function InputPill() {
  return <Input variant="pill" placeholder="Pill input" />;
}

export function InputIconLeft() {
  return <Input Icon={Search} iconPlacement="left" placeholder="Search..." />;
}

export function InputIconRight() {
  return <Input Icon={Mail} iconPlacement="right" placeholder="Email" />;
}

export default function InputDemos() {
  return (
    <div className="grid gap-6">
      <div>
        <h3 className="mb-2 text-sm font-medium">Default</h3>
        <InputDemo />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Variants</h3>
        <InputVariants />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Sizes</h3>
        <InputSizes />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Icons</h3>
        <InputIcons />
      </div>
    </div>
  );
}

export const inputVariants = {
  demo: InputDemo,
  variants: InputVariants,
  default: InputDefault,
  underline: InputUnderline,
  pill: InputPill,
  sizes: InputSizes,
  icons: InputIcons,
  iconLeft: InputIconLeft,
  iconRight: InputIconRight,
};
