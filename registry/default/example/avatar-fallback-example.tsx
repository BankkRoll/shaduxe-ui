import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

export default function AvatarFallbackExample() {
  return (
    <div className="flex flex-wrap items-end gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Avatar size={size}>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{size}</span>
        </div>
      ))}
    </div>
  );
}
