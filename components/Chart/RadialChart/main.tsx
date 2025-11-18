import { cn } from "@/utils/cn";

export function RadialChart({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
    <div
      className={cn(
        "flex flex-col",
        "px-7 py-11",
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