import { MessageSquare, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

export default function UserPublicProfilePreview() {
  const [following, setFollowing] = useState(false);

  return (
    <PreviewFrame bg="rgba(248,250,252,0.5)" padded={false}>
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a', minHeight: 600 }}>

        {/* 唯一 section · 白底 + border-b */}
        <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ maxWidth: 672, margin: '0 auto', padding: '40px 24px 24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Avatar · 88 · ring-4 ring-white */}
              <div style={{
                width: 88, height: 88, borderRadius: 999,
                background: '#cbd5e1', color: '#64748b',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 40,
                boxShadow: '0 0 0 4px #fff, 0 10px 15px -3px rgba(0,0,0,0.1)',
              }}>
                M
              </div>

              {/* Name · text-xl extrabold */}
              <h1 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em', margin: '16px 0 4px' }}>
                后端-M
              </h1>

              {/* UID · mono text-xs */}
              <span style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace', marginBottom: 8 }}>
                UID: 2048
              </span>

              {/* Bio · text-sm text-slate-500 */}
              <p style={{ fontSize: 14, color: '#64748b', textAlign: 'center', maxWidth: 384, margin: '0 0 20px', lineHeight: 1.7 }}>
                分布式系统工程师 · 最近在研究 LLM 应用的缓存策略
              </p>

              {/* Stats · 3 列 · 不可点击（公开主页 stats 不带交互）*/}
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 20 }}>
                {[
                  ['获赞', 1402],
                  ['关注', 68],
                  ['粉丝', 312],
                ].map(([l, v]) => (
                  <div key={l as string} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>{v as number}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{l as string}</div>
                  </div>
                ))}
              </div>

              {/* Actions · 非自己时才显示 · slate 填色按钮对 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button
                  onClick={() => setFollowing(!following)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '6px 16px', fontSize: 12, fontWeight: 500,
                    borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: following ? '#f1f5f9' : '#0f172a',
                    color: following ? '#94a3b8' : '#fff',
                    transition: 'background 150ms',
                    fontFamily: 'inherit',
                  }}
                >
                  <UserPlus size={13} /> {following ? '取消关注' : '关注'}
                </button>
                <button
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '6px 16px', fontSize: 12, fontWeight: 500,
                    borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: '#f1f5f9', color: '#475569',
                    fontFamily: 'inherit',
                  }}
                >
                  <MessageSquare size={13} /> 发消息
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* profile header 之下空白 · 真实页就这样 */}
        <div style={{ maxWidth: 672, margin: '0 auto', padding: '32px 24px', textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: '#cbd5e1', fontStyle: 'italic', margin: 0 }}>
            （真实 /users/:id 仅展示 profile header，header 下为空白浅灰底）
          </p>
        </div>
      </div>
    </PreviewFrame>
  );
}
