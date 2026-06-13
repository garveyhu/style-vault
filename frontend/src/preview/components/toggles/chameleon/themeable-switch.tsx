import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

export default function ThemeableSwitch() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · TOGGLE</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 32px' }}>Themeable Switch</h1>

        <Row label="ON · checked primary-600">
          <Switch defaultOn />
        </Row>
        <Row label="OFF · unchecked stone-300">
          <Switch />
        </Row>
        <Row label="focus-visible · ring-2 ring-primary-400">
          <Switch defaultOn focused />
        </Row>
        <Row label="disabled (on)">
          <Switch defaultOn disabled />
        </Row>

        <div style={{ fontSize: 12, color: '#a8a29e', marginTop: 24 }}>
          h-5 w-9 (20×36) · thumb h-4 w-4 + shadow-soft · translate-x-4 切换 · checked primary-600(#2563eb) 随主题 / unchecked stone-300 · focus-visible:ring-2 ring-primary-400(#60a5fa)
        </div>
      </div>
    </PreviewFrame>
  );
}

function Switch({ defaultOn, disabled, focused }: { defaultOn?: boolean; disabled?: boolean; focused?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <span
      role="switch"
      aria-checked={on}
      onClick={() => !disabled && setOn(v => !v)}
      style={{
        display: 'inline-flex', alignItems: 'center', width: 36, height: 20, borderRadius: 9999,
        border: '2px solid transparent', boxSizing: 'border-box',
        background: on ? '#2563eb' : '#d6d3d1', opacity: disabled ? 0.5 : 1,
        boxShadow: focused ? '0 0 0 2px #60a5fa' : undefined,
        cursor: disabled ? 'not-allowed' : 'pointer', transition: 'background 200ms',
      }}
    >
      <span style={{
        width: 16, height: 16, borderRadius: '50%', background: '#fff',
        boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)',
        transform: on ? 'translateX(16px)' : 'translateX(0)', transition: 'transform 200ms',
      }} />
    </span>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f5f4ee' }}>
      <span style={{ fontSize: 13, color: '#44403c' }}>{label}</span>
      {children}
    </div>
  );
}
