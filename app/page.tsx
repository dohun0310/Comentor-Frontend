import Link from "next/link";
import { Header } from "@/components/Header";
import { PluginPreview } from "@/components/PluginPreview";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-[url('/background.png')] bg-cover bg-center">
      <Header />

      <section className="mx-auto flex w-full max-w-[1029px] flex-col items-center gap-10 md:gap-[60px] px-4 pt-8 md:pt-16 text-center">
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <h1 className="font-serif text-[28px] leading-[32px] md:text-[48px] md:leading-[1.15] font-extrabold text-gray-950 break-keep">
            청소년의 건전한 미디어 인식을 돕는 AI 가이드
          </h1>
          <p className="text-sm md:text-xl leading-[1.5] text-gray-700 break-keep">
            이 서비스는 청소년에게 잔소리를 하지 않습니다. 대신 영상을 스스로 비판적으로 바라보고 건전한 미디어 인식을 키울 수 있도록 돕는 맞춤형 미디어 코치 역할을 합니다. 청소년이 스스로 균형 잡힌 판단을 할 수 있도록, 부담 없이 자연스럽게 성장 경험을 제공합니다.
          </p>
        </div>

        <Link
          href="/correct"
          className="flex h-[42px] w-[160px] md:h-[60px] md:w-[215px] items-center justify-center rounded-[14px] bg-gray-950 text-base md:text-xl font-semibold text-gray-50 transition-colors hover:bg-gray-800"
        >
          시작하기
        </Link>
      </section>

      <section className="mx-auto mt-16 md:mt-24 w-full max-w-[1452px] px-4 pb-16">
        <PluginPreview />
      </section>
    </main>
  );
}
