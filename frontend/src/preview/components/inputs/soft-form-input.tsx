import { useState } from 'react';
import { PreviewFrame } from '../../_layout';

function SoftInput({
  label, placeholder, error, hint, type = 'text',
}: {
  label: string; placeholder?: string; error?: string; hint?: string; type?: string;
}) {
  const [focus, setFocus] = useState(false);
  const [val, setVal] = useState('');
  const borderColor = error ? '#fecaca' : focus ? '#14b8a6' : '#cbd5e1';
  const ringColor = error ? 'rgba(244,63,94,0.2)' : 'rgba(20,184,166,0.2)';
  return (
    <div>
      <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
        {label}
      </label>
      <input
        type={type}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: '100%', background: '#fff',
          border: `1px solid ${borderColor}`, borderRadius: 12,
          padding: '12px 16px', fontSize: 14,
          color: '#111827', outline: 'none',
          boxShadow: focus ? `0 0 0 2px ${ringColor}` : 'none',
          transition: 'all 200ms ease-out',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      />
      {hint && !error && (
        <p style={{ marginTop: 4, fontSize: 12, color: '#9ca3af' }}>{hint}</p>
      )}
      {error && (
        <p style={{ marginTop: 4, fontSize: 12, color: '#e11d48' }}>{error}</p>
      )}
    </div>
  );
}

function LowInput() {
  const [focus, setFocus] = useState(false);
  return (
    <input
      placeholder="搜索标签 / 筛选..."
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        width: 220, background: '#fff',
        border: `1px solid ${focus ? '#94a3b8' : '#e2e8f0'}`, borderRadius: 8,
        padding: '6px 12px', fontSize: 13, outline: 'none',
        boxShadow: focus ? '0 0 0 1px #e2e8f0' : 'none',
        transition: 'all 200ms',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    />
  );
}

export default function SoftFormInputPreview() {
  return (
    <PreviewFrame bg="#f5f7fa">
      <div style={{ maxWidth: 620, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#9ca3af' }}>COMPONENT · INPUT</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.01em', margin: '8px 0 24px' }}>Soft Form Input</h1>

        <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#6b7280', marginBottom: 16 }}>
            高 input · px-4 py-3 · rounded-xl · primary-500 focus ring
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <SoftInput label="邮箱地址" type="email" placeholder="admin@example.com" />
            <SoftInput label="密码" type="password" placeholder="至少 8 位" hint="密码长度需 ≥ 8 位" />
            <SoftInput label="昵称" placeholder="展示用名" error="该昵称已被使用" />
          </div>
        </section>

        <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 24 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#6b7280', marginBottom: 16 }}>
            低 input · px-3 py-1.5 · rounded-lg · 搜索 / 筛选专用
          </div>
          <LowInput />
        </section>
      </div>
    </PreviewFrame>
  );
}
