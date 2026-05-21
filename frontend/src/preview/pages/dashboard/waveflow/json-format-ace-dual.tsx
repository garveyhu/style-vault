import { PreviewFrame } from '../../../_layout';

const SAMPLE = `{
  "job": {
    "setting": {
      "speed": { "channel": 3, "byte": 1048576 }
    },
    "content": [{
      "reader": { "name": "mysqlreader" },
      "writer": { "name": "mysqlwriter" }
    }]
  }
}`;

export default function JsonFormatAceDual() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: '16px 24px', height: 560, display: 'flex', flexDirection: 'column', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', color: '#1c1917', marginTop: 0, marginBottom: 12 }}>JSON 格式化工具</h2>
        <div style={{ flex: 1, display: 'flex', gap: 12, overflow: 'hidden' }}>
          {['输入 JSON', '格式化结果'].map((title, i) => (
            <div key={title} style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 12, boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)', overflow: 'hidden' }}>
              <div style={{ background: 'rgba(244,243,238,0.4)', borderBottom: '1px solid #f5f4ee', padding: '8px 12px', fontSize: 12, fontWeight: 500, color: '#57534e' }}>{title}</div>
              <pre style={{ flex: 1, margin: 0, padding: 12, fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: '#44403c', overflow: 'auto', background: i === 1 ? '#fafaf7' : '#fff' }}>{SAMPLE}</pre>
            </div>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}
