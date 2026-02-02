import { CommentFeedbackResponse } from "@/types/feedback";
import { cn } from "@/utils/cn";

export function RadarChartLegend({
  data,
  className,
  ...props
}: { data: CommentFeedbackResponse[] } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-row flex-wrap md:flex-col gap-x-4 gap-y-1.5 md:gap-2", className)} {...props}>
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5 md:gap-2">
          <div
            className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-xs md:text-sm text-gray-700">{item.title}</span>
        </div>
      ))}
    </div>
  );
}
