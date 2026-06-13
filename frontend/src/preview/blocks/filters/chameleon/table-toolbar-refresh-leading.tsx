import { PreviewFrame } from '../../../_layout';
import { RotateCw, Search, ChevronDown, Calendar, Plus } from 'lucide-react';

/**
 * table-toolbar-refresh-leading · Chameleon TableToolbar
 * waveflow 三段式 + 独立 RotateCw 刷新按钮（右区最左）+ leadingExtra 槽（排下拉前）
 * 源码：frontend/src/core/components/table/table-toolbar.tsx
 */

export default function TableToolbarRefreshLeading() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: 24, fontFamily: 'Inter, system-ui, sans-serif' }}>
        <section
          style={{
            background: '#fffefb',
            border: '1px solid rgba(231,229,224,0.4)',
            borderRadius: 12,
            boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)',
            padding: 20,
          }}
        >
          {/* ── TOOLBAR ── mb-2.5 flex items-center gap-2 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <h3 style={{ fontSize: 13.5, fontWeight: 600, color: '#1c1917', margin: 0 }}>运行记录</h3>

            {/* 右区 ml-auto gap-1.5 */}
            <div style={{ marginLeft: 'auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
              {/* 独立刷新按钮（右区最左）h-7 w-7 rounded-md */}
              <button
                title="刷新"
                style={{
                  display: 'flex',
                  height: 28,
                  width: 28,
                  flexShrink: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 6,
                  border: 'none',
                  background: 'transparent',
                  color: '#a8a29e',
                  cursor: 'pointer',
                }}
              >
                <RotateCw size={14} />
              </button>

              {/* leadingExtra 槽：DateRangePicker（排下拉前） */}
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  height: 28,
                  padding: '0 10px',
                  background: '#fff',
                  border: '1px solid #d6d3d1',
                  borderRadius: 6,
                  fontSize: 12,
                  color: '#44403c',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                <Calendar size={12} color="#a8a29e" />
                近 7 天
                <ChevronDown size={12} color="#a8a29e" />
              </button>

              {/* search：relative + 前缀图标按钮 + Input !h-7 pl-6 */}
              <div style={{ position: 'relative' }}>
                <button
                  title="搜索"
                  style={{
                    position: 'absolute',
                    left: 6,
                    top: '50%',
                    zIndex: 10,
                    transform: 'translateY(-50%)',
                    borderRadius: 4,
                    padding: 2,
                    border: 'none',
                    background: 'transparent',
                    color: '#a8a29e',
                    cursor: 'pointer',
                    display: 'inline-flex',
                  }}
                >
                  <Search size={12} />
                </button>
                <input
                  placeholder="搜索 trace"
                  style={{
                    height: 28,
                    paddingLeft: 24,
                    paddingRight: 8,
                    fontSize: 12,
                    border: '1px solid #d6d3d1',
                    borderRadius: 6,
                    maxWidth: 180,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* filter Select × 2 · !h-7 width 110 */}
              {['执行状态', '渠道'].map(p => (
                <button
                  key={p}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    height: 28,
                    padding: '0 10px',
                    width: 110,
                    background: '#fff',
                    border: '1px solid #d6d3d1',
                    borderRadius: 6,
                    fontSize: 12,
                    color: '#a8a29e',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p}
                  </span>
                  {/* SelectTrigger 内置 ChevronDown：h-4 w-4(16px) opacity-50 */}
                  <ChevronDown size={16} color="#a8a29e" style={{ opacity: 0.5, flexShrink: 0 }} />
                </button>
              ))}

              {/* extra 槽 */}
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  height: 28,
                  padding: '0 10px',
                  background: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 11.5,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                <Plus size={14} /> 导出
              </button>
            </div>
          </div>

          {/* 占位表格表头，呈现"工具栏 + 表格"语境 */}
          <div style={{ border: '1px solid rgba(231,229,224,0.6)', borderRadius: 8, overflow: 'hidden' }}>
            <div
              style={{
                background: 'rgba(244,243,238,0.4)',
                display: 'flex',
                gap: 12,
                padding: '8px 12px',
                fontSize: 10.5,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#78716c',
                fontWeight: 500,
              }}
            >
              <span style={{ flex: 1 }}>Trace</span>
              <span style={{ width: 80 }}>状态</span>
              <span style={{ width: 90 }}>渠道</span>
              <span style={{ width: 120 }}>时间</span>
            </div>
            {[0, 1, 2].map(i => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: '10px 12px',
                  borderTop: '1px solid #f5f4ee',
                  fontSize: 12.5,
                  color: '#57534e',
                }}
              >
                <span style={{ flex: 1, fontFamily: 'JetBrains Mono, monospace', color: '#78716c' }}>
                  trace-{1024 + i}
                </span>
                <span style={{ width: 80, color: i === 1 ? '#dc2626' : '#059669' }}>
                  {i === 1 ? '失败' : '成功'}
                </span>
                <span style={{ width: 90 }}>playground</span>
                <span style={{ width: 120, fontFamily: 'JetBrains Mono, monospace', color: '#78716c' }}>
                  06-13 14:0{i}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PreviewFrame>
  );
}
