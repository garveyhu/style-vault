/**
 * 全局 Loading——用于 Suspense fallback、路由切换、初始化等场景。
 * 居中 logo + 旋转渐变环 + 脉动光晕 + 动态点文字。
 */
export function GlobalLoading({ fullscreen = true }: { fullscreen?: boolean }) {
  return (
    <div
      className={
        fullscreen
          ? 'fixed inset-0 z-[9999] flex items-center justify-center bg-white'
          : 'flex min-h-[60vh] items-center justify-center'
      }
    >
      <div className="relative flex flex-col items-center gap-8">
        {/* 柔和光晕 */}
        <div
          className="pointer-events-none absolute left-1/2 top-8 h-40 w-40 -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-200/60 to-slate-200/40 blur-3xl"
          style={{ animation: 'sv-breathe 2.4s ease-in-out infinite' }}
        />

        {/* 旋转环 + 中心 logo */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          {/* 外层慢速背景环 */}
          <svg
            className="absolute inset-0"
            viewBox="0 0 80 80"
            fill="none"
            aria-hidden
          >
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="#e2e8f0"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* 旋转 accent 弧 · DIV 包 SVG（SVG 自身 transform-origin 在某些环境失效，DIV 转更稳） */}
          <div
            className="absolute inset-0"
            style={{ animation: 'sv-spin 1.1s linear infinite' }}
            aria-hidden
          >
          <svg
            className="w-full h-full"
            viewBox="0 0 80 80"
            fill="none"
          >
            <defs>
              <linearGradient
                id="sv-loading-grad"
                x1="0"
                y1="0"
                x2="80"
                y2="80"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="url(#sv-loading-grad)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray="60 180"
            />
          </svg>
          </div>

          {/* 中心 logo */}
          <img
            src="/logo.svg"
            alt=""
            className="relative h-10 w-10"
            style={{ animation: 'sv-logo-pulse 1.8s ease-in-out infinite' }}
          />
        </div>

        {/* 文案 */}
        <div className="relative flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.32em] text-slate-400">
          <span>Loading</span>
          <span className="sv-dot sv-dot-1">·</span>
          <span className="sv-dot sv-dot-2">·</span>
          <span className="sv-dot sv-dot-3">·</span>
        </div>
      </div>
    </div>
  );
}

export default GlobalLoading;
