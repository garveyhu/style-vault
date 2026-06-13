import { PreviewFrame } from '../../../_layout';
import { ChevronDown, Copy, Sparkles } from 'lucide-react';

/**
 * run-compare-heatmap-matrix · 运行对比 score 热力矩阵
 * 样本行 × 运行列 score 色块热力图(sticky 首列) + 可折叠对比统计区(雷达/分布/折线/胜负 + AI 分析)。
 * 点行开弹窗并排各运行预期/实际输出。借鉴 Langfuse。
 * 源码：frontend/src/system/datasets/components/run-compare-matrix.tsx + run-compare-stats.tsx
 */

const FONT = 'Inter, system-ui, sans-serif';

// scoreBg 三档色阶（≥0.8 emerald-50/700 / 0.5–0.8 amber-50/700 / <0.5 red-50/700 / null stone-100/400）
function scoreBg(s: number | null): { bg: string; fg: string } {
  if (s == null) return { bg: '#f5f5f4', fg: '#a8a29e' };
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

// recharts 色板（按 run 索引取）
const RECHARTS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#f43f5e', '#06b6d4'];

// 能力雷达维度（轴）
const RADAR_AXES = ['语义检索', '翻译', '配置问答', '代码生成', '推理'];
// 各 run 在各维度的归一分 0–1
const RADAR_VALUES: number[][] = [
  [0.92, 0.88, 0.74, 0.96, 0.8], // qwen-max
  [0.78, 0.54, 0.46, 0.82, 0.65], // gpt-4o-mini
  [0.71, 0.61, 0.4, 0.79, 0.58], // claude-haiku
];

// 分数分布：5 档 × 3 run 的题数
const DIST_LEVELS = ['优秀', '良好', '及格', '较差', '差'];
const DIST_COUNTS: number[][] = [
  [3, 1, 0, 0, 0], // qwen-max
  [1, 2, 1, 0, 0], // gpt-4o-mini
  [1, 1, 1, 1, 0], // claude-haiku
];

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
              gap: 20,
            }}
          >
            {/* AI 总结分析 — border-violet-200/70 bg-violet-50/30 */}
            <div
              style={{
                borderRadius: 8,
                border: '1px solid rgba(221,214,254,0.7)',
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

            {/* 图表网格：grid grid-cols-1 gap-4 lg:grid-cols-2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* 能力雷达 ChartCard */}
              <ChartCard title="能力雷达" hint="按数据集能力维度归类，各维度平均分">
                <RadarChart />
                <Legend />
              </ChartCard>

              {/* 分数分布 ChartCard */}
              <ChartCard title="分数分布" hint="各档位（优秀→差）的题数">
                <DistBarChart />
                <Legend />
              </ChartCard>

              {/* 逐题得分折线 ChartCard（lg:col-span-2 占满整行） */}
              <div style={{ gridColumn: '1 / -1' }}>
                <ChartCard title="逐题得分" hint="横轴=样本序号，纵轴=得分（看分歧）">
                  <ScoreLineChart />
                  <Legend />
                </ChartCard>
              </div>
            </div>

            {/* 逐样本胜负 */}
            <div>
              <div style={{ marginBottom: 6, fontSize: 11.5, fontWeight: 500, color: '#57534e' }}>
                逐样本胜负
                <span style={{ marginLeft: 6, fontSize: 10.5, fontWeight: 400, color: '#a8a29e' }}>
                  基准 qwen-max ｜ 均分 qwen-max 0.84 · gpt-4o-mini 0.71 · claude-haiku 0.66
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
                    {/* tnum 不带 mono：用正文 Inter */}
                    <span style={{ fontVariantNumeric: 'tabular-nums', color: '#059669' }}>胜 {w.win}</span>
                    <span style={{ fontVariantNumeric: 'tabular-nums', color: '#a8a29e' }}>平 {w.tie}</span>
                    <span style={{ fontVariantNumeric: 'tabular-nums', color: '#e11d48' }}>负 {w.loss}</span>
                    {/* 轨道 bg-stone-100 #f5f5f4 */}
                    <div style={{ display: 'flex', height: 6, flex: 1, overflow: 'hidden', borderRadius: 9999, background: '#f5f5f4' }}>
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
                        style={{ borderBottom: '1px solid #f5f5f4', padding: '6px', verticalAlign: 'top' }}
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

function ChartCard({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ borderRadius: 8, border: '1px solid #e7e5e0', background: '#fff', padding: 12 }}>
      <div style={{ marginBottom: 4, display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: 11.5, fontWeight: 500, color: '#44403c' }}>{title}</span>
        {hint && <span style={{ fontSize: 10, color: '#a8a29e' }}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Legend() {
  return (
    <div style={{ marginTop: 6, display: 'flex', justifyContent: 'center', gap: 10, fontSize: 10, color: '#78716c' }}>
      {RUNS.map((r, i) => (
        <span key={r.name} style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: RECHARTS[i] }} />
          {r.name}
        </span>
      ))}
    </div>
  );
}

// 真·能力雷达（多边形辐射，PolarGrid + PolarAngleAxis 风格）
function RadarChart() {
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const R = 72; // outerRadius
  const n = RADAR_AXES.length;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i: number, r: number) => ({
    x: cx + Math.cos(angle(i)) * R * r,
    y: cy + Math.sin(angle(i)) * R * r,
  });
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <div style={{ height: 200, display: 'flex', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* PolarGrid 同心多边形 stroke #e7e5e4 */}
        {rings.map((rr, ri) => (
          <polygon
            key={ri}
            points={RADAR_AXES.map((_, i) => {
              const p = pt(i, rr);
              return `${p.x},${p.y}`;
            }).join(' ')}
            fill="none"
            stroke="#e7e5e4"
            strokeWidth={1}
          />
        ))}
        {/* 轴线 */}
        {RADAR_AXES.map((_, i) => {
          const p = pt(i, 1);
          return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#e7e5e4" strokeWidth={1} />;
        })}
        {/* 各 run 的辐射多边形（fillOpacity 0.12） */}
        {RADAR_VALUES.map((vals, ri) => (
          <polygon
            key={ri}
            points={vals.map((v, i) => {
              const p = pt(i, v);
              return `${p.x},${p.y}`;
            }).join(' ')}
            fill={RECHARTS[ri]}
            fillOpacity={0.12}
            stroke={RECHARTS[ri]}
            strokeWidth={1.4}
          />
        ))}
        {/* 维度标签 PolarAngleAxis tick fontSize 11 fill #78716c */}
        {RADAR_AXES.map((label, i) => {
          const p = pt(i, 1.16);
          return (
            <text
              key={i}
              x={p.x}
              y={p.y}
              fontSize={9}
              fill="#78716c"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

// 分数分布 BarChart（5 档 × 3 run 分组柱，radius [2,2,0,0]）
function DistBarChart() {
  const H = 200;
  const plotH = 150;
  const maxCount = 3;
  return (
    <div style={{ height: H, display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          gap: 8,
          borderBottom: '1px solid #f5f5f4',
          paddingBottom: 0,
        }}
      >
        {DIST_LEVELS.map((lv, li) => (
          <div key={lv} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: plotH }}>
              {RUNS.map((_, ri) => {
                const c = DIST_COUNTS[ri][li];
                return (
                  <div
                    key={ri}
                    style={{
                      width: 9,
                      height: Math.max(2, (c / maxCount) * plotH),
                      background: RECHARTS[ri],
                      borderRadius: '2px 2px 0 0',
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {/* XAxis 档位标签 */}
      <div style={{ display: 'flex', justifyContent: 'space-around', gap: 8, marginTop: 4 }}>
        {DIST_LEVELS.map(lv => (
          <span key={lv} style={{ flex: 1, textAlign: 'center', fontSize: 11, color: '#78716c' }}>
            {lv}
          </span>
        ))}
      </div>
    </div>
  );
}

// 逐题得分 LineChart（x=样本序号 y=得分 0–1，多线 strokeWidth 1.6 dot=false）
function ScoreLineChart() {
  const W = 640;
  const H = 210;
  const padL = 28;
  const padR = 12;
  const padT = 8;
  const padB = 22;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const n = ROWS.length;
  const x = (i: number) => padL + (plotW * i) / (n - 1);
  const y = (v: number) => padT + plotH * (1 - v);

  // 每个 run 取该 run 在各样本上的分（缺失断开）
  const lines = RUNS.map((_, ri) =>
    ROWS.map((row, i) => ({ i, v: row.scores[ri] })),
  );
  const yTicks = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div style={{ height: H, width: '100%' }}>
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        {/* CartesianGrid 虚线 stroke #f5f5f4 */}
        {yTicks.map((t, ti) => (
          <g key={ti}>
            <line
              x1={padL}
              y1={y(t)}
              x2={W - padR}
              y2={y(t)}
              stroke="#f5f5f4"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <text x={padL - 6} y={y(t)} fontSize={10} fill="#a8a29e" textAnchor="end" dominantBaseline="middle">
              {t}
            </text>
          </g>
        ))}
        {/* XAxis 样本序号 */}
        {ROWS.map((_, i) => (
          <text key={i} x={x(i)} y={H - 6} fontSize={9} fill="#a8a29e" textAnchor="middle">
            {i + 1}
          </text>
        ))}
        {/* 各 run 折线（connectNulls + strokeWidth 1.6） */}
        {lines.map((pts, ri) => {
          const valid = pts.filter(p => p.v != null) as { i: number; v: number }[];
          if (valid.length === 0) return null;
          const d = valid.map((p, k) => `${k === 0 ? 'M' : 'L'} ${x(p.i)} ${y(p.v)}`).join(' ');
          return <path key={ri} d={d} fill="none" stroke={RECHARTS[ri]} strokeWidth={1.6} />;
        })}
      </svg>
    </div>
  );
}
