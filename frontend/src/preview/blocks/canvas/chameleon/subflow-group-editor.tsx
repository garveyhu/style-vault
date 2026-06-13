import { PreviewFrame } from '../../../_layout';
import { Bot, Database, LayoutGrid, Network, Pencil, Plus, Trash2 } from 'lucide-react';

/**
 * subflow-group-editor · 子图编辑入口（摘要按钮 + 全屏子图 modal）
 * 源码：subgraph-fields.tsx + subgraph-editor-modal.tsx + subgraph-canvas.tsx
 * 1:1：Network 摘要按钮 / parallel 分支行 / h-[88vh] bg-slate-50 modal / 冷白点阵画布
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
              borderRadius: 6,
              border: '1px solid #e2e8f0',
              background: '#fff',
              padding: '8px',
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
                  gap: 6,
                  borderRadius: 6,
                  border: '1px solid #e2e8f0',
                  background: '#fff',
                  padding: '6px',
                }}
              >
                <input
                  defaultValue={b.key}
                  style={{
                    height: 32,
                    width: 96,
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
                <span style={{ flex: 1, fontFamily: MONO, fontSize: 10.5, color: '#a8a29e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {b.s}
                </span>
                <button style={fieldBtn} title="编辑子图"><Pencil size={14} color="#a8a29e" /></button>
                <button style={fieldBtn} title="删除分支"><Trash2 size={14} color="#a8a29e" /></button>
              </div>
            ))}
          </div>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              marginTop: 6,
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
        </div>

        {/* 右：全屏子图 modal 缩略 */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            height: 480,
            borderRadius: 12,
            overflow: 'hidden',
            background: '#f8fafc',
            border: '1px solid rgba(226,232,240,0.8)',
            boxShadow: '0 12px 32px rgb(0 0 0 / 12%)',
          }}
        >
          {/* modal header */}
          <div style={{ borderBottom: '1px solid #e2e8f0', padding: '14px 20px', background: '#fff' }}>
            <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', color: '#1c1917' }}>
              分支「translate」子图
            </div>
          </div>

          {/* 子图画布（冷白点阵） */}
          <div
            style={{
              position: 'relative',
              flex: 1,
              minHeight: 0,
              background:
                'radial-gradient(circle, #e2e8f0 1px, transparent 1px) 0 0 / 16px 16px, #f8fafc',
            }}
          >
            {/* 节点示意（贝塞尔连线） */}
            <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
              <path d="M 130,120 C 180,120 200,120 250,120" fill="none" stroke="#d6d3d1" strokeWidth={1.5} />
            </svg>
            <MiniNode x={64} y={104} bg="#f5f3ff" color="#7c3aed" icon={<Bot size={14} />} label="翻译模型" />
            <MiniNode x={250} y={104} bg="#ecfdf5" color="#059669" icon={<Database size={14} />} label="术语库" />

            {/* 自动整理 Panel（top-right） */}
            <button
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                borderRadius: 8,
                border: '1px solid rgba(231,229,224,0.7)',
                background: 'rgba(255,255,255,0.9)',
                padding: '4px 8px',
                fontSize: 11.5,
                color: '#57534e',
                boxShadow: '0 4px 12px rgb(0 0 0 / 8%)',
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
                background: '#f1f5f9',
                border: '1px solid #e2e8f0',
              }}
            />
            {/* Controls（左下） */}
            <div
              style={{
                position: 'absolute',
                bottom: 12,
                left: 12,
                width: 24,
                height: 96,
                borderRadius: 4,
                background: '#fff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgb(0 0 0 / 6%)',
              }}
            />
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

function MiniNode({ x, y, bg, color, icon, label }: { x: number; y: number; bg: string; color: string; icon: React.ReactNode; label: string }) {
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
