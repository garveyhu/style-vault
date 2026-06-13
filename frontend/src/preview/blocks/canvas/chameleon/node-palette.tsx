import { PreviewFrame } from '../../../_layout';
import {
  Bot,
  Boxes,
  Braces,
  ChevronsLeft,
  CircleDashed,
  Code2,
  Combine,
  CornerDownLeft,
  Database,
  FileText,
  Flag,
  GitBranch,
  Globe,
  Image,
  LayoutGrid,
  ListFilter,
  Repeat,
  ScanText,
  Search,
  Shuffle,
  Sparkles,
  Split,
  UserCheck,
  Users,
  Variable,
  Workflow,
  Wrench,
  X,
} from 'lucide-react';

/**
 * node-palette · 左侧常驻节点面板（双列 + 顶部 Tab）
 * 源码：node-palette.tsx + lib/node-catalog.ts
 * 1:1：w-[21rem] rounded-2xl shadow-xl / 4 Tab / 搜索 h-8 + 清除 X / 全 5 组 22 项 /
 *      28px 图标块（node-catalog 色，每类型独立色阶）
 */

const FONT = 'Inter, system-ui, sans-serif';

const TABS = [
  { key: 'all', label: '全部', Icon: LayoutGrid },
  { key: 'gen', label: '生成', Icon: Sparkles },
  { key: 'logic', label: '逻辑', Icon: GitBranch },
  { key: 'data', label: '数据', Icon: Boxes },
];

// NODE_CATALOG（node-catalog.ts）—— 全 5 组 22 项，color/bg 逐项对齐源码 Tailwind 阶
const GROUPS = [
  {
    name: '生成',
    items: [
      { label: '大模型', Icon: Bot, bg: '#f5f3ff', color: '#7c3aed' }, // violet-50 / violet-600
      { label: '意图分类', Icon: Shuffle, bg: '#f7fee7', color: '#65a30d' }, // lime-50 / lime-600
      { label: '参数提取', Icon: ScanText, bg: '#eff6ff', color: '#2563eb' }, // blue-50 / blue-600
      { label: '生图', Icon: Image, bg: '#faf5ff', color: '#9333ea' }, // purple-50 / purple-600
      { label: '多智能体辩论', Icon: Users, bg: '#fdf4ff', color: '#c026d3' }, // fuchsia-50 / fuchsia-600
    ],
  },
  {
    name: '检索 & 工具',
    items: [
      { label: '知识库', Icon: Database, bg: '#ecfdf5', color: '#059669' }, // emerald-50 / emerald-600
      { label: 'HTTP请求', Icon: Globe, bg: '#ecfeff', color: '#0891b2' }, // cyan-50 / cyan-600
      { label: '代码', Icon: Code2, bg: '#f1f5f9', color: '#475569' }, // slate-100 / slate-600
      { label: '工具', Icon: Wrench, bg: '#fff7ed', color: '#ea580c' }, // orange-50 / orange-600
    ],
  },
  {
    name: '逻辑',
    items: [
      { label: '条件分支', Icon: GitBranch, bg: '#fffbeb', color: '#d97706' }, // amber-50 / amber-600
      { label: '迭代', Icon: Repeat, bg: '#f0f9ff', color: '#0284c7' }, // sky-50 / sky-600
      { label: '并行', Icon: Split, bg: '#eef2ff', color: '#4f46e5' }, // indigo-50 / indigo-600
      { label: '人工输入', Icon: UserCheck, bg: '#fdf2f8', color: '#db2777' }, // pink-50 / pink-600
    ],
  },
  {
    name: '编排',
    items: [
      { label: '子工作流', Icon: Workflow, bg: '#eef2ff', color: '#4f46e5' }, // indigo-50 / indigo-600
    ],
  },
  {
    name: '变量 & 输出',
    items: [
      { label: '模板', Icon: Braces, bg: '#f0fdfa', color: '#0d9488' }, // teal-50 / teal-600
      { label: '变量聚合', Icon: Combine, bg: '#fffbeb', color: '#b45309' }, // amber-50 / amber-700
      { label: '变量赋值', Icon: Variable, bg: '#fff1f2', color: '#e11d48' }, // rose-50 / rose-600
      { label: '列表操作', Icon: ListFilter, bg: '#ecfeff', color: '#0e7490' }, // cyan-50 / cyan-700
      { label: '文档提取', Icon: FileText, bg: '#fff7ed', color: '#c2410c' }, // orange-50 / orange-700
      { label: '回答', Icon: CornerDownLeft, bg: '#f0fdf4', color: '#16a34a' }, // green-50 / green-600
      { label: '空操作', Icon: CircleDashed, bg: '#f5f5f4', color: '#78716c' }, // stone-100 / stone-500
      { label: '结束', Icon: Flag, bg: '#f5f5f4', color: '#44403c' }, // stone-100 / stone-700
    ],
  },
];

export default function NodePalette() {
  return (
    <PreviewFrame bg="#f8f8f5" padded>
      <div
        style={{
          position: 'relative',
          height: 720,
          borderRadius: 12,
          fontFamily: FONT,
          padding: 12,
          background:
            'radial-gradient(circle, #e2e8f0 1px, transparent 1px) 0 0 / 16px 16px, #f8fafc',
        }}
      >
        {/* 常驻面板 w-[21rem]=336 rounded-2xl=16 shadow-xl ring-1 ring-stone-900/5 */}
        <div
          style={{
            width: 336,
            maxHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: 16,
            border: '1px solid rgba(231,229,224,0.8)',
            background: '#fff',
            boxShadow:
              '0 20px 25px -5px rgb(0 0 0 / 10%), 0 8px 10px -6px rgb(0 0 0 / 10%), 0 0 0 1px rgb(28 25 23 / 5%)',
          }}
        >
          {/* Tab 行 px-2 pt-2 gap-1 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 8px 0' }}>
            <div style={{ display: 'flex', flex: 1, minWidth: 0, alignItems: 'center', gap: 2 }}>
              {TABS.map((t, i) => (
                <button
                  key={t.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    borderRadius: 8,
                    padding: '6px 8px',
                    fontSize: 11.5,
                    fontWeight: 500,
                    background: i === 0 ? '#eff6ff' : 'transparent',
                    color: i === 0 ? '#2563eb' : '#78716c',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <t.Icon size={14} />
                  {t.label}
                </button>
              ))}
            </div>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 24,
                width: 24,
                flexShrink: 0,
                borderRadius: 6,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              title="收起节点面板"
            >
              <ChevronsLeft size={14} color="#a8a29e" />
            </button>
          </div>

          {/* 搜索 px-2.5 pt-2 pb-2，h-8 pl-8 pr-7 + 清除 X（query 非空时） */}
          <div style={{ padding: '8px 10px' }}>
            <div style={{ position: 'relative' }}>
              <Search
                size={14}
                color="#a8a29e"
                style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                defaultValue="参数"
                placeholder="搜索节点…"
                style={{
                  height: 32,
                  width: '100%',
                  borderRadius: 8,
                  border: '1px solid #e7e5e4',
                  background: '#fafaf9',
                  paddingLeft: 32,
                  paddingRight: 28,
                  fontSize: 12,
                  color: '#292524',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              {/* 清除 X：h-5 w-5 rounded right-1.5 hover:bg-stone-100 */}
              <button
                title="清除搜索"
                style={{
                  position: 'absolute',
                  right: 6,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 20,
                  width: 20,
                  borderRadius: 4,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <X size={14} color="#a8a29e" />
              </button>
            </div>
          </div>

          {/* 分组 + 双列网格 px-2 pb-2.5 */}
          <div style={{ minHeight: 0, flex: 1, overflowY: 'auto', padding: '0 8px 10px' }}>
            {GROUPS.map(g => (
              <div key={g.name} style={{ marginBottom: 12 }}>
                {/* 分组标题 px-1.5 pb-1.5 text-[10px] font-semibold tracking-wide text-stone-400 */}
                <div style={{ padding: '0 6px 6px', fontSize: 10, fontWeight: 600, letterSpacing: '0.025em', color: '#a8a29e' }}>
                  {g.name}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                  {g.items.map(it => (
                    <button
                      key={it.label}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        minWidth: 0,
                        borderRadius: 12,
                        border: '1px solid transparent',
                        padding: '8px',
                        textAlign: 'left',
                        background: 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      {/* 图标块 h-7 w-7 rounded-lg ring-1 ring-stone-900/5 */}
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 28,
                          width: 28,
                          flexShrink: 0,
                          borderRadius: 8,
                          background: it.bg,
                          color: it.color,
                          boxShadow: 'inset 0 0 0 1px rgb(28 25 23 / 5%)',
                        }}
                      >
                        <it.Icon size={16} />
                      </span>
                      <span
                        style={{
                          minWidth: 0,
                          flex: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          fontSize: 12,
                          fontWeight: 500,
                          color: '#44403c',
                        }}
                      >
                        {it.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
