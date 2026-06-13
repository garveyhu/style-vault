import { PreviewFrame } from '../../../_layout';
import { Send, Square, Paperclip, X, Loader2, ChevronDown } from 'lucide-react';

/**
 * composer-attach-send · Chameleon Playground 输入框 + 运行参数面板
 * 源码：system/playground/components/composer.tsx · file-attach-button.tsx
 *        param-panel.tsx · template-vars-panel.tsx
 */

const sans = 'Inter, system-ui, sans-serif';
const mono = 'JetBrains Mono, ui-monospace, monospace';

export default function ComposerAttachSend() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ display: 'flex', gap: 20, padding: '24px', fontFamily: sans, alignItems: 'flex-start', flexWrap: 'wrap' }}>

        {/* ============ 左：输入框卡 ============ */}
        <div style={{ flex: '1 1 360px', minWidth: 320, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Composer />
          <ComposerStreaming />
          <ComposerEmpty />
        </div>

        {/* ============ 右：运行参数面板 ============ */}
        <div style={{ flex: '0 0 264px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <ParamPanel />
          <GenModePanel />
        </div>
      </div>
    </PreviewFrame>
  );
}

/* ── 输入框卡（默认态：可发送） ── */
function Composer() {
  return (
    <div style={{ borderRadius: 12, border: '1px solid #e7e5e4', background: '#fff', padding: 10, boxShadow: '0 1px 2px rgba(0,0,0,.03)' }}>
      <textarea
        rows={2}
        defaultValue={'帮我把这张图改成黄昏色调'}
        style={{ border: 0, padding: 0, margin: 0, width: '100%', resize: 'none', fontSize: 12.5, lineHeight: 1.5, color: '#1c1917', fontFamily: sans, outline: 'none', background: 'transparent', boxSizing: 'border-box' }}
      />
      <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* 附件按钮 */}
        <button title="上传附件（图片 / 音频 / PDF，最大 20MB）" style={attachBtn}>
          <Paperclip size={14} color="#78716c" strokeWidth={2} />
        </button>
        {/* AttachmentChip：图缩略 */}
        <div style={chip}>
          <span style={{ width: 20, height: 20, borderRadius: 4, background: 'linear-gradient(135deg,#fcd34d,#fb923c)', display: 'block', flexShrink: 0 }} />
          <span style={{ maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#44403c' }}>sunset.png</span>
          <button style={chipX} title="移除"><X size={12} color="#a8a29e" strokeWidth={2} /></button>
        </div>
        {/* 发送 */}
        <div style={{ marginLeft: 'auto' }}>
          <button style={sendBtn}>
            <Send size={12} color="#fff" strokeWidth={2} style={{ marginRight: 4 }} />
            发送
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── 输入框卡（空态：发送禁用 —— input 空且无附件） ── */
function ComposerEmpty() {
  return (
    <div style={{ borderRadius: 12, border: '1px solid #e7e5e4', background: '#fff', padding: 10, boxShadow: '0 1px 2px rgba(0,0,0,.03)' }}>
      <textarea
        rows={2}
        placeholder="输入消息… Enter 发送（Shift+Enter 换行）"
        style={{ border: 0, padding: 0, margin: 0, width: '100%', resize: 'none', fontSize: 12.5, lineHeight: 1.5, color: '#1c1917', fontFamily: sans, outline: 'none', background: 'transparent', boxSizing: 'border-box' }}
      />
      <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
        <button title="上传附件（图片 / 音频 / PDF，最大 20MB）" style={attachBtn}>
          <Paperclip size={14} color="#78716c" strokeWidth={2} />
        </button>
        <div style={{ marginLeft: 'auto' }}>
          {/* disabled 发送：半透明 + 不可点（disabled:opacity-50 cursor-not-allowed） */}
          <button style={{ ...sendBtn, opacity: 0.5, cursor: 'not-allowed' }} disabled>
            <Send size={12} color="#fff" strokeWidth={2} style={{ marginRight: 4 }} />
            发送
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── 输入框卡（流式态：停止 + 上传中） ── */
function ComposerStreaming() {
  return (
    <div style={{ borderRadius: 12, border: '1px solid #e7e5e4', background: '#fff', padding: 10, boxShadow: '0 1px 2px rgba(0,0,0,.03)' }}>
      <textarea
        rows={2}
        placeholder="输入消息… Enter 发送（Shift+Enter 换行）"
        style={{ border: 0, padding: 0, margin: 0, width: '100%', resize: 'none', fontSize: 12.5, lineHeight: 1.5, color: '#1c1917', fontFamily: sans, outline: 'none', background: 'transparent', boxSizing: 'border-box' }}
      />
      <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
        <button title="上传中" style={attachBtn}>
          <Loader2 size={14} color="#78716c" strokeWidth={2} />
        </button>
        {/* AttachmentChip：非图（mime_kind 文字） */}
        <div style={chip}>
          <span style={{ color: '#78716c' }}>audio</span>
          <span style={{ maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#44403c' }}>note.mp3</span>
          <button style={chipX} title="移除"><X size={12} color="#a8a29e" strokeWidth={2} /></button>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <button style={stopBtn}>
            <Square size={12} color="#57534e" strokeWidth={2} style={{ marginRight: 4 }} />
            停止
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── 运行参数面板（普通模式） ── */
function ParamPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 12.5 }}>
      <Field label="关联应用（可选）">
        <SelectTrigger placeholder="不关联（直调模型）" />
        <p style={{ marginTop: 4, fontSize: 10.5, lineHeight: 1.3, color: '#a8a29e' }}>
          选应用后用其模型 / 提示词 / 知识库预填，仍可手动调整
        </p>
      </Field>

      <Field label="模型">
        <SelectTrigger placeholder="qwen-max" filled />
      </Field>

      <Field label="System Prompt">
        <textarea rows={3} defaultValue={'你是 {{role}}，请用 {{tone}} 的语气回答。'} style={textareaBox} />
      </Field>

      {/* 模板变量 */}
      <Field label="模板变量">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {['role', 'tone'].map(v => (
            <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ flexShrink: 0, borderRadius: 4, background: '#f5f5f4', padding: '2px 6px', fontFamily: mono, fontSize: 10.5, color: '#57534e' }}>{`{{${v}}}`}</span>
              <input placeholder="未填，将原样发送" style={{ ...inputBox, height: 28, flex: 1 }} />
            </div>
          ))}
        </div>
      </Field>

      {/* 数字调参 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <NumberField label="Temperature" value="0.7" />
        <NumberField label="Top P" value="1" />
        <NumberField label="Max Tokens" placeholder="∞" />
      </div>

      {/* KB 多选 */}
      <Field label="关联 KB（多选）">
        <SelectTrigger placeholder="已选 2 个" filled />
        <div style={{ marginTop: 4, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {['产品手册', '常见问题'].map(k => (
            <span key={k} style={kbChip}>
              {k}
              <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#b45309', fontSize: 12, lineHeight: 1 }}>×</button>
            </span>
          ))}
        </div>
      </Field>
    </div>
  );
}

/* ── 生成应用模式（紫色提示条 + GenerationPanel 占位） ── */
function GenModePanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12.5 }}>
      <div style={{ borderRadius: 6, border: '1px solid #ddd6fe', background: '#f5f3ff', padding: '8px 10px', fontSize: 11, lineHeight: 1.4, color: '#6d28d9' }}>
        调用应用模式：在下方调生成参数，左侧对话框输入提示词即出图。
      </div>
      <Field label="尺寸比例">
        <SelectTrigger placeholder="1:1 · 1024×1024" filled />
      </Field>
      <NumberField label="采样步数" value="20" />
    </div>
  );
}

/* ── 原子 ── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ marginBottom: 4, display: 'block', color: '#57534e' }}>{label}</label>
      {children}
    </div>
  );
}

function SelectTrigger({ placeholder, filled }: { placeholder: string; filled?: boolean }) {
  return (
    <div style={{ height: 32, display: 'flex', alignItems: 'center', padding: '0 10px', borderRadius: 6, border: '1px solid #d6d3d1', background: '#fff', fontSize: 12.5, color: filled ? '#1c1917' : '#a8a29e' }}>
      <span style={{ flex: 1 }}>{placeholder}</span>
      <ChevronDown size={12} color="#a8a29e" strokeWidth={2} />
    </div>
  );
}

function NumberField({ label, value, placeholder }: { label: string; value?: string; placeholder?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
      <span style={{ color: '#57534e' }}>{label}</span>
      <input
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        style={{ ...inputBox, height: 28, width: 80, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}
      />
    </div>
  );
}

const attachBtn: React.CSSProperties = {
  // h-7 w-7 rounded-md border border-stone-200/70 bg-white text-stone-500
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  height: 28, width: 28, borderRadius: 6, border: '1px solid rgba(231,229,228,0.7)',
  background: '#fff', cursor: 'pointer',
};
const chip: React.CSSProperties = {
  // rounded-md border border-stone-200/70 bg-stone-50/60 (#fafaf9 @ .6) px-1.5 py-0.5 text-[11px]
  display: 'flex', alignItems: 'center', gap: 4, borderRadius: 6,
  border: '1px solid rgba(231,229,228,0.7)', background: 'rgba(250,250,249,0.6)',
  padding: '2px 6px', fontSize: 11,
};
const chipX: React.CSSProperties = { borderRadius: 4, padding: 2, background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex' };
const sendBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', height: 32, padding: '0 12px',
  borderRadius: 6, border: 'none', background: '#2563eb', color: '#fff',
  fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: sans,
};
const stopBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', height: 32, padding: '0 12px',
  borderRadius: 6, border: 'none', background: 'transparent', color: '#57534e',
  fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: sans,
};
const inputBox: React.CSSProperties = {
  border: '1px solid #d6d3d1', borderRadius: 6, padding: '0 8px', fontSize: 12,
  color: '#1c1917', outline: 'none', fontFamily: sans, boxSizing: 'border-box',
  background: '#fff',
};
const textareaBox: React.CSSProperties = {
  width: '100%', border: '1px solid #d6d3d1', borderRadius: 6, padding: 8,
  fontSize: 12, lineHeight: 1.5, color: '#1c1917', outline: 'none',
  resize: 'none', fontFamily: sans, boxSizing: 'border-box', background: '#fff',
};
const kbChip: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 9999,
  background: '#fffbeb', padding: '2px 8px', fontSize: 10.5, color: '#b45309',
};
