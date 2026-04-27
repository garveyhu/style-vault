import { PreviewFrame } from '../../../_layout';

const SEV_COLOR: Record<string, string> = {
  critical: '#fb7185',
  high: '#fbbf24',
  medium: '#22d3ee',
  low: '#94a3b8',
};
const STATUS_COLOR: Record<string, string> = {
  open: '#ef4444',
  ack: '#f59e0b',
  resolved: '#10b981',
};

const ROWS = [
  { id: 'INC-4421', title: 'payment-webhook outage · upstream timeout', sev: 'critical', status: 'open', opened: '02:14:08', assignee: 'Alice K.', rules: 12 },
  { id: 'INC-4420', title: 'notification svc · p99 > 320ms baseline', sev: 'high', status: 'ack', opened: '01:52:09', assignee: 'Bob R.', rules: 4 },
  { id: 'INC-4419', title: 'mailer-batch dispatch backlog (eu-west-1)', sev: 'high', status: 'ack', opened: '01:38:44', assignee: 'Carol S.', rules: 6 },
  { id: 'INC-4418', title: 'audit-log-store disk usage 84%', sev: 'medium', status: 'open', opened: '01:21:12', assignee: 'Dave P.', rules: 2 },
  { id: 'INC-4417', title: 'session-cache miss rate spike on /api/me', sev: 'medium', status: 'ack', opened: '00:55:30', assignee: 'Erin V.', rules: 3 },
  { id: 'INC-4416', title: 'metrics-ingest receiver lag · queue depth 14k', sev: 'high', status: 'resolved', opened: 'Yesterday', assignee: 'Frank L.', rules: 8 },
  { id: 'INC-4415', title: 'auth-gateway TLS cert rotation reminder', sev: 'low', status: 'open', opened: 'Yesterday', assignee: 'Gina W.', rules: 1 },
  { id: 'INC-4414', title: 'asset-cdn-edge geo-routing config drift', sev: 'low', status: 'resolved', opened: 'Yesterday', assignee: 'Henry T.', rules: 1 },
  { id: 'INC-4413', title: 'billing-core webhook signature mismatch (test)', sev: 'medium', status: 'resolved', opened: '2d ago', assignee: 'Iris N.', rules: 5 },
  { id: 'INC-4412', title: 'search-index reindex job stalled at 78%', sev: 'medium', status: 'resolved', opened: '2d ago', assignee: 'Jack M.', rules: 3 },
  { id: 'INC-4411', title: 'user-graph traversal · slow query > 1.4s', sev: 'high', status: 'resolved', opened: '3d ago', assignee: 'Kim H.', rules: 7 },
  { id: 'INC-4410', title: 'report-gen job missed scheduled window', sev: 'low', status: 'resolved', opened: '3d ago', assignee: 'Leo F.', rules: 1 },
];

const FILTER_CHIPS = [
  'severity: critical, high',
  'status: open, ack',
  'region: us-east-1',
  'opened: last 24h',
];

export default function SaasIncidentListPreview() {
  return (
    <PreviewFrame bg="#0f172a" padded={false}>
      <style>
        {`@keyframes sv-mp { 0%{box-shadow:0 0 0 0 rgba(239,68,68,.5);} 70%{box-shadow:0 0 0 5px rgba(239,68,68,0);} 100%{box-shadow:0 0 0 0 rgba(239,68,68,0);} }`}
      </style>
      <div style={{ fontFamily: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif", color: '#e2e8f0', minHeight: 900 }}>
        {/* topbar */}
        <div style={{ height: 56, background: '#0f172a', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', padding: '0 32px', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22d3ee' }} />
              <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '0.1em' }}>ICEOPS</span>
            </div>
            <span style={{ color: '#334155' }}>/</span>
            <nav style={{ display: 'flex', gap: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8' }}>
              <span>Monitoring</span>
              <span style={{ color: '#334155' }}>›</span>
              <span style={{ color: '#e2e8f0' }}>Incidents</span>
            </nav>
          </div>
          <div style={{ flex: 1, maxWidth: 480, height: 32, padding: '0 12px', background: '#0b1220', border: '1px solid #1e293b', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 12, color: '#64748b', fontSize: 12 }}>
            <span>⌕</span>
            <span style={{ flex: 1 }}>Search incidents…</span>
            <kbd style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, padding: '2px 6px', background: '#1e293b', color: '#94a3b8', borderRadius: 3 }}>⌘K</kbd>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fb7185' }}>3 critical · 5 ack</span>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1e293b', boxShadow: '0 0 0 1px rgba(34,211,238,0.4)' }} />
          </div>
        </div>

        <div style={{ padding: '40px 32px' }}>
          {/* page header */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.18em', color: '#64748b', textTransform: 'uppercase', marginBottom: 6 }}>
                Incidents · all environments
              </div>
              <h1 style={{ fontSize: 28, fontWeight: 600, margin: 0 }}>
                47 active <span style={{ color: '#64748b', fontWeight: 400 }}>· 12 today</span>
              </h1>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Export CSV', 'Create rule'].map((l) => (
                <button
                  key={l}
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
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* filter chips */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              padding: '12px 0',
              borderTop: '1px solid #1e293b',
              borderBottom: '1px solid #1e293b',
              marginBottom: 24,
            }}
          >
            {FILTER_CHIPS.map((c) => (
              <span
                key={c}
                style={{
                  background: '#0f172a',
                  border: '1px solid #334155',
                  color: '#cbd5e1',
                  padding: '4px 10px',
                  borderRadius: 4,
                  fontSize: 12,
                  fontFamily: "'IBM Plex Mono', monospace",
                  letterSpacing: '0.04em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span>{c}</span>
                <span style={{ color: '#64748b', cursor: 'pointer' }}>×</span>
              </span>
            ))}
            <span
              style={{
                color: '#22d3ee',
                fontSize: 12,
                fontFamily: "'IBM Plex Mono', monospace",
                padding: '4px 10px',
                cursor: 'pointer',
                letterSpacing: '0.04em',
              }}
            >
              + Add filter
            </span>
          </div>

          {/* table */}
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 4, overflow: 'hidden' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '36px 100px 2fr 90px 130px 1fr 70px',
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
              <div style={{ padding: '0 12px' }}>ID</div>
              <div style={{ padding: '0 12px' }}>Incident</div>
              <div style={{ padding: '0 12px' }}>Severity</div>
              <div style={{ padding: '0 12px' }}>Opened</div>
              <div style={{ padding: '0 12px' }}>Assignee</div>
              <div style={{ padding: '0 12px', textAlign: 'right' }}>Rules</div>
            </div>
            {ROWS.map((r, i) => (
              <div
                key={r.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '36px 100px 2fr 90px 130px 1fr 70px',
                  background: i % 2 === 1 ? 'rgba(15,23,42,0.6)' : 'transparent',
                  height: 40,
                  alignItems: 'center',
                  fontSize: 13,
                  borderBottom: i === ROWS.length - 1 ? 'none' : '1px solid rgba(30,41,59,0.4)',
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
                      animation: r.status === 'open' ? 'sv-mp 2s ease-out infinite' : undefined,
                    }}
                  />
                </div>
                <div style={{ padding: '0 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: '#cbd5e1' }}>{r.id}</div>
                <div style={{ padding: '0 12px', color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.title}</div>
                <div style={{ padding: '0 12px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      border: `1px solid ${SEV_COLOR[r.sev]}`,
                      color: SEV_COLOR[r.sev],
                      borderRadius: 2,
                      fontSize: 10,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    {r.sev}
                  </span>
                </div>
                <div style={{ padding: '0 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: '#94a3b8' }}>{r.opened}</div>
                <div style={{ padding: '0 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: '#1e293b',
                      border: '1px solid #334155',
                      fontSize: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#94a3b8',
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    {r.assignee.charAt(0)}
                  </span>
                  <span style={{ fontSize: 12, color: '#cbd5e1' }}>{r.assignee}</span>
                </div>
                <div style={{ padding: '0 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, textAlign: 'right', color: '#cbd5e1' }}>
                  {r.rules}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', color: '#475569', fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.08em' }}>
            <span>showing 12 of 47</span>
            <span>‹ prev · next ›</span>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
