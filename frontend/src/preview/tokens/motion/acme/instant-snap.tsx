import { PreviewFrame } from '../../../_layout';
import { useState } from 'react';

const DURATIONS = [
  { label: 'fast', ms: 100 },
  { label: 'base', ms: 150 },
  { label: 'slow', ms: 200 },
];

export default function InstantSnapPreview() {
  const [tick, setTick] = useState(0);

  return (
    <PreviewFrame bg="#0f172a" padded={false}>
      <div
        style={{
          fontFamily:
            "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
          color: '#e2e8f0',
          padding: '48px 56px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 32,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: '0.18em',
                color: '#64748b',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              tokens / motion / acme
            </div>
            <div style={{ fontSize: 22, fontWeight: 600 }}>Instant Snap</div>
            <div
              style={{
                fontSize: 13,
                color: '#94a3b8',
                marginTop: 4,
              }}
            >
              零浪漫 · ease-out only · 无 bounce / scale
            </div>
          </div>
          <button
            onClick={() => setTick((t) => t + 1)}
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
              background: 'transparent',
              color: '#22d3ee',
              border: '1px solid #1e293b',
              borderRadius: 4,
              padding: '6px 14px',
              cursor: 'pointer',
              transition: 'all 150ms cubic-bezier(0,0,0.2,1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#22d3ee';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1e293b';
            }}
          >
            replay ↻
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {DURATIONS.map((d) => (
            <div
              key={d.label}
              style={{
                background: '#0b1220',
                border: '1px solid #1e293b',
                padding: '24px 20px',
                borderRadius: 4,
              }}
            >
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  color: '#64748b',
                  letterSpacing: '0.1em',
                  marginBottom: 14,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>{d.label.toUpperCase()}</span>
                <span style={{ color: '#94a3b8' }}>{d.ms}ms</span>
              </div>
              <div
                style={{
                  position: 'relative',
                  height: 32,
                  background: '#0f172a',
                  border: '1px solid #1e293b',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <div
                  key={tick}
                  style={{
                    width: 8,
                    height: 30,
                    background: '#22d3ee',
                    borderRadius: 1,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    animation: `instant-snap-${d.label} ${d.ms}ms cubic-bezier(0,0,0.2,1) forwards`,
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 10,
                  color: '#475569',
                  marginTop: 12,
                  letterSpacing: '0.05em',
                }}
              >
                ease-out · transform-x · no scale
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 36,
            paddingTop: 24,
            borderTop: '1px solid #1e293b',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
            fontSize: 11,
            fontFamily: "'IBM Plex Mono', monospace",
            color: '#64748b',
            letterSpacing: '0.05em',
          }}
        >
          <div>
            <div style={{ color: '#94a3b8' }}>OPACITY</div>
            <div style={{ marginTop: 4 }}>✓ allowed</div>
          </div>
          <div>
            <div style={{ color: '#94a3b8' }}>TRANSLATE-Y</div>
            <div style={{ marginTop: 4 }}>≤ 2px allowed</div>
          </div>
          <div>
            <div style={{ color: '#94a3b8' }}>SCALE</div>
            <div style={{ marginTop: 4, color: '#ef4444' }}>✗ forbidden</div>
          </div>
          <div>
            <div style={{ color: '#94a3b8' }}>BOUNCE</div>
            <div style={{ marginTop: 4, color: '#ef4444' }}>✗ forbidden</div>
          </div>
        </div>

        <style>
          {`
            @keyframes instant-snap-fast { from { transform: translateX(0); } to { transform: translateX(calc(100% - 8px)); } }
            @keyframes instant-snap-base { from { transform: translateX(0); } to { transform: translateX(calc(100% - 8px)); } }
            @keyframes instant-snap-slow { from { transform: translateX(0); } to { transform: translateX(calc(100% - 8px)); } }
          `}
        </style>
      </div>
    </PreviewFrame>
  );
}
