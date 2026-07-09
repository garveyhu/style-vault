import { PreviewFrame } from '../../../_layout';

const SAND = '#f0eeea', CREAM = '#f6f2e8', SURFACE = '#fffdfa', ELEV = '#ffffff';
const INK = '#2a2620', MUTED = '#8f8676', MUTED_STRONG = '#4a4438';
const BORDER = 'rgba(42,38,32,0.11)', BORDER_STRONG = 'rgba(42,38,32,0.22)';
const SUCCESS = '#5b8c5a', WARNING = '#c8891f', RISK = '#c25a3a', FOCUS = '#2a2620';
const GLASS = 'rgba(255,253,248,0.74)', GLASS_BRD = 'rgba(255,255,255,0.82)', LEAK = 'rgba(255,255,255,0.95)';
const SHADOW_MD = '0 18px 36px -24px rgba(74,54,20,0.12), 0 2px 8px -6px rgba(74,54,20,0.05)';
const SHADOW_LG = '0 30px 60px -30px rgba(74,54,20,0.16), 0 6px 16px -10px rgba(74,54,20,0.07)';
const GLASS_INSET = 'inset 0 1px 0 rgba(255,255,255,0.7)';
const DISPLAY = "'Space Grotesk','IBM Plex Sans','PingFang SC',sans-serif";
const MONO = "'JetBrains Mono',ui-monospace,monospace";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function Check() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12.6l4.4 4.4L19 7"
        stroke="#fff"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StepRow({ name }: { name: string }) {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0' }}>
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: 28,
          height: 28,
          borderRadius: 999,
          background: SUCCESS,
          boxShadow: '0 4px 12px -4px rgba(91,140,90,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Check />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: DISPLAY, fontSize: 14, color: INK, lineHeight: 1.2 }}>{name}</div>
        <div style={{ fontFamily: MONO, fontSize: 10, color: MUTED, marginTop: 2 }}>已完成</div>
      </div>
    </div>
  );
}

function GroupLabel({ text }: { text: string }) {
  return (
    <div
      style={{
        fontFamily: MONO,
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
        color: MUTED,
        opacity: 0.6,
        margin: '16px 0 6px',
      }}
    >
      {text}
    </div>
  );
}

function Rail({ names }: { names: string[] }) {
  return (
    <div style={{ position: 'relative', paddingLeft: 6 }}>
      <div style={{ position: 'absolute', left: 19, top: 23, bottom: 23, width: 2, background: BORDER, zIndex: 0 }} />
      {names.map(n => (
        <StepRow key={n} name={n} />
      ))}
    </div>
  );
}

function PublishRow() {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 12px 10px 4px',
        marginTop: 2,
        borderRadius: 12,
        background: 'linear-gradient(90deg, rgba(42,38,32,0.07), transparent 72%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 3,
          height: 20,
          borderRadius: 999,
          background: FOCUS,
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: 32,
          height: 32,
          borderRadius: 999,
          background: FOCUS,
          color: '#fff',
          fontFamily: MONO,
          fontSize: 11,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 5px 16px -4px rgba(42,38,32,0.5), 0 0 0 4px rgba(42,38,32,0.1)',
        }}
      >
        9
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: DISPLAY, fontSize: 14, color: INK, lineHeight: 1.2 }}>发布</div>
        <div style={{ fontFamily: MONO, fontSize: 10, color: MUTED, marginTop: 2 }}>已完成</div>
      </div>
    </div>
  );
}

export default function PipelineRail() {
  return (
    <PreviewFrame bg={SAND} padded={false}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: `radial-gradient(120% 90% at 50% 40%, ${CREAM}, ${SAND} 62%)`,
        }}
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06, mixBlendMode: 'overlay', backgroundImage: GRAIN }} />
        <div
          style={{
            position: 'absolute',
            width: 620,
            height: 620,
            borderRadius: 999,
            background: 'radial-gradient(circle, rgba(255,253,248,0.55), transparent 62%)',
            filter: 'blur(8px)',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: 340,
            padding: 18,
            background: GLASS,
            backdropFilter: 'blur(30px) saturate(140%)',
            border: '1px solid ' + GLASS_BRD,
            boxShadow: SHADOW_LG + ', ' + GLASS_INSET,
            borderRadius: 16,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '8%',
              right: '8%',
              height: 1,
              background: 'linear-gradient(90deg,transparent,' + LEAK + ',transparent)',
            }}
          />

          {/* 头 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontFamily: DISPLAY, fontSize: 15, fontWeight: 600, color: INK }}>生产管线</span>
            <span
              style={{
                border: '1px solid rgba(91,140,90,0.3)',
                background: 'rgba(91,140,90,0.1)',
                color: SUCCESS,
                borderRadius: 999,
                padding: '2px 8px',
                fontFamily: MONO,
                fontSize: 11,
              }}
            >
              9 / 9
            </span>
          </div>

          <GroupLabel text="创意 · 需你定稿" />
          <Rail names={['选题', '脚本', '分镜']} />

          <GroupLabel text="制作 · 自动执行" />
          <Rail names={['素材', '配音', '字幕', '剪辑', '封面']} />
          <PublishRow />
        </div>
      </div>
    </PreviewFrame>
  );
}
