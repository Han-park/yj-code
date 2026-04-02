interface GridCellProps {
  row: number;
  col: number;
  isHorse: boolean;
  isGoal: boolean;
  isWall: boolean;
  isTrap: boolean;
  blockedDirection?: string | null;
}

export default function GridCell({ row, col, isHorse, isGoal, isWall, isTrap, blockedDirection }: GridCellProps) {
  const isEven = (row + col) % 2 === 0;

  let bg = isEven ? 'bg-green-100' : 'bg-green-200';
  if (isWall) bg = 'bg-stone-600';
  if (isTrap) bg = 'bg-orange-100';
  if (isGoal && !isHorse) bg = 'bg-yellow-100';

  return (
    <div
      className={`${bg} flex items-center justify-center text-lg select-none border border-green-300/40`}
      style={{ aspectRatio: '1' }}
    >
      {isWall && (
        <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>🧱</span>
      )}
      {isTrap && !isHorse && (
        <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>🔥</span>
      )}
      {isHorse && (
        <span
          style={{ fontSize: '2.2rem', lineHeight: 1 }}
          className={blockedDirection ? `bump-${blockedDirection}` : ''}
        >
          🐴
        </span>
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
