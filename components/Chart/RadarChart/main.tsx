import { cn } from "@/utils/cn";

export function RadarChart({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative flex items-center",
        "w-full p-10",
        "rounded-[1.25rem] bg-white",
        className
      )}
      style={{ boxShadow: "0px 3.4px 17px rgba(0,0,0,0.08)" }}
      {...props}
    >
      {children}
    </div>
  );
}