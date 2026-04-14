import { IconProps } from "../types";

export function ArrowCurveLeftUpIcon({ size = 24, color = "currentColor", strokeWidth = 2, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.91362 4.20005L3.59961 9.51406M3.59961 9.51406L8.91362 14.8281M3.59961 9.51406L16.3996 9.51406C18.6087 9.51406 20.3996 11.3049 20.3996 13.5141L20.3996 19.8001"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
