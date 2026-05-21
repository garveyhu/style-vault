import { PreviewFrame } from '../../../_layout';
import { Check, Copy } from 'lucide-react';

export default function JsonBuildStepper() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: '16px 24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <section style={{ background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 12, padding: 20, boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)' }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', color: '#1c1917', marginTop: 0, marginBottom: 16 }}>任务构建</h2>

          {/* Stepper */}
          <ol style={{ display: 'flex', alignItems: 'center', listStyle: 'none', padding: 0, margin: '0 0 20px' }}>
            {['Reader', 'Writer', '字段映射', '构建 & 模板'].map((label, i) => {
              const done = i < 3, cur = i === 3;
              return (
                <li key={label} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
                    <span style={{ width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11.5, fontWeight: 600, background: done ? '#2563eb' : '#fff', color: done ? '#fff' : cur ? '#2563eb' : '#a8a29e', border: `1px solid ${done || cur ? '#2563eb' : '#d6d3d1'}`, boxShadow: cur ? '0 0 0 2px #dbeafe' : 'none' }}>
                      {done ? <Check size={12} /> : i + 1}
                    </span>
                    <span style={{ fontSize: 12, color: cur ? '#1c1917' : done ? '#57534e' : '#a8a29e', fontWeight: cur ? 500 : 400 }}>{label}</span>
                  </div>
                  {i < 3 && <span style={{ flex: 1, height: 1, marginTop: -28, background: done ? '#2563eb' : '#e7e5e0' }} />}
                </li>
              );
            })}
          </ol>

          {/* Step 4 content */}
          <div style={{ borderTop: '1px solid #f5f4ee', paddingTop: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#44403c', marginBottom: 12 }}>步骤 4：构建与选择模板</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
              <button style={primaryBtn}>1. 构建</button>
              <button style={primaryBtn}>2. 选择模板</button>
              <button style={outlineBtn}><Copy size={14} /> 复制 JSON</button>
            </div>
            <pre style={{ background: '#f5f5f4', border: '1px solid rgba(231,229,224,0.6)', borderRadius: 6, padding: 12, margin: 0, fontSize: 11.5, fontFamily: 'JetBrains Mono, monospace', color: '#44403c', height: 200, overflow: 'auto', whiteSpace: 'pre' }}>{`{
  "job": {
    "content": [{
      "reader": { "name": "mysqlreader", "parameter": { ... } },
      "writer": { "name": "mysqlwriter", "parameter": { ... } }
    }],
    "setting": {
      "speed": { "channel": 3, "byte": 1048576 }
    }
  }
}`}</pre>
          </div>

          {/* footer nav */}
          <div style={{ marginTop: 20, borderTop: '1px solid #f5f4ee', paddingTop: 16, display: 'flex', gap: 8 }}>
            <button style={ghostBtn}>上一步</button>
            <button style={primaryBtn}>创建任务</button>
          </div>
        </section>
      </div>
    </PreviewFrame>
  );
}

const primaryBtn: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 12.5, fontWeight: 500, cursor: 'pointer' };
const outlineBtn: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', background: '#fff', color: '#44403c', border: '1px solid #d6d3d1', borderRadius: 6, fontSize: 12.5, cursor: 'pointer' };
const ghostBtn: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', height: 32, padding: '0 12px', background: 'transparent', color: '#44403c', border: 'none', borderRadius: 6, fontSize: 12.5, cursor: 'pointer' };
