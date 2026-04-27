import { PreviewFrame } from '../../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";

const KEYFRAMES = `
@keyframes svhero-blob {
  0%,100% { transform: translate3d(0,0,0) scale(1); }
  50%     { transform: translate3d(20px,-30px,0) scale(1.08); }
}
@keyframes svhero-blob-slow {
  0%,100% { transform: translate3d(0,0,0) scale(1); }
  50%     { transform: translate3d(-30px,20px,0) scale(1.12); }
}
@keyframes svhero-fade-up {
  from { opacity: 0; transform: translate3d(0,16px,0); }
  to   { opacity: 1; transform: translate3d(0,0,0); }
}
`;

export default function CoolBlobHeroPreview() {
  return (
    <PreviewFrame bg="#fff" padded={false}>
      <style>{KEYFRAMES}</style>
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: '#fff',
          borderBottom: '1px solid #f1f5f9',
          minHeight: 720,
          fontFamily: SANS,
          color: '#0f172a',
        }}
      >
        {/* blobs */}
        <div
          style={{
            position: 'absolute',
            left: -160,
            top: -160,
            width: 520,
            height: 520,
            borderRadius: '50%',
            background: 'rgba(207,250,254,0.5)',
            filter: 'blur(64px)',
            pointerEvents: 'none',
            animation: 'svhero-blob 14s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: -160,
            top: 80,
            width: 440,
            height: 440,
            borderRadius: '50%',
            background: 'rgba(226,232,240,0.55)',
            filter: 'blur(64px)',
            pointerEvents: 'none',
            animation: 'svhero-blob-slow 18s ease-in-out infinite',
          }}
        />

        {/* content */}
        <div
          style={{
            position: 'relative',
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 720,
            padding: '96px 32px',
            textAlign: 'center',
          }}
        >
          {/* kicker */}
          <div
            style={{
              opacity: 0,
              animation: 'svhero-fade-up 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) 0ms forwards',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 12px',
              borderRadius: 9999,
              border: '1px solid #e2e8f0',
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(4px)',
              fontSize: 11,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: '#64748b',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#06b6d4',
              }}
            />
            Style Vault · 风格库
          </div>

          {/* headline */}
          <h1
            style={{
              opacity: 0,
              animation:
                'svhero-fade-up 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) 150ms forwards',
              maxWidth: 1000,
              marginTop: 32,
              marginBottom: 0,
              fontSize: 88,
              lineHeight: 1.08,
              fontWeight: 600,
              letterSpacing: '-0.03em',
              fontFeatureSettings: '"cv02","cv03","cv04","cv11","ss01"',
              color: '#0f172a',
            }}
          >
            为 AI 编码而造的
            <br />
            <span
              style={{
                backgroundImage:
                  'linear-gradient(to bottom right, #0891b2, #1e293b, #0f172a)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              设计风格库
            </span>
          </h1>

          {/* body */}
          <p
            style={{
              opacity: 0,
              animation:
                'svhero-fade-up 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) 300ms forwards',
              maxWidth: 560,
              margin: '32px auto 0',
              fontSize: 17,
              lineHeight: 1.8,
              color: '#64748b',
            }}
          >
            六个层级，六道清晰边界。
            <br />
            复刻一种成熟的视觉风格，只需把一段 Prompt 贴给 AI。
          </p>

          {/* CTA */}
          <div
            style={{
              opacity: 0,
              animation:
                'svhero-fade-up 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) 500ms forwards',
              marginTop: 48,
            }}
          >
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                height: 56,
                padding: '0 36px',
                borderRadius: 9999,
                background: '#0f172a',
                color: '#fff',
                fontFamily: SANS,
                fontSize: 15,
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 20px 48px -20px rgba(15,23,42,0.6)',
                transition:
                  'background-color 200ms cubic-bezier(0.2, 0.7, 0.2, 1)',
              }}
            >
              进入风格库 →
            </button>
          </div>
        </div>
      </section>
    </PreviewFrame>
  );
}
