import type { Level } from '@/types/game';

export const GRID_SIZE = 8;

export const LEVELS: Level[] = [
  {
    id: 1,
    name: '쭉 앞으로',
    startPosition: { row: 7, col: 0 },
    goalPosition: { row: 7, col: 4 },
    obstacles: [],
  },
  {
    id: 2,
    name: '오른쪽으로 돌기',
    startPosition: { row: 7, col: 0 },
    goalPosition: { row: 4, col: 4 },
    obstacles: [],
  },
  {
    id: 3,
    name: '언덕을 내려가',
    startPosition: { row: 0, col: 0 },
    goalPosition: { row: 4, col: 4 },
    obstacles: [],
  },
  {
    id: 4,
    name: '위로 올라가',
    startPosition: { row: 4, col: 4 },
    goalPosition: { row: 0, col: 7 },
    obstacles: [],
  },
  {
    id: 5,
    name: '긴 여행',
    startPosition: { row: 7, col: 7 },
    goalPosition: { row: 0, col: 0 },
    obstacles: [],
  },
];
