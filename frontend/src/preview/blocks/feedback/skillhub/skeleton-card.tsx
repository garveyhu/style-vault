import { PreviewFrame } from '../../../_layout';

export default function SkeletonCardPreview() {
  return (
    <PreviewFrame bg="#f5f7fa">
      <style>{`
        @keyframes sv-skeleton-pulse { 50% { opacity: 0.5; } }
      `}</style>
      <div style={{ maxWidth: 1080, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color: '#9ca3af' }}>BLOCK · FEEDBACK</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.01em', margin: '8px 0 8px' }}>Skeleton Card</h1>
        <p style={{ color: '#6b7280', fontSize: 13, margin: '0 0 24px' }}>
          同 skill-card 尺寸 + border + rounded-2xl · animate-pulse 占位
        </p>

        <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#6b7280', marginBottom: 12 }}>
            极简骨架（推荐 · 6 个网格）
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                style={{
                  height: 192, background: '#fff',
                  border: '1px solid #f3f4f6', borderRadius: 16,
                  animation: 'sv-skeleton-pulse 2s ease-in-out infinite',
                }}
              />
            ))}
          </div>
        </section>

        <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 24 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: '#6b7280', marginBottom: 12 }}>
            内含占位线条的变体（只在大块加载场景用）
          </div>
          <div style={{
            background: '#fff', border: '1px solid #f3f4f6', borderRadius: 16,
            padding: 20, animation: 'sv-skeleton-pulse 2s ease-in-out infinite',
          }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 999, background: '#f3f4f6' }} />
              <div style={{ flex: 1, paddingTop: 4 }}>
                <div style={{ height: 12, width: 128, borderRadius: 4, background: '#f3f4f6', marginBottom: 8 }} />
                <div style={{ height: 10, width: 64, borderRadius: 4, background: '#f3f4f6' }} />
              </div>
            </div>
            <div style={{ height: 12, width: '100%', borderRadius: 4, background: '#f3f4f6', marginBottom: 8 }} />
            <div style={{ height: 12, width: '80%', borderRadius: 4, background: '#f3f4f6' }} />
          </div>
        </section>
      </div>
    </PreviewFrame>
  );
}
