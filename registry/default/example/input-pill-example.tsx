import { Input } from "@/components/ui/input";

const sizes = [
  { name: "xs", label: "XSmall" },
  { name: "sm", label: "Small" },
  { name: "md", label: "Medium" },
  { name: "lg", label: "Large" },
  { name: "xl", label: "XLarge" },
] as const;

export default function InputPillExample() {
  return (
    <div className="flex flex-col items-center gap-4 p-2">
      {sizes.map((size) => (
        <div key={size.name} className="flex flex-col items-center gap-2">
          <Input
            variant="pill"
            inputSize={size.name}
            placeholder={size.label}
          />
        </div>
      ))}
    </div>
  );
}
