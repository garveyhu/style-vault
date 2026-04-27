import { useState } from 'react';
import { Eye, EyeOff, Key, Lock, User } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

export default function IconPrefixInputPreview() {
  const [pwd, setPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);

  return (
    <PreviewFrame bg="rgb(249,249,249)">
      <div style={{ maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>
          COMPONENT · INPUT
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '8px 0 4px', letterSpacing: '-0.01em' }}>
          Icon Prefix Input
        </h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>
          登录页风格 · 左前缀 lucide 图标 · emerald focus ring
        </p>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Field
            label="Username"
            icon={<User size={20} />}
            value={name}
            setValue={setName}
            placeholder="username"
          />

          <Field
            label="Password"
            icon={<Lock size={20} />}
            value={pwd}
            setValue={setPwd}
            placeholder="password"
            type={showPwd ? 'text' : 'password'}
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

          <Field
            label="Registration Code"
            icon={<Key size={20} />}
            value={code}
            setValue={setCode}
            placeholder="可选 · 留空走普通注册"
            type={showCode ? 'text' : 'password'}
            suffix={
              <button
                type="button"
                onClick={() => setShowCode(v => !v)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'inline-flex' }}
                tabIndex={-1}
              >
                {showCode ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />
        </div>
      </div>
    </PreviewFrame>
  );
}

function Field({
  label, icon, value, setValue, placeholder, type = 'text', suffix,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  setValue: (v: string) => void;
  placeholder?: string;
  type?: string;
  suffix?: React.ReactNode;
}) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#334155', marginBottom: 4 }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <span style={{
          position: 'absolute', left: 12, top: 10,
          color: '#94a3b8',
          display: 'inline-flex', alignItems: 'center',
        }}>
          {icon}
        </span>
        <input
          type={type}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '8px 40px',
            border: '1px solid #cbd5e1',
            borderRadius: 8,
            outline: 'none',
            fontSize: 14,
            fontFamily: 'Inter, sans-serif',
            background: '#fff',
            transition: 'all 200ms',
          }}
          onFocus={e => {
            e.currentTarget.style.borderColor = '#10b981';
            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(16,185,129,0.4)';
          }}
          onBlur={e => {
            e.currentTarget.style.borderColor = '#cbd5e1';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        {suffix && <span style={{ position: 'absolute', right: 12, top: 10 }}>{suffix}</span>}
      </div>
    </div>
  );
}
