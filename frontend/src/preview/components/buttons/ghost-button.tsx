import type { CSSProperties, ReactNode } from 'react';
import { PreviewFrame } from '../../_layout';

type State = 'default' | 'hover' | 'active' | 'disabled' | 'loading';

const BASE: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '10px 20px',
  fontSize: 14,
  fontWeight: 500,
  fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
  borderRadius: 4,
  border: '1px solid #475569',
  background: 'transparent',
  color: '#e2e8f0',
  transition: 'background-color 150ms ease-out, border-color 150ms ease-out',
  cursor: 'pointer',
};

function stateStyle(s: State): CSSProperties {
  switch (s) {
    case 'hover':
      return { ...BASE, background: '#1e293b', borderColor: '#94a3b8' };
    case 'active':
      return { ...BASE, background: '#0f172a', borderColor: '#94a3b8' };
    case 'disabled':
      return { ...BASE, opacity: 0.4, cursor: 'not-allowed' };
    case 'loading':
      return { ...BASE, opacity: 0.75, cursor: 'progress' };
    default:
      return BASE;
  }
}

function Spinner() {
  return (
    <span
      style={{
        display: 'inline-block',
        width: 12,
        height: 12,
        borderRadius: '50%',
        border: '2px solid #22d3ee',
        borderTopColor: 'transparent',
        animation: 'ghost-btn-spin 0.8s linear infinite',
      }}
    />
  );
}

function Demo({ state, children }: { state: State; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <button
        type="button"
        disabled={state === 'disabled'}
        style={stateStyle(state)}
        onClick={(e) => e.preventDefault()}
      >
        {state === 'loading' ? <Spinner /> : null}
        {children}
      </button>
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          letterSpacing: 1,
          color: '#64748b',
          textTransform: 'uppercase',
        }}
      >
        {state}
      </span>
    </div>
  );
}

export default function GhostButtonPreview() {
  return (
    <PreviewFrame bg="#020617" padded={false}>
      <style>{`@keyframes ghost-btn-spin { to { transform: rotate(360deg); } }`}</style>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 40,
          padding: '64px 48px',
          color: '#e2e8f0',
          fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
          background: '#020617',
        }}
      >
        <header style={{ textAlign: 'center' }}>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              color: '#64748b',
              letterSpacing: 2,
            }}
          >
            ATOM · BUTTONS
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 600, margin: '8px 0 0' }}>Ghost Button</h1>
        </header>

        <div
          style={{
            display: 'flex',
            gap: 40,
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Demo state="default">Inspect</Demo>
          <Demo state="hover">Inspect</Demo>
          <Demo state="active">Inspect</Demo>
          <Demo state="disabled">Inspect</Demo>
          <Demo state="loading">Loading…</Demo>
        </div>

        <p style={{ fontSize: 13, color: '#64748b', maxWidth: 480, textAlign: 'center' }}>
          幽灵按钮承载次要/取消/探索型操作，颜色从 slate-cyan-ice 取值，
          150ms 冷感过渡，不做阴影与大圆角。
        </p>
      </div>
    </PreviewFrame>
  );
}
