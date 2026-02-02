import { cn } from "@/utils/cn";

export function RadarChartTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-sm sm:text-base md:text-lg font-bold text-gray-900", className)}
      {...props}
    >
      {children}
    </h3>
  );
}