import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";

function Ghost({
  hover: forceHover,
  disabled,
  fullWidth,
  children = '复制 Prompt',
}: {
  hover?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
}) {
  const [hov, setHov] = useState(false);
  const hovered = forceHover ?? hov;
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        height: 40,
        padding: '0 16px',
        background: '#fff',
        border: `1.5px solid ${
          disabled ? '#e2e8f0' : hovered ? '#0f172a' : '#cbd5e1'
        }`,
        borderRadius: 8,
        fontFamily: SANS,
        fontSize: 13,
        fontWeight: 500,
        color: disabled ? '#cbd5e1' : hovered ? '#0f172a' : '#334155',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition:
          'border-color 200ms cubic-bezier(0.2, 0.7, 0.2, 1), color 200ms cubic-bezier(0.2, 0.7, 0.2, 1)',
        width: fullWidth ? '100%' : undefined,
      }}
    >
      <span style={{ fontSize: 13 }}>⧉</span>
      {children}
    </button>
  );
}

export default function GhostBorderedCtaPreview() {
  return (
    <PreviewFrame bg="#fafafa" padded={false}>
      <div
        style={{
          padding: '64px 56px',
          fontFamily: SANS,
          color: '#0f172a',
        }}
      >
        <Header />

        <Section label="States · default / hover / disabled">
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Ghost />
            <Ghost hover />
            <Ghost disabled />
          </div>
        </Section>

        <Section label="Full width · 详情页左列 CTA">
          <div style={{ width: 320 }}>
            <Ghost fullWidth />
          </div>
        </Section>

        <Section label="Pair · 与 dark-pill 同屏对比">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '24px 24px',
              background: '#fff',
              border: '1px solid #f1f5f9',
              borderRadius: 12,
            }}
          >
            <button
              style={{
                height: 40,
                padding: '0 20px',
                background: '#0f172a',
                color: '#fff',
                border: 'none',
                borderRadius: 9999,
                fontFamily: SANS,
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              立即提交 →
            </button>
            <Ghost>取消</Ghost>
            <Ghost>编辑</Ghost>
          </div>
        </Section>
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
        components / buttons / style-vault
      </div>
      <div
        style={{
          fontSize: 36,
          fontWeight: 600,
          letterSpacing: '-0.025em',
          marginBottom: 32,
        }}
      >
        Ghost Bordered CTA
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
