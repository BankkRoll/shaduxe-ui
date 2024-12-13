import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

export default function AvatarSquareExample() {
  return (
    <div className="flex flex-wrap items-end gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Avatar variant="square" size={size}>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{size}</span>
        </div>
      ))}
    </div>
  );
}
