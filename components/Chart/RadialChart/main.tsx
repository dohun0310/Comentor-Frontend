import { cn } from "@/utils/cn";

export function RadialChart({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
    <div
      className={cn(
        "flex flex-col items-center",
        "px-3 py-3 sm:px-5 sm:py-4 md:px-7 md:py-6",
        "rounded-[1.25rem] bg-white",
        className
      )}
      style={{ boxShadow: "0px 3.4px 17px rgba(0,0,0,0.08)" }}
      {...props}
    >
      {children}
    </div>
    );
}