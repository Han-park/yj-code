interface TrappedModalProps {
  show: boolean;
  trappedAtLine: number;
  onConfirm: () => void;
}

export default function TrappedModal({ show, trappedAtLine, onConfirm }: TrappedModalProps) {
  if (!show) return null;

  return (
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 animate-bounce-in">
        <div className="text-5xl">🔥</div>
        <h2 className="text-xl font-bold text-slate-800">실패</h2>
        <p className="text-slate-500 text-sm text-center">
          <span className="font-semibold text-slate-700">{trappedAtLine}번째 줄</span>에서<br />
          불을 밟았어요!
        </p>
        <button
          onClick={onConfirm}
          className="mt-2 px-6 py-2 rounded-lg bg-slate-700 hover:bg-slate-800 text-white font-semibold transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  );
}
