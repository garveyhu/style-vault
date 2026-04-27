import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

export default function IconCircleGhostPreview() {
  return (
    <PreviewFrame bg="rgb(249,249,249)">
      <div style={{ maxWidth: 800, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>
          COMPONENT · BUTTON
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '8px 0 4px', letterSpacing: '-0.01em' }}>
          Icon Circle Ghost
        </h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>
          透明底圆形按钮 — sage header / 会话操作 / 折叠按钮的标配
        </p>

        <Section title="默认 · slate hover">
          <Ghost icon="⋮" />
          <Ghost icon="✎" />
          <Ghost icon="↗" />
          <Ghost icon="◀" />
          <Ghost icon="▶" />
        </Section>

        <Section title="主交互区 · rgb(242,242,242) hover">
          <Ghost icon="⋮" hoverBg="rgb(242,242,242)" />
          <Ghost icon="✎" hoverBg="rgb(242,242,242)" />
          <Ghost icon="✖" hoverBg="rgb(242,242,242)" />
        </Section>

        <Section title="危险态 · close admin overlay">
          <button style={{
            padding: 8, borderRadius: '50%',
            background: '#f1f5f9', color: '#64748b',
            border: 'none', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 32, height: 32,
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          }}>
            ✖
          </button>
        </Section>

        <Section title="双图标切换 · logo 切换 PanelLeftOpen (group hover)">
          <DualIcon />
        </Section>

        <Section title="group hover 显示 · opacity-0 group-hover:opacity-100">
          <SessionRow />
        </Section>
      </div>
    </PreviewFrame>
  );
}

function Ghost({ icon, hoverBg = '#f1f5f9' }: { icon: string; hoverBg?: string }) {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        width: 32, height: 32, padding: 0,
        background: h ? hoverBg : 'transparent',
        color: h ? '#475569' : '#94a3b8',
        border: 'none', cursor: 'pointer', borderRadius: '50%',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 200ms',
        fontSize: 14,
      }}
    >
      {icon}
    </button>
  );
}

function DualIcon() {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        position: 'relative', width: 36, height: 36, borderRadius: '50%',
        background: h ? '#f1f5f9' : 'transparent',
        border: 'none', cursor: 'pointer', transition: 'all 200ms',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: h ? 0 : 1, transition: 'opacity 200ms',
        fontSize: 16,
      }}>🌿</div>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: h ? 1 : 0, transition: 'opacity 200ms',
        color: '#475569', fontSize: 14,
      }}>◀</div>
    </button>
  );
}

function SessionRow() {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h ? 'rgb(231,231,231)' : 'transparent',
        padding: '6px 12px', borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: 240, transition: 'background 200ms',
        cursor: 'pointer',
      }}
    >
      <span style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>会话标题示例</span>
      <button
        style={{
          width: 24, height: 24, padding: 0,
          opacity: h ? 1 : 0, transition: 'opacity 150ms',
          background: 'transparent', color: '#94a3b8',
          border: 'none', cursor: 'pointer', borderRadius: 4,
          fontSize: 13,
        }}
      >⋯</button>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 16 }}>
      <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#94a3b8', marginBottom: 8 }}>{title}</h3>
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 18, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        {children}
      </div>
    </section>
  );
}
