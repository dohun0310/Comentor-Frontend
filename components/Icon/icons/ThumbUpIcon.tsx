import { IconProps } from "../types";

export function ThumbUpIcon({ size = 24, color = "currentColor", strokeWidth = 2, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7 10V20M7 10L11 3C11.7956 3 12.5587 3.31607 13.1213 3.87868C13.6839 4.44129 14 5.20435 14 6V9H19.5C19.7929 9 20.0814 9.06444 20.3447 9.18854C20.608 9.31264 20.8394 9.4932 21.0225 9.71735C21.2056 9.94151 21.3357 10.2037 21.4032 10.4848C21.4707 10.766 21.4738 11.0588 21.4125 11.3413L20.03 17.8413C19.9362 18.282 19.691 18.6773 19.3388 18.9602C18.9867 19.2431 18.549 19.3978 18.0975 19.3975H7"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 10H7V20H3C2.73478 20 2.48043 19.8946 2.29289 19.7071C2.10536 19.5196 2 19.2652 2 19V11C2 10.7348 2.10536 10.4804 2.29289 10.2929C2.48043 10.1054 2.73478 10 3 10Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
