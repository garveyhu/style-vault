import { PreviewFrame } from '../../../_layout';
import { ArrowDown, ArrowUpDown, HelpCircle } from 'lucide-react';

/**
 * responsive-overlay-data-table · 自适应横滚 + 蓝渐变 overlay 数据表
 * 4px 左状态条 + 8 行双阈值 shimmer 骨架 + 顶部蓝渐变 refreshing overlay(静默换页)
 * + scrollX/minWidth 自适应 + ArrowUpDown 排序 + hover ? 列提示 + 空态 + 行 hover:bg-stone-50。
 * 与 waveflow 同源但表头(无暖底/无大写) + 刷新机制(overlay) 分叉。
 * 源码：core/components/table/data-table.tsx + column-header.tsx
 */

const FONT = 'Inter, system-ui, sans-serif';
const MONO = 'JetBrains Mono, monospace';

// 与源码列 key 对齐（骨架宽度公式依赖 key.length）
const COLUMNS = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: '名称' },
  { key: 'model', header: '模型' },
  { key: 'cost', header: '成本' },
  { key: 'status', header: '状态' },
];

const ROWS = [
  { id: 2001, name: '财务对账日终任务', model: 'qwen-max', cost: 0.082, status: '成功', bar: '#10b981' },
  { id: 2002, name: '物联采集 5min 增量', model: 'gpt-4o-mini', cost: 0.014, status: '失败', bar: '#ef4444' },
  { id: 2003, name: '日终数据回流', model: 'claude-haiku', cost: 0.031, status: '停用', bar: '#d6d3d1' },
  { id: 2004, name: '快照备份调度', model: 'qwen-plus', cost: 0.026, status: '成功', bar: '#10b981' },
];

const STATUS_COLOR: Record<string, string> = {
  成功: '#059669',
  失败: '#dc2626',
  停用: '#a8a29e',
};

const th: React.CSSProperties = { padding: '10px 12px', textAlign: 'left', fontWeight: 500 };
const td: React.CSSProperties = { padding: '12px' };

// divide-y divide-stone-100 = #f5f5f4
const DIVIDE = '#f5f5f4';

function ColGroup() {
  return (
    <colgroup>
      <col style={{ width: 4 }} /> {/* leftBar 槽 */}
      <col style={{ width: 64 }} />
      <col />
      <col style={{ width: 130 }} />
      <col style={{ width: 110 }} />
      <col style={{ width: 80 }} />
    </colgroup>
  );
}

function Thead() {
  return (
    <thead style={{ borderBottom: '1px solid rgba(231,229,224,0.7)' }}>
      <tr style={{ fontSize: 11, fontWeight: 500, color: '#a8a29e' }}>
        <th style={{ padding: 0 }} />
        <th style={th}>
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              background: 'none',
              border: 'none',
              padding: 0,
              font: 'inherit',
              color: 'inherit',
              cursor: 'pointer',
            }}
          >
            ID
            <ArrowDown size={12} />
          </button>
        </th>
        <th style={th}>名称</th>
        <th style={th}>模型</th>
        <th style={th}>
          {/* hover ? 列提示原子（ColumnHeader：HelpCircle h-3 w-3 text-stone-300 strokeWidth 1.75） */}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            成本
            <HelpCircle size={12} strokeWidth={1.75} color="#d6d3d1" style={{ cursor: 'help' }} />
          </span>
        </th>
        <th style={th}>
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              background: 'none',
              border: 'none',
              padding: 0,
              font: 'inherit',
              color: 'inherit',
              cursor: 'pointer',
            }}
          >
            状态
            <ArrowUpDown size={12} color="#d6d3d1" />
          </button>
        </th>
      </tr>
    </thead>
  );
}

export default function ResponsiveOverlayDataTable() {
  return (
    <PreviewFrame bg="#fafaf7" padded>
      <style>{`@keyframes global-progress {
        0% { transform: translateX(-100%) }
        100% { transform: translateX(100%) }
      }
      @keyframes chm-shimmer {
        0% { background-position: -200px 0 }
        100% { background-position: 200px 0 }
      }`}</style>

      <div style={{ fontFamily: FONT, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* ===== 主表：含数据 + 顶部蓝渐变 refreshing overlay（静默换页态） ===== */}
        <div
          style={{
            position: 'relative',
            borderRadius: 8,
            border: '1px solid rgba(231,229,224,0.6)',
            overflow: 'hidden',
          }}
        >
          {/* refreshing overlay：顶部 2px 蓝渐变进度条 */}
          <div
            style={{
              pointerEvents: 'none',
              position: 'absolute',
              insetInline: 0,
              top: 0,
              zIndex: 10,
              height: 2,
              overflow: 'hidden',
              background: 'rgba(231,229,224,0.3)',
            }}
          >
            <div
              style={{
                height: '100%',
                background:
                  'linear-gradient(90deg, transparent 0%, #3b82f6 40%, #2563eb 60%, transparent 100%)',
                animation: 'global-progress 1.1s ease-in-out infinite',
              }}
            />
          </div>

          <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
            <ColGroup />
            <Thead />
            {/* tbody：overlay 时 opacity-50 + pointer-events-none */}
            <tbody style={{ fontSize: 12.5, opacity: 0.5, transition: 'opacity 200ms' }}>
              {ROWS.map((r, idx) => (
                <tr
                  key={r.id}
                  style={{ borderTop: idx === 0 ? 'none' : `1px solid ${DIVIDE}`, position: 'relative' }}
                >
                  {/* leftBar：绝对定位铺满行高 */}
                  <td style={{ position: 'relative', padding: 0 }}>
                    <span
                      style={{ position: 'absolute', insetBlock: 0, left: 0, width: 4, background: r.bar }}
                    />
                  </td>
                  <td
                    style={{ ...td, fontFamily: MONO, color: '#78716c', fontVariantNumeric: 'tabular-nums' }}
                  >
                    {r.id}
                  </td>
                  <td style={{ ...td, fontWeight: 500, color: '#1c1917' }}>{r.name}</td>
                  <td style={{ ...td, fontFamily: MONO, fontSize: 11.5, color: '#57534e' }}>{r.model}</td>
                  <td
                    style={{ ...td, fontFamily: MONO, fontSize: 11.5, color: '#57534e', fontVariantNumeric: 'tabular-nums' }}
                  >
                    ${r.cost.toFixed(3)}
                  </td>
                  <td style={{ ...td, fontSize: 11.5, color: STATUS_COLOR[r.status] }}>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===== 常规态：演示首行 hover:bg-stone-50（cursor-pointer 当 onRowClick） ===== */}
        <div
          style={{
            position: 'relative',
            borderRadius: 8,
            border: '1px solid rgba(231,229,224,0.6)',
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
            <ColGroup />
            <Thead />
            <tbody style={{ fontSize: 12.5 }}>
              {ROWS.slice(0, 2).map((r, idx) => (
                <tr
                  key={r.id}
                  style={{
                    borderTop: idx === 0 ? 'none' : `1px solid ${DIVIDE}`,
                    position: 'relative',
                    // group transition-colors hover:bg-stone-50 (#fafaf9)；首行演示 hover 态
                    background: idx === 0 ? '#fafaf9' : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <td style={{ position: 'relative', padding: 0 }}>
                    <span
                      style={{ position: 'absolute', insetBlock: 0, left: 0, width: 4, background: r.bar }}
                    />
                  </td>
                  <td
                    style={{ ...td, fontFamily: MONO, color: '#78716c', fontVariantNumeric: 'tabular-nums' }}
                  >
                    {r.id}
                  </td>
                  <td style={{ ...td, fontWeight: 500, color: '#1c1917' }}>{r.name}</td>
                  <td style={{ ...td, fontFamily: MONO, fontSize: 11.5, color: '#57534e' }}>{r.model}</td>
                  <td
                    style={{ ...td, fontFamily: MONO, fontSize: 11.5, color: '#57534e', fontVariantNumeric: 'tabular-nums' }}
                  >
                    ${r.cost.toFixed(3)}
                  </td>
                  <td style={{ ...td, fontSize: 11.5, color: STATUS_COLOR[r.status] }}>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===== 骨架态：8 行双阈值 shimmer（演示首次加载） ===== */}
        <div
          style={{
            position: 'relative',
            borderRadius: 8,
            border: '1px solid rgba(231,229,224,0.6)',
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
            <ColGroup />
            <Thead />
            <tbody style={{ fontSize: 12.5 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <tr key={'skl' + i} style={{ borderTop: i === 0 ? 'none' : `1px solid ${DIVIDE}` }}>
                  <td style={{ padding: 0 }}>
                    <span style={{ display: 'block', height: 40, width: 4, background: 'transparent' }} />
                  </td>
                  {COLUMNS.map(c => (
                    <td key={c.key} style={{ padding: 12 }}>
                      <div
                        style={{
                          // h-2 rounded-full skeleton + width `${40 + ((i*7 + c.key.length) % 50)}%`
                          height: 8,
                          borderRadius: 9999,
                          background:
                            'linear-gradient(90deg, #ebe9e3 0%, #f5f4ee 50%, #ebe9e3 100%)',
                          backgroundSize: '400px 100%',
                          animation: 'chm-shimmer 1.6s ease-in-out infinite',
                          width: `${40 + ((i * 7 + c.key.length) % 50)}%`,
                        }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===== 空态：colSpan 全列 py-8 text-center text-stone-400（emptyText + emptyExtra） ===== */}
        <div
          style={{
            position: 'relative',
            borderRadius: 8,
            border: '1px solid rgba(231,229,224,0.6)',
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
            <ColGroup />
            <Thead />
            <tbody style={{ fontSize: 12.5 }}>
              <tr>
                <td colSpan={6} style={{ padding: '32px 0', textAlign: 'center', color: '#a8a29e' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div>暂无任务</div>
                    <div style={{ fontSize: 11.5 }}>调整筛选条件，或新建一个调度任务</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ fontSize: 11, color: '#a8a29e' }}>
          上：已有数据 + 顶部蓝渐变 refreshing overlay（静默换页，body 降透明）。中：常规 hover:bg-stone-50
          行态。下：首次加载 8 行双阈值延迟 shimmer 骨架 + 空态。
        </div>
      </div>
    </PreviewFrame>
  );
}
