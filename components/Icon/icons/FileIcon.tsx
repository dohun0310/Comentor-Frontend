import { IconProps } from "../types";

export function FileIcon({ size = 24, color = "currentColor", strokeWidth = 2, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M14.7654 2.36255V5.9063C14.7654 6.55869 15.2943 7.08755 15.9467 7.08755H19.4904M17.7185 4.13442C17.1928 3.66403 16.6473 3.10612 16.3029 2.74378C16.0737 2.50266 15.757 2.36255 15.4244 2.36255H6.49638C5.19161 2.36255 4.13389 3.42027 4.13388 4.72504L4.13379 18.9C4.13378 20.2048 5.1915 21.2625 6.49628 21.2625L17.1276 21.2625C18.4323 21.2625 19.4901 20.2049 19.4901 18.9001L19.4904 6.37667C19.4904 6.07462 19.3752 5.78427 19.1655 5.56682C18.7779 5.16472 18.1306 4.50309 17.7185 4.13442Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
