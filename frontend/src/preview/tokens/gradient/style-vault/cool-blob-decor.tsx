import { PreviewFrame } from '../../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";

const KEYFRAMES = `
@keyframes svblob-drift {
  0%,100% { transform: translate3d(0,0,0) scale(1); }
  50%     { transform: translate3d(20px,-30px,0) scale(1.08); }
}
@keyframes svblob-drift-slow {
  0%,100% { transform: translate3d(0,0,0) scale(1); }
  50%     { transform: translate3d(-30px,20px,0) scale(1.12); }
}
`;

export default function CoolBlobDecorPreview() {
  return (
    <PreviewFrame bg="#fafafa" padded={false}>
      <style>{KEYFRAMES}</style>
      <div style={{ fontFamily: SANS }}>
        {/* live demo · 真实尺寸 + 动画跑起来 */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: '#fff',
            borderBottom: '1px solid #f1f5f9',
            height: 480,
          }}
        >
          {/* cyan blob */}
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
              animation: 'svblob-drift 14s ease-in-out infinite',
            }}
          />
          {/* slate blob */}
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
              animation: 'svblob-drift-slow 18s ease-in-out infinite',
            }}
          />
          {/* content */}
          <div
            style={{
              position: 'relative',
              padding: '80px 56px',
              textAlign: 'center',
              color: '#0f172a',
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#94a3b8',
                marginBottom: 12,
              }}
            >
              Live Demo · 实际跑动效
            </div>
            <div
              style={{
                fontSize: 56,
                fontWeight: 600,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
              }}
            >
              漂浮的冷光
            </div>
            <div
              style={{
                marginTop: 18,
                fontSize: 15,
                color: '#64748b',
                maxWidth: 520,
                margin: '18px auto 0',
                lineHeight: 1.7,
              }}
            >
              520 + 440 双 blob · cyan / slate 异色 · 14s + 18s 异步 keyframe
              · blur-3xl 高斯模糊 · 永不同步
            </div>
          </div>
        </div>

        {/* spec table */}
        <div style={{ padding: '32px 48px', color: '#0f172a' }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#94a3b8',
              marginBottom: 14,
            }}
          >
            Spec
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 20,
            }}
          >
            {[
              {
                title: 'cyan-lead',
                size: '520 × 520',
                color: 'rgba(207,250,254,0.5)',
                anchor: 'left −160 / top −160',
                duration: '14s',
              },
              {
                title: 'slate-trail',
                size: '440 × 440',
                color: 'rgba(226,232,240,0.55)',
                anchor: 'right −160 / top 80',
                duration: '18s',
              },
            ].map((b) => (
              <div
                key={b.title}
                style={{
                  borderRadius: 12,
                  border: '1px solid #e2e8f0',
                  background: '#fff',
                  padding: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 12,
                  }}
                >
                  {b.title}
                </div>
                <Row k="size" v={b.size} />
                <Row k="fill" v={b.color} mono />
                <Row k="anchor" v={b.anchor} mono />
                <Row k="blur" v="64px" />
                <Row k="duration" v={b.duration} />
                <Row k="easing" v="ease-in-out infinite" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        fontSize: 12,
        padding: '4px 0',
        borderBottom: '1px dashed #f1f5f9',
      }}
    >
      <span style={{ color: '#94a3b8', width: 80 }}>{k}</span>
      <span
        style={{
          color: '#0f172a',
          fontFamily: mono
            ? "ui-monospace, 'SF Mono', Menlo, monospace"
            : undefined,
        }}
      >
        {v}
      </span>
    </div>
  );
}
