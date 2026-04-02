import type { Direction, GameStatus, ProgramBlock } from '@/types/game';
import BlockPalette from './BlockPalette';
import BlockSequence from './BlockSequence';
import PlayButton from './PlayButton';

interface CodeEditorProps {
  sequence: ProgramBlock[];
  status: GameStatus;
  currentStepIndex: number;
  maxBlocks?: number;
  showRepeatBlocks?: boolean;
  onAddMoveBlock: (dir: Direction) => void;
  onAddRepeatBlock: (dir: Direction) => void;
  onRemoveBlock: (index: number) => void;
  onClearSequence: () => void;
  onPlay: () => void;
  onReset: () => void;
}

export default function CodeEditor({
  sequence,
  status,
  currentStepIndex,
  maxBlocks,
  showRepeatBlocks = false,
  onAddMoveBlock,
  onAddRepeatBlock,
  onRemoveBlock,
  onClearSequence,
  onPlay,
  onReset,
}: CodeEditorProps) {
  const isRunning = status === 'running';
  const countedBlocks = sequence.filter((block) => block.type === 'move').length;
  const repeatBlockCount = sequence.length - countedBlocks;
  const atLimit = maxBlocks !== undefined && countedBlocks >= maxBlocks;
  const usedRatio = maxBlocks !== undefined ? Math.min((countedBlocks / maxBlocks) * 100, 100) : 0;
  const remainingBlocks = maxBlocks !== undefined ? Math.max(maxBlocks - countedBlocks, 0) : null;

  return (
    <div className="flex flex-col h-full gap-4 p-4">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">블럭</p>
        <BlockPalette
          disableMoveButtons={isRunning || atLimit}
          disableRepeatButtons={isRunning}
          showRepeatButtons={showRepeatBlocks}
          onAddMove={onAddMoveBlock}
          onAddRepeat={onAddRepeatBlock}
        />
      </div>

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          내 프로그램{sequence.length > 0 ? ` (${sequence.length})` : ''}
          </p>
          {maxBlocks !== undefined && (
            <div className={`mt-2 w-full max-w-md rounded-2xl border px-3 py-3 shadow-sm ${
              atLimit ? 'border-slate-300 bg-slate-100' : 'border-emerald-200 bg-emerald-50'
            }`}>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-slate-700">
                  {remainingBlocks === 0 ? '블럭을 다 썼어요' : `${remainingBlocks}개 남았어요`}
                </span>
                <span className={`rounded-full px-2.5 py-1 text-sm font-black ${
                  atLimit ? 'bg-white text-slate-700' : 'bg-white text-emerald-700'
                }`}>
                  {countedBlocks} / {maxBlocks}
                </span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/90 ring-1 ring-black/5">
                <div
                  className={`h-full rounded-full transition-[width] ${
                    atLimit ? 'bg-slate-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${usedRatio}%` }}
                />
              </div>
              <p className={`mt-2 text-xs font-semibold ${
                atLimit ? 'text-slate-700' : 'text-emerald-700'
              }`}>
                {atLimit
                  ? '이동 블럭은 더 추가할 수 없어요. 지우고 다시 넣어보세요.'
                  : `이동 블럭만 개수 제한에 들어가요.${repeatBlockCount > 0 ? ` 반복 블럭 ${repeatBlockCount}개는 개수에 세지 않아요.` : ''}`}
              </p>
              <p className="mt-1 text-[11px] font-medium text-emerald-700/80">
                {showRepeatBlocks
                  ? '반복 블럭은 별표를 만날 때까지 같은 방향으로 움직여요.'
                  : '이 레벨은 이동 블럭으로만 풀어보세요.'}
              </p>
            </div>
          )}
        </div>
        {sequence.length > 0 && !isRunning && (
          <button
            onClick={onClearSequence}
            className="shrink-0 text-sm font-bold px-4 py-2 rounded-xl bg-slate-200 hover:bg-red-100 text-slate-600 hover:text-red-600 transition-colors"
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
