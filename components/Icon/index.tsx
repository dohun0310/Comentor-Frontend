import svgPath from "./icons.json";

export function Icon({
  name,
  size = 24,
  color = "currentColor",
  ...props
}: {
  name: keyof typeof svgPath;
  size?: number;
  color?: string;
} & React.SVGProps<SVGSVGElement>) {
  const pathData = svgPath[name].paths;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d={pathData}
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}