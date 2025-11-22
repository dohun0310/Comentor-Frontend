"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

export default function Correct() {
  const searchParams = useSearchParams();
  const comment = searchParams.get("comment") ?? "";

  const [history, setHistory] = useState<{ entries: string[]; index: number }>(() => ({
    entries: [comment],
    index: 0,
  }));

  const value = history.entries[history.index] ?? "";
  const canUndo = history.index > 0;
  const canRedo = history.index < history.entries.length - 1;

  useEffect(() => {
    setHistory({ entries: [comment], index: 0 });
  }, [comment]);

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

	return (
		<main className="relative flex min-h-screen flex-col bg-blue-100/20">
			<div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,rgba(102,136,255,0.18),transparent_60%)]" />
			<Header />
			<section
        className="mx-auto w-full max-w-[1350px] 
                  flex flex-col
                  px-4 pb-16 pt-12"
        
      >
				<div className="flex flex-col gap-2">
					<div className="flex flex-wrap gap-4 text-sm font-medium">
							<span className="text-base font-semibold text-blue-500">
                Other Bias
							</span>
              <span className="text-base font-semibold text-green-700">
                Hate Content
							</span>
              <span className="text-base font-semibold text-purple-500">
                Abusive
							</span>
              <span className="text-base font-semibold text-orange-500">
                Sexism
							</span>
					</div>
					<h1 className="text-4xl font-semibold">
						당신의 온라인 편향성 분석
					</h1>
				</div>
				<div className="flex flex-col items-start
                        rounded-3xl mt-6"
        >
          <div className="max-w-[1350] w-full
                          flex flex-col
                          px-3 pb-3 bg-background"
          >
            <div className="min-h-17 relative flex items-center text-center">
              <p className="flex-1 text-xl">
                {comment === null ? "원문" : "수정 전"}
              </p>
              <Icon
                name="chevron-double-left"
                color="var(--color-gray-500)"
                className="absolute left-1/2 -translate-x-1/2"
              />
              <p className="flex-1 text-xl text-blue-500">
                {comment !== null && "수정 후"}
              </p>
            </div>
            <div className="min-h-75 h-full flex">
              <div className="flex-1 inline-flex gap-2 p-8 border-t border-gray-300">
                <textarea
                  value={value}
                  onChange={handleTextAreaChange}
                  placeholder="내용을 입력하세요..."
                  className="w-full h-full
                            resize-none outline-none"
                />
                {value !== "" && (
                  <Button
                    size="icon"
                    onClick={handleClear}
                  >
                    <Icon name="x" />
                  </Button>
                )}
              </div>
              <div className={`flex-1 inline-flex
                              gap-2 p-8 
                              ${comment === null ?
                                          "border-t border-gray-300" :
                                          "border border-blue-500"}`}
              >
                <p className="w-full h-full">
                  {value}
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-1 inline-flex justify-between p-8">
                <div className="h-fit flex gap-10">
                  <Button
                    size="icon"
                    onClick={() => speakText(value)}
                    className={comment === null ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    <Icon name="voice" color="var(--color-gray-500)" />
                  </Button>
                  <div className="flex gap-6">
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
                </div>
                <p>
                  {value.length}
                </p>
              </div>
              <div className="flex-1 inline-flex justify-between p-8">
                {comment !== null && (
                  <>
                    <Button
                      size="icon"
                      onClick={() => speakText(value)}
                    >
                      <Icon name="voice" color="var(--color-gray-500)" />
                    </Button>
                    <Button
                      size="icon"
                      onClick={() => copyText(value)}
                    >
                      <Icon name="copy-right" color="var(--color-gray-500)" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
				</div>
				<div className="flex justify-end mt-22">
          <Button
            className={value === "" ?
                                "bg-blue-500/50 hover:bg-blue-600/50 cursor-not-allowed" :
                                "bg-blue-500 hover:bg-blue-600"}
            disabled={value === ""}
            onClick={() => {window.location.href = `/correct?comment=${encodeURIComponent(value)}`;}}
          >
            분석하기
          </Button>
				</div>
			</section>
		</main>
	);
}