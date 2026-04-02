import type { GameStatus } from '@/types/game';

interface PlayButtonProps {
  status: GameStatus;
  sequenceLength: number;
  onPlay: () => void;
  onReset: () => void;
}

export default function PlayButton({ status, sequenceLength, onPlay, onReset }: PlayButtonProps) {
  if (status === 'won') return null;

  if (status === 'running') {
    return (
      <button
        disabled
        className="w-full py-2 rounded-lg bg-slate-300 text-slate-500 font-bold cursor-not-allowed"
      >
        ▶ 실행 중...
      </button>
    );
  }

  if (status === 'failed' || status === 'blocked') {
    return (
      <button
        onClick={onReset}
        className="w-full py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold transition-colors"
      >
        ↺ 다시 시도
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={onPlay}
        disabled={sequenceLength === 0}
        className="flex-1 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ▶ 실행
      </button>
      {sequenceLength > 0 && (
        <button
          onClick={onReset}
          className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold transition-colors"
        >
          ↺
        </button>
      )}
    </div>
  );
}
