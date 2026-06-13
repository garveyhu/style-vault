import { PreviewFrame } from '../../../_layout';
import { Check, Loader2, Pencil, X } from 'lucide-react';

const SANS = 'Inter, system-ui, sans-serif';

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
            border: '1px solid #e7e5e0',
            borderRadius: 8,
            overflow: 'hidden',
            background: '#fff',
            boxShadow: '0 1px 3px rgb(0 0 0/0.05), 0 2px 8px rgb(0 0 0/0.03)',
          }}
        >
          <HeaderRow />
          <TableRow label="显示态（hover 露铅笔）" cell={<DisplayCell value="风控审查智能体" hovered />} />
          <TableRow label="显示态（空值）" cell={<DisplayCell value={null} />} />
          <TableRow label="编辑态" cell={<EditCell value="0.7" />} />
          <TableRow label="保存中" cell={<EditCell value="0.7" saving />} last />
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
        borderBottom: '1px solid #e7e5e0',
        fontSize: 11,
        fontWeight: 600,
        color: '#78716c',
        textTransform: 'uppercase',
        letterSpacing: '0.03em',
      }}
    >
      <span style={{ width: 200 }}>状态</span>
      <span>值</span>
    </div>
  );
}

function TableRow({ label, cell, last }: { label: string; cell: React.ReactNode; last?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px 14px', borderBottom: last ? 'none' : '1px solid #f4f3ee' }}>
      <span style={{ width: 200, fontSize: 12, color: '#78716c' }}>{label}</span>
      <span style={{ fontSize: 13, color: '#1c1917' }}>{cell}</span>
    </div>
  );
}

function DisplayCell({ value, hovered }: { value: string | null; hovered?: boolean }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, cursor: 'pointer' }} title="双击编辑">
      <span style={value === null ? { color: '#a8a29e' } : undefined}>{value ?? '—'}</span>
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

function EditCell({ value, saving }: { value: string; saving?: boolean }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
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
        <Loader2 size={12} color="#a8a29e" style={{ animation: 'iec-spin 1s linear infinite' }} />
      ) : (
        <>
          <button style={{ borderRadius: 4, padding: 2, border: 'none', background: 'transparent', cursor: 'pointer', display: 'inline-flex' }}>
            <Check size={12} color="#059669" />
          </button>
          <button style={{ borderRadius: 4, padding: 2, border: 'none', background: 'transparent', cursor: 'pointer', display: 'inline-flex' }}>
            <X size={12} color="#a8a29e" />
          </button>
        </>
      )}
      <style>{`@keyframes iec-spin { to { transform: rotate(360deg) } }`}</style>
    </span>
  );
}
