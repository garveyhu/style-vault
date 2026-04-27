import { useState } from 'react';
import { ChevronLeft, ChevronRight, Edit2, MoreHorizontal, MoreVertical, PanelLeftOpen, Search, X } from 'lucide-react';
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
          透明底圆形按钮 · slate hover · sage header / 会话操作 / 折叠按钮的标配
        </p>

        <Section title="默认 · p-2 rounded-full hover:bg-slate-100">
          <Ghost icon={<MoreVertical size={20} />} />
          <Ghost icon={<Edit2 size={20} />} />
          <Ghost icon={<Search size={20} />} />
          <Ghost icon={<ChevronLeft size={20} />} />
          <Ghost icon={<ChevronRight size={20} />} />
        </Section>

        <Section title="主交互区 · hover:bg-[rgb(242,242,242)]">
          <Ghost icon={<MoreVertical size={20} />} hoverBg="rgb(242,242,242)" />
          <Ghost icon={<MoreHorizontal size={16} />} hoverBg="rgb(242,242,242)" />
          <Ghost icon={<Edit2 size={20} />} hoverBg="rgb(242,242,242)" />
        </Section>

        <Section title="危险态 · close admin overlay · bg-slate-100 hover:bg-red-100 hover:text-red-600 shadow-sm">
          <CloseBtn />
        </Section>

        <Section title="双图标切换 · group hover · 折叠侧栏时 logo 变 PanelLeftOpen">
          <DualIcon />
        </Section>

        <Section title="group hover 显示 · opacity-0 group-hover:opacity-100">
          <SessionRow />
        </Section>
      </div>
    </PreviewFrame>
  );
}

function Ghost({ icon, hoverBg = '#f1f5f9' }: { icon: React.ReactNode; hoverBg?: string }) {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        width: 32, height: 32,
        background: h ? hoverBg : 'transparent',
        color: h ? '#475569' : '#94a3b8',
        border: 'none', cursor: 'pointer', borderRadius: '50%',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 200ms',
      }}
    >
      {icon}
    </button>
  );
}

function CloseBtn() {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        width: 36, height: 36,
        background: h ? '#fee2e2' : '#f1f5f9',
        color: h ? '#dc2626' : '#64748b',
        border: 'none', cursor: 'pointer', borderRadius: '50%',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
        transition: 'all 200ms',
      }}
    >
      <X size={20} />
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
        position: 'relative', width: 32, height: 32, borderRadius: '50%',
        background: h ? '#f1f5f9' : 'transparent',
        border: 'none', cursor: 'pointer', transition: 'all 200ms',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: h ? 0 : 1, transition: 'opacity 200ms',
      }}>
        <div style={{ width: 24, height: 24, background: '#10b981', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700 }}>S</div>
      </div>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: h ? 1 : 0, transition: 'opacity 200ms', color: '#475569',
      }}>
        <PanelLeftOpen size={20} />
      </div>
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
      <span style={{ fontSize: 14, color: '#475569', fontWeight: 500 }}>会话标题示例</span>
      <button
        style={{
          padding: 4, opacity: h ? 1 : 0, transition: 'opacity 150ms',
          background: 'transparent', color: '#94a3b8',
          border: 'none', cursor: 'pointer', borderRadius: 6,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}
      ><MoreHorizontal size={16} /></button>
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
