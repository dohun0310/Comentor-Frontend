export interface CommentCorrectResponse {
  id: string;
  title: string;
  description: string;
  score?: number;
  color: string;
};

export interface CommentFeedbackResult {
  ok: boolean;
  problematic?: boolean;
  error?: "INVALID_COMMENT" | "TOO_MANY_REQUESTS" | "REVIEW_FAILED" | "CORRECTION_FAILED" | "SERVER_ACTION_FAILED";
  message?: string;
  detail?: CommentCorrectResponse[];
}