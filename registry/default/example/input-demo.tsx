import { Mail, Search } from "lucide-react";
import { Input } from "../ui/input";

// Basic demo
export function InputDemo() {
  return <Input placeholder="Input" />;
}

// Variant demos
export function InputDefault() {
  return <Input variant="default" placeholder="Default input" />;
}

export function InputUnderline() {
  return <Input variant="underline" placeholder="Underline input" />;
}

export function InputPill() {
  return <Input variant="pill" placeholder="Pill input" />;
}

// Size demo
export function InputSizes() {
  return (
    <div className="flex flex-col space-y-4">
      <Input inputSize="xs" placeholder="Extra Small" />
      <Input inputSize="sm" placeholder="Small" />
      <Input inputSize="md" placeholder="Medium" />
      <Input inputSize="lg" placeholder="Large" />
      <Input inputSize="xl" placeholder="Extra Large" />
    </div>
  );
}

// Icon demos
export function InputIconLeft() {
  return <Input Icon={Search} iconPlacement="left" placeholder="Search..." />;
}

export function InputIconRight() {
  return <Input Icon={Mail} iconPlacement="right" placeholder="Email" />;
}

export const inputVariants = {
  demo: InputDemo,
  default: InputDefault,
  underline: InputUnderline,
  pill: InputPill,
  sizes: InputSizes,
  iconLeft: InputIconLeft,
  iconRight: InputIconRight,
};
