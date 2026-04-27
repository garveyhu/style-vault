import { PreviewFrame } from '../../../_layout';

const SCROLL_CSS = `
.sv-default::-webkit-scrollbar { width: 7px; height: 7px; }
.sv-default::-webkit-scrollbar-track { background: transparent; }
.sv-default::-webkit-scrollbar-thumb { background: rgb(215, 215, 215); border-radius: 4px; }
.sv-default::-webkit-scrollbar-thumb:hover { background: rgb(185, 185, 185); }

.sv-dropdown::-webkit-scrollbar { width: 3px; height: 3px; }
.sv-dropdown::-webkit-scrollbar-track { background: transparent; }
.sv-dropdown::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.02); border-radius: 1.5px; transition: background-color 0.3s ease; }
.sv-dropdown:hover::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.10); }

.sv-sidebar::-webkit-scrollbar { width: 4px; }
.sv-sidebar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 2px; }

.sv-none { scrollbar-width: none; -ms-overflow-style: none; }
.sv-none::-webkit-scrollbar { width: 0; height: 0; display: none; }
`;

const FILLER = Array.from({ length: 20 }, (_, i) => `行 #${i + 1} 填充内容`);

export default function HairlineScrollbarPreview() {
  return (
    <PreviewFrame bg="rgb(249,249,249)">
      <style>{SCROLL_CSS}</style>
      <div style={{ maxWidth: 880, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>
          COMPONENT · INDICATOR
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '8px 0 4px', letterSpacing: '-0.01em' }}>
          Hairline Scrollbar
        </h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>
          四档自定义 webkit-scrollbar：7px / 3px / 4px / 隐藏 — 滚动一下面板看效果
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          <ScrollPanel cls="sv-default" label="全局默认 · 7px gray" />
          <ScrollPanel cls="sv-dropdown" label=".sage-dropdown-scroll · 3px hover 出现" />
          <ScrollPanel cls="sv-sidebar" label="Sidebar list · 4px slate-300" />
          <ScrollPanel cls="sv-none" label=".no-scrollbar · 完全隐藏" />
        </div>
      </div>
    </PreviewFrame>
  );
}

function ScrollPanel({ cls, label }: { cls: string; label: string }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16 }}>
      <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.2, color: '#94a3b8', marginBottom: 8 }}>{label}</div>
      <div className={cls} style={{ height: 160, overflowY: 'auto', background: '#fafafa', borderRadius: 8, padding: 12 }}>
        {FILLER.map(t => (
          <div key={t} style={{ padding: '6px 8px', fontSize: 13, color: '#475569', borderBottom: '1px dashed #f1f5f9' }}>{t}</div>
        ))}
      </div>
    </div>
  );
}
