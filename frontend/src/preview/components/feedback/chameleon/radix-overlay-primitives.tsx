import { PreviewFrame } from '../../../_layout';
import { X, Pencil, Copy, Trash2, ChevronRight } from 'lucide-react';

const SHADOW_POP = '0 8px 24px rgb(0 0 0 / 8%), 0 2px 8px rgb(0 0 0 / 4%)';
const SHADOW_MD = '0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -2px rgb(0 0 0 / 10%)';
const PAPER = '#fffefb';
const STONE_200 = '#e7e5e4';

export default function RadixOverlayPrimitives() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 820, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · FEEDBACK</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>Radix 浮层四件套</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
          <Section title="Dialog (居中卡片 · max-w-lg 512px · p-6)">
            {/* w-full max-w-lg(512) gap-4(16) bg-paper p-6(24) shadow-pop rounded-lg(8) border border-stone-200 */}
            <div style={{ position: 'relative', display: 'grid', gap: 16, width: '100%', maxWidth: 360, background: PAPER, padding: 24, boxShadow: SHADOW_POP, borderRadius: 8, border: `1px solid ${STONE_200}` }}>
              {/* Close: absolute right-4(16) top-4(16) rounded-sm(2) opacity-70 + X h-4 w-4(16) */}
              <button style={{ position: 'absolute', right: 16, top: 16, borderRadius: 2, opacity: 0.7, background: 'transparent', border: 'none', cursor: 'pointer', lineHeight: 0 }}><X size={16} strokeWidth={2} /></button>
              {/* Header: flex flex-col space-y-1.5(6) text-left */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'left' }}>
                {/* Title: text-lg(18) font-semibold leading-none(1) tracking-tight(-0.025em) */}
                <div style={{ fontSize: 18, fontWeight: 600, lineHeight: 1, letterSpacing: '-0.025em' }}>确认操作</div>
                {/* Description: text-sm(14) text-stone-500 */}
                <div style={{ fontSize: 14, color: '#78716c' }}>此操作将立即应用到当前会话。</div>
              </div>
              {/* Footer: sm:flex-row sm:justify-end sm:space-x-2(8) */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <Btn>取消</Btn>
                <Btn primary>确认</Btn>
              </div>
            </div>
          </Section>

          <Section title="Popover (w-72 288px · p-3 · rounded-lg)">
            {/* w-72(288) rounded-lg(8) border border-stone-200 bg-paper p-3(12) text-stone-900 */}
            <div style={{ width: 288, borderRadius: 8, border: `1px solid ${STONE_200}`, background: PAPER, padding: 12, color: '#1c1917', boxShadow: SHADOW_POP }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#44403c', marginBottom: 8 }}>显示列</div>
              {['名称', '状态', '创建时间'].map(c => (
                <label key={c} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, padding: '4px 0', color: '#44403c' }}>
                  <span style={{ width: 14, height: 14, borderRadius: 3, border: '1px solid #d6d3d1', background: '#fff' }} />
                  {c}
                </label>
              ))}
            </div>
          </Section>

          <Section title="DropdownMenu (Item/Label/Sub/Separator · min-w-[8rem] 128px)">
            {/* min-w-[8rem](128) rounded-md(6) border border-stone-200 bg-paper p-1(4) text-stone-900 shadow-pop */}
            <div style={{ minWidth: 128, overflow: 'hidden', borderRadius: 6, border: `1px solid ${STONE_200}`, background: PAPER, padding: 4, color: '#1c1917', boxShadow: SHADOW_POP }}>
              {/* Label: px-2(8) py-1.5(6) text-xs(12) font-semibold text-stone-500 */}
              <div style={{ padding: '6px 8px', fontSize: 12, fontWeight: 600, color: '#78716c' }}>操作</div>
              <MenuItem icon={<Pencil size={14} strokeWidth={2} />}>编辑</MenuItem>
              <MenuItem icon={<Copy size={14} strokeWidth={2} />}>复制</MenuItem>
              {/* SubTrigger: data-[state=open]:bg-stone-100 + ChevronRight 尾 */}
              <MenuItem icon={<ChevronRight size={14} strokeWidth={2} />} sub>导出为…</MenuItem>
              {/* Separator: -mx-1(-4) my-1(4) h-px bg-stone-200 */}
              <div style={{ margin: '4px -4px', height: 1, background: STONE_200 }} />
              {/* Item 本体无 danger 变体——删除项仍是 text-stone-900，图标走 caller children */}
              <MenuItem icon={<Trash2 size={14} strokeWidth={2} />}>删除</MenuItem>
            </div>
          </Section>

          <Section title="Tooltip (stone-900 暗底 · 11px · shadow-md)">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 8 }}>
              <button style={{ height: 32, width: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: '1px solid #d6d3d1', background: '#fff', cursor: 'pointer' }}>
                <Pencil size={16} strokeWidth={2} style={{ color: '#57534e' }} />
              </button>
              {/* rounded-md(6) bg-stone-900(#1c1917) px-2(8) py-1(4) text-[11px] font-medium leading-tight(1.25) text-stone-50(#fafaf9) shadow-md */}
              <span style={{ borderRadius: 6, background: '#1c1917', padding: '4px 8px', fontSize: 11, fontWeight: 500, lineHeight: 1.25, color: '#fafaf9', boxShadow: SHADOW_MD }}>编辑此项</span>
            </div>
          </Section>
        </div>
      </div>
    </PreviewFrame>
  );
}

function MenuItem({ children, icon, sub }: { children: React.ReactNode; icon?: React.ReactNode; sub?: boolean }) {
  // Item: relative flex items-center rounded-sm(2) px-2(8) py-1.5(6) text-sm(14) text-stone-900
  return (
    <div style={{ position: 'relative', display: 'flex', cursor: 'pointer', userSelect: 'none', alignItems: 'center', borderRadius: 2, padding: '6px 8px', fontSize: 14, color: '#1c1917', gap: 8 }}>
      <span style={{ lineHeight: 0, color: '#78716c' }}>{icon}</span>
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
