/**
 * 内嵌 Loading · 用于列表底部 / 加载更多场景。
 * 复用 GlobalLoading 的旋转环但缩小到 24px，适合作为列表底部 loading bar。
 */
export function InlineLoading({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <div className="h-6 w-6" style={{ animation: 'sv-spin 1.1s linear infinite' }} aria-hidden>
        <svg className="w-full h-full" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="36" stroke="#e2e8f0" strokeWidth="3" />
          <circle
            cx="40" cy="40" r="36"
            stroke="#10b981" strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="60 180"
          />
        </svg>
      </div>
      <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-slate-400">
        {label}
      </span>
    </div>
  );
}

export default InlineLoading;
