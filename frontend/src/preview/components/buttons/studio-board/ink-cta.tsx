import { PreviewFrame } from '../../../_layout';

const SAND = '#f0eeea', CREAM = '#f6f2e8', SURFACE = '#fffdfa', ELEV = '#ffffff';
const INK = '#2a2620', MUTED = '#8f8676', MUTED_STRONG = '#4a4438';
const BORDER = 'rgba(42,38,32,0.11)', BORDER_STRONG = 'rgba(42,38,32,0.22)';
const SUCCESS = '#5b8c5a', WARNING = '#c8891f', RISK = '#c25a3a', FOCUS = '#2a2620';
const GLASS = 'rgba(255,253,248,0.74)', GLASS_BRD = 'rgba(255,255,255,0.82)', LEAK = 'rgba(255,255,255,0.95)';
const SHADOW_MD = '0 18px 36px -24px rgba(74,54,20,0.12), 0 2px 8px -6px rgba(74,54,20,0.05)';
const GLASS_INSET = 'inset 0 1px 0 rgba(255,255,255,0.7)';
const DISPLAY = "'Space Grotesk','IBM Plex Sans','PingFang SC',sans-serif";
const MONO = "'JetBrains Mono',ui-monospace,monospace";
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const BASE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  fontFamily: DISPLAY,
  fontWeight: 700,
  cursor: 'default',
  whiteSpace: 'nowrap',
  lineHeight: 1,
};

const TONES: Record<string, React.CSSProperties> = {
  primary: { background: INK, color: SURFACE, border: `1px solid ${INK}` },
  secondary: { background: SURFACE, color: INK, border: `1px solid ${BORDER}` },
  danger: { background: RISK, color: SURFACE, border: `1px solid ${RISK}` },
};
const SIZES: Record<string, React.CSSProperties> = {
  sm: { height: 32, padding: '0 12px', fontSize: 12 },
  md: { height: 40, padding: '0 16px', fontSize: 14 },
};

function Btn({ tone, size, children }: { tone: string; size: string; children: string }) {
  return <button style={{ ...BASE, ...TONES[tone], ...SIZES[size] }}>{children}</button>;
}

const ROWS = [
  { tone: 'primary', note: 'bg INK · 主操作', label: '发布到 4 平台' },
  { tone: 'secondary', note: 'bg SURFACE · 次级', label: '重新生成' },
  { tone: 'danger', note: 'bg RISK · 破坏性', label: '删除母版' },
];

export default function InkCta() {
  return (
    <PreviewFrame bg={SAND}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 852,
          borderRadius: 22,
          overflow: 'hidden',
          fontFamily: DISPLAY,
          background: `radial-gradient(56% 50% at 18% 14%, rgba(200,137,31,0.10), transparent 60%), radial-gradient(54% 48% at 86% 88%, rgba(200,137,31,0.09), transparent 62%), ${SAND}`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.06,
            mixBlendMode: 'overlay',
            backgroundImage: GRAIN,
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', padding: 40, height: '100%', boxSizing: 'border-box' }}>
          <div
            style={{
              position: 'relative',
              height: '100%',
              boxSizing: 'border-box',
              background: GLASS,
              backdropFilter: 'blur(30px) saturate(140%)',
              WebkitBackdropFilter: 'blur(30px) saturate(140%)',
              border: `1px solid ${GLASS_BRD}`,
              boxShadow: `${SHADOW_MD}, ${GLASS_INSET}`,
              borderRadius: 18,
              padding: '30px 34px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 0,
                left: '8%',
                right: '8%',
                height: 1,
                background: `linear-gradient(90deg, transparent, ${LEAK}, transparent)`,
              }}
            />

            <header style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: MUTED_STRONG, letterSpacing: '0.04em' }}>
                  BUTTON · 墨黑主行动
                </div>
                <div style={{ fontFamily: MONO, fontSize: 11, color: MUTED, marginTop: 4 }}>
                  3 tone × 2 size · radius 8
                </div>
              </div>
              {/* 语义色 swatch 标注 */}
              <div style={{ display: 'flex', gap: 14 }}>
                {[
                  { c: INK, n: 'ink' },
                  { c: SUCCESS, n: 'ok' },
                  { c: WARNING, n: 'warn' },
                  { c: RISK, n: 'risk' },
                  { c: FOCUS, n: 'focus' },
                ].map(s => (
                  <div key={s.n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 16, height: 16, borderRadius: 5, background: s.c, border: `1px solid ${BORDER_STRONG}` }} />
                    <span style={{ fontFamily: MONO, fontSize: 9, color: MUTED }}>{s.n}</span>
                  </div>
                ))}
              </div>
            </header>

            <div style={{ height: 1, background: BORDER_STRONG, margin: '22px 0 6px' }} />

            {/* 标注网格 */}
            <div
              style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: '190px 1fr 1fr',
                alignItems: 'center',
              }}
            >
              <div />
              <div style={{ fontFamily: MONO, fontSize: 11, color: MUTED, paddingBottom: 14 }}>size · sm</div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: MUTED, paddingBottom: 14 }}>size · md</div>

              {ROWS.flatMap((r, i) => [
                i > 0 ? (
                  <div key={`${r.tone}-hr`} style={{ gridColumn: '1 / -1', height: 1, background: BORDER }} />
                ) : null,
                <div key={`${r.tone}-l`} style={{ padding: '20px 0' }}>
                  <div style={{ fontFamily: MONO, fontSize: 13, fontWeight: 700, color: MUTED_STRONG }}>{r.tone}</div>
                  <div style={{ fontFamily: MONO, fontSize: 10, color: MUTED, marginTop: 3 }}>{r.note}</div>
                </div>,
                <div key={`${r.tone}-sm`} style={{ padding: '20px 0' }}>
                  <Btn tone={r.tone} size="sm">{r.label}</Btn>
                </div>,
                <div key={`${r.tone}-md`} style={{ padding: '20px 0', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <Btn tone={r.tone} size="md">{r.label}</Btn>
                  {r.tone === 'primary' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <button
                        style={{
                          ...BASE,
                          ...TONES.primary,
                          ...SIZES.md,
                          boxShadow: `0 0 0 3px rgba(42,38,32,0.20)`,
                          outline: `2px solid ${FOCUS}`,
                          outlineOffset: 2,
                        }}
                      >
                        发布到 4 平台
                      </button>
                      <span style={{ fontFamily: MONO, fontSize: 10, color: MUTED }}>:focus-visible</span>
                    </div>
                  )}
                </div>,
              ])}
            </div>

            <div style={{ height: 1, background: BORDER_STRONG, margin: '6px 0 22px' }} />

            {/* 编号 CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: MUTED_STRONG, width: 190 }}>
                sequenced CTA
                <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 400, color: MUTED, marginTop: 3 }}>
                  前置序号圆 · 编排步骤
                </div>
              </div>
              <button
                style={{
                  ...BASE,
                  ...TONES.primary,
                  height: 40,
                  padding: '0 18px 0 8px',
                  fontSize: 14,
                  gap: 10,
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 999,
                    background: 'rgba(255,253,250,0.22)',
                    color: SURFACE,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  1
                </span>
                自动填充（停在发布键）
              </button>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: MUTED_STRONG,
                  background: CREAM,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 8,
                  padding: '7px 12px',
                }}
              >
                最后一下 = 人工确认
              </span>
              <span
                style={{
                  marginLeft: 'auto',
                  fontFamily: MONO,
                  fontSize: 10,
                  color: MUTED,
                  background: ELEV,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 8,
                  padding: '7px 12px',
                }}
              >
                weight 700 · display font
              </span>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
