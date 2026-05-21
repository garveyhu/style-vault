import { PreviewFrame } from '../../../_layout';
import { Eye, ArrowRight } from 'lucide-react';

export default function LoginEditorialForm() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ position: 'relative', minHeight: 720, padding: '0 64px 40px', fontFamily: 'Inter, system-ui, sans-serif', overflow: 'hidden' }}>
        {/* dot grid bg */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #d6d3d1 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.3, maskImage: 'radial-gradient(ellipse at 70% 50%, black 30%, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse at 70% 50%, black 30%, transparent 80%)' }} />

        <div style={{ position: 'relative', maxWidth: 440, paddingTop: '14vh' }}>
          {/* hero */}
          <div style={{ width: 56, height: 56, borderRadius: 16, background: '#2563eb', boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)', marginBottom: 20 }} />
          <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', color: '#1c1917' }}>
            Waveflow<span style={{ color: '#a8a29e' }}>.</span>
          </div>
          <div style={{ marginTop: 6, fontSize: 13.5, color: '#78716c' }}>数据同步与任务调度平台</div>

          {/* form */}
          <form style={{ marginTop: 40 }}>
            <Field label="用户名"><input style={u} defaultValue="links" /></Field>
            <Field label="密码">
              <div style={{ position: 'relative' }}>
                <input type="password" style={{ ...u, paddingRight: 32 }} defaultValue="••••••••" />
                <Eye size={14} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: '#a8a29e' }} />
              </div>
            </Field>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#57534e', marginTop: 24 }}>
              <span style={{ width: 16, height: 16, borderRadius: 4, background: '#1c1917', border: '1px solid #1c1917' }} />
              记住我
            </label>
            <button style={{
              marginTop: 24, height: 44, minWidth: 140, padding: '0 24px', borderRadius: 9999,
              background: '#1c1917', color: '#fff', fontSize: 13.5, letterSpacing: '0.025em', fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', border: 'none',
            }}>
              继续 <ArrowRight size={14} />
            </button>
          </form>
        </div>

        <div style={{ position: 'absolute', bottom: 40, left: 64, fontSize: 12, color: '#a8a29e' }}>© 2026 Waveflow</div>
      </div>
    </PreviewFrame>
  );
}

const u: React.CSSProperties = {
  width: '100%', background: 'transparent', borderTop: 'none', borderLeft: 'none', borderRight: 'none',
  borderBottom: '1px solid #d6d3d1', padding: '10px 0', fontSize: 15, color: '#1c1917', outline: 'none',
};

function Field({ label, children }: any) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: '#78716c', marginBottom: 4 }}>{label}</div>
      {children}
    </div>
  );
}
