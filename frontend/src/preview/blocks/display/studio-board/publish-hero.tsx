import { PreviewFrame } from '../../../_layout';

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

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const BOARD = 'linear-gradient(135deg,#d9cbb0,#b89a6f)';

function Stat({ value, unit, label }: { value: string; unit: string; label: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: DISPLAY,
          fontSize: 22,
          fontWeight: 700,
          color: INK,
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
        <span style={{ fontSize: 13, fontWeight: 600, color: MUTED, marginLeft: 3 }}>{unit}</span>
      </div>
      <div style={{ fontSize: 10.5, color: MUTED, marginTop: 6, letterSpacing: '0.02em' }}>{label}</div>
    </div>
  );
}

export default function PublishHero() {
  return (
    <PreviewFrame bg={SAND} padded={false}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: `radial-gradient(120% 100% at 50% 42%, ${CREAM}, ${SAND} 66%)`,
        }}
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06, mixBlendMode: 'overlay', backgroundImage: GRAIN }} />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: 900,
            padding: 34,
            display: 'flex',
            alignItems: 'center',
            gap: 44,
            background: GLASS,
            backdropFilter: 'blur(30px) saturate(140%)',
            border: '1px solid ' + GLASS_BRD,
            boxShadow: SHADOW_LG + ', ' + GLASS_INSET,
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

          {/* 左封面 */}
          <div style={{ position: 'relative', width: 340, flexShrink: 0 }}>
            <div
              style={{
                position: 'absolute',
                inset: -24,
                borderRadius: 36,
                background: BOARD,
                opacity: 0.2,
                filter: 'blur(42px) saturate(1.5)',
                transform: 'scale(1.04)',
              }}
            />
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                aspectRatio: '16 / 9',
                borderRadius: 12,
                border: '1px solid ' + BORDER,
                boxShadow: SHADOW_LG,
                overflow: 'hidden',
                background: BOARD,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 900,
                  fontSize: 34,
                  color: '#2a2620',
                  letterSpacing: '-0.01em',
                  textAlign: 'center',
                  padding: '0 20px',
                  textShadow: '0 1px 0 rgba(255,255,255,0.28)',
                }}
              >
                7M 掀翻大模型
              </div>
              <div
                style={{
                  position: 'absolute',
                  left: 10,
                  bottom: 10,
                  background: INK,
                  color: SURFACE,
                  borderRadius: 999,
                  padding: '4px 10px',
                  fontFamily: MONO,
                  fontSize: 9.5,
                  letterSpacing: '0.02em',
                }}
              >
                成片封面 · 16:9
              </div>
            </div>
          </div>

          {/* 右文案 */}
          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                fontFamily: DISPLAY,
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: WARNING,
                marginBottom: 12,
              }}
            >
              已完成 · 全矩阵同步
            </div>
            <h2
              style={{
                fontFamily: DISPLAY,
                fontWeight: 700,
                fontSize: 28,
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
                color: INK,
                margin: 0,
              }}
            >
              7M 参数小模型反超前沿大模型：推理一定要靠规模吗
            </h2>
            <div style={{ fontSize: 13, color: MUTED_STRONG, lineHeight: 1.65, marginTop: 14, maxWidth: 430 }}>
              一条横屏深度母版{' '}
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  color: INK,
                  background: 'rgba(42,38,32,0.05)',
                  borderRadius: 5,
                  padding: '1px 6px',
                }}
              >
                master.mp4
              </span>{' '}
              已渲完，四平台文案就绪，等你按下发布。
            </div>

            <div style={{ display: 'flex', gap: 30, marginTop: 26 }}>
              <Stat value="74.6" unit="MB" label="母版大小" />
              <Stat value="4" unit="/4" label="平台就绪" />
              <Stat value="9" unit="/9" label="管线完成" />
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
