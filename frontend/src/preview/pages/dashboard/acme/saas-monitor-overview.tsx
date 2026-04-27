import { PreviewFrame } from '../../../_layout';

const METRICS = [
  { label: 'Uptime · 30d', value: '99.982%', delta: '↑ 0.04%', color: '#34d399' },
  { label: 'Requests · 1h', value: '1,284', delta: '↑ 12.4%', color: '#34d399' },
  { label: 'P99 · ms', value: '212', delta: '↓ 8ms', color: '#34d399' },
  { label: 'Error rate', value: '0.041%', delta: '↑ 0.003%', color: '#fb7185' },
];

const TABLE_ROWS = [
  { id: 'svc-001', status: 'healthy', name: 'auth-gateway', region: 'us-east-1', p99: '12ms', rps: '420' },
  { id: 'svc-002', status: 'healthy', name: 'billing-core', region: 'us-east-1', p99: '24ms', rps: '180' },
  { id: 'svc-003', status: 'degraded', name: 'notification', region: 'eu-west-1', p99: '180ms', rps: '64' },
  { id: 'svc-004', status: 'healthy', name: 'search-index', region: 'us-west-2', p99: '8ms', rps: '1.2k' },
  { id: 'svc-005', status: 'healthy', name: 'metrics-ingest', region: 'us-east-1', p99: '34ms', rps: '12.1k' },
  { id: 'svc-006', status: 'idle', name: 'report-gen', region: 'us-east-1', p99: '—', rps: '0' },
];

const STATUS_COLOR: Record<string, string> = {
  healthy: '#10b981',
  degraded: '#f59e0b',
  critical: '#ef4444',
  idle: '#64748b',
};

// generate fake p99 / p50 line data
function genLine(seed: number, n = 60, mid = 0.5, amp = 0.25): number[] {
  const arr: number[] = [];
  let v = mid;
  for (let i = 0; i < n; i++) {
    v += (Math.sin(i * 0.4 + seed) + (i * 17) % 5 / 10 - 0.25) * amp * 0.4;
    v = Math.max(0.05, Math.min(0.95, v));
    arr.push(v);
  }
  return arr;
}

export default function SaasMonitorOverviewPreview() {
  const p50 = genLine(1, 60, 0.35, 0.25);
  const p99 = genLine(3.7, 60, 0.7, 0.3);

  return (
    <PreviewFrame bg="#0f172a" padded={false}>
      <style>
        {`
          @keyframes sv-mp { 0%{box-shadow:0 0 0 0 rgba(16,185,129,.55);} 70%{box-shadow:0 0 0 5px rgba(16,185,129,0);} 100%{box-shadow:0 0 0 0 rgba(16,185,129,0);} }
        `}
      </style>
      <div
        style={{
          fontFamily:
            "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
          color: '#e2e8f0',
          minHeight: 900,
        }}
      >
        {/* Topbar */}
        <div
          style={{
            height: 56,
            background: '#0f172a',
            borderBottom: '1px solid #1e293b',
            display: 'flex',
            alignItems: 'center',
            padding: '0 32px',
            gap: 24,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22d3ee' }} />
              <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '0.1em' }}>ICEOPS</span>
            </div>
            <span style={{ color: '#334155' }}>/</span>
            <nav
              style={{
                display: 'flex',
                gap: 8,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#94a3b8',
              }}
            >
              <span>Monitoring</span>
              <span style={{ color: '#334155' }}>›</span>
              <span style={{ color: '#e2e8f0' }}>production</span>
            </nav>
          </div>
          <div
            style={{
              flex: 1,
              maxWidth: 480,
              height: 32,
              padding: '0 12px',
              background: '#0b1220',
              border: '1px solid #1e293b',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              color: '#64748b',
              fontSize: 12,
            }}
          >
            <span>⌕</span>
            <span style={{ flex: 1 }}>Search incidents…</span>
            <kbd style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, padding: '2px 6px', background: '#1e293b', color: '#94a3b8', borderRadius: 3 }}>⌘K</kbd>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', animation: 'sv-mp 2s ease-out infinite' }} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94a3b8' }}>All systems operational</span>
            </span>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1e293b', boxShadow: '0 0 0 1px rgba(34,211,238,0.4)' }} />
          </div>
        </div>

        {/* Status banner (neutral) */}
        <div
          style={{
            height: 32,
            padding: '0 32px',
            background: '#0f172a',
            borderBottom: '1px solid #1e293b',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            color: '#cbd5e1',
            fontSize: 12,
          }}
        >
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.08em', opacity: 0.7 }}>
            01:48:22 UTC
          </span>
          <span style={{ flex: 1 }}>Scheduled maintenance window starts in 12 minutes · eu-west-1</span>
          <span style={{ opacity: 0.6, cursor: 'pointer' }}>×</span>
        </div>

        {/* Body */}
        <div style={{ padding: '40px 32px' }}>
          {/* Title row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.18em', color: '#64748b', textTransform: 'uppercase', marginBottom: 6 }}>
                production · region us-east-1
              </div>
              <h1 style={{ fontSize: 28, fontWeight: 600, margin: 0 }}>Monitoring</h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', background: '#0b1220', border: '1px solid #1e293b', borderRadius: 4 }}>
                {['1h', '24h', '7d', '30d'].map((t, i) => (
                  <div
                    key={t}
                    style={{
                      padding: '6px 14px',
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 12,
                      color: i === 1 ? '#0f172a' : '#94a3b8',
                      background: i === 1 ? '#22d3ee' : 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>
              <button
                style={{
                  height: 32,
                  padding: '0 14px',
                  background: 'transparent',
                  border: '1px solid #475569',
                  borderRadius: 4,
                  color: '#cbd5e1',
                  fontSize: 12,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Export ↓
              </button>
            </div>
          </div>

          {/* Metric grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: '#1e293b', marginBottom: 32 }}>
            {METRICS.map((m) => (
              <div key={m.label} style={{ background: '#0f172a', padding: '20px 24px' }}>
                <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#64748b' }}>
                  {m.label}
                </div>
                <div style={{ marginTop: 12, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 32, fontWeight: 500, lineHeight: 1, color: '#f1f5f9' }}>
                    {m.value}
                  </span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: m.color }}>{m.delta}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Latency chart */}
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 4, padding: '20px 24px', marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#e2e8f0' }}>Latency · last 24h</div>
              <div style={{ display: 'flex', gap: 16, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <span style={{ color: '#34d399' }}>● p50</span>
                <span style={{ color: '#22d3ee' }}>● p99</span>
              </div>
            </div>
            <svg width="100%" height={200} viewBox="0 0 800 200" preserveAspectRatio="none" style={{ display: 'block' }}>
              {[0.25, 0.5, 0.75].map((y) => (
                <line key={y} x1={0} x2={800} y1={200 * y} y2={200 * y} stroke="#1e293b" strokeWidth="1" />
              ))}
              <polyline
                points={p99.map((v, i) => `${(i / (p99.length - 1)) * 800},${200 - v * 180}`).join(' ')}
                fill="none"
                stroke="#22d3ee"
                strokeWidth="1.5"
              />
              <polyline
                points={p50.map((v, i) => `${(i / (p50.length - 1)) * 800},${200 - v * 180}`).join(' ')}
                fill="none"
                stroke="#34d399"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* Services table */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Services · {TABLE_ROWS.length} active</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: '#475569', letterSpacing: '0.08em' }}>updated 2s ago</div>
            </div>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '40px 1.4fr 1fr 80px 100px', background: '#0b1220', borderBottom: '1px solid #1e293b', fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748b', height: 32, alignItems: 'center' }}>
                <div style={{ padding: '0 12px' }}>•</div>
                <div style={{ padding: '0 12px' }}>Service</div>
                <div style={{ padding: '0 12px' }}>Region</div>
                <div style={{ padding: '0 12px', textAlign: 'right' }}>P99</div>
                <div style={{ padding: '0 12px', textAlign: 'right' }}>Req/s</div>
              </div>
              {TABLE_ROWS.map((r, i) => (
                <div
                  key={r.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 1.4fr 1fr 80px 100px',
                    background: i % 2 === 1 ? 'rgba(15,23,42,0.6)' : 'transparent',
                    height: 40,
                    alignItems: 'center',
                    fontSize: 13,
                    borderBottom: i === TABLE_ROWS.length - 1 ? 'none' : '1px solid rgba(30,41,59,0.4)',
                  }}
                >
                  <div style={{ padding: '0 12px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: STATUS_COLOR[r.status],
                        animation: r.status === 'healthy' ? 'sv-mp 2s ease-out infinite' : undefined,
                      }}
                    />
                  </div>
                  <div style={{ padding: '0 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: 12 }}>{r.name}</div>
                  <div style={{ padding: '0 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: '#94a3b8' }}>{r.region}</div>
                  <div style={{ padding: '0 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, textAlign: 'right' }}>{r.p99}</div>
                  <div style={{ padding: '0 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, textAlign: 'right' }}>{r.rps}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
