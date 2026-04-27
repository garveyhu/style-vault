import { PreviewFrame } from '../../../_layout';

const FB = [
  { user: 'archer', icon: '🌿', time: '12:32', snippet: '查询本月销售前 10 名的产品', type: '👍' },
  { user: 'lyna', icon: '🦊', time: '11:50', snippet: '生成季度财务对账单', type: '👎' },
  { user: 'zhao', icon: '⭐', time: '10:18', snippet: '统计活跃用户 DAU 趋势', type: '👍' },
  { user: 'sun', icon: '🐱', time: '09:42', snippet: '用 SQL 查 last 30 days 的 GMV', type: '👍' },
];

export default function AnalyticsFeedbackPreview() {
  return (
    <PreviewFrame bg="#fff">
      <div style={{ fontFamily: 'Inter, sans-serif', color: '#0f172a' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', margin: 0 }}>用户反馈分析</h1>
          <div style={{ display: 'flex', gap: 12 }}>
            <select style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }}>
              <option>近 7 天</option><option>近 30 天</option>
            </select>
            <button style={{ padding: '6px 14px', background: '#10b981', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>导出 Excel</button>
          </div>
        </div>

        {/* KPI */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
          <KpiCard label="总反馈数" value="1,824" delta="+12%" deltaColor="#10b981" />
          <KpiCard label="👍 正向" value="76.2%" delta="+3.1%" deltaColor="#10b981" valueColor="#10b981" />
          <KpiCard label="👎 负向" value="23.8%" delta="-3.1%" deltaColor="#10b981" valueColor="#f43f5e" />
        </div>

        {/* 趋势图 mock */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>反馈时间趋势</h3>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>按天</span>
          </div>
          <svg width="100%" height="180" viewBox="0 0 800 180" preserveAspectRatio="none">
            <polyline points="0,140 80,130 160,120 240,90 320,100 400,70 480,80 560,60 640,40 720,55 800,30" fill="none" stroke="#10b981" strokeWidth="2" />
            <polyline points="0,160 80,158 160,155 240,150 320,148 400,145 480,140 560,138 640,135 720,134 800,130" fill="none" stroke="#f43f5e" strokeWidth="2" />
          </svg>
          <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#64748b', marginTop: 8 }}>
            <span><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: '#10b981', marginRight: 4 }} />👍 正向</span>
            <span><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: '#f43f5e', marginRight: 4 }} />👎 负向</span>
          </div>
        </div>

        {/* 列表 */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                <th style={th}>用户</th><th style={th}>时间</th><th style={th}>消息片段</th><th style={th}>反馈</th><th style={th}></th>
              </tr>
            </thead>
            <tbody>
              {FB.map((f, i) => (
                <tr key={i} style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0', color: '#10b981', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{f.icon}</span>
                      <span>{f.user}</span>
                    </div>
                  </td>
                  <td style={{ ...td, color: '#64748b' }}>{f.time}</td>
                  <td style={{ ...td, color: '#475569', maxWidth: 360, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.snippet}</td>
                  <td style={td}>
                    <span style={{
                      padding: '2px 8px', borderRadius: 12,
                      background: f.type === '👍' ? '#dcfce7' : '#ffe4e6',
                      color: f.type === '👍' ? '#15803d' : '#be123c',
                      fontSize: 11, fontWeight: 500,
                    }}>{f.type}</span>
                  </td>
                  <td style={td}><a style={{ color: '#10b981', cursor: 'pointer', fontSize: 12 }}>查看详情 →</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PreviewFrame>
  );
}

function KpiCard({ label, value, delta, deltaColor, valueColor }: any) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
      <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#94a3b8', marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 700, color: valueColor || '#0f172a', lineHeight: 1.2 }}>{value}</div>
      <div style={{ fontSize: 12, color: deltaColor, marginTop: 4 }}>{delta} <span style={{ color: '#94a3b8' }}>vs 上周</span></div>
    </div>
  );
}

const th = { padding: 10, fontSize: 11, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: 1, fontWeight: 600 };
const td = { padding: 10 };
