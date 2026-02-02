"use client";

import { ChangeEvent, useCallback, useEffect, useState, useRef, use } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { CommentCorrect } from "@/utils/correct";

export default function Correct({
  searchParams
}: { searchParams: Promise<{
  [key: string]: string | undefined
}>
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
      const truncatedEntries = prev.entries.slice(0, prev.index + 1);
      const lastEntry = truncatedEntries[truncatedEntries.length - 1];

      if (lastEntry === nextValue) {
        return prev;
      }

      return {
        entries: [...truncatedEntries, nextValue],
        index: truncatedEntries.length,
      };
    });
  }, []);

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    updateValue(event.target.value);
  };

  const handleClear = () => updateValue("");

  const handleUndo = () => {
    setHistory((prev) => {
      if (prev.index === 0) {
        return prev;
      }

      return { ...prev, index: prev.index - 1 };
    });
  };

  const handleRedo = () => {
    setHistory((prev) => {
      if (prev.index >= prev.entries.length - 1) {
        return prev;
      }

      return { ...prev, index: prev.index + 1 };
    });
  };

  const speakText = useCallback((text: string) => {
    if (typeof window === "undefined") {
      return;
    }

    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    const synth = window.speechSynthesis;
    if (!synth) {
      console.warn("Speech synthesis is not supported in this browser.");
      return;
    }

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(trimmed);
    utterance.lang = /[a-zA-Z]/.test(trimmed) ? "en-US" : "ko-KR";
    synth.speak(utterance);
  }, []);

  const copyText = useCallback((text: string) => {
    if (typeof window === "undefined") {
      return;
    }

    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(trimmed).catch((error) => {
        console.warn("Clipboard write failed", error);
      });
      return;
    }

    const textarea = document?.createElement("textarea");
    if (!textarea) {
      return;
    }

    textarea.value = trimmed;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand("copy");
    } catch (error) {
      console.warn("execCommand copy failed", error);
    } finally {
      document.body.removeChild(textarea);
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

	return (
		<main className="relative flex min-h-screen flex-col bg-blue-100/20">
			<div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,rgba(102,136,255,0.18),transparent_60%)]" />
			<Header />
			<section className="mx-auto w-full max-w-[1350px]
        flex flex-col
        px-4 pb-8 sm:pb-12 md:pb-16 pt-6 sm:pt-8 md:pt-12"
      >
				<div className="flex flex-col gap-1.5 sm:gap-2">
					<div className="flex flex-wrap gap-2 sm:gap-4 text-sm font-medium">
							<span className="text-xs sm:text-sm md:text-base font-semibold text-blue-500">
                Other Bias
							</span>
              <span className="text-xs sm:text-sm md:text-base font-semibold text-green-700">
                Hate Content
							</span>
              <span className="text-xs sm:text-sm md:text-base font-semibold text-purple-500">
                Abusive
							</span>
              <span className="text-xs sm:text-sm md:text-base font-semibold text-orange-500">
                Sexism
							</span>
					</div>
					<h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
						당신의 온라인 편향성 분석
					</h1>
				</div>
				<div className="flex flex-col md:flex-row gap-4 md:gap-0 mt-4 sm:mt-6">
          {/* 원문 섹션 */}
          <div
            className="flex-1 rounded-3xl md:rounded-r-none bg-background"
            style={{ boxShadow: "-6px -5px 15px 0 rgba(0, 0, 0, 0.08)" }}
          >
            <div className="flex flex-col p-3 sm:p-4 md:p-6">
              <div className="min-h-10 sm:min-h-12 flex items-center justify-center border-b border-gray-200 pb-2 sm:pb-3">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                  {result ? "원문" : "수정 전"}
                </p>
              </div>
              <div className="min-h-[160px] sm:min-h-[200px] md:min-h-[280px] p-3 sm:p-4 md:p-6">
                <textarea
                  value={value}
                  onChange={handleTextAreaChange}
                  placeholder="내용을 입력하세요..."
                  className="w-full h-full min-h-[140px] sm:min-h-[180px] md:min-h-[240px]
                    text-sm sm:text-base md:text-lg
                    resize-none outline-none"
                />
              </div>
              <div className="flex justify-between items-center pt-2 sm:pt-3 border-t border-gray-200 px-1 sm:px-2">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                  <Button
                    size="icon"
                    onClick={() => speakText(value)}
                    className={!value ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    <Icon name="voice" color="var(--color-gray-500)" />
                  </Button>
                  <div className="flex gap-2 sm:gap-3 md:gap-4">
                    <Button
                      size="icon"
                      onClick={handleUndo}
                      disabled={!canUndo}
                    >
                      <Icon name="arrow-curve-left-up" color="var(--color-gray-500)" />
                    </Button>
                    <Button
                      size="icon"
                      onClick={handleRedo}
                      disabled={!canRedo}
                    >
                      <Icon name="arrow-curve-right-up" color="var(--color-gray-500)" />
                    </Button>
                  </div>
                  {value !== "" && (
                    <Button
                      size="icon"
                      onClick={handleClear}
                    >
                      <Icon name="x" color="var(--color-gray-500)" />
                    </Button>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-500">
                  {value.length}자
                </p>
              </div>
            </div>
          </div>

          {/* 중앙 아이콘 (데스크톱만) */}
          <div className="hidden md:flex items-center justify-center px-2">
            <Icon
              name="chevron-double-left"
              color="var(--color-gray-400)"
            />
          </div>

          {/* 수정 후 섹션 */}
          <div
            className={`flex-1 rounded-3xl md:rounded-l-none bg-background
              ${result ? "ring-2 ring-blue-500" : error ? "ring-2 ring-red-500" : ""}`}
            style={{ boxShadow: "-6px -5px 15px 0 rgba(0, 0, 0, 0.08)" }}
          >
            <div className="flex flex-col p-3 sm:p-4 md:p-6">
              <div className="min-h-10 sm:min-h-12 flex items-center justify-center border-b border-gray-200 pb-2 sm:pb-3">
                <p className={`text-sm sm:text-base md:text-lg lg:text-xl font-medium
                  ${isLoading ? "animate-pulse" :
                    result ? "text-blue-500" :
                    error ? "text-red-500" : ""}`}
                >
                  {isLoading ? "교정 중..." :
                    result ? "수정 후" :
                    error ? "오류" : "수정 후"}
                </p>
              </div>
              <div className="min-h-[160px] sm:min-h-[200px] md:min-h-[280px] p-3 sm:p-4 md:p-6">
                {isLoading ? (
                  <div className="flex flex-col w-full gap-2 sm:gap-3">
                    {[...Array(5)].map((_, index) => (
                      <div key={index} className="w-full h-4 sm:h-5 bg-gray-200 rounded animate-pulse" />
                    ))}
                  </div>
                ) : error ? (
                  <p className="text-center text-sm sm:text-base text-red-600 mt-8">
                    {error}
                  </p>
                ) : result !== null ? (
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed
                    text-transparent bg-clip-text bg-local
                    bg-[linear-gradient(120deg,var(--foreground)_10%,var(--color-green-500)_25%,var(--color-purple-500)_50%,var(--color-blue-500)_75%,var(--foreground)_90%)]
                    bg-size-[850%_auto] animate-wipe"
                  >
                    {result || "수정이 필요하지 않은 문장입니다."}
                  </p>
                ) : (
                  <p className="text-center text-sm sm:text-base text-gray-400 mt-8">
                    교정 결과가 여기에 표시됩니다
                  </p>
                )}
              </div>
              <div className="flex justify-between items-center pt-2 sm:pt-3 border-t border-gray-200 px-1 sm:px-2 min-h-[40px]">
                {result && (
                  <>
                    <Button
                      size="icon"
                      onClick={() => speakText(result)}
                    >
                      <Icon name="voice" color="var(--color-gray-500)" />
                    </Button>
                    <Button
                      size="icon"
                      onClick={() => copyText(result)}
                    >
                      <Icon name="copy-right" color="var(--color-gray-500)" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
				<div className="flex justify-end mt-6 sm:mt-10 md:mt-16 lg:mt-22">
          <Button
            className={value === "" ?
              "bg-blue-500/50 hover:bg-blue-600/50 cursor-not-allowed" :
              "bg-blue-500 hover:bg-blue-600"}
            disabled={value === ""}
            onClick={() => {{
              result && value === comment ? window.location.href = `/feedback?comment=${encodeURIComponent(value)}&result=${encodeURIComponent(result)}${returnPath ? `&returnPath=${encodeURIComponent(returnPath)}` : ""}` :
              window.location.href = `/correct?comment=${encodeURIComponent(value)}`;
            }}}
          >
            {isLoading ? "교정 중..." :
              result && value !== comment ? "다시 교정하기" :
              result ? "분석하기" :
              "교정하기"}
          </Button>
				</div>
			</section>
		</main>
	);
}