"use server";

import { CommentFeedbackResult, CommentCorrectResponse } from "@/types/feedback";

const LABEL_MAP: Record<string, CommentCorrectResponse> = {
  offensive: {
    id: "Abusive",
    title: "욕설/모욕",
    description: "대상을 공격하거나 감정적으로 공격하는 표현은 없는가?",
    color: "var(--color-purple-500)",
  },
  bias_gender: {
    id: "Sexism",
    title: "성차별",
    description: "고정적 역할 부여나 차별적 관념이 드러나지 않는가?",
    color: "var(--color-yellow-500)",
  },
  bias_others: {
    id: "Other Bias",
    title: "기타 차별",
    description: "개인적 속성을 이유로 차별하거나 배제하는 내용은 없는가?",
    color: "var(--color-blue-500)",
  },
  hate: {
    id: "Hate Content",
    title: "혐오",
    description: "특정 집단이나 개인에 대한 적대감 또는 베타성을 조장하는가?",
    color: "var(--color-green-500)",
  }
}

export async function CommentCorrect (
  comment: string
): Promise<CommentFeedbackResult> {
  if (!comment || typeof comment !== "string") {
    return {
      ok: false,
      error: "INVALID_COMMENT",
      message: "입력 내용이 올바르지 않습니다."
    };
  }

  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) {
    throw new Error("BACKEND_URL is not defined");
  }

  try {
    const feedbackRes = await fetch(`${backendUrl}/api/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment })
    });

    if (feedbackRes.status === 429) {
      return {
        ok: false,
        error: "TOO_MANY_REQUESTS",
        message: "잠시 후에 다시 시도해주세요."
      }
    };

    if (!feedbackRes.ok) {
      return {
        ok: false,
        error: "REVIEW_FAILED",
        message: "원문을 검증하는데 실패했습니다."
      }
    };

    const feedbackData = await feedbackRes.json();

    return {
      ok: true,
      problematic: feedbackData.is_problematic,
      detail: feedbackData.detail.map(({ label, score }: { label: string; score: Number; }) => ({
        ...LABEL_MAP[label],
        score: Number(score.toFixed(2)) * 100,
      }))
    };
  } catch (e) {
    return {
      ok: false,
      error: "SERVER_ACTION_FAILED",
      message: "서버에서 처리 중 오류 발생"
    };
  }
}