import { cn } from "@/utils/cn";

export function RadialChartDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <span
      className={cn(
        "text-xs sm:text-sm text-gray-600 break-keep line-clamp-2 sm:line-clamp-none",
        className
      )} {...props}
    >
      {children}
    </span>
  )
}