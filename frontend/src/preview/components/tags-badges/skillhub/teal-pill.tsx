import { X } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

function Pill({ children, maxWidth = 110 }: { children: React.ReactNode; maxWidth?: number }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 11,
        fontWeight: 600,
        padding: '2px 10px',
        borderRadius: 999,
        background: '#f0fdfa',
        color: '#0d9488',
        border: '1px solid #ccfbf1',
        fontFamily: 'Inter, system-ui, sans-serif',
        maxWidth,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}

function VersionChip({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, color: '#64748b',
      background: '#f8fafc', padding: '2px 6px',
      borderRadius: 4, fontFamily: 'JetBrains Mono, monospace',
    }}>
      {children}
    </span>
  );
}

function DismissiblePill({ children }: { children: React.ReactNode }) {
  return (
    <button style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: 12, fontWeight: 600,
      padding: '4px 12px', borderRadius: 999,
      background: '#f0fdfa', color: '#0d9488',
      border: '1px solid #ccfbf1', cursor: 'pointer',
    }}>
      <span>{children}</span>
      <X size={10} />
    </button>
  );
}

export default function TealPillPreview() {
  return (
    <PreviewFrame bg="#f5f7fa">
      <div style={{ maxWidth: 880, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#9ca3af' }}>COMPONENT · TAG</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.01em', margin: '8px 0 24px' }}>Teal Pill</h1>

        <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#6b7280', marginBottom: 12 }}>Default (xs)</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Pill>canvas-design</Pill>
            <Pill>writing-plans</Pill>
            <Pill>systematic-debugging</Pill>
            <Pill>brainstorming</Pill>
          </div>
        </section>

        <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#6b7280', marginBottom: 12 }}>
            With Version Chip (次级 slate 变体)
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <Pill>前端</Pill>
            <VersionChip>v1.2.0</VersionChip>
            <VersionChip>v0.9.3</VersionChip>
          </div>
        </section>

        <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 24 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#6b7280', marginBottom: 12 }}>
            Dismissible (hover 变体)
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <DismissiblePill>activeFilter</DismissiblePill>
            <DismissiblePill>skill: canvas-design</DismissiblePill>
          </div>
        </section>
      </div>
    </PreviewFrame>
  );
}
