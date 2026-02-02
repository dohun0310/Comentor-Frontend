import { cn } from "@/utils/cn";

export function RadialChartSubtitle({
  color,
  className,
  children,
  ...props
}: { color: string } & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "text-xs sm:text-sm font-medium",
        className
      )}
      style={{ color }}
      {...props}
    >
      {children}
    </span>
  )
}