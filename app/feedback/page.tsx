"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, use } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import {
  RadarChart,
  RadarChartHeader,
  RadarChartTitle,
  RadarChartLegend,
  RadarChartContent,
  RadialChart,
  RadialChartHeader,
  RadialChartHeadline,
  RadialChartTitle,
  RadialChartSubtitle,
  RadialChartDescription,
  RadialChartContent
} from "@/components/Chart";
import { CommentFeedback } from "@/utils/feedback";
import { CommentFeedbackResponse } from "@/types/feedback";

export default function Feedback({
  searchParams
}: { searchParams: Promise<{
  [key: string]: string | undefined
}>
}) {
  const { comment, result, returnPath } = use(searchParams);

  const [data, setData] = useState<CommentFeedbackResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    async function fetchData() {
      if (comment) {
        const response = await CommentFeedback(comment);
        if (response?.detail && Array.isArray(response.detail)) {
          const correctedData = response.detail.map((item: CommentFeedbackResponse) => ({
            ...item,
            score: item.score ?? 0
          }));

          setData(correctedData);
          setIsLoading(false);
        } else {
          setData([]);
        }
      }
    }
    fetchData();
  }, [comment]);

  const copyText = useCallback(() => {
    if (typeof result === "string") {
      navigator.clipboard.writeText(result);
    }
  }, [result]);

  return (
    <main className="relative flex min-h-screen flex-col bg-blue-100/20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,rgba(102,136,255,0.18),transparent_60%)]" />
      <Header />
      <section className="mx-auto w-full max-w-[1380px]
        flex flex-col
        px-4 pb-16 gap-6"
      >
        <div
          className="w-full px-10 py-6 flex flex-col gap-4.5 rounded-[1.25rem] bg-background"
          style={{ boxShadow: "0 3.395px 16.974px 1.697px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="flex justify-between">
            <div className="flex flex-row items-center gap-2">
              <Icon
                name="stars"
                color="var(--color-blue-500)"
              />
              <span className="text-xl font-semibold">
                수정된 글
              </span>
            </div>
            <Button
              size="icon"
              onClick={() => copyText()}
            >
              <Icon name="copy-right" color="var(--color-gray-500)" />
            </Button>
          </div>
          <p className="text-lg break-keep">
            {result}
          </p>
        </div>
        {isLoading ? (
          <div className="w-full h-[70vh] rounded-[1.25rem] bg-gray-200 animate-pulse" />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <RadarChart className="lg:col-span-3">
              <RadarChartHeader>
                <RadarChartTitle>
                  당신이 가지고 있는 편향 분석
                </RadarChartTitle>
                <RadarChartLegend data={data} />
              </RadarChartHeader>
              <RadarChartContent data={data} />
            </RadarChart>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data.map((item) => (
                <RadialChart key={item.id}>
                  <RadialChartHeader>
                    <RadialChartHeadline>
                      <RadialChartTitle>
                        {item.title}
                      </RadialChartTitle>
                      <RadialChartSubtitle color={item.color}>
                        {item.id}
                      </RadialChartSubtitle>
                    </RadialChartHeadline>
                    <RadialChartDescription>
                      {item.description}
                    </RadialChartDescription>
                  </RadialChartHeader>
                  <RadialChartContent data={item} />
                </RadialChart>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-end mt-5">
          <Button
            className="bg-blue-500 hover:bg-blue-600"
            onClick={() => {window.location.href = returnPath ?? "/"}}
          >
            리터러시 완료
          </Button>
        </div>
      </section>
    </main>
  );
}