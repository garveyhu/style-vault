import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";

function Tab({
  label,
  active,
  size,
  onDark,
  onClick,
}: {
  label: string;
  active: boolean;
  size: 'sm' | 'lg';
  onDark?: boolean;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  const fs = size === 'lg' ? 16 : 13;
  const pb = size === 'lg' ? 14 : 10;

  let color: string;
  if (onDark) {
    color = active ? '#fff' : hov ? '#cbd5e1' : '#64748b';
  } else {
    color = active ? '#0f172a' : hov ? '#334155' : '#94a3b8';
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        paddingBottom: pb,
        fontFamily: SANS,
        fontSize: fs,
        fontWeight: 500,
        color,
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
        transition: 'color 200ms ease',
      }}
    >
      {label}
      <span
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 2,
          borderRadius: 2,
          background: 'linear-gradient(90deg, #0891b2, #0f172a)',
          transform: active ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left center',
          transition: 'transform 320ms cubic-bezier(0.2, 0.7, 0.2, 1)',
        }}
      />
    </button>
  );
}

export default function EditorialUnderlineTabPreview() {
  const [smActive, setSmActive] = useState('Web');
  const [lgActive, setLgActive] = useState('风格');
  const [darkActive, setDarkActive] = useState('Settings');
  const SM = ['Web', 'iOS', 'Android'];
  const LG = ['风格', '页面', '模块', '组件', '原语'];

  return (
    <PreviewFrame bg="#fafafa" padded={false}>
      <div style={{ padding: '64px 56px', fontFamily: SANS, color: '#0f172a' }}>
        <Header />

        <Section label="Small (13px) · TopBar 平台切换">
          <div
            style={{
              padding: '20px 32px',
              background: '#fff',
              border: '1px solid #f1f5f9',
              borderRadius: 12,
              display: 'flex',
              gap: 28,
            }}
          >
            {SM.map((p) => (
              <Tab
                key={p}
                label={p}
                size="sm"
                active={smActive === p}
                onClick={() => setSmActive(p)}
              />
            ))}
          </div>
        </Section>

        <Section label="Large (16px) · CategoryTabs">
          <div
            style={{
              padding: '20px 32px 6px',
              background: 'rgba(250,250,250,0.9)',
              backdropFilter: 'blur(8px)',
              border: '1px solid #f1f5f9',
              borderRadius: 12,
              display: 'flex',
              gap: 32,
            }}
          >
            {LG.map((p) => (
              <Tab
                key={p}
                label={p}
                size="lg"
                active={lgActive === p}
                onClick={() => setLgActive(p)}
              />
            ))}
          </div>
        </Section>

        <Section label="On dark panel · 反相版">
          <div
            style={{
              padding: '20px 32px',
              background: '#0f172a',
              borderRadius: 12,
              display: 'flex',
              gap: 28,
            }}
          >
            {['Settings', 'Members', 'Logs'].map((p) => (
              <Tab
                key={p}
                label={p}
                size="sm"
                active={darkActive === p}
                onDark
                onClick={() => setDarkActive(p)}
              />
            ))}
          </div>
        </Section>

        <div
          style={{
            marginTop: 32,
            fontSize: 12,
            color: '#94a3b8',
            fontFamily: 'ui-monospace, monospace',
          }}
        >
          underline · linear-gradient(90deg, #0891b2, #0f172a) · 320ms ·
          left-origin
        </div>
      </div>
    </PreviewFrame>
  );
}

function Header() {
  return (
    <>
      <div
        style={{
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#94a3b8',
          marginBottom: 12,
        }}
      >
        components / toggles / style-vault
      </div>
      <div
        style={{
          fontSize: 36,
          fontWeight: 600,
          letterSpacing: '-0.025em',
          marginBottom: 32,
        }}
      >
        Editorial Underline Tab
      </div>
    </>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#94a3b8',
          marginBottom: 14,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}
