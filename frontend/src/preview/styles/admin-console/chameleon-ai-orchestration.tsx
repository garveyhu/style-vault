import { PreviewFrame } from '../../_layout';
import { Sparkles, Workflow, GitBranch } from 'lucide-react';

const PRIMARY = [
  { n: '50', c: '#eff6ff' }, { n: '100', c: '#dbeafe' }, { n: '500', c: '#3b82f6' },
  { n: '600', c: '#2563eb' }, { n: '700', c: '#1d4ed8' },
];
const NEUTRAL = [
  { n: 'paper', c: '#fffefb' }, { n: 'warm', c: '#fafaf7' }, { n: 'warm-2', c: '#f4f3ee' },
  { n: 'stone-300', c: '#d6d3d1' }, { n: 'ink', c: '#1c1917' },
];
const SEMANTIC = [
  { n: 'success', c: '#10b981' }, { n: 'warning', c: '#f59e0b' },
  { n: 'danger', c: '#ef4444' }, { n: 'info', c: '#06b6d4' },
];
const NODE_HUES = [
  { n: 'LLM', c: '#3b82f6' }, { n: '检索', c: '#10b981' }, { n: '工具', c: '#f59e0b' },
  { n: '逻辑', c: '#8b5cf6' }, { n: '生成', c: '#ec4899' }, { n: '变量', c: '#06b6d4' },
];

function Swatch({ n, c, dark }: { n: string; c: string; dark?: boolean }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ width: 56, height: 40, borderRadius: 8, background: c, border: '1px solid rgb(0 0 0/8%)' }} />
      <div style={{ fontSize: 10, color: dark ? '#a8a29e' : '#78716c', marginTop: 4, fontFamily: 'JetBrains Mono, monospace' }}>{n}</div>
    </div>
  );
}

export default function ChameleonAiOrchestration() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 880, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>STYLE · ADMIN-CONSOLE</div>
        <h1 style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 4px' }}>Chameleon · 暖白工程师 AI 编排台</h1>
        <p style={{ fontSize: 13.5, color: '#57534e', margin: '0 0 28px', lineHeight: 1.6 }}>
          waveflow 暖纸墨蓝工程师语言 + 霓虹 AI 强调 + 可切换主题 + 画布节点配色
        </p>

        <Section title="primary · blue-600 单一 CTA">{PRIMARY.map(s => <Swatch key={s.n} {...s} />)}</Section>
        <Section title="暖白基底 paper / warm / ink">{NEUTRAL.map(s => <Swatch key={s.n} {...s} />)}</Section>
        <Section title="语义色（仅状态用）">{SEMANTIC.map(s => <Swatch key={s.n} {...s} />)}</Section>
        <Section title="工作流节点色温（hue 微染）">{NODE_HUES.map(s => <Swatch key={s.n} {...s} />)}</Section>

        <Section title="字体">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 22, fontWeight: 600 }}>Inter — 正文 / UI · 工程师暖白控制台</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14 }}>JetBrains Mono — req_8f2a1c · 00:01:284ms · $0.0042</div>
            <div style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontSize: 24, color: '#44403c' }}>Instrument Serif — editorial 出口</div>
          </div>
        </Section>

        <Section title="signature · NeonLoader（长耗时 AI 任务）">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderRadius: 12, background: 'rgba(139,92,246,0.05)', boxShadow: '0 0 0 1px rgba(139,92,246,0.22), 0 0 16px rgba(139,92,246,0.14)' }}>
            <div style={{
              width: 22, height: 22, borderRadius: 9999,
              background: 'conic-gradient(from 90deg, transparent 0%, #8b5cf6 35%, #d946ef 55%, #22d3ee 75%, transparent 100%)',
              WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 0)',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 0)',
              filter: 'drop-shadow(0 0 3px rgba(139,92,246,0.85)) drop-shadow(0 0 7px rgba(34,211,238,0.5))',
              animation: 'chm-neon-spin 0.85s linear infinite',
            }} />
            <span style={{
              fontSize: 14, fontWeight: 500,
              background: 'linear-gradient(90deg, #7c3aed, #d946ef, #22d3ee, #7c3aed)', backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
              animation: 'chm-neon-shimmer 2.6s linear infinite',
            }}>正在评测 24 个样本…</span>
          </div>
          <style>{`@keyframes chm-neon-spin{to{transform:rotate(360deg)}}@keyframes chm-neon-shimmer{to{background-position:200% center}}`}</style>
        </Section>

        <Section title="signature 单元">
          <Chip icon={<Workflow size={14} />} label="xyflow 画布编辑器" />
          <Chip icon={<GitBranch size={14} />} label="节点微染 + 贝塞尔连线" />
          <Chip icon={<Sparkles size={14} />} label="霓虹 AI 流" />
        </Section>
      </div>
    </PreviewFrame>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>{title}</div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>{children}</div>
    </div>
  );
}

function Chip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 30, padding: '0 12px', borderRadius: 8, background: '#fffefb', border: '1px solid #e7e5e0', fontSize: 12.5, color: '#44403c', boxShadow: '0 1px 2px rgb(0 0 0/4%)' }}>
      <span style={{ color: '#2563eb' }}>{icon}</span>{label}
    </span>
  );
}
