import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const SANS = 'Inter, system-ui, sans-serif';

export default function ThemeableTextFields() {
  const [focused, setFocused] = useState<string | null>(null);
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 480, margin: '0 auto', fontFamily: SANS, color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>
          COMPONENT · TEXTAREA + LABEL
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>
          紧凑文本域与标签
        </h1>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            padding: 20,
            background: '#fff',
            border: '1px solid #e7e5e0',
            borderRadius: 12,
            boxShadow: '0 1px 3px rgb(0 0 0/0.05), 0 2px 8px rgb(0 0 0/0.03)',
          }}
        >
          {/* 普通态 */}
          <Field id="a" label="应用描述">
            <textarea
              placeholder="描述这个应用做什么…"
              defaultValue="基于企业知识库的客服问答助手，支持多轮对话与引用溯源。"
              onFocus={() => setFocused('a')}
              onBlur={() => setFocused(null)}
              style={textareaStyle(focused === 'a')}
            />
          </Field>

          {/* 聚焦态（常显蓝环示意） */}
          <Field id="b" label="系统提示词（聚焦态）">
            <textarea
              defaultValue="你是一名严谨的客服助手。"
              style={textareaStyle(true)}
            />
          </Field>

          {/* disabled 态 */}
          <Field id="c" label="只读字段" disabled>
            <textarea readOnly disabled value="该字段由系统生成，不可编辑。" style={textareaStyle(false, true)} />
          </Field>
        </div>
      </div>
    </PreviewFrame>
  );
}

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
