import { PreviewFrame } from '../../../_layout';

const sizeStyle = {
  sm: { padding: '6px 12px', fontSize: 12 },
  md: { padding: '8px 16px', fontSize: 14 },
  lg: { padding: '10px 24px', fontSize: 16 },
} as const;

function Button({
  size,
  variant = 'cyan',
  disabled,
  children,
}: {
  size: 'sm' | 'md' | 'lg';
  variant?: 'cyan' | 'ghost';
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const isCyan = variant === 'cyan';
  return (
    <button
      disabled={disabled}
      style={{
        ...sizeStyle[size],
        fontFamily:
          "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        fontWeight: 500,
        borderRadius: 4,
        border: isCyan ? 'none' : '1px solid #475569',
        background: disabled
          ? '#334155'
          : isCyan
            ? '#22d3ee'
            : 'transparent',
        color: disabled
          ? '#64748b'
          : isCyan
            ? '#0f172a'
            : '#e2e8f0',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background-color 150ms cubic-bezier(0,0,0.2,1)',
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        if (isCyan) e.currentTarget.style.background = '#67e8f9';
        else e.currentTarget.style.background = '#1e293b';
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        if (isCyan) e.currentTarget.style.background = '#22d3ee';
        else e.currentTarget.style.background = 'transparent';
      }}
    >
      {children}
    </button>
  );
}

export default function CyanCtaPreview() {
  return (
    <PreviewFrame bg="#0f172a" padded={false}>
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
          components / buttons / acme
        </div>
        <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>
          Cyan CTA
        </div>
        <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 40 }}>
          主 CTA · cyan 填充 · 与 ghost-button 配对成 primary / secondary
        </div>

        {/* sizes */}
        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              color: '#64748b',
              letterSpacing: '0.1em',
              marginBottom: 14,
            }}
          >
            SIZES
          </div>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}
          >
            <Button size="sm">Continue</Button>
            <Button size="md">Continue</Button>
            <Button size="lg">Continue</Button>
          </div>
        </div>

        {/* states */}
        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              color: '#64748b',
              letterSpacing: '0.1em',
              marginBottom: 14,
            }}
          >
            STATES
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Button size="md">Default</Button>
            <Button size="md" disabled>
              Disabled
            </Button>
          </div>
        </div>

        {/* paired with ghost */}
        <div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              color: '#64748b',
              letterSpacing: '0.1em',
              marginBottom: 14,
            }}
          >
            PAIRED · primary + secondary
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Button size="md">Start tracing</Button>
            <Button size="md" variant="ghost">
              View demo
            </Button>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
