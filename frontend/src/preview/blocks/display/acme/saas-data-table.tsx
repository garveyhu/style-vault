import { PreviewFrame } from '../../../_layout';

const ROWS = [
  { id: 'svc-001', status: 'healthy',  name: 'auth-gateway',     region: 'us-east-1', p99: '12ms',  rps: '420',  owner: 'Alice' },
  { id: 'svc-002', status: 'healthy',  name: 'billing-core',     region: 'us-east-1', p99: '24ms',  rps: '180',  owner: 'Bob' },
  { id: 'svc-003', status: 'degraded', name: 'notification',     region: 'eu-west-1', p99: '180ms', rps: '64',   owner: 'Carol' },
  { id: 'svc-004', status: 'healthy',  name: 'search-index',     region: 'us-west-2', p99: '8ms',   rps: '1.2k', owner: 'Dave' },
  { id: 'svc-005', status: 'idle',     name: 'report-gen',       region: 'us-east-1', p99: '—',     rps: '0',    owner: 'Erin' },
  { id: 'svc-006', status: 'critical', name: 'payment-webhook',  region: 'us-east-1', p99: '—',     rps: '—',    owner: 'Frank' },
  { id: 'svc-007', status: 'healthy',  name: 'asset-cdn-edge',   region: 'global',    p99: '6ms',   rps: '8.4k', owner: 'Gina' },
  { id: 'svc-008', status: 'healthy',  name: 'metrics-ingest',   region: 'us-east-1', p99: '34ms',  rps: '12.1k', owner: 'Henry' },
  { id: 'svc-009', status: 'degraded', name: 'mailer-batch',     region: 'eu-west-1', p99: '480ms', rps: '4',    owner: 'Iris' },
  { id: 'svc-010', status: 'healthy',  name: 'user-graph',       region: 'us-west-2', p99: '52ms',  rps: '320',  owner: 'Jack' },
  { id: 'svc-011', status: 'healthy',  name: 'audit-log-store',  region: 'us-east-1', p99: '18ms',  rps: '740',  owner: 'Kim' },
  { id: 'svc-012', status: 'healthy',  name: 'session-cache',    region: 'us-east-1', p99: '4ms',   rps: '24.6k', owner: 'Leo' },
];

const STATUS_COLOR: Record<string, string> = {
  healthy: '#10b981',
  degraded: '#f59e0b',
  critical: '#ef4444',
  idle: '#64748b',
};

export default function SaasDataTablePreview() {
  return (
    <PreviewFrame bg="#0f172a" padded={false}>
      <style>
        {`
          @keyframes sv-status-pulse-glow {
            0%   { box-shadow: 0 0 0 0   rgba(16,185,129,0.55); }
            70%  { box-shadow: 0 0 0 5px rgba(16,185,129,0);    }
            100% { box-shadow: 0 0 0 0   rgba(16,185,129,0);    }
          }
        `}
      </style>
      <div
        style={{
          padding: '48px 56px',
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
          SaaS Data Table
        </div>
        <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 32 }}>
          行高 40px · 等宽数字右对齐 · status pulse · zebra subtle
        </div>

        <div
          style={{
            background: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '48px 1.4fr 1fr 80px 100px 1fr 60px',
              background: '#0b1220',
              borderBottom: '1px solid #1e293b',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#64748b',
              height: 32,
              alignItems: 'center',
            }}
          >
            <div style={{ padding: '0 12px' }}>•</div>
            <div style={{ padding: '0 12px' }}>Service</div>
            <div style={{ padding: '0 12px' }}>Region</div>
            <div style={{ padding: '0 12px', textAlign: 'right' }}>P99</div>
            <div style={{ padding: '0 12px', textAlign: 'right' }}>Req/s</div>
            <div style={{ padding: '0 12px' }}>Owner</div>
            <div style={{ padding: '0 12px', textAlign: 'right' }}>···</div>
          </div>

          {/* Rows */}
          {ROWS.map((r, i) => (
            <div
              key={r.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '48px 1.4fr 1fr 80px 100px 1fr 60px',
                background: i % 2 === 1 ? 'rgba(15,23,42,0.6)' : 'transparent',
                fontSize: 13,
                color: '#e2e8f0',
                height: 40,
                alignItems: 'center',
                borderBottom: i === ROWS.length - 1 ? 'none' : '1px solid rgba(30,41,59,0.4)',
              }}
            >
              <div style={{ padding: '0 12px' }}>
                <span
                  className={r.status === 'healthy' ? 'sv-pulse-row' : ''}
                  style={{
                    display: 'inline-block',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: STATUS_COLOR[r.status],
                    animation:
                      r.status === 'healthy'
                        ? 'sv-status-pulse-glow 2s ease-out infinite'
                        : undefined,
                  }}
                />
              </div>
              <div style={{ padding: '0 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: 12 }}>
                {r.name}
              </div>
              <div style={{ padding: '0 12px', color: '#94a3b8', fontFamily: "'IBM Plex Mono', monospace", fontSize: 12 }}>
                {r.region}
              </div>
              <div style={{ padding: '0 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, textAlign: 'right' }}>
                {r.p99}
              </div>
              <div style={{ padding: '0 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, textAlign: 'right' }}>
                {r.rps}
              </div>
              <div style={{ padding: '0 12px', color: '#cbd5e1' }}>{r.owner}</div>
              <div style={{ padding: '0 12px', textAlign: 'right', color: '#475569', fontSize: 12 }}>
                ⌥
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 16,
            display: 'flex',
            justifyContent: 'space-between',
            color: '#475569',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.08em',
          }}
        >
          <span>{ROWS.length} services</span>
          <span>updated 2s ago</span>
        </div>
      </div>
    </PreviewFrame>
  );
}
