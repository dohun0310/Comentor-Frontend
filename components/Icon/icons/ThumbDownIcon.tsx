import { IconProps } from "../types";

export function ThumbDownIcon({ size = 24, color = "currentColor", strokeWidth = 2, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M17 14V4M17 14L13 21C12.2044 21 11.4413 20.6839 10.8787 20.1213C10.3161 19.5587 10 18.7956 10 18V15H4.5C4.20712 15 3.91857 14.9356 3.65529 14.8115C3.392 14.6874 3.16058 14.5068 2.97749 14.2826C2.7944 14.0585 2.66434 13.7963 2.5968 13.5152C2.52926 13.234 2.5262 12.9412 2.5875 12.6587L3.97 6.15875C4.06384 5.71799 4.309 5.32265 4.66119 5.03981C5.01339 4.75696 5.45103 4.60215 5.9025 4.6025H17"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 4H17V14H21C21.2652 14 21.5196 13.8946 21.7071 13.7071C21.8946 13.5196 22 13.2652 22 13V5C22 4.73478 21.8946 4.48043 21.7071 4.29289C21.5196 4.10536 21.2652 4 21 4Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
