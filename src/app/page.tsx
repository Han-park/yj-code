'use client';

import { useReducer, useRef, useEffect } from 'react';
import type { GameState, GameStatus, Direction, Position } from '@/types/game';
import { LEVELS } from '@/lib/levels';
import { computePath, positionsEqual } from '@/lib/gameEngine';
import GameBoard from '@/components/GameBoard';
import CodeEditor from '@/components/CodeEditor';
import WinModal from '@/components/WinModal';
import BlockedModal from '@/components/BlockedModal';

// ── Reducer ──────────────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_LEVEL'; levelIndex: number }
  | { type: 'ADD_BLOCK'; dir: Direction }
  | { type: 'REMOVE_BLOCK'; index: number }
  | { type: 'CLEAR_SEQUENCE' }
  | { type: 'START_RUN' }
  | { type: 'STEP_COMPLETE'; position: Position; stepIndex: number }
  | { type: 'SET_STATUS'; status: GameStatus; blockedAtLine?: number }
  | { type: 'RESET' };

function makeInitialState(levelIndex = 0): GameState {
  return {
    currentLevelIndex: levelIndex,
    horsePosition: LEVELS[levelIndex].startPosition,
    sequence: [],
    status: 'idle',
    currentStepIndex: -1,
    blockedAtLine: null,
  };
}

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'SET_LEVEL':
      return makeInitialState(action.levelIndex);
    case 'ADD_BLOCK':
      return { ...state, sequence: [...state.sequence, action.dir] };
    case 'REMOVE_BLOCK':
      return {
        ...state,
        sequence: state.sequence.filter((_, i) => i !== action.index),
      };
    case 'CLEAR_SEQUENCE':
      return { ...state, sequence: [] };
    case 'START_RUN':
      return { ...state, status: 'running', currentStepIndex: 0 };
    case 'STEP_COMPLETE':
      return {
        ...state,
        horsePosition: action.position,
        currentStepIndex: action.stepIndex,
      };
    case 'SET_STATUS':
      return { ...state, status: action.status, currentStepIndex: -1, blockedAtLine: action.blockedAtLine ?? null };
    case 'RESET':
      return {
        ...state,
        horsePosition: LEVELS[state.currentLevelIndex].startPosition,
        status: 'idle',
        currentStepIndex: -1,
        blockedAtLine: null,
      };
    default:
      return state;
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [state, dispatch] = useReducer(gameReducer, makeInitialState(0));
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const level = LEVELS[state.currentLevelIndex];

  function clearAllTimers() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  function runSequence() {
    if (state.sequence.length === 0) return;

    const { path, failAtIndex } = computePath(
      level.startPosition,
      state.sequence,
      level.obstacles
    );

    dispatch({ type: 'START_RUN' });

    path.forEach((position, i) => {
      const t = setTimeout(() => {
        dispatch({ type: 'STEP_COMPLETE', position, stepIndex: i });

        if (failAtIndex === null && i === path.length - 1) {
          const won = positionsEqual(position, level.goalPosition);
          dispatch({ type: 'SET_STATUS', status: won ? 'won' : 'failed' });
        }
      }, (i + 1) * 500);
      timersRef.current.push(t);
    });

    if (failAtIndex !== null) {
      const t = setTimeout(() => {
        dispatch({ type: 'SET_STATUS', status: 'blocked', blockedAtLine: failAtIndex + 1 });
      }, (path.length + 1) * 500);
      timersRef.current.push(t);
    }

    if (path.length === 0 && failAtIndex === null) {
      dispatch({ type: 'SET_STATUS', status: 'failed' });
    }
  }

  function handleReset() {
    clearAllTimers();
    dispatch({ type: 'RESET' });
  }

  function handleSetLevel(i: number) {
    clearAllTimers();
    dispatch({ type: 'SET_LEVEL', levelIndex: i });
  }

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      {/* Level selector */}
      <header className="flex items-center gap-3 px-4 py-2 bg-white border-b border-slate-200 shadow-sm">
        <span className="font-bold text-slate-700 text-sm mr-2">🐴 YJ-Code</span>
        {LEVELS.map((lvl, i) => (
          <button
            key={lvl.id}
            onClick={() => handleSetLevel(i)}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors
              ${state.currentLevelIndex === i
                ? 'bg-green-500 text-white'
                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
              }`}
          >
            {lvl.id}
          </button>
        ))}
        <span className="ml-2 text-slate-500 text-sm">{level.name}</span>
      </header>

      {/* Main panels */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: game board */}
        <div className="w-1/2 flex items-center justify-center bg-white border-r border-slate-200 relative p-4">
          <GameBoard
            level={level}
            horsePosition={state.horsePosition}
            blockedDirection={
              state.status === 'blocked' && state.blockedAtLine != null
                ? state.sequence[state.blockedAtLine - 1]
                : null
            }
          />
          <BlockedModal
            show={state.status === 'blocked'}
            blockedAtLine={state.blockedAtLine ?? 0}
            onConfirm={handleReset}
          />
          <WinModal
            show={state.status === 'won'}
            levelName={level.name}
            hasNextLevel={state.currentLevelIndex < LEVELS.length - 1}
            onNextLevel={() => handleSetLevel(state.currentLevelIndex + 1)}
            onReplay={() => {
              clearAllTimers();
              dispatch({ type: 'SET_LEVEL', levelIndex: state.currentLevelIndex });
            }}
          />
        </div>

        {/* Right: code editor */}
        <div className="w-1/2 bg-slate-50 overflow-hidden">
          <CodeEditor
            sequence={state.sequence}
            status={state.status}
            currentStepIndex={state.currentStepIndex}
            onAddBlock={(dir) => dispatch({ type: 'ADD_BLOCK', dir })}
            onRemoveBlock={(index) => dispatch({ type: 'REMOVE_BLOCK', index })}
            onClearSequence={() => dispatch({ type: 'CLEAR_SEQUENCE' })}
            onPlay={runSequence}
            onReset={handleReset}
          />
        </div>
      </div>
    </div>
  );
}
