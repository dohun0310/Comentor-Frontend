"use server";

import { CommentCorrectResult } from "@/types/correct";

export async function CommentCorrect (
  comment: string
): Promise<CommentCorrectResult> {
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
    const reviewRes = await fetch(`${backendUrl}/api/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment })
    });

    if (reviewRes.status === 429) {
      return {
        ok: false,
        error: "TOO_MANY_REQUESTS",
        message: "잠시 후에 다시 시도해주세요."
      }
    };

    if (!reviewRes.ok) {
      return {
        ok: false,
        error: "REVIEW_FAILED",
        message: "원문을 검증하는데 실패했습니다."
      }
    };

    const reviewData = await reviewRes.json();

    if (reviewData.is_problematic) {
      const correctRes = await fetch(`${backendUrl}/api/correct`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment })
      });

      if (!correctRes.ok) {
        return {
          ok: false,
          error: "CORRECTION_FAILED",
          message: "원문을 교정하는데 실패했습니다."
        };
      }

      const correctData = await correctRes.json();

      return {
        ok: true,
        problematic: true,
        detail: correctData.corrected_comment
      };
    }
  } catch (e) {
    return {
      ok: false,
      error: "SERVER_ACTION_FAILED",
      message: "서버에서 처리 중 오류 발생"
    };
  }

  return {
    ok: true,
    problematic: false
  };
}