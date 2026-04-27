import { Cat, Cpu, Feather, Star, TrendingUp, Wallet, Zap } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const MODELS = [
  { name: 'gpt-4o',        tokens: 1240000, pct: 100 },
  { name: 'qwen-max',      tokens: 826000,  pct: 67 },
  { name: 'claude-3.5',    tokens: 524000,  pct: 42 },
  { name: 'gpt-4o-mini',   tokens: 198000,  pct: 16 },
  { name: 'qwen-plus',     tokens: 86000,   pct: 7 },
];

const TOP: Array<{ user: string; Icon: React.ComponentType<{ size?: number }>; calls: number; tokens: string; last: string; model: string }> = [
  { user: 'archer', Icon: Feather, calls: 824, tokens: '1.2M', last: '12:32', model: 'gpt-4o' },
  { user: 'lyna',   Icon: Star,    calls: 612, tokens: '824K', last: '11:50', model: 'qwen-max' },
  { user: 'zhao',   Icon: Cat,     calls: 384, tokens: '496K', last: '10:18', model: 'claude-3.5' },
];

export default function AnalyticsUsagePage() {
  return (
    <PreviewFrame bg="#fff">
      <div style={{ fontFamily: 'Inter, sans-serif', color: '#0f172a' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', margin: 0 }}>模型用量分析</h1>
          <div style={{ display: 'flex', gap: 12 }}>
            <select style={{
              padding: '4px 12px', borderRadius: 8,
              border: '1px solid #d9d9d9', fontSize: 14, height: 32,
              background: '#fff', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            }}>
              <option>近 7 天</option>
            </select>
            <button style={{
              padding: '4px 14px', height: 32,
              background: '#10b981', color: '#fff',
              border: 'none', borderRadius: 8,
              fontSize: 14, fontWeight: 400, cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}>导出 Excel</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
          <Kpi label="总 Tokens"  value="2.86M"   delta="+18%"   Icon={Zap} />
          <Kpi label="总请求"     value="12,486"  delta="+22%"   Icon={TrendingUp} />
          <Kpi label="平均耗时"   value="1.4s"    delta="-0.2s"  Icon={Cpu} />
          <Kpi label="估算成本"   value="¥284.50" delta="+12%"   valueColor="#d97706" Icon={Wallet} />
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 16px' }}>模型用量对比</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MODELS.map(m => (
              <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 130, fontSize: 13 }}>{m.name}</div>
                <div style={{ flex: 1, height: 18, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{
                    width: `${m.pct}%`, height: '100%', background: '#10b981',
                    transition: 'width 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }} />
                </div>
                <div style={{
                  width: 80, fontSize: 12, color: '#64748b', textAlign: 'right',
                  fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                }}>{m.tokens.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 12px' }}>Top 10 用户</h3>
          <table style={{ width: '100%', fontSize: 14, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left' }}>
                <th style={th}>用户</th>
                <th style={th}>调用次数</th>
                <th style={th}>累计 Tokens</th>
                <th style={th}>最近调用</th>
                <th style={th}>偏好模型</th>
              </tr>
            </thead>
            <tbody>
              {TOP.map(u => {
                const M = u.Icon;
                return (
                  <tr key={u.user} style={{ borderTop: '1px solid #f1f5f9' }}>
                    <td style={td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{
                          width: 24, height: 24, borderRadius: '50%',
                          background: '#fff', border: '1px solid #e2e8f0',
                          color: '#10b981',
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        }}><M size={12} /></span>
                        <span>{u.user}</span>
                      </div>
                    </td>
                    <td style={td}>{u.calls.toLocaleString()}</td>
                    <td style={{ ...td, fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>{u.tokens}</td>
                    <td style={{ ...td, color: '#64748b', fontSize: 13 }}>{u.last}</td>
                    <td style={td}>
                      <span style={{
                        padding: '2px 8px', borderRadius: 4,
                        background: '#f1f5f9', fontSize: 12,
                        fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                      }}>{u.model}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </PreviewFrame>
  );
}

function Kpi({ label, value, delta, valueColor, Icon }: { label: string; value: string; delta: string; valueColor?: string; Icon?: React.ComponentType<{ size?: number }> }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 18 }}>
      <div style={{
        fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5,
        color: '#94a3b8', marginBottom: 6,
        display: 'inline-flex', alignItems: 'center', gap: 4,
      }}>
        {Icon && <Icon size={12} />} {label}
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, color: valueColor || '#0f172a', lineHeight: 1.2 }}>{value}</div>
      <div style={{ fontSize: 11, color: '#10b981', marginTop: 4 }}>{delta} <span style={{ color: '#94a3b8' }}>vs 上周</span></div>
    </div>
  );
}

const th = { padding: 10, fontSize: 11, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: 1, fontWeight: 600 as const };
const td = { padding: 10 };
