import { PreviewFrame } from '../../../_layout';
import { X, AlertTriangle } from 'lucide-react';

const SHADOW_POP = '0 8px 24px rgb(0 0 0 / 8%), 0 2px 8px rgb(0 0 0 / 4%)';
const PAPER = '#fffefb';

function CloseBtn({ inset = 14 }: { inset?: number }) {
  return (
    <button
      style={{
        position: 'absolute',
        right: inset,
        top: inset,
        borderRadius: 6,
        padding: 4,
        color: '#a8a29e',
        opacity: 0.8,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        lineHeight: 0,
      }}
    >
      <X size={16} strokeWidth={1.75} />
    </button>
  );
}

function ModalShell() {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        width: 400,
        borderRadius: 16,
        border: '1px solid #e7e5e0',
        background: PAPER,
        boxShadow: SHADOW_POP,
      }}
    >
      <CloseBtn />
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, borderBottom: '1px solid rgba(231,229,224,0.7)', padding: '16px 20px 14px' }}>
        <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', color: '#1c1917' }}>编辑知识库</div>
        <div style={{ fontSize: 12, lineHeight: 1.6, color: '#78716c' }}>修改名称与检索配置，保存后立即生效。</div>
      </div>
      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <FieldRow label="名称" value="产品文档库" />
        <FieldRow label="向量模型" value="bge-large-zh" />
      </div>
      {/* Footer with warm tint */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, borderTop: '1px solid rgba(231,229,224,0.7)', background: 'rgba(244,243,238,0.3)', padding: '12px 20px' }}>
        <Btn>取消</Btn>
        <Btn primary>保存</Btn>
      </div>
    </div>
  );
}

function SheetShell() {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: 320,
        width: 300,
        background: PAPER,
        boxShadow: SHADOW_POP,
        borderLeft: '1px solid #e7e5e0',
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <CloseBtn inset={16} />
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, borderBottom: '1px solid #e7e5e0', padding: 24 }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: '#1c1917' }}>运行详情</div>
        <div style={{ fontSize: 12, color: '#78716c' }}>run_a83f · 2026-06-13 14:02</div>
      </div>
      {/* Body */}
      <div style={{ flex: 1, overflow: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <FieldRow label="状态" value="成功" />
        <FieldRow label="耗时" value="2.8s" />
        <FieldRow label="Token" value="1,204" />
      </div>
      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, borderTop: '1px solid #e7e5e0', padding: '16px 24px' }}>
        <Btn>关闭</Btn>
      </div>
    </div>
  );
}

function ConfirmShell() {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: 360,
        borderRadius: 16,
        border: '1px solid #e7e5e0',
        background: PAPER,
        boxShadow: SHADOW_POP,
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', gap: 12, padding: '20px 20px 16px' }}>
        <span style={{ display: 'flex', height: 36, width: 36, flexShrink: 0, alignItems: 'center', justifyContent: 'center', borderRadius: 9999, background: '#fef2f2' }}>
          <AlertTriangle size={18} style={{ color: '#dc2626' }} strokeWidth={2} />
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1c1917' }}>删除文档?</div>
          <div style={{ fontSize: 12, lineHeight: 1.6, color: '#78716c' }}>将同步清理切块与对象存储，不可恢复。</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, borderTop: '1px solid rgba(231,229,224,0.7)', background: 'rgba(244,243,238,0.3)', padding: '12px 20px' }}>
        <Btn>取消</Btn>
        <Btn danger>确认删除</Btn>
      </div>
    </div>
  );
}

export default function ModalSheetConfirm() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 800, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · FEEDBACK</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>分档 Modal + 滑入 Sheet + 命令式 confirm</h1>

        <Section title="Modal (sm · rounded-2xl · 暖底 footer)">
          <ModalShell />
        </Section>

        <Section title="Sheet (右滑入抽屉 · 480px)">
          <SheetShell />
        </Section>

        <Section title="confirm({ danger:true }) → Promise<boolean>">
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
      <div style={{ height: 32, display: 'flex', alignItems: 'center', borderRadius: 6, border: '1px solid #e7e5e0', background: '#fff', padding: '0 10px', fontSize: 13, color: '#44403c' }}>{value}</div>
    </div>
  );
}

function Btn({ children, primary, danger }: { children: React.ReactNode; primary?: boolean; danger?: boolean }) {
  const bg = danger ? '#dc2626' : primary ? '#2563eb' : '#fff';
  const color = danger || primary ? '#fff' : '#44403c';
  const border = danger || primary ? 'transparent' : '#d6d3d1';
  return (
    <button style={{ height: 32, padding: '0 12px', borderRadius: 6, fontSize: 12.5, fontWeight: 500, background: bg, color, border: `1px solid ${border}`, cursor: 'pointer' }}>{children}</button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>{title}</div>
      {children}
    </div>
  );
}
