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
    // 벽 우회: 세로 벽이 중간을 막음 → 자유롭게 돌아가는 연습
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
  },
  {
    // 제한 연습: 비슷한 우회 퍼즐을 제한된 블럭 수 안에 해결
    id: 4,
    name: '제한된 우회',
    startPosition: { row: 0, col: 0 },
    goalPosition:  { row: 0, col: 4 },
    walls: [
      { row: 0, col: 2 },
      { row: 1, col: 2 },
    ],
    traps: [],
    maxBlocks: 8,
  },
  {
    // 지뢰밭: 지뢰를 피해 좁은 통로로 이동
    id: 5,
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
    maxBlocks: 10,
  },
  {
    // 좁은 미로: 좁은 통로를 찾아 꺾어 가야 함
    id: 6,
    name: '좁은 미로',
    startPosition: { row: 5, col: 0 },
    goalPosition:  { row: 0, col: 5 },
    walls: [
      { row: 0, col: 1 }, { row: 2, col: 1 },
      { row: 1, col: 3 }, { row: 2, col: 2 }, { row: 2, col: 3 },
      { row: 3, col: 3 }, { row: 4, col: 3 },
      { row: 4, col: 4 }, { row: 4, col: 5 },
    ],
    traps: [],
    maxBlocks: 10,
  },
  {
    // 최후의 관문: 벽 + 지뢰 혼합, 타이트한 블럭 제한
    id: 7,
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
    maxBlocks: 10,
  },
  {
    // 반복문 입문: 별표에 닿을 때까지 같은 방향으로 반복
    id: 8,
    name: '별까지 반복',
    startPosition: { row: 5, col: 0 },
    goalPosition:  { row: 0, col: 5 },
    starPosition: { row: 0, col: 0 },
    walls: [],
    traps: [],
    maxBlocks: 5,
  },
  {
    // 반복 응용 1: 위로 반복한 뒤 안전한 윗길로 이동
    id: 9,
    name: '불길 위의 지름길',
    startPosition: { row: 5, col: 0 },
    goalPosition:  { row: 0, col: 5 },
    starPosition: { row: 3, col: 5 },
    walls: [
      { row: 4, col: 1 }, { row: 4, col: 2 }, { row: 4, col: 3 }, { row: 4, col: 4 },
    ],
    traps: [
      { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 },
    ],
    maxBlocks: 5,
  },
  {
    // 반복 응용 2: 별에서 딱 멈춰야 함정을 피할 수 있음
    id: 10,
    name: '별 앞에서 멈추기',
    startPosition: { row: 5, col: 0 },
    goalPosition:  { row: 0, col: 5 },
    starPosition: { row: 1, col: 3 },
    walls: [
      { row: 4, col: 2 }, { row: 3, col: 2 }, { row: 2, col: 2 },
      { row: 2, col: 3 }, { row: 2, col: 4 }, { row: 4, col: 4 },
    ],
    traps: [
      { row: 4, col: 1 }, { row: 3, col: 4 }, { row: 1, col: 4 },
    ],
    maxBlocks: 7,
  },
  {
    // 반복 응용 3: 별이 맨 윗줄에 있어 가로로 이동해 별의 열에 맞춘 뒤 위로 반복
    id: 11,
    name: '열 맞추고 올라가기',
    startPosition: { row: 5, col: 0 },
    goalPosition:  { row: 0, col: 5 },
    starPosition:  { row: 0, col: 2 },
    walls: [
      { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 1 },
      { row: 3, col: 3 }, { row: 3, col: 4 },
    ],
    traps: [
      { row: 4, col: 1 },
      { row: 2, col: 3 }, { row: 2, col: 4 },
    ],
    maxBlocks: 6,
  },
  {
    // 반복 응용 4: 별이 오른쪽 끝에 있어 위로 올라간 뒤 오른쪽으로 반복
    id: 12,
    name: '옆으로 달리기',
    startPosition: { row: 5, col: 0 },
    goalPosition:  { row: 0, col: 5 },
    starPosition:  { row: 2, col: 5 },
    walls: [
      { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 },
      { row: 3, col: 2 }, { row: 4, col: 1 },
    ],
    traps: [
      { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 },
      { row: 3, col: 1 }, { row: 3, col: 3 }, { row: 4, col: 4 },
    ],
    maxBlocks: 6,
  },
];
