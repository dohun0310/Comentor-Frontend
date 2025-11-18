"use client";

import {
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	Radar,
	RadarChart,
	RadialBar,
	RadialBarChart,
	ResponsiveContainer,
} from "recharts";
import { cn } from "@/utils/cn";

export function RadialChart({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
    <div
      className={cn(
        "flex flex-col",
        "gap-3.5 px-7 py-6",
        "rounded-[1.25rem] bg-white",
        className
      )}
      style={{ boxShadow: "0px 3.4px 17px rgba(0,0,0,0.08)" }}
      {...props}
    >
      {children}
    </div>
	);
}

export function RadialChartHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-3.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function RadialChartHeadline({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-end gap-1.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function RadialChartTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <p
      className={cn(
        "text-xl font-semibold",
        "text-gray-900",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function RadialChartSubtitle({
  color,
  className,
  children,
  ...props
}: { color: string } & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "text-sm font-medium",
        className
      )}
      style={{ color }}
      {...props}
    >
      {children}
    </span>
  )
}

export function RadialChartDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <span
      className={cn(
        "text-sm text-gray-600 break-keep",
        className
      )} {...props}
    >
      {children}
    </span>
  )
}

export function RadialChartContent({
  value,
  color,
  className,
  ...props
}: { value: string; color?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative h-52 w-52",
        className
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-end"
        aria-hidden="true"
      >
        <span
          className="block h-28 w-28 rounded-full opacity-35 blur-3xl"
          style={{ backgroundColor: color }}
        />
      </div>
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <RadialBarChart
          data={[{ progress: value, track: 100 }]}
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
            barSize={16}
            fill={color}
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
        <span className="text-xs font-medium text-gray-500">
          포함 지수
        </span>
        <p className="mt-1 flex items-baseline text-3xl font-extrabold text-gray-900">
          {value} <span className="text-lg font-semibold text-gray-500">%</span>
        </p>
      </div>
    </div>
  );
}