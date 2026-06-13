import { PreviewFrame } from '../../../_layout';

const PRIMARY_600 = '#2563eb';
const VIOLET = '#8b5cf6';

// 模拟时序数据点（左轴调用量 / 右轴成本）
const POINTS = [
  { x: '06-07', calls: 1200, cost: 2.1 },
  { x: '06-08', calls: 1850, cost: 3.4 },
  { x: '06-09', calls: 1620, cost: 2.9 },
  { x: '06-10', calls: 2400, cost: 4.8 },
  { x: '06-11', calls: 2980, cost: 6.2 },
  { x: '06-12', calls: 2710, cost: 5.5 },
  { x: '06-13', calls: 3420, cost: 7.1 },
];

const W = 640;
const H = 256;
const PAD = { top: 16, right: 44, bottom: 28, left: 44 };
const innerW = W - PAD.left - PAD.right;
const innerH = H - PAD.top - PAD.bottom;

function path(values: number[]) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  return values
    .map((v, i) => {
      const px = PAD.left + (i / (values.length - 1)) * innerW;
      const py = PAD.top + innerH - ((v - min) / span) * innerH;
      return `${i === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)}`;
    })
    .join(' ');
}

export default function RechartsTimeSeries() {
  const calls = POINTS.map(p => p.calls);
  const costs = POINTS.map(p => p.cost);
  // 网格水平线 5 条
  const gridY = [0, 1, 2, 3, 4].map(i => PAD.top + (i / 4) * innerH);

  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 720, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · DISPLAY · signature</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>Recharts Time Series</h1>

        {/* 双轴折线 */}
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>双轴：调用量 (primary) + 成本 (violet · 右轴)</div>
        <div style={{ borderRadius: 8, border: '1px solid #e7e5e0', background: '#ffffff', boxShadow: '0 1px 3px rgb(0 0 0 / 5%), 0 2px 8px rgb(0 0 0 / 3%)', padding: 12 }}>
          <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
            {/* CartesianGrid 半透明黑虚线 */}
            {gridY.map((y, i) => (
              <line key={i} x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} stroke="rgb(0 0 0 / 6%)" strokeDasharray="3 3" />
            ))}
            {/* 左 Y 轴 */}
            <line x1={PAD.left} x2={PAD.left} y1={PAD.top} y2={PAD.top + innerH} stroke="#999999" strokeWidth={1} />
            {/* 右 Y 轴 */}
            <line x1={W - PAD.right} x2={W - PAD.right} y1={PAD.top} y2={PAD.top + innerH} stroke="#999999" strokeWidth={1} />
            {/* X 轴 */}
            <line x1={PAD.left} x2={W - PAD.right} y1={PAD.top + innerH} y2={PAD.top + innerH} stroke="#999999" strokeWidth={1} />
            {/* X 刻度 */}
            {POINTS.map((p, i) => (
              <text key={p.x} x={PAD.left + (i / (POINTS.length - 1)) * innerW} y={H - 10} fontSize={11} fill="#999999" textAnchor="middle">{p.x}</text>
            ))}
            {/* Y 左刻度 */}
            {[0, 1, 2, 3, 4].map(i => (
              <text key={i} x={PAD.left - 6} y={PAD.top + (i / 4) * innerH + 4} fontSize={11} fill="#999999" textAnchor="end">{(3500 - i * 875).toFixed(0)}</text>
            ))}
            {/* Y 右刻度 */}
            {[0, 1, 2, 3, 4].map(i => (
              <text key={i} x={W - PAD.right + 6} y={PAD.top + (i / 4) * innerH + 4} fontSize={11} fill="#999999" textAnchor="start">¥{(7.5 - i * 1.875).toFixed(1)}</text>
            ))}
            {/* Line primary（调用量） */}
            <path d={path(calls)} fill="none" stroke={PRIMARY_600} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            {/* Line violet（成本，右轴） */}
            <path d={path(costs)} fill="none" stroke={VIOLET} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {/* tooltip 示意 */}
          <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 2, background: '#ffffff', border: '1px solid rgb(0 0 0 / 10%)', borderRadius: 8, fontSize: 12, padding: '6px 10px', marginTop: 8 }}>
            <span style={{ color: '#1c1917', fontWeight: 500 }}>06-13</span>
            <span style={{ color: PRIMARY_600 }}>调用量 : 3,420</span>
            <span style={{ color: VIOLET }}>成本 : ¥7.1</span>
          </div>
        </div>

        {/* 空态 */}
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', margin: '24px 0 12px' }}>空态兜底</div>
        <div style={{ borderRadius: 8, border: '1px solid #e7e5e0', background: '#ffffff', boxShadow: '0 1px 3px rgb(0 0 0 / 5%), 0 2px 8px rgb(0 0 0 / 3%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#a8a29e', height: 256 }}>暂无数据</div>
        </div>

        <div style={{ marginTop: 16, fontSize: 11, color: '#a8a29e', lineHeight: 1.7 }}>
          网格 rgb(0 0 0 / 6%) 虚线 3 3 · 轴 #999 / 11px · tooltip paper 底 + 8px 圆角 · Line monotone / 2px / dot=false
        </div>
      </div>
    </PreviewFrame>
  );
}
