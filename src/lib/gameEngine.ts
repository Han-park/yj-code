import type { Position, Direction } from '@/types/game';
import { GRID_SIZE } from './levels';

export type MoveResult =
  | { kind: 'ok'; position: Position }
  | { kind: 'wall' }
  | { kind: 'trap'; position: Position };

export function applyMove(
  pos: Position,
  dir: Direction,
  walls: Position[],
  traps: Position[]
): MoveResult {
  let row = pos.row;
  let col = pos.col;

  if (dir === 'UP') row -= 1;
  else if (dir === 'DOWN') row += 1;
  else if (dir === 'LEFT') col -= 1;
  else if (dir === 'RIGHT') col += 1;

  if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE) return { kind: 'wall' };

  for (const w of walls) {
    if (w.row === row && w.col === col) return { kind: 'wall' };
  }

  const position = { row, col };

  for (const t of traps) {
    if (t.row === row && t.col === col) return { kind: 'trap', position };
  }

  return { kind: 'ok', position };
}

export function positionsEqual(a: Position, b: Position): boolean {
  return a.row === b.row && a.col === b.col;
}

export function computePath(
  start: Position,
  sequence: Direction[],
  walls: Position[],
  traps: Position[]
): { path: Position[]; wallAtIndex: number | null; trapAtIndex: number | null } {
  const path: Position[] = [];
  let pos = start;

  for (let i = 0; i < sequence.length; i++) {
    const result = applyMove(pos, sequence[i], walls, traps);

    if (result.kind === 'wall') {
      return { path, wallAtIndex: i, trapAtIndex: null };
    }

    path.push(result.position);
    pos = result.position;

    if (result.kind === 'trap') {
      return { path, wallAtIndex: null, trapAtIndex: i };
    }
  }

  return { path, wallAtIndex: null, trapAtIndex: null };
}
