import { Button } from "@/components/ui/button";

const sizes = [
  { name: "icon", label: "Icon" },
  { name: "sm", label: "Small" },
  { name: "default", label: "Default" },
  { name: "lg", label: "Large" },
] as const;

export default function ButtonShineExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {sizes.map((size) => (
        <div key={size.name} className="flex flex-col items-center gap-2">
          <Button variant="shine" size={size.name}>
            {size.label}
          </Button>
          <span className="text-sm text-muted-foreground">{size.name}</span>
        </div>
      ))}
    </div>
  );
}
