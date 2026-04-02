interface BlockedModalProps {
  show: boolean;
  blockedAtLine: number;
  onConfirm: () => void;
}

export default function BlockedModal({ show, blockedAtLine, onConfirm }: BlockedModalProps) {
  if (!show) return null;

  return (
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 animate-bounce-in">
        <div className="text-5xl">🚧</div>
        <h2 className="text-xl font-bold text-slate-800">움직일 수 없어요!</h2>
        <p className="text-slate-500 text-sm text-center">
          <span className="font-semibold text-slate-700">{blockedAtLine}번째 줄</span>에서<br />
          말이 더 이상 이동할 수 없어요.
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
