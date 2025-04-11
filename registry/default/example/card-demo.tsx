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
  );
}

// Variant demos
export function CardVariants() {
  return (
    <div className="flex flex-wrap gap-6">
      <Card variant="default" className="w-[250px]">
        <CardHeader>
          <CardTitle>Default</CardTitle>
        </CardHeader>
        <CardContent>Standard card with border and shadow</CardContent>
      </Card>

      <Card variant="flat" className="w-[250px]">
        <CardHeader>
          <CardTitle>Flat</CardTitle>
        </CardHeader>
        <CardContent>Card with border but no shadow</CardContent>
      </Card>

      <Card variant="elevated" className="w-[250px]">
        <CardHeader>
          <CardTitle>Elevated</CardTitle>
        </CardHeader>
        <CardContent>Card with larger shadow</CardContent>
      </Card>

      <Card variant="ghost" className="w-[250px]">
        <CardHeader>
          <CardTitle>Ghost</CardTitle>
        </CardHeader>
        <CardContent>Transparent background with no border</CardContent>
      </Card>

      <Card variant="outline" className="w-[250px]">
        <CardHeader>
          <CardTitle>Outline</CardTitle>
        </CardHeader>
        <CardContent>Only border with transparent background</CardContent>
      </Card>

      <Card variant="opaque" className="w-[250px]">
        <CardHeader>
          <CardTitle>Opaque</CardTitle>
        </CardHeader>
        <CardContent>Semi-transparent with blur effect</CardContent>
      </Card>

      <Card variant="gradient" className="w-[250px]">
        <CardHeader>
          <CardTitle>Gradient</CardTitle>
        </CardHeader>
        <CardContent>Gradient background effect</CardContent>
      </Card>
    </div>
  );
}

// Size demos
export function CardSizes() {
  return (
    <div className="flex flex-wrap gap-6">
      <Card size="sm" className="w-[200px]">
        <CardHeader>
          <CardTitle>Small</CardTitle>
        </CardHeader>
        <CardContent>Small padding card</CardContent>
      </Card>

      <Card size="md" className="w-[200px]">
        <CardHeader>
          <CardTitle>Medium</CardTitle>
        </CardHeader>
        <CardContent>Medium padding card</CardContent>
      </Card>

      <Card size="lg" className="w-[200px]">
        <CardHeader>
          <CardTitle>Large</CardTitle>
        </CardHeader>
        <CardContent>Large padding card</CardContent>
      </Card>

      <Card size="xl" className="w-[200px]">
        <CardHeader>
          <CardTitle>Extra Large</CardTitle>
        </CardHeader>
        <CardContent>Extra large padding card</CardContent>
      </Card>
    </div>
  );
}

// Radius demos
export function CardRadius() {
  return (
    <div className="flex flex-wrap gap-6">
      <Card radius="default" className="w-[200px]">
        <CardHeader>
          <CardTitle>Default</CardTitle>
        </CardHeader>
        <CardContent>Default rounded corners</CardContent>
      </Card>

      <Card radius="sm" className="w-[200px]">
        <CardHeader>
          <CardTitle>Small</CardTitle>
        </CardHeader>
        <CardContent>Small rounded corners</CardContent>
      </Card>

      <Card radius="lg" className="w-[200px]">
        <CardHeader>
          <CardTitle>Large</CardTitle>
        </CardHeader>
        <CardContent>Large rounded corners</CardContent>
      </Card>

      <Card radius="full" className="w-[200px]">
        <CardHeader>
          <CardTitle>Full</CardTitle>
        </CardHeader>
        <CardContent>Fully rounded corners</CardContent>
      </Card>

      <Card radius="none" className="w-[200px]">
        <CardHeader>
          <CardTitle>None</CardTitle>
        </CardHeader>
        <CardContent>No rounded corners</CardContent>
      </Card>
    </div>
  );
}

// Individual variants for reference
export function CardDefault() {
  return (
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
  );
}

export default function CardDemos() {
  return (
    <div className="grid gap-8">
      <div>
        <h3 className="mb-2 text-sm font-medium">Default</h3>
        <CardDemo />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Variants</h3>
        <CardVariants />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Sizes</h3>
        <CardSizes />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Radius</h3>
        <CardRadius />
      </div>
    </div>
  );
}

export const cardVariants = {
  demo: CardDemo,
  variants: CardVariants,
  sizes: CardSizes,
  radius: CardRadius,
  default: CardDefault,
};
