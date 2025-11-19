import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-col items-center gap-12.5 mx-auto mt-16 w-full max-w-[1380px]">
        <div className="flex flex-col items-center text-center gap-6 px-4 break-keep">
          <h1 className="text-5xl font-bold font-serif">
            청소년의 건전한 미디어 인식을 돕는 AI 가이드
          </h1>
          <p className="text-xl text-gray-700">
            이 서비스는 청소년에게 잔소리를 하지 않습니다. 대신 영상을 스스로 비판적으로 바라보고 건전한 미디어 인식을 키울 수 있도록 돕는 
            <br />
            맞춤형 미디어 코치 역할을 합니다. 청소년이 스스로 균형 잡힌 판단을 할 수 있도록, 부담 없이 자연스럽게 성장 경험을 제공합니다.
          </p>
        </div>
        <Link href="/correct">
          <Button>
            시작하기
          </Button>
        </Link>
        <Image
          src="/hero.png"
          alt="Hero image"
          width={1380}
          height={780}
          sizes={"70vw"}
          quality={100}
          preload
          className="w-full h-auto"
        />
      </div>
      <Image
        src="/background.png"
        alt="Background image"
        fill
        sizes={"100vw"}
        quality={100}
        preload
        className="pointer-events-none -z-10 object-cover object-center"
      />
    </main>
  );
}