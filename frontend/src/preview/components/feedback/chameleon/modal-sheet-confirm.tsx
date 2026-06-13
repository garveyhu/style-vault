import { PreviewFrame } from '../../../_layout';
import { X } from 'lucide-react';

const SHADOW_POP = '0 8px 24px rgb(0 0 0 / 8%), 0 2px 8px rgb(0 0 0 / 4%)';
const PAPER = '#fffefb';
const STONE_200 = '#e7e5e4'; // border-stone-200（Tailwind 真值）

// Modal 关闭按钮：right-3.5 top-3.5(14) rounded-md(6) p-1(4) text-stone-400 opacity-80
function ModalCloseBtn() {
  return (
    <button
      style={{
        position: 'absolute', right: 14, top: 14, borderRadius: 6, padding: 4,
        color: '#a8a29e', opacity: 0.8, background: 'transparent', border: 'none', cursor: 'pointer', lineHeight: 0,
      }}
    >
      <X size={16} strokeWidth={1.75} />
    </button>
  );
}

// Sheet 关闭按钮：right-4 top-4(16) rounded-sm(2) opacity-70（无 padding、无 text-stone-400、X 默认色）
function SheetCloseBtn() {
  return (
    <button
      style={{
        position: 'absolute', right: 16, top: 16, borderRadius: 2,
        opacity: 0.7, background: 'transparent', border: 'none', cursor: 'pointer', lineHeight: 0, padding: 0, color: '#1c1917',
      }}
    >
      <X size={16} />
    </button>
  );
}

// Modal —— rounded-2xl(16) / border-stone-200 / bg-paper / shadow-pop / sm = w-[400px]
function ModalShell() {
  return (
    <div
      style={{
        position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden',
        width: 400, borderRadius: 16, border: `1px solid ${STONE_200}`, background: PAPER, boxShadow: SHADOW_POP,
      }}
    >
      <ModalCloseBtn />
      {/* ModalHeader: flex-col gap-1(4) border-b border-stone-200/70 px-5 pb-3.5 pt-4 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, borderBottom: '1px solid rgba(231,229,228,0.7)', padding: '16px 20px 14px' }}>
        {/* ModalTitle: text-[14px] font-semibold tracking-tight(-0.025em) */}
        <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.025em', color: '#1c1917' }}>编辑知识库</div>
        {/* ModalDescription: text-[12px] leading-relaxed text-stone-500 */}
        <div style={{ fontSize: 12, lineHeight: 1.625, color: '#78716c' }}>修改名称与检索配置，保存后立即生效。</div>
      </div>
      {/* ModalBody: flex-1 overflow-y-auto px-5 py-4（无 gap，内部表单自管间距） */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FieldRow label="名称" value="产品文档库" />
          <FieldRow label="向量模型" value="bge-large-zh" />
        </div>
      </div>
      {/* ModalFooter: flex items-center justify-end gap-2 border-t border-stone-200/70 bg-warm-2/30 px-5 py-3 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, borderTop: '1px solid rgba(231,229,228,0.7)', background: 'rgba(244,243,238,0.3)', padding: '12px 20px' }}>
        <Btn variant="outline">取消</Btn>
        <Btn variant="primary">保存</Btn>
      </div>
    </div>
  );
}

// Sheet —— 右滑入抽屉 w-[480px] / border-l border-stone-200 / bg-paper / shadow-pop（无圆角）
function SheetShell() {
  return (
    <div
      style={{
        position: 'relative', display: 'flex', flexDirection: 'column', height: 320, width: 480,
        background: PAPER, boxShadow: SHADOW_POP, borderLeft: `1px solid ${STONE_200}`, overflow: 'hidden',
      }}
    >
      <SheetCloseBtn />
      {/* SheetHeader: flex-col space-y-2(8) border-b border-stone-200 p-6(24) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, borderBottom: `1px solid ${STONE_200}`, padding: 24 }}>
        {/* SheetTitle: text-lg(18) font-semibold */}
        <div style={{ fontSize: 18, fontWeight: 600, color: '#1c1917' }}>运行详情</div>
        {/* SheetDescription: text-xs(12) text-stone-500 */}
        <div style={{ fontSize: 12, color: '#78716c' }}>run_a83f · 2026-06-13 14:02</div>
      </div>
      {/* SheetBody: flex-1 overflow-auto p-6(24) */}
      <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FieldRow label="状态" value="成功" />
          <FieldRow label="耗时" value="2.8s" />
          <FieldRow label="Token" value="1,204" />
        </div>
      </div>
      {/* SheetFooter: flex justify-end gap-2 border-t border-stone-200 px-6 py-4 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, borderTop: `1px solid ${STONE_200}`, padding: '16px 24px' }}>
        <Btn variant="outline">关闭</Btn>
      </div>
    </div>
  );
}

// confirm() → ConfirmDialog（基于 Dialog，无图标）
// DialogContent: rounded-lg(8) max-w-md(448) grid gap-4(16) p-6(24) border-stone-200 shadow-pop
function ConfirmShell() {
  return (
    <div
      style={{
        position: 'relative', display: 'grid', gap: 16, width: 448, maxWidth: 448,
        borderRadius: 8, border: `1px solid ${STONE_200}`, background: PAPER, boxShadow: SHADOW_POP, padding: 24,
      }}
    >
      {/* Dialog 自带 Close: right-4 top-4 rounded-sm opacity-70 X h-4 w-4 */}
      <SheetCloseBtn />
      {/* DialogHeader: flex-col space-y-1.5(6) text-left */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'left' }}>
        {/* DialogTitle: text-lg(18) font-semibold leading-none(1) tracking-tight(-0.025em) */}
        <div style={{ fontSize: 18, fontWeight: 600, lineHeight: 1, letterSpacing: '-0.025em', color: '#1c1917' }}>删除文档?</div>
        {/* DialogDescription: text-sm(14) text-stone-500 whitespace-pre-line */}
        <div style={{ fontSize: 14, color: '#78716c', whiteSpace: 'pre-line' }}>将同步清理切块与对象存储，不可恢复。</div>
      </div>
      {/* DialogFooter: flex justify-end gap-2 mt-4（无 border-t、无暖底） */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
        {/* ghost 取消（无边框透明底） + danger 确认 */}
        <Btn variant="ghost">取消</Btn>
        <Btn variant="danger">确认</Btn>
      </div>
    </div>
  );
}

export default function ModalSheetConfirm() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 800, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · FEEDBACK</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>Modal + Sheet + 命令式 confirm</h1>

        <Section title="Modal (sm · 400px · rounded-2xl · 暖底 footer)">
          <ModalShell />
        </Section>

        <Section title="Sheet (右滑入抽屉 · 480px · border-l · 无圆角)">
          <SheetShell />
        </Section>

        <Section title="confirm({ danger:true }) → ConfirmDialog (基于 Dialog · rounded-lg · 无图标)">
          <ConfirmShell />
        </Section>
      </div>
    </PreviewFrame>
  );
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 11, color: '#a8a29e' }}>{label}</span>
      <div style={{ height: 32, display: 'flex', alignItems: 'center', borderRadius: 6, border: `1px solid ${STONE_200}`, background: '#fff', padding: '0 10px', fontSize: 13, color: '#44403c' }}>{value}</div>
    </div>
  );
}

// Button：size md = h-8(32) px-3(12) text-[12.5px] rounded-md(6) gap-1.5(6) font-medium(500)
function Btn({ children, variant }: { children: React.ReactNode; variant: 'primary' | 'outline' | 'ghost' | 'danger' }) {
  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    height: 32, padding: '0 12px', borderRadius: 6, fontSize: 12.5, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
  };
  const styles: Record<string, React.CSSProperties> = {
    primary: { background: '#2563eb', color: '#fff', border: '1px solid transparent' },
    danger: { background: '#dc2626', color: '#fff', border: '1px solid transparent' },
    outline: { background: '#fff', color: '#44403c', border: '1px solid #d6d3d1' },
    // ghost: 无边框、透明底、text-stone-700
    ghost: { background: 'transparent', color: '#44403c', border: '1px solid transparent' },
  };
  return <button style={{ ...base, ...styles[variant] }}>{children}</button>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>{title}</div>
      {children}
    </div>
  );
}
