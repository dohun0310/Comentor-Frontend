import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/utils/cn";

export function RadarChartContent({
  data,
  className,
  ...props
}: {data: {axis: string; value: number; color: string}[] } & React.HTMLAttributes<HTMLDivElement>) {
  const renderDot = ({
    cx,
    cy,
    index,
  }: {
    cx?: number;
    cy?: number;
    index?: number;
  }) => {
    if (
      typeof cx !== "number" ||
      typeof cy !== "number" ||
      typeof index !== "number"
    ) {
      return null;
    }

    const dotColor = data[index]?.color ?? "#000";

    return (
      <circle
        cx={cx}
        cy={cy}
        r={7}
        fill={dotColor}
        stroke="#fff"
        strokeWidth={2}
      />
    );
  };

  return (
    <div 
      className={cn(
        "relative w-full",
        "h-[260px] sm:h-80 md:h-[360px] lg:h-[420px]",
        "md:flex-1",
        className
      )}
      {...props}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <RadarChart data={data}>
        <defs>
          {data.map((item, index) => {
            const angle = (index / data.length) * 2 * Math.PI - Math.PI / 2;
            const cx = 50 + Math.cos(angle) * 35; 
            const cy = 50 + Math.sin(angle) * 35;

            return (
              <radialGradient
                id={`rg-${index}`}
                key={index}
                cx={`${cx}%`}
                cy={`${cy}%`}
                r="55%"
              >
                <stop offset="0%" stopColor={item.color} stopOpacity={0.9} />
                <stop offset="100%" stopColor={item.color} stopOpacity={0} />
              </radialGradient>
            );
          })}
        </defs>
          <PolarGrid 
            stroke="var(--color-gray-300)"
            strokeWidth={1}
          />
          <PolarAngleAxis
            dataKey="axis"
            tick={{ fill: "var(--color-gray-700)", fontSize: 14 }}
            tickLine={false}
          />
          {data.map((item, index) => (
            <Radar
              key={index}
              dataKey="value"
              stroke={`url(#rg-${index})`}
              strokeWidth={3}
              fill={`url(#rg-${index})`}
              fillOpacity={0.3}
              dot={index === 0 ? renderDot : false}
              activeDot={false}
              isAnimationActive={false}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}