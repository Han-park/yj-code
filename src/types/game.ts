export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type ProgramBlock =
  | { type: 'move'; dir: Direction }
  | { type: 'repeatUntilStar'; dir: Direction };

export interface Position {
  row: number; // 0–5, 0 = top
  col: number; // 0–5, 0 = left
}

export interface Level {
  id: number;
  name: string;
  startPosition: Position;
  goalPosition: Position;
  starPosition?: Position;
  walls: Position[];   // movement blocked
  traps: Position[];   // entering = instant fail
  maxBlocks?: number;  // undefined = unlimited
}

export type GameStatus = 'idle' | 'running' | 'won' | 'failed' | 'blocked' | 'trapped';

export interface GameState {
  currentLevelIndex: number;
  horsePosition: Position;
  sequence: ProgramBlock[];
  status: GameStatus;
  currentStepIndex: number;
  blockedAtLine: number | null;
}
