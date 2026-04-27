import { useState } from 'react';
import { ArrowRight, Eye, EyeOff, Globe, Key, Lock, User as UserIcon } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

export default function AuthEmeraldCardPreview() {
  const [isReg, setIsReg] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  return (
    <PreviewFrame bg="#f8fafc" padded={false}>
      <div style={{
        minHeight: 600, position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
      }}>
        <div style={{
          position: 'absolute', top: 16, right: 16,
          display: 'inline-flex', alignItems: 'center', gap: 4,
          color: '#64748b', fontSize: 13, cursor: 'pointer',
        }}>
          <Globe size={14} /> 简体中文
        </div>

        <div style={{
          background: '#fff', padding: 32,
          borderRadius: 16,
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.10), 0 8px 10px -6px rgba(0,0,0,0.10)',
          width: '100%', maxWidth: 400,
          color: '#0f172a',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <span style={{
                width: 48, height: 48, borderRadius: 12, background: '#10b981',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 24, fontWeight: 700,
              }}>S</span>
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', margin: 0 }}>Sage</h1>
            <p style={{ color: '#64748b', marginTop: 8, fontSize: 14 }}>{isReg ? '注册新账号' : 'AI 数据分析平台'}</p>
          </div>

          <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Field label="Username" Icon={UserIcon} placeholder="username" />
            <Field
              label="Password"
              Icon={Lock}
              type={showPwd ? 'text' : 'password'}
              placeholder="password"
              suffix={
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'inline-flex' }}
                  tabIndex={-1}
                >
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
            {isReg && <Field label="Registration Code" Icon={Key} type="password" placeholder="可选 · 留空走普通注册" />}

            <button
              type="submit"
              onMouseEnter={e => { e.currentTarget.style.background = '#047857'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#059669'; }}
              style={{
                marginTop: 8, width: '100%', padding: 8,
                background: '#059669', color: '#fff',
                border: 'none', borderRadius: 8,
                fontWeight: 500, fontSize: 14,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'background 200ms',
              }}
            >
              {isReg ? '注册' : '登录'}
              <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: '#475569' }}>
            {isReg ? '已有账号？ ' : '还没账号？ '}
            <button
              onClick={() => setIsReg(v => !v)}
              style={{
                background: 'transparent', border: 'none',
                color: '#059669', fontWeight: 500,
                cursor: 'pointer', fontSize: 14,
                textDecoration: 'underline',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {isReg ? '登录' : '注册'}
            </button>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function Field({ label, Icon, type = 'text', placeholder, suffix }: {
  label: string;
  Icon: React.ComponentType<{ size?: number }>;
  type?: string;
  placeholder?: string;
  suffix?: React.ReactNode;
}) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#334155', marginBottom: 4 }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <span style={{
          position: 'absolute', left: 12, top: 10,
          color: '#94a3b8', display: 'inline-flex',
        }}>
          <Icon size={20} />
        </span>
        <input
          type={type} placeholder={placeholder}
          onFocus={e => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(16,185,129,0.4)'; }}
          onBlur={e => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.boxShadow = 'none'; }}
          style={{
            width: '100%', padding: '8px 40px',
            border: '1px solid #cbd5e1', borderRadius: 8,
            fontSize: 14, outline: 'none',
            fontFamily: 'Inter, sans-serif',
            transition: 'all 200ms',
          }}
        />
        {suffix && <span style={{ position: 'absolute', right: 12, top: 10 }}>{suffix}</span>}
      </div>
    </div>
  );
}
