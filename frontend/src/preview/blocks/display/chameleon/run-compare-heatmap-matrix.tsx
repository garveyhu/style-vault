import { PreviewFrame } from '../../../_layout';
import { ChevronDown, Copy, Sparkles } from 'lucide-react';

/**
 * run-compare-heatmap-matrix · 运行对比 score 热力矩阵
 * 样本行 × 运行列 score 色块热力图(sticky 首列) + 可折叠对比统计区(雷达/分布/折线/胜负 + AI 分析)。
 * 点行开弹窗并排各运行预期/实际输出。借鉴 Langfuse。
 * 源码：frontend/src/system/datasets/components/run-compare-matrix.tsx + run-compare-stats.tsx
 */

const FONT = 'Inter, system-ui, sans-serif';
const MONO = 'JetBrains Mono, monospace';

// scoreBg 三档色阶
function scoreBg(s: number | null): { bg: string; fg: string } {
  if (s == null) return { bg: '#f4f3ee', fg: '#a8a29e' };
  if (s >= 0.8) return { bg: '#ecfdf5', fg: '#047857' };
  if (s >= 0.5) return { bg: '#fffbeb', fg: '#b45309' };
  return { bg: '#fef2f2', fg: '#b91c1c' };
}

const RUNS = [
  { name: 'qwen-max', mean: 0.84 },
  { name: 'gpt-4o-mini', mean: 0.71 },
  { name: 'claude-haiku', mean: 0.66 },
];

const ROWS: { q: string; expected: string; scores: (number | null)[] }[] = [
  { q: '解释什么是向量数据库及适用场景', expected: '向量数据库是一种…', scores: [0.92, 0.78, 0.71] },
  { q: '把这段中文翻译成法语', expected: 'Bonjour, voici…', scores: [0.88, 0.54, 0.61] },
  { q: '如何配置 reranker？', expected: '在 collection 配置里…', scores: [0.74, 0.46, null] },
  { q: '写一个快速排序的 Python 实现', expected: 'def quicksort(arr):…', scores: [0.96, 0.82, 0.79] },
];

const RECHARTS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#f43f5e', '#06b6d4'];

export default function RunCompareHeatmapMatrix() {
  return (
    <PreviewFrame bg="#fafaf7" padded>
      <div style={{ fontFamily: FONT, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* 对比统计折叠（展开态） */}
        <section>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              background: 'none',
              border: 'none',
              padding: 0,
              fontSize: 12.5,
              fontWeight: 500,
              color: '#292524',
              cursor: 'pointer',
            }}
          >
            <ChevronDown size={14} color="#a8a29e" />
            对比统计
            <span style={{ marginLeft: 6, fontSize: 10.5, fontWeight: 400, color: '#a8a29e' }}>
              能力雷达 · 分数分布 · 逐题得分 · AI 分析
            </span>
          </button>

          <div
            style={{
              marginTop: 8,
              borderRadius: 8,
              border: '1px solid #e7e5e0',
              background: '#fff',
              padding: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            {/* AI 总结分析 */}
            <div
              style={{
                borderRadius: 8,
                border: '1px solid rgba(196,181,253,0.7)',
                background: 'rgba(245,243,255,0.3)',
                padding: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: '#5b21b6' }}>AI 总结分析</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      borderRadius: 6,
                      border: '1px solid #ddd6fe',
                      background: '#fff',
                      padding: '4px 8px',
                      fontSize: 11.5,
                      fontWeight: 500,
                      color: '#6d28d9',
                      cursor: 'pointer',
                    }}
                  >
                    <Copy size={14} />
                    复制
                  </button>
                  <button
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      borderRadius: 6,
                      background: '#7c3aed',
                      border: 'none',
                      padding: '4px 10px',
                      fontSize: 11.5,
                      fontWeight: 500,
                      color: '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    <Sparkles size={14} />
                    重新分析
                  </button>
                </div>
              </div>
              <div
                style={{
                  marginTop: 8,
                  borderRadius: 6,
                  background: '#fff',
                  padding: '8px 12px',
                  fontSize: 12.5,
                  lineHeight: 1.625,
                  color: '#44403c',
                }}
              >
                qwen-max 综合均分最高（0.84），在翻译与代码题上稳定领先；claude-haiku 在 reranker
                配置题上缺答，建议补样本复测。
              </div>
            </div>

            {/* 图表网格（简化占位：分布柱 + 折线 示意） */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { title: '能力雷达', hint: '各维度平均分' },
                { title: '分数分布', hint: '各档位题数' },
              ].map(c => (
                <div
                  key={c.title}
                  style={{ borderRadius: 8, border: '1px solid #e7e5e0', background: '#fff', padding: 12 }}
                >
                  <div style={{ marginBottom: 4, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 500, color: '#44403c' }}>{c.title}</span>
                    <span style={{ fontSize: 10, color: '#a8a29e' }}>{c.hint}</span>
                  </div>
                  {/* 占位柱形：3 组各 3 色 */}
                  <div
                    style={{
                      height: 120,
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'space-around',
                      gap: 6,
                      paddingTop: 8,
                    }}
                  >
                    {[0.7, 0.5, 0.85, 0.4, 0.6].map((h, gi) => (
                      <div key={gi} style={{ display: 'flex', alignItems: 'flex-end', gap: 3 }}>
                        {RECHARTS.slice(0, 3).map((col, bi) => (
                          <div
                            key={bi}
                            style={{
                              width: 8,
                              height: Math.max(8, h * 100 - bi * 12),
                              background: col,
                              borderRadius: '2px 2px 0 0',
                            }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  {/* 图例 */}
                  <div style={{ marginTop: 6, display: 'flex', justifyContent: 'center', gap: 10, fontSize: 10, color: '#78716c' }}>
                    {RUNS.map((r, i) => (
                      <span key={r.name} style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                        <span style={{ width: 8, height: 8, borderRadius: 2, background: RECHARTS[i] }} />
                        {r.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 逐样本胜负 */}
            <div>
              <div style={{ marginBottom: 6, fontSize: 11.5, fontWeight: 500, color: '#57534e' }}>
                逐样本胜负
                <span style={{ marginLeft: 6, fontSize: 10.5, fontWeight: 400, color: '#a8a29e' }}>
                  基准 qwen-max
                </span>
              </div>
              {[
                { name: 'gpt-4o-mini', win: 1, tie: 0, loss: 3 },
                { name: 'claude-haiku', win: 0, tie: 1, loss: 3 },
              ].map(w => {
                const total = w.win + w.tie + w.loss || 1;
                return (
                  <div
                    key={w.name}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11.5, marginBottom: 6 }}
                  >
                    <span
                      style={{ minWidth: 150, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#44403c' }}
                    >
                      {w.name}
                    </span>
                    <span style={{ fontFamily: MONO, fontVariantNumeric: 'tabular-nums', color: '#059669' }}>胜 {w.win}</span>
                    <span style={{ fontFamily: MONO, fontVariantNumeric: 'tabular-nums', color: '#a8a29e' }}>平 {w.tie}</span>
                    <span style={{ fontFamily: MONO, fontVariantNumeric: 'tabular-nums', color: '#e11d48' }}>负 {w.loss}</span>
                    <div style={{ display: 'flex', height: 6, flex: 1, overflow: 'hidden', borderRadius: 9999, background: '#f4f3ee' }}>
                      <div style={{ background: '#34d399', width: `${(w.win / total) * 100}%` }} />
                      <div style={{ background: '#d6d3d1', width: `${(w.tie / total) * 100}%` }} />
                      <div style={{ background: '#fb7185', width: `${(w.loss / total) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 热力矩阵表 */}
        <div style={{ borderRadius: 8, border: '1px solid #e7e5e0', overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11.5 }}>
            <thead>
              <tr style={{ background: '#fafaf9' }}>
                <th
                  style={{
                    minWidth: 220,
                    borderBottom: '1px solid #e7e5e0',
                    borderRight: '1px solid #e7e5e0',
                    background: '#fafaf9',
                    padding: '8px 12px',
                    textAlign: 'left',
                    fontWeight: 500,
                    color: '#78716c',
                    position: 'sticky',
                    left: 0,
                    zIndex: 10,
                  }}
                >
                  样本 · 预期
                </th>
                {RUNS.map(r => (
                  <th
                    key={r.name}
                    style={{
                      minWidth: 116,
                      borderBottom: '1px solid #e7e5e0',
                      padding: '8px 12px',
                      textAlign: 'left',
                      fontWeight: 500,
                      color: '#57534e',
                    }}
                  >
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {r.name}
                    </div>
                    <div style={{ marginTop: 2, fontSize: 10, color: '#a8a29e' }}>
                      均值 {r.mean.toFixed(2)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={i} style={{ cursor: 'pointer' }}>
                  <td
                    style={{
                      maxWidth: 260,
                      borderBottom: '1px solid #e7e5e0',
                      borderRight: '1px solid #e7e5e0',
                      background: '#fff',
                      padding: '8px 12px',
                      verticalAlign: 'top',
                      position: 'sticky',
                      left: 0,
                      zIndex: 10,
                    }}
                  >
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#44403c' }}>
                      {row.q}
                    </div>
                    <div
                      style={{
                        marginTop: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: 10,
                        color: '#a8a29e',
                      }}
                    >
                      预期 {row.expected}
                    </div>
                  </td>
                  {row.scores.map((s, ci) => {
                    const c = scoreBg(s);
                    return (
                      <td
                        key={ci}
                        style={{ borderBottom: '1px solid #f1f0eb', padding: '6px', verticalAlign: 'top' }}
                      >
                        <div
                          style={{
                            fontVariantNumeric: 'tabular-nums',
                            width: '100%',
                            borderRadius: 4,
                            padding: '4px 8px',
                            textAlign: 'left',
                            background: c.bg,
                            color: c.fg,
                            boxSizing: 'border-box',
                          }}
                        >
                          {s != null ? s.toFixed(2) : '—'}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PreviewFrame>
  );
}
