import { PreviewFrame } from '../../../_layout';
import {
  Bot,
  Braces,
  CircleDashed,
  Code2,
  Combine,
  Database,
  FileText,
  Flag,
  GitBranch,
  Globe,
  Image as ImageIcon,
  ListFilter,
  Plus,
  Repeat,
  ScanText,
  Search,
  Shuffle,
  Split,
  UserCheck,
  Users,
  Variable,
  Workflow,
  Wrench,
} from 'lucide-react';

/**
 * bezier-edge-add · 平滑贝塞尔连线 + 边中点加节点
 * 源码：graph-edge.tsx (GraphEdge / GraphConnectionLine) + edge-insert-menu.tsx
 * 1:1：curvature 0.2 / EDGE_COLOR 四态描边 / fail 标签 / 中点「+」闭+开两态
 *      / w-60 portal 菜单（NODE_CATALOG 全 5 组 · workflow kind 过滤掉 answer）
 */

const FONT = 'Inter, system-ui, sans-serif';
const MONO = 'JetBrains Mono, monospace';

// EDGE_COLOR 四态
const NORMAL = '#d6d3d1'; // stone-300
const ACTIVE = '#3b82f6'; // var(--color-primary-500) 默认蓝
const FAIL = '#fb7185'; // rose-400
const FAIL_ACTIVE = '#f43f5e'; // rose-500

/** 贝塞尔路径：从 (x1,y1) 水平出、到 (x2,y2) 水平入，curvature 0.2 近似 */
function bez(x1: number, y1: number, x2: number, y2: number) {
  const dx = Math.abs(x2 - x1) * 0.5;
  return `M ${x1},${y1} C ${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`;
}

/** NODE_CATALOG 全量（workflow kind 已过滤 answer）按 GROUP_ORDER 分组。
 *  color = it.color（600 阶图标前景）、bg = it.bg（50 阶图标块底）。 */
const GROUPS: { group: string; items: { icon: typeof Bot; label: string; color: string; bg: string }[] }[] = [
  {
    group: '生成',
    items: [
      { icon: Bot, label: '大模型', color: '#7c3aed', bg: '#f5f3ff' }, // violet-600 / violet-50
      { icon: Shuffle, label: '意图分类', color: '#65a30d', bg: '#f7fee7' }, // lime-600 / lime-50
      { icon: ScanText, label: '参数提取', color: '#2563eb', bg: '#eff6ff' }, // blue-600 / blue-50
      { icon: ImageIcon, label: '生图', color: '#9333ea', bg: '#faf5ff' }, // purple-600 / purple-50
      { icon: Users, label: '多智能体辩论', color: '#c026d3', bg: '#fdf4ff' }, // fuchsia-600 / fuchsia-50
    ],
  },
  {
    group: '检索 & 工具',
    items: [
      { icon: Database, label: '知识库', color: '#059669', bg: '#ecfdf5' }, // emerald-600 / emerald-50
      { icon: Globe, label: 'HTTP请求', color: '#0891b2', bg: '#ecfeff' }, // cyan-600 / cyan-50
      { icon: Code2, label: '代码', color: '#475569', bg: '#f1f5f9' }, // slate-600 / slate-100
      { icon: Wrench, label: '工具', color: '#ea580c', bg: '#fff7ed' }, // orange-600 / orange-50
    ],
  },
  {
    group: '逻辑',
    items: [
      { icon: GitBranch, label: '条件分支', color: '#d97706', bg: '#fffbeb' }, // amber-600 / amber-50
      { icon: Repeat, label: '迭代', color: '#0284c7', bg: '#f0f9ff' }, // sky-600 / sky-50
      { icon: Split, label: '并行', color: '#4f46e5', bg: '#eef2ff' }, // indigo-600 / indigo-50
      { icon: UserCheck, label: '人工输入', color: '#db2777', bg: '#fdf2f8' }, // pink-600 / pink-50
    ],
  },
  {
    group: '编排',
    items: [
      { icon: Workflow, label: '子工作流', color: '#4f46e5', bg: '#eef2ff' }, // indigo-600 / indigo-50
    ],
  },
  {
    group: '变量 & 输出',
    items: [
      { icon: Braces, label: '模板', color: '#0d9488', bg: '#f0fdfa' }, // teal-600 / teal-50
      { icon: Combine, label: '变量聚合', color: '#b45309', bg: '#fffbeb' }, // amber-700 / amber-50
      { icon: Variable, label: '变量赋值', color: '#e11d48', bg: '#fff1f2' }, // rose-600 / rose-50
      { icon: ListFilter, label: '列表操作', color: '#0e7490', bg: '#ecfeff' }, // cyan-700 / cyan-50
      { icon: FileText, label: '文档提取', color: '#c2410c', bg: '#fff7ed' }, // orange-700 / orange-50
      { icon: CircleDashed, label: '空操作', color: '#78716c', bg: '#f5f5f4' }, // stone-500 / stone-100
      { icon: Flag, label: '结束', color: '#44403c', bg: '#f5f5f4' }, // stone-700 / stone-100
    ],
  },
];

export default function BezierEdgeAdd() {
  return (
    <PreviewFrame bg="#f8f8f5" padded>
      <div
        style={{
          position: 'relative',
          height: 620,
          borderRadius: 12,
          overflow: 'hidden',
          fontFamily: FONT,
          background:
            'radial-gradient(circle, rgba(214,211,209,0.45) 1px, transparent 1px) 0 0 / 16px 16px, #fbfbf9',
        }}
      >
        {/* 连线层 */}
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <marker id="arrow-normal" markerWidth="14" markerHeight="14" refX="9" refY="5" orient="auto">
              <path d="M0,1 L9,5 L0,9 z" fill={NORMAL} />
            </marker>
            <marker id="arrow-active" markerWidth="14" markerHeight="14" refX="9" refY="5" orient="auto">
              <path d="M0,1 L9,5 L0,9 z" fill={ACTIVE} />
            </marker>
            <marker id="arrow-fail" markerWidth="14" markerHeight="14" refX="9" refY="5" orient="auto">
              <path d="M0,1 L9,5 L0,9 z" fill={FAIL} />
            </marker>
            <marker id="arrow-failactive" markerWidth="14" markerHeight="14" refX="9" refY="5" orient="auto">
              <path d="M0,1 L9,5 L0,9 z" fill={FAIL_ACTIVE} />
            </marker>
          </defs>

          {/* normal：stone 灰细线 1.5 + dimmed 0.35（焦点外淡化） */}
          <path d={bez(150, 70, 320, 70)} fill="none" stroke={NORMAL} strokeWidth={1.5} opacity={0.35} markerEnd="url(#arrow-normal)" />

          {/* active：相邻高亮 主题 primary 加粗 2.25 + 流动虚线 6 4 */}
          <path d={bez(150, 158, 320, 158)} fill="none" stroke={ACTIVE} strokeWidth={2.25} strokeDasharray="6 4" markerEnd="url(#arrow-active)">
            <animate attributeName="stroke-dashoffset" from="20" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>

          {/* fail：rose-400 虚线 5 3 width 1.5 */}
          <path d={bez(150, 246, 320, 246)} fill="none" stroke={FAIL} strokeWidth={1.5} strokeDasharray="5 3" markerEnd="url(#arrow-fail)" />

          {/* failActive：fail 边被选中 rose-500 虚线 5 3 加粗 2.25 */}
          <path d={bez(150, 334, 320, 334)} fill="none" stroke={FAIL_ACTIVE} strokeWidth={2.25} strokeDasharray="5 3" markerEnd="url(#arrow-failactive)" />

          {/* 拖拽连接线：active 贝塞尔 2 + 虚线 5 3 + 竖向锚点圆 */}
          <path d={bez(150, 422, 320, 422)} fill="none" stroke={ACTIVE} strokeWidth={2} strokeDasharray="5 3" />
          <circle cx={320} cy={422} r={3} fill="#fff" stroke={ACTIVE} strokeWidth={1.5} />
        </svg>

        {/* 边状态标签 */}
        <Tag x={196} y={48} color="#a8a29e">normal · 焦点外淡化</Tag>
        <Tag x={196} y={136} color={ACTIVE}>active · 相邻高亮 流动虚线</Tag>
        <Tag x={196} y={262} color={FAIL}>fail · rose 红虚线</Tag>
        <Tag x={196} y={350} color={FAIL_ACTIVE}>failActive · fail 被选中 加粗</Tag>
        <Tag x={196} y={438} color={ACTIVE}>拖拽连接线 · 竖向锚点</Tag>

        {/* fail 标签（边中点上移 16px 让位「+」） */}
        <div
          style={{
            position: 'absolute',
            left: 235 - 14,
            top: 246 - 16 - 9,
            borderRadius: 9999,
            border: '1px solid #fecdd3', // rose-200
            background: '#fff1f2', // rose-50
            padding: '1px 6px',
            fontFamily: MONO,
            fontSize: 9,
            lineHeight: 1.25,
            color: '#fb7185', // rose-500 文字（text-rose-500）
          }}
        >
          失败
        </div>

        {/* failActive 标签 */}
        <div
          style={{
            position: 'absolute',
            left: 235 - 14,
            top: 334 - 16 - 9,
            borderRadius: 9999,
            border: '1px solid #fecdd3',
            background: '#fff1f2',
            padding: '1px 6px',
            fontFamily: MONO,
            fontSize: 9,
            lineHeight: 1.25,
            color: '#fb7185',
          }}
        >
          失败
        </div>

        {/* 节点桩（示意源 / 目标） */}
        <NodeStub x={86} y={53} bg="#f5f3ff" icon={<Bot size={14} color="#7c3aed" />} label="大模型" />
        <NodeStub x={320} y={53} bg="#ecfdf5" icon={<Database size={14} color="#059669" />} label="知识库" />
        <NodeStub x={86} y={141} bg="#f7fee7" icon={<Shuffle size={14} color="#65a30d" />} label="意图分类" />
        <NodeStub x={320} y={317} bg="#fffbeb" icon={<GitBranch size={14} color="#d97706" />} label="兜底处理" />

        {/* 中点「+」按钮（闭态：normal 边中点） */}
        <PlusButton x={235} y={70} open={false} />
        {/* 中点「+」按钮（开态：fail 边中点） */}
        <PlusButton x={235} y={246} open />

        {/* 插入菜单（portal 模拟，定位边中点下方） —— NODE_CATALOG 全 5 组 */}
        <div
          style={{
            position: 'absolute',
            left: 360,
            top: 70,
            width: 240, // w-60
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: 12, // rounded-xl
            border: '1px solid rgba(231,229,228,0.8)', // border-stone-200/80
            background: '#fff',
            // shadow-xl + ring-1 ring-stone-900/5
            boxShadow:
              '0 20px 25px -5px rgb(0 0 0 / 10%), 0 8px 10px -6px rgb(0 0 0 / 10%), 0 0 0 1px rgb(28 25 23 / 5%)',
          }}
        >
          {/* 搜索框区 */}
          <div style={{ borderBottom: '1px solid #f5f5f4', padding: 8 }}>
            <div style={{ position: 'relative' }}>
              <Search
                size={14} // h-3.5
                color="#a8a29e" // text-stone-400
                style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                placeholder="搜索节点…"
                style={{
                  height: 28, // h-7
                  width: '100%',
                  borderRadius: 8, // rounded-lg
                  border: '1px solid #e7e5e4', // border-stone-200
                  background: '#fafaf9', // bg-stone-50
                  paddingLeft: 28, // pl-7
                  paddingRight: 8, // pr-2
                  fontSize: 11.5,
                  color: '#292524', // text-stone-800
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* 列表区 px-1.5 py-1.5 */}
          <div style={{ padding: 6, overflowY: 'auto', maxHeight: 412 }}>
            {GROUPS.map(({ group, items }, gi) => (
              <div key={group} style={{ marginBottom: gi === GROUPS.length - 1 ? 0 : 6 }}>
                <div
                  style={{
                    padding: '0 6px 2px', // px-1.5 pb-0.5
                    fontSize: 9.5,
                    fontWeight: 600,
                    letterSpacing: '0.02em', // tracking-wide
                    color: '#a8a29e', // text-stone-400
                  }}
                >
                  {group}
                </div>
                {items.map(it => (
                  <MenuRow key={it.label} bg={it.bg} color={it.color} icon={<it.icon size={14} />} label={it.label} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

/** 「+」按钮闭/开两态 —— h-5 w-5 rounded-full border shadow-sm */
function PlusButton({ x, y, open }: { x: number; y: number; open: boolean }) {
  return (
    <button
      title={open ? '收起' : '在此处插入节点'}
      style={{
        position: 'absolute',
        left: x - 10,
        top: y - 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 20, // h-5
        width: 20, // w-5
        borderRadius: '50%',
        border: open ? '1px solid #93c5fd' : '1px solid #d6d3d1', // open: border-blue-300 / 闭: border-stone-300
        background: open ? '#eff6ff' : '#fff', // open: bg-blue-50 / 闭: bg-white
        color: open ? '#2563eb' : '#78716c', // open: text-blue-600 / 闭: text-stone-500
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 5%)', // shadow-sm
        cursor: 'pointer',
      }}
    >
      <Plus size={12} />
    </button>
  );
}

function Tag({ x, y, color, children }: { x: number; y: number; color: string; children: React.ReactNode }) {
  return <span style={{ position: 'absolute', left: x, top: y, fontSize: 9.5, color }}>{children}</span>;
}

function NodeStub({ x, y, bg, icon, label }: { x: number; y: number; bg: string; icon: React.ReactNode; label: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        minWidth: 64,
        borderRadius: 12,
        border: '1px solid rgba(231,229,228,0.7)',
        background: bg,
        padding: '6px 10px',
        boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)',
      }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 26,
          width: 26,
          borderRadius: 9,
          background: '#fff',
          boxShadow: 'inset 0 0 0 1px rgb(28 25 23 / 5%)',
        }}
      >
        {icon}
      </span>
      <span style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: '-0.01em', color: '#292524' }}>{label}</span>
    </div>
  );
}

/** 节点行 —— flex gap-2 rounded-lg px-1.5 py-1.5；图标块 h-6 w-6 rounded-md ring-1 ring-stone-900/5 */
function MenuRow({ bg, color, icon, label }: { bg: string; color: string; icon: React.ReactNode; label: string }) {
  return (
    <button
      title={label}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8, // gap-2
        width: '100%',
        minWidth: 0,
        borderRadius: 8, // rounded-lg
        padding: 6, // px-1.5 py-1.5
        background: 'transparent',
        border: 'none',
        textAlign: 'left',
        cursor: 'pointer',
      }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 24, // h-6
          width: 24, // w-6
          flexShrink: 0,
          borderRadius: 6, // rounded-md
          background: bg,
          color,
          boxShadow: 'inset 0 0 0 1px rgb(28 25 23 / 5%)', // ring-1 ring-stone-900/5
        }}
      >
        {icon}
      </span>
      <span
        style={{
          flex: 1,
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontSize: 11.5,
          fontWeight: 500,
          color: '#44403c', // text-stone-700
        }}
      >
        {label}
      </span>
    </button>
  );
}
