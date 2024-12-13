import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarGroupExample() {
  return (
    <div className="flex -space-x-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/tj.png" alt="@tj" />
        <AvatarFallback>TJ</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="https://github.com/ianstormtaylor.png"
          alt="@ianstormtaylor"
        />
        <AvatarFallback>IT</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>+2</AvatarFallback>
      </Avatar>
    </div>
  );
}
