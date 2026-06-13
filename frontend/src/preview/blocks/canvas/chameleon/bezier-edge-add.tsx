import { PreviewFrame } from '../../../_layout';
import { Bot, Database, GitBranch, Plus, Search, Shuffle } from 'lucide-react';

/**
 * bezier-edge-add · 平滑贝塞尔连线 + 边中点加节点
 * 源码：graph-edge.tsx (GraphEdge / GraphConnectionLine) + edge-insert-menu.tsx
 * 1:1：curvature 0.2 / 四态描边 / fail 标签 / 中点「+」 / w-60 portal 菜单
 */

const FONT = 'Inter, system-ui, sans-serif';
const MONO = 'JetBrains Mono, monospace';

const PRIMARY = '#3b82f6'; // var(--color-primary-500) 默认蓝
const NORMAL = '#d6d3d1';
const FAIL = '#fb7185';

/** 贝塞尔路径：从 (x1,y1) 水平出、到 (x2,y2) 水平入，curvature 0.2 近似 */
function bez(x1: number, y1: number, x2: number, y2: number) {
  const dx = Math.abs(x2 - x1) * 0.5;
  return `M ${x1},${y1} C ${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`;
}

export default function BezierEdgeAdd() {
  return (
    <PreviewFrame bg="#f8f8f5" padded>
      <div
        style={{
          position: 'relative',
          height: 480,
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
              <path d="M0,1 L9,5 L0,9 z" fill={PRIMARY} />
            </marker>
            <marker id="arrow-fail" markerWidth="14" markerHeight="14" refX="9" refY="5" orient="auto">
              <path d="M0,1 L9,5 L0,9 z" fill={FAIL} />
            </marker>
          </defs>

          {/* 默认 stone 灰细线 1.5（dimmed 0.35） */}
          <path d={bez(150, 90, 320, 90)} fill="none" stroke={NORMAL} strokeWidth={1.5} opacity={0.35} markerEnd="url(#arrow-normal)" />

          {/* 相邻高亮：主题 primary 加粗 2.25 + 流动虚线 6 4 */}
          <path d={bez(150, 200, 320, 200)} fill="none" stroke={PRIMARY} strokeWidth={2.25} strokeDasharray="6 4" markerEnd="url(#arrow-active)">
            <animate attributeName="stroke-dashoffset" from="20" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>

          {/* fail 分支：rose 红虚线 5 3 */}
          <path d={bez(150, 320, 320, 320)} fill="none" stroke={FAIL} strokeWidth={1.5} strokeDasharray="5 3" markerEnd="url(#arrow-fail)" />

          {/* 拖拽连接线：active 贝塞尔 2 + 虚线 5 3 + 竖向锚点圆 */}
          <path d={bez(360, 410, 520, 410)} fill="none" stroke={PRIMARY} strokeWidth={2} strokeDasharray="5 3" />
          <circle cx={520} cy={410} r={3} fill="#fff" stroke={PRIMARY} strokeWidth={1.5} />
        </svg>

        {/* 边状态标签 */}
        <Tag x={200} y={66} color="#a8a29e">默认 · 焦点外淡化</Tag>
        <Tag x={196} y={176} color={PRIMARY}>相邻高亮 · 流动虚线</Tag>
        {/* fail 标签（边中点上移 16px 让位「+」） */}
        <div
          style={{
            position: 'absolute',
            left: 235 - 14,
            top: 320 - 16 - 9,
            borderRadius: 9999,
            border: '1px solid #fecdd3',
            background: '#fff1f2',
            padding: '1px 6px',
            fontFamily: MONO,
            fontSize: 9,
            lineHeight: 1.3,
            color: '#fb7185',
          }}
        >
          失败
        </div>

        {/* 节点桩（示意源 / 目标） */}
        <NodeStub x={86} y={73} bg="#f5f3ff" icon={<Bot size={14} color="#8b5cf6" />} label="大模型" />
        <NodeStub x={320} y={73} bg="#ecfdf5" icon={<Database size={14} color="#10b981" />} label="知识库" />
        <NodeStub x={86} y={183} bg="#f7fee7" icon={<Shuffle size={14} color="#84cc16" />} label="意图分类" />
        <NodeStub x={320} y={303} bg="#fff1f2" icon={<GitBranch size={14} color="#f59e0b" />} label="兜底处理" />

        {/* 中点「+」按钮（fail 边中点，开态） */}
        <button
          title="在此处插入节点"
          style={{
            position: 'absolute',
            left: 235 - 10,
            top: 320 - 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 20,
            width: 20,
            borderRadius: '50%',
            border: '1px solid #93c5fd',
            background: '#eff6ff',
            color: '#2563eb',
            boxShadow: '0 1px 2px rgb(0 0 0 / 8%)',
            cursor: 'pointer',
          }}
        >
          <Plus size={12} />
        </button>

        {/* 插入菜单（portal 模拟，定位边中点下方） */}
        <div
          style={{
            position: 'absolute',
            left: 270,
            top: 340,
            width: 240,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: 12,
            border: '1px solid rgba(231,229,224,0.8)',
            background: '#fff',
            boxShadow: '0 12px 32px rgb(0 0 0 / 12%), 0 0 0 1px rgb(28 25 23 / 5%)',
          }}
        >
          <div style={{ borderBottom: '1px solid #f5f5f4', padding: 8 }}>
            <div style={{ position: 'relative' }}>
              <Search
                size={14}
                color="#a8a29e"
                style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                placeholder="搜索节点…"
                style={{
                  height: 28,
                  width: '100%',
                  borderRadius: 8,
                  border: '1px solid #e7e5e4',
                  background: '#fafaf9',
                  paddingLeft: 28,
                  paddingRight: 8,
                  fontSize: 11.5,
                  color: '#292524',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>
          <div style={{ padding: '6px', overflowY: 'auto', maxHeight: 180 }}>
            <div style={{ padding: '0 6px 2px', fontSize: 9.5, fontWeight: 600, letterSpacing: '0.02em', color: '#a8a29e' }}>
              生成
            </div>
            <MenuRow bg="#f5f3ff" color="#8b5cf6" icon={<Bot size={14} />} label="大模型" />
            <MenuRow bg="#f7fee7" color="#84cc16" icon={<Shuffle size={14} />} label="意图分类" />
            <div style={{ padding: '6px 6px 2px', fontSize: 9.5, fontWeight: 600, letterSpacing: '0.02em', color: '#a8a29e' }}>
              检索 & 工具
            </div>
            <MenuRow bg="#ecfdf5" color="#10b981" icon={<Database size={14} />} label="知识库" />
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function Tag({ x, y, color, children }: { x: number; y: number; color: string; children: React.ReactNode }) {
  return (
    <span style={{ position: 'absolute', left: x, top: y, fontSize: 9.5, color }}>{children}</span>
  );
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
        border: '1px solid rgba(231,229,224,0.7)',
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

function MenuRow({ bg, color, icon, label }: { bg: string; color: string; icon: React.ReactNode; label: string }) {
  return (
    <button
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        width: '100%',
        borderRadius: 8,
        padding: '6px',
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
          height: 24,
          width: 24,
          borderRadius: 6,
          background: bg,
          color,
          boxShadow: 'inset 0 0 0 1px rgb(28 25 23 / 5%)',
        }}
      >
        {icon}
      </span>
      <span style={{ flex: 1, fontSize: 11.5, fontWeight: 500, color: '#44403c' }}>{label}</span>
    </button>
  );
}
