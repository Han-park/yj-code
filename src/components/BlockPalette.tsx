import { ArrowUpIcon, ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import type { Direction } from '@/types/game';

interface BlockPaletteProps {
  disableMoveButtons: boolean;
  disableRepeatButtons: boolean;
  showRepeatButtons: boolean;
  onAddMove: (dir: Direction) => void;
  onAddRepeat: (dir: Direction) => void;
}

const BLOCKS: {
  dir: Direction;
  label: string;
  color: string;
  solidColor: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { dir: 'UP', label: '위', color: 'bg-sky-400 hover:bg-sky-500', solidColor: 'bg-sky-400', Icon: ArrowUpIcon },
  { dir: 'DOWN', label: '아래', color: 'bg-orange-400 hover:bg-orange-500', solidColor: 'bg-orange-400', Icon: ArrowDownIcon },
  { dir: 'LEFT', label: '왼쪽', color: 'bg-violet-400 hover:bg-violet-500', solidColor: 'bg-violet-400', Icon: ArrowLeftIcon },
  { dir: 'RIGHT', label: '오른쪽', color: 'bg-emerald-400 hover:bg-emerald-500', solidColor: 'bg-emerald-400', Icon: ArrowRightIcon },
];

export default function BlockPalette({
  disableMoveButtons,
  disableRepeatButtons,
  showRepeatButtons,
  onAddMove,
  onAddRepeat,
}: BlockPaletteProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {BLOCKS.map(({ dir, label, color, Icon }) => (
          <button
            key={dir}
            onClick={() => onAddMove(dir)}
            disabled={disableMoveButtons}
            className={`${color} text-white font-bold px-4 py-2 rounded-lg shadow text-sm transition-transform active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5`}
          >
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>
      {showRepeatButtons && (
        <div>
          <p className="mb-2 text-xs font-semibold text-amber-700 uppercase tracking-wide">반복 블럭</p>
          <div className="flex flex-wrap gap-2">
            {BLOCKS.map(({ dir, label, solidColor, Icon }) => (
              <button
                key={`repeat-${dir}`}
                onClick={() => onAddRepeat(dir)}
                disabled={disableRepeatButtons}
                className="group rounded-2xl bg-slate-300 hover:bg-slate-400 text-slate-700 shadow px-2 py-2 text-sm transition-transform active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="mb-1 flex items-center gap-1 px-1 text-xs font-black uppercase tracking-wide text-slate-700">
                  <span>⭐까지</span>
                  <span>반복</span>
                </span>
                <span className={`flex items-center gap-1.5 rounded-xl px-3 py-2 font-bold text-white ${solidColor}`}>
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
