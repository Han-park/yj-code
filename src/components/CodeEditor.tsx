import type { Direction, GameStatus } from '@/types/game';
import BlockPalette from './BlockPalette';
import BlockSequence from './BlockSequence';
import PlayButton from './PlayButton';

interface CodeEditorProps {
  sequence: Direction[];
  status: GameStatus;
  currentStepIndex: number;
  onAddBlock: (dir: Direction) => void;
  onRemoveBlock: (index: number) => void;
  onClearSequence: () => void;
  onPlay: () => void;
  onReset: () => void;
}

export default function CodeEditor({
  sequence,
  status,
  currentStepIndex,
  onAddBlock,
  onRemoveBlock,
  onClearSequence,
  onPlay,
  onReset,
}: CodeEditorProps) {
  const isRunning = status === 'running';

  return (
    <div className="flex flex-col h-full gap-4 p-4">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">블럭</p>
        <BlockPalette disabled={isRunning} onAdd={onAddBlock} />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          내 프로그램{sequence.length > 0 ? ` (${sequence.length})` : ''}
        </p>
        {sequence.length > 0 && !isRunning && (
          <button
            onClick={onClearSequence}
            className="text-xs text-slate-400 hover:text-red-400 transition-colors"
          >
            전체 지우기
          </button>
        )}
      </div>

      <BlockSequence
        sequence={sequence}
        currentStepIndex={currentStepIndex}
        status={status}
        onRemove={onRemoveBlock}
      />

      <PlayButton
        status={status}
        sequenceLength={sequence.length}
        onPlay={onPlay}
        onReset={onReset}
      />
    </div>
  );
}
