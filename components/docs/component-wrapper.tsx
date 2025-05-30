import { cn } from "@/lib/utils";

interface ComponentWrapperProps {
  className?: string;
  children: any;
}
const ComponentWrapper = ({ className, children }: ComponentWrapperProps) => {
  return (
    <div
      className={cn(
        "min-h-[500px] max-w-screen relative flex flex-col items-center justify-center rounded-xl bg-background p-0 border md:p-16",
        className,
      )}
    >
      <div
        className={cn(
          `absolute inset-0 size-full`,
          `bg-[radial-gradient(#00000055_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff22_1px,transparent_1px)]`,
          "lab-bg [background-size:16px_16px]",
        )}
      />
      <div className="w-full h-full flex items-center justify-center z-50">
        {children}
      </div>
    </div>
  );
};

export default ComponentWrapper;
