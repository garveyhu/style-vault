import { PreviewFrame } from '../../../_layout';

export default function SaasColdTopbarPreview() {
  return (
    <PreviewFrame bg="#0f172a" padded={false}>
      <style>
        {`
          @keyframes sv-status-pulse-glow {
            0%   { box-shadow: 0 0 0 0   rgba(16,185,129,0.55); }
            70%  { box-shadow: 0 0 0 6px rgba(16,185,129,0);    }
            100% { box-shadow: 0 0 0 0   rgba(16,185,129,0);    }
          }
        `}
      </style>
      <div
        style={{
          fontFamily:
            "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {/* Topbar */}
        <header
          style={{
            height: 56,
            background: '#0f172a',
            borderBottom: '1px solid #1e293b',
            display: 'flex',
            alignItems: 'center',
            padding: '0 24px',
            gap: 24,
          }}
        >
          {/* brand + breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#22d3ee',
                }}
              />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  color: '#f1f5f9',
                }}
              >
                ICEOPS
              </span>
            </div>
            <span style={{ color: '#334155' }}>/</span>
            <nav
              style={{
                display: 'flex',
                alignItems: 'center',
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

          {/* command palette trigger */}
          <button
            style={{
              flex: 1,
              maxWidth: 560,
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
              cursor: 'pointer',
              transition: 'border-color 150ms ease-out',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#334155';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1e293b';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span style={{ flex: 1, textAlign: 'left' }}>
              Search incidents, services, runbooks…
            </span>
            <kbd
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10,
                letterSpacing: '0.1em',
                padding: '2px 6px',
                background: '#1e293b',
                color: '#94a3b8',
                borderRadius: 3,
              }}
            >
              ⌘K
            </kbd>
          </button>

          {/* right side */}
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#10b981',
                  animation: 'sv-status-pulse-glow 2s ease-out infinite',
                }}
              />
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#94a3b8',
                }}
              >
                All systems operational
              </span>
            </span>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#1e293b',
                boxShadow: '0 0 0 1px rgba(34,211,238,0.4)',
              }}
            />
          </div>
        </header>

        {/* spacer to show it sits on dark bg */}
        <div
          style={{
            background: '#0f172a',
            padding: '32px 24px',
            color: '#475569',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          ↑ topbar 56px · sticky · z-40
        </div>
      </div>
    </PreviewFrame>
  );
}
