import { ArrowUpIcon, ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import type { Direction, ProgramBlock } from '@/types/game';

interface BlockItemProps {
  block: ProgramBlock;
  index: number;
  lineNumber: number;
  isActive: boolean;
  isDisabled: boolean;
  onRemove: (index: number) => void;
}

const DIR_STYLES: Record<
  Direction,
  {
    color: string;
    accentColor: string;
    label: string;
    Icon: React.ComponentType<{ className?: string }>;
  }
> = {
  UP: { color: 'bg-sky-400', accentColor: 'bg-sky-500', label: '위', Icon: ArrowUpIcon },
  DOWN: { color: 'bg-orange-400', accentColor: 'bg-orange-500', label: '아래', Icon: ArrowDownIcon },
  LEFT: { color: 'bg-violet-400', accentColor: 'bg-violet-500', label: '왼쪽', Icon: ArrowLeftIcon },
  RIGHT: { color: 'bg-emerald-400', accentColor: 'bg-emerald-500', label: '오른쪽', Icon: ArrowRightIcon },
};

export default function BlockItem({ block, index, lineNumber, isActive, isDisabled, onRemove }: BlockItemProps) {
  const { color, accentColor, label, Icon } = DIR_STYLES[block.dir];
  const isRepeatBlock = block.type === 'repeatUntilStar';

  return (
    <div
      className={`flex items-stretch gap-2 rounded-xl text-white font-bold text-sm shadow transition-all overflow-hidden
        ${isActive ? 'outline outline-3 outline-yellow-400 brightness-125' : ''}
      `}
    >
      <span className={`self-stretch flex items-center justify-center px-3 min-w-[3.2rem] font-mono text-base font-black transition-colors
        ${isActive ? 'bg-yellow-400 text-slate-900' : isRepeatBlock ? 'bg-slate-500 text-white' : `${accentColor} text-white`}`}>
        {lineNumber}
      </span>
      {isRepeatBlock ? (
        <span className="flex flex-1 items-center bg-slate-300 px-2 py-2">
          <span className="mr-2 flex items-center gap-1 rounded-xl bg-slate-200 px-2 py-2 text-xs font-black uppercase tracking-wide text-slate-700">
            <span>⭐까지</span>
            <span>반복</span>
          </span>
          <span className={`flex flex-1 items-center gap-2 rounded-xl px-4 py-2 ${color}`}>
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </span>
        </span>
      ) : (
        <span className={`flex items-center gap-2 flex-1 px-4 py-2 ${color}`}>
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </span>
      )}
      {!isDisabled && (
        <button
          onClick={() => onRemove(index)}
          className={`px-4 ${isActive ? 'bg-yellow-300 text-slate-900' : isRepeatBlock ? 'bg-slate-300 text-slate-600 hover:text-slate-900' : `${color} text-white/90 hover:text-white`} focus:outline-none focus:ring-2 focus:ring-white/70 text-xl font-black leading-none transition`}
          aria-label={`${lineNumber}번째 블럭 지우기`}
          title="이 블럭 지우기"
        >
          ✕
        </button>
      )}
    </div>
  );
}
