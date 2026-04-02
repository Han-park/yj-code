import type { Level } from '@/types/game';

export const GRID_SIZE = 6;

export const LEVELS: Level[] = [
  {
    // 튜토리얼: 장애물 없음, 제한 없음
    id: 1,
    name: '쭉 앞으로',
    startPosition: { row: 5, col: 0 },
    goalPosition:  { row: 5, col: 4 },
    walls: [],
    traps: [],
  },
  {
    // 방향 전환 연습: 장애물 없음, 제한 없음
    id: 2,
    name: '오른쪽으로 돌기',
    startPosition: { row: 5, col: 0 },
    goalPosition:  { row: 2, col: 4 },
    walls: [],
    traps: [],
  },
  {
    // 벽 우회: 세로 벽이 중간을 막음 → 아래로 돌아가야 함
    id: 3,
    name: '벽을 돌아서',
    startPosition: { row: 0, col: 0 },
    goalPosition:  { row: 0, col: 4 },
    walls: [
      { row: 0, col: 2 },
      { row: 1, col: 2 },
      { row: 2, col: 2 },
    ],
    traps: [],
    maxBlocks: 8,
  },
  {
    // 지뢰밭: 지뢰를 피해 좁은 통로로 이동
    id: 4,
    name: '지뢰밭',
    startPosition: { row: 5, col: 0 },
    goalPosition:  { row: 0, col: 5 },
    walls: [],
    traps: [
      { row: 5, col: 2 },
      { row: 4, col: 1 },
      { row: 3, col: 3 },
      { row: 2, col: 2 },
      { row: 1, col: 4 },
    ],
    maxBlocks: 8,
  },
  {
    // 좁은 미로: 벽이 많아 단 하나의 경로만 존재
    id: 5,
    name: '좁은 미로',
    startPosition: { row: 5, col: 0 },
    goalPosition:  { row: 0, col: 5 },
    walls: [
      { row: 0, col: 1 }, { row: 1, col: 1 }, { row: 2, col: 1 },
      { row: 2, col: 2 }, { row: 2, col: 3 },
      { row: 3, col: 3 }, { row: 4, col: 3 },
      { row: 4, col: 4 }, { row: 4, col: 5 },
    ],
    traps: [],
    maxBlocks: 10,
  },
  {
    // 최후의 관문: 벽 + 지뢰 혼합, 타이트한 블럭 제한
    id: 6,
    name: '최후의 관문',
    startPosition: { row: 5, col: 0 },
    goalPosition:  { row: 0, col: 5 },
    walls: [
      { row: 1, col: 2 }, { row: 2, col: 2 },
      { row: 3, col: 4 }, { row: 4, col: 4 },
    ],
    traps: [
      { row: 5, col: 3 },
      { row: 3, col: 1 },
      { row: 1, col: 4 },
    ],
    maxBlocks: 9,
  },
];
