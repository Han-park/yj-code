import { ArrowUpIcon, ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import type { Direction } from '@/types/game';

interface BlockItemProps {
  direction: Direction;
  index: number;
  lineNumber: number;
  isActive: boolean;
  isDisabled: boolean;
  onRemove: (index: number) => void;
}

const DIR_STYLES: Record<Direction, { color: string; label: string; Icon: React.ComponentType<{ className?: string }> }> = {
  UP: { color: 'bg-sky-400', label: '위', Icon: ArrowUpIcon },
  DOWN: { color: 'bg-orange-400', label: '아래', Icon: ArrowDownIcon },
  LEFT: { color: 'bg-violet-400', label: '왼쪽', Icon: ArrowLeftIcon },
  RIGHT: { color: 'bg-emerald-400', label: '오른쪽', Icon: ArrowRightIcon },
};

export default function BlockItem({ direction, index, lineNumber, isActive, isDisabled, onRemove }: BlockItemProps) {
  const { color, label, Icon } = DIR_STYLES[direction];

  return (
    <div
      className={`flex items-center gap-2 rounded-lg text-white font-bold text-sm shadow transition-all overflow-hidden
        ${isActive ? 'outline outline-3 outline-yellow-400 brightness-125' : ''}
      `}
    >
      <span className={`self-stretch flex items-center justify-center px-2 min-w-[2rem] font-mono text-xs font-bold transition-colors
        ${isActive ? 'bg-yellow-400 text-slate-900' : 'bg-black/20 text-white/80'}`}>
        {lineNumber}
      </span>
      <span className={`flex items-center gap-2 flex-1 px-3 py-1.5 ${color}`}>
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </span>
      {!isDisabled && (
        <button
          onClick={() => onRemove(index)}
          className="ml-auto text-white/70 hover:text-white text-xs font-normal leading-none"
          aria-label="Remove block"
        >
          ✕
        </button>
      )}
    </div>
  );
}
