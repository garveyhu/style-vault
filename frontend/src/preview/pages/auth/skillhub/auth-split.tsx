import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

function Input({ label, type = 'text', placeholder }: { label: string; type?: string; placeholder?: string }) {
  const [focus, setFocus] = useState(false);
  return (
    <div>
      <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{label}</label>
      <input
        type={type} placeholder={placeholder}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          width: '100%', background: '#fff',
          border: `1px solid ${focus ? '#14b8a6' : '#cbd5e1'}`, borderRadius: 12,
          padding: '12px 16px', fontSize: 14, outline: 'none',
          boxShadow: focus ? '0 0 0 2px rgba(20,184,166,0.2)' : 'none',
          transition: 'all 200ms', fontFamily: 'inherit',
        }}
      />
    </div>
  );
}

export default function AuthSplitPagePreview() {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <PreviewFrame bg="#f8fafc" padded={false}>
      <style>{`
        @keyframes sv-auth-flow { from { background-position: 300% 50%; } to { background-position: 0% 50%; } }
      `}</style>
      <div style={{ minHeight: 700, display: 'flex', fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* 左：表单 */}
        <div style={{ flex: 1, width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 64 }}>
          <div style={{ maxWidth: 384, margin: '0 auto', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: 'linear-gradient(135deg, #1e293b, #020617)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700,
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
              }}>S</div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em', margin: 0 }}>
                {mode === 'login' ? '登录 SkillHub' : '加入 SkillHub'}
              </h2>
            </div>

            <div style={{
              display: 'flex', gap: 8, padding: 4,
              background: '#f1f5f9', borderRadius: 12, marginBottom: 32,
              border: '1px solid rgba(226,232,240,0.6)',
            }}>
              {(['login', 'register'] as const).map((m) => (
                <button key={m} onClick={() => setMode(m)}
                  style={{
                    flex: 1, padding: '8px 0', fontSize: 14, fontWeight: 600,
                    borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: mode === m ? '#fff' : 'transparent',
                    color: mode === m ? '#0f172a' : '#64748b',
                    boxShadow: mode === m ? '0 1px 2px rgba(0,0,0,0.04)' : 'none',
                    transition: 'all 200ms', fontFamily: 'inherit',
                  }}>
                  {m === 'login' ? '密码登录' : '创建账号'}
                </button>
              ))}
            </div>

            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {mode === 'register' && <Input label="昵称" placeholder="展示用名" />}
              <Input label="邮箱地址" type="email" placeholder="admin@example.com" />
              <Input label="密码" type="password" placeholder="至少 8 位" />
              {mode === 'register' && <Input label="确认密码" type="password" />}

              <button style={{
                width: '100%', padding: '12px 0',
                background: '#1a1a1a', color: '#fff',
                borderRadius: 12, border: 'none',
                fontSize: 14, fontWeight: 700, cursor: 'pointer',
                fontFamily: 'inherit', marginTop: 8,
              }}>
                {mode === 'login' ? '登录' : '创建账号'}
              </button>
            </form>

            <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid #e2e8f0' }}>
              <button style={{
                width: '100%', padding: '10px 0',
                background: '#fff', border: '1px solid #cbd5e1', borderRadius: 12,
                fontSize: 14, fontWeight: 500, color: '#0f172a', cursor: 'pointer',
                fontFamily: 'inherit',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <span style={{ fontWeight: 700 }}>G</span> 使用 Google 登录
              </button>
            </div>
          </div>
        </div>

        {/* 右：visual panel */}
        <div style={{
          flex: 1, width: '50%',
          background: 'linear-gradient(135deg, #0f172a, #020617)',
          position: 'relative', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
        }}>
          {/* 网格底纹 */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.1,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
          <div style={{ maxWidth: 400, padding: 48, textAlign: 'center', position: 'relative', zIndex: 10 }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 4, color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>
              Visual Panel
            </div>
            <h3 style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.25, margin: 0 }}>
              让 AI 技能{' '}
              <span style={{
                backgroundImage: 'linear-gradient(90deg, #5eead4, #67e8f9, #7dd3fc, #f9a8d4, #5eead4, #67e8f9, #7dd3fc, #f9a8d4, #5eead4)',
                backgroundSize: '300% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'sv-auth-flow 14s linear infinite',
              }}>
                流动起来
              </span>
            </h3>
            <p style={{ marginTop: 16, color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.7 }}>
              发现、安装、分享高质量的 AI Skill 技能包
            </p>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
