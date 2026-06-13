import { PreviewFrame } from '../../../_layout';
import {
  Bot,
  Boxes,
  Database,
  GitBranch,
  LayoutGrid,
  Network,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Trash2,
} from 'lucide-react';

/**
 * subflow-group-editor · 子图编辑入口（摘要按钮 + 全屏子图 modal）
 * 源码：subgraph-fields.tsx + subgraph-editor-modal.tsx + subgraph-canvas.tsx
 * 1:1：Network 摘要按钮 / parallel 分支行（含空态）/ h-[88vh] bg-slate-50 modal
 *      / 完整 NodePalette 左栏 + 冷白点阵画布 + Controls/MiniMap(!bg-slate-100)
 *      + 自动整理 Panel + NodeInspector 右栏
 */

const FONT = 'Inter, system-ui, sans-serif';
const MONO = 'JetBrains Mono, monospace';

export default function SubflowGroupEditor() {
  return (
    <PreviewFrame bg="#f4f3ee" padded>
      <div style={{ display: 'flex', gap: 16, fontFamily: FONT, alignItems: 'flex-start' }}>
        {/* 左：inspector 字段中的子图入口 */}
        <div
          style={{
            width: 300,
            flexShrink: 0,
            borderRadius: 12,
            border: '1px solid rgba(231,229,224,0.7)',
            background: '#fff',
            padding: 16,
            boxShadow: '0 1px 3px rgb(0 0 0 / 5%), 0 2px 8px rgb(0 0 0 / 3%)',
          }}
        >
          {/* iteration.body：单子图摘要按钮 */}
          <label style={{ display: 'block', marginBottom: 4, fontSize: 11, color: '#57534e' }}>循环体子图</label>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              width: '100%',
              borderRadius: 6, // rounded-md
              border: '1px solid #e2e8f0', // border-slate-200
              background: '#fff',
              padding: '8px', // px-2 py-2
              textAlign: 'left',
              fontSize: 11.5,
              cursor: 'pointer',
            }}
          >
            <Network size={14} color="#0284c7" style={{ flexShrink: 0 }} />
            <span style={{ flex: 1, color: '#44403c' }}>子图</span>
            <span style={{ fontFamily: MONO, fontSize: 10.5, color: '#a8a29e' }}>5 节点 · 4 边</span>
            <Pencil size={12} color="#a8a29e" />
          </button>
          <div style={{ marginTop: 4, fontSize: 10.5, lineHeight: 1.5, color: '#a8a29e' }}>
            对上游数组逐元素执行此子图。
          </div>

          {/* parallel.branches：分支列表 */}
          <label style={{ display: 'block', margin: '20px 0 4px', fontSize: 11, color: '#57534e' }}>
            分支（2–20 条，同一 input fork 后并发跑）
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { key: 'translate', s: '3 节点 · 2 边' },
              { key: 'summarize', s: '4 节点 · 3 边' },
            ].map(b => (
              <div
                key={b.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6, // gap-1.5
                  borderRadius: 6,
                  border: '1px solid #e2e8f0',
                  background: '#fff',
                  padding: '6px', // px-1.5 py-1.5
                }}
              >
                <input
                  defaultValue={b.key}
                  style={{
                    height: 32, // h-8
                    width: 96, // w-24
                    borderRadius: 6,
                    border: '1px solid #d6d3d1',
                    padding: '0 8px',
                    fontFamily: MONO,
                    fontSize: 11.5,
                    color: '#1c1917',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <span
                  style={{
                    flex: 1,
                    fontFamily: MONO,
                    fontSize: 10.5,
                    color: '#a8a29e',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {b.s}
                </span>
                <button style={fieldBtn} title="编辑子图">
                  <Pencil size={14} color="#a8a29e" />
                </button>
                <button style={fieldBtn} title="删除分支">
                  <Trash2 size={14} color="#a8a29e" />
                </button>
              </div>
            ))}
          </div>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              marginTop: 6, // mt-1.5
              width: '100%',
              height: 32,
              borderRadius: 6,
              border: '1px solid #d6d3d1',
              background: '#fff',
              fontSize: 11.5,
              fontWeight: 500,
              color: '#44403c',
              cursor: 'pointer',
            }}
          >
            <Plus size={12} /> 添加分支
          </button>

          {/* 空态示意（branches 为空时的虚线卡） */}
          <label style={{ display: 'block', margin: '20px 0 4px', fontSize: 11, color: '#57534e' }}>
            分支（空态）
          </label>
          <div
            style={{
              borderRadius: 6,
              border: '1px dashed #e2e8f0', // border-dashed border-slate-200
              padding: '12px 8px', // px-2 py-3
              textAlign: 'center',
              fontSize: 11,
              color: '#a8a29e',
            }}
          >
            还没有分支；点下方「添加分支」
          </div>
        </div>

        {/* 右：全屏子图 modal 缩略（h-[88vh] bg-slate-50 外壳 + 完整 palette/canvas/inspector） */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            height: 520,
            borderRadius: 12,
            overflow: 'hidden',
            background: '#f8fafc', // bg-slate-50
            border: '1px solid rgba(226,232,240,0.8)',
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 10%), 0 8px 10px -6px rgb(0 0 0 / 10%)', // shadow-xl
          }}
        >
          {/* modal header */}
          <div style={{ borderBottom: '1px solid #e2e8f0', padding: '14px 20px', background: '#fff' }}>
            <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', color: '#1c1917' }}>
              分支「translate」子图
            </div>
          </div>

          {/* 画布区：左 palette / 中画布 / 右 inspector（min-h-0 flex-1） */}
          <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
            {/* 左：NodePalette（4 Tab + 搜索 + 双列网格示意） */}
            <div
              style={{
                width: 156,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                borderRight: '1px solid #e2e8f0',
                background: '#fff',
              }}
            >
              {/* Tab 行：全部 / 生成 / 逻辑 / 数据 */}
              <div style={{ display: 'flex', gap: 2, padding: '8px 8px 6px' }}>
                {[
                  { icon: LayoutGrid, label: '全部', active: true },
                  { icon: Sparkles, label: '生成', active: false },
                  { icon: GitBranch, label: '逻辑', active: false },
                  { icon: Boxes, label: '数据', active: false },
                ].map(t => (
                  <div
                    key={t.label}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                      flex: 1,
                      borderRadius: 6,
                      padding: '4px 0',
                      background: t.active ? '#eff6ff' : 'transparent',
                      color: t.active ? '#2563eb' : '#78716c',
                      fontSize: 9,
                    }}
                  >
                    <t.icon size={13} />
                    {t.label}
                  </div>
                ))}
              </div>
              {/* 搜索框 */}
              <div style={{ padding: '0 8px 6px', position: 'relative' }}>
                <Search size={12} color="#a8a29e" style={{ position: 'absolute', left: 15, top: 7 }} />
                <div
                  style={{
                    height: 26,
                    borderRadius: 6,
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc',
                    paddingLeft: 24,
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: 10.5,
                    color: '#a8a29e',
                  }}
                >
                  搜索节点…
                </div>
              </div>
              {/* 分组标题 + 双列节点网格 */}
              <div style={{ flex: 1, overflow: 'hidden', padding: '0 8px' }}>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.02em', color: '#a8a29e', padding: '2px 0' }}>生成</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginBottom: 6 }}>
                  <PaletteChip bg="#f5f3ff" color="#7c3aed" icon={<Bot size={12} />} label="大模型" />
                  <PaletteChip bg="#f7fee7" color="#65a30d" icon={<GitBranch size={12} />} label="意图分类" />
                </div>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.02em', color: '#a8a29e', padding: '2px 0' }}>检索 & 工具</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                  <PaletteChip bg="#ecfdf5" color="#059669" icon={<Database size={12} />} label="知识库" />
                  <PaletteChip bg="#ecfeff" color="#0891b2" icon={<Network size={12} />} label="HTTP" />
                </div>
              </div>
            </div>

            {/* 中：子图画布（冷白点阵 Dots gap16 size1 slate-200） */}
            <div
              style={{
                position: 'relative',
                flex: 1,
                minWidth: 0,
                background:
                  'radial-gradient(circle, #e2e8f0 1px, transparent 1px) 0 0 / 16px 16px, #f8fafc',
              }}
            >
              {/* 节点示意（贝塞尔连线，markerEnd ArrowClosed 14 #d6d3d1） */}
              <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                <defs>
                  <marker id="sg-arrow" markerWidth="14" markerHeight="14" refX="9" refY="5" orient="auto">
                    <path d="M0,1 L9,5 L0,9 z" fill="#d6d3d1" />
                  </marker>
                </defs>
                <path d="M 132,120 C 175,120 195,120 238,120" fill="none" stroke="#d6d3d1" strokeWidth={1.5} markerEnd="url(#sg-arrow)" />
              </svg>
              <MiniNode x={56} y={104} cardTint="rgba(245,243,255,0.4)" bg="#f5f3ff" color="#7c3aed" icon={<Bot size={14} />} label="翻译模型" />
              <MiniNode x={238} y={104} cardTint="rgba(236,253,245,0.4)" bg="#ecfdf5" color="#059669" icon={<Database size={14} />} label="术语库" />

              {/* 自动整理 Panel（top-right） */}
              <button
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  borderRadius: 8, // rounded-lg
                  border: '1px solid rgba(231,229,224,0.7)', // border-stone-200/70
                  background: 'rgba(255,255,255,0.9)', // bg-white/90
                  padding: '4px 8px', // px-2 py-1
                  fontSize: 11.5,
                  color: '#57534e', // text-stone-600
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -2px rgb(0 0 0 / 10%)', // shadow-md
                  backdropFilter: 'blur(6px)',
                  cursor: 'pointer',
                }}
              >
                <LayoutGrid size={14} /> 自动整理
              </button>

              {/* MiniMap（右下，!bg-slate-100） */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 12,
                  right: 12,
                  width: 96,
                  height: 64,
                  borderRadius: 4,
                  background: '#f1f5f9', // slate-100
                  border: '1px solid #e2e8f0',
                }}
              />
              {/* Controls（左下，showInteractive=false → 3 钮：zoom-in/out/fit） */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 12,
                  left: 12,
                  width: 24,
                  borderRadius: 4,
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 3px rgb(0 0 0 / 6%)',
                  overflow: 'hidden',
                }}
              >
                {['+', '−', '⤢'].map((g, i) => (
                  <div
                    key={i}
                    style={{
                      height: 24,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      color: '#78716c',
                      borderBottom: i < 2 ? '1px solid #e2e8f0' : 'none',
                    }}
                  >
                    {g}
                  </div>
                ))}
              </div>
            </div>

            {/* 右：NodeInspector（选中节点配置面板示意） */}
            <div
              style={{
                width: 180,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                borderLeft: '1px solid #e2e8f0',
                background: '#fff',
                padding: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 24,
                    width: 24,
                    borderRadius: 7,
                    background: '#f5f3ff',
                    color: '#7c3aed',
                    boxShadow: 'inset 0 0 0 1px rgb(28 25 23 / 5%)',
                  }}
                >
                  <Bot size={13} />
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '-0.01em', color: '#1c1917' }}>翻译模型</span>
              </div>
              <div style={{ fontSize: 10, color: '#57534e', marginBottom: 3 }}>模型</div>
              <div
                style={{
                  height: 28,
                  borderRadius: 6,
                  border: '1px solid #e2e8f0',
                  background: '#f8fafc',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 8px',
                  fontSize: 11,
                  color: '#1c1917',
                  marginBottom: 10,
                }}
              >
                qwen-max
              </div>
              <div style={{ fontSize: 10, color: '#57534e', marginBottom: 3 }}>系统提示词</div>
              <div
                style={{
                  height: 52,
                  borderRadius: 6,
                  border: '1px solid #e2e8f0',
                  background: '#f8fafc',
                  padding: 8,
                  fontSize: 10,
                  lineHeight: 1.4,
                  color: '#a8a29e',
                }}
              >
                把输入译为目标语言…
              </div>
            </div>
          </div>

          {/* modal footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 8,
              borderTop: '1px solid #e2e8f0',
              padding: '12px 20px',
              background: '#fff',
            }}
          >
            <button
              style={{
                height: 32,
                padding: '0 14px',
                borderRadius: 6,
                background: 'transparent',
                border: 'none',
                fontSize: 12.5,
                fontWeight: 500,
                color: '#57534e',
                cursor: 'pointer',
              }}
            >
              取消
            </button>
            <button
              style={{
                height: 32,
                padding: '0 14px',
                borderRadius: 6,
                background: '#2563eb',
                border: 'none',
                fontSize: 12.5,
                fontWeight: 500,
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              应用
            </button>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

/** palette 双列网格小卡 */
function PaletteChip({ bg, color, icon, label }: { bg: string; color: string; icon: React.ReactNode; label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        borderRadius: 8,
        border: '1px solid #f1f5f9',
        background: '#fff',
        padding: '6px 2px',
      }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 22,
          width: 22,
          borderRadius: 6,
          background: bg,
          color,
          boxShadow: 'inset 0 0 0 1px rgb(28 25 23 / 5%)',
        }}
      >
        {icon}
      </span>
      <span style={{ fontSize: 9, color: '#44403c' }}>{label}</span>
    </div>
  );
}

/** 子图画布节点卡 —— 卡底 cardTint(50/40)、图标块 bg(50)、rounded-[14px] */
function MiniNode({
  x,
  y,
  cardTint,
  bg,
  color,
  icon,
  label,
}: {
  x: number;
  y: number;
  cardTint: string;
  bg: string;
  color: string;
  icon: React.ReactNode;
  label: string;
}) {
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
        borderRadius: 14,
        border: '1px solid rgba(231,229,228,0.7)',
        background: cardTint,
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
          background: bg,
          color,
          boxShadow: 'inset 0 0 0 1px rgb(28 25 23 / 5%)',
        }}
      >
        {icon}
      </span>
      <span style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: '-0.01em', color: '#292524' }}>{label}</span>
    </div>
  );
}

const fieldBtn: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: 4,
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
};
