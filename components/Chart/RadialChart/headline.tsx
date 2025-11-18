import { cn } from "@/utils/cn";

export function RadialChartHeadline({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-end gap-1.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}