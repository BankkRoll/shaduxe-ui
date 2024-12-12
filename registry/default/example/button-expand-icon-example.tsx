import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ButtonExpandIconExample() {
  return (
    <div className="p-2 overflow-hidden">
      <Button
        variant="expandIcon"
        Icon={ArrowRight}
        iconPlacement="right"
        className="w-full"
      >
        Expand Icon
      </Button>
    </div>
  );
}
