import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// Basic demo
export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/BankkRoll.png" alt="@BankkRoll" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

// Variant demos
export function AvatarVariants() {
  return (
    <div className="flex items-center gap-4">
      <Avatar variant="circle">
        <AvatarImage src="https://github.com/BankkRoll.png" alt="@BankkRoll" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar variant="square">
        <AvatarImage src="https://github.com/BankkRoll.png" alt="@BankkRoll" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar variant="rounded">
        <AvatarImage src="https://github.com/BankkRoll.png" alt="@BankkRoll" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}

// Size demos
export function AvatarSizes() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="xs">
        <AvatarImage src="https://github.com/BankkRoll.png" alt="@BankkRoll" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar size="sm">
        <AvatarImage src="https://github.com/BankkRoll.png" alt="@BankkRoll" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar size="md">
        <AvatarImage src="https://github.com/BankkRoll.png" alt="@BankkRoll" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://github.com/BankkRoll.png" alt="@BankkRoll" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar size="xl">
        <AvatarImage src="https://github.com/BankkRoll.png" alt="@BankkRoll" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar size="2xl">
        <AvatarImage src="https://github.com/BankkRoll.png" alt="@BankkRoll" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}

// Custom demos
export function AvatarWithFallback() {
  return (
    <Avatar>
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

// Individual variants for reference
export function AvatarCircle() {
  return (
    <Avatar variant="circle">
      <AvatarImage src="https://github.com/BankkRoll.png" alt="@BankkRoll" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

export function AvatarSquare() {
  return (
    <Avatar variant="square">
      <AvatarImage src="https://github.com/BankkRoll.png" alt="@BankkRoll" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

export function AvatarRounded() {
  return (
    <Avatar variant="rounded">
      <AvatarImage src="https://github.com/BankkRoll.png" alt="@BankkRoll" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

export default function AvatarDemos() {
  return (
    <div className="grid gap-6">
      <div>
        <h3 className="mb-2 text-sm font-medium">Default</h3>
        <AvatarDemo />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Variants</h3>
        <AvatarVariants />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Sizes</h3>
        <AvatarSizes />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">With Fallback</h3>
        <AvatarWithFallback />
      </div>
    </div>
  );
}

export const avatarVariants = {
  demo: AvatarDemo,
  variants: AvatarVariants,
  circle: AvatarCircle,
  square: AvatarSquare,
  rounded: AvatarRounded,
  sizes: AvatarSizes,
  withFallback: AvatarWithFallback,
};
