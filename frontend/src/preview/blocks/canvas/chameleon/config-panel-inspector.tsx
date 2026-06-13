import { PreviewFrame } from '../../../_layout';
import {
  ChevronDown,
  Copy,
  GitBranch,
  HelpCircle,
  MoreHorizontal,
  Pencil,
  Play,
  Plus,
  Trash2,
} from 'lucide-react';

/**
 * config-panel-inspector · 画布右侧节点配置 inspector + 条件 builder
 * 源码：node-inspector.tsx + panel-kit.tsx + panel-tabs.tsx + if-else-condition.tsx + node-toolbar.tsx
 * 1:1：h-9 图标块 / 纯文本名字输入 / 下划线 Tab / Section / IF-ELSE 卡 / AND-OR 胶囊 /
 *      子分组按钮 / VarTypeChip 按类型上色 / CheckboxRow+Switch / hover 快捷条
 */

const FONT = 'Inter, system-ui, sans-serif';
const MONO = 'JetBrains Mono, monospace';

// VarTypeChip 按类型上色（var-type-chip.tsx TYPE_STYLE）
const VAR_TYPE_STYLE: Record<string, { bg: string; color: string }> = {
  string: { bg: '#f0f9ff', color: '#0284c7' }, // sky-50 / sky-600
  number: { bg: '#fffbeb', color: '#d97706' }, // amber-50 / amber-600
  boolean: { bg: '#fff1f2', color: '#e11d48' }, // rose-50 / rose-600
  object: { bg: '#f5f3ff', color: '#7c3aed' }, // violet-50 / violet-600
  array: { bg: '#ecfdf5', color: '#059669' }, // emerald-50 / emerald-600
  any: { bg: '#f5f5f4', color: '#a8a29e' }, // stone-100 / stone-400
};

export default function ConfigPanelInspector() {
  return (
    <PreviewFrame bg="#f4f3ee" padded>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', height: 720, fontFamily: FONT }}>
        {/* 节点 hover 快捷条（node-toolbar.tsx h-7 rounded-lg border-stone-200/80 bg-white/95 shadow-card） */}
        <div style={{ position: 'absolute', top: 40, left: 8 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              height: 28,
              borderRadius: 8,
              border: '1px solid rgba(231,229,224,0.8)',
              background: 'rgba(255,255,255,0.95)',
              padding: '2px 4px',
              boxShadow: '0 1px 3px rgb(0 0 0 / 5%), 0 2px 8px rgb(0 0 0 / 3%)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <button style={miniBtn} title="测试此节点"><Play size={14} color="#78716c" /></button>
            <button style={miniBtn} title="重命名"><Pencil size={14} color="#78716c" /></button>
            <button style={miniBtn} title="复制节点"><Copy size={14} color="#78716c" /></button>
            <span style={{ margin: '0 2px', height: 14, width: 1, background: '#e7e5e4' }} />
            {/* 删除：hover:bg-rose-50 hover:text-rose-600（#e11d48），常态 stone-500 */}
            <button style={miniBtn} title="删除节点"><Trash2 size={14} color="#78716c" /></button>
          </div>
        </div>

        {/* 右侧悬浮 inspector 外壳：bg-warm-2/95 = rgba(244,243,238,0.95) rounded-xl shadow-xl */}
        <div
          style={{
            width: 360,
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid rgba(231,229,224,0.7)',
            background: 'rgba(244,243,238,0.95)',
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 10%), 0 8px 10px -6px rgb(0 0 0 / 10%)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <aside style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
            {/* 左缘拖拽把手 */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'col-resize' }}>
              <span style={{ height: 40, width: 1, borderRadius: 1, background: '#e2e8f0' }} />
            </div>

            {/* header：sticky border-b border-slate-200/80 bg-white/90 */}
            <header
              style={{
                borderBottom: '1px solid rgba(226,232,240,0.8)',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(2px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px 10px' }}>
                {/* 图标块 h-9 w-9 rounded-xl shadow-sm ring-1（if_else: bg-amber-50 #fffbeb / amber-700 #b45309 / ring-amber-200 #fde68a） */}
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 36,
                    width: 36,
                    borderRadius: 12,
                    background: '#fffbeb',
                    color: '#b45309',
                    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 5%), inset 0 0 0 1px #fde68a',
                  }}
                >
                  <GitBranch size={18} />
                </span>
                {/* 纯文本观感名字输入 text-[15px] font-semibold tracking-tight text-stone-900 */}
                <input
                  defaultValue="按分数路由"
                  style={{
                    marginLeft: -6,
                    height: 32,
                    flex: 1,
                    minWidth: 0,
                    borderRadius: 6,
                    border: 'none',
                    background: 'transparent',
                    padding: '0 6px',
                    fontSize: 15,
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    color: '#1c1917',
                    outline: 'none',
                  }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginRight: -4 }}>
                  <button style={hdrBtn} title="测试此节点"><Play size={15} color="#a8a29e" /></button>
                  <button style={hdrBtn} title="更多操作"><MoreHorizontal size={15} color="#a8a29e" /></button>
                </div>
              </div>
              {/* 下划线 Tab（panel-tabs.tsx：设置 / 上次运行） */}
              <div style={{ padding: '0 20px', display: 'flex', alignItems: 'center', gap: 20 }}>
                <TabItem active>设置</TabItem>
                <TabItem>上次运行</TabItem>
              </div>
            </header>

            <div style={{ padding: '4px 20px 24px', overflowY: 'auto' }}>
              {/* if_else 条件 builder */}
              <div style={{ paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {/* ModeTab 行 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <label style={{ flex: 1, fontSize: 11.5, fontWeight: 500, color: '#57534e' }}>条件</label>
                  <ModeTab active>简单</ModeTab>
                  <ModeTab>多分支</ModeTab>
                  <ModeTab>高级 JSON</ModeTab>
                </div>

                {/* IF 卡 rounded-xl border-slate-200 bg-slate-50 p-2.5 */}
                <div style={{ borderRadius: 12, border: '1px solid #e2e8f0', background: '#f8fafc', padding: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <CaseBadge>IF</CaseBadge>
                    <span style={{ fontSize: 10.5, color: '#a8a29e' }}>命中走 true 出边</span>
                  </div>
                  <CondRow field="user.score" op="≥ 大于等于" value="80" />
                  {/* AND/OR 胶囊 */}
                  <div style={{ display: 'flex', justifyContent: 'center', margin: '6px 0' }}>
                    <button
                      style={{
                        borderRadius: 9999,
                        border: '1px solid #bfdbfe',
                        background: '#eff6ff',
                        padding: '1px 8px',
                        fontFamily: MONO,
                        fontSize: 9.5,
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                        color: '#2563eb',
                        cursor: 'pointer',
                      }}
                    >
                      且 AND
                    </button>
                  </div>
                  <CondRow field="user.vip" op="= 等于" value="true" />
                  {/* 底部两按钮：添加条件（AND）+ 子分组 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
                    <button style={groupBtn('#a8a29e')}>
                      <Plus size={12} /> 添加条件（AND）
                    </button>
                    <button style={groupBtn('#60a5fa')}>
                      <Plus size={12} /> 子分组
                    </button>
                  </div>
                </div>

                {/* ELSE 卡 */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    borderRadius: 12,
                    border: '1px dashed #e2e8f0',
                    background: 'rgba(248,250,252,0.6)',
                    padding: '8px 10px',
                  }}
                >
                  <span style={{ borderRadius: 6, background: '#e2e8f0', padding: '2px 6px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#78716c' }}>
                    ELSE
                  </span>
                  <span style={{ fontSize: 10.5, lineHeight: 1.5, color: '#a8a29e' }}>以上条件不满足时，走 false 出边。</span>
                </div>
              </div>

              {/* CheckboxRow + Switch（rounded-lg border-slate-200 bg-white px-2.5 py-2） */}
              <section style={{ paddingTop: 16 }}>
                <SectionHead title="高级" />
                <div style={{ marginTop: 10 }}>
                  <CheckboxRow label="严格类型匹配" checked />
                </div>
              </section>

              {/* 输出变量 Section（defaultOpen=false → 折叠图标 -90°，这里展开示意） */}
              <section style={{ paddingTop: 16 }}>
                <SectionHead title="输出变量" />
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <OutputRow field="branch" type="string" />
                  <OutputRow field="value" type="any" />
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </PreviewFrame>
  );
}

function TabItem({ active, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <button
      style={{
        position: 'relative',
        marginBottom: -1,
        padding: '10px 0',
        fontSize: 12.5,
        fontWeight: 600,
        letterSpacing: '-0.01em',
        color: active ? '#2563eb' : '#a8a29e',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {children}
      {active && (
        <span style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 2, borderRadius: 9999, background: '#3b82f6' }} />
      )}
    </button>
  );
}

function ModeTab({ active, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <button
      style={{
        borderRadius: 4,
        padding: '2px 6px',
        fontSize: 10.5,
        background: active ? '#dbeafe' : 'transparent',
        color: active ? '#1d4ed8' : '#a8a29e',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

// Section 标题：ChevronDown h-3 w-3 text-stone-300(#d6d3d1) + 信号字 text-[10.5px] font-semibold tracking-[0.06em] text-stone-500 uppercase
function SectionHead({ title }: { title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <ChevronDown size={12} color="#d6d3d1" />
      <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#78716c' }}>
        {title}
      </span>
    </div>
  );
}

function CaseBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        borderRadius: 6,
        background: '#fef3c7',
        padding: '2px 6px',
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        color: '#b45309',
      }}
    >
      {children}
    </span>
  );
}

function groupBtn(color: string): React.CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    borderRadius: 6,
    padding: '2px 6px',
    fontSize: 10.5,
    color,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  };
}

function CondRow({ field, op, value }: { field: string; op: string; value: string }) {
  return (
    <div style={{ borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <input
          defaultValue={field}
          style={{ height: 32, flex: 1, minWidth: 0, borderRadius: 6, border: '1px solid #d6d3d1', padding: '0 8px', fontFamily: MONO, fontSize: 12, color: '#1c1917', outline: 'none', boxSizing: 'border-box' }}
        />
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
            width: 96,
            height: 32,
            flexShrink: 0,
            borderRadius: 6,
            border: '1px solid #d6d3d1',
            background: '#fff',
            padding: '0 8px',
            fontSize: 11.5,
            color: '#44403c',
            cursor: 'pointer',
          }}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{op}</span>
          <ChevronDown size={12} color="#a8a29e" />
        </button>
      </div>
      <input
        defaultValue={value}
        style={{ height: 32, borderRadius: 6, border: '1px solid #d6d3d1', padding: '0 8px', fontFamily: MONO, fontSize: 12, color: '#1c1917', outline: 'none', boxSizing: 'border-box' }}
      />
    </div>
  );
}

function OutputRow({ field, type }: { field: string; type: string }) {
  const chip = VAR_TYPE_STYLE[type] ?? VAR_TYPE_STYLE.any;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        borderRadius: 8,
        border: '1px solid #f1f5f9',
        background: 'rgba(248,250,252,0.7)',
        padding: '6px 10px',
      }}
    >
      {/* '{x}' 前缀：font-mono text-[10px] text-violet-400 = #a78bfa */}
      <span style={{ fontFamily: MONO, fontSize: 10, color: '#a78bfa' }}>{'{x}'}</span>
      <span style={{ fontFamily: MONO, fontSize: 11.5, color: '#44403c' }}>{field}</span>
      {/* VarTypeChip：rounded px-1 py-px font-mono text-[9px] leading-none tracking-wide，按类型上色 */}
      <span
        style={{
          marginLeft: 'auto',
          borderRadius: 4,
          background: chip.bg,
          color: chip.color,
          padding: '1px 4px',
          fontFamily: MONO,
          fontSize: 9,
          lineHeight: 1,
          letterSpacing: '0.025em',
        }}
      >
        {type}
      </span>
    </div>
  );
}

function CheckboxRow({ label, checked }: { label: string; checked?: boolean }) {
  return (
    <div
      style={{
        borderRadius: 8,
        border: '1px solid #e2e8f0',
        background: '#fff',
        padding: '8px 10px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, lineHeight: 1.4, color: '#44403c' }}>
          {label}
          <HelpCircle size={12} color="#d6d3d1" />
        </span>
        {/* Switch（shadcn 风格）：开 = blue-600 轨道 + 白把手右移 */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            height: 16,
            width: 28,
            borderRadius: 9999,
            background: checked ? '#2563eb' : '#e7e5e4',
            padding: 2,
            justifyContent: checked ? 'flex-end' : 'flex-start',
          }}
        >
          <span style={{ height: 12, width: 12, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 5%)' }} />
        </span>
      </div>
    </div>
  );
}

const miniBtn: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 24,
  width: 24,
  borderRadius: 6,
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
};

const hdrBtn: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  padding: 6,
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
};
