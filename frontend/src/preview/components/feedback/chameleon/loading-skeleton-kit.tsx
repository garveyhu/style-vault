import { PreviewFrame } from '../../../_layout';
import { ImageIcon, Loader2 } from 'lucide-react';

const SHIMMER: React.CSSProperties = {
  background: 'linear-gradient(90deg, #ebe9e3 0%, #f5f4ee 50%, #ebe9e3 100%)',
  backgroundSize: '400px 100%',
  animation: 'sk-shimmer 1.6s ease-in-out infinite',
};

function Skeleton({ width, height, radius = 6 }: { width?: number | string; height?: number | string; radius?: number }) {
  return <div style={{ ...SHIMMER, width, height, borderRadius: radius }} />;
}

function SkeletonText({ lines = 3, lineHeight = 10, gap = 8, lastLineWidth = 0.6 }: { lines?: number; lineHeight?: number; gap?: number; lastLineWidth?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} height={lineHeight} width={i === lines - 1 ? `${lastLineWidth * 100}%` : '100%'} radius={9999} />
      ))}
    </div>
  );
}

function SkeletonCard({ avatar = false, lines = 3 }: { avatar?: boolean; lines?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, borderRadius: 8, border: '1px solid rgba(231,229,228,0.6)', background: '#fffefb', padding: 16 }}>
      {avatar && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Skeleton width={36} height={36} radius={9999} />
          <div style={{ flex: 1 }}>
            <Skeleton height={10} width="40%" radius={9999} />
          </div>
        </div>
      )}
      <SkeletonText lines={lines} />
    </div>
  );
}

function ImageGenLoading({ hint }: { hint?: string }) {
  return (
    <div
      style={{
        ...SHIMMER,
        position: 'relative',
        display: 'flex',
        aspectRatio: '4 / 3',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        borderRadius: 12,
        border: '1px solid #e7e5e4',
      }}
    >
      <div style={{ position: 'relative' }}>
        <ImageIcon size={36} style={{ color: '#d6d3d1' }} strokeWidth={2} />
        <span
          style={{
            position: 'absolute',
            right: -8,
            bottom: -8,
            display: 'flex',
            height: 20,
            width: 20,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 9999,
            background: '#fff',
            boxShadow: '0 1px 2px 0 rgb(0 0 0 / 5%)',
          }}
        >
          <Loader2 size={14} style={{ color: '#8b5cf6', animation: 'sk-spin 1s linear infinite' }} strokeWidth={2} />
        </span>
      </div>
      <div style={{ fontSize: 13, fontWeight: 500, color: '#57534e' }}>正在生成图片</div>
      <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12, fontVariantNumeric: 'tabular-nums', color: '#a8a29e' }}>0:18</div>
      {hint && (
        <div style={{ maxWidth: '80%', textAlign: 'center', fontSize: 11, lineHeight: 1.375, color: '#a8a29e' }}>{hint}</div>
      )}
    </div>
  );
}

export default function LoadingSkeletonKit() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 760, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · FEEDBACK</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>占位骨架套件 + 生图等待态</h1>

        <Section title="Skeleton — 5 档圆角">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Skeleton width={48} height={48} radius={0} />
            <Skeleton width={48} height={48} radius={2} />
            <Skeleton width={48} height={48} radius={6} />
            <Skeleton width={48} height={48} radius={8} />
            <Skeleton width={48} height={48} radius={9999} />
          </div>
        </Section>

        <Section title="SkeletonText — 多行 + 末行 60% 短宽">
          <div style={{ width: 320 }}>
            <SkeletonText lines={3} />
          </div>
        </Section>

        <Section title="SkeletonCard — avatar + lines">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: '100%' }}>
            <SkeletonCard avatar lines={2} />
            <SkeletonCard lines={3} />
          </div>
        </Section>

        <Section title="ImageGenLoading — 文生图等待态">
          <div style={{ width: 280 }}>
            <ImageGenLoading hint="首次含模型加载可能数分钟" />
          </div>
        </Section>
      </div>
      <style>{`
        @keyframes sk-shimmer { 0% { background-position: -200px 0 } 100% { background-position: 200px 0 } }
        @keyframes sk-spin { to { transform: rotate(360deg) } }
      `}</style>
    </PreviewFrame>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>{title}</div>
      {children}
    </div>
  );
}
