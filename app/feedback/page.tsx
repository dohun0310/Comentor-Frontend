"use client";

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
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

const data = [
  { id: "Abusive", title: "욕설/모욕", description: "대상을 공격하거나 감정적으로 공격하는 표현은 없는가?", score: 34, color: "var(--color-purple-500)" },
  { id: "Sexism", title: "성차별", description: "고정적 역할 부여나 차별적 관념이 드러나지 않는가?", score: 42, color: "var(--color-yellow-500)" },
  { id: "Other Bias", title: "기타 차별", description: "개인적 속성을 이유로 차별하거나 배제하는 내용은 없는가?", score: 23, color: "var(--color-blue-500)" },
  { id: "Hate Content", title: "혐오", description: "특정 집단이나 개인에 대한 적대감 또는 베타성을 조장하는가?", score: 52, color: "var(--color-green-500)" },
]

export default function Feedback() {
  const searchParams = useSearchParams();
  const comment = searchParams.get("comment");
  const result = searchParams.get("result");
  const returnPath = searchParams.get("returnPath") || "/";

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
        <div className="grid grid-col-1 lg:grid-cols-5 gap-6">
          <RadarChart className="lg:col-span-3">
            <RadarChartHeader>
              <RadarChartTitle>
                당신이 가지고 있는 편향 분석
              </RadarChartTitle>
              <RadarChartLegend data={data} />
            </RadarChartHeader>
            <RadarChartContent data={data} />
          </RadarChart>
          <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data.map((item) => (
              <RadialChart>
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
                <RadialChartContent
                  value={item.score}
                  color={item.color}
                />
              </RadialChart>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <Button
            className="bg-blue-500 hover:bg-blue-600"
            onClick={() => {window.location.href = returnPath}}
          >
            리터러시 완료
          </Button>
        </div>
      </section>
    </main>
  );
}