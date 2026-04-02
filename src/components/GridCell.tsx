import type { Direction } from '@/types/game';

interface GridCellProps {
  row: number;
  col: number;
  isHorse: boolean;
  isGoal: boolean;
  isStar: boolean;
  isWall: boolean;
  isTrap: boolean;
  blockedDirection?: string | null;
  activeRepeatDirection?: Direction | null;
}

const REPEAT_LABELS: Record<Direction, string> = {
  UP: '↑',
  DOWN: '↓',
  LEFT: '←',
  RIGHT: '→',
};

export default function GridCell({
  row,
  col,
  isHorse,
  isGoal,
  isStar,
  isWall,
  isTrap,
  blockedDirection,
  activeRepeatDirection,
}: GridCellProps) {
  const isEven = (row + col) % 2 === 0;

  let bg = isEven ? 'bg-green-100' : 'bg-green-200';
  if (isWall) bg = 'bg-stone-600';
  if (isTrap) bg = 'bg-orange-100';
  if (isStar && !isHorse) bg = 'bg-amber-100';
  if (isGoal && !isHorse) bg = 'bg-yellow-100';

  return (
    <div
      className={`${bg} relative flex items-center justify-center text-lg select-none border border-green-300/40`}
      style={{ aspectRatio: '1' }}
    >
      {isWall && (
        <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>🧱</span>
      )}
      {isTrap && !isHorse && (
        <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>🔥</span>
      )}
      {isStar && !isHorse && !isTrap && !isGoal && (
        <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>⭐</span>
      )}
      {isHorse && (
        <>
          {activeRepeatDirection && (
            <div className="absolute -top-11 left-1/2 z-10 -translate-x-1/2 rounded-2xl bg-white px-3 py-1 text-[11px] font-black text-slate-700 shadow-lg ring-1 ring-slate-200 whitespace-nowrap">
              별 까지 {REPEAT_LABELS[activeRepeatDirection]}
              <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-white ring-1 ring-slate-200" />
            </div>
          )}
          <span
            style={{ fontSize: '2.2rem', lineHeight: 1 }}
            className={blockedDirection ? `bump-${blockedDirection}` : ''}
          >
            🐴
          </span>
        </>
      )}
      {isGoal && !isHorse && !isTrap && (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="2" x2="7" y2="22" stroke="#92400e" strokeWidth="2.2" />
          <path d="M7 2 L20 7 L7 13 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
        </svg>
      )}
    </div>
  );
}
