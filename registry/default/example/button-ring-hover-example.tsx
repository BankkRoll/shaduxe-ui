import { Button } from "@/components/ui/button";

const sizes = [
  { name: "icon", label: "Icon" },
  { name: "xs", label: "XSmall" },
  { name: "sm", label: "Small" },
  { name: "md", label: "Medium" },
  { name: "lg", label: "Large" },
  { name: "xl", label: "XLarge" },
  { name: "2xl", label: "XXLarge" },
] as const;

export default function ButtonRingHoverExample() {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4">
      {sizes.map((size) => (
        <div key={size.name} className="flex flex-col items-center gap-2">
          <Button variant="ringHover" size={size.name}>
            {size.label}
          </Button>
          <span className="text-sm text-muted-foreground">{size.name}</span>
        </div>
      ))}
    </div>
  );
}
