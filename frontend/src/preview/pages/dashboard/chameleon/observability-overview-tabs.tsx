import { PreviewFrame } from '../../../_layout';
import { Activity, Bot, Calendar, Sparkles, TrendingDown, TrendingUp, Users } from 'lucide-react';

const MONO = 'JetBrains Mono, ui-monospace, monospace';

const CARD_LG: React.CSSProperties = {
  borderRadius: 8, border: '1px solid #e7e5e0', background: '#fffefb',
  boxShadow: '0 1px 3px rgb(0 0 0 / 5%), 0 2px 8px rgb(0 0 0 / 3%)',
};

const KPIS = [
  { label: '调用量', value: '12,340', hint: '上一周期 10,980', delta: 0.124, icon: Activity, tone: 'primary' as const },
  { label: '成功率', value: '99.4%', hint: 'P95 1.8s · 首字 420ms', delta: 0.003, icon: Sparkles, tone: 'success' as const },
  { label: 'Token 消耗', value: '3.2M', hint: '输入 2.1M · 输出 1.1M', delta: null, icon: Bot, tone: 'primary' as const },
  { label: '活跃终端用户', value: '1,842', hint: '应用 28 · 智能体 41', delta: -0.021, icon: Users, tone: 'primary' as const },
];

const TONE_CHIP: Record<string, { bg: string; color: string }> = {
  primary: { bg: '#eff6ff', color: '#2563eb' },
  success: { bg: '#ecfdf5', color: '#059669' },
};

const CHANNEL = [
  { l: 'embed-widget', c: 6420, pct: 52 },
  { l: 'openai-compat', c: 3180, pct: 26 },
  { l: 'playground', c: 1740, pct: 14 },
  { l: 'eval', c: 1000, pct: 8 },
];
const ERRORS = [
  { l: 'RateLimitError', c: 42, pct: 56 },
  { l: 'TimeoutError', c: 21, pct: 28 },
  { l: 'ValidationError', c: 12, pct: 16 },
];

const TOP_APPS = [
  { n: '智能客服助手', c: 5210 },
  { n: '订单查询机器人', c: 3180 },
  { n: '内部知识问答', c: 2040 },
  { n: '营销文案生成', c: 980 },
  { n: 'code-agent-sdk', c: 420 },
];
const APP_MAX = 5210;

export default function ObservabilityOverviewTabs() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: '20px 24px', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        {/* 顶栏：tab + 区间 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
          {/* SegmentedControl */}
          <div style={{ position: 'relative', display: 'flex', width: 'fit-content', alignItems: 'center', gap: 2, borderRadius: 8, border: '1px solid #e7e5e0', background: 'rgba(245,244,238,0.7)', padding: 2 }}>
            <span style={{ borderRadius: 6, background: '#fffefb', boxShadow: '0 1px 2px rgb(0 0 0 / 6%)', padding: '6px 14px', fontSize: 12.5, fontWeight: 500, color: '#1d4ed8' }}>概览</span>
            <span style={{ borderRadius: 6, padding: '6px 14px', fontSize: 12.5, fontWeight: 500, color: '#78716c' }}>成本</span>
          </div>
          {/* DateRangePicker */}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, borderRadius: 8, border: '1px solid #e7e5e0', background: '#fff', padding: '0 12px', fontSize: 12.5, color: '#57534e' }}>
            <Calendar size={14} strokeWidth={2} color="#a8a29e" /> 近 7 天
          </span>
        </div>

        {/* KPI grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
          {KPIS.map(k => {
            const Icon = k.icon;
            const chip = TONE_CHIP[k.tone];
            const up = k.delta != null && k.delta > 0;
            const down = k.delta != null && k.delta < 0;
            const good = up;
            const deltaColor = k.delta == null || k.delta === 0 ? '#a8a29e' : good ? '#059669' : '#dc2626';
            return (
              <div key={k.label} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderRadius: 16, border: '1px solid #e7e5e0', background: '#fffefb', padding: 20 }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: '#78716c' }}>{k.label}</div>
                  <div style={{ marginTop: 8, fontFamily: MONO, fontSize: 24, letterSpacing: '-0.025em', color: '#1c1917', lineHeight: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{k.value}</div>
                  <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
                    <span style={{ color: '#a8a29e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{k.hint}</span>
                    {k.delta != null && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontWeight: 500, color: deltaColor, flexShrink: 0 }}>
                        {up ? <TrendingUp size={12} strokeWidth={2} /> : down ? <TrendingDown size={12} strokeWidth={2} /> : null}
                        {up ? '+' : ''}{(k.delta * 100).toFixed(1)}%
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', width: 40, height: 40, flexShrink: 0, alignItems: 'center', justifyContent: 'center', borderRadius: 8, background: chip.bg, color: chip.color }}>
                  <Icon size={20} strokeWidth={2} />
                </div>
              </div>
            );
          })}
        </div>

        {/* 趋势卡 */}
        <div style={{ ...CARD_LG, padding: 20, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3 style={{ fontSize: 14, fontWeight: 500, color: '#1c1917', margin: 0 }}>调用趋势</h3>
            <span style={{ fontSize: 11, color: '#a8a29e' }}>按天</span>
          </div>
          <TrendChart />
        </div>

        {/* 分布行 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 16 }}>
          <DistCard title="渠道分布" rows={CHANNEL} />
          <DistCard title="错误类型" rows={ERRORS} />
        </div>

        {/* Top 行 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          <TopCard title="Top 应用" rows={TOP_APPS} max={APP_MAX} />
          <TopCard title="Top 智能体" rows={[
            { n: 'support-bot', c: 4820 },
            { n: 'order-agent', c: 2910 },
            { n: 'kb-qa', c: 1880 },
            { n: 'copywriter', c: 760 },
            { n: 'sql-helper', c: 340 },
          ]} max={4820} />
        </div>
      </div>
    </PreviewFrame>
  );
}

/** recharts LineChart 复刻：CartesianGrid 虚线 3 3 + X/Y 轴(stroke #999 fontSize 11) + 两条 Line(stroke 2 dot=false)，无面积无图例 */
function TrendChart() {
  const total = [40, 64, 52, 88, 72, 110, 96];
  const errs = [6, 12, 8, 4, 10, 5, 7];
  const days = ['06/07', '06/08', '06/09', '06/10', '06/11', '06/12', '06/13'];
  // 内边距：左留 Y 轴刻度，下留 X 轴刻度
  const W = 600, H = 240;
  const padL = 36, padR = 12, padT = 10, padB = 24;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const max = 120;
  const yTicks = [0, 30, 60, 90, 120];
  const x = (i: number) => padL + (i * plotW) / (total.length - 1);
  const y = (v: number) => padT + plotH - (v / max) * plotH;
  const toPath = (arr: number[]) => arr.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)},${y(v)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 240 }}>
      {/* CartesianGrid 横向虚线 */}
      {yTicks.map(t => (
        <line key={`gh-${t}`} x1={padL} y1={y(t)} x2={W - padR} y2={y(t)} stroke="rgb(0 0 0 / 6%)" strokeWidth="1" strokeDasharray="3 3" />
      ))}
      {/* CartesianGrid 纵向虚线 */}
      {total.map((_, i) => (
        <line key={`gv-${i}`} x1={x(i)} y1={padT} x2={x(i)} y2={padT + plotH} stroke="rgb(0 0 0 / 6%)" strokeWidth="1" strokeDasharray="3 3" />
      ))}
      {/* Y 轴线 + 刻度 */}
      <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="#999" strokeWidth="1" />
      {yTicks.map(t => (
        <text key={`yt-${t}`} x={padL - 6} y={y(t) + 3.5} textAnchor="end" fontSize="11" fill="#999">{t}</text>
      ))}
      {/* X 轴线 + 刻度 */}
      <line x1={padL} y1={padT + plotH} x2={W - padR} y2={padT + plotH} stroke="#999" strokeWidth="1" />
      {days.map((d, i) => (
        <text key={`xt-${i}`} x={x(i)} y={padT + plotH + 15} textAnchor="middle" fontSize="11" fill="#999">{d}</text>
      ))}
      {/* 两条 Line：total primary-600 / errors red-500，strokeWidth 2，无填充 */}
      <path d={toPath(total)} fill="none" stroke="#2563eb" strokeWidth="2" />
      <path d={toPath(errs)} fill="none" stroke="#ef4444" strokeWidth="2" />
    </svg>
  );
}

function DistCard({ title, rows }: { title: string; rows: { l: string; c: number; pct: number }[] }) {
  return (
    <div style={{ ...CARD_LG, padding: 20 }}>
      <h3 style={{ fontSize: 14, fontWeight: 500, color: '#1c1917', margin: '0 0 12px' }}>{title}</h3>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {rows.map(r => (
          <li key={r.l}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
              <span style={{ color: '#44403c', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.l}</span>
              <span style={{ flexShrink: 0, paddingLeft: 8, color: '#78716c', fontVariantNumeric: 'tabular-nums' }}>
                {r.c.toLocaleString()}<span style={{ marginLeft: 4, color: '#a8a29e' }}>{r.pct}%</span>
              </span>
            </div>
            <div style={{ position: 'relative', height: 6, width: '100%', overflow: 'hidden', borderRadius: 4, background: '#f5f5f4' }}>
              <div style={{ position: 'absolute', inset: '0 auto 0 0', borderRadius: 4, background: '#60a5fa', width: `${r.pct}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TopCard({ title, rows, max }: { title: string; rows: { n: string; c: number }[]; max: number }) {
  const rankTone = (i: number) => {
    if (i === 0) return { bg: '#fef3c7', color: '#b45309', ring: '#fde68a' };
    if (i === 1) return { bg: '#e2e8f0', color: '#475569', ring: '#cbd5e1' };
    if (i === 2) return { bg: '#ffedd5', color: '#c2410c', ring: '#fed7aa' };
    return { bg: '#f5f5f4', color: '#a8a29e', ring: '#e7e5e0' };
  };
  return (
    <div style={{ ...CARD_LG, padding: 20 }}>
      <h3 style={{ fontSize: 14, fontWeight: 500, color: '#1c1917', margin: '0 0 12px' }}>{title}</h3>
      {/* DataTable 壳：rounded-lg border-stone-200/60 overflow-hidden */}
      <div style={{ borderRadius: 8, border: '1px solid rgba(231,229,224,0.6)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          {/* thead 表头：名称 / 调用，border-b border-stone-200/70 */}
          <thead style={{ borderBottom: '1px solid rgba(231,229,224,0.7)' }}>
            <tr>
              <th style={{ padding: '10px 12px', textAlign: 'left', fontSize: 11, fontWeight: 500, color: '#a8a29e' }}>名称</th>
              <th style={{ width: 160, padding: '10px 12px', textAlign: 'right', fontSize: 11, fontWeight: 500, color: '#a8a29e' }}>调用</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const t = rankTone(i);
              return (
                <tr key={r.n} style={{ borderTop: i ? '1px solid #f5f5f4' : 'none', fontSize: 12.5 }}>
                  {/* 名称列 px-3 py-3 */}
                  <td style={{ padding: '12px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ display: 'inline-flex', flexShrink: 0, width: 20, height: 20, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: 10, fontWeight: 600, fontVariantNumeric: 'tabular-nums', background: t.bg, color: t.color, boxShadow: `inset 0 0 0 1px ${t.ring}` }}>{i + 1}</span>
                      <span style={{ flex: 1, minWidth: 0, color: '#44403c', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.n}</span>
                    </div>
                  </td>
                  {/* 调用列 px-3 py-3 align right */}
                  <td style={{ padding: '12px 12px', textAlign: 'right' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
                      <span style={{ height: 6, width: 64, overflow: 'hidden', borderRadius: 9999, background: '#f5f5f4' }}>
                        <span style={{ display: 'block', height: '100%', borderRadius: 9999, background: 'linear-gradient(to right, #93c5fd, #3b82f6)', width: `${(r.c / max) * 100}%` }} />
                      </span>
                      <span style={{ width: 40, textAlign: 'right', color: '#57534e', fontVariantNumeric: 'tabular-nums' }}>{r.c.toLocaleString()}</span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
