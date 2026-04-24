import { useSyncExternalStore } from 'react';
import { PreviewFrame } from '../../_layout';

/* ================== useCols hook 示意 ================== */
const BREAKPOINTS = [
  { query: '(min-width: 1536px)', cols: 6, label: '2xl' },
  { query: '(min-width: 1280px)', cols: 5, label: 'xl' },
  { query: '(min-width: 1024px)', cols: 4, label: 'lg' },
  { query: '(min-width: 768px)',  cols: 3, label: 'md' },
  { query: '(min-width: 640px)',  cols: 2, label: 'sm' },
] as const;

function subscribe(cb: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const mqls = BREAKPOINTS.map((bp) => window.matchMedia(bp.query));
  mqls.forEach((m) => m.addEventListener('change', cb));
  return () => mqls.forEach((m) => m.removeEventListener('change', cb));
}

function snapshot() {
  if (typeof window === 'undefined') return { cols: 4, label: 'lg' };
  for (const bp of BREAKPOINTS) {
    if (window.matchMedia(bp.query).matches) return { cols: bp.cols, label: bp.label };
  }
  return { cols: 1, label: 'base' };
}

function serverSnapshot() { return { cols: 4, label: 'lg' }; }

function useColsState() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}

/* ================== 示例数据 ================== */
const ITEMS = [
  { id: 1, name: 'canvas-design', tag: '设计' },
  { id: 2, name: 'claude-api', tag: 'AI SDK' },
  { id: 3, name: 'react-best-practices', tag: '前端' },
  { id: 4, name: 'systematic-debugging', tag: '工程' },
  { id: 5, name: 'writing-plans', tag: '规划' },
  { id: 6, name: 'brainstorming', tag: '思维' },
  { id: 7, name: 'mcp-builder', tag: 'MCP' },
  { id: 8, name: 'docx', tag: '文档' },
];

function Card({ item }: { item: typeof ITEMS[number] }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 14,
      border: '1px solid rgba(226,232,240,0.7)', padding: 18,
      minHeight: 90,
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
        {item.name}
      </div>
      <span style={{
        fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 999,
        background: '#f0fdfa', color: '#0d9488', border: '1px solid #ccfbf1',
      }}>
        {item.tag}
      </span>
    </div>
  );
}

export default function FixedColsRowPreview() {
  const { cols, label } = useColsState();
  const visible = ITEMS.slice(0, cols);

  return (
    <PreviewFrame bg="#f5f7fa">
      <div style={{ maxWidth: 1400, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#9ca3af' }}>
          TOKEN · LAYOUT
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.01em', margin: '8px 0 8px' }}>
          Fixed Cols Row
        </h1>
        <p style={{ color: '#64748b', fontSize: 14, margin: '0 0 24px', lineHeight: 1.7, maxWidth: 720 }}>
          useCols + slice(0, cols) · 列数 = 显示数 · 拖窗口看下面列数随断点变化，但<b>永远只展 1 行</b>。
        </p>

        {/* Live 状态条 */}
        <div style={{
          display: 'flex', gap: 20, flexWrap: 'wrap',
          background: '#0f172a', color: '#fff',
          padding: '10px 16px', borderRadius: 10, marginBottom: 20,
          fontFamily: 'JetBrains Mono, monospace', fontSize: 13,
        }}>
          <span>断点：<b style={{ color: '#67e8f9' }}>{label}</b></span>
          <span>cols = <b style={{ color: '#67e8f9' }}>{cols}</b></span>
          <span>items.slice(0, {cols}) → <b style={{ color: '#67e8f9' }}>{visible.length}</b> / {ITEMS.length}</span>
        </div>

        {/* 栅格 · 动态 template */}
        <div
          style={{
            display: 'grid', gap: 16,
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          }}
        >
          {visible.map((item) => (<Card key={item.id} item={item} />))}
        </div>

        {/* 提示 */}
        <div style={{
          marginTop: 24, padding: 16, borderRadius: 10,
          background: '#fff', border: '1px solid #e2e8f0',
          fontSize: 12, color: '#64748b', lineHeight: 1.7,
        }}>
          <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 6, fontSize: 13 }}>关键特性</div>
          <div>· 永远 1 行，不会换行</div>
          <div>· 卡宽在<b> 同屏下恒定</b>（= 容器宽 / cols），不随数据量浮动</div>
          <div>· 数据池里的其余 {ITEMS.length - cols} 张被 slice 掉，不渲染</div>
        </div>
      </div>
    </PreviewFrame>
  );
}
