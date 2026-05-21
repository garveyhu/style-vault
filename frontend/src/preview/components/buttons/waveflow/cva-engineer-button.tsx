import { PreviewFrame } from '../../../_layout';
import { Loader2, Plus, Trash2 } from 'lucide-react';

const VARIANTS = [
  { name: 'primary',        cls: { bg: '#2563eb', color: '#fff', border: 'transparent' } },
  { name: 'outline',        cls: { bg: '#fff', color: '#44403c', border: '#d6d3d1' } },
  { name: 'ghost',          cls: { bg: 'transparent', color: '#44403c', border: 'transparent' } },
  { name: 'link',           cls: { bg: 'transparent', color: '#2563eb', border: 'transparent' } },
  { name: 'danger',         cls: { bg: '#dc2626', color: '#fff', border: 'transparent' } },
  { name: 'danger-outline', cls: { bg: 'transparent', color: '#dc2626', border: '#fca5a5' } },
  { name: 'dark',           cls: { bg: '#1c1917', color: '#fff', border: 'transparent' } },
];

const SIZES = [
  { name: 'sm', h: 28, px: 10, fs: 11.5 },
  { name: 'md', h: 32, px: 12, fs: 12.5 },
  { name: 'lg', h: 36, px: 16, fs: 14 },
];

export default function CvaEngineerButton() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 800, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · BUTTON</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>CVA Engineer Button</h1>

        <Section title="7 variant (size md)">
          {VARIANTS.map(v => (
            <button key={v.name} style={{
              ...btnBase, height: 32, padding: '0 12px', fontSize: 12.5,
              background: v.cls.bg, color: v.cls.color, border: `1px solid ${v.cls.border}`,
              textDecoration: v.name === 'link' ? 'underline' : 'none',
            }}>{v.name}</button>
          ))}
        </Section>

        <Section title="5 size (variant primary)">
          {SIZES.map(s => (
            <button key={s.name} style={{ ...btnBase, height: s.h, padding: `0 ${s.px}px`, fontSize: s.fs, background: '#2563eb', color: '#fff', border: '1px solid transparent' }}>
              {s.name}
            </button>
          ))}
          <button style={{ ...btnBase, width: 32, height: 32, padding: 0, background: '#2563eb', color: '#fff', border: '1px solid transparent' }}><Plus size={14} /></button>
          <button style={{ ...btnBase, width: 28, height: 28, padding: 0, background: '#2563eb', color: '#fff', border: '1px solid transparent' }}><Plus size={12} /></button>
        </Section>

        <Section title="with icons + loading">
          <button style={{ ...btnBase, height: 28, padding: '0 10px', fontSize: 11.5, background: '#2563eb', color: '#fff', border: '1px solid transparent' }}>
            <Plus size={14} /> 添加任务
          </button>
          <button style={{ ...btnBase, height: 32, padding: '0 12px', fontSize: 12.5, background: '#dc2626', color: '#fff', border: '1px solid transparent' }}>
            <Trash2 size={14} /> 删除
          </button>
          <button style={{ ...btnBase, height: 32, padding: '0 12px', fontSize: 12.5, background: '#2563eb', color: '#fff', border: '1px solid transparent', opacity: 0.5 }}>
            <Loader2 size={14} style={{ animation: 'wf-spin 1s linear infinite' }} /> 保存
          </button>
          <style>{`@keyframes wf-spin { to { transform: rotate(360deg) } }`}</style>
        </Section>
      </div>
    </PreviewFrame>
  );
}

const btnBase: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 6, fontWeight: 500, cursor: 'pointer',
  whiteSpace: 'nowrap',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>{title}</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>{children}</div>
    </div>
  );
}
