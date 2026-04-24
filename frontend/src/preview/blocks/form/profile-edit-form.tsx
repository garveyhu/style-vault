import { Bell, Heart, LogOut, Palette, Search, Settings, Star, Upload, User } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { PreviewFrame } from '../../_layout';

const AVATAR_OPTIONS: { name: string; Icon: LucideIcon }[] = [
  { name: 'user', Icon: User },
  { name: 'star', Icon: Star },
  { name: 'heart', Icon: Heart },
  { name: 'palette', Icon: Palette },
  { name: 'settings', Icon: Settings },
  { name: 'bell', Icon: Bell },
  { name: 'search', Icon: Search },
  { name: 'upload', Icon: Upload },
];

function Input({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  const [focus, setFocus] = useState(false);
  return (
    <div>
      <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
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

export default function ProfileEditFormPreview() {
  const [nickname, setNickname] = useState('links');
  const [bio, setBio] = useState('在构建 AI 技能社区');
  const [selectedAvatar, setSelectedAvatar] = useState('user');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [bioFocus, setBioFocus] = useState(false);

  const SelectedIcon = AVATAR_OPTIONS.find((o) => o.name === selectedAvatar)?.Icon ?? User;

  return (
    <PreviewFrame bg="#f5f7fa">
      <div style={{ maxWidth: 672, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>
        {/* 顶栏 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: '#64748b', fontSize: 14, fontFamily: 'inherit',
          }}>
            <ArrowLeft size={18} /> 返回
          </button>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.01em' }}>
            编辑资料
          </h1>
          <button style={{
            padding: '8px 20px', background: '#1a1a1a', color: '#fff',
            borderRadius: 12, border: 'none',
            fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
          }}>保存</button>
        </div>

        {/* 头像 section */}
        <section style={{
          background: '#fff', borderRadius: 16,
          border: '1px solid rgba(226,232,240,0.6)', padding: 24, marginBottom: 24,
        }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>头像</label>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 96, height: 96, borderRadius: 999,
              background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 0 4px #f8fafc',
            }}>
              <SelectedIcon size={48} color="#64748b" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 8 }}>
              {AVATAR_OPTIONS.map((opt) => {
                const active = opt.name === selectedAvatar;
                return (
                  <button
                    key={opt.name}
                    onClick={() => setSelectedAvatar(opt.name)}
                    style={{
                      width: 40, height: 40, borderRadius: 8,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: active ? '#f0fdfa' : 'transparent',
                      boxShadow: active ? '0 0 0 2px #14b8a6' : 'none',
                      border: 'none', cursor: 'pointer',
                      transition: 'all 150ms',
                    }}
                    onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = '#f8fafc'; }}
                    onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                  >
                    <opt.Icon size={20} color={active ? '#0d9488' : '#64748b'} />
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 基本信息 */}
        <section style={{
          background: '#fff', borderRadius: 16,
          border: '1px solid rgba(226,232,240,0.6)', padding: 24, marginBottom: 24,
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          <Input label="昵称" value={nickname} onChange={setNickname} />

          <div>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>简介</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3} maxLength={200}
              onFocus={() => setBioFocus(true)} onBlur={() => setBioFocus(false)}
              style={{
                width: '100%', background: '#fff',
                border: `1px solid ${bioFocus ? '#14b8a6' : '#cbd5e1'}`, borderRadius: 12,
                padding: '12px 16px', fontSize: 14, outline: 'none',
                boxShadow: bioFocus ? '0 0 0 2px rgba(20,184,166,0.2)' : 'none',
                transition: 'all 200ms', fontFamily: 'inherit',
                resize: 'none',
              }}
            />
            <div style={{ textAlign: 'right', fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
              {bio.length}/200
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>性别</label>
            <div style={{
              display: 'flex', gap: 8, padding: 4,
              background: '#f1f5f9', borderRadius: 12,
              border: '1px solid rgba(226,232,240,0.6)',
            }}>
              {(['male', 'female', 'other'] as const).map((g) => (
                <button
                  key={g} onClick={() => setGender(g)}
                  style={{
                    flex: 1, padding: '8px 0', fontSize: 14, fontWeight: 600,
                    borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: gender === g ? '#fff' : 'transparent',
                    color: gender === g ? '#0f172a' : '#64748b',
                    boxShadow: gender === g ? '0 1px 2px rgba(0,0,0,0.04)' : 'none',
                    transition: 'all 200ms', fontFamily: 'inherit',
                  }}
                >
                  {g === 'male' ? '男' : g === 'female' ? '女' : '其他'}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 危险区 */}
        <section style={{
          background: '#fff', borderRadius: 16,
          border: '1px solid rgba(254,205,211,0.6)', padding: 24,
        }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#be123c', marginBottom: 8 }}>账号</label>
          <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 16px' }}>
            退出登录后本设备的会话会失效。
          </p>
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', borderRadius: 12,
            border: '1px solid #fda4af', background: 'transparent',
            color: '#e11d48', fontSize: 14, fontWeight: 500,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            <LogOut size={14} /> 退出登录
          </button>
        </section>
      </div>
    </PreviewFrame>
  );
}
