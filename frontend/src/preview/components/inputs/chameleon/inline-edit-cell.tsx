import { PreviewFrame } from '../../../_layout';
import { Check, Loader2, Pencil, X } from 'lucide-react';

const SANS = 'Inter, system-ui, sans-serif';
const STONE_200 = '#e7e5e4';

export default function InlineEditCell() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 560, margin: '0 auto', fontFamily: SANS, color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>
          COMPONENT · INLINE EDIT CELL
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>
          表格内联编辑单元
        </h1>

        {/* 模拟表格：每行一个单元 */}
        <div
          style={{
            border: `1px solid ${STONE_200}`,
            borderRadius: 8,
            overflow: 'hidden',
            background: '#fff',
            boxShadow: '0 1px 3px rgb(0 0 0/0.05), 0 2px 8px rgb(0 0 0/0.03)',
          }}
        >
          <HeaderRow />
          <TableRow label="显示态（默认 · 铅笔 opacity-0）" cell={<DisplayCell value="风控审查智能体" />} />
          <TableRow label="显示态（hover 露铅笔 · bg-stone-100）" cell={<DisplayCell value="风控审查智能体" hovered />} />
          <TableRow label="显示态（空值 · text-stone-400 —）" cell={<DisplayCell value={null} />} />
          <TableRow label="编辑态（默认）" cell={<EditCell value="0.7" />} />
          <TableRow label="编辑态（按钮 hover：✓emerald-50 / ✕stone-100）" cell={<EditCell value="0.7" btnHover />} />
          <TableRow label="保存中（Loader2 spin）" cell={<EditCell value="0.7" saving />} last />
        </div>
      </div>
    </PreviewFrame>
  );
}

function HeaderRow() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 14px',
        background: '#f4f3ee',
        borderBottom: `1px solid ${STONE_200}`,
        fontSize: 11,
        fontWeight: 600,
        color: '#78716c',
        textTransform: 'uppercase',
        letterSpacing: '0.03em',
      }}
    >
      <span style={{ width: 252 }}>状态</span>
      <span>值</span>
    </div>
  );
}

function TableRow({ label, cell, last }: { label: string; cell: React.ReactNode; last?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px 14px', borderBottom: last ? 'none' : '1px solid #f4f3ee' }}>
      <span style={{ width: 252, fontSize: 12, color: '#78716c' }}>{label}</span>
      <span style={{ fontSize: 13, color: '#1c1917' }}>{cell}</span>
    </div>
  );
}

function DisplayCell({ value, hovered }: { value: string | null; hovered?: boolean }) {
  // group/inline inline-flex items-center gap-1 cursor-pointer
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, cursor: 'pointer' }} title="双击编辑">
      {/* 空值 placeholder：<span className="text-stone-400">—</span> */}
      <span style={value === null ? { color: '#a8a29e' } : undefined}>{value ?? '—'}</span>
      {/* 铅笔 rounded(4) p-0.5(2) opacity-0 group-hover:opacity-100 hover:bg-stone-100(#f5f5f4)；Pencil h-3 w-3(12) text-stone-400 */}
      <button
        style={{
          borderRadius: 4,
          padding: 2,
          border: 'none',
          background: hovered ? '#f5f5f4' : 'transparent',
          cursor: 'pointer',
          display: 'inline-flex',
          opacity: hovered ? 1 : 0,
        }}
      >
        <Pencil size={12} color="#a8a29e" />
      </button>
    </span>
  );
}

function EditCell({ value, saving, btnHover }: { value: string; saving?: boolean; btnHover?: boolean }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      {/* input h-6(24) max-w-[140px] rounded(4) border-blue-300(#93c5fd) px-1.5(6) text-[12px] ring-2 ring-blue-100(#dbeafe) */}
      <input
        readOnly
        value={value}
        style={{
          height: 24,
          width: '100%',
          maxWidth: 140,
          borderRadius: 4,
          border: '1px solid #93c5fd',
          background: '#fff',
          padding: '0 6px',
          fontSize: 12,
          color: '#1c1917',
          outline: 'none',
          boxShadow: '0 0 0 2px #dbeafe',
        }}
      />
      {saving ? (
        // Loader2 h-3 w-3(12) animate-spin text-stone-400
        <Loader2 size={12} color="#a8a29e" style={{ animation: 'iec-spin 1s linear infinite' }} />
      ) : (
        <>
          {/* 确认 rounded(4) p-0.5(2) text-emerald-600(#059669) hover:bg-emerald-50(#ecfdf5) */}
          <button style={{ borderRadius: 4, padding: 2, border: 'none', background: btnHover ? '#ecfdf5' : 'transparent', cursor: 'pointer', display: 'inline-flex' }}>
            <Check size={12} color="#059669" />
          </button>
          {/* 取消 rounded(4) p-0.5(2) text-stone-400(#a8a29e) hover:bg-stone-100(#f5f5f4) */}
          <button style={{ borderRadius: 4, padding: 2, border: 'none', background: btnHover ? '#f5f5f4' : 'transparent', cursor: 'pointer', display: 'inline-flex' }}>
            <X size={12} color="#a8a29e" />
          </button>
        </>
      )}
      <style>{`@keyframes iec-spin { to { transform: rotate(360deg) } }`}</style>
    </span>
  );
}
