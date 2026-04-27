import { PreviewFrame } from '../../../_layout';
import { useState } from 'react';

function MonoField({
  prefix,
  suffix,
  defaultValue,
  size = 'md',
  placeholder,
  focused,
}: {
  prefix?: string;
  suffix?: string;
  defaultValue?: string;
  size?: 'sm' | 'md';
  placeholder?: string;
  focused?: boolean;
}) {
  const [val, setVal] = useState(defaultValue ?? '');
  const h = size === 'sm' ? 32 : 36;
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: h,
        padding: '0 12px',
        background: '#0b1220',
        border: focused ? '1px solid #22d3ee' : '1px solid #334155',
        borderRadius: 4,
        fontFamily: "'IBM Plex Mono', 'SF Mono', monospace",
        color: '#e2e8f0',
        boxShadow: focused ? '0 0 0 1px #22d3ee' : 'none',
        transition: 'border-color 150ms cubic-bezier(0,0,0.2,1)',
        minWidth: 200,
      }}
    >
      {prefix && (
        <span
          style={{
            fontSize: 11,
            color: '#64748b',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginRight: 8,
          }}
        >
          {prefix}
        </span>
      )}
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: '#e2e8f0',
          fontFamily: 'inherit',
          fontSize: 14,
          textAlign: 'right',
        }}
      />
      {suffix && (
        <span
          style={{
            fontSize: 11,
            color: '#64748b',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginLeft: 8,
          }}
        >
          {suffix}
        </span>
      )}
    </div>
  );
}

export default function MonoInputPreview() {
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
          components / inputs / acme
        </div>
        <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>
          Mono Input
        </div>
        <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 40 }}>
          数字 / 阈值类 · 等宽右对齐 · cyan focus ring
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Section label="DEFAULT">
            <MonoField defaultValue="42" suffix="ms" />
            <MonoField defaultValue="1284" suffix="req/s" />
            <MonoField defaultValue="99.982" suffix="%" />
          </Section>

          <Section label="FOCUSED">
            <MonoField defaultValue="8080" suffix="port" focused />
          </Section>

          <Section label="WITH PREFIX / PLACEHOLDER">
            <MonoField prefix="$" placeholder="0.00" />
            <MonoField prefix="ip" defaultValue="10.0.4.21" />
          </Section>

          <Section label="SIZES">
            <MonoField defaultValue="180" suffix="MB" size="sm" />
            <MonoField defaultValue="180" suffix="MB" size="md" />
          </Section>
        </div>
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
    <div>
      <div
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          color: '#64748b',
          letterSpacing: '0.1em',
          marginBottom: 12,
        }}
      >
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        {children}
      </div>
    </div>
  );
}
