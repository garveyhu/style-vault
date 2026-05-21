import { PreviewFrame } from '../../../_layout';

const LIGHT = [
  { k: 'FETCH', label: '拉取', cls: { bg: '#ecfdf5', text: '#047857', border: '#a7f3d0' } },
  { k: 'TRANS', label: '清洗', cls: { bg: '#fdf2f8', text: '#be185d', border: '#fbcfe8' } },
  { k: 'PUSH', label: '推送', cls: { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' } },
  { k: 'COMPLEX', label: '综合', cls: { bg: '#fffbeb', text: '#b45309', border: '#fde68a' } },
  { k: 'BEAN', label: 'DataX', cls: { bg: '#eef2ff', text: '#4338ca', border: '#c7d2fe' } },
  { k: 'GLUE_PYTHON', label: 'Python', cls: { bg: '#ecfeff', text: '#0e7490', border: '#a5f3fc' } },
  { k: 'GLUE_SHELL', label: 'Shell', cls: { bg: '#f5f5f4', text: '#44403c', border: '#e7e5e0' } },
];

const SOLID = [
  { k: 'FETCH', label: '拉取', cls: { bg: '#059669', text: '#fff' } },
  { k: 'TRANS', label: '清洗', cls: { bg: '#db2777', text: '#fff' } },
  { k: 'PUSH', label: '推送', cls: { bg: '#2563eb', text: '#fff' } },
  { k: 'BEAN', label: 'DataX', cls: { bg: '#4f46e5', text: '#fff' } },
];

export default function GlueTypeBadgeDuo() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 720, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · TAG</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 32px' }}>GlueType Badge Duo</h1>

        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>LIGHT 变体 · 表格密集场景</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
          {LIGHT.map(t => (
            <span key={t.k} style={{ ...chip, background: t.cls.bg, color: t.cls.text, border: `1px solid ${t.cls.border}` }}>{t.label}</span>
          ))}
        </div>

        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>SOLID 变体 · dashboard 突出</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
          {SOLID.map(t => (
            <span key={t.k} style={{ ...chip, background: t.cls.bg, color: t.cls.text, fontWeight: 600, letterSpacing: '0.025em' }}>{t.label}</span>
          ))}
        </div>

        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>CountChip · 含数字</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {SOLID.map(t => (
            <span key={t.k} style={{ ...chip, background: t.cls.bg, color: t.cls.text, fontWeight: 600, gap: 4 }}>
              <span>{t.label}</span><span style={{ fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums', fontWeight: 700 }}>12</span>
            </span>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}

const chip: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', padding: '2px 6px', borderRadius: 4, fontSize: 10.5, lineHeight: 1, whiteSpace: 'nowrap',
};
