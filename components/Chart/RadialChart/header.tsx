import { cn } from "@/utils/cn";

export function RadialChartHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-3.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
