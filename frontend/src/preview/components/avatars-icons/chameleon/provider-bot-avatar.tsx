import { PreviewFrame } from '../../../_layout';
import { Bot } from 'lucide-react';

/**
 * provider-bot-avatar · 品牌单字头像 + 渐变 Bot 头像
 * (A) ProviderAvatar 按 provider code 给品牌色+短标   (B) violet→blue 渐变 Bot 头像
 * 源码：core/components/common/provider-avatar.tsx + playground message-thread / playground-page
 */

const BRANDS = [
  { code: 'deepseek', label: 'DS', bg: '#eff6ff', fg: '#2563eb', ring: '#dbeafe' },
  { code: 'qwen', label: '通', bg: '#f5f3ff', fg: '#7c3aed', ring: '#ede9fe' },
  { code: 'openai', label: 'AI', bg: '#ecfdf5', fg: '#059669', ring: '#d1fae5' },
  { code: 'new-api', label: '⇄', bg: '#eff6ff', fg: '#2563eb', ring: '#dbeafe' },
  { code: 'dify', label: 'Di', bg: '#eef2ff', fg: '#4f46e5', ring: '#e0e7ff' },
  { code: 'fastgpt', label: 'FG', bg: '#ecfeff', fg: '#0891b2', ring: '#cffafe' },
  { code: 'coze', label: 'Cz', bg: '#fffbeb', fg: '#d97706', ring: '#fef3c7' },
  { code: '? (unknown)', label: '?', bg: '#f5f5f4', fg: '#78716c', ring: '#e7e5e0' },
];

const GRADIENT = 'linear-gradient(135deg, #8b5cf6, #3b82f6)';

export default function ProviderBotAvatar() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 720, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · AVATAR</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>Provider / Bot Avatar</h1>

        {/* A · 品牌单字方头像 sm (32px) */}
        <Section title="A · ProviderAvatar · sm (h-8 w-8 / 32px)">
          {BRANDS.map(b => (
            <div key={b.code} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <span style={{
                display: 'flex', width: 32, height: 32, alignItems: 'center', justifyContent: 'center',
                borderRadius: 8, fontSize: 11, fontWeight: 600,
                background: b.bg, color: b.fg, boxShadow: `inset 0 0 0 1px ${b.ring}`,
              }}>{b.label}</span>
              <span style={{ fontSize: 9.5, fontFamily: 'JetBrains Mono, monospace', color: '#a8a29e' }}>{b.code}</span>
            </div>
          ))}
        </Section>

        {/* A · md (40px) */}
        <Section title="A · md (h-10 w-10 / 40px)">
          {BRANDS.slice(0, 5).map(b => (
            <span key={b.code} style={{
              display: 'flex', width: 40, height: 40, alignItems: 'center', justifyContent: 'center',
              borderRadius: 8, fontSize: 13, fontWeight: 600,
              background: b.bg, color: b.fg, boxShadow: `inset 0 0 0 1px ${b.ring}`,
            }}>{b.label}</span>
          ))}
        </Section>

        {/* B · 渐变 Bot 头像 */}
        <Section title="B · 渐变 Bot 头像（playground AI 消息）">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* 圆形 24px + Bot */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <span style={{ display: 'flex', width: 24, height: 24, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: GRADIENT, color: '#fff' }}>
                <Bot size={14} />
              </span>
              <span style={{ fontSize: 9.5, fontFamily: 'JetBrains Mono, monospace', color: '#a8a29e' }}>h-6 圆形</span>
            </div>
            {/* 列头变体 16px 色块 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 16, height: 16, borderRadius: 4, background: GRADIENT }} />
              <span style={{ fontSize: 9.5, fontFamily: 'JetBrains Mono, monospace', color: '#a8a29e' }}>h-4 列头块</span>
            </div>
          </div>
        </Section>

        {/* 真实用法：消息气泡 + 对比列头 */}
        <Section title="真实用法">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
            {/* AI 消息气泡 */}
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ marginTop: 2, display: 'flex', width: 24, height: 24, flexShrink: 0, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: GRADIENT, color: '#fff' }}><Bot size={14} /></span>
              <div style={{ maxWidth: 360, borderRadius: 10, background: '#fff', border: '1px solid #e7e5e0', padding: '8px 12px', fontSize: 12.5, lineHeight: 1.5, color: '#44403c' }}>
                您好，我是客服助手。请问有什么可以帮您？
              </div>
            </div>
            {/* 对比列头 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid rgba(231,229,224,0.7)', background: 'rgba(244,243,238,0.3)', padding: '8px 12px', borderRadius: 6 }}>
              <span style={{ width: 16, height: 16, flexShrink: 0, borderRadius: 4, background: GRADIENT }} />
              <span style={{ flex: 1, fontSize: 12, fontWeight: 500, color: '#292524' }}>
                qwen-chat <span style={{ marginLeft: 4, fontSize: 10.5, fontWeight: 400, color: '#a8a29e' }}>列 1</span>
              </span>
            </div>
          </div>
        </Section>
      </div>
    </PreviewFrame>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>{title}</div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>{children}</div>
    </div>
  );
}
