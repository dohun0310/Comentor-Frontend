import { cn } from "@/utils/cn";

export function RadialChartTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <p
      className={cn(
        "text-sm sm:text-base md:text-lg lg:text-xl font-semibold",
        "text-gray-900",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}