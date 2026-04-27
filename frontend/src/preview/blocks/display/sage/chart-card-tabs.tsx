import { useState } from 'react';
import { ConfigProvider, Dropdown, type MenuProps } from 'antd';
import { BarChart3, ChevronDown, Download, LineChart, Maximize, PieChart, Table as TableIcon } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const HEX = '#10b981';
const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

const TABS = ['各产品销售额分布', '渠道占比 Top 5', '近 30 天 GMV 趋势'];
type ChartType = 'column' | 'bar' | 'line' | 'pie' | 'table';

const SERIES_COLORS = ['#5B8FF9', '#5AD8A6', '#F6BD16'];
const PRODUCTS = [
  { name: 'iPad Air', v: [95, 70, 28] }, { name: 'Aeron', v: [82, 78, 27] },
  { name: 'Switch', v: [55, 40, 14] }, { name: 'GoPro', v: [42, 28, 9] },
  { name: 'Dyson', v: [32, 22, 7] }, { name: 'Bose', v: [28, 20, 6] },
  { name: 'Kindle', v: [30, 22, 7] }, { name: '飞利浦', v: [26, 20, 6] },
];

export default function ChartCardTabsPage() {
  const [tab, setTab] = useState(0);
  const [type, setType] = useState<ChartType>('column');

  const items: MenuProps['items'] = [
    { key: 'table', label: '表格', icon: <TableIcon size={14} /> },
    { key: 'column', label: '柱状图', icon: <BarChart3 size={14} /> },
    { key: 'bar', label: '条形图', icon: <BarChart3 size={14} style={{ transform: 'rotate(90deg)' }} /> },
    { key: 'line', label: '折线图', icon: <LineChart size={14} /> },
    { key: 'pie', label: '饼图', icon: <PieChart size={14} /> },
  ];
  const TypeIcon = type === 'column' ? BarChart3 : type === 'line' ? LineChart : type === 'pie' ? PieChart : type === 'bar' ? BarChart3 : TableIcon;
  const typeLabel = ({ column: '柱状图', bar: '条形图', line: '折线图', pie: '饼图', table: '表格' } as Record<ChartType, string>)[type];

  return (
    <PreviewFrame bg="rgb(249,249,249)" padded>
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: HEX, borderRadius: 8 } }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div style={{
            border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden',
            display: 'flex', flexDirection: 'column', background: '#fff',
            transition: 'all 300ms',
          }}>
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderBottom: '1px solid #f3f4f6',
              background: 'rgba(248,250,252,0.50)',
            }}>
              <div style={{ display: 'flex', flex: 1, marginRight: 16, overflowX: 'auto' }}>
                {TABS.map((t, i) => {
                  const sel = tab === i;
                  return (
                    <button key={i} onClick={() => setTab(i)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '12px 16px', fontSize: 14, fontWeight: 500,
                        whiteSpace: 'nowrap', cursor: 'pointer',
                        borderTop: 'none', borderLeft: 'none',
                        borderRight: '1px solid rgba(241,245,249,0.50)',
                        borderBottom: sel ? `2px solid ${HEX}` : '2px solid transparent',
                        background: sel ? '#fff' : 'transparent',
                        color: sel ? HEX : '#6b7280',
                        marginBottom: sel ? -1 : 0,
                        boxShadow: sel ? '0 -4px 6px -1px rgba(0,0,0,0.02)' : 'none',
                        fontFamily: SAGE_FONT,
                      }}>
                      <span style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: sel ? HEX : '#d1d5db', flexShrink: 0,
                      }} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>{t}</span>
                    </button>
                  );
                })}
              </div>

              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '0 8px', borderLeft: '1px solid #f3f4f6',
              }}>
                <Dropdown menu={{ items, onClick: ({ key }) => setType(key as ChartType) }} trigger={['click']}>
                  <button style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '6px 8px', borderRadius: 6,
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    color: '#4b5563', fontSize: 14,
                    fontFamily: SAGE_FONT,
                  }}>
                    <TypeIcon size={14} />
                    <span>{typeLabel}</span>
                    <ChevronDown size={14} color="#94a3b8" />
                  </button>
                </Dropdown>
                <span style={{ width: 1, height: 12, background: '#e5e7eb', margin: '0 8px' }} />
                <button style={iconBtn}><Download size={16} color="#6b7280" /></button>
                <button style={iconBtn}><Maximize size={16} color="#6b7280" /></button>
              </div>
            </div>

            {/* Body */}
            <div style={{ width: '100%', background: '#fff', height: 350, padding: 12 }}>
              {type === 'column' && <BarSvg />}
              {type === 'bar' && <BarSvg horizontal />}
              {type === 'line' && <LineSvg />}
              {type === 'pie' && <PieSvg />}
              {type === 'table' && <FakeTable />}
            </div>
          </div>
        </div>
      </ConfigProvider>
    </PreviewFrame>
  );
}

const iconBtn: React.CSSProperties = {
  width: 28, height: 28,
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  background: 'transparent', border: 'none', cursor: 'pointer',
};

function BarSvg({ horizontal }: { horizontal?: boolean }) {
  const data = PRODUCTS;
  const totals = data.map(d => d.v[0] + d.v[1] + d.v[2]);
  const max = Math.max(...totals);
  const W = 720, H = 326, padL = 56, padR = 16, padT = 24, padB = horizontal ? 24 : 56;
  const innerW = W - padL - padR, innerH = H - padT - padB;
  const gap = (horizontal ? innerH : innerW) / data.length;
  const barW = gap * 0.55;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <g transform={`translate(${padL}, 4)`}>
        {['线下','线上','海外'].map((n, i) => (
          <g key={n} transform={`translate(${i * 56}, 0)`}>
            <rect width={10} height={9} fill={SERIES_COLORS[i]} rx={1} />
            <text x={14} y={8} fill="#475569" fontSize={10}>{n}</text>
          </g>
        ))}
      </g>
      {[0, 0.25, 0.5, 0.75, 1].map(t => {
        const v = Math.round(t * max);
        const y = padT + innerH - t * innerH;
        return horizontal ? null : (
          <g key={t}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#f1f5f9" strokeWidth={0.6} />
            <text x={padL - 4} y={y + 3} fill="#94a3b8" fontSize={9} textAnchor="end" fontFamily="ui-monospace, SFMono-Regular, monospace">{v}</text>
          </g>
        );
      })}
      {data.map((d, i) => {
        if (horizontal) {
          const y = padT + i * gap + (gap - barW) / 2;
          let x = padL;
          return (
            <g key={i}>
              {d.v.map((val, si) => {
                const w = (val / max) * innerW;
                const seg = <rect key={si} x={x} y={y} width={w} height={barW} fill={SERIES_COLORS[si]} />;
                x += w;
                return seg;
              })}
              <text x={padL - 4} y={y + barW / 2 + 3} fill="#64748b" fontSize={10} textAnchor="end">{d.name}</text>
            </g>
          );
        }
        const x = padL + i * gap + (gap - barW) / 2;
        let yC = padT + innerH;
        return (
          <g key={i}>
            {d.v.map((val, si) => {
              const h = (val / max) * innerH;
              yC -= h;
              return <rect key={si} x={x} y={yC} width={barW} height={h} fill={SERIES_COLORS[si]} />;
            })}
            <text x={x + barW / 2} y={padT + innerH + 14} fill="#64748b" fontSize={10} textAnchor="middle">{d.name}</text>
          </g>
        );
      })}
    </svg>
  );
}

function LineSvg() {
  const data = PRODUCTS.map(p => p.v[0] + p.v[1] + p.v[2]);
  const max = Math.max(...data);
  const W = 720, H = 326, padL = 44, padR = 16, padT = 16, padB = 36;
  const iw = W - padL - padR, ih = H - padT - padB;
  const pts = data.map((v, i) => {
    const x = padL + (i / (data.length - 1)) * iw;
    const y = padT + ih - (v / max) * ih;
    return { x, y };
  });
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const area = `${path} L${pts[pts.length - 1].x},${padT + ih} L${pts[0].x},${padT + ih} Z`;
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <path d={area} fill={HEX} fillOpacity={0.12} />
      <path d={path} fill="none" stroke={HEX} strokeWidth={2.5} />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={4} fill="#fff" stroke={HEX} strokeWidth={2.5} />
          <text x={p.x} y={padT + ih + 16} fill="#64748b" fontSize={10} textAnchor="middle">{PRODUCTS[i].name}</text>
        </g>
      ))}
    </svg>
  );
}

function PieSvg() {
  const data = PRODUCTS.slice(0, 5).map(p => ({ name: p.name, value: p.v[0] + p.v[1] + p.v[2] }));
  const total = data.reduce((s, d) => s + d.value, 0);
  const cx = 200, cy = 163, r = 110, ir = r * 0.3;
  let acc = 0;
  return (
    <svg width="100%" height="100%" viewBox="0 0 720 326" preserveAspectRatio="xMidYMid meet">
      {data.map((d, i) => {
        const start = (acc / total) * Math.PI * 2 - Math.PI / 2;
        acc += d.value;
        const end = (acc / total) * Math.PI * 2 - Math.PI / 2;
        const large = end - start > Math.PI ? 1 : 0;
        const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start);
        const x2 = cx + r * Math.cos(end), y2 = cy + r * Math.sin(end);
        const ix1 = cx + ir * Math.cos(start), iy1 = cy + ir * Math.sin(start);
        const ix2 = cx + ir * Math.cos(end), iy2 = cy + ir * Math.sin(end);
        const path = `M${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} L${ix2},${iy2} A${ir},${ir} 0 ${large} 0 ${ix1},${iy1} Z`;
        return <path key={i} d={path} fill={SERIES_COLORS[i % 3]} stroke="#fff" strokeWidth={2} />;
      })}
      <g transform="translate(370, 80)">
        {data.map((d, i) => (
          <g key={i} transform={`translate(0, ${i * 22})`}>
            <rect width={11} height={11} fill={SERIES_COLORS[i % 3]} rx={2} />
            <text x={18} y={9} fill="#475569" fontSize={11}>{d.name}</text>
            <text x={300} y={9} fill="#94a3b8" fontSize={11} textAnchor="end" fontFamily="ui-monospace, SFMono-Regular, monospace">
              {((d.value / total) * 100).toFixed(1)}%
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function FakeTable() {
  return (
    <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ background: 'rgba(248,250,252,0.75)' }}>
          {['产品', '线下', '线上', '海外', '合计'].map(c => (
            <th key={c} style={{ padding: '10px 16px', fontSize: 11, color: '#4b5563', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{c}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {PRODUCTS.slice(0, 6).map((p, i) => (
          <tr key={i} style={{ borderTop: '1px solid #f3f4f6', background: i % 2 ? 'rgba(248,250,252,0.30)' : '#fff' }}>
            <td style={{ padding: '10px 16px', textAlign: 'center', color: '#4b5563' }}>{p.name}</td>
            {p.v.map((v, j) => (
              <td key={j} style={{ padding: '10px 16px', textAlign: 'center', color: '#4b5563', fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>{v}</td>
            ))}
            <td style={{ padding: '10px 16px', textAlign: 'center', color: HEX, fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontWeight: 600 }}>{p.v.reduce((a, b) => a + b)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
