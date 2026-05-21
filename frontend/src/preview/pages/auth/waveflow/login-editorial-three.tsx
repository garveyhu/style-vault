import { PreviewFrame } from '../../../_layout';
import { Eye, ArrowRight } from 'lucide-react';

export default function LoginEditorialThree() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ display: 'flex', minHeight: 720, fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* LEFT */}
        <div style={{ position: 'relative', flex: 1, padding: '0 48px 32px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #d6d3d1 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.3, maskImage: 'radial-gradient(ellipse at 70% 50%, black 30%, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse at 70% 50%, black 30%, transparent 80%)' }} />

          {/* SVG decor */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 600 720">
            <line x1="450" y1="186" x2="540" y2="320" stroke="#6366f1" strokeWidth="0.5" opacity="0.25" />
            <line x1="540" y1="320" x2="380" y2="416" stroke="#6366f1" strokeWidth="0.5" opacity="0.25" />
          </svg>
          <div style={{ position: 'absolute', top: 160, right: 110 }}>
            <svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="none" stroke="#6366f1" strokeWidth="1" opacity="0.5" /><circle cx="24" cy="24" r="14" fill="#6366f1" opacity="0.18" /></svg>
          </div>
          <div style={{ position: 'absolute', top: 300, right: 50 }}>
            <svg width="36" height="36" viewBox="0 0 36 36"><rect x="2" y="2" width="32" height="32" rx="6" fill="none" stroke="#ec4899" strokeWidth="1" opacity="0.6" /><rect x="8" y="8" width="20" height="20" rx="3" fill="#ec4899" opacity="0.15" /></svg>
          </div>
          <div style={{ position: 'absolute', top: 416, right: 200 }}>
            <svg width="40" height="40" viewBox="0 0 40 40"><polygon points="20,4 36,32 4,32" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.55" /></svg>
          </div>

          <div style={{ position: 'relative', maxWidth: 440, paddingTop: 90 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: '#2563eb', boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)', marginBottom: 20 }} />
            <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', color: '#1c1917' }}>Waveflow<span style={{ color: '#a8a29e' }}>.</span></div>
            <div style={{ marginTop: 6, fontSize: 13.5, color: '#78716c' }}>数据同步与任务调度平台</div>

            <form style={{ marginTop: 40 }}>
              <Field label="用户名"><input style={u} defaultValue="links" /></Field>
              <Field label="密码">
                <div style={{ position: 'relative' }}>
                  <input type="password" style={{ ...u, paddingRight: 32 }} defaultValue="••••••••" />
                  <Eye size={14} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: '#a8a29e' }} />
                </div>
              </Field>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#57534e', marginTop: 20 }}>
                <span style={{ width: 16, height: 16, borderRadius: 4, background: '#1c1917' }} /> 记住我
              </label>
              <button style={{ marginTop: 24, height: 44, minWidth: 140, padding: '0 24px', borderRadius: 9999, background: '#1c1917', color: '#fff', fontSize: 13.5, letterSpacing: '0.025em', fontWeight: 500, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', border: 'none' }}>
                继续 <ArrowRight size={14} />
              </button>
            </form>
          </div>
          <div style={{ position: 'absolute', bottom: 32, left: 48, fontSize: 12, color: '#a8a29e' }}>© 2026 Waveflow</div>
        </div>

        {/* RIGHT */}
        <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1530 50%, #0a1822 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 40%, rgba(99,102,241,0.3), transparent 60%), radial-gradient(circle at 70% 70%, rgba(6,182,212,0.2), transparent 60%)' }} />
          <svg viewBox="-3 -3 6 6" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <g stroke="#06b6d4" strokeWidth="0.012" fill="none" opacity="0.25">
              <polygon points="0,-2.4 2.28,-0.74 1.41,1.94 -1.41,1.94 -2.28,-0.74" />
              <polygon points="0,2.4 2.28,0.74 1.41,-1.94 -1.41,-1.94 -2.28,0.74" />
            </g>
            <g stroke="#6366f1" strokeWidth="0.02" fill="none" opacity="0.85">
              <polygon points="0,-1.6 1.52,-0.49 0.94,1.29 -0.94,1.29 -1.52,-0.49" />
              <polygon points="0,1.6 1.52,0.49 0.94,-1.29 -0.94,-1.29 -1.52,0.49" />
              <line x1="-1.52" y1="0.49" x2="1.52" y2="-0.49" />
            </g>
            {Array.from({ length: 80 }).map((_, i) => <circle key={i} cx={(Math.sin(i * 1.7) * 2.6).toFixed(2)} cy={(Math.cos(i * 2.3) * 2.6).toFixed(2)} r="0.014" fill="white" opacity="0.6" />)}
          </svg>
          <div style={{ position: 'absolute', insetInline: 0, bottom: 0, padding: 32, color: 'rgba(255,255,255,0.85)' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.4em', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>实时编排 · 数据中枢</div>
            <h2 style={{ fontSize: 30, fontWeight: 300, letterSpacing: '-0.01em', margin: 0 }}>
              让数据，
              <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }}>自如流转。</span>
            </h2>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

const u: React.CSSProperties = { width: '100%', background: 'transparent', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '1px solid #d6d3d1', padding: '10px 0', fontSize: 15, color: '#1c1917', outline: 'none' };

function Field({ label, children }: any) {
  return <div style={{ marginBottom: 20 }}><div style={{ fontSize: 12, fontWeight: 500, color: '#78716c', marginBottom: 4 }}>{label}</div>{children}</div>;
}
