import { cn } from "@/utils/cn";

export function RadialChartHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-1.5 sm:gap-2 md:gap-3.5 w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
