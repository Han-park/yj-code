import type { Level, Position } from '@/types/game';
import { GRID_SIZE } from '@/lib/levels';
import GridCell from './GridCell';

interface GameBoardProps {
  level: Level;
  horsePosition: Position;
  blockedDirection?: string | null;
}

export default function GameBoard({ level, horsePosition, blockedDirection }: GameBoardProps) {
  return (
    <div
      className="w-full max-w-[480px] aspect-square"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
      }}
    >
      {Array.from({ length: GRID_SIZE }, (_, row) =>
        Array.from({ length: GRID_SIZE }, (_, col) => {
          const isHorse = horsePosition.row === row && horsePosition.col === col;
          const isGoal = level.goalPosition.row === row && level.goalPosition.col === col;
          const isWall = level.walls.some(w => w.row === row && w.col === col);
          const isTrap = level.traps.some(t => t.row === row && t.col === col);
          return (
            <GridCell
              key={`${row}-${col}`}
              row={row}
              col={col}
              isHorse={isHorse}
              isGoal={isGoal}
              isWall={isWall}
              isTrap={isTrap}
              blockedDirection={isHorse ? blockedDirection : null}
            />
          );
        })
      )}
    </div>
  );
}
