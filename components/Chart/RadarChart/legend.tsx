import { CommentFeedbackResponse } from "@/types/feedback";
import { cn } from "@/utils/cn";

export function RadarChartLegend({
  data,
  className,
  ...props
}: { data: CommentFeedbackResponse[] } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-gray-700">{item.title}</span>
        </div>
      ))}
    </div>
  );
}
