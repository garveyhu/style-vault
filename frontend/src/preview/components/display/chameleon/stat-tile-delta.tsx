import { PreviewFrame } from '../../../_layout';
import { Activity, Bot, Coins, Database, Sparkles, TrendingDown, TrendingUp, Users, Zap, Clock } from 'lucide-react';

const PRIMARY_50 = '#eff6ff';
const PRIMARY_600 = '#2563eb';

const TONE: Record<string, { bg: string; fg: string }> = {
  primary: { bg: PRIMARY_50, fg: PRIMARY_600 },
  success: { bg: '#ecfdf5', fg: '#059669' },
  warning: { bg: '#fffbeb', fg: '#d97706' },
  danger: { bg: '#fef2f2', fg: '#dc2626' },
  violet: { bg: '#f5f3ff', fg: '#7c3aed' },
  sky: { bg: '#f0f9ff', fg: '#0284c7' },
  neutral: { bg: '#f5f5f4', fg: '#78716c' },
};

const STONE_200 = '#e7e5e4'; // border-stone-200（Tailwind 真值）
const PAPER = '#fffefb'; // var(--color-paper) 默认暖白

type IconCmp = React.ComponentType<{ size?: number; color?: string }>;

const TILES: Array<{ label: string; value: string; hint: string; delta: number | null; inverse?: boolean; loading?: boolean; icon: IconCmp; tone: string }> = [
  { label: '总调用量', value: '128,402', hint: '近 7 日', delta: 0.124, icon: Activity, tone: 'primary' },
  { label: '活跃用户', value: '3,210', hint: '环比上周', delta: 0.058, icon: Users, tone: 'success' },
  { label: '总成本', value: '¥1,842', hint: '越低越好', delta: 0.092, inverse: true, icon: Coins, tone: 'warning' },
  { label: '错误率', value: '0.42%', hint: '环比下降', delta: -0.031, inverse: true, icon: Zap, tone: 'danger' },
  // delta=0 态：灰色、无箭头
  { label: '平均时延', value: '1.82s', hint: '与上周持平', delta: 0, icon: Clock, tone: 'neutral' },
  // loading 态：value 显示 '—'
  { label: 'Token 用量', value: '—', hint: '加载中', delta: null, loading: true, icon: Sparkles, tone: 'primary' },
];

const MINIS: Array<{ label: string; value: string; icon: IconCmp; tone: string }> = [
  { label: '智能体', value: '24', icon: Bot, tone: 'primary' },
  { label: '知识库', value: '12', icon: Database, tone: 'violet' },
  { label: '今日调用', value: '8.2k', icon: Sparkles, tone: 'sky' },
  { label: '在线用户', value: '316', icon: Users, tone: 'success' },
];

export default function StatTileDelta() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 800, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · DISPLAY</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>KPI Stat Tiles</h1>

        {/* StatTile 大卡 —— 含 delta 正负 / delta=0 灰 / loading '—' 全态 */}
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>StatTile · delta + tone chip · delta=0 / loading 态</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {TILES.map(t => {
            const hasDelta = t.delta != null && Number.isFinite(t.delta);
            const up = hasDelta && (t.delta as number) > 0;
            const down = hasDelta && (t.delta as number) < 0;
            const good = t.inverse ? down : up;
            const deltaColor = !hasDelta || t.delta === 0 ? '#a8a29e' : good ? '#059669' : '#dc2626';
            const tone = TONE[t.tone];
            const Icon = t.icon;
            return (
              <div key={t.label} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderRadius: 12, border: `1px solid ${STONE_200}`, background: PAPER, padding: 20 }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: '#78716c' }}>{t.label}</div>
                  <div style={{ marginTop: 8, fontFamily: 'monospace', fontSize: 24, letterSpacing: '-0.025em', color: '#1c1917', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.loading ? '—' : t.value}</div>
                  <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
                    <span style={{ color: '#a8a29e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.hint}</span>
                    {hasDelta && (
                      <span style={{ display: 'inline-flex', flexShrink: 0, alignItems: 'center', gap: 2, fontWeight: 500, color: deltaColor }}>
                        {up ? <TrendingUp size={12} /> : down ? <TrendingDown size={12} /> : null}
                        {up ? '+' : ''}{((t.delta as number) * 100).toFixed(1)}%
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', width: 40, height: 40, flexShrink: 0, alignItems: 'center', justifyContent: 'center', borderRadius: 8, background: tone.bg, color: tone.fg }}>
                  <Icon size={20} color={tone.fg} />
                </div>
              </div>
            );
          })}
        </div>

        {/* MiniStat 紧凑横排 */}
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', margin: '24px 0 12px' }}>MiniStat · 7 tone 紧凑横排</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {MINIS.map(m => {
            const tone = TONE[m.tone];
            const Icon = m.icon;
            return (
              <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 12, borderRadius: 12, border: `1px solid ${STONE_200}`, background: PAPER, padding: '12px 16px' }}>
                <div style={{ display: 'flex', width: 36, height: 36, flexShrink: 0, alignItems: 'center', justifyContent: 'center', borderRadius: 8, background: tone.bg, color: tone.fg }}>
                  <Icon size={18} color={tone.fg} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: 'monospace', fontSize: 19, lineHeight: 1, fontWeight: 600, color: '#1c1917', fontVariantNumeric: 'tabular-nums' }}>{m.value}</div>
                  <div style={{ marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 11, color: '#78716c' }}>{m.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* StatBar 无框发丝指标条 —— 发丝 border-stone-100 #f5f5f4 */}
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', margin: '24px 0 12px' }}>StatBar · 无框发丝分隔指标条</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: 12, padding: '4px 0' }}>
          <StatItem k="总 token" v="48,210" mono sub="prompt 31k" />
          <StatItem k="耗时" v="1.82s" mono tone="ok" />
          <StatItem k="工具调用" v="6" />
          <StatItem k="重试" v="1" tone="err" />
          <StatItem k="状态" v="成功" tone="ok" />
        </div>

        <div style={{ marginTop: 20, fontSize: 11, color: '#a8a29e', lineHeight: 1.7 }}>
          bg var(--color-paper)=#fffefb · border stone-200=#e7e5e4 · 大数字 font-mono tnum tracking-tight(-0.025em) · delta=0/loading 灰 · StatBar 竖发丝 stone-100=#f5f5f4
        </div>
      </div>
    </PreviewFrame>
  );
}

function StatItem({ k, v, sub, mono, tone }: { k: string; v: string; sub?: string; mono?: boolean; tone?: 'ok' | 'err' }) {
  const color = tone === 'ok' ? '#059669' : tone === 'err' ? '#e11d48' : '#292524';
  return (
    <div style={{ marginRight: 16, borderRight: '1px solid #f5f5f4', paddingRight: 16 }}>
      <div style={{ fontSize: 10.5, letterSpacing: '0.025em', color: '#a8a29e' }}>{k}</div>
      <div style={{ marginTop: 4, display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontSize: mono ? 13 : 15, fontWeight: 600, color, fontVariantNumeric: 'tabular-nums', fontFamily: mono ? 'monospace' : 'inherit' }}>{v}</span>
        {sub && <span style={{ fontSize: 11, fontWeight: 400, color: '#a8a29e', fontVariantNumeric: 'tabular-nums' }}>{sub}</span>}
      </div>
    </div>
  );
}
