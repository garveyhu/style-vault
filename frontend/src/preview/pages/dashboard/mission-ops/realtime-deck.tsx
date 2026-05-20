import { PreviewFrame } from '../../../_layout';

const MONO = "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif";

const TEXT_1 = 'rgba(255,255,255,0.96)';
const TEXT_2 = 'rgba(255,255,255,0.62)';
const TEXT_3 = 'rgba(255,255,255,0.38)';
const TEXT_4 = 'rgba(255,255,255,0.22)';
const PANEL = '#0a0e1a';
const HAIR = 'rgba(255,255,255,0.07)';
const LINE = 'rgba(255,255,255,0.10)';

const OK = '#34d399';
const INFO = '#22d3ee';
const WARN = '#fbbf24';
const FAIL = '#fb7185';

type KpiSpec = {
  code: string;
  title: string;
  value: string;
  unit: string;
  accent: string;
  delta: { dir: 'up' | 'down'; text: string };
  spark: number[];
  micro: Array<{ label: string; value: string }>;
};

const KPIS: KpiSpec[] = [
  {
    code: 'KPI-01',
    title: '今日总事件',
    value: '12.4',
    unit: 'M',
    accent: OK,
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
    accent: INFO,
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
    accent: WARN,
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
    accent: OK,
    delta: { dir: 'up', text: '100%' },
    spark: [8, 8, 6, 6, 4, 4, 2, 2],
    micro: [
      { label: 'last', value: '02s' },
      { label: 'avg', value: '99.9%' },
    ],
  },
];

const TREE = [
  {
    group: '总览',
    items: [
      { label: '实时大屏', active: true },
      { label: '健康总览', active: false },
    ],
  },
  {
    group: '区域观测',
    items: [
      { label: '拱墅 100%', active: false, color: OK },
      { label: '临安 100%', active: false, color: OK },
      { label: '余杭 75%', active: false, color: WARN },
      { label: '滨江 100%', active: false, color: OK },
      { label: '嘉善 100%', active: false, color: OK },
      { label: '奉化 —', active: false, color: TEXT_4 },
    ],
  },
  {
    group: '系统',
    items: [
      { label: '告警 3 open', active: false, color: WARN },
      { label: '审计日志', active: false },
    ],
  },
];

const REGIONS = [
  { name: '拱墅', cols: 5, ok: 5 },
  { name: 'syzh', cols: 4, ok: 4 },
  { name: '余杭', cols: 4, ok: 3 },
  { name: '嘉善', cols: 2, ok: 2 },
  { name: '奉化', cols: 5, ok: 0, offline: true },
];

const FEED = [
  { t: '14:02:18', tag: 'OK ', color: OK, text: 'sync.region.gs done · 142ms' },
  { t: '14:02:15', tag: 'OK ', color: OK, text: 'wave.bridge.lh ingest · 89ms' },
  { t: '14:02:12', tag: 'WRN', color: WARN, text: 'p95 spike · region.yy' },
  { t: '14:02:08', tag: 'OK ', color: OK, text: 'etlflow.push.bj · 234rows' },
  { t: '14:02:03', tag: 'INF', color: INFO, text: 'cdc.event drained · 1.2M' },
];

const TELEMETRY = [
  { k: 'CTL', v: 'OPERATIONAL', color: OK, pulse: true },
  { k: 'REGIONS', v: '10/11', color: WARN },
  { k: 'FEED', v: '142/s', color: TEXT_2 },
  { k: 'P95', v: '142ms', color: TEXT_2 },
  { k: 'QUEUE', v: '0', color: OK },
  { k: 'MEM', v: '68%', color: TEXT_2 },
  { k: 'CPU', v: '42%', color: TEXT_2 },
  { k: 'DB', v: 'PG/14', color: TEXT_2 },
  { k: 'REDIS', v: 'OK', color: OK },
  { k: 'ALERTS', v: '3 OPEN', color: WARN, pulse: true },
  { k: 'BUILD', v: 'a3f8e21', color: TEXT_3 },
  { k: 'UPTIME', v: '42d 14h', color: TEXT_3 },
  { k: 'MODE', v: 'LIVE', color: OK },
  { k: 'TZ', v: 'UTC+8', color: TEXT_3 },
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

function KpiCard({ k }: { k: KpiSpec }) {
  return (
    <div
      style={{
        background: PANEL,
        border: `1px solid ${LINE}`,
        borderLeft: `2px solid ${k.accent}`,
        padding: '14px 16px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            fontFamily: MONO,
            fontSize: 10.5,
            letterSpacing: '0.08em',
            color: TEXT_3,
            textTransform: 'uppercase',
          }}
        >
          {k.code}
        </span>
        <Sparkline data={k.spark} color={k.accent} />
      </div>
      <div style={{ fontFamily: SANS, fontSize: 11, color: TEXT_2, marginTop: 6 }}>{k.title}</div>
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
        <span style={{ fontSize: 30, fontWeight: 500, color: TEXT_1, letterSpacing: '-0.02em' }}>
          {k.value}
        </span>
        {k.unit && <span style={{ fontSize: 13, color: TEXT_3 }}>{k.unit}</span>}
      </div>
      <div
        style={{
          fontFamily: MONO,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          marginTop: 10,
          fontSize: 10.5,
          color: TEXT_3,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        <span style={{ color: k.delta.dir === 'up' ? k.accent : FAIL }}>
          {k.delta.dir === 'up' ? '▲' : '▼'} {k.delta.text}
        </span>
        {k.micro.map((m) => (
          <span key={m.label}>
            {m.label} <span style={{ color: TEXT_2 }}>{m.value}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function PanelHeader({
  code,
  subtitle,
  accent,
  stats,
  dot,
}: {
  code: string;
  subtitle: string;
  accent: string;
  stats: Array<{ label: string; value: string }>;
  dot: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 14px',
        borderBottom: `1px solid ${HAIR}`,
      }}
    >
      <span
        style={{
          fontFamily: MONO,
          fontSize: 11,
          letterSpacing: '0.12em',
          color: accent,
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        {code}
      </span>
      <span style={{ width: 1, height: 11, background: 'rgba(255,255,255,0.18)' }} />
      <span style={{ fontFamily: SANS, fontSize: 12, color: TEXT_2 }}>{subtitle}</span>
      <div
        style={{
          marginLeft: 'auto',
          display: 'flex',
          gap: 12,
          fontFamily: MONO,
          fontSize: 10.5,
          color: TEXT_3,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {stats.map((s) => (
          <span key={s.label}>
            {s.label} <span style={{ color: TEXT_2 }}>{s.value}</span>
          </span>
        ))}
      </div>
      <span
        style={{
          marginLeft: 8,
          width: 4,
          height: 4,
          background: dot,
          borderRadius: '50%',
          boxShadow: `0 0 0 1px ${dot}66, 0 0 8px ${dot}66`,
        }}
      />
    </div>
  );
}

export default function RealtimeDeckPreview() {
  return (
    <PreviewFrame bg="#070a12" padded={false}>
      <div
        style={{
          fontFamily: SANS,
          color: TEXT_1,
          minHeight: 800,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', flex: 1 }}>
          {/* Left tree 240px */}
          <aside
            style={{
              width: 240,
              borderRight: `1px solid ${HAIR}`,
              background: '#070a12',
              padding: 14,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 6,
                padding: '4px 6px 12px',
                borderBottom: `1px solid ${HAIR}`,
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  color: OK,
                }}
              >
                AURA
              </span>
              <span style={{ fontFamily: MONO, fontSize: 10, color: TEXT_3 }}>v0.5</span>
            </div>

            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                color: TEXT_3,
                background: '#0a0e1a',
                border: `1px solid ${LINE}`,
                padding: '6px 8px',
                marginBottom: 6,
              }}
            >
              ⌘K 搜索...
            </div>

            {TREE.map((g) => (
              <div key={g.group} style={{ marginBottom: 8 }}>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    letterSpacing: '0.08em',
                    color: TEXT_3,
                    textTransform: 'uppercase',
                    padding: '4px 6px',
                  }}
                >
                  ▾ {g.group}
                </div>
                {g.items.map((it) => (
                  <div
                    key={it.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '5px 10px',
                      borderLeft: it.active ? `2px solid ${OK}` : '2px solid transparent',
                      background: it.active ? '#0d1320' : 'transparent',
                      fontFamily: MONO,
                      fontSize: 11.5,
                      color: it.active ? TEXT_1 : TEXT_2,
                      cursor: 'pointer',
                    }}
                  >
                    {'color' in it && it.color && (
                      <span
                        style={{
                          width: 4,
                          height: 4,
                          background: it.color,
                          borderRadius: '50%',
                        }}
                      />
                    )}
                    {it.label}
                  </div>
                ))}
              </div>
            ))}

            <div
              style={{
                marginTop: 'auto',
                paddingTop: 12,
                borderTop: `1px solid ${HAIR}`,
                fontFamily: MONO,
                fontSize: 11,
                color: TEXT_3,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>admin@aura</span>
              <span>⚙</span>
            </div>
          </aside>

          {/* Main */}
          <main style={{ flex: 1, padding: 16, overflow: 'hidden' }}>
            {/* Topbar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 14,
                fontFamily: MONO,
                fontSize: 11.5,
              }}
            >
              <span style={{ color: TEXT_3 }}>
                总览 <span style={{ color: TEXT_4 }}>/</span>{' '}
                <span style={{ color: TEXT_1 }}>实时大屏</span>
              </span>
              <div
                style={{
                  marginLeft: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  color: TEXT_2,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                <span>14:02:24 UTC+8</span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '2px 8px',
                    background: '#0a0e1a',
                    border: `1px solid ${OK}66`,
                    color: OK,
                    letterSpacing: '0.08em',
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: OK,
                      boxShadow: `0 0 6px ${OK}`,
                    }}
                  />
                  LIVE
                </span>
                <span style={{ color: TEXT_3 }}>refresh 5s ▾</span>
              </div>
            </div>

            {/* 4 KPI */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 12,
                marginBottom: 16,
              }}
            >
              {KPIS.map((k) => (
                <KpiCard key={k.code} k={k} />
              ))}
            </div>

            {/* 8/12 + 4/12 row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: 16,
              }}
            >
              {/* OVRV-MTRX */}
              <div style={{ background: PANEL, border: `1px solid ${LINE}` }}>
                <PanelHeader
                  code="OVRV-MTRX"
                  subtitle="总览矩阵"
                  accent={OK}
                  dot={OK}
                  stats={[
                    { label: 'σ', value: '0.42' },
                    { label: 'max', value: '16.0M' },
                    { label: 'min', value: '8.2M' },
                  ]}
                />
                <div style={{ padding: 14 }}>
                  {REGIONS.map((r, i) => (
                    <div
                      key={r.name}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '70px 1fr 50px',
                        gap: 12,
                        alignItems: 'center',
                        padding: '7px 0',
                        borderTop: i === 0 ? 'none' : `1px solid ${HAIR}`,
                        fontFamily: MONO,
                        fontSize: 11,
                        color: TEXT_2,
                        opacity: r.offline ? 0.5 : 1,
                      }}
                    >
                      <span style={{ fontFamily: SANS, color: r.offline ? TEXT_3 : TEXT_1 }}>
                        {r.name}
                      </span>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {Array.from({ length: r.cols }).map((_, j) => (
                          <span
                            key={j}
                            style={{
                              flex: 1,
                              height: 8,
                              background: r.offline
                                ? 'rgba(255,255,255,0.07)'
                                : j < r.ok
                                  ? OK
                                  : FAIL,
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
                          color: r.offline ? TEXT_3 : r.ok === r.cols ? OK : WARN,
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {r.offline ? '—' : `${Math.round((r.ok / r.cols) * 100)}%`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RTM-FEED */}
              <div style={{ background: PANEL, border: `1px solid ${LINE}` }}>
                <PanelHeader
                  code="RTM-FEED"
                  subtitle="实时事件流"
                  accent={INFO}
                  dot={INFO}
                  stats={[
                    { label: 'rate', value: '142/s' },
                    { label: 'lag', value: '0.3s' },
                  ]}
                />
                <div style={{ padding: '12px 14px', fontFamily: MONO, fontSize: 11 }}>
                  {FEED.map((e, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '70px 30px 1fr',
                        gap: 8,
                        padding: '6px 0',
                        borderTop: i === 0 ? 'none' : `1px solid ${HAIR}`,
                        color: TEXT_2,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      <span style={{ color: TEXT_3 }}>{e.t}</span>
                      <span style={{ color: e.color }}>{e.tag}</span>
                      <span style={{ color: 'rgba(255,255,255,0.78)' }}>{e.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Bottom telemetry bar 14 段 */}
        <footer
          style={{
            height: 28,
            borderTop: `1px solid ${LINE}`,
            background: '#070a12',
            display: 'flex',
            alignItems: 'center',
            fontFamily: MONO,
            fontSize: 10.5,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {TELEMETRY.map((t, i) => (
            <div
              key={t.k}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '0 10px',
                borderRight: i === TELEMETRY.length - 1 ? 'none' : `1px solid ${HAIR}`,
                height: '100%',
                whiteSpace: 'nowrap',
              }}
            >
              {t.pulse && (
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: t.color,
                    boxShadow: `0 0 6px ${t.color}`,
                  }}
                />
              )}
              <span style={{ color: TEXT_3, letterSpacing: '0.04em' }}>{t.k}</span>
              <span style={{ color: t.color }}>{t.v}</span>
            </div>
          ))}
        </footer>
      </div>
    </PreviewFrame>
  );
}
