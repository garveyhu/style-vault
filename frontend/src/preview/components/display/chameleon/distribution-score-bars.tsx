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

const TOP = [
  { label: '客服问答助手', count: 3210 },
  { label: '合同审查 Agent', count: 1980 },
  { label: 'SQL 生成器', count: 940 },
];

const CHANNELS = [
  { label: '向量相似度', short: '向量', color: '#0ea5e9', v: 0.88 },
  { label: '关键词匹配', short: '关键词', color: '#f59e0b', v: 0.64 },
  { label: '精排得分', short: '精排', color: '#8b5cf6', v: 0.41 },
];

const SCORES = [0.92, 0.71, 0.38, null];

function scoreBg(s: number | null) {
  if (s == null) return { bg: '#f5f5f4', color: '#a8a29e' };
  if (s >= 0.8) return { bg: '#ecfdf5', color: '#047857' };
  if (s >= 0.5) return { bg: '#fffbeb', color: '#b45309' };
  return { bg: '#fef2f2', color: '#b91c1c' };
}

export default function DistributionScoreBars() {
  const distTotal = DIST.reduce((s, r) => s + r.count, 0);
  const topMax = Math.max(...TOP.map(r => r.count));

  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 760, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · DISPLAY</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>Distribution / Channel / Score Bars</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {/* 占比条卡片 */}
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
                      <div style={{ position: 'relative', height: 6, width: '100%', overflow: 'hidden', borderRadius: 6, background: '#f5f5f4' }}>
                        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, borderRadius: 6, background: PRIMARY_400, width: `${pct}%` }} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Top 表内嵌渐变条 */}
          <div style={card}>
            <div style={{ padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 500, color: '#1c1917', margin: '0 0 12px' }}>Top 应用</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {TOP.map((r, i) => (
                  <div key={r.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, borderRadius: 4, fontSize: 10.5, fontWeight: 600, background: i === 0 ? '#fef3c7' : '#f5f5f4', color: i === 0 ? '#b45309' : '#78716c' }}>{i + 1}</span>
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

        {/* 多通道相似度 full */}
        <div style={{ ...card, marginTop: 16 }}>
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

        {/* 分数色编码 chip */}
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>score color (scoreBg)</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            {SCORES.map((s, i) => {
              const c = scoreBg(s);
              return (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 4, padding: '4px 8px', fontFamily: 'monospace', fontSize: 12, fontVariantNumeric: 'tabular-nums', background: c.bg, color: c.color }}>
                  {s == null ? '—' : s.toFixed(2)}
                </span>
              );
            })}
            <span style={{ fontSize: 11, color: '#a8a29e', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <TrendingUp size={14} /> ≥0.8 绿 / 0.5–0.8 黄 / &lt;0.5 红 / 空灰
            </span>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

const card: React.CSSProperties = {
  borderRadius: 8,
  border: '1px solid #e7e5e0',
  background: '#ffffff',
  boxShadow: '0 1px 3px rgb(0 0 0 / 5%), 0 2px 8px rgb(0 0 0 / 3%)',
};
