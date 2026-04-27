import { useLayoutEffect, useRef, useState } from 'react';
import { PreviewFrame } from '../../_layout';

/* ================== 示例数据 · 支持切换数量 ================== */
const POOL = [
  { id: 1, name: 'canvas-design', tag: '设计' },
  { id: 2, name: 'claude-api', tag: 'AI SDK' },
  { id: 3, name: 'react-best-practices', tag: '前端' },
  { id: 4, name: 'systematic-debugging', tag: '工程' },
  { id: 5, name: 'writing-plans', tag: '规划' },
  { id: 6, name: 'brainstorming', tag: '思维' },
  { id: 7, name: 'mcp-builder', tag: 'MCP' },
  { id: 8, name: 'docx', tag: '文档' },
  { id: 9, name: 'xlsx', tag: '表格' },
  { id: 10, name: 'pdf', tag: '文档' },
  { id: 11, name: 'pptx', tag: '演示' },
  { id: 12, name: 'docker-best-practices', tag: 'DevOps' },
  { id: 13, name: 'fastapi-best-practices', tag: '后端' },
  { id: 14, name: 'brand-guidelines', tag: '品牌' },
  { id: 15, name: 'algorithmic-art', tag: '艺术' },
  { id: 16, name: 'webapp-testing', tag: '测试' },
];

type Mode = 'fill' | 'fixed';

function Card({ item }: { item: typeof POOL[number] }) {
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

export default function ResponsiveGridPreview() {
  const [mode, setMode] = useState<Mode>('fixed');
  const [count, setCount] = useState(3);
  const gridRef = useRef<HTMLDivElement>(null);
  const [measured, setMeasured] = useState<{ cols: number; cardW: number }>({ cols: 0, cardW: 0 });

  // 测量实际列数和卡宽
  useLayoutEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const measure = () => {
      const cs = getComputedStyle(el);
      const cols = cs.gridTemplateColumns.split(' ').length;
      const firstChild = el.firstElementChild as HTMLElement | null;
      const cardW = firstChild ? Math.round(firstChild.getBoundingClientRect().width) : 0;
      setMeasured({ cols, cardW });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [count, mode]);

  const items = POOL.slice(0, count);
  const tracks = mode === 'fill' ? 'auto-fit' : 'auto-fill';

  return (
    <PreviewFrame bg="#f5f7fa">
      <div style={{ maxWidth: 1400, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#9ca3af' }}>
          TOKEN · LAYOUT
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.01em', margin: '8px 0 8px' }}>
          Responsive Grid
        </h1>
        <p style={{ color: '#64748b', fontSize: 14, margin: '0 0 24px', lineHeight: 1.7, maxWidth: 720 }}>
          双模式响应式栅格 · 切换 <b>fill / fixed</b> 看少量数据时的差异：
          fill 把空列折叠让卡片<b>拉伸填行</b>，fixed 保留空列让卡片<b>保持自然列宽</b>。
        </p>

        {/* Live 状态条 */}
        <div style={{
          display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center',
          background: '#0f172a', color: '#fff',
          padding: '10px 16px', borderRadius: 10, marginBottom: 16,
          fontFamily: 'JetBrains Mono, monospace', fontSize: 13,
        }}>
          <span>模式：<b style={{ color: '#67e8f9' }}>{mode}</b></span>
          <span>tracks：<b style={{ color: '#67e8f9' }}>{tracks}</b></span>
          <span>实测列数：<b style={{ color: '#67e8f9' }}>{measured.cols}</b></span>
          <span>实测卡宽：<b style={{ color: '#67e8f9' }}>{measured.cardW}</b> px</span>
          <span>数据量：<b style={{ color: '#67e8f9' }}>{items.length}</b> / {POOL.length}</span>
        </div>

        {/* Mode 切换 */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#64748b', marginRight: 4 }}>模式：</span>
          {(['fixed', 'fill'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: '6px 14px', fontSize: 12, fontWeight: 600,
                borderRadius: 999, cursor: 'pointer',
                background: mode === m ? '#0f172a' : '#fff',
                color: mode === m ? '#fff' : '#475569',
                border: '1px solid #e2e8f0', fontFamily: 'inherit',
              }}
            >
              {m}
              <span style={{ opacity: 0.6, marginLeft: 6, fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
                {m === 'fill' ? 'auto-fit' : 'auto-fill'}
              </span>
            </button>
          ))}
        </div>

        {/* 数据量切换 */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#64748b', marginRight: 4 }}>数据量：</span>
          {[1, 2, 3, 4, 8, 16].map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              style={{
                padding: '4px 12px', fontSize: 12, fontWeight: 500,
                borderRadius: 6, cursor: 'pointer',
                background: count === n ? '#0f172a' : '#fff',
                color: count === n ? '#fff' : '#475569',
                border: '1px solid #e2e8f0', fontFamily: 'inherit',
              }}
            >
              {n} 条
            </button>
          ))}
        </div>

        {/* 栅格 · 双模式 */}
        <div
          ref={gridRef}
          style={{
            display: 'grid', gap: 16,
            gridTemplateColumns: `repeat(${tracks}, minmax(280px, 1fr))`,
          }}
        >
          {items.map((item) => (<Card key={item.id} item={item} />))}
        </div>

        {/* 提示 · 跟随 mode 改变文案 */}
        <div style={{
          marginTop: 24, padding: 16, borderRadius: 10,
          background: '#fff', border: '1px solid #e2e8f0',
          fontSize: 12, color: '#64748b', lineHeight: 1.7,
        }}>
          <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 6, fontSize: 13 }}>
            {mode === 'fill' ? 'fill · auto-fit + 1fr' : 'fixed · auto-fill + 1fr'}
          </div>
          {mode === 'fill' ? (
            <>
              <div>· 永远填满容器宽度，<b>无右侧留白</b></div>
              <div>· 数据少时空 track 折叠为 0，已有卡片<b>拉伸瓜分整行</b></div>
              <div>· 切「1 条」看最极端的"单卡吃满容器宽"</div>
              <div>· 适合搜索结果、全量列表等"必须填满"的场景</div>
            </>
          ) : (
            <>
              <div>· 卡片宽度 = 容器满列时的列宽，<b>不受数据量影响</b></div>
              <div>· 数据少时空 track 保留，每个 track 都按 1fr 等分容器宽</div>
              <div>· 切「1 条」看卡片<b>保持原宽度</b>、右侧自然留白</div>
              <div>· 适合个人主页收藏、作品集等"卡宽优先于填满"的场景</div>
            </>
          )}
        </div>
      </div>
    </PreviewFrame>
  );
}
