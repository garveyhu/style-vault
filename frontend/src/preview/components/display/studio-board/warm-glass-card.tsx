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

const glass: React.CSSProperties = {
  position: 'relative',
  background: GLASS,
  backdropFilter: 'blur(30px) saturate(140%)',
  WebkitBackdropFilter: 'blur(30px) saturate(140%)',
  border: `1px solid ${GLASS_BRD}`,
  boxShadow: `${SHADOW_MD}, ${GLASS_INSET}`,
  borderRadius: 16,
  padding: 24,
  overflow: 'hidden',
};

function Leak() {
  return (
    <span
      style={{
        position: 'absolute',
        top: 0,
        left: '8%',
        right: '8%',
        height: 1,
        background: `linear-gradient(90deg, transparent, ${LEAK}, transparent)`,
        pointerEvents: 'none',
      }}
    />
  );
}

function Badge({ tone, label }: { tone: string; label: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        borderRadius: 999,
        border: `1px solid ${tone}`,
        color: tone,
        background: SURFACE,
        padding: '3px 12px',
        fontFamily: MONO,
        fontSize: 11,
        fontWeight: 700,
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 999, background: tone }} />
      {label}
    </span>
  );
}

const PLATFORMS = [
  { name: 'Bilibili', meta: 'BV1x8 · 12.4 万播放', tone: SUCCESS, state: '已发布', current: true },
  { name: 'YouTube', meta: 'dQw4 · 3.1 万观看', tone: SUCCESS, state: '已发布', current: false },
  { name: '抖音', meta: '待排期 · 竖屏切片就绪', tone: WARNING, state: '待发布', current: false },
  { name: '小红书', meta: '封面 3:4 需重出', tone: RISK, state: '需修', current: false },
];

export default function WarmGlassCard() {
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
          background: `radial-gradient(58% 52% at 20% 15%, rgba(200,137,31,0.10), transparent 60%), radial-gradient(56% 50% at 84% 84%, rgba(200,137,31,0.10), transparent 62%), ${SAND}`,
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

        <div
          style={{
            position: 'relative',
            display: 'flex',
            gap: 24,
            padding: 34,
            height: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* ── 左：视频详情玻璃卡 ── */}
          <section style={{ ...glass, flex: 1.55, display: 'flex', flexDirection: 'column' }}>
            <Leak />
            <header
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 16,
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontWeight: 600,
                    fontSize: 18,
                    letterSpacing: '-0.01em',
                    color: INK,
                    lineHeight: 1.25,
                  }}
                >
                  扩散模型为什么能凭空生成图像
                </h2>
                <p style={{ margin: '7px 0 0', fontFamily: MONO, fontSize: 11, color: MUTED }}>
                  master.mp4 · 1920×1080 · 08:24 · H.264 · 142 MB
                </p>
              </div>
              <Badge tone={SUCCESS} label="已完成" />
            </header>

            {/* 视频取景框 */}
            <div
              style={{
                position: 'relative',
                flex: 1,
                marginTop: 18,
                borderRadius: 12,
                overflow: 'hidden',
                border: `1px solid ${BORDER_STRONG}`,
                background: `radial-gradient(60% 80% at 50% 30%, rgba(200,137,31,0.22), transparent 62%), linear-gradient(160deg, #2f2a22, ${INK})`,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  fontFamily: MONO,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: 'rgba(255,253,248,0.72)',
                  background: 'rgba(20,17,12,0.4)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  borderRadius: 999,
                  padding: '3px 9px',
                }}
              >
                SCENE 04 / 07 · html-anim
              </span>
              {/* 播放键 */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 999,
                    background: GLASS,
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: `1px solid ${GLASS_BRD}`,
                    boxShadow: `0 10px 26px -12px rgba(0,0,0,0.5), ${GLASS_INSET}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      marginLeft: 4,
                      borderTop: '11px solid transparent',
                      borderBottom: '11px solid transparent',
                      borderLeft: `17px solid ${INK}`,
                    }}
                  />
                </div>
              </div>
              {/* 时间轴 */}
              <div style={{ position: 'absolute', left: 14, right: 14, bottom: 14 }}>
                <div style={{ height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.18)' }}>
                  <div style={{ width: '38%', height: 4, borderRadius: 999, background: WARNING }} />
                </div>
                <div
                  style={{
                    marginTop: 7,
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: MONO,
                    fontSize: 10,
                    color: 'rgba(255,253,248,0.66)',
                  }}
                >
                  <span>03:12</span>
                  <span>08:24</span>
                </div>
              </div>
            </div>

            {/* 底部 chips */}
            <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['旁白已对齐', '字幕 42 cues', '死帧 0', 'AI 味自检 ✓'].map((t, i) => (
                <span
                  key={t}
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    fontWeight: 600,
                    color: MUTED_STRONG,
                    background: i === 3 ? ELEV : CREAM,
                    border: `1px solid ${BORDER}`,
                    borderRadius: 8,
                    padding: '5px 10px',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* ── 右：发布矩阵玻璃卡 ── */}
          <section style={{ ...glass, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Leak />
            <header style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, fontWeight: 600, fontSize: 18, color: INK, letterSpacing: '-0.01em' }}>
                发布矩阵
              </h3>
              <span style={{ fontFamily: MONO, fontSize: 11, color: MUTED }}>4 平台 · 就绪 3</span>
            </header>
            <div style={{ height: 1, background: BORDER_STRONG, margin: '16px 0 4px' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              {PLATFORMS.map(p => (
                <div
                  key={p.name}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    padding: '13px 14px 13px 16px',
                    borderRadius: 12,
                    background: p.current ? ELEV : SURFACE,
                    border: `1px solid ${BORDER}`,
                    boxShadow: p.current ? '0 8px 20px -16px rgba(74,54,20,0.22)' : 'none',
                    overflow: 'hidden',
                  }}
                >
                  {p.current && (
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 8,
                        bottom: 8,
                        width: 3,
                        borderRadius: 999,
                        background: FOCUS,
                      }}
                    />
                  )}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{p.name}</div>
                    <div
                      style={{
                        marginTop: 3,
                        fontFamily: MONO,
                        fontSize: 11,
                        color: MUTED_STRONG,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {p.meta}
                    </div>
                  </div>
                  <Badge tone={p.tone} label={p.state} />
                </div>
              ))}
            </div>

            {/* 就绪度 */}
            <div style={{ marginTop: 14 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: MONO,
                  fontSize: 11,
                  color: MUTED,
                  marginBottom: 7,
                }}
              >
                <span>发布就绪度</span>
                <span style={{ color: SUCCESS, fontWeight: 700 }}>75%</span>
              </div>
              <div style={{ height: 8, borderRadius: 999, background: BORDER, overflow: 'hidden' }}>
                <div
                  style={{
                    width: '75%',
                    height: '100%',
                    borderRadius: 999,
                    background: `linear-gradient(90deg, ${SUCCESS}, #6ea86b)`,
                  }}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </PreviewFrame>
  );
}
