import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

const sizes = [
  { name: "xs", label: "XSmall" },
  { name: "sm", label: "Small" },
  { name: "md", label: "Medium" },
  { name: "lg", label: "Large" },
  { name: "xl", label: "XLarge" },
] as const;

export default function InputIconExample() {
  return (
    <div className="flex flex-col space-y-4 p-2">
      {sizes.map((size) => (
        <div key={size.name} className="flex flex-col items-center gap-2">
          <Input
            inputSize={size.name}
            variant="underline"
            type="password"
            placeholder={size.label}
            Icon={Lock}
            iconPlacement="left"
          />
        </div>
      ))}
    </div>
  );
}
