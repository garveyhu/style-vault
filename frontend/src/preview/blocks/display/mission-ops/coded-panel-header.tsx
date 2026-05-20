import { PreviewFrame } from '../../../_layout';

const MONO = "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif";

type Panel = {
  code: string;
  subtitle: string;
  accent: string;
  stats: Array<{ label: string; value: string }>;
  dot: string;
  body: 'matrix' | 'feed' | 'fail';
};

const PANELS: Panel[] = [
  {
    code: 'OVRV-MTRX',
    subtitle: '总览矩阵',
    accent: '#34d399',
    stats: [
      { label: 'σ', value: '0.42' },
      { label: 'max', value: '16.0M' },
      { label: 'min', value: '8.2M' },
    ],
    dot: '#34d399',
    body: 'matrix',
  },
  {
    code: 'RTM-FEED',
    subtitle: '实时事件流',
    accent: '#22d3ee',
    stats: [
      { label: 'rate', value: '142/s' },
      { label: 'lag', value: '0.3s' },
    ],
    dot: '#22d3ee',
    body: 'feed',
  },
  {
    code: 'FAIL-TOP',
    subtitle: '失败 Top 5',
    accent: '#fb7185',
    stats: [
      { label: 'total', value: '147' },
      { label: 'last', value: '02m' },
    ],
    dot: '#fbbf24',
    body: 'fail',
  },
];

function MicroStat({ label, value }: { label: string; value: string }) {
  return (
    <span style={{ display: 'inline-flex', gap: 4 }}>
      <span>{label}</span>
      <span style={{ color: 'rgba(255,255,255,0.62)' }}>{value}</span>
    </span>
  );
}

function PanelBody({ kind }: { kind: Panel['body'] }) {
  if (kind === 'matrix') {
    const regions = [
      { name: '拱墅', cols: 5, ok: 5 },
      { name: '临安', cols: 4, ok: 4 },
      { name: '余杭', cols: 4, ok: 3 },
      { name: '滨江', cols: 3, ok: 3 },
      { name: '嘉善', cols: 2, ok: 2 },
    ];
    return (
      <div style={{ padding: 16 }}>
        {regions.map((r, i) => (
          <div
            key={r.name}
            style={{
              display: 'grid',
              gridTemplateColumns: '70px 1fr 50px',
              gap: 12,
              alignItems: 'center',
              padding: '6px 0',
              borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.05)',
              fontFamily: MONO,
              fontSize: 11,
              color: 'rgba(255,255,255,0.62)',
            }}
          >
            <span style={{ fontFamily: SANS, color: 'rgba(255,255,255,0.96)' }}>
              {r.name}
            </span>
            <div style={{ display: 'flex', gap: 4 }}>
              {Array.from({ length: r.cols }).map((_, j) => (
                <span
                  key={j}
                  style={{
                    flex: 1,
                    height: 8,
                    background: j < r.ok ? '#34d399' : '#fb7185',
                    opacity: 0.78,
                  }}
                />
              ))}
              {Array.from({ length: 6 - r.cols }).map((_, j) => (
                <span
                  key={`pad-${j}`}
                  style={{
                    flex: 1,
                    height: 8,
                    background: 'rgba(255,255,255,0.05)',
                  }}
                />
              ))}
            </div>
            <span
              style={{
                textAlign: 'right',
                color: r.ok === r.cols ? '#34d399' : '#fbbf24',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {Math.round((r.ok / r.cols) * 100)}%
            </span>
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'feed') {
    const events = [
      { t: '14:02:18', tag: 'OK', color: '#34d399', text: 'sync.region.gs done · 142ms' },
      { t: '14:02:15', tag: 'OK', color: '#34d399', text: 'wave.bridge.lh ingest · 89ms' },
      { t: '14:02:12', tag: 'WRN', color: '#fbbf24', text: 'p95 spike · region.yy' },
      { t: '14:02:08', tag: 'OK', color: '#34d399', text: 'etlflow.push.bj · 234rows' },
      { t: '14:02:03', tag: 'INF', color: '#22d3ee', text: 'cdc.event drained · 1.2M' },
    ];
    return (
      <div style={{ padding: '12px 16px', fontFamily: MONO, fontSize: 11.5 }}>
        {events.map((e, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '70px 32px 1fr',
              gap: 10,
              padding: '5px 0',
              borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.62)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.38)' }}>{e.t}</span>
            <span style={{ color: e.color }}>{e.tag}</span>
            <span style={{ color: 'rgba(255,255,255,0.78)' }}>{e.text}</span>
          </div>
        ))}
      </div>
    );
  }
  // fail
  const fails = [
    { name: 'cdc.bjsync.timeout', count: 56, pct: 78 },
    { name: 'wave.push.401', count: 32, pct: 56 },
    { name: 'etl.parse.null', count: 24, pct: 42 },
    { name: 'bridge.tls.handshake', count: 18, pct: 31 },
    { name: 'schedule.dx.miss', count: 17, pct: 29 },
  ];
  return (
    <div style={{ padding: '12px 16px', fontFamily: MONO, fontSize: 11.5 }}>
      {fails.map((f, i) => (
        <div
          key={f.name}
          style={{
            padding: '6px 0',
            borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              color: 'rgba(255,255,255,0.78)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            <span>{f.name}</span>
            <span style={{ color: 'rgba(255,255,255,0.38)' }}>{f.count}</span>
          </div>
          <div
            style={{
              marginTop: 4,
              height: 3,
              background: 'rgba(255,255,255,0.05)',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${f.pct}%`,
                background: '#fb7185',
                opacity: 0.78,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function PanelCard({ p }: { p: Panel }) {
  return (
    <div
      style={{
        background: '#0a0e1a',
        border: '1px solid rgba(255,255,255,0.10)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 14px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: '0.12em',
            color: p.accent,
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          {p.code}
        </span>
        <span
          style={{
            width: 1,
            height: 11,
            background: 'rgba(255,255,255,0.18)',
          }}
        />
        <span
          style={{
            fontFamily: SANS,
            fontSize: 12,
            color: 'rgba(255,255,255,0.62)',
          }}
        >
          {p.subtitle}
        </span>

        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontFamily: MONO,
            fontSize: 10.5,
            color: 'rgba(255,255,255,0.38)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {p.stats.map((s) => (
            <MicroStat key={s.label} label={s.label} value={s.value} />
          ))}
        </div>

        <span
          style={{
            marginLeft: 8,
            width: 4,
            height: 4,
            background: p.dot,
            borderRadius: '50%',
            boxShadow: `0 0 0 1px ${p.dot}66, 0 0 8px ${p.dot}66`,
            display: 'inline-block',
          }}
        />
      </div>

      <PanelBody kind={p.body} />
    </div>
  );
}

export default function CodedPanelHeaderPreview() {
  return (
    <PreviewFrame bg="#070a12" padded={false}>
      <div
        style={{
          fontFamily: SANS,
          color: 'rgba(255,255,255,0.96)',
          padding: 40,
          maxWidth: 1200,
          margin: '0 auto',
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
          BLOCK · DISPLAY
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
          Coded Panel Header
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
          4 字母代号 · 中文副标题 · σ/max/min 微统计 · 健康度状态点 · 1px hairline · 不同代号绑定不同 panel
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: 16,
          }}
        >
          {PANELS.map((p) => (
            <PanelCard key={p.code} p={p} />
          ))}
        </div>

        <div
          style={{
            marginTop: 32,
            padding: 20,
            background: '#0a0e1a',
            border: '1px solid rgba(255,255,255,0.10)',
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10.5,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.38)',
              marginBottom: 12,
            }}
          >
            代号命名约定 · 4+4 / 4+3
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 12,
              fontFamily: MONO,
              fontSize: 11,
            }}
          >
            {[
              { code: 'OVRV-MTRX', use: 'overview matrix' },
              { code: 'RTM-FEED', use: 'realtime feed' },
              { code: 'FAIL-TOP', use: 'failure ranking' },
              { code: 'FLOW-24H', use: '24h time-series' },
              { code: 'SYS-INFO', use: 'system telemetry' },
              { code: 'CDC-RATE', use: 'cdc throughput' },
              { code: 'NET-PING', use: 'net latency' },
              { code: 'DB-CONN', use: 'db connections' },
            ].map((t) => (
              <div
                key={t.code}
                style={{
                  background: '#0d1320',
                  padding: '8px 12px',
                  borderLeft: '2px solid rgba(255,255,255,0.07)',
                }}
              >
                <div style={{ color: 'rgba(255,255,255,0.96)' }}>{t.code}</div>
                <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: 10.5, marginTop: 2 }}>
                  {t.use}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
