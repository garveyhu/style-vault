import { PreviewFrame } from '../../../_layout';

export default function AuthColdSplitPreview() {
  return (
    <PreviewFrame bg="#fff" padded={false}>
      <div
        style={{
          height: 720,
          display: 'grid',
          gridTemplateColumns: '60% 40%',
          fontFamily:
            "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {/* Left brand panel */}
        <aside
          style={{
            background: '#0f172a',
            color: '#f1f5f9',
            padding: '56px 64px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#22d3ee',
              }}
            />
            <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '0.1em' }}>
              ICEOPS
            </span>
          </div>

          <div style={{ marginTop: 'auto', marginBottom: 'auto', maxWidth: 540 }}>
            <h1
              style={{
                fontSize: 40,
                fontWeight: 500,
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
                margin: 0,
              }}
            >
              Observability without<br />the noise.
            </h1>
            <p
              style={{
                marginTop: 22,
                color: '#94a3b8',
                fontSize: 15,
                lineHeight: 1.6,
                maxWidth: 460,
              }}
            >
              冷感留白、无阴影、单一 cyan 高亮色——把注意力还给数据本身。
            </p>
            <div
              style={{
                marginTop: 28,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#475569',
              }}
            >
              <span style={{ color: '#22d3ee' }}>●</span>
              <span>3 services degraded · global p99 142ms</span>
            </div>
          </div>

          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#64748b',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>v1.4 · cold-industrial-saas</span>
            <span>region · us-east-1</span>
          </div>
        </aside>

        {/* Right form panel */}
        <main
          style={{
            background: '#fff',
            padding: '56px 48px',
            display: 'flex',
            flexDirection: 'column',
            color: '#0f172a',
          }}
        >
          <h2 style={{ fontSize: 26, fontWeight: 600, margin: 0 }}>Sign in</h2>
          <p style={{ marginTop: 4, color: '#64748b', fontSize: 13 }}>
            Use your work email or company SSO.
          </p>

          <form style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <FormField label="Email">
              <input
                type="email"
                placeholder="alice@company.com"
                defaultValue=""
                style={inputStyle}
              />
            </FormField>
            <FormField label="Password">
              <input
                type="password"
                placeholder="••••••••"
                style={inputStyle}
              />
            </FormField>

            <button
              type="button"
              style={{
                marginTop: 8,
                height: 42,
                background: '#22d3ee',
                color: '#0f172a',
                fontWeight: 500,
                fontSize: 15,
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'background-color 150ms ease-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#67e8f9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#22d3ee';
              }}
            >
              Continue
            </button>

            <div
              style={{
                textAlign: 'center',
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#94a3b8',
              }}
            >
              — or —
            </div>

            <button
              type="button"
              style={{
                height: 42,
                background: 'transparent',
                color: '#334155',
                border: '1px solid #cbd5e1',
                borderRadius: 4,
                fontSize: 14,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 150ms ease-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#94a3b8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#cbd5e1';
              }}
            >
              Use SSO
            </button>
          </form>

          <footer
            style={{
              marginTop: 'auto',
              paddingTop: 32,
              fontSize: 11,
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#94a3b8',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>© 2026 Iceops</span>
            <span style={{ display: 'inline-flex', gap: 16 }}>
              <a style={{ cursor: 'pointer' }}>Privacy</a>
              <a style={{ cursor: 'pointer' }}>Terms</a>
            </span>
          </footer>
        </main>
      </div>
    </PreviewFrame>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: 40,
  padding: '0 12px',
  fontSize: 14,
  fontFamily: 'inherit',
  border: '1px solid #cbd5e1',
  borderRadius: 4,
  outline: 'none',
  color: '#0f172a',
  background: '#fff',
  transition: 'border-color 150ms ease-out',
};

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: 'block' }}>
      <span
        style={{
          display: 'block',
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#64748b',
          marginBottom: 6,
        }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}
