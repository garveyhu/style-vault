import { PreviewFrame } from '../../_layout';

type ColorCard = { name: string; hex: string; note?: string };

const PALETTE: ColorCard[] = [
  { name: 'bg-page', hex: '#f5f7fa' },
  { name: 'bg-base', hex: '#ffffff' },
  { name: 'primary-500', hex: '#14b8a6', note: 'brand' },
  { name: 'cta-dark', hex: '#1a1a1a', note: 'nav / login' },
  { name: 'fg-base', hex: '#111827' },
  { name: 'fg-muted', hex: '#6b7280' },
];

export default function SkillhubSoftModernistPreview() {
  return (
    <PreviewFrame bg="#f5f7fa" padded={false}>
      <style>{`@keyframes sv-ssm-flow { from { background-position: 300% 50%; } to { background-position: 0% 50%; } }`}</style>
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#111827', padding: 40, maxWidth: 1200, margin: '0 auto' }}>

        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#9ca3af' }}>STYLE · COMMUNITY-SOCIAL</div>
        <h1 style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '8px 0 40px' }}>
          SkillHub <span style={{
            backgroundImage: 'linear-gradient(90deg, #14b8a6, #06b6d4, #0ea5e9, #f472b6, #14b8a6, #06b6d4, #0ea5e9, #f472b6, #14b8a6)',
            backgroundSize: '300% 100%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            animation: 'sv-ssm-flow 14s linear infinite',
          }}>Soft Modernist</span>
        </h1>

        <p style={{ fontSize: 18, color: '#6b7280', marginTop: 0, marginBottom: 40, maxWidth: 720, lineHeight: 1.7 }}>
          浅色 + teal 主色 + 玻璃 pill 导航 + 彩虹流光 + 12 色柔和头像 + framer-motion 微动——
          社区气质与工具气质并存。
        </p>

        {/* 色板 */}
        <section style={{ marginBottom: 40 }}>
          <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#6b7280', marginBottom: 16 }}>Palette</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {PALETTE.map((c) => (
              <div key={c.name} style={{ width: 152 }}>
                <div style={{ height: 64, background: c.hex, borderRadius: 12, border: '1px solid rgba(0,0,0,0.06)' }} />
                <div style={{ fontSize: 13, fontWeight: 700, marginTop: 8 }}>{c.name}</div>
                <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: '#9ca3af' }}>{c.hex}</div>
                {c.note && <div style={{ fontSize: 11, color: '#14b8a6', marginTop: 2 }}>{c.note}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* 字体 */}
        <section style={{ marginBottom: 40 }}>
          <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#6b7280', marginBottom: 16 }}>Typography</h3>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2 }}>Inter · 核心字</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#6b7280', marginTop: 8, lineHeight: 1.7 }}>
              Inter 正文、JetBrains Mono 代码。开启 cv02 / cv03 / cv04 / cv11 字形特性。
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#3730a3', background: '#f3f4f6', padding: '6px 12px', borderRadius: 6, display: 'inline-block', marginTop: 12 }}>
              const font = 'JetBrains Mono';
            </div>
          </div>
        </section>

        {/* Radius / Shadow */}
        <section style={{ marginBottom: 40 }}>
          <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#6b7280', marginBottom: 16 }}>Radius / Shadow</h3>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ width: 200, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>rounded-xl · ambient</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>Input</div>
            </div>
            <div style={{ width: 200, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>rounded-2xl · static</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>Card (default)</div>
            </div>
            <div style={{ width: 200, background: '#fff', border: '1px solid #99f6e4', borderRadius: 16, padding: 24, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', transform: 'translateY(-4px)' }}>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>rounded-2xl · hover</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>Card (hover)</div>
            </div>
            <div style={{ padding: '10px 24px', background: '#14b8a6', color: '#fff', borderRadius: 12, fontSize: 14, fontWeight: 600, alignSelf: 'center' }}>
              Teal CTA
            </div>
            <div style={{ padding: '10px 24px', background: '#1a1a1a', color: '#fff', borderRadius: 12, fontSize: 14, fontWeight: 600, alignSelf: 'center' }}>
              Dark CTA
            </div>
          </div>
        </section>

        {/* Signature moment */}
        <section>
          <h3 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#6b7280', marginBottom: 16 }}>Signature moments</h3>
          <ul style={{ fontSize: 14, color: '#374151', lineHeight: 1.9, paddingLeft: 20 }}>
            <li>Hero 强调词 4 色流光 14s 循环</li>
            <li>"发布 Skill" 追光黑按钮（cyan + purple 双环绕）</li>
            <li>Navbar 玻璃层 + 内嵌白色 2xl pill</li>
            <li>12 色头像轮盘 · Top3 红黄蓝</li>
            <li>hover y:-4 浮起 · tap scale:0.95 回弹</li>
            <li>无边框 admin 表格 · 中文分页 locale</li>
          </ul>
        </section>
      </div>
    </PreviewFrame>
  );
}
