interface GridCellProps {
  row: number;
  col: number;
  isHorse: boolean;
  isGoal: boolean;
  isObstacle: boolean;
  blockedDirection?: string | null;
}

export default function GridCell({ row, col, isHorse, isGoal, isObstacle, blockedDirection }: GridCellProps) {
  const isEven = (row + col) % 2 === 0;

  let bg = isEven ? 'bg-green-100' : 'bg-green-200';
  if (isObstacle) bg = 'bg-stone-400';
  if (isGoal && !isHorse) bg = 'bg-yellow-100';

  return (
    <div
      className={`${bg} flex items-center justify-center text-lg select-none border border-green-300/40`}
      style={{ aspectRatio: '1' }}
    >
      {isHorse && (
        <span
          style={{ fontSize: '1.6rem', lineHeight: 1 }}
          className={blockedDirection ? `bump-${blockedDirection}` : ''}
        >
          🐴
        </span>
      )}
      {isGoal && !isHorse && <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>⭐</span>}
    </div>
  );
}
