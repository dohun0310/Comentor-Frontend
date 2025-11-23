import { cn } from "@/utils/cn";

export function Button({
  size = "medium",
  className,
  children,
  ...props
}: { size?: "medium" | "icon" } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        size === "medium"
          ? `w-54 h-15 p-4 rounded-[0.875rem]
            bg-foreground text-background 
            transition-colors hover:bg-gray-800`
          : size === "icon"
          ? `w-6 h-6 rounded-sm
            transition-colors hover:bg-foreground/10`
          : "",
        "flex items-center justify-center",
        "text-xl font-semibold",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}