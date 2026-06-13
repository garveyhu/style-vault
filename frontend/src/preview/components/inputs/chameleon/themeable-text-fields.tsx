import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const SANS = 'Inter, system-ui, sans-serif';
const STONE_200 = '#e7e5e4';

export default function ThemeableTextFields() {
  const [focused, setFocused] = useState<string | null>(null);
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 480, margin: '0 auto', fontFamily: SANS, color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>
          COMPONENT · INPUT + TEXTAREA + LABEL
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>
          蓝聚焦表单原语三件套
        </h1>

        {/* ── 单行 Input (h-8 · text-[13px]) 全状态 ── */}
        <div style={cardStyle}>
          <div style={sectionLabel}>Input — h-8 单行（border-stone-300 · 蓝聚焦 · 错误红边 · disabled）</div>

          {/* 普通态 */}
          <Field id="ia" label="应用名称">
            <input
              id="ia"
              placeholder="给应用起个名字…"
              defaultValue="客服问答助手"
              onFocus={() => setFocused('ia')}
              onBlur={() => setFocused(null)}
              style={inputStyle(focused === 'ia')}
            />
          </Field>

          {/* 聚焦态 */}
          <Field id="ib" label="标识 ID（聚焦态）">
            <input id="ib" defaultValue="agent-svc-001" style={inputStyle(true)} />
          </Field>

          {/* 错误态 border-red-500 focus:ring-red-100 */}
          <Field id="ic" label="API Key（错误态）">
            <input id="ic" defaultValue="sk-***" style={inputStyle(false, { error: true })} />
            <span style={{ fontSize: 11, color: '#ef4444', lineHeight: 1.3 }}>Key 格式不合法</span>
          </Field>

          {/* disabled 态 */}
          <Field id="id" label="创建时间" disabled>
            <input id="id" readOnly disabled value="2026-06-13 09:42:11" style={inputStyle(false, { disabled: true })} />
          </Field>
        </div>

        {/* ── 多行 Textarea (min-h-[72px] · py-1.5) 全状态 ── */}
        <div style={{ ...cardStyle, marginTop: 18 }}>
          <div style={sectionLabel}>Textarea — min-h-[72px] 多行（同款蓝 ring · 无 error/mono · py-1.5）</div>

          {/* 普通态 */}
          <Field id="ta" label="应用描述">
            <textarea
              id="ta"
              placeholder="描述这个应用做什么…"
              defaultValue="基于企业知识库的客服问答助手，支持多轮对话与引用溯源。"
              onFocus={() => setFocused('ta')}
              onBlur={() => setFocused(null)}
              style={textareaStyle(focused === 'ta')}
            />
          </Field>

          {/* 聚焦态 */}
          <Field id="tb" label="系统提示词（聚焦态）">
            <textarea id="tb" defaultValue="你是一名严谨的客服助手。" style={textareaStyle(true)} />
          </Field>

          {/* disabled 态 */}
          <Field id="tc" label="只读字段" disabled>
            <textarea id="tc" readOnly disabled value="该字段由系统生成，不可编辑。" style={textareaStyle(false, true)} />
          </Field>
        </div>
      </div>
    </PreviewFrame>
  );
}

const cardStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 18,
  padding: 20,
  background: '#fff',
  border: `1px solid ${STONE_200}`,
  borderRadius: 12,
  boxShadow: '0 1px 3px rgb(0 0 0/0.05), 0 2px 8px rgb(0 0 0/0.03)',
};

const sectionLabel: React.CSSProperties = {
  fontSize: 10.5,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  color: '#a8a29e',
};

function Field({
  id,
  label,
  disabled,
  children,
}: {
  id: string;
  label: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {/* Label: text-[12px] font-medium leading-none text-stone-600(#57534e) peer-disabled:opacity-70 */}
      <label
        htmlFor={id}
        style={{
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 1,
          color: '#57534e',
          cursor: disabled ? 'not-allowed' : undefined,
          opacity: disabled ? 0.7 : 1,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

// Input: h-8(32) rounded-md(6) border-stone-300(#d6d3d1) px-3(12) text-[13px]
//        focus:border-blue-500(#3b82f6) focus:ring-2 ring-blue-100(#dbeafe)
//        error:border-red-500(#ef4444) focus:ring-red-100(#fee2e2)
//        disabled:bg-stone-100(#f5f5f4) text-stone-500(#78716c)
function inputStyle(focused: boolean, opts?: { error?: boolean; disabled?: boolean }): React.CSSProperties {
  const error = opts?.error;
  const disabled = opts?.disabled;
  const borderColor = error ? '#ef4444' : focused ? '#3b82f6' : '#d6d3d1';
  const ring = error ? '0 0 0 2px #fee2e2' : focused ? '0 0 0 2px #dbeafe' : 'none';
  return {
    height: 32,
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: 6,
    border: `1px solid ${borderColor}`,
    background: disabled ? '#f5f5f4' : '#fff',
    padding: '0 12px',
    fontSize: 13,
    fontFamily: SANS,
    color: disabled ? '#78716c' : '#1c1917',
    outline: 'none',
    boxShadow: error ? '0 0 0 2px #fee2e2' : ring,
    cursor: disabled ? 'not-allowed' : undefined,
  };
}

// Textarea: w-full min-h-[72px] rounded-md(6) border-stone-300 px-3 py-1.5(6) text-[13px]
//           focus:border-blue-500 ring-2 ring-blue-100；disabled bg-stone-100 text-stone-500
function textareaStyle(focused: boolean, disabled?: boolean): React.CSSProperties {
  return {
    width: '100%',
    minHeight: 72,
    boxSizing: 'border-box',
    borderRadius: 6,
    border: `1px solid ${focused ? '#3b82f6' : '#d6d3d1'}`,
    background: disabled ? '#f5f5f4' : '#fff',
    padding: '6px 12px',
    fontSize: 13,
    fontFamily: SANS,
    lineHeight: 1.5,
    color: disabled ? '#78716c' : '#1c1917',
    outline: 'none',
    resize: 'vertical',
    boxShadow: focused ? '0 0 0 2px #dbeafe' : 'none',
    cursor: disabled ? 'not-allowed' : undefined,
  };
}
