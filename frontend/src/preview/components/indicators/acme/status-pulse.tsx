import { PreviewFrame } from '../../../_layout';

const STATES = [
  { status: 'healthy' as const, color: '#10b981', label: 'All systems operational' },
  { status: 'degraded' as const, color: '#f59e0b', label: 'Elevated latency · us-east-1' },
  { status: 'critical' as const, color: '#ef4444', label: 'Outage · billing-core' },
  { status: 'idle' as const, color: '#64748b', label: 'No data · last 5min' },
];

function Dot({
  status,
  color,
  size = 8,
}: {
  status: string;
  color: string;
  size?: number;
}) {
  return (
    <span
      className={status === 'healthy' ? 'sv-status-pulse-healthy' : ''}
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
      }}
    />
  );
}

export default function StatusPulsePreview() {
  return (
    <PreviewFrame bg="#0f172a" padded={false}>
      <style>
        {`
          @keyframes sv-status-pulse-glow {
            0%   { box-shadow: 0 0 0 0   rgba(16,185,129,0.55); }
            70%  { box-shadow: 0 0 0 6px rgba(16,185,129,0);    }
            100% { box-shadow: 0 0 0 0   rgba(16,185,129,0);    }
          }
          .sv-status-pulse-healthy {
            animation: sv-status-pulse-glow 2s ease-out infinite;
          }
        `}
      </style>
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
          components / indicators / acme
        </div>
        <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>
          Status Pulse
        </div>
        <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 40 }}>
          四态状态点 · healthy 独享呼吸光晕 · 其余静态
        </div>

        {/* states grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {STATES.map((s) => (
            <div
              key={s.status}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '14px 20px',
                background: '#0b1220',
                border: '1px solid #1e293b',
                borderRadius: 4,
              }}
            >
              <div style={{ width: 96, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Dot status={s.status} color={s.color} />
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 11,
                    color: '#94a3b8',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {s.status}
                </span>
              </div>
              <div style={{ fontSize: 13, color: '#cbd5e1' }}>{s.label}</div>
              <div
                style={{
                  marginLeft: 'auto',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 10,
                  color: '#475569',
                }}
              >
                {s.status === 'healthy' ? 'pulse · 2s loop' : 'static'}
              </div>
            </div>
          ))}
        </div>

        {/* sizes */}
        <div style={{ marginTop: 36 }}>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              color: '#64748b',
              letterSpacing: '0.1em',
              marginBottom: 12,
            }}
          >
            SIZES · 6 (compact) / 8 (default)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Dot status="healthy" color="#10b981" size={6} />
              <span style={{ fontSize: 12, color: '#94a3b8' }}>6px</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Dot status="healthy" color="#10b981" size={8} />
              <span style={{ fontSize: 12, color: '#94a3b8' }}>8px</span>
            </span>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
