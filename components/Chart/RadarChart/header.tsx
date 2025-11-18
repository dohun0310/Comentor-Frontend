import { cn } from "@/utils/cn";

export function RadarChartHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "absolute left-10 top-6",
        "flex flex-col gap-3",
        "z-10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}