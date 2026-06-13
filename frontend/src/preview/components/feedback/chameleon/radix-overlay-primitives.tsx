import { PreviewFrame } from '../../../_layout';
import { X, Pencil, Copy, Trash2, ChevronRight } from 'lucide-react';

const SHADOW_POP = '0 8px 24px rgb(0 0 0 / 8%), 0 2px 8px rgb(0 0 0 / 4%)';
const SHADOW_MD = '0 4px 6px rgb(0 0 0 / 7%), 0 2px 4px rgb(0 0 0 / 6%)';
const PAPER = '#fffefb';

export default function RadixOverlayPrimitives() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 820, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · FEEDBACK</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>Radix 浮层四件套</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
          <Section title="Dialog (居中卡片 · max-w-lg · p-6)">
            <div style={{ position: 'relative', display: 'grid', gap: 16, width: '100%', maxWidth: 360, background: PAPER, padding: 24, boxShadow: SHADOW_POP, borderRadius: 8, border: '1px solid #e7e5e0' }}>
              <button style={{ position: 'absolute', right: 16, top: 16, borderRadius: 2, opacity: 0.7, background: 'transparent', border: 'none', cursor: 'pointer', lineHeight: 0 }}><X size={16} strokeWidth={2} /></button>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'left' }}>
                <div style={{ fontSize: 18, fontWeight: 600, lineHeight: 1, letterSpacing: '-0.01em' }}>确认操作</div>
                <div style={{ fontSize: 14, color: '#78716c' }}>此操作将立即应用到当前会话。</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <Btn>取消</Btn>
                <Btn primary>确认</Btn>
              </div>
            </div>
          </Section>

          <Section title="Popover (w-72 · p-3)">
            <div style={{ width: 288, borderRadius: 8, border: '1px solid #e7e5e0', background: PAPER, padding: 12, color: '#1c1917', boxShadow: SHADOW_POP }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#44403c', marginBottom: 8 }}>显示列</div>
              {['名称', '状态', '创建时间'].map(c => (
                <label key={c} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, padding: '4px 0', color: '#44403c' }}>
                  <span style={{ width: 14, height: 14, borderRadius: 3, border: '1px solid #d6d3d1', background: '#fff' }} />
                  {c}
                </label>
              ))}
            </div>
          </Section>

          <Section title="DropdownMenu (Item/Label/Sub/Separator)">
            <div style={{ minWidth: 160, overflow: 'hidden', borderRadius: 6, border: '1px solid #e7e5e0', background: PAPER, padding: 4, color: '#1c1917', boxShadow: SHADOW_POP }}>
              <div style={{ padding: '6px 8px', fontSize: 12, fontWeight: 600, color: '#78716c' }}>操作</div>
              <MenuItem icon={<Pencil size={14} strokeWidth={2} />}>编辑</MenuItem>
              <MenuItem icon={<Copy size={14} strokeWidth={2} />}>复制</MenuItem>
              <MenuItem icon={<ChevronRight size={14} strokeWidth={2} />} sub>导出为…</MenuItem>
              <div style={{ margin: '4px -4px', height: 1, background: '#e7e5e0' }} />
              <MenuItem icon={<Trash2 size={14} strokeWidth={2} />} danger>删除</MenuItem>
            </div>
          </Section>

          <Section title="Tooltip (stone-900 暗底 · 11px)">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 8 }}>
              <button style={{ height: 32, width: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: '1px solid #d6d3d1', background: '#fff', cursor: 'pointer' }}>
                <Pencil size={16} strokeWidth={2} style={{ color: '#57534e' }} />
              </button>
              <span style={{ borderRadius: 6, background: '#1c1917', padding: '4px 8px', fontSize: 11, fontWeight: 500, lineHeight: 1.25, color: '#fafaf9', boxShadow: SHADOW_MD }}>编辑此项</span>
            </div>
          </Section>
        </div>
      </div>
    </PreviewFrame>
  );
}

function MenuItem({ children, icon, sub, danger }: { children: React.ReactNode; icon?: React.ReactNode; sub?: boolean; danger?: boolean }) {
  return (
    <div style={{ position: 'relative', display: 'flex', cursor: 'pointer', userSelect: 'none', alignItems: 'center', borderRadius: 2, padding: '6px 8px', fontSize: 14, color: danger ? '#dc2626' : '#1c1917', gap: 8 }}>
      <span style={{ lineHeight: 0, color: danger ? '#dc2626' : '#78716c' }}>{icon}</span>
      <span style={{ flex: 1 }}>{children}</span>
      {sub && <ChevronRight size={14} strokeWidth={2} style={{ color: '#a8a29e' }} />}
    </div>
  );
}

function Btn({ children, primary }: { children: React.ReactNode; primary?: boolean }) {
  return (
    <button style={{ height: 32, padding: '0 12px', borderRadius: 6, fontSize: 12.5, fontWeight: 500, background: primary ? '#2563eb' : '#fff', color: primary ? '#fff' : '#44403c', border: `1px solid ${primary ? 'transparent' : '#d6d3d1'}`, cursor: 'pointer' }}>{children}</button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>{title}</div>
      {children}
    </div>
  );
}
