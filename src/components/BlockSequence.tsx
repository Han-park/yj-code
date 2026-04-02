import type { GameStatus, ProgramBlock } from '@/types/game';
import BlockItem from './BlockItem';

interface BlockSequenceProps {
  sequence: ProgramBlock[];
  currentStepIndex: number;
  status: GameStatus;
  onRemove: (index: number) => void;
}

export default function BlockSequence({ sequence, currentStepIndex, status, onRemove }: BlockSequenceProps) {
  const isRunning = status === 'running';

  if (sequence.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-400 text-sm italic">
        위의 블럭을 눌러 프로그램을 만들어보세요
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-1.5 pr-1">
      {sequence.map((block, i) => (
        <BlockItem
          key={i}
          block={block}
          index={i}
          lineNumber={i + 1}
          isActive={isRunning && i === currentStepIndex}
          isDisabled={isRunning}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
