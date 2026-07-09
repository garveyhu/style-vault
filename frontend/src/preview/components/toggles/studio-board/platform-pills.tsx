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

const PLATFORMS = [
  { name: 'Bilibili', color: '#00AEEC' },
  { name: '抖音', color: '#161823' },
  { name: '小红书', color: '#FF2442' },
  { name: 'YouTube', color: '#FF0000' },
];

function Pill({ name, color, active }: { name: string; color: string; active: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        borderRadius: 999,
        padding: '6px 14px',
        fontSize: 12,
        fontWeight: 700,
        fontFamily: DISPLAY,
        background: active ? color : 'rgba(143,134,118,0.09)',
        color: active ? '#fff' : INK,
        border: `1px solid ${active ? color : BORDER}`,
        boxShadow: active ? '0 8px 18px -12px rgba(0,0,0,0.45)' : 'none',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: 14,
          height: 14,
          borderRadius: 999,
          background: active ? '#fff' : color,
          boxShadow: active ? 'inset 0 0 0 1px rgba(0,0,0,0.06)' : 'none',
        }}
      />
      {name}
    </span>
  );
}

const TABS = ['概览', '封面', '发布', '复盘'];

export default function PlatformPills() {
  return (
    <PreviewFrame bg={CREAM}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 852,
          borderRadius: 22,
          overflow: 'hidden',
          fontFamily: DISPLAY,
          background: `radial-gradient(60% 50% at 82% 8%, rgba(200,137,31,0.08), transparent 60%), ${CREAM}`,
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

        <div style={{ position: 'relative', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
          {/* ── 顶栏 strip ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
              padding: '20px 34px',
              borderBottom: `1px solid ${BORDER_STRONG}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 999,
                  background: `linear-gradient(135deg, ${WARNING}, ${INK})`,
                  boxShadow: '0 4px 10px -6px rgba(74,54,20,0.5)',
                }}
              />
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  borderRadius: 999,
                  border: `1px solid rgba(42,38,32,0.30)`,
                  padding: '4px 10px',
                  fontSize: 12,
                  fontWeight: 700,
                  color: INK,
                }}
              >
                飞轮日记
                <span style={{ fontSize: 10, color: MUTED_STRONG }}>▾</span>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontFamily: MONO,
                  fontSize: 11,
                  fontWeight: 700,
                  color: SUCCESS,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: 999, background: SUCCESS }} />
                已登录
              </span>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              {PLATFORMS.map((p, i) => (
                <Pill key={p.name} name={p.name} color={p.color} active={i === 0} />
              ))}
            </div>
          </div>

          {/* ── 内容区 ── */}
          <div style={{ flex: 1, padding: '30px 34px', display: 'flex', flexDirection: 'column', gap: 26, minHeight: 0 }}>
            {/* 品牌色态 showcase */}
            <div
              style={{
                position: 'relative',
                background: GLASS,
                backdropFilter: 'blur(30px) saturate(140%)',
                WebkitBackdropFilter: 'blur(30px) saturate(140%)',
                border: `1px solid ${GLASS_BRD}`,
                boxShadow: `${SHADOW_MD}, ${GLASS_INSET}`,
                borderRadius: 16,
                padding: '22px 26px',
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
              <div style={{ fontFamily: MONO, fontSize: 11, color: MUTED, marginBottom: 18 }}>
                平台切换 · 激活取品牌色 / 未激活取灰底
              </div>
              <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <Pill name="Bilibili" color="#00AEEC" active />
                  <span style={{ fontFamily: MONO, fontSize: 10, color: MUTED }}>active · #00AEEC</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <Pill name="Bilibili" color="#00AEEC" active={false} />
                  <span style={{ fontFamily: MONO, fontSize: 10, color: MUTED }}>inactive · 品牌点</span>
                </div>
                <div style={{ width: 1, alignSelf: 'stretch', background: BORDER }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {PLATFORMS.map(p => (
                      <Pill key={p.name} name={p.name} color={p.color} active />
                    ))}
                  </div>
                  <span style={{ fontFamily: MONO, fontSize: 10, color: MUTED }}>四平台品牌色总览</span>
                </div>
              </div>
            </div>

            {/* 右栏 tab 切换 */}
            <div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: MUTED, marginBottom: 14 }}>
                右栏 tab 切换 · 同款范式（active = FOCUS）
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  gap: 4,
                  padding: 4,
                  borderRadius: 999,
                  background: SAND,
                  border: `1px solid ${BORDER}`,
                }}
              >
                {TABS.map((t, i) => (
                  <span
                    key={t}
                    style={{
                      borderRadius: 999,
                      padding: '7px 18px',
                      fontSize: 12,
                      fontWeight: 700,
                      fontFamily: DISPLAY,
                      background: i === 0 ? FOCUS : 'rgba(255,253,250,0.6)',
                      color: i === 0 ? '#fff' : MUTED_STRONG,
                      boxShadow: i === 0 ? '0 6px 14px -10px rgba(0,0,0,0.5)' : 'none',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* 内容行占位（顶栏所属首页） */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
              {[
                { t: '扩散模型为什么能生成图像', tone: SUCCESS, state: '已发布' },
                { t: '一句话讲透注意力机制', tone: WARNING, state: '待发布' },
                { t: '本地跑大模型的省钱路径', tone: RISK, state: '需修' },
              ].map(row => (
                <div
                  key={row.t}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '12px 16px',
                    borderRadius: 12,
                    background: SURFACE,
                    border: `1px solid ${BORDER}`,
                  }}
                >
                  <span style={{ width: 46, height: 30, borderRadius: 7, background: ELEV, border: `1px solid ${BORDER}`, flex: '0 0 auto' }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: INK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
                    {row.t}
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      borderRadius: 999,
                      border: `1px solid ${row.tone}`,
                      color: row.tone,
                      background: SURFACE,
                      padding: '2px 10px',
                      fontFamily: MONO,
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: row.tone }} />
                    {row.state}
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
