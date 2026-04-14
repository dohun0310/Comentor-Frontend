import { IconProps } from "../types";

export function TextIcon({ size = 24, color = "currentColor", strokeWidth = 2, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9.08571 19.2003H12.3529M12.3529 19.2003H15.7714M12.3529 19.2003V4.80029M12.3529 4.80029H7.02857C6.46051 4.80029 6 5.2608 6 5.82886V7.34147M12.3529 4.80029H17.2538C17.8218 4.80029 18.2823 5.2608 18.2823 5.82886V7.765"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
