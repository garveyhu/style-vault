import { PreviewFrame } from '../../../_layout';
import { Eye } from 'lucide-react';

export default function UnderlineBareInput() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 440, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917', paddingTop: 80 }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · INPUT · LOGIN</div>
        <h1 style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', margin: '8px 0 32px' }}>极简下划线输入</h1>

        <Field label="用户名">
          <input style={u} defaultValue="links" autoComplete="off" />
        </Field>
        <Field label="密码">
          <div style={{ position: 'relative' }}>
            <input type="password" style={{ ...u, paddingRight: 32 }} defaultValue="••••••••" />
            <Eye size={14} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: '#a8a29e' }} />
          </div>
        </Field>
        <Field label="邮箱（error）">
          <input style={{ ...u, borderColor: '#f87171' }} defaultValue="invalid" />
          <div style={{ marginTop: 4, fontSize: 11.5, color: '#dc2626' }}>邮箱格式错误</div>
        </Field>

        <div style={{ fontSize: 12, color: '#a8a29e', marginTop: 28 }}>
          失焦 stone-300 / 聚焦 stone-900 · bg transparent · py-2.5 · 15px Inter
        </div>
      </div>
    </PreviewFrame>
  );
}

const u: React.CSSProperties = {
  width: '100%', background: 'transparent', borderTop: 'none', borderLeft: 'none', borderRight: 'none',
  borderBottom: '1px solid #d6d3d1', padding: '10px 0', fontSize: 15, color: '#1c1917', outline: 'none',
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: '#78716c', marginBottom: 4 }}>{label}</div>
      {children}
    </div>
  );
}
