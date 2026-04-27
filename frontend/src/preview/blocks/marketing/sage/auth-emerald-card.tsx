import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

export default function AuthEmeraldCardPreview() {
  const [isReg, setIsReg] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  return (
    <PreviewFrame bg="#f8fafc" padded={false}>
      <div style={{ minHeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 16, right: 16, fontSize: 12, color: '#64748b', cursor: 'pointer' }}>🌐 简体中文</div>

        <div style={{
          background: '#fff',
          padding: 32,
          borderRadius: 16,
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.10), 0 8px 10px -6px rgba(0,0,0,0.10)',
          width: '100%', maxWidth: 400,
          color: '#0f172a',
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <span style={{ width: 48, height: 48, borderRadius: 12, background: '#10b981', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24, fontWeight: 700 }}>S</span>
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', margin: 0 }}>Sage</h1>
            <p style={{ color: '#64748b', marginTop: 8, fontSize: 13 }}>{isReg ? '注册新账号' : 'AI 数据分析平台'}</p>
          </div>

          <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Field label="Username" icon="👤" />
            <Field
              label="Password"
              icon="🔒"
              type={showPwd ? 'text' : 'password'}
              suffix={<span onClick={() => setShowPwd(v => !v)} style={{ cursor: 'pointer', fontSize: 14 }}>{showPwd ? '🙈' : '👁'}</span>}
            />
            {isReg && <Field label="Registration Code" icon="🔑" placeholder="可选 · 留空走普通注册" type="password" />}

            <button
              type="submit"
              style={{
                marginTop: 8, width: '100%', padding: '10px',
                background: '#059669', color: '#fff',
                border: 'none', borderRadius: 8,
                fontWeight: 500, fontSize: 14,
                cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'background 200ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#047857'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#059669'; }}
            >
              {isReg ? '注册' : '登录'} →
            </button>
          </form>

          <div style={{ marginTop: 24, textAlign: 'center', fontSize: 13, color: '#64748b' }}>
            {isReg ? '已有账号？ ' : '还没账号？ '}
            <button
              onClick={() => setIsReg(v => !v)}
              style={{ background: 'transparent', border: 'none', color: '#059669', fontWeight: 500, cursor: 'pointer', fontSize: 13, textDecoration: 'underline' }}
            >
              {isReg ? '登录' : '注册'}
            </button>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function Field({ label, icon, type = 'text', placeholder, suffix }: { label: string; icon: string; type?: string; placeholder?: string; suffix?: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#334155', marginBottom: 4 }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: 12, top: 9, color: '#94a3b8', fontSize: 14 }}>{icon}</span>
        <input
          type={type} placeholder={placeholder}
          style={{
            width: '100%', padding: '8px 36px',
            border: '1px solid #cbd5e1', borderRadius: 8,
            fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif',
            transition: 'all 200ms',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.boxShadow = '0 0 0 2px #10b98140'; }}
          onBlur={e => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.boxShadow = 'none'; }}
        />
        {suffix && <span style={{ position: 'absolute', right: 12, top: 10 }}>{suffix}</span>}
      </div>
    </div>
  );
}
