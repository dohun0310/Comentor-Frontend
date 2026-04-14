import { IconProps } from "../types";

export function DotsVerticalIcon({ size = 24, color = "currentColor", ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="5" r="1.5" fill={color} />
      <circle cx="12" cy="12" r="1.5" fill={color} />
      <circle cx="12" cy="19" r="1.5" fill={color} />
    </svg>
  );
}
