import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";

function Pill({
  size,
  hover: forceHover,
  disabled,
}: {
  size: 'sm' | 'md' | 'lg';
  hover?: boolean;
  disabled?: boolean;
}) {
  const [hov, setHov] = useState(false);
  const hovered = forceHover ?? hov;
  const dim = {
    sm: { h: 36, px: 20, fs: 13 },
    md: { h: 40, px: 20, fs: 13 },
    lg: { h: 56, px: 36, fs: 15 },
  }[size];
  const shadow =
    size === 'lg' && !disabled
      ? '0 20px 48px -20px rgba(15,23,42,0.6)'
      : 'none';
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      disabled={disabled}
      style={{
        height: dim.h,
        padding: `0 ${dim.px}px`,
        fontSize: dim.fs,
        fontFamily: SANS,
        fontWeight: 500,
        color: '#fff',
        background: disabled
          ? '#cbd5e1'
          : hovered
            ? '#334155'
            : '#0f172a',
        borderRadius: 9999,
        border: 'none',
        boxShadow: shadow,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background-color 200ms cubic-bezier(0.2, 0.7, 0.2, 1)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      进入风格库
      <span
        style={{
          display: 'inline-block',
          transition: 'transform 200ms cubic-bezier(0.2, 0.7, 0.2, 1)',
          transform: hovered && !disabled ? 'translateX(4px)' : 'translateX(0)',
        }}
      >
        →
      </span>
    </button>
  );
}

export default function DarkPillCtaPreview() {
  return (
    <PreviewFrame bg="#fafafa" padded={false}>
      <div
        style={{
          padding: '64px 56px',
          fontFamily: SANS,
          color: '#0f172a',
        }}
      >
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
          Dark Pill CTA
        </div>

        {/* sizes */}
        <Section label="Sizes · sm / md / lg">
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <Pill size="sm" />
            <Pill size="md" />
            <Pill size="lg" />
          </div>
        </Section>

        {/* states */}
        <Section label="States · default / hover / disabled">
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <Pill size="md" />
            <Pill size="md" hover />
            <Pill size="md" disabled />
          </div>
        </Section>

        {/* in context */}
        <Section label="In context · Hero">
          <div
            style={{
              padding: '40px 32px',
              background: '#fff',
              border: '1px solid #f1f5f9',
              borderRadius: 16,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 600,
                letterSpacing: '-0.025em',
                marginBottom: 24,
              }}
            >
              为 AI 编码而造的设计风格库
            </div>
            <Pill size="lg" />
          </div>
        </Section>
      </div>
    </PreviewFrame>
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
