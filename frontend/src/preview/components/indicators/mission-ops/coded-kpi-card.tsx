import { PreviewFrame } from '../../../_layout';

const MONO = "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif";

type Kpi = {
  code: string;
  title: string;
  value: string;
  unit: string;
  accent: string;
  delta: { dir: 'up' | 'down'; text: string };
  spark: number[];
  micro: Array<{ label: string; value: string }>;
};

const KPIS: Kpi[] = [
  {
    code: 'KPI-01',
    title: '今日总事件',
    value: '12.4',
    unit: 'M',
    accent: '#34d399',
    delta: { dir: 'up', text: '12.3%' },
    spark: [18, 16, 12, 14, 8, 10, 4, 6],
    micro: [
      { label: 'σ', value: '0.42' },
      { label: 'max', value: '16.0M' },
    ],
  },
  {
    code: 'KPI-02',
    title: '实时成功率',
    value: '98.7',
    unit: '%',
    accent: '#22d3ee',
    delta: { dir: 'up', text: '0.4%' },
    spark: [14, 12, 13, 11, 10, 9, 8, 7],
    micro: [
      { label: 'σ', value: '0.18' },
      { label: 'min', value: '96.2%' },
    ],
  },
  {
    code: 'KPI-03',
    title: 'P95 延迟',
    value: '142',
    unit: 'ms',
    accent: '#fbbf24',
    delta: { dir: 'up', text: '18ms' },
    spark: [6, 8, 10, 12, 14, 12, 16, 18],
    micro: [
      { label: 'σ', value: '12.4' },
      { label: 'max', value: '187ms' },
    ],
  },
  {
    code: 'KPI-04',
    title: '区域在线',
    value: '11/11',
    unit: '',
    accent: '#34d399',
    delta: { dir: 'up', text: '100%' },
    spark: [8, 8, 6, 6, 4, 4, 2, 2],
    micro: [
      { label: 'last', value: '02s' },
      { label: 'avg', value: '99.9%' },
    ],
  },
];

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 80;
  const h = 24;
  const step = w / (data.length - 1);
  const points = data.map((v, i) => `${(i * step).toFixed(1)},${v}`).join(' ');
  const last = data[data.length - 1];
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth={1.5} />
      <circle cx={w} cy={last} r={2} fill={color} />
    </svg>
  );
}

function KpiCard({ k }: { k: Kpi }) {
  return (
    <div
      style={{
        position: 'relative',
        background: '#0a0e1a',
        border: '1px solid rgba(255,255,255,0.10)',
        borderLeft: `2px solid ${k.accent}`,
        padding: '14px 16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: 10.5,
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.38)',
            textTransform: 'uppercase',
          }}
        >
          {k.code}
        </span>
        <Sparkline data={k.spark} color={k.accent} />
      </div>

      <div
        style={{
          fontFamily: SANS,
          fontSize: 11,
          color: 'rgba(255,255,255,0.62)',
          marginTop: 6,
        }}
      >
        {k.title}
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
            color: 'rgba(255,255,255,0.96)',
            letterSpacing: '-0.02em',
          }}
        >
          {k.value}
        </span>
        {k.unit && (
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.38)' }}>{k.unit}</span>
        )}
      </div>

      <div
        style={{
          fontFamily: MONO,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginTop: 10,
          fontSize: 10.5,
          color: 'rgba(255,255,255,0.38)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        <span style={{ color: k.delta.dir === 'up' ? k.accent : '#fb7185' }}>
          {k.delta.dir === 'up' ? '▲' : '▼'} {k.delta.text}
        </span>
        {k.micro.map((m) => (
          <span key={m.label}>
            {m.label}{' '}
            <span style={{ color: 'rgba(255,255,255,0.62)' }}>{m.value}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function CodedKpiCardPreview() {
  return (
    <PreviewFrame bg="#070a12" padded={false}>
      <div
        style={{
          fontFamily: SANS,
          color: 'rgba(255,255,255,0.96)',
          padding: 40,
          maxWidth: 1200,
          margin: '0 auto',
          backgroundImage:
            'linear-gradient(rgba(120,180,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(120,180,255,0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
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
          COMPONENT · INDICATOR
        </div>
        <h1
          style={{
            fontFamily: MONO,
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: '-0.01em',
            margin: '0 0 8px',
          }}
        >
          Coded KPI Card
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
          左 2px accent bar · 顶 KPI-NN 代号 · 80×24 sparkline · 中文 title + value/unit 拆分 · 底 delta + σ/max/min
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 12,
            marginBottom: 36,
          }}
        >
          {KPIS.map((k) => (
            <KpiCard key={k.code} k={k} />
          ))}
        </div>

        <div
          style={{
            fontFamily: MONO,
            fontSize: 10.5,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.38)',
            marginBottom: 14,
          }}
        >
          Accent · 一色一职
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 12,
            fontFamily: MONO,
          }}
        >
          {[
            { name: 'ok', hex: '#34d399', use: '吞吐 / 可用率' },
            { name: 'info', hex: '#22d3ee', use: '中性数据 / 成功率' },
            { name: 'warn', hex: '#fbbf24', use: '延迟 / 告警' },
            { name: 'fail', hex: '#fb7185', use: 'delta- / 异常' },
          ].map((t) => (
            <div
              key={t.name}
              style={{
                background: '#0a0e1a',
                border: '1px solid rgba(255,255,255,0.10)',
                borderLeft: `2px solid ${t.hex}`,
                padding: '10px 12px',
                fontSize: 11,
                color: 'rgba(255,255,255,0.62)',
              }}
            >
              <span style={{ color: t.hex }}>{t.name}</span> · {t.use}
            </div>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}
