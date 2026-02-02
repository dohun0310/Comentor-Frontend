import { cn } from "@/utils/cn";

export function RadarChartHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative md:absolute md:left-6 lg:left-10 md:top-4 lg:top-6",
        "flex flex-col gap-2 md:gap-3",
        "z-10 w-full md:w-auto mb-2 md:mb-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}