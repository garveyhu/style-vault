import { PreviewFrame } from '../../../_layout';
import {
  ArrowDown,
  ArrowUp,
  Braces,
  ChevronDown,
  Pencil,
  Plus,
  Search,
  X,
} from 'lucide-react';

const SANS = 'Inter, system-ui, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

export default function GraphConfigFieldKit() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 760, margin: '0 auto', fontFamily: SANS, color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>
          COMPONENT · GRAPH NODE CONFIG KIT
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>
          画布节点配置控件套件
        </h1>

        {/* A · 提示词消息块 (signature) */}
        <Section title="A · 提示词消息块 PromptEditor">
          <PromptBlock />
        </Section>

        {/* B · 变量树选择器 popover */}
        <Section title="B · 变量树选择器 VarTreePicker">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
            <VarTrigger />
            <VarPopover />
          </div>
        </Section>

        {/* C · 常量·变量二态段控 */}
        <Section title="C · 常量·变量二态段控 ConstVarField">
          <ConstVarField />
        </Section>

        {/* D · 列声明表格编辑器 */}
        <Section title="D · 列声明表格编辑器 TableEditor">
          <TableEditor />
        </Section>

        {/* E · CodeMirror 单字段 */}
        <Section title="E · CodeMirror 单字段 CodeEditorField">
          <CodeField />
        </Section>

        {/* F · 滑块数字联动 */}
        <Section title="F · 滑块数字联动 SliderField">
          <SliderField />
        </Section>
      </div>
    </PreviewFrame>
  );
}

/* ─────────────────────────── A · 提示词消息块 ─────────────────────────── */

function PromptBlock() {
  return (
    <ControlShell label="系统提示词" required>
      <div
        style={{
          overflow: 'hidden',
          borderRadius: 12,
          border: '1px solid #e2e8f0',
          background: '#fff',
          boxShadow: '0 1px 2px rgb(0 0 0/0.03), 0 0 0 3px rgb(59 130 246/0.10)',
          borderColor: '#93c5fd',
        }}
      >
        {/* 头行 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(248,250,252,0.8)', padding: '6px 12px' }}>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#78716c' }}>
            SYSTEM
          </span>
          <span style={{ marginLeft: 'auto', fontSize: 10, color: '#d6d3d1', fontVariantNumeric: 'tabular-nums' }}>
            128 字
          </span>
          <VarTrigger />
        </div>
        {/* 编辑区 */}
        <div style={{ fontSize: 12.5, lineHeight: 1.7, padding: '9px 12px', fontFamily: SANS, color: '#44403c' }}>
          你是一名严谨的客服助手。基于知识库回答用户问题
          <VarChip name="kb_node.context" />
          ，并参考本轮输入
          <VarChip name="sys.query" />
          作答。
        </div>
      </div>
    </ControlShell>
  );
}

function VarChip({ name }: { name: string }) {
  const braceStyle: React.CSSProperties = {
    fontFamily: MONO,
    fontSize: 11,
    color: '#93c5fd',
    background: '#eff6ff',
    padding: '1.5px 0',
  };
  return (
    <span style={{ whiteSpace: 'nowrap' }}>
      <span style={{ ...braceStyle, borderRadius: '5px 0 0 5px', paddingLeft: 4 }}>{'{{#'}</span>
      <span style={{ fontFamily: MONO, fontSize: 11, color: '#2563eb', fontWeight: 500, background: '#eff6ff', padding: '1.5px 0' }}>
        {name}
      </span>
      <span style={{ ...braceStyle, borderRadius: '0 5px 5px 0', paddingRight: 4 }}>{'#}}'}</span>
    </span>
  );
}

/* ─────────────────────────── B · 变量树选择器 ─────────────────────────── */

function VarTrigger() {
  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        borderRadius: 6,
        border: '1px solid #e2e8f0',
        background: '#fff',
        color: '#78716c',
        padding: '4px 8px',
        fontSize: 11.5,
        cursor: 'pointer',
        fontFamily: SANS,
      }}
    >
      <Braces size={12} color="#78716c" />
      变量
      <ChevronDown size={12} color="#78716c" style={{ opacity: 0.5 }} />
    </button>
  );
}

function VarPopover() {
  return (
    <div
      style={{
        width: 256,
        borderRadius: 8,
        border: '1px solid #e7e5e0',
        background: '#fff',
        boxShadow: '0 8px 24px rgb(0 0 0/0.08), 0 2px 8px rgb(0 0 0/0.04)',
        overflow: 'hidden',
      }}
    >
      {/* 搜索行 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid #f5f5f4', padding: '6px 10px' }}>
        <Search size={12} color="#d6d3d1" />
        <span style={{ fontSize: 11.5, color: '#d6d3d1', fontFamily: SANS }}>搜索变量 / 节点…</span>
      </div>
      {/* 列表 */}
      <div style={{ maxHeight: 288, overflowY: 'auto', padding: '4px 0' }}>
        <GroupBlock label="系统变量">
          <VarRow name="sys.query" desc="本轮输入" />
          <VarRow name="sys.history" desc="对话历史" />
        </GroupBlock>
        <GroupBlock label="知识检索">
          <VarRow name="context" type="string" />
          <VarRow name="score" type="number" />
          <VarRow name="docs" type="array" />
        </GroupBlock>
      </div>
    </div>
  );
}

function GroupBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 2 }}>
      <div style={{ padding: '4px 10px', fontSize: 9.5, fontWeight: 500, letterSpacing: '0.025em', textTransform: 'uppercase', color: '#a8a29e', fontFamily: SANS }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function VarRow({ name, desc, type }: { name: string; desc?: string; type?: string }) {
  return (
    <button
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        textAlign: 'left',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      <span style={{ fontFamily: MONO, fontSize: 11, color: '#44403c' }}>{name}</span>
      {desc && <span style={{ marginLeft: 'auto', paddingLeft: 8, fontSize: 9.5, color: '#a8a29e', fontFamily: SANS }}>{desc}</span>}
      {type && <VarTypeChip type={type} style={{ marginLeft: 'auto' }} />}
    </button>
  );
}

const TYPE_HUE: Record<string, { bg: string; fg: string }> = {
  string: { bg: '#f0f9ff', fg: '#0284c7' },
  number: { bg: '#fffbeb', fg: '#d97706' },
  boolean: { bg: '#fff1f2', fg: '#e11d48' },
  object: { bg: '#f5f3ff', fg: '#7c3aed' },
  array: { bg: '#ecfdf5', fg: '#059669' },
  any: { bg: '#f5f5f4', fg: '#a8a29e' },
};

function VarTypeChip({ type, style }: { type: string; style?: React.CSSProperties }) {
  const hue = TYPE_HUE[type] ?? TYPE_HUE.any;
  return (
    <span
      style={{
        borderRadius: 4,
        padding: '1px 4px',
        fontFamily: MONO,
        fontSize: 9,
        lineHeight: 1,
        letterSpacing: '0.025em',
        background: hue.bg,
        color: hue.fg,
        ...style,
      }}
    >
      {type}
    </span>
  );
}

/* ─────────────────────────── C · 二态段控 ─────────────────────────── */

function ConstVarField() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* 变量态 */}
      <ControlShell label="输入值" right={<SegSwitch active="var" />}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              borderRadius: 6,
              border: '1px solid #ddd6fe',
              background: '#f5f3ff',
              padding: '4px 8px',
              fontSize: 11,
              color: '#6d28d9',
            }}
          >
            <Braces size={12} color="#a78bfa" />
            <span style={{ fontFamily: MONO }}>llm_node.text</span>
          </span>
          <button style={varTinyBtn}>替换 <ChevronDown size={12} style={{ opacity: 0.5 }} /></button>
          <button style={{ borderRadius: 6, padding: 4, color: '#a8a29e', background: 'transparent', border: 'none', cursor: 'pointer', display: 'inline-flex' }}>
            <X size={12} color="#a8a29e" />
          </button>
        </div>
      </ControlShell>
      {/* 未选态 */}
      <ControlShell label="可选输入" right={<SegSwitch active="var" />}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            borderRadius: 6,
            border: '1px dashed #cbd5e1',
            background: 'rgba(248,250,252,0.6)',
            padding: '6px 8px',
          }}
        >
          <span style={{ fontSize: 11, color: '#a8a29e' }}>未选择变量</span>
          <span style={{ marginLeft: 'auto' }}>
            <button style={varTinyBtn}>选择变量 <ChevronDown size={12} style={{ opacity: 0.5 }} /></button>
          </span>
        </div>
      </ControlShell>
      {/* 常量态 */}
      <ControlShell label="常量值" right={<SegSwitch active="const" />}>
        <input
          readOnly
          value="gpt-4o-mini"
          style={{
            height: 32,
            width: '100%',
            borderRadius: 6,
            border: '1px solid #d6d3d1',
            background: '#fff',
            padding: '0 12px',
            fontSize: 13,
            color: '#44403c',
            outline: 'none',
          }}
        />
      </ControlShell>
    </div>
  );
}

const varTinyBtn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  borderRadius: 6,
  border: '1px solid #e2e8f0',
  background: '#fff',
  color: '#78716c',
  padding: '2px 6px',
  fontSize: 10.5,
  cursor: 'pointer',
  fontFamily: SANS,
};

function SegSwitch({ active }: { active: 'const' | 'var' }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 1, borderRadius: 8, background: '#f1f5f9', padding: 2 }}>
      <SegBtn on={active === 'const'}><Pencil size={12} /></SegBtn>
      <SegBtn on={active === 'var'}><Braces size={12} /></SegBtn>
    </div>
  );
}

function SegBtn({ on, children }: { on: boolean; children: React.ReactNode }) {
  return (
    <button
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        padding: '4px 6px',
        border: 'none',
        cursor: 'pointer',
        background: on ? '#fff' : 'transparent',
        color: on ? '#44403c' : '#a8a29e',
        boxShadow: on ? '0 1px 2px rgb(0 0 0/0.05)' : 'none',
      }}
    >
      {children}
    </button>
  );
}

/* ─────────────────────────── D · 表格编辑器 ─────────────────────────── */

function TableEditor() {
  return (
    <ControlShell label="输入参数">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <TableRow idx={1} name="query" type="string" />
        <TableRow idx={2} name="top_k" type="number" />
        {/* 添加行 */}
        <button
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            borderRadius: 8,
            border: '1px dashed #cbd5e1',
            background: 'rgba(248,250,252,0.6)',
            padding: '6px 0',
            fontSize: 11,
            fontWeight: 500,
            color: '#78716c',
            cursor: 'pointer',
            fontFamily: SANS,
          }}
        >
          <Plus size={14} color="#78716c" />
          添加一行
        </button>
      </div>
    </ControlShell>
  );
}

function TableRow({ idx, name, type }: { idx: number; name: string; type: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        borderRadius: 8,
        border: '1px solid #e2e8f0',
        background: '#fff',
        padding: 8,
        boxShadow: '0 1px 0 rgba(0,0,0,0.02)',
      }}
    >
      <span
        style={{
          display: 'flex',
          height: 16,
          width: 16,
          flexShrink: 0,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          background: '#f5f5f4',
          fontFamily: MONO,
          fontSize: 10,
          color: '#78716c',
        }}
      >
        {idx}
      </span>
      <input readOnly value={name} style={cellInput} />
      <div style={{ flexShrink: 0 }}>
        <input readOnly value={type} style={{ ...cellInput, width: 76, fontFamily: MONO }} />
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', flexShrink: 0, alignItems: 'center', gap: 2 }}>
        <RowIcon dim><ArrowUp size={12} color="#a8a29e" /></RowIcon>
        <RowIcon><ArrowDown size={12} color="#a8a29e" /></RowIcon>
        <RowIcon><X size={12} color="#a8a29e" /></RowIcon>
      </div>
    </div>
  );
}

const cellInput: React.CSSProperties = {
  height: 24,
  minWidth: 0,
  flex: 1,
  borderRadius: 6,
  border: '1px solid #d6d3d1',
  background: '#fff',
  padding: '0 6px',
  fontSize: 11,
  color: '#44403c',
  outline: 'none',
};

function RowIcon({ children, dim }: { children: React.ReactNode; dim?: boolean }) {
  return (
    <button
      style={{
        borderRadius: 4,
        padding: 2,
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        display: 'inline-flex',
        opacity: dim ? 0.3 : 1,
      }}
    >
      {children}
    </button>
  );
}

/* ─────────────────────────── E · CodeMirror 单字段 ─────────────────────────── */

function CodeField() {
  const lines = [
    'def main(query: str) -> dict:',
    '    cleaned = query.strip().lower()',
    '    return {"result": cleaned}',
  ];
  return (
    <ControlShell label="执行代码">
      <div style={{ overflow: 'hidden', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff' }}>
        {/* langBadge 行 */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid #f1f5f9', background: '#f8fafc', padding: '4px 8px' }}>
          <span
            style={{
              borderRadius: 4,
              background: '#f1f5f9',
              padding: '1px 6px',
              fontFamily: MONO,
              fontSize: 9.5,
              letterSpacing: '0.025em',
              textTransform: 'uppercase',
              color: '#a8a29e',
            }}
          >
            python
          </span>
        </div>
        {/* 编辑器 */}
        <div style={{ fontFamily: MONO, fontSize: 11.5, padding: '6px 0', lineHeight: 1.6 }}>
          {lines.map((ln, i) => (
            <div key={i} style={{ display: 'flex', background: i === 1 ? 'rgba(0,0,0,0.02)' : 'transparent' }}>
              <span style={{ width: 28, flexShrink: 0, textAlign: 'right', paddingRight: 8, color: '#d6d3d1', userSelect: 'none' }}>
                {i + 1}
              </span>
              <span style={{ color: '#44403c', whiteSpace: 'pre' }}>{ln}</span>
            </div>
          ))}
        </div>
      </div>
    </ControlShell>
  );
}

/* ─────────────────────────── F · 滑块数字联动 ─────────────────────────── */

function SliderField() {
  return (
    <ControlShell
      label="Temperature"
      right={
        <input
          readOnly
          value="0.7"
          style={{
            height: 24,
            width: 80,
            borderRadius: 6,
            border: '1px solid #d6d3d1',
            background: '#fff',
            padding: '0 8px',
            textAlign: 'right',
            fontFamily: MONO,
            fontSize: 11.5,
            color: '#44403c',
            fontVariantNumeric: 'tabular-nums',
            outline: 'none',
          }}
        />
      }
    >
      <input type="range" min={0} max={2} step={0.1} defaultValue={0.7} style={{ marginTop: 2, width: '100%', accentColor: '#2563eb', cursor: 'pointer' }} />
      <div style={{ marginTop: 2, display: 'flex', justifyContent: 'space-between', fontSize: 9.5, color: '#a8a29e', fontVariantNumeric: 'tabular-nums' }}>
        <span>0</span>
        <span>2</span>
      </div>
    </ControlShell>
  );
}

/* ─────────────────────────── 通用 ControlField 壳 ─────────────────────────── */

function ControlShell({
  label,
  required,
  right,
  children,
}: {
  label: string;
  required?: boolean;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div style={{ marginBottom: 6, display: 'flex', minHeight: 16, alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.01em', color: '#44403c' }}>{label}</span>
        {required && <span style={{ fontSize: 11, lineHeight: 1, color: '#f43f5e' }}>*</span>}
        {right && <span style={{ marginLeft: 'auto' }}>{right}</span>}
      </div>
      {children}
    </div>
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
