export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface Position {
  row: number; // 0–9, 0 = top
  col: number; // 0–9, 0 = left
}

export interface Level {
  id: number;
  name: string;
  startPosition: Position;
  goalPosition: Position;
  obstacles: Position[];
  maxBlocks?: number;
}

export type GameStatus = 'idle' | 'running' | 'won' | 'failed' | 'blocked';

export interface GameState {
  currentLevelIndex: number;
  horsePosition: Position;
  sequence: Direction[];
  status: GameStatus;
  currentStepIndex: number;
  blockedAtLine: number | null;
}
