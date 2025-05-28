import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

// Basic demo
export function CardDemo() {
  return (
    <div className="flex items-center p-2">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// All variants and sizes in a responsive grid
export function CardVariants() {
  // All variants and sizes
  const variants = ["default", "ghost", "outline"] as const;

  return (
    <div className="grid gap-8 p-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <h4 className="text-sm font-medium col-span-full mb-2">
          Variants (with default size)
        </h4>
        {variants.map((variant) => (
          <Card key={variant} variant={variant} className="w-full">
            <CardHeader>
              <CardTitle className="text-base">{variant}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {variant} card style
              </p>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Individual variants
export function CardDefault() {
  return (
    <div className="flex items-center p-2">
      <Card variant="default" className="w-[350px]">
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>Default card with shadow</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export function CardGhost() {
  return (
    <div className="flex items-center p-2">
      <Card variant="ghost" className="w-[350px]">
        <CardHeader>
          <CardTitle>Ghost Card</CardTitle>
          <CardDescription>Ghost card with no shadow</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export function CardOutline() {
  return (
    <div className="flex items-center p-2">
      <Card variant="outline" className="w-[350px]">
        <CardHeader>
          <CardTitle>Outline Card</CardTitle>
          <CardDescription>Outline card with border</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export const cardVariants = {
  demo: CardDemo,
  variants: CardVariants,
  default: CardDefault,
  ghost: CardGhost,
  outline: CardOutline,
};
