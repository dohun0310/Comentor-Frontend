import { cn } from "@/utils/cn";
import type { ButtonProps } from "@/types/button";

export function Button({
  size = "medium",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        size === "medium"
          ? "w-54 h-15 p-4 rounded-[0.875rem]"
          : size === "icon"
          ? "h-6 w-6 p-2 rounded-sm"
          : "",
        "flex items-center justify-center",
        "bg-foreground text-background transition-colors hover:bg-gray-900",
        "text-xl font-semibold",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}