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

type Kind = 'green' | 'yellow' | 'red' | 'gray' | 'skipped';

function Light({ kind, size }: { kind: Kind; size: number }) {
  const box: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: 999,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    flex: '0 0 auto',
  };
  const dot = Math.round(size * 0.24);

  if (kind === 'green') {
    const s = Math.round(size * 0.46);
    return (
      <span style={{ ...box, background: SUCCESS, boxShadow: '0 4px 12px -4px rgba(91,140,90,0.5)' }}>
        <svg width={s} height={s} viewBox="0 0 24 24">
          <path d="M20 6 9 17l-5-5" stroke="#fff" strokeWidth={3.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  if (kind === 'yellow') {
    return (
      <span
        style={{
          ...box,
          border: `1px solid ${WARNING}`,
          background: 'rgba(200,137,31,0.10)',
          color: WARNING,
          boxShadow: '0 0 0 4px rgba(200,137,31,0.10)',
        }}
      >
        <span style={{ width: dot, height: dot, borderRadius: 999, background: WARNING }} />
      </span>
    );
  }
  if (kind === 'red') {
    return (
      <span style={{ ...box, border: `1px solid ${RISK}`, background: 'rgba(194,90,58,0.10)', color: RISK }}>
        <span style={{ fontFamily: DISPLAY, fontSize: Math.round(size * 0.5), fontWeight: 800, lineHeight: 1 }}>!</span>
      </span>
    );
  }
  if (kind === 'gray') {
    return (
      <span style={{ ...box, border: `1px solid ${BORDER}`, background: SURFACE, color: MUTED }}>
        <span style={{ width: dot, height: dot, borderRadius: 999, border: `1.5px solid ${MUTED}` }} />
      </span>
    );
  }
  return (
    <span style={{ ...box, border: `1px dashed ${BORDER}`, background: 'rgba(255,253,250,0.6)', color: 'rgba(74,68,56,0.5)' }}>
      <span style={{ width: dot + 2, height: 1.5, borderRadius: 999, background: 'rgba(74,68,56,0.5)' }} />
    </span>
  );
}

const LEGEND: { kind: Kind; label: string; sub: string }[] = [
  { kind: 'green', label: '完成', sub: 'done' },
  { kind: 'yellow', label: '进行中', sub: 'active' },
  { kind: 'red', label: '需处理', sub: 'error' },
  { kind: 'gray', label: '未开始', sub: 'idle' },
  { kind: 'skipped', label: '跳过', sub: 'skip' },
];

const LANE: { name: string; kind: Kind }[] = [
  { name: '选题', kind: 'green' },
  { name: '脚本', kind: 'green' },
  { name: '分镜', kind: 'green' },
  { name: '素材', kind: 'green' },
  { name: '配音', kind: 'yellow' },
  { name: '字幕', kind: 'gray' },
  { name: '渲染', kind: 'gray' },
  { name: '混音', kind: 'skipped' },
  { name: '发布', kind: 'gray' },
];
const CURRENT = 4;

export default function PipelineStatusLight() {
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
              padding: '32px 36px',
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
              <div style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: MUTED_STRONG, letterSpacing: '0.04em' }}>
                PIPELINE 判灯 · 5 态
              </div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: MUTED }}>常规 36 · compact 28</div>
            </header>

            {/* ── 图例 ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginTop: 30 }}>
              {LEGEND.map(l => (
                <div
                  key={l.kind}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 16,
                    padding: '22px 12px',
                    borderRadius: 14,
                    background: SURFACE,
                    border: `1px solid ${BORDER}`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Light kind={l.kind} size={36} />
                    <Light kind={l.kind} size={28} />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{l.label}</div>
                    <div style={{ fontFamily: MONO, fontSize: 10, color: MUTED, marginTop: 3 }}>{l.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ height: 1, background: BORDER_STRONG, margin: '32px 0' }} />

            {/* ── 流水线泳道 ── */}
            <div style={{ fontFamily: MONO, fontSize: 11, color: MUTED, marginBottom: 22 }}>
              produce-pipeline · 9 步进度
            </div>
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                background: CREAM,
                border: `1px solid ${BORDER}`,
                borderRadius: 16,
                padding: '30px 26px',
              }}
            >
              {LANE.map((step, i) => (
                <div key={step.name} style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {i > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: 13,
                        right: '50%',
                        width: '100%',
                        height: 2,
                        borderRadius: 999,
                        background: i <= CURRENT ? FOCUS : BORDER_STRONG,
                        opacity: i <= CURRENT ? 0.9 : 1,
                      }}
                    />
                  )}
                  <div style={{ position: 'relative', zIndex: 1, background: i === CURRENT ? ELEV : CREAM, borderRadius: 999, padding: 2 }}>
                    <Light kind={step.kind} size={28} />
                  </div>
                  <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: i === CURRENT ? 700 : 500, color: i === CURRENT ? INK : MUTED_STRONG, marginTop: 12 }}>
                    {step.name}
                  </span>
                  <span style={{ fontFamily: MONO, fontSize: 9, color: MUTED, marginTop: 3 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
