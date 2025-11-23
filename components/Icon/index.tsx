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
  const isStars = name === "stars";

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
        strokeWidth={isStars ? 1.5 : 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}