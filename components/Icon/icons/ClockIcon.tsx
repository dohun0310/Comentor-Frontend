import { IconProps } from "../types";

export function ClockIcon({ size = 24, color = "currentColor", strokeWidth = 2, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth} />
      <path
        d="M12 7V12L15 14"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
