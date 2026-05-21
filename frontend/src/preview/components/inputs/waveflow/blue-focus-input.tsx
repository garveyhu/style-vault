import { PreviewFrame } from '../../../_layout';

export default function BlueFocusInput() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 500, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · INPUT</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 28px' }}>Blue Focus Input</h1>

        <Label>default</Label>
        <input style={inp} placeholder="请输入项目名称" />

        <Label>focus (blue-500 border + blue-100 ring)</Label>
        <input style={{ ...inp, borderColor: '#3b82f6', boxShadow: '0 0 0 2px #dbeafe' }} defaultValue="浙有善育" />

        <Label>error</Label>
        <input style={{ ...inp, borderColor: '#ef4444' }} defaultValue="too short" />
        <div style={{ marginTop: 4, fontSize: 11, color: '#dc2626' }}>项目名称至少 3 个字符</div>

        <Label>disabled</Label>
        <input style={{ ...inp, background: '#f5f4ee', color: '#78716c', cursor: 'not-allowed' }} defaultValue="不可编辑" disabled />

        <Label>mono (数字 / cron / ID)</Label>
        <input style={{ ...inp, fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums' }} defaultValue="0 0/5 * * * ?" />
      </div>
    </PreviewFrame>
  );
}

const inp: React.CSSProperties = {
  width: '100%', height: 32, padding: '0 12px', fontSize: 13, color: '#1c1917', background: '#fff',
  border: '1px solid #d6d3d1', borderRadius: 6, outline: 'none', boxSizing: 'border-box',
};

function Label({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 12, fontWeight: 500, color: '#78716c', marginTop: 16, marginBottom: 6 }}>{children}</div>;
}
