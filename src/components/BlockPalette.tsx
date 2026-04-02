import { ArrowUpIcon, ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import type { Direction } from '@/types/game';

interface BlockPaletteProps {
  disabled: boolean;
  onAdd: (dir: Direction) => void;
}

const BLOCKS: { dir: Direction; label: string; color: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { dir: 'UP', label: '위', color: 'bg-sky-400 hover:bg-sky-500', Icon: ArrowUpIcon },
  { dir: 'DOWN', label: '아래', color: 'bg-orange-400 hover:bg-orange-500', Icon: ArrowDownIcon },
  { dir: 'LEFT', label: '왼쪽', color: 'bg-violet-400 hover:bg-violet-500', Icon: ArrowLeftIcon },
  { dir: 'RIGHT', label: '오른쪽', color: 'bg-emerald-400 hover:bg-emerald-500', Icon: ArrowRightIcon },
];

export default function BlockPalette({ disabled, onAdd }: BlockPaletteProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {BLOCKS.map(({ dir, label, color, Icon }) => (
        <button
          key={dir}
          onClick={() => onAdd(dir)}
          disabled={disabled}
          className={`${color} text-white font-bold px-4 py-2 rounded-lg shadow text-sm transition-transform active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5`}
        >
          <Icon className="w-4 h-4" /> {label}
        </button>
      ))}
    </div>
  );
}
