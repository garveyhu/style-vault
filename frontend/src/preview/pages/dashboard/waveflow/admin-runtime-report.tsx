import { PreviewFrame } from '../../../_layout';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function AdminRuntimeReport() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: '20px 24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', color: '#1c1917', margin: 0 }}>仪表盘</h1>
            <p style={{ fontSize: 12.5, color: '#78716c', margin: '2px 0 0' }}>实时调度状态 · 跨网数据同步</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: '#78716c', fontVariantNumeric: 'tabular-nums' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
              实时 · 30s 刷新
            </div>
            <div style={{ display: 'flex', gap: 4, padding: 4, background: '#f5f4ee', borderRadius: 8 }}>
              {['1h', '24h', '7d', '30d'].map(r => (
                <button key={r} style={{ height: 24, padding: '0 10px', borderRadius: 4, border: 'none', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, fontVariantNumeric: 'tabular-nums', background: r === '7d' ? '#1c1917' : 'transparent', color: r === '7d' ? '#fff' : '#78716c' }}>{r}</button>
              ))}
            </div>
          </div>
        </header>

        {/* KPI row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginBottom: 12 }}>
          {[
            { label: '今日调度', value: '12.3k', d: 12.5, suf: '%' },
            { label: '成功率', value: '99.4%', d: 0.3, suf: 'pp', vc: '#059669' },
            { label: '平均耗时', value: '2.3s', d: -12, suf: '%' },
            { label: '在线执行器', value: '8/10' },
            { label: '活跃任务', value: '32/38' },
            { label: '24h 失败', value: '7', vc: '#dc2626', d: 2, invert: true },
          ].map(k => (
            <div key={k.label} style={{ background: '#fff', border: '1px solid rgba(231,229,224,0.7)', borderRadius: 16, padding: 14 }}>
              <div style={{ fontSize: 10.5, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>{k.label}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 22, fontWeight: 700, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', color: k.vc || '#1c1917', marginTop: 6, lineHeight: 1 }}>{k.value}</div>
              {k.d != null && (
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: (k.invert ? k.d > 0 : k.d < 0) ? '#dc2626' : '#059669', marginTop: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                  {k.d > 0 ? <ArrowUp size={10} /> : <ArrowDown size={10} />}{k.d > 0 ? '+' : ''}{k.d}{k.suf}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 8/4 grid: line + pie */}
        <div style={{ display: 'grid', gridTemplateColumns: '8fr 4fr', gap: 12, marginBottom: 12 }}>
          {/* Line chart 8 */}
          <div style={{ background: '#fff', border: '1px solid rgba(231,229,224,0.7)', borderRadius: 16, padding: 16, height: 240 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#292524' }}>调度趋势 · 近 7 天</div>
                <div style={{ fontSize: 11, color: '#78716c', marginTop: 2 }}>成功 / 失败 / 执行中</div>
              </div>
              <div style={{ display: 'flex', gap: 12, fontSize: 11.5 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />成功</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />失败</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b' }} />执行中</span>
              </div>
            </div>
            <div style={{ marginTop: 16, position: 'relative' }}>
              <svg viewBox="-20 0 620 160" style={{ width: '100%', height: 160, overflow: 'visible' }}>
                {/* grid lines */}
                {[0, 1, 2, 3, 4].map(i => <line key={i} x1="0" y1={32 * i} x2="600" y2={32 * i} stroke="#f5f4ee" strokeWidth="1" />)}
                {/* X labels */}
                {['05-15', '05-16', '05-17', '05-18', '05-19', '05-20', '05-21'].map((d, i) => (
                  <text key={d} x={20 + i * 95} y={150} textAnchor="middle" fontSize="9" fill="#a8a29e" fontFamily="JetBrains Mono, monospace">{d}</text>
                ))}
                {/* Y labels */}
                {['12k', '9k', '6k', '3k', '0'].map((v, i) => (
                  <text key={v} x="-8" y={32 * i + 4} textAnchor="end" fontSize="9" fill="#a8a29e" fontFamily="JetBrains Mono, monospace">{v}</text>
                ))}
                {/* success area + line */}
                <path d="M 20,76 L 115,52 L 210,64 L 305,28 L 400,40 L 495,16 L 590,24" fill="none" stroke="#10b981" strokeWidth="2" />
                <path d="M 20,76 L 115,52 L 210,64 L 305,28 L 400,40 L 495,16 L 590,24 L 590,128 L 20,128 Z" fill="#10b981" opacity="0.12" />
                {/* fail line */}
                <path d="M 20,118 L 115,114 L 210,110 L 305,108 L 400,112 L 495,104 L 590,108" fill="none" stroke="#ef4444" strokeWidth="2" />
                {/* running line */}
                <path d="M 20,124 L 115,122 L 210,120 L 305,124 L 400,118 L 495,116 L 590,114" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
                {/* data points on success */}
                {[[20, 76], [115, 52], [210, 64], [305, 28], [400, 40], [495, 16], [590, 24]].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="3" fill="#fff" stroke="#10b981" strokeWidth="1.5" />
                ))}
              </svg>
            </div>
          </div>

          {/* Pie chart 4 */}
          <div style={{ background: '#fff', border: '1px solid rgba(231,229,224,0.7)', borderRadius: 16, padding: 16, height: 240 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#292524', marginBottom: 12 }}>任务状态分布</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <svg viewBox="0 0 100 100" style={{ width: 130, height: 130 }}>
                {/* total = 226 dasharray base (2*pi*36 ≈ 226) - slices: running 22 / err 4 / exec 5 / stop 7 = 38 total → 131/24/30/41 px arc */}
                <circle cx="50" cy="50" r="36" fill="none" stroke="#10b981" strokeWidth="20" strokeDasharray="131 226" strokeDashoffset="0" transform="rotate(-90 50 50)" />
                <circle cx="50" cy="50" r="36" fill="none" stroke="#ef4444" strokeWidth="20" strokeDasharray="24 226" strokeDashoffset="-131" transform="rotate(-90 50 50)" />
                <circle cx="50" cy="50" r="36" fill="none" stroke="#f59e0b" strokeWidth="20" strokeDasharray="30 226" strokeDashoffset="-155" transform="rotate(-90 50 50)" />
                <circle cx="50" cy="50" r="36" fill="none" stroke="#d6d3d1" strokeWidth="20" strokeDasharray="41 226" strokeDashoffset="-185" transform="rotate(-90 50 50)" />
                <text x="50" y="48" textAnchor="middle" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono, monospace" fill="#1c1917">38</text>
                <text x="50" y="60" textAnchor="middle" fontSize="7" fill="#a8a29e">总任务</text>
              </svg>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 11.5 }}>
                {[
                  { c: '#10b981', l: '运行中', v: 22 },
                  { c: '#ef4444', l: '异常', v: 4 },
                  { c: '#f59e0b', l: '执行中', v: 5 },
                  { c: '#d6d3d1', l: '已停止', v: 7 },
                ].map(s => (
                  <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: s.c }} />
                    <span style={{ flex: 1, color: '#57534e' }}>{s.l}</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums', color: '#1c1917', fontWeight: 500 }}>{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 7/5 grid: executor health + recent failures */}
        <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 12, marginBottom: 12 }}>
          {/* Executor health table */}
          <div style={{ background: '#fff', border: '1px solid rgba(231,229,224,0.7)', borderRadius: 16, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#292524', marginBottom: 12 }}>执行器健康</div>
            <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>
                  <th style={{ padding: '6px 4px', textAlign: 'left', fontWeight: 500 }}>执行器</th>
                  <th style={{ padding: '6px 4px', textAlign: 'right', fontWeight: 500 }}>CPU</th>
                  <th style={{ padding: '6px 4px', textAlign: 'right', fontWeight: 500 }}>内存</th>
                  <th style={{ padding: '6px 4px', textAlign: 'right', fontWeight: 500 }}>任务</th>
                  <th style={{ padding: '6px 4px', textAlign: 'right', fontWeight: 500 }}>状态</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { n: 'executor-01', cpu: 45, mem: 68, task: 12, st: 'ok' },
                  { n: 'executor-02', cpu: 32, mem: 54, task: 8, st: 'ok' },
                  { n: 'executor-03', cpu: 78, mem: 82, task: 14, st: 'warn' },
                  { n: 'executor-04', cpu: 24, mem: 41, task: 6, st: 'ok' },
                  { n: 'executor-05', cpu: 0, mem: 0, task: 0, st: 'err' },
                ].map(r => (
                  <tr key={r.n} style={{ borderTop: '1px solid #f5f4ee' }}>
                    <td style={{ padding: '8px 4px', color: '#1c1917', fontWeight: 500 }}>{r.n}</td>
                    <td style={{ padding: '8px 4px', textAlign: 'right', fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums', color: r.cpu > 70 ? '#dc2626' : '#57534e' }}>{r.cpu}%</td>
                    <td style={{ padding: '8px 4px', textAlign: 'right', fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums', color: r.mem > 70 ? '#dc2626' : '#57534e' }}>{r.mem}%</td>
                    <td style={{ padding: '8px 4px', textAlign: 'right', fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums', color: '#57534e' }}>{r.task}</td>
                    <td style={{ padding: '8px 4px', textAlign: 'right' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: r.st === 'ok' ? '#059669' : r.st === 'warn' ? '#c2410c' : '#dc2626' }}>
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: r.st === 'ok' ? '#10b981' : r.st === 'warn' ? '#f59e0b' : '#ef4444', boxShadow: `0 0 0 2px ${r.st === 'ok' ? 'rgb(16 185 129 / 15%)' : r.st === 'warn' ? 'rgb(245 158 11 / 18%)' : 'rgb(239 68 68 / 18%)'}` }} />
                        {r.st === 'ok' ? '在线' : r.st === 'warn' ? '高负载' : '离线'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent failures */}
          <div style={{ background: '#fff', border: '1px solid rgba(231,229,224,0.7)', borderRadius: 16, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#292524', marginBottom: 12 }}>最近失败</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { t: '14:32', name: '物联采集 5min', err: 'JDBC connect timeout', region: '上海' },
                { t: '13:18', name: '订单清洗 hourly', err: 'NullPointerException', region: '北京' },
                { t: '11:45', name: '日终汇总', err: 'SQL deadlock', region: '广州' },
                { t: '09:02', name: '风控规则更新', err: '权限不足', region: '上海' },
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, paddingBottom: i < 3 ? 10 : 0, borderBottom: i < 3 ? '1px solid #f5f4ee' : 'none' }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 0 2px rgb(239 68 68 / 18%)', marginTop: 6, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                      <span style={{ fontSize: 12.5, fontWeight: 500, color: '#1c1917', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#78716c', fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{f.t}</span>
                    </div>
                    <div style={{ fontSize: 11, color: '#dc2626', marginTop: 2, fontFamily: 'JetBrains Mono, monospace' }}>{f.err}</div>
                    <div style={{ fontSize: 10.5, color: '#a8a29e', marginTop: 2 }}>region: {f.region}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5/3/4 grid: duration + 2 TOP lists */}
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 3fr 4fr', gap: 12 }}>
          {/* Duration bar chart */}
          <div style={{ background: '#fff', border: '1px solid rgba(231,229,224,0.7)', borderRadius: 16, padding: 16, height: 200 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#292524', marginBottom: 12 }}>执行时长分布</div>
            <svg viewBox="0 0 320 130" style={{ width: '100%', height: 130 }}>
              {[
                { l: '<1s', v: 60, h: 100 },
                { l: '1-5s', v: 78, h: 130 },
                { l: '5-30s', v: 38, h: 65 },
                { l: '30s-2m', v: 18, h: 30 },
                { l: '2-10m', v: 8, h: 14 },
                { l: '>10m', v: 2, h: 5 },
              ].map((b, i) => (
                <g key={b.l}>
                  <rect x={20 + i * 50} y={130 - b.h} width="34" height={b.h} fill="#6366f1" opacity="0.75" rx="2" />
                  <text x={37 + i * 50} y={130 - b.h - 4} textAnchor="middle" fontSize="9" fill="#1c1917" fontFamily="JetBrains Mono, monospace" fontWeight="600">{b.v}</text>
                  <text x={37 + i * 50} y={126} textAnchor="middle" fontSize="9" fill="#78716c">{b.l}</text>
                </g>
              ))}
            </svg>
          </div>

          {/* TOP 5 scheduling */}
          <div style={{ background: '#fff', border: '1px solid rgba(231,229,224,0.7)', borderRadius: 16, padding: 16, height: 200 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#292524' }}>调度 TOP 5</div>
              <span style={{ fontSize: 10, color: '#a8a29e', fontFamily: 'JetBrains Mono, monospace' }}>7d</span>
            </div>
            <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {[
                { n: '物联采集 5min', c: 2016 },
                { n: '订单 hourly', c: 168 },
                { n: '财务对账', c: 28 },
                { n: '风控规则刷新', c: 24 },
                { n: '快照备份', c: 14 },
              ].map((r, i) => (
                <li key={r.n} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 0', fontSize: 11.5 }}>
                  <span style={{ width: 14, fontFamily: 'JetBrains Mono, monospace', color: i === 0 ? '#2563eb' : '#a8a29e', fontWeight: i === 0 ? 600 : 400 }}>{i + 1}</span>
                  <span style={{ flex: 1, color: '#1c1917', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.n}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums', color: '#57534e', fontWeight: 500 }}>{r.c.toLocaleString()}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* TOP 5 failure */}
          <div style={{ background: '#fff', border: '1px solid rgba(231,229,224,0.7)', borderRadius: 16, padding: 16, height: 200 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#292524' }}>失败 TOP 5</div>
              <span style={{ fontSize: 10, color: '#a8a29e', fontFamily: 'JetBrains Mono, monospace' }}>7d</span>
            </div>
            <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {[
                { n: '物联采集 5min', c: 12, rate: '0.6%' },
                { n: '日终汇总', c: 4, rate: '14%' },
                { n: '风控规则刷新', c: 3, rate: '12%' },
                { n: '订单清洗 hourly', c: 2, rate: '1.2%' },
                { n: '快照备份', c: 1, rate: '7%' },
              ].map((r, i) => (
                <li key={r.n} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 0', fontSize: 11.5 }}>
                  <span style={{ width: 14, fontFamily: 'JetBrains Mono, monospace', color: i === 0 ? '#dc2626' : '#a8a29e', fontWeight: i === 0 ? 600 : 400 }}>{i + 1}</span>
                  <span style={{ flex: 1, color: '#1c1917', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.n}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums', color: '#dc2626', fontWeight: 500 }}>{r.c}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums', color: '#a8a29e', fontSize: 10 }}>({r.rate})</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
