import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// Basic demo
export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

// Variant demos
export function AvatarCircle() {
  return (
    <Avatar variant="circle">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

export function AvatarSquare() {
  return (
    <Avatar variant="square">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

// Size demos
export function AvatarSizes() {
  return (
    <div className="flex flex-col space-y-4">
      <Avatar size="xs">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar size="sm">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar size="md">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar size="xl">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
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

export const avatarVariants = {
  demo: AvatarDemo,
  circle: AvatarCircle,
  square: AvatarSquare,
  sizes: AvatarSizes,
  withFallback: AvatarWithFallback,
};
