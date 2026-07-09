import { PreviewFrame } from '../../_layout';

const SAND = '#f0eeea', CREAM = '#f6f2e8', SURFACE = '#fffdfa', ELEV = '#ffffff';
const INK = '#2a2620', MUTED = '#8f8676', MUTED_STRONG = '#4a4438';
const BORDER = 'rgba(42,38,32,0.11)', BORDER_STRONG = 'rgba(42,38,32,0.22)';
const SUCCESS = '#5b8c5a', WARNING = '#c8891f', RISK = '#c25a3a', FOCUS = '#2a2620';
const GLASS = 'rgba(255,253,248,0.74)', GLASS_BRD = 'rgba(255,255,255,0.82)', LEAK = 'rgba(255,255,255,0.95)';
const SHADOW_MD = '0 18px 36px -24px rgba(74,54,20,0.12), 0 2px 8px -6px rgba(74,54,20,0.05)';
const SHADOW_LG = '0 30px 60px -30px rgba(74,54,20,0.16), 0 6px 16px -10px rgba(74,54,20,0.07)';
const GLASS_INSET = 'inset 0 1px 0 rgba(255,255,255,0.7)';
const DISPLAY = "'Space Grotesk','IBM Plex Sans','PingFang SC',sans-serif";
const MONO = "'JetBrains Mono',ui-monospace,monospace";
const BODY = "'IBM Plex Sans','PingFang SC',sans-serif";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const SWATCHES: { hex: string; light?: boolean }[] = [
  { hex: '#f0eeea', light: true },
  { hex: '#f6f2e8', light: true },
  { hex: '#2a2620' },
  { hex: '#5b8c5a' },
  { hex: '#c8891f' },
  { hex: '#c25a3a' },
];

function Swatch({ hex, light }: { hex: string; light?: boolean }) {
  return (
    <div>
      <div
        style={{
          width: 78,
          height: 54,
          borderRadius: 10,
          background: hex,
          border: light ? '1px solid ' + BORDER_STRONG : '1px solid ' + BORDER,
          boxShadow: SHADOW_MD,
        }}
      />
      <div style={{ fontFamily: MONO, fontSize: 11, color: MUTED, marginTop: 7, letterSpacing: '0.01em' }}>{hex}</div>
    </div>
  );
}

function Pill({ text, color }: { text: string; color: string }) {
  return (
    <span
      style={{
        border: '1px solid ' + color,
        color,
        background: color + '1a',
        borderRadius: 999,
        padding: '4px 12px',
        fontFamily: MONO,
        fontSize: 11,
      }}
    >
      {text}
    </span>
  );
}

function CheckLight() {
  return (
    <svg width={11} height={11} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12.6l4.4 4.4L19 7" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WarmSandWorkbench() {
  return (
    <PreviewFrame bg={SAND} padded={false}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 900,
          overflow: 'hidden',
          background: `radial-gradient(130% 100% at 30% 30%, ${CREAM}, ${SAND} 68%)`,
        }}
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06, mixBlendMode: 'overlay', backgroundImage: GRAIN }} />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            gap: 56,
            padding: '72px 80px',
            alignItems: 'stretch',
          }}
        >
          {/* 左列 */}
          <div style={{ flex: 1.15, minWidth: 0 }}>
            <h1 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 30, color: INK, margin: 0, letterSpacing: '-0.01em' }}>
              暖砂白玻璃工作台
            </h1>
            <div style={{ fontFamily: BODY, fontSize: 14, color: MUTED, marginTop: 10, lineHeight: 1.6 }}>
              暖纸 editorial × 产品级白玻璃 × 苔绿判成 × 暖近黑 CTA —— studio-board 的视觉系统。
            </div>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 40 }}>
              {SWATCHES.map(s => (
                <Swatch key={s.hex} hex={s.hex} light={s.light} />
              ))}
            </div>

            <div style={{ marginTop: 46 }}>
              <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 48, color: INK, lineHeight: 1, letterSpacing: '-0.02em' }}>
                Space Grotesk
              </div>
              <div style={{ fontFamily: BODY, fontSize: 13, color: MUTED_STRONG, marginTop: 18 }}>
                苹方正文示例 · 13 —— 耐读的中文正文，行高松弛、字距克制。
              </div>
              <div style={{ fontFamily: MONO, fontSize: 12, color: MUTED, marginTop: 10, letterSpacing: '0.02em' }}>
                JetBrains Mono · 9 / 9 · 7-07
              </div>
            </div>
          </div>

          {/* 右列 —— 组件样品 */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div
              style={{
                position: 'relative',
                padding: 18,
                background: GLASS,
                backdropFilter: 'blur(30px) saturate(140%)',
                border: '1px solid ' + GLASS_BRD,
                boxShadow: SHADOW_MD + ', ' + GLASS_INSET,
                borderRadius: 16,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '8%',
                  right: '8%',
                  height: 1,
                  background: 'linear-gradient(90deg,transparent,' + LEAK + ',transparent)',
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontFamily: DISPLAY, fontSize: 15, fontWeight: 600, color: INK }}>白玻璃卡 · 组件样品</div>
                <span
                  style={{
                    border: '1px solid rgba(91,140,90,0.3)',
                    background: 'rgba(91,140,90,0.1)',
                    color: SUCCESS,
                    borderRadius: 999,
                    padding: '2px 10px',
                    fontFamily: MONO,
                    fontSize: 11,
                  }}
                >
                  已完成
                </span>
              </div>
              <div style={{ fontFamily: BODY, fontSize: 12.5, color: MUTED_STRONG, marginTop: 10, lineHeight: 1.6 }}>
                真半透 + 30px 高斯模糊 + 顶部 light-leak 高光 + 软投影，浮在暖砂颗粒底上。
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Pill text="已完成" color={SUCCESS} />
              <Pill text="待发布" color={WARNING} />
              <Pill text="错误" color={RISK} />
            </div>

            <div>
              <button
                type="button"
                style={{
                  background: `linear-gradient(180deg, #3a352c, ${INK})`,
                  color: SURFACE,
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 16px',
                  fontFamily: DISPLAY,
                  fontWeight: 700,
                  fontSize: 14,
                  boxShadow: '0 10px 22px -12px rgba(42,38,32,0.6), inset 0 1px 0 rgba(255,255,255,0.14)',
                  cursor: 'pointer',
                }}
              >
                打开成片
              </button>
            </div>

            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 4 }}>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 999,
                  background: SUCCESS,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px -4px rgba(91,140,90,0.5)',
                }}
              >
                <CheckLight />
              </div>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 999,
                  background: 'rgba(200,137,31,0.15)',
                  border: '2px solid ' + WARNING,
                }}
              />
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 999,
                  background: 'transparent',
                  border: '2px solid ' + BORDER_STRONG,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
