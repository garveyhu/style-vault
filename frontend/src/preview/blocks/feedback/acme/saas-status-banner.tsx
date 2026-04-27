import { PreviewFrame } from '../../../_layout';

const STATES = [
  {
    severity: 'neutral' as const,
    bg: '#0f172a',
    border: '#1e293b',
    color: '#cbd5e1',
    timestamp: '01:48:22 UTC',
    message: 'Scheduled maintenance window starts in 12 minutes · eu-west-1',
  },
  {
    severity: 'warning' as const,
    bg: 'rgba(69,26,3,0.6)',
    border: 'rgba(180,83,9,0.5)',
    color: '#fcd34d',
    timestamp: '01:52:09 UTC',
    message: 'Elevated p99 latency on notification service · 320ms (baseline 80ms)',
  },
  {
    severity: 'critical' as const,
    bg: 'rgba(76,5,25,0.7)',
    border: 'rgba(190,18,60,0.6)',
    color: '#fda4af',
    timestamp: '02:14:08 UTC',
    message: 'Outage · payment-webhook unreachable for 4m 12s — incident #4421 opened',
    pulse: true,
  },
];

export default function SaasStatusBannerPreview() {
  return (
    <PreviewFrame bg="#0f172a" padded={false}>
      <style>
        {`
          @keyframes sv-status-pulse-critical {
            0%   { box-shadow: 0 0 0 0   rgba(239,68,68,0.55); }
            70%  { box-shadow: 0 0 0 5px rgba(239,68,68,0);    }
            100% { box-shadow: 0 0 0 0   rgba(239,68,68,0);    }
          }
        `}
      </style>
      <div
        style={{
          padding: '48px 0 64px',
          color: '#e2e8f0',
          fontFamily:
            "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div style={{ padding: '0 56px 24px' }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.18em',
              color: '#64748b',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            blocks / feedback / acme
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>
            SaaS Status Banner
          </div>
          <div style={{ fontSize: 13, color: '#94a3b8' }}>
            32px 全宽 · 三态色阶 · critical 才出 pulse
          </div>
        </div>

        {STATES.map((s, i) => (
          <div key={s.severity} style={{ marginTop: i === 0 ? 8 : 32 }}>
            <div
              style={{
                fontSize: 11,
                fontFamily: "'IBM Plex Mono', monospace",
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#64748b',
                padding: '0 56px',
                marginBottom: 6,
              }}
            >
              {s.severity}
            </div>
            <div
              style={{
                height: 32,
                padding: '0 24px',
                background: s.bg,
                borderTop: `1px solid ${s.border}`,
                borderBottom: `1px solid ${s.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                color: s.color,
                fontSize: 12,
              }}
            >
              {s.pulse && (
                <span
                  style={{
                    display: 'inline-block',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#ef4444',
                    animation: 'sv-status-pulse-critical 2s ease-out infinite',
                  }}
                />
              )}
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  opacity: 0.7,
                }}
              >
                {s.timestamp}
              </span>
              <span style={{ flex: 1 }}>{s.message}</span>
              <span style={{ opacity: 0.6, cursor: 'pointer', fontSize: 14 }}>×</span>
            </div>
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}
