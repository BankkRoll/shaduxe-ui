import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// Basic demo
export function AvatarDemo() {
  return (
    <div className="flex items-center p-2">
      <Avatar>
        <AvatarImage src="https://github.com/BankkRoll.png" alt="@BankkRoll" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}

// All variants and sizes in a responsive grid
export function AvatarVariants() {
  // All variants and sizes
  const variants = ["circle", "square", "rounded"] as const;
  const sizes = ["icon", "xs", "sm", "md", "lg", "xl", "2xl"] as const;

  return (
    <div className="grid gap-8 p-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sizes.map((size) =>
          variants.map((variant) => (
            <div
              key={`${variant}-${size}`}
              className="flex flex-col items-center gap-2"
            >
              <Avatar variant={variant} size={size}>
                <AvatarImage
                  src="https://github.com/BankkRoll.png"
                  alt="@BankkRoll"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground text-center">
                {variant}-{size}
              </span>
            </div>
          )),
        )}
      </div>
    </div>
  );
}

// Individual variants
export function AvatarCircle() {
  return (
    <div className="flex items-center p-2">
      <Avatar variant="circle">
        <AvatarImage src="https://github.com/BankkRoll.png" alt="@BankkRoll" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}

export function AvatarSquare() {
  return (
    <div className="flex items-center p-2">
      <Avatar variant="square">
        <AvatarImage src="https://github.com/BankkRoll.png" alt="@BankkRoll" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}

export function AvatarRounded() {
  return (
    <div className="flex items-center p-2">
      <Avatar variant="rounded">
        <AvatarImage src="https://github.com/BankkRoll.png" alt="@BankkRoll" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}

export function AvatarWithFallback() {
  return (
    <div className="flex items-center p-2">
      <Avatar>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}

export const avatarVariants = {
  demo: AvatarDemo,
  variants: AvatarVariants,
  circle: AvatarCircle,
  square: AvatarSquare,
  rounded: AvatarRounded,
  withFallback: AvatarWithFallback,
};
