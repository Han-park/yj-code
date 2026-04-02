import type { Position, Direction, ProgramBlock } from '@/types/game';
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
  sequence: ProgramBlock[],
  walls: Position[],
  traps: Position[],
  starPosition?: Position
): {
  path: Position[];
  lineIndexByStep: number[];
  wallAtIndex: number | null;
  trapAtStepIndex: number | null;
} {
  const path: Position[] = [];
  const lineIndexByStep: number[] = [];
  let pos = start;

  for (let i = 0; i < sequence.length; i++) {
    const block = sequence[i];
    const repeatUntilStar = block.type === 'repeatUntilStar';
    const maxRepeatSteps = GRID_SIZE * GRID_SIZE;
    let repeatCount = 0;

    while (true) {
      const result = applyMove(pos, block.dir, walls, traps);

      if (result.kind === 'wall') {
        return { path, lineIndexByStep, wallAtIndex: i, trapAtStepIndex: null };
      }

      path.push(result.position);
      lineIndexByStep.push(i);
      pos = result.position;

      if (result.kind === 'trap') {
        return { path, lineIndexByStep, wallAtIndex: null, trapAtStepIndex: path.length - 1 };
      }

      if (!repeatUntilStar) {
        break;
      }

      repeatCount += 1;
      if (starPosition && positionsEqual(result.position, starPosition)) {
        break;
      }

      if (repeatCount >= maxRepeatSteps) {
        return { path, lineIndexByStep, wallAtIndex: i, trapAtStepIndex: null };
      }
    }
  }

  return { path, lineIndexByStep, wallAtIndex: null, trapAtStepIndex: null };
}
