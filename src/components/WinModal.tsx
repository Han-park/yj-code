interface WinModalProps {
  show: boolean;
  levelName: string;
  hasNextLevel: boolean;
  onNextLevel: () => void;
  onReplay: () => void;
}

export default function WinModal({ show, levelName, hasNextLevel, onNextLevel, onReplay }: WinModalProps) {
  if (!show) return null;

  return (
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 animate-bounce-in">
        <div className="text-5xl">🎉</div>
        <h2 className="text-2xl font-bold text-slate-800">레벨 클리어!</h2>
        <p className="text-slate-500 text-sm">{levelName}</p>
        <div className="flex gap-3 mt-2">
          <button
            onClick={onReplay}
            className="px-5 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold transition-colors"
          >
            ↺ 다시 하기
          </button>
          {hasNextLevel && (
            <button
              onClick={onNextLevel}
              className="px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors"
            >
              다음 레벨 →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
