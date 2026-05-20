import { PreviewFrame } from '../../../_layout';

const MONO = "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif";

const FONTS_LINK =
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&display=swap';

type StackItem = {
  token: string;
  size: number;
  weight: number;
  family: 'mono' | 'sans';
  upper?: boolean;
  letterSpacing?: string;
  usage: string;
  sample: string;
};

const STACK: StackItem[] = [
  {
    token: 'eyebrow',
    size: 11,
    weight: 500,
    family: 'mono',
    upper: true,
    letterSpacing: '0.08em',
    usage: '代号 / caption / 微统计标签',
    sample: 'OVRV-MTRX',
  },
  {
    token: 'label',
    size: 12,
    weight: 400,
    family: 'sans',
    usage: '区域名 / 列头 / 中文 label',
    sample: '今日总事件',
  },
  {
    token: 'data',
    size: 13,
    weight: 500,
    family: 'mono',
    usage: '表格 / 事件流 / 字典数据',
    sample: '142ms / 11/11 ok',
  },
  {
    token: 'kpi-num',
    size: 32,
    weight: 500,
    family: 'mono',
    letterSpacing: '-0.02em',
    usage: 'KPI 大数字 (tabular-nums)',
    sample: '12.4',
  },
  {
    token: 'big',
    size: 56,
    weight: 500,
    family: 'mono',
    letterSpacing: '-0.02em',
    usage: '极少数大数字场景',
    sample: '98.7',
  },
];

const MICRO_SAMPLES = [
  { code: 'KPI-01', label: '今日总事件', value: '12.4', unit: 'M' },
  { code: 'KPI-02', label: '实时成功率', value: '98.7', unit: '%' },
  { code: 'KPI-03', label: 'P95 延迟', value: '142', unit: 'ms' },
  { code: 'KPI-04', label: '区域在线', value: '11/11', unit: '' },
];

export default function PlexMonoInterDuoPreview() {
  return (
    <PreviewFrame bg="#070a12" padded={false}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={FONTS_LINK} />

      <div
        style={{
          fontFamily: SANS,
          color: 'rgba(255,255,255,0.96)',
          padding: 40,
          maxWidth: 1200,
          margin: '0 auto',
          fontFeatureSettings: '"tnum" 1',
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: '0.12em',
            color: '#34d399',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          TYPOGRAPHY · MISSION-OPS
        </div>
        <h1
          style={{
            fontFamily: MONO,
            fontSize: 32,
            fontWeight: 500,
            letterSpacing: '-0.01em',
            margin: '0 0 10px',
          }}
        >
          Plex Mono + Inter Duo
        </h1>
        <p
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.62)',
            margin: '0 0 36px',
            maxWidth: 720,
            lineHeight: 1.7,
          }}
        >
          IBM Plex Mono 主导 80%（数据 / 标签 / 编号），Inter 副做中文与人话文本——专为 NASA MOCR / Bloomberg / 工程屏的"机器在跟你说话"
        </p>

        <section style={{ marginBottom: 40 }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10.5,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.38)',
              marginBottom: 16,
            }}
          >
            字号 stack · 紧凑工程档
          </div>
          <div
            style={{
              background: '#0a0e1a',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            {STACK.map((s, i) => (
              <div
                key={s.token}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 1fr 1fr',
                  alignItems: 'baseline',
                  gap: 24,
                  padding: '20px 24px',
                  borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: 13,
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.96)',
                    }}
                  >
                    {s.token}
                  </div>
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: 10.5,
                      color: 'rgba(255,255,255,0.38)',
                      marginTop: 4,
                    }}
                  >
                    {s.size}px / w{s.weight} / {s.family}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: s.family === 'mono' ? MONO : SANS,
                    fontSize: s.size,
                    fontWeight: s.weight,
                    letterSpacing: s.letterSpacing ?? 'normal',
                    textTransform: s.upper ? 'uppercase' : 'none',
                    color: 'rgba(255,255,255,0.96)',
                    fontVariantNumeric: s.family === 'mono' ? 'tabular-nums' : 'normal',
                    lineHeight: 1.2,
                  }}
                >
                  {s.sample}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.62)',
                  }}
                >
                  {s.usage}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10.5,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.38)',
              marginBottom: 16,
            }}
          >
            Live sample · 4 KPI 微样
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 12,
            }}
          >
            {MICRO_SAMPLES.map((m) => (
              <div
                key={m.code}
                style={{
                  background: '#0a0e1a',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderLeft: '2px solid #34d399',
                  padding: '14px 16px',
                }}
              >
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 10.5,
                    letterSpacing: '0.08em',
                    color: 'rgba(255,255,255,0.38)',
                    textTransform: 'uppercase',
                  }}
                >
                  {m.code}
                </div>
                <div
                  style={{
                    fontFamily: SANS,
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.62)',
                    marginTop: 6,
                  }}
                >
                  {m.label}
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 6,
                    marginTop: 8,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  <span
                    style={{
                      fontSize: 32,
                      fontWeight: 500,
                      letterSpacing: '-0.02em',
                      color: 'rgba(255,255,255,0.96)',
                    }}
                  >
                    {m.value}
                  </span>
                  {m.unit && (
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.38)' }}>
                      {m.unit}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 16 }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10.5,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.38)',
              marginBottom: 16,
            }}
          >
            Stack · CSS tokens
          </div>
          <pre
            style={{
              fontFamily: MONO,
              fontSize: 12,
              background: '#0a0e1a',
              border: '1px solid rgba(255,255,255,0.12)',
              padding: 20,
              color: 'rgba(255,255,255,0.62)',
              lineHeight: 1.6,
              overflow: 'auto',
            }}
          >
{`--font-mono: 'IBM Plex Mono', 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif;
font-feature-settings: 'tnum' 1;

.mono { font-family: var(--font-mono); font-variant-numeric: tabular-nums; }
.sans { font-family: var(--font-sans); }`}
          </pre>
        </section>
      </div>
    </PreviewFrame>
  );
}
