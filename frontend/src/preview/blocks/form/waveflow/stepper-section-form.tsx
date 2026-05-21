import { PreviewFrame } from '../../../_layout';
import { Check } from 'lucide-react';

const STEPS = ['Reader', 'Writer', '字段映射', '构建 & 模板'];
const active = 2;

export default function StepperSectionForm() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 880, margin: '0 auto', background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 12, padding: 20, boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', color: '#1c1917', marginTop: 0, marginBottom: 16 }}>任务构建</h2>

        <ol style={{ display: 'flex', alignItems: 'center', gap: 0, listStyle: 'none', padding: 0, margin: '0 0 20px' }}>
          {STEPS.map((label, i) => {
            const done = i < active, cur = i === active;
            return (
              <li key={label} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
                  <span style={{
                    width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11.5, fontWeight: 600,
                    background: done ? '#2563eb' : '#fff',
                    color: done ? '#fff' : cur ? '#2563eb' : '#a8a29e',
                    border: `1px solid ${done || cur ? '#2563eb' : '#d6d3d1'}`,
                    boxShadow: cur ? '0 0 0 2px #dbeafe' : 'none',
                  }}>
                    {done ? <Check size={12} /> : i + 1}
                  </span>
                  <span style={{ fontSize: 12, color: cur ? '#1c1917' : done ? '#57534e' : '#a8a29e', fontWeight: cur ? 500 : 400 }}>{label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <span style={{ flex: 1, height: 1, marginTop: -28, background: done ? '#2563eb' : '#e7e5e0' }} />
                )}
              </li>
            );
          })}
        </ol>

        <div style={{ borderTop: '1px solid #f5f4ee', paddingTop: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#44403c', marginBottom: 8 }}>步骤 3：字段映射</div>
          <div style={{ height: 200, background: '#fff', border: '1px solid rgba(231,229,224,0.6)', borderRadius: 6 }} />
        </div>

        <div style={{ marginTop: 20, borderTop: '1px solid #f5f4ee', paddingTop: 16, display: 'flex', gap: 8 }}>
          <button style={{ height: 32, padding: '0 12px', background: 'transparent', color: '#44403c', border: 'none', borderRadius: 6, fontSize: 12.5, cursor: 'pointer' }}>上一步</button>
          <button style={{ height: 32, padding: '0 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 12.5, fontWeight: 500, cursor: 'pointer' }}>下一步</button>
        </div>
      </div>
    </PreviewFrame>
  );
}
