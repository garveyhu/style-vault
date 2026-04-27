import { PreviewFrame } from '../../../_layout';

const METRICS = [
  {
    label: 'Uptime · 30d',
    value: '99.982%',
    delta: { dir: 'up', value: '0.04%' },
    spark: [0.5, 0.6, 0.55, 0.65, 0.62, 0.7, 0.68, 0.72, 0.7, 0.78, 0.75, 0.82],
  },
  {
    label: 'Requests · 1h',
    value: '1,284',
    delta: { dir: 'up', value: '12.4%' },
    spark: [0.3, 0.5, 0.4, 0.6, 0.7, 0.6, 0.8, 0.7, 0.85, 0.9, 0.85, 0.95],
  },
  {
    label: 'P99 · ms',
    value: '212',
    delta: { dir: 'down', value: '8ms' },
    spark: [0.7, 0.65, 0.7, 0.6, 0.55, 0.5, 0.55, 0.45, 0.5, 0.4, 0.45, 0.35],
  },
  {
    label: 'Error rate',
    value: '0.041%',
    delta: { dir: 'up', value: '0.003%' },
    spark: [0.1, 0.2, 0.15, 0.18, 0.2, 0.25, 0.2, 0.3, 0.28, 0.32, 0.3, 0.35],
  },
] as const;

function Sparkline({ values }: { values: readonly number[] }) {
  const w = 200;
  const h = 28;
  const step = w / (values.length - 1);
  const path = values
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${h - v * h}`)
    .join(' ');
  return (
    <svg
      width="100%"
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      style={{ display: 'block', marginTop: 12, color: '#475569' }}
    >
      <path d={path} fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export default function SaasMetricGridPreview() {
  return (
    <PreviewFrame bg="#0f172a" padded={false}>
      <div
        style={{
          padding: '64px 56px',
          color: '#e2e8f0',
          fontFamily:
            "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: '0.18em',
            color: '#64748b',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          blocks / display / acme
        </div>
        <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>
          SaaS Metric Grid
        </div>
        <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 40 }}>
          4 列 KPI · 等宽数字 + delta · 极简 sparkline
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            background: '#1e293b',
          }}
        >
          {METRICS.map((m) => (
            <div
              key={m.label}
              style={{
                background: '#0f172a',
                padding: '20px 24px',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#64748b',
                }}
              >
                {m.label}
              </div>
              <div
                style={{
                  marginTop: 12,
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 36,
                    fontWeight: 500,
                    color: '#f1f5f9',
                    lineHeight: 1,
                  }}
                >
                  {m.value}
                </span>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 13,
                    color: m.delta.dir === 'up' ? '#34d399' : '#fb7185',
                  }}
                >
                  {m.delta.dir === 'up' ? '↑' : '↓'} {m.delta.value}
                </span>
              </div>
              <Sparkline values={m.spark} />
            </div>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}
