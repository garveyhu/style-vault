import { Heart, LogIn, Send, Sparkles, Upload } from 'lucide-react';
import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

type Variant = 'pure' | 'slate';
const variantBg = { pure: '#1a1a1a', slate: '#0f172a' };
const variantHover = { pure: '#333333', slate: '#1e293b' };

function Cta({
  label, size = 'md', variant = 'pure', icon, shimmer,
}: {
  label: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: Variant;
  icon?: React.ReactNode;
  shimmer?: boolean;
}) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const pad =
    size === 'sm' ? '6px 16px' : size === 'lg' ? '12px 32px' : '10px 20px';
  const fontSize = size === 'lg' ? 14 : 14;
  const fontWeight = size === 'lg' ? 700 : 500;
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        position: 'relative',
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: pad, color: '#fff',
        fontSize, fontWeight, lineHeight: 1,
        borderRadius: 12, border: 'none', cursor: 'pointer',
        background: hover ? variantHover[variant] : variantBg[variant],
        transform: `scale(${active ? 0.95 : 1})`,
        transition: 'all 200ms ease-out',
        overflow: 'hidden',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {shimmer && (
        <span style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          transform: hover ? 'translateX(200%)' : 'translateX(-200%)',
          transition: 'transform 700ms ease-in-out',
        }} />
      )}
      <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        {icon}
        {label}
      </span>
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{
      background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 24, marginBottom: 16,
    }}>
      <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#6b7280', marginBottom: 12 }}>
        {title}
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        {children}
      </div>
    </section>
  );
}

export default function DarkPrimaryCtaPreview() {
  return (
    <PreviewFrame bg="#f5f7fa">
      <div style={{ maxWidth: 920, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#9ca3af' }}>COMPONENT · BUTTON</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.01em', margin: '8px 0 8px' }}>
          Dark Primary CTA
        </h1>
        <p style={{ color: '#6b7280', fontSize: 13, margin: '0 0 24px' }}>
          全站统一的黑底 CTA · 跨 9 个文件 19 处使用
        </p>

        <Section title="Size · sm / md / lg">
          <Cta label="登录" size="sm" icon={<LogIn size={13} />} />
          <Cta label="发布实践" size="md" icon={<Send size={14} />} />
          <Cta label="立即发布" size="lg" icon={<Sparkles size={15} />} />
        </Section>

        <Section title="Variant · pure (#1a1a1a) / slate (slate-900)">
          <Cta label="pure 主选" variant="pure" />
          <Cta label="slate · antd 配合" variant="slate" />
        </Section>

        <Section title="带扫光 shimmer 变体">
          <Cta label="发布实践（hover 扫光）" size="md" icon={<Sparkles size={13} />} shimmer />
        </Section>

        <Section title="配 Ghost 次按钮">
          <Cta label="关注" size="md" icon={<Heart size={14} />} />
          <button style={{
            padding: '10px 20px', border: '1px solid #d1d5db', background: 'transparent',
            borderRadius: 12, fontSize: 14, fontWeight: 500, color: '#374151', cursor: 'pointer',
            fontFamily: 'inherit',
          }}>
            已关注
          </button>
        </Section>

        <Section title="场景示例 · 登录表单尾按钮">
          <Cta label="登录" size="lg" />
          <Cta label="创建账号" size="lg" variant="slate" />
          <Cta label="上传文件" size="md" icon={<Upload size={14} />} />
        </Section>
      </div>
    </PreviewFrame>
  );
}
