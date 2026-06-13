import { PreviewFrame } from '../../../_layout';
import { Loader2, Plus, Trash2 } from 'lucide-react';

/**
 * themeable-cva-button · 可切主色 CVA 按钮（9 variant × 6 size）
 * primary 走 --color-primary-*（8 套 data-primary 主题色），新增 secondary + default 别名
 * 源码：src/core/components/ui/button.tsx
 */

const PRIMARY = '#2563eb';      // --color-primary-600 默认（blue）

const VARIANTS = [
  { name: 'primary', bg: PRIMARY, color: '#fff', border: 'transparent' },
  { name: 'default', bg: PRIMARY, color: '#fff', border: 'transparent' },
  { name: 'outline', bg: '#fff', color: '#44403c', border: '#d6d3d1' },
  { name: 'secondary', bg: '#f5f5f4', color: '#1c1917', border: 'transparent' },
  { name: 'ghost', bg: 'transparent', color: '#44403c', border: 'transparent' },
  { name: 'link', bg: 'transparent', color: PRIMARY, border: 'transparent', underline: true },
  { name: 'danger', bg: '#dc2626', color: '#fff', border: 'transparent' },
  { name: 'danger-outline', bg: 'transparent', color: '#dc2626', border: '#fca5a5' },
  { name: 'dark', bg: '#1c1917', color: '#fff', border: 'transparent' },
];

const SIZES = [
  { name: 'sm', h: 28, px: 10, fs: 11.5 },
  { name: 'md / default', h: 32, px: 12, fs: 12.5 },
  { name: 'lg', h: 36, px: 16, fs: 14 },
];

// 8 套可切主色（data-primary）
const PRIMARIES = [
  { key: 'blue', hex: '#2563eb' },
  { key: 'purple', hex: '#9333ea' },
  { key: 'green', hex: '#059669' },
  { key: 'orange', hex: '#ea580c' },
  { key: 'rose', hex: '#e11d48' },
  { key: 'cyan', hex: '#0891b2' },
  { key: 'amber', hex: '#d97706' },
  { key: 'teal', hex: '#0d9488' },
];

// 源码各 variant 的 base/hover/active 实色 + base 的 focus-visible:ring-2 ring-primary-200(#bfdbfe)
const STATE_ROWS = [
  {
    name: 'primary', color: '#fff',
    states: [
      { label: 'base', bg: '#2563eb' },                  // primary-600
      { label: 'hover', bg: '#1d4ed8' },                 // primary-700
      { label: 'active', bg: '#1e40af' },                // primary-800
      { label: 'focus', bg: '#2563eb', ring: '#bfdbfe' },// ring primary-200
    ],
  },
  {
    name: 'outline', color: '#44403c',
    states: [
      { label: 'base', bg: '#ffffff', border: '#d6d3d1' },   // bg-white border-stone-300
      { label: 'hover', bg: '#fafaf9', border: '#d6d3d1' },  // hover:bg-stone-50
      { label: 'active', bg: '#f5f5f4', border: '#d6d3d1' }, // active:bg-stone-100
      { label: 'focus', bg: '#ffffff', border: '#d6d3d1', ring: '#bfdbfe' },
    ],
  },
  {
    name: 'ghost', color: '#44403c',
    states: [
      { label: 'base', bg: 'transparent' },              // text-stone-700
      { label: 'hover', bg: '#f5f5f4' },                 // hover:bg-stone-100
      { label: 'active', bg: '#e7e5e4' },                // active:bg-stone-200
      { label: 'focus', bg: 'transparent', ring: '#bfdbfe' },
    ],
  },
  {
    name: 'danger', color: '#fff',
    states: [
      { label: 'base', bg: '#dc2626' },                  // red-600
      { label: 'hover', bg: '#b91c1c' },                 // red-700
      { label: 'active', bg: '#991b1b' },                // red-800
      { label: 'focus', bg: '#dc2626', ring: '#bfdbfe' },
    ],
  },
] as const;

export default function ThemeableCvaButton() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 820, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · BUTTON</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>Themeable CVA Button</h1>

        <Section title="9 variant (size md)">
          {VARIANTS.map(v => (
            <button key={v.name} style={{
              ...btnBase, height: 32, padding: '0 12px', fontSize: 12.5,
              background: v.bg, color: v.color, border: `1px solid ${v.border}`,
              textDecoration: v.underline ? 'underline' : 'none', textUnderlineOffset: 2,
            }}>{v.name}</button>
          ))}
        </Section>

        {/* 交互态：源码每 variant 都有 hover/active，base 有 focus-visible:ring-2 ring-primary-200 */}
        <Section title="交互态快照 · base / hover / active / focus">
          {STATE_ROWS.map(row => (
            <div key={row.name} style={{ display: 'flex', flexDirection: 'column', gap: 6, marginRight: 20 }}>
              <span style={{ fontSize: 9.5, fontFamily: 'JetBrains Mono, monospace', color: '#a8a29e' }}>{row.name}</span>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {row.states.map(st => (
                  <div key={st.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <button style={{
                      ...btnBase, height: 32, padding: '0 12px', fontSize: 12.5,
                      background: st.bg, color: row.color,
                      border: `1px solid ${'border' in st ? st.border : 'transparent'}`,
                      boxShadow: 'ring' in st ? `0 0 0 2px ${st.ring}` : 'none',
                    }}>{row.name}</button>
                    <span style={{ fontSize: 9, color: '#a8a29e' }}>{st.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Section>

        <Section title="6 size (variant primary)">
          {SIZES.map(s => (
            <button key={s.name} style={{ ...btnBase, height: s.h, padding: `0 ${s.px}px`, fontSize: s.fs, background: PRIMARY, color: '#fff', border: '1px solid transparent' }}>
              {s.name}
            </button>
          ))}
          <button style={{ ...btnBase, width: 32, height: 32, padding: 0, background: PRIMARY, color: '#fff', border: '1px solid transparent' }}><Plus size={14} /></button>
          <button style={{ ...btnBase, width: 28, height: 28, padding: 0, background: PRIMARY, color: '#fff', border: '1px solid transparent' }}><Plus size={12} /></button>
        </Section>

        <Section title="with icons + loading">
          <button style={{ ...btnBase, height: 28, padding: '0 10px', fontSize: 11.5, background: PRIMARY, color: '#fff', border: '1px solid transparent' }}>
            <Plus size={14} /> 新建
          </button>
          <button style={{ ...btnBase, height: 32, padding: '0 12px', fontSize: 12.5, background: '#dc2626', color: '#fff', border: '1px solid transparent' }}>
            <Trash2 size={14} /> 删除
          </button>
          <button style={{ ...btnBase, height: 32, padding: '0 12px', fontSize: 12.5, background: PRIMARY, color: '#fff', border: '1px solid transparent', opacity: 0.5 }}>
            <Loader2 size={14} style={{ animation: 'chm-spin 1s linear infinite' }} /> 保存
          </button>
          <style>{`@keyframes chm-spin { to { transform: rotate(360deg) } }`}</style>
        </Section>

        {/* signature: 可切换主色 —— 同一个 primary 按钮在 8 套 data-primary 下 */}
        <Section title="signature · primary 跟 data-primary 切换（8 套主色）">
          {PRIMARIES.map(p => (
            <div key={p.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <button style={{ ...btnBase, height: 32, padding: '0 12px', fontSize: 12.5, background: p.hex, color: '#fff', border: '1px solid transparent' }}>主按钮</button>
              <span style={{ fontSize: 9.5, fontFamily: 'JetBrains Mono, monospace', color: '#a8a29e' }}>{p.key}</span>
            </div>
          ))}
        </Section>
      </div>
    </PreviewFrame>
  );
}

const btnBase: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 6, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>{title}</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>{children}</div>
    </div>
  );
}
