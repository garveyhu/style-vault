import { PreviewFrame } from '../../../_layout';
import { TrendingUp } from 'lucide-react';

const PRIMARY_400 = '#60a5fa';
const PRIMARY_300 = '#93c5fd';
const PRIMARY_500 = '#3b82f6';

const DIST = [
  { label: 'OpenAI 兼容', count: 4820 },
  { label: 'Playground 调试', count: 2140 },
  { label: '嵌入式 Widget', count: 1360 },
  { label: 'API 直连', count: 720 },
];

// 4 行：金 / 银 / 铜 / 其余(stone)，覆盖 RankBadge 全 4 档
const TOP = [
  { label: '客服问答助手', count: 3210 },
  { label: '合同审查 Agent', count: 1980 },
  { label: 'SQL 生成器', count: 940 },
  { label: '文档摘要器', count: 520 },
];

const CHANNELS = [
  { label: '向量相似度', short: '向量', color: '#0ea5e9', v: 0.88 },
  { label: '关键词匹配', short: '关键词', color: '#f59e0b', v: 0.64 },
  { label: '精排得分', short: '精排', color: '#8b5cf6', v: 0.41 },
];

const SCORES = [0.92, 0.71, 0.38, null];

// RankBadge TONE：金 amber-100/700/200 · 银 slate-200/600/300 · 铜 orange-100/700/200 · 其余 stone-100/400/200
const RANK_TONE = [
  { bg: '#fef3c7', fg: '#b45309', ring: '#fde68a' }, // rank1 金
  { bg: '#e2e8f0', fg: '#475569', ring: '#cbd5e1' }, // rank2 银
  { bg: '#ffedd5', fg: '#c2410c', ring: '#fed7aa' }, // rank3 铜
];
const RANK_FALLBACK = { bg: '#f5f5f4', fg: '#a8a29e', ring: '#e7e5e4' };

// scoreBg：底色 chip（≥0.8 绿 / 0.5-0.8 黄 / <0.5 红 / 空灰）
function scoreBg(s: number | null) {
  if (s == null) return { bg: '#f5f5f4', color: '#a8a29e' };
  if (s >= 0.8) return { bg: '#ecfdf5', color: '#047857' };
  if (s >= 0.5) return { bg: '#fffbeb', color: '#b45309' };
  return { bg: '#fef2f2', color: '#b91c1c' };
}

// scoreColor：纯文字色（≥0.8 emerald-600 / 0.5-0.8 amber-600 / <0.5 red-600 / 空 stone-400）
function scoreColor(s: number | null) {
  if (s == null) return '#a8a29e';
  if (s >= 0.8) return '#059669';
  if (s >= 0.5) return '#d97706';
  return '#dc2626';
}

function RankBadge({ index }: { index: number }) {
  const t = RANK_TONE[index] ?? RANK_FALLBACK;
  return (
    <span style={{
      display: 'inline-flex', flexShrink: 0, width: 20, height: 20, alignItems: 'center', justifyContent: 'center',
      borderRadius: '50%', fontSize: 10, fontWeight: 600, fontVariantNumeric: 'tabular-nums',
      background: t.bg, color: t.fg, boxShadow: `inset 0 0 0 1px ${t.ring}`,
    }}>{index + 1}</span>
  );
}

export default function DistributionScoreBars() {
  const distTotal = DIST.reduce((s, r) => s + r.count, 0);
  const topMax = Math.max(...TOP.map(r => r.count));

  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 760, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · DISPLAY</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>Distribution / Rank / Score Bars</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {/* 占比条卡片（DistributionCard）— 条与内填 rounded(4px) */}
          <div style={card}>
            <div style={{ padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 500, color: '#1c1917', margin: '0 0 12px' }}>渠道分布</h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {DIST.map(r => {
                  const pct = (r.count / distTotal) * 100;
                  return (
                    <li key={r.label}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                        <span style={{ color: '#44403c', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.label}</span>
                        <span style={{ flexShrink: 0, paddingLeft: 8, color: '#78716c', fontVariantNumeric: 'tabular-nums' }}>
                          {r.count.toLocaleString()}<span style={{ marginLeft: 4, color: '#a8a29e' }}>{pct.toFixed(0)}%</span>
                        </span>
                      </div>
                      <div style={{ position: 'relative', height: 6, width: '100%', overflow: 'hidden', borderRadius: 4, background: '#f5f5f4' }}>
                        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, borderRadius: 4, background: PRIMARY_400, width: `${pct}%` }} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Top 表内嵌渐变条 + RankBadge 金银铜全档 */}
          <div style={card}>
            <div style={{ padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 500, color: '#1c1917', margin: '0 0 12px' }}>Top 应用</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {TOP.map((r, i) => (
                  <div key={r.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                      <RankBadge index={i} />
                      <span style={{ color: '#44403c', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.label}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ height: 6, width: 64, overflow: 'hidden', borderRadius: 9999, background: '#f5f5f4' }}>
                        <div style={{ height: '100%', borderRadius: 9999, background: `linear-gradient(90deg, ${PRIMARY_300}, ${PRIMARY_500})`, width: `${(r.count / topMax) * 100}%` }} />
                      </div>
                      <span style={{ width: 40, textAlign: 'right', color: '#57534e', fontVariantNumeric: 'tabular-nums' }}>{r.count.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RankBadge 四档独立示意（金/银/铜/其余） */}
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>RankBadge · h-5 w-5 rounded-full ring-inset · 金 / 银 / 铜 / 其余</div>
          <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
            {['金 amber', '银 slate', '铜 orange', '其余 stone'].map((lbl, i) => (
              <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <RankBadge index={i} />
                <span style={{ fontSize: 11, color: '#78716c' }}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 多通道相似度 full（ScoreBreakdown）*/}
        <div style={{ ...card, marginTop: 24 }}>
          <div style={{ padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 500, color: '#1c1917', margin: '0 0 12px' }}>RAG 命中分项 (full)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {CHANNELS.map(c => {
                const pct = Math.max(0, Math.min(100, Math.round(c.v * 100)));
                return (
                  <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 64, flexShrink: 0, textAlign: 'right', fontSize: 10.5, color: '#78716c' }}>{c.label}</span>
                    <div style={{ height: 6, flex: 1, overflow: 'hidden', borderRadius: 9999, background: '#f5f5f4' }}>
                      <div style={{ height: '100%', borderRadius: 9999, background: c.color, width: `${pct}%` }} />
                    </div>
                    <span style={{ width: 36, flexShrink: 0, textAlign: 'right', fontFamily: 'monospace', fontSize: 10.5, fontVariantNumeric: 'tabular-nums', color: '#57534e' }}>{pct}%</span>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: 10, rowGap: 2 }}>
              {CHANNELS.map(c => (
                <span key={c.short} style={{ fontSize: 10.5, color: '#78716c' }}>
                  {c.short}<span style={{ marginLeft: 2, fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums', color: '#44403c' }}>{Math.round(c.v * 100)}%</span>
                </span>
              ))}
              <span style={{ fontSize: 10.5, color: '#a8a29e', marginLeft: 8 }}>← compact 模式</span>
            </div>
          </div>
        </div>

        {/* 分数着色：scoreBg 底色 chip + scoreColor 纯文字 + 矩阵单元格 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
          {/* scoreBg chip */}
          <div>
            <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>scoreBg · 底色 chip</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              {SCORES.map((s, i) => {
                const c = scoreBg(s);
                return (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 4, padding: '4px 8px', fontFamily: 'monospace', fontSize: 12, fontVariantNumeric: 'tabular-nums', background: c.bg, color: c.color }}>
                    {s == null ? '—' : s.toFixed(2)}
                  </span>
                );
              })}
            </div>
          </div>
          {/* scoreColor 纯文字 */}
          <div>
            <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>scoreColor · 纯文字色 (tnum)</div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
              {SCORES.map((s, i) => (
                <span key={i} style={{ fontFamily: 'monospace', fontSize: 14, fontVariantNumeric: 'tabular-nums', color: scoreColor(s) }}>
                  {s == null ? '—' : s.toFixed(2)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 矩阵单元格：scoreBg + rounded px-2 py-1 text-left w-full tnum */}
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>对比矩阵单元格 · rounded px-2 py-1 text-left</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, maxWidth: 360 }}>
            {SCORES.map((s, i) => {
              const c = scoreBg(s);
              return (
                <div key={i} style={{ borderRadius: 4, padding: '4px 8px', textAlign: 'left', fontVariantNumeric: 'tabular-nums', width: '100%', background: c.bg, color: c.color, fontSize: 12, fontFamily: 'monospace' }}>
                  {s == null ? '—' : s.toFixed(2)}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: 20, fontSize: 11, color: '#a8a29e', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <TrendingUp size={14} /> ≥0.8 绿 / 0.5–0.8 黄 / &lt;0.5 红 / 空灰 · scoreBg(底)与 scoreColor(字)两套着色函数
        </div>
      </div>
    </PreviewFrame>
  );
}

const card: React.CSSProperties = {
  borderRadius: 8,
  border: '1px solid #e7e5e0',
  background: '#fffefb',
  boxShadow: '0 1px 3px rgb(0 0 0 / 5%), 0 2px 8px rgb(0 0 0 / 3%)',
};
