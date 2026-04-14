import { Header } from "../Header";
import {
  ArrowCurveLeftUpIcon,
  ArrowCurveRightUpIcon,
  ChevronDoubleLeftIcon,
  ClockIcon,
  CopyRightIcon,
  HomeIcon,
  MenuIcon,
  ThumbDownIcon,
  ThumbUpIcon,
  VolumeIcon,
  XIcon,
} from "@/components/Icon";

const SAMPLE_BEFORE = `와 너 진짜 기본도 없네. 하는 말마다 상대에 대한 배려가 전혀 느껴지지 않아서 읽는 내가 계속 스트레스를 받는다. 네가 무슨 의도로 말하는지는 알겠는데, 지금처럼 아무 생각 없이 툭 던지는 식으로 이야기하면 불필요한 오해만 만든다.

조금만 더 신중하게 말하려고 했으면 좋겠다는 생각이 든다. 네 표현 방식이 계속 이렇게 거칠면 대화가 더 진행되기 어려울 것 같아. 상대가 어떻게 느낄지를 한 번만이라도 고려해줬으면 한다.`;

const SAMPLE_AFTER = `네가 말하는 의도는 알겠지만, 지금 표현 방식은 상대방에게 상처가 될 수 있어. 조금 더 신중하게 말하려고 노력하면 좋겠어. 네가 무슨 말을 하려는지 이해하려고 노력하지만, 지금처럼 거칠게 표현하면 오해가 생길 수 있어.

상대방이 어떻게 느낄지를 한 번만이라도 고려해줬으면 해. 대화가 더 원활하게 진행될 수 있도록 서로 배려하는 마음이 필요하다고 생각해.`;

export function PluginPreview() {
  return (
    <div
      className="relative flex overflow-hidden rounded-[20px] bg-white"
      style={{
        boxShadow: "0 3.395px 16.974px 0 rgba(0,0,0,0.08)"
      }}
    >
      <aside className="hidden md:flex w-14 shrink-0 flex-col items-center justify-between border-r border-gray-200 bg-white/70 backdrop-blur py-5">
        <div className="flex flex-col items-center gap-3">
          <MenuIcon size={18} color="var(--color-gray-800)" />
          <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-[10px] hover:bg-gray-100">
            <HomeIcon size={18} color="var(--color-gray-800)" />
          </div>
          <div className="h-px w-8 bg-gray-200" />
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px] hover:bg-gray-100">
            <ClockIcon size={18} color="var(--color-gray-800)" />
          </div>
        </div>
        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-300 to-blue-500" />
      </aside>

      <div className="flex flex-1 flex-col items-center gap-4 px-6 pb-10 md:px-10 md:pb-14 bg-blue-100/20">
        <Header />
        
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(102,136,255,0.18),transparent_60%)]" />

        <div className="flex flex-col items-center gap-3 py-2">
          <h2 className="text-center text-xl md:text-3xl font-bold leading-[1.3] text-black break-keep">
            온라인 속 편향성,
            <br />
            당신은 얼마나 알고 있나요?
          </h2>
          <div className="h-px w-[220px] md:w-[358px] bg-gray-300" />
          <div className="flex flex-wrap justify-center gap-3 text-xs md:text-sm">
            <span className="text-blue-500">Other Bias</span>
            <span className="text-green-700">Hate Content</span>
            <span className="text-purple-500">Abusive</span>
            <span className="text-orange-500">Sexism</span>
          </div>
        </div>

        <div
          className="relative grid w-full max-w-[908px] grid-cols-1 gap-3 overflow-hidden rounded-[12px] md:grid-cols-2 md:gap-0 md:border md:border-gray-300"
        >
          <div className="pointer-events-none hidden md:flex absolute left-1/2 top-2.5 -translate-x-1/2">
            <ChevronDoubleLeftIcon size={15} color="var(--color-gray-400)" />
          </div>
          <Panel label="교정 전" before />
          <Panel label="교정 됨" />
        </div>

        <div className="mt-2 flex h-9 w-72 items-center justify-center rounded-[12px] bg-blue-500 text-xs font-semibold text-white">
          교정하기
        </div>
      </div>
    </div>
  );
}

function Panel({ label, before }: { label: string; before?: boolean }) {
  return (
    <div className="flex flex-col bg-white rounded-[12px] border border-gray-300 md:border-0 md:rounded-none">
      <div className="flex h-8 items-center justify-center">
        <p className="text-[12px] font-medium text-gray-800">{label}</p>
      </div>
      {before ? (
        <div className="flex gap-2 p-4 h-[220px] border-t border-gray-300 md:border-r">
          <p className="flex-1 text-sm leading-[1.5] text-gray-800 whitespace-pre-wrap line-clamp-[10]">
            {SAMPLE_BEFORE}
          </p>
          <XIcon size={15} color="var(--color-gray-400)" strokeWidth={1.5} />
        </div>
      ) : (
        <div className="flex gap-2 p-4 h-[220px] border-t border-gray-300">
          <p className="flex-1 text-sm leading-[1.5] text-gray-800 whitespace-pre-wrap line-clamp-[10]">
            {SAMPLE_AFTER}
          </p>
          <XIcon size={15} color="var(--color-gray-400)" strokeWidth={1.5} />
        </div>
      )}
      <div className="flex items-center justify-between px-4 py-3">
        {before ? (
          <>
            <div className="flex gap-3">
              <VolumeIcon size={15} color="var(--color-gray-800)" />
              <ArrowCurveLeftUpIcon size={15} color="var(--color-gray-800)" />
              <ArrowCurveRightUpIcon size={15} color="var(--color-gray-800)" />
            </div>
            <span className="text-sm font-medium text-gray-800">1,570</span>
          </>
        ) : (
          <>
            <VolumeIcon size={15} color="var(--color-gray-800)" />
            <div className="flex gap-3">
              <ThumbUpIcon size={15} color="var(--color-gray-800)" strokeWidth={1.5} />
              <ThumbDownIcon size={15} color="var(--color-gray-800)" strokeWidth={1.5} />
              <CopyRightIcon size={15} color="var(--color-gray-800)" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
