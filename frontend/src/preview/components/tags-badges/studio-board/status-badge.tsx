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

function Outline({ color, label }: { color: string; label: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        borderRadius: 999,
        border: `1px solid ${color}`,
        background: SURFACE,
        color,
        padding: '2px 10px',
        fontFamily: MONO,
        fontSize: 11,
        fontWeight: 700,
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 999, background: color }} />
      {label}
    </span>
  );
}

function Soft({ base, label }: { base: string; label: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        borderRadius: 999,
        background: soft(base, 0.1),
        border: `1px solid ${soft(base, 0.3)}`,
        color: base,
        padding: '2px 10px',
        fontFamily: MONO,
        fontSize: 11,
        fontWeight: 700,
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 999, background: base }} />
      {label}
    </span>
  );
}

const RGB: Record<string, string> = {
  [SUCCESS]: '91,140,90',
  [WARNING]: '200,137,31',
  [RISK]: '194,90,58',
  [MUTED_STRONG]: '74,68,56',
};
function soft(base: string, a: number) {
  return `rgba(${RGB[base]},${a})`;
}

const OUTLINES = [
  { color: SUCCESS, label: '已完成', use: '母版 / 步骤完成' },
  { color: SUCCESS, label: '已发布', use: '平台已上线' },
  { color: WARNING, label: '待发布', use: '就绪未提交' },
  { color: RISK, label: '错误', use: '质检未过' },
  { color: MUTED_STRONG, label: '默认', use: '中性 / 未标注' },
];
const SOFTS = [
  { base: SUCCESS, label: '素材齐' },
  { base: WARNING, label: '待复核' },
  { base: RISK, label: '需重出' },
  { base: MUTED_STRONG, label: '草稿' },
];

export default function StatusBadge() {
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
              gap: 26,
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
                STATUS BADGE · 语义徽标
              </div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: MUTED }}>两个变体 · 描边 / 软填</div>
            </header>

            {/* ── 描边式 ── */}
            <section>
              <div style={{ fontFamily: MONO, fontSize: 11, color: MUTED, marginBottom: 16 }}>
                描边式 · border + SURFACE 底
              </div>
              <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap' }}>
                {OUTLINES.map(o => (
                  <div key={o.label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <Outline color={o.color} label={o.label} />
                    <span style={{ fontFamily: MONO, fontSize: 10, color: MUTED }}>{o.use}</span>
                  </div>
                ))}
              </div>
            </section>

            <div style={{ height: 1, background: BORDER_STRONG }} />

            {/* ── 软填式 ── */}
            <section>
              <div style={{ fontFamily: MONO, fontSize: 11, color: MUTED, marginBottom: 16 }}>
                软填式 · 同色系 10% 填充 + 计数胶囊
              </div>
              <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                {SOFTS.map(s => (
                  <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <Soft base={s.base} label={s.label} />
                    <span style={{ fontFamily: MONO, fontSize: 10, color: MUTED }}>软填 · {s.label}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      borderRadius: 999,
                      background: soft(SUCCESS, 0.1),
                      border: `1px solid ${soft(SUCCESS, 0.3)}`,
                      color: SUCCESS,
                      padding: '2px 12px',
                      fontFamily: MONO,
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    9 / 9
                  </span>
                  <span style={{ fontFamily: MONO, fontSize: 10, color: MUTED }}>计数 · 全绿满</span>
                </div>
              </div>
            </section>

            <div style={{ height: 1, background: BORDER_STRONG }} />

            {/* ── 上下文用法 ── */}
            <section style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div style={{ fontFamily: MONO, fontSize: 11, color: MUTED, marginBottom: 14 }}>
                上下文 · 内容行右侧判灯
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                {[
                  { t: '扩散模型为什么能生成图像', badge: <Outline color={SUCCESS} label="已发布" />, active: true },
                  { t: '一句话讲透 Transformer 注意力', badge: <Soft base={WARNING} label="待发布" />, active: false },
                  { t: '本地跑大模型的三条省钱路径', badge: <Outline color={RISK} label="错误" />, active: false },
                  { t: 'RAG 到底解决了什么问题（草稿）', badge: <Outline color={MUTED_STRONG} label="默认" />, active: false },
                ].map(row => (
                  <div
                    key={row.t}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      padding: '14px 16px 14px 18px',
                      borderRadius: 12,
                      background: row.active ? ELEV : SURFACE,
                      border: `1px solid ${BORDER}`,
                      overflow: 'hidden',
                    }}
                  >
                    {row.active && (
                      <span style={{ position: 'absolute', left: 0, top: 8, bottom: 8, width: 3, borderRadius: 999, background: FOCUS }} />
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                      <span style={{ width: 30, height: 30, borderRadius: 8, background: CREAM, border: `1px solid ${BORDER}`, flex: '0 0 auto' }} />
                      <span style={{ fontSize: 14, fontWeight: 600, color: INK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {row.t}
                      </span>
                    </div>
                    {row.badge}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
