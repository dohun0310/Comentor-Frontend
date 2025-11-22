export interface CommentCorrectResult {
  ok: boolean;
  problematic?: boolean;
  error?: "INVALID_COMMENT" | "TOO_MANY_REQUESTS" | "REVIEW_FAILED" | "CORRECTION_FAILED" | "SERVER_ACTION_FAILED";
  message?: string;
  detail?: string;
}