import {
  PolarAngleAxis,
  PolarGrid,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import { CommentFeedbackResponse } from "@/types/feedback";
import { cn } from "@/utils/cn";

export function RadialChartContent({
  data,
  className,
  ...props
}: { data: CommentFeedbackResponse } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-52 lg:w-52",
        className
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-end"
        aria-hidden="true"
      >
        <span
          className="block h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 rounded-full opacity-35 blur-3xl"
          style={{ backgroundColor: data.color }}
        />
      </div>
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <RadialBarChart
          data={[{ progress: data.score, track: 100 }]}
          outerRadius="72%"
          innerRadius="100%"
          startAngle={90}
          endAngle={-270}
          cx="50%"
          cy="50%"
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="var(--color-gray-200)"
            className="stroke-4"
          />
          <RadialBar
            dataKey="progress"
            cornerRadius={999}
            barSize={12}
            fill={data.color}
            isAnimationActive={false}
          />
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[10px] sm:text-xs font-medium text-gray-500">
          포함 지수
        </span>
        <p className="mt-0.5 sm:mt-1 flex items-baseline text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900">
          {data.score} <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-500">%</span>
        </p>
      </div>
    </div>
  );
}