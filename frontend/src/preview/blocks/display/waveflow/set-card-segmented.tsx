import { PreviewFrame } from '../../../_layout';
import { Plus, Briefcase, Cpu, Database } from 'lucide-react';

const SETS = [
  { name: '财务对账集合', icon: Briefcase, color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', count: 8, statuses: Array(8).fill('running'), active: true },
  { name: '物联采集集合', icon: Cpu, color: '#10b981', bg: 'rgba(16,185,129,0.12)', count: 12, statuses: [...Array(8).fill('running'), 'error', 'error', 'stopped', 'stopped'] },
  { name: '日终批处理', icon: Database, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', count: 20, statuses: [...Array(4).fill('running'), 'error', ...Array(8).fill('stopped'), ...Array(7).fill('pending')] },
];

const COLORS: Record<string, string> = { running: '#10b981', error: '#f87171', stopped: '#d6d3d1', pending: '#e7e5e0' };

export default function SetCardSegmented() {
  return (
    <PreviewFrame bg="#f4f3ee">
      <div style={{ maxWidth: 320, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'Inter, system-ui, sans-serif' }}>
        {SETS.map(s => (
          <button key={s.name} style={{
            display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer',
            background: s.active ? 'rgba(219,234,254,0.7)' : '#fffefb',
            border: `1px solid ${s.active ? 'rgba(96,165,250,0.5)' : 'transparent'}`,
            borderRadius: 10, padding: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: 4, background: s.bg, color: s.color }}>
                <s.icon size={14} />
              </span>
              <span style={{ flex: 1, fontSize: 12.5, fontWeight: 600, color: '#1c1917', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#78716c', fontVariantNumeric: 'tabular-nums' }}>{s.count}</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {s.statuses.map((st, i) => (
                <span key={i} style={{ display: 'inline-block', width: 14, height: 6, borderRadius: 1, background: COLORS[st] }} />
              ))}
            </div>
          </button>
        ))}
        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '6px 10px', border: '1px dashed #d6d3d1', borderRadius: 8, background: 'transparent', color: '#57534e', fontSize: 12, cursor: 'pointer' }}>
          <Plus size={12} /> 新建集合
        </button>
      </div>
    </PreviewFrame>
  );
}
