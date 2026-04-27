import { useState } from 'react';
import { PreviewFrame } from '../_layout';

const THEMES = [
  { name: 'green', hex: '#10b981' },
  { name: 'blue', hex: '#60a5fa' },
  { name: 'cyan', hex: '#22d3ee' },
  { name: 'rose', hex: '#fb7185' },
  { name: 'purple', hex: '#a78bfa' },
];

export default function SageProductPreview() {
  const [themeIdx, setThemeIdx] = useState(0);
  const t = THEMES[themeIdx];

  return (
    <PreviewFrame bg="rgb(249,249,249)" padded={false}>
      <div style={{ minHeight: 720, padding: 32, fontFamily: 'Inter, sans-serif', color: '#0f172a' }}>
        {/* Hero */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#94a3b8' }}>PRODUCT · AI</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
            <span style={{ width: 56, height: 56, borderRadius: 14, background: t.hex, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800 }}>S</span>
            <div>
              <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>Sage</h1>
              <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>AI 数据分析平台 · 多智能体 NL→SQL · 12 主题色个性化</p>
            </div>
          </div>
        </div>

        {/* theme picker */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {THEMES.map((th, i) => (
            <button key={th.name} onClick={() => setThemeIdx(i)} style={{ width: 24, height: 24, borderRadius: '50%', background: th.hex, border: themeIdx === i ? '2px solid #0f172a' : '2px solid transparent', cursor: 'pointer' }} />
          ))}
        </div>

        {/* Capabilities */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
          <Cap icon="📊" title="多智能体 NL→SQL" hex={t.hex} />
          <Cap icon="🗂" title="多空间多用户" hex={t.hex} />
          <Cap icon="💾" title="12 数据库" hex={t.hex} />
          <Cap icon="🛡" title="行/列规则集" hex={t.hex} />
        </div>

        {/* Composition stats */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12 }}>沉淀组成（Tier 3 · 38 条）</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 12 }}>
            {[
              { label: 'Tokens', n: 5 },
              { label: 'Components', n: 8 },
              { label: 'Blocks', n: 13 },
              { label: 'Pages', n: 10 },
              { label: 'Style', n: 1 },
              { label: 'Product', n: 1 },
            ].map(s => (
              <div key={s.label} style={{ background: '#f8fafc', borderRadius: 8, padding: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: t.hex }}>{s.n}</div>
                <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Two pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Pillar
            hex={t.hex}
            title="严肃面"
            text="chat / 仪表盘 / 表 / 表单 走极简 — 白底 + slate + 9 阶手调灰阶 + 1px 分割。视觉决策让位于信息密度和主题色个性化。"
          />
          <Pillar
            hex={t.hex}
            title="彩蛋面"
            text="RevolverMenu (雪人飘雪 FAB) + NotFound (复古 CRT 电视) — sage 的性格出口，告诉用户「我们写代码的人有体温」。"
            playful
          />
        </div>
      </div>
    </PreviewFrame>
  );
}

function Cap({ icon, title, hex }: { icon: string; title: string; hex: string }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 14, textAlign: 'center' }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: `${hex}1A`, color: hex, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 12, fontWeight: 500, color: '#1e293b' }}>{title}</div>
    </div>
  );
}

function Pillar({ hex, title, text, playful }: { hex: string; title: string; text: string; playful?: boolean }) {
  return (
    <div
      style={{
        background: playful ? `linear-gradient(135deg, ${hex}1A, ${hex}05)` : '#fff',
        border: `1px solid ${playful ? `${hex}40` : '#e2e8f0'}`,
        borderRadius: 14,
        padding: 18,
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>{title}</div>
      <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.6, margin: 0 }}>{text}</p>
    </div>
  );
}
