import type { Position, Direction } from '@/types/game';
import { GRID_SIZE } from './levels';

export function applyMove(pos: Position, dir: Direction, obstacles: Position[]): Position | null {
  let row = pos.row;
  let col = pos.col;

  if (dir === 'UP') row -= 1;
  else if (dir === 'DOWN') row += 1;
  else if (dir === 'LEFT') col -= 1;
  else if (dir === 'RIGHT') col += 1;

  if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE) return null;

  for (const obs of obstacles) {
    if (obs.row === row && obs.col === col) return null;
  }

  return { row, col };
}

export function positionsEqual(a: Position, b: Position): boolean {
  return a.row === b.row && a.col === b.col;
}

export function computePath(
  start: Position,
  sequence: Direction[],
  obstacles: Position[]
): { path: Position[]; failAtIndex: number | null } {
  const path: Position[] = [];
  let pos = start;

  for (let i = 0; i < sequence.length; i++) {
    const next = applyMove(pos, sequence[i], obstacles);
    if (next === null) {
      return { path, failAtIndex: i };
    }
    path.push(next);
    pos = next;
  }

  return { path, failAtIndex: null };
}
