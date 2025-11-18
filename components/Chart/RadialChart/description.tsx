import { cn } from "@/utils/cn";

export function RadialChartDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <span
      className={cn(
        "text-sm text-gray-600 break-keep",
        className
      )} {...props}
    >
      {children}
    </span>
  )
}