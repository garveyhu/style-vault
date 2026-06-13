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
const STONE_200 = '#e7e5e4';

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
        <Section title="B · 变量树选择器 VarTreePicker (sm/md 触发 + hover 态)">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <VarTrigger size="sm" />
              <VarTrigger size="md" />
              <VarTrigger size="md" hover />
            </div>
            <VarPopover />
          </div>
        </Section>

        {/* C · 常量·变量二态段控 */}
        <Section title="C · 常量·变量二态段控 ConstVarField">
          <ConstVarField />
        </Section>

        {/* D · 列声明表格编辑器 */}
        <Section title="D · 列声明表格编辑器 TableEditor (含 hover 态)">
          <TableEditor />
        </Section>

        {/* E · CodeMirror 单字段 */}
        <Section title="E · CodeMirror 单字段 CodeEditorField">
          <CodeField />
        </Section>

        {/* F · 滑块数字联动 */}
        <Section title="F · 滑块数字联动 SliderField (已设置 / 未设置)">
          <SliderFieldDemo />
        </Section>
      </div>
    </PreviewFrame>
  );
}

/* ─────────────────────────── A · 提示词消息块 ─────────────────────────── */

function PromptBlock() {
  return (
    <ControlShell label="系统提示词" required>
      {/* rounded-xl(12) border border-slate-200(#e2e8f0) focus-within:border-blue-300(#93c5fd) + shadow 0 0 0 3px rgb(59 130 246/.10) */}
      <div
        style={{
          overflow: 'hidden',
          borderRadius: 12,
          border: '1px solid #93c5fd',
          background: '#fff',
          boxShadow: '0 1px 2px rgb(0 0 0/0.03), 0 0 0 3px rgb(59 130 246/0.10)',
        }}
      >
        {/* 头行 bg-slate-50/80 px-3 py-1.5 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(248,250,252,0.8)', padding: '6px 12px' }}>
          {/* text-[10px] font-semibold tracking-[0.07em] text-stone-500 uppercase */}
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#78716c' }}>
            SYSTEM
          </span>
          {/* 字数：text-[10px] text-stone-300(#d6d3d1) tabular-nums */}
          <span style={{ marginLeft: 'auto', fontSize: 10, color: '#d6d3d1', fontVariantNumeric: 'tabular-nums' }}>
            128 字
          </span>
          {/* PromptEditor 头部 VarTreePicker 默认 size='sm' */}
          <VarTrigger size="sm" />
        </div>
        {/* 编辑区 sans 12.5px lineHeight 1.7 padding 9px 12px */}
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
  // .cm-pvar bg-blue-50(#eff6ff) fontSize 11 paddingTop/Bottom 1.5px；brace #93c5fd open/close 圆角 5px pad 4px；name #2563eb font-500
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

// 触发按钮：border-slate-200(#e2e8f0) text-stone-500 hover:border-blue-200(#bfdbfe) hover:bg-blue-50(#eff6ff) hover:text-blue-600(#2563eb)
// sm: px-1.5 py-0.5 text-[10.5px]（padding 2px 6px）/ md: px-2 py-1 text-[11.5px]（padding 4px 8px）
function VarTrigger({ size = 'sm', hover }: { size?: 'sm' | 'md'; hover?: boolean }) {
  const sm = size === 'sm';
  const color = hover ? '#2563eb' : '#78716c';
  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        borderRadius: 6,
        border: `1px solid ${hover ? '#bfdbfe' : '#e2e8f0'}`,
        background: hover ? '#eff6ff' : '#fff',
        color,
        padding: sm ? '2px 6px' : '4px 8px',
        fontSize: sm ? 10.5 : 11.5,
        cursor: 'pointer',
        fontFamily: SANS,
      }}
    >
      <Braces size={12} color={color} />
      变量
      <ChevronDown size={12} color={color} style={{ opacity: 0.5 }} />
    </button>
  );
}

function VarPopover() {
  return (
    // PopoverContent w-64(256) border-stone-200(#e7e5e4) p-0；shadow-pop
    <div
      style={{
        width: 256,
        borderRadius: 8,
        border: `1px solid ${STONE_200}`,
        background: '#fff',
        boxShadow: '0 8px 24px rgb(0 0 0/0.08), 0 2px 8px rgb(0 0 0/0.04)',
        overflow: 'hidden',
      }}
    >
      {/* 搜索行 border-b border-stone-100(#f5f5f4) px-2.5 py-1.5；Search h-3 w-3(12) text-stone-300 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid #f5f5f4', padding: '6px 10px' }}>
        <Search size={12} color="#d6d3d1" />
        <span style={{ fontSize: 11.5, color: '#d6d3d1', fontFamily: SANS }}>搜索变量 / 节点…</span>
      </div>
      {/* 列表 max-h-72(288) py-1 */}
      <div style={{ maxHeight: 288, overflowY: 'auto', padding: '4px 0' }}>
        <GroupBlock label="系统变量">
          <VarRow name="sys.query" desc="本轮输入" />
          <VarRow name="sys.history" desc="对话历史" />
        </GroupBlock>
        <GroupBlock label="知识检索">
          {/* Row hover:bg-blue-50(#eff6ff) —— 演示 context 行 hover 态 */}
          <VarRow name="context" type="string" hover />
          <VarRow name="score" type="number" />
          <VarRow name="enabled" type="boolean" />
          <VarRow name="meta" type="object" />
          <VarRow name="docs" type="array" />
        </GroupBlock>
      </div>
    </div>
  );
}

function GroupBlock({ label, children }: { label: string; children: React.ReactNode }) {
  // px-2.5 py-1 text-[9.5px] font-medium tracking-wide text-stone-400 uppercase
  return (
    <div style={{ marginBottom: 2 }}>
      <div style={{ padding: '4px 10px', fontSize: 9.5, fontWeight: 500, letterSpacing: '0.025em', textTransform: 'uppercase', color: '#a8a29e', fontFamily: SANS }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function VarRow({ name, desc, type, hover }: { name: string; desc?: string; type?: string; hover?: boolean }) {
  // Row px-2.5 py-1 gap-1.5 hover:bg-blue-50；name font-mono text-[11px] text-stone-700(#44403c)
  return (
    <button
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        textAlign: 'left',
        background: hover ? '#eff6ff' : 'transparent',
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

// var-type-chip TYPE_STYLE（Tailwind 调色板）
const TYPE_HUE: Record<string, { bg: string; fg: string }> = {
  string: { bg: '#f0f9ff', fg: '#0284c7' }, // sky-50 / sky-600
  number: { bg: '#fffbeb', fg: '#d97706' }, // amber-50 / amber-600
  boolean: { bg: '#fff1f2', fg: '#e11d48' }, // rose-50 / rose-600
  object: { bg: '#f5f3ff', fg: '#7c3aed' }, // violet-50 / violet-600
  array: { bg: '#ecfdf5', fg: '#059669' }, // emerald-50 / emerald-600
  any: { bg: '#f5f5f4', fg: '#a8a29e' }, // stone-100 / stone-400
};

function VarTypeChip({ type, style }: { type: string; style?: React.CSSProperties }) {
  // rounded(4) px-1(4) py-px(1) font-mono text-[9px] leading-none tracking-wide(0.025em)
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
      {/* 变量态：chip border-violet-200(#ddd6fe) bg-violet-50(#f5f3ff) text-violet-700(#6d28d9) + Braces text-violet-400(#a78bfa) */}
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
          {/* 替换 = 行内 VarTreePicker sm；X 清除 rounded-md p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-600 */}
          <button style={varTinyBtn}>替换 <ChevronDown size={12} style={{ opacity: 0.5 }} /></button>
          <button style={{ borderRadius: 6, padding: 4, color: '#a8a29e', background: 'transparent', border: 'none', cursor: 'pointer', display: 'inline-flex' }}>
            <X size={12} color="#a8a29e" />
          </button>
        </div>
      </ControlShell>
      {/* 未选态：border-dashed border-slate-300(#cbd5e1) bg-slate-50/60 px-2 py-1.5 */}
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
      {/* 常量态：renderConst 通用 Input h-8(32) border-stone-300(#d6d3d1) text-[13px] */}
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

// 替换/选择变量 tinyBtn = 行内 VarTreePicker（border-slate-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600）
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
  // 容器 rounded-lg bg-slate-100(#f1f5f9) p-0.5(2) gap-px(1)
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 1, borderRadius: 8, background: '#f1f5f9', padding: 2 }}>
      <SegBtn on={active === 'const'}><Pencil size={12} /></SegBtn>
      <SegBtn on={active === 'var'}><Braces size={12} /></SegBtn>
    </div>
  );
}

function SegBtn({ on, children }: { on: boolean; children: React.ReactNode }) {
  // 非 active hover:text-stone-600(#57534e)；active bg-white text-stone-700(#44403c) shadow-sm
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
        boxShadow: on ? '0 1px 2px 0 rgb(0 0 0/0.05)' : 'none',
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
        {/* hover:border-slate-300(#cbd5e1) + 删除按钮 hover:bg-rose-50/text-rose-600 演示 */}
        <TableRow idx={2} name="top_k" type="number" hover />
        {/* 添加行 border-dashed border-slate-300(#cbd5e1) hover:border-blue-300/bg-blue-50/text-blue-600 */}
        <button
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            borderRadius: 8,
            border: '1px dashed #93c5fd',
            background: '#eff6ff',
            padding: '6px 0',
            fontSize: 11,
            fontWeight: 500,
            color: '#2563eb',
            cursor: 'pointer',
            fontFamily: SANS,
          }}
        >
          <Plus size={14} color="#2563eb" />
          添加一行
        </button>
      </div>
    </ControlShell>
  );
}

function TableRow({ idx, name, type, hover }: { idx: number; name: string; type: string; hover?: boolean }) {
  // 卡片 rounded-lg border border-slate-200(#e2e8f0) p-2(8) shadow 0 1px 0 rgba(0,0,0,.02) hover:border-slate-300(#cbd5e1)
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        borderRadius: 8,
        border: `1px solid ${hover ? '#cbd5e1' : '#e2e8f0'}`,
        background: '#fff',
        padding: 8,
        boxShadow: '0 1px 0 rgba(0,0,0,0.02)',
      }}
    >
      {/* 序号 h-4 w-4(16) rounded(4) bg-stone-100(#f5f5f4) font-mono text-[10px] text-stone-500(#78716c) */}
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
        {/* 上移/下移 hover:bg-stone-100 hover:text-stone-700；上移在首行 disabled:opacity-30 */}
        <RowIcon dim><ArrowUp size={12} color="#a8a29e" /></RowIcon>
        <RowIcon><ArrowDown size={12} color="#a8a29e" /></RowIcon>
        {/* 删除 hover:bg-rose-50(#fff1f2) hover:text-rose-600(#e11d48) —— hover 行演示 */}
        {hover ? (
          <button style={{ borderRadius: 4, padding: 2, border: 'none', background: '#fff1f2', cursor: 'pointer', display: 'inline-flex' }}>
            <X size={12} color="#e11d48" />
          </button>
        ) : (
          <RowIcon><X size={12} color="#a8a29e" /></RowIcon>
        )}
      </div>
    </div>
  );
}

// 单元格 Input h-6(24) text-[11px] border-stone-300(#d6d3d1)
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
      {/* 外壳 rounded-lg(8) border border-slate-200(#e2e8f0) */}
      <div style={{ overflow: 'hidden', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff' }}>
        {/* langBadge 行 border-b border-slate-100(#f1f5f9) bg-slate-50(#f8fafc) px-2 py-1 */}
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
        {/* 编辑器 fontSize 11.5 .cm-content padding 6px 0；CodeMirror 默认行高 ~1.4；gutter color stone-300(#d6d3d1) */}
        <div style={{ fontFamily: MONO, fontSize: 11.5, padding: '6px 0', lineHeight: 1.4 }}>
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

function SliderFieldDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* 已设置态 */}
      <SliderField value="0.7" />
      {/* 未设置态：value===undefined → 数字框占位 + 滑块 opacity-60 */}
      <SliderField unset />
    </div>
  );
}

function SliderField({ value, unset }: { value?: string; unset?: boolean }) {
  return (
    <ControlShell
      label="Temperature"
      right={
        // 数字框 h-6(24) w-20(80) text-right font-mono text-[11.5px] tabular-nums；未设置时显占位
        <input
          readOnly
          value={unset ? '' : value}
          placeholder="1"
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
      {/* range accent-blue-600(#2563eb)；value===undefined 时 opacity-60 */}
      <input type="range" min={0} max={2} step={0.1} defaultValue={unset ? 1 : 0.7} style={{ marginTop: 2, width: '100%', accentColor: '#2563eb', cursor: 'pointer', opacity: unset ? 0.6 : 1 }} />
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
