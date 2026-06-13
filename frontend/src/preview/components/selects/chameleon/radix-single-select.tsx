import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';
import { Check, ChevronDown } from 'lucide-react';

const SANS = 'Inter, system-ui, sans-serif';

const OPTIONS = ['chat 对话', 'completion 补全', 'embedding 向量', 'rerank 重排', 'image 生图'];

export default function RadixSingleSelect() {
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState('chat 对话');
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 480, margin: '0 auto', fontFamily: SANS, color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>
          COMPONENT · RADIX SINGLE SELECT
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>Radix 单选下拉</h1>

        <Section title="trigger 态">
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {/* 普通 */}
            <Trigger label="chat 对话" focused={false} width={180} />
            {/* 聚焦（常显蓝环示意） */}
            <Trigger label="chat 对话" focused width={180} />
            {/* disabled */}
            <Trigger label="不可选" focused={false} width={180} disabled />
          </div>
        </Section>

        <Section title="content + item（pl-8 左对勾）">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 220 }}>
            <Trigger
              label={active}
              focused={focused}
              width={220}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
            {/* 浮层 */}
            <div
              style={{
                position: 'relative',
                maxHeight: 384,
                minWidth: 128,
                overflow: 'hidden',
                borderRadius: 6,
                border: '1px solid #e7e5e0',
                background: '#fff',
                color: '#1c1917',
                boxShadow: '0 8px 24px rgb(0 0 0/0.08), 0 2px 8px rgb(0 0 0/0.04)',
              }}
            >
              <div style={{ padding: 4 }}>
                {OPTIONS.map((opt, i) => (
                  <Item key={opt} label={opt} selected={active === opt} hovered={i === 1} onClick={() => setActive(opt)} />
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>
    </PreviewFrame>
  );
}

function Trigger({
  label,
  focused,
  width,
  disabled,
  onFocus,
  onBlur,
}: {
  label: string;
  focused: boolean;
  width: number;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}) {
  return (
    <button
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      style={{
        display: 'flex',
        width,
        height: 32,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 6,
        border: `1px solid ${focused ? '#3b82f6' : '#d6d3d1'}`,
        background: disabled ? '#f5f5f4' : '#fff',
        padding: '0 12px',
        fontSize: 13,
        color: disabled ? '#78716c' : '#1c1917',
        outline: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: focused ? '0 0 0 2px #dbeafe' : 'none',
        fontFamily: SANS,
      }}
    >
      <span>{label}</span>
      <ChevronDown size={16} color={disabled ? '#a8a29e' : '#1c1917'} style={{ opacity: 0.5 }} />
    </button>
  );
}

function Item({
  label,
  selected,
  hovered,
  onClick,
}: {
  label: string;
  selected: boolean;
  hovered?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        borderRadius: 2,
        padding: '6px 8px 6px 32px',
        fontSize: 13,
        textAlign: 'left',
        border: 'none',
        cursor: 'pointer',
        background: hovered ? '#f5f5f4' : 'transparent',
        color: '#1c1917',
        fontFamily: SANS,
      }}
    >
      <span style={{ position: 'absolute', left: 8, display: 'flex', height: 14, width: 14, alignItems: 'center', justifyContent: 'center' }}>
        {selected && <Check size={16} color="#1c1917" />}
      </span>
      {label}
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>
        {title}
      </div>
      {children}
    </div>
  );
}
