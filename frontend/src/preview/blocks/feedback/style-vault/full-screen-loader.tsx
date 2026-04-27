import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
const MONO = "ui-monospace, 'SF Mono', Menlo, monospace";

const KEYFRAMES = `
@keyframes svfsl-breathe {
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50%      { opacity: 0.85; transform: scale(1.05); }
}
@keyframes svfsl-logo-pulse {
  0%, 100% { opacity: 0.95; transform: scale(1); }
  50%      { opacity: 1;    transform: scale(1.04); }
}
@keyframes svfsl-dot-bounce {
  0%, 80%, 100% { opacity: 0.2; transform: translateY(0); }
  40%           { opacity: 1;   transform: translateY(-3px); }
}
@keyframes svfsl-spin {
  to { transform: rotate(360deg); }
}
.svfsl-dot {
  display: inline-block;
  animation: svfsl-dot-bounce 1.4s ease-in-out infinite;
  font-size: 14px;
  line-height: 0;
}
.svfsl-dot-1 { animation-delay: 0s; }
.svfsl-dot-2 { animation-delay: 0.16s; }
.svfsl-dot-3 { animation-delay: 0.32s; }
`;

function Loader() {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 32,
        fontFamily: SANS,
      }}
    >
      {/* 柔光晕 */}
      <div
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          left: '50%',
          top: 32,
          width: 160,
          height: 160,
          marginLeft: -80,
          borderRadius: '50%',
          background:
            'linear-gradient(to bottom right, rgba(167,243,208,0.6), rgba(226,232,240,0.4))',
          filter: 'blur(48px)',
          animation: 'svfsl-breathe 2.4s ease-in-out infinite',
        }}
      />

      {/* 旋转环 + 中心 logo */}
      <div
        style={{
          position: 'relative',
          width: 80,
          height: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 静态背景环 */}
        <svg
          style={{ position: 'absolute', inset: 0 }}
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

        {/* 旋转 accent 弧 */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            animation: 'svfsl-spin 1.1s linear infinite',
          }}
          viewBox="0 0 80 80"
          fill="none"
          aria-hidden
        >
          <defs>
            <linearGradient
              id="svfsl-grad"
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
            stroke="url(#svfsl-grad)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray="60 180"
          />
        </svg>

        {/* 中心 logo · 用 inline SVG 模拟（preview 不依赖 /logo.svg） */}
        <svg
          style={{
            position: 'relative',
            width: 40,
            height: 40,
            animation: 'svfsl-logo-pulse 1.8s ease-in-out infinite',
          }}
          viewBox="0 0 40 40"
          aria-hidden
        >
          <defs>
            <linearGradient id="svfsl-logo-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect
            x="4"
            y="4"
            width="32"
            height="32"
            rx="8"
            fill="url(#svfsl-logo-grad)"
          />
          <text
            x="20"
            y="25"
            textAnchor="middle"
            fill="#fff"
            fontFamily={MONO}
            fontSize="13"
            fontWeight="600"
          >
            SV
          </text>
        </svg>
      </div>

      {/* 文案 */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          fontSize: 11,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.32em',
          color: '#94a3b8',
        }}
      >
        <span>Loading</span>
        <span className="svfsl-dot svfsl-dot-1">·</span>
        <span className="svfsl-dot svfsl-dot-2">·</span>
        <span className="svfsl-dot svfsl-dot-3">·</span>
      </div>
    </div>
  );
}

export default function FullScreenLoaderPreview() {
  const [mode, setMode] = useState<'fullscreen' | 'inline'>('fullscreen');

  return (
    <PreviewFrame bg="#fafafa" padded={false}>
      <style>{KEYFRAMES}</style>
      <div style={{ fontFamily: SANS, color: '#0f172a' }}>
        {/* header · meta + mode toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            padding: '40px 48px 24px',
            gap: 24,
            borderBottom: '1px solid #f1f5f9',
            background: '#fafafa',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#94a3b8',
                marginBottom: 12,
              }}
            >
              blocks / feedback / style-vault
            </div>
            <div
              style={{
                fontSize: 36,
                fontWeight: 600,
                letterSpacing: '-0.025em',
              }}
            >
              Full Screen Loader
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 13,
                color: '#64748b',
                maxWidth: 600,
                lineHeight: 1.6,
              }}
            >
              halo + 旋转 emerald→slate 弧 + 脉动 logo + uppercase
              弹跳点文案 · 双模式
            </div>
          </div>
          <div
            style={{
              display: 'inline-flex',
              gap: 4,
              padding: 3,
              borderRadius: 9999,
              border: '1px solid #e2e8f0',
              background: '#fff',
            }}
          >
            {(
              [
                { v: 'fullscreen', label: 'Fullscreen' },
                { v: 'inline', label: 'Inline · 60vh' },
              ] as const
            ).map((o) => (
              <button
                key={o.v}
                onClick={() => setMode(o.v)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 9999,
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: SANS,
                  fontSize: 12,
                  fontWeight: 500,
                  background: mode === o.v ? '#0f172a' : 'transparent',
                  color: mode === o.v ? '#fff' : '#64748b',
                  transition: 'all 200ms cubic-bezier(0.2, 0.7, 0.2, 1)',
                }}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* live demo */}
        {mode === 'fullscreen' ? (
          <div
            style={{
              position: 'relative',
              background: '#fff',
              minHeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Loader />
          </div>
        ) : (
          <div style={{ background: '#fafafa', padding: '24px 48px 80px' }}>
            {/* 假 page hero on top */}
            <div
              style={{
                background: '#fff',
                border: '1px solid #f1f5f9',
                borderRadius: 16,
                padding: '40px 32px',
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#94a3b8',
                  marginBottom: 8,
                }}
              >
                A Section Above
              </div>
              <div style={{ fontSize: 22, fontWeight: 600 }}>
                上方真实内容已渲染
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontSize: 13,
                  color: '#64748b',
                }}
              >
                Inline 模式适合"列表加载中"等局部场景，不接管视口
              </div>
            </div>
            {/* loader 嵌段 · min-h-60vh */}
            <div
              style={{
                background: '#fff',
                border: '1px solid #f1f5f9',
                borderRadius: 16,
                minHeight: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Loader />
            </div>
          </div>
        )}

        {/* spec */}
        <div style={{ padding: '32px 48px 48px', background: '#fafafa' }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#94a3b8',
              marginBottom: 14,
            }}
          >
            Spec
          </div>
          <div
            style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: 16,
            }}
          >
            {[
              ['halo', '160×160 · linear-gradient(emerald-200/60 → slate-200/40) · blur 48px · 2.4s breathe'],
              ['ring base', 'r=36 · stroke #e2e8f0 · 2px · 完整圆'],
              ['ring spin', 'r=36 · linearGradient(emerald-500 → slate-900) · 2.4px · dasharray 60 180 · 1.1s linear'],
              ['logo', '40×40 · 1.8s pulse · opacity 0.95→1 · scale 1→1.04'],
              ['caption', 'Loading + 3 dots · 11px medium uppercase · tracking 0.32em · slate-400'],
              ['dots', '1.4s bounce · delay 0 / 0.16s / 0.32s · 错位避免机械感'],
              ['fullscreen', 'fixed inset-0 z-[9999] bg-white · 接管全视口'],
              ['inline', 'flex min-h-[60vh] · 嵌入容器局部'],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: 'flex',
                  gap: 16,
                  fontSize: 12,
                  padding: '6px 0',
                  borderBottom: '1px dashed #f1f5f9',
                }}
              >
                <span style={{ color: '#94a3b8', width: 110, flexShrink: 0 }}>
                  {k}
                </span>
                <span
                  style={{
                    color: '#0f172a',
                    fontFamily: MONO,
                    fontSize: 11,
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
