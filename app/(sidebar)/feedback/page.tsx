"use client";

import { useCallback, useEffect, useState, use } from "react";
import { Logo } from "@/components/Logo";
import { CopyRightIcon, StarsIcon } from "@/components/Icon";
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
  RadialChartContent,
} from "@/components/Chart";
import { CommentFeedback } from "@/utils/feedback";
import { CommentFeedbackResponse } from "@/types/feedback";

export default function Feedback({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { comment, result, returnPath } = use(searchParams);

  const [data, setData] = useState<CommentFeedbackResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!comment) return;
      const response = await CommentFeedback(comment);
      if (response?.detail && Array.isArray(response.detail)) {
        setData(response.detail.map((item) => ({ ...item, score: item.score ?? 0 })));
        setIsLoading(false);
      } else {
        setData([]);
      }
    }
    fetchData();
  }, [comment]);

  const copy = useCallback(() => {
    if (typeof result === "string") {
      navigator.clipboard.writeText(result);
    }
  }, [result]);

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex h-15 md:h-25 items-center justify-center">
         <Logo />
       </div>

      <section className="mx-auto flex w-full max-w-[1464px] flex-1 flex-col gap-5 px-4 pb-6 md:pb-10">
        <div
          className="flex flex-col gap-4 rounded-[20px] bg-white px-6 py-6 md:px-10"
          style={{ boxShadow: "0 3.395px 16.974px 0 rgba(0,0,0,0.08)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StarsIcon size={24} color="var(--color-blue-500)" />
              <span className="text-lg md:text-xl font-semibold text-black">수정된 글</span>
            </div>
            <button
              type="button"
              aria-label="복사"
              onClick={copy}
              className="flex h-6 w-6 items-center justify-center text-gray-800 transition-colors hover:text-gray-600"
            >
              <CopyRightIcon size={24} color="currentColor" />
            </button>
          </div>
          <p className="text-sm md:text-lg leading-7 text-gray-900 line-clamp-3 md:line-clamp-none break-keep">
            {result || "교정된 글이 여기에 표시됩니다."}
          </p>
        </div>

        {isLoading ? (
          <div className="h-[50vh] w-full animate-pulse rounded-[20px] bg-gray-200" />
        ) : (
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
            <div className="lg:flex-1">
              <RadarChart>
                <RadarChartHeader>
                  <RadarChartTitle>당신이 가지고 있는 편향 분석</RadarChartTitle>
                  <RadarChartLegend data={data} />
                </RadarChartHeader>
                <RadarChartContent data={data} />
              </RadarChart>
            </div>

            <div className="grid w-full grid-cols-2 gap-3 md:gap-5 lg:w-[706px]">
              {data.map((item) => (
                <RadialChart key={item.id}>
                  <RadialChartHeader>
                    <RadialChartHeadline>
                      <RadialChartTitle>{item.title}</RadialChartTitle>
                      <RadialChartSubtitle color={item.color}>{item.id}</RadialChartSubtitle>
                    </RadialChartHeadline>
                    <RadialChartDescription>{item.description}</RadialChartDescription>
                  </RadialChartHeader>
                  <RadialChartContent data={item} />
                </RadialChart>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center p-2">
          <button
            type="button"
            onClick={() => {
              window.location.href = returnPath ?? "/";
            }}
            className="flex h-[46px] w-full max-w-[287px] items-center justify-center rounded-[12px] bg-blue-500 px-6 text-[15px] font-semibold tracking-[0.01em] text-white transition-colors hover:bg-blue-600"
          >
            리터러시 완료
          </button>
        </div>
      </section>
    </main>
  );
}
