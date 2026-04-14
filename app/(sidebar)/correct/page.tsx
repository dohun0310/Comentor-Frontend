"use client";

import { ChangeEvent, useCallback, useEffect, useState, useRef, use } from "react";
import { Logo } from "@/components/Logo";
import {
  ArrowCurveLeftUpIcon,
  ArrowCurveRightUpIcon,
  ChevronDoubleLeftIcon,
  CopyRightIcon,
  ThumbDownIcon,
  ThumbUpIcon,
  VolumeIcon,
  XIcon,
} from "@/components/Icon";

import { cn } from "@/utils/cn";
import { CommentCorrect } from "@/utils/correct";

export default function Correct({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { comment, returnPath } = use(searchParams);

  const initialValue = comment ?? "";
  const [history, setHistory] = useState<{ entries: string[]; index: number }>(() => ({
    entries: [initialValue],
    index: 0,
  }));

  const value = history.entries[history.index] ?? "";
  const canUndo = history.index > 0;
  const canRedo = history.index < history.entries.length - 1;

  useEffect(() => {
    setHistory({ entries: [initialValue], index: 0 });
  }, [initialValue]);

  const updateValue = useCallback((nextValue: string) => {
    setHistory((prev) => {
      const truncated = prev.entries.slice(0, prev.index + 1);
      const last = truncated[truncated.length - 1];
      if (last === nextValue) return prev;
      return { entries: [...truncated, nextValue], index: truncated.length };
    });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => updateValue(e.target.value);
  const handleClear = () => updateValue("");
  const handleUndo = () =>
    setHistory((p) => (p.index === 0 ? p : { ...p, index: p.index - 1 }));
  const handleRedo = () =>
    setHistory((p) => (p.index >= p.entries.length - 1 ? p : { ...p, index: p.index + 1 }));

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined") return;
    const t = text.trim();
    if (!t) return;
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = /[a-zA-Z]/.test(t) ? "en-US" : "ko-KR";
    synth.speak(u);
  }, []);

  const copy = useCallback(async (text: string) => {
    const t = text.trim();
    if (!t || typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(t);
    } catch {
      // ignore
    }
  }, []);

  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const hasResRef = useRef(false);

  const handleCorrect = useCallback(async () => {
    const text = value.trim();
    if (!text) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    const res = await CommentCorrect(text);
    if (!res.ok) {
      setError(res.message ?? "알 수 없는 오류가 발생했습니다.");
      setIsLoading(false);
      return;
    }
    setResult(res.detail ?? "");
    setIsLoading(false);
  }, [value]);

  useEffect(() => {
    if (hasResRef.current) return;
    if (!comment || comment.trim() === "") return;
    hasResRef.current = true;
    handleCorrect();
  }, [comment, handleCorrect]);

  const handleSubmit = () => {
    if (!value) return;
    if (result && value === comment) {
      const url = `/feedback?comment=${encodeURIComponent(value)}&result=${encodeURIComponent(result)}${
        returnPath ? `&returnPath=${encodeURIComponent(returnPath)}` : ""
      }`;
      window.location.href = url;
    } else {
      window.location.href = `/correct?comment=${encodeURIComponent(value)}`;
    }
  };

  const submitLabel = isLoading
    ? "교정 중..."
    : result && value !== comment
    ? "다시 교정하기"
    : result
    ? "분석하기"
    : "교정하기";

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex h-15 md:h-25 items-center justify-center">
        <Logo />
      </div>

      <section className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col px-4 pb-6 md:pb-10">
        <div className="flex flex-col items-center gap-3 py-3">
          <h1 className="text-center text-2xl md:text-[44px] font-bold leading-[1.3] text-black break-keep">
            온라인 속 편향성,
            <br />
            당신은 얼마나 알고 있나요?
          </h1>
          <div className="h-px w-[260px] md:w-[473px] bg-gray-300" />
          <div className="flex flex-wrap justify-center gap-4 text-base md:text-xl">
            <span className="text-blue-500">Other Bias</span>
            <span className="text-green-700">Hate Content</span>
            <span className="text-purple-500">Abusive</span>
            <span className="text-orange-500">Sexism</span>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1200px] p-2">
          <div
            className="relative grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-[12px] gap-3 md:gap-0 md:border md:border-gray-300"
          >
            <div className="pointer-events-none hidden md:flex absolute left-1/2 top-3.5 -translate-x-1/2 items-center justify-center">
              <ChevronDoubleLeftIcon size={20} color="var(--color-gray-400)" />
            </div>

            <div className="flex flex-col bg-white rounded-[12px] border border-gray-300 md:border-0 md:rounded-none">
              <div className="flex h-12 items-center justify-center border-b border-gray-300">
                <p className="text-base font-medium text-gray-800">교정 전</p>
              </div>
              <div className="flex gap-2 p-6 min-h-[240px] md:min-h-[298px] md:border-r border-gray-300">
                <textarea
                  value={value}
                  onChange={handleChange}
                  placeholder="내용을 입력하세요..."
                  className="flex-1 resize-none text-base leading-6 text-gray-800 outline-none"
                />
                {value && (
                  <button
                    type="button"
                    aria-label="지우기"
                    onClick={handleClear}
                    className="h-5 w-5 shrink-0 text-gray-400 hover:text-gray-600"
                  >
                    <XIcon size={20} color="currentColor" strokeWidth={1.5} />
                  </button>
                )}
              </div>
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <IconBtn aria-label="읽기" onClick={() => speak(value)} disabled={!value}>
                    <VolumeIcon size={20} color="currentColor" />
                  </IconBtn>
                  <IconBtn aria-label="되돌리기" onClick={handleUndo} disabled={!canUndo}>
                    <ArrowCurveLeftUpIcon size={20} color="currentColor" />
                  </IconBtn>
                  <IconBtn aria-label="다시 실행" onClick={handleRedo} disabled={!canRedo}>
                    <ArrowCurveRightUpIcon size={20} color="currentColor" />
                  </IconBtn>
                </div>
                <span className="text-base font-medium text-gray-800">
                  {value.length.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex flex-col bg-white rounded-[12px] border border-gray-300 md:border-0 md:rounded-none">
              <div className="flex h-12 items-center justify-center border-b border-gray-300">
                <p
                  className={cn(
                    "text-base font-medium",
                    isLoading
                      ? "animate-pulse text-gray-800"
                      : error
                      ? "text-red-500"
                      : result
                      ? "text-blue-500"
                      : "text-gray-800",
                  )}
                >
                  {isLoading ? "교정 중..." : error ? "오류" : "교정 됨"}
                </p>
              </div>
              <div className="flex gap-2 p-6 min-h-[240px] md:min-h-[298px]">
                <div className="flex-1 overflow-auto text-base leading-6 text-gray-800">
                  {isLoading ? (
                    <div className="flex flex-col gap-2">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-5 w-full animate-pulse rounded bg-gray-200" />
                      ))}
                    </div>
                  ) : error ? (
                    <p className="text-red-600">{error}</p>
                  ) : result !== null ? (
                    <p
                      className="bg-[linear-gradient(120deg,var(--foreground)_10%,var(--color-green-500)_25%,var(--color-purple-500)_50%,var(--color-blue-500)_75%,var(--foreground)_90%)] bg-clip-text bg-size-[850%_auto] text-transparent animate-wipe"
                    >
                      {result || "수정이 필요하지 않은 문장입니다."}
                    </p>
                  ) : (
                    <p className="text-gray-400">교정 결과가 여기에 표시됩니다</p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between p-6">
                <IconBtn aria-label="읽기" onClick={() => result && speak(result)} disabled={!result}>
                  <VolumeIcon size={20} color="currentColor" />
                </IconBtn>
                <div className="flex items-center gap-4">
                  <IconBtn aria-label="좋아요" disabled={!result}>
                    <ThumbUpIcon size={20} color="currentColor" strokeWidth={1.5} />
                  </IconBtn>
                  <IconBtn aria-label="별로에요" disabled={!result}>
                    <ThumbDownIcon size={20} color="currentColor" strokeWidth={1.5} />
                  </IconBtn>
                  <IconBtn aria-label="복사" onClick={() => result && copy(result)} disabled={!result}>
                    <CopyRightIcon size={20} color="currentColor" />
                  </IconBtn>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center p-2">
          <button
            type="button"
            disabled={!value || isLoading}
            onClick={handleSubmit}
            className={cn(
              "flex h-[46px] w-[287px] items-center justify-center rounded-[12px] bg-blue-500 px-6 text-[15px] font-semibold tracking-[0.01em] text-white transition-colors",
              "disabled:cursor-not-allowed disabled:bg-blue-500/50",
              "enabled:hover:bg-blue-600",
            )}
          >
            {submitLabel}
          </button>
        </div>
      </section>
    </main>
  );
}

function IconBtn({
  className,
  disabled,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "flex h-5 w-5 items-center justify-center text-gray-800 transition-colors",
        "disabled:cursor-not-allowed disabled:text-gray-400",
        "enabled:hover:text-gray-600",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
