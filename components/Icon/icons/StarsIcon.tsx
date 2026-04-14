import { IconProps } from "../types";

export function StarsIcon({ size = 24, color = "currentColor", strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M14.8239 2.3999L16.6542 7.34611L21.6004 9.17637L16.6542 11.0066L14.8239 15.9528L12.9937 11.0066L8.04745 9.17637L12.9937 7.34611L14.8239 2.3999Z M6.35333 13.694L7.95216 16.0481L10.3063 17.647L7.95216 19.2458L6.35333 21.5999L4.75451 19.2458L2.40039 17.647L4.75451 16.0481L6.35333 13.694Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
