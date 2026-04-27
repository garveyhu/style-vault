import { useEffect } from 'react';
import { PreviewFrame } from '../../_layout';

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap';

// slate-cyan-ice tokens（dark）
const SANS = "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif";
const MONO = "'IBM Plex Mono', 'SF Mono', Menlo, monospace";
const BG = '#0f172a';
const PANEL = '#0b1220';
const BORDER = '#1e293b';
const BORDER_STRONG = '#334155';
const FG = '#e2e8f0';
const MUTED = '#94a3b8';
const SUBTLE = '#64748b';
const ACCENT = '#22d3ee';

type Row = { id: string; name: string; status: string; latency: string; owner: string };

const ROWS: Row[] = [
  { id: 'SVC-001', name: 'auth-gateway', status: 'healthy', latency: '12ms', owner: 'Alice' },
  { id: 'SVC-002', name: 'billing-core', status: 'healthy', latency: '24ms', owner: 'Bob' },
  { id: 'SVC-003', name: 'notification', status: 'degraded', latency: '180ms', owner: 'Carol' },
  { id: 'SVC-004', name: 'search-index', status: 'healthy', latency: '8ms', owner: 'Dave' },
  { id: 'SVC-005', name: 'report-gen', status: 'idle', latency: '—', owner: 'Erin' },
];

function StatusDot({ s }: { s: string }) {
  const color = s === 'healthy' ? '#10b981' : s === 'degraded' ? '#f59e0b' : SUBTLE;
  const isHealthy = s === 'healthy';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: MONO, fontSize: 12 }}>
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: color,
          display: 'inline-block',
          animation: isHealthy ? 'sv-cis-pulse 2s ease-out infinite' : undefined,
        }}
      />
      {s}
    </span>
  );
}

export default function ColdIndustrialSaasPreview() {
  useEffect(() => {
    const id = 'plex-font-link';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = FONT_URL;
      document.head.appendChild(link);
    }
  }, []);

  return (
    <PreviewFrame bg={BG} padded={false}>
      <style>
        {`@keyframes sv-cis-pulse { 0%{box-shadow:0 0 0 0 rgba(16,185,129,.55);} 70%{box-shadow:0 0 0 5px rgba(16,185,129,0);} 100%{box-shadow:0 0 0 0 rgba(16,185,129,0);} }`}
      </style>
      <div style={{ background: BG, color: FG, fontFamily: SANS, minHeight: '100vh' }}>
        {/* status banner · neutral */}
        <div
          style={{
            height: 32,
            padding: '0 32px',
            background: BG,
            borderBottom: `1px solid ${BORDER}`,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            color: '#cbd5e1',
            fontSize: 12,
          }}
        >
          <span
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: '0.08em',
              opacity: 0.7,
            }}
          >
            01:48:22 UTC
          </span>
          <span style={{ flex: 1 }}>
            Scheduled maintenance window starts in 12 minutes · eu-west-1
          </span>
          <span style={{ opacity: 0.6, cursor: 'pointer' }}>×</span>
        </div>

        {/* 顶栏 */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 32px',
            borderBottom: `1px solid ${BORDER}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <div style={{ fontFamily: MONO, fontWeight: 500, letterSpacing: 1 }}>⌁ ICEOPS</div>
            <nav style={{ display: 'flex', gap: 20, fontSize: 13, color: MUTED }}>
              <a style={{ color: FG }}>Services</a>
              <a>Alerts</a>
              <a>Logs</a>
              <a>Docs</a>
            </nav>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              style={{
                padding: '8px 16px',
                fontSize: 13,
                fontFamily: SANS,
                background: 'transparent',
                color: FG,
                border: `1px solid ${BORDER_STRONG}`,
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              Docs
            </button>
            <button
              style={{
                padding: '8px 16px',
                fontSize: 13,
                fontWeight: 500,
                fontFamily: SANS,
                background: ACCENT,
                color: BG,
                border: 0,
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              Sign in
            </button>
          </div>
        </header>

        {/* Hero */}
        <section style={{ maxWidth: 1120, margin: '0 auto', padding: '96px 32px' }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 12,
              color: ACCENT,
              letterSpacing: 2,
              marginBottom: 16,
            }}
          >
            V1.4 · COLD INDUSTRIAL SAAS
          </div>
          <h1
            style={{
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              margin: '0 0 20px',
              maxWidth: 900,
            }}
          >
            Observability
            <br />
            without the noise.
          </h1>
          <p style={{ fontSize: 18, color: MUTED, maxWidth: 620, lineHeight: 1.6, marginBottom: 36 }}>
            冷感留白、无阴影、单一 cyan 高亮色。把注意力留给数据本身，不让 UI 喧宾夺主。
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              style={{
                padding: '14px 28px',
                fontSize: 15,
                fontWeight: 500,
                fontFamily: SANS,
                background: ACCENT,
                color: BG,
                border: 0,
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              Start tracing
            </button>
            <button
              style={{
                padding: '14px 28px',
                fontSize: 15,
                fontFamily: SANS,
                background: 'transparent',
                color: FG,
                border: `1px solid ${BORDER_STRONG}`,
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              View demo
            </button>
          </div>
        </section>

        {/* Dashboard 缩略 */}
        <section style={{ maxWidth: 1120, margin: '0 auto', padding: '48px 32px', borderTop: `1px solid ${BORDER}` }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Services</h2>
            <div style={{ fontFamily: MONO, fontSize: 12, color: SUBTLE }}>
              updated 2s ago · 5 services
            </div>
          </div>

          <div
            style={{
              background: PANEL,
              border: `1px solid ${BORDER}`,
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: 13,
                fontFamily: SANS,
              }}
            >
              <thead>
                <tr style={{ background: '#0a1020', color: MUTED, fontFamily: MONO, fontSize: 11, letterSpacing: 1 }}>
                  {['ID', 'NAME', 'STATUS', 'P95 LATENCY', 'OWNER'].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: 'left',
                        padding: '12px 16px',
                        fontWeight: 400,
                        borderBottom: `1px solid ${BORDER}`,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr
                    key={r.id}
                    style={{
                      borderBottom: i === ROWS.length - 1 ? 0 : `1px solid ${BORDER}`,
                    }}
                  >
                    <td style={{ padding: '14px 16px', fontFamily: MONO, color: MUTED }}>{r.id}</td>
                    <td style={{ padding: '14px 16px', fontFamily: MONO, color: FG }}>{r.name}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <StatusDot s={r.status} />
                    </td>
                    <td style={{ padding: '14px 16px', fontFamily: MONO, color: FG }}>{r.latency}</td>
                    <td style={{ padding: '14px 16px', color: MUTED }}>{r.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            padding: '96px 32px',
            borderTop: `1px solid ${BORDER}`,
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.015em', marginBottom: 12 }}>
            Ready to cool down your stack?
          </h2>
          <p style={{ color: MUTED, fontSize: 16, marginBottom: 32 }}>
            14-day trial. No credit card. Plex Mono timestamps included.
          </p>
          <button
            style={{
              padding: '14px 32px',
              fontSize: 15,
              fontWeight: 500,
              fontFamily: SANS,
              background: ACCENT,
              color: BG,
              border: 0,
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            Start free trial
          </button>
        </section>

        <footer
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            padding: '24px 32px',
            borderTop: `1px solid ${BORDER}`,
            color: SUBTLE,
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: 1,
          }}
        >
          © 2026 ICEOPS · slate-cyan-ice × ibm-plex-duo
        </footer>
      </div>
    </PreviewFrame>
  );
}
