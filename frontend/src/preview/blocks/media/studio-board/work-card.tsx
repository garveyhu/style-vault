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

const GRID_LINE = 'rgba(42,38,32,0.04)';

interface Work {
  hook: string;
  title: string;
  meta: string;
  grad: string;
  hookColor: string;
  published: boolean;
  preview?: boolean;
}

const WORKS: Work[] = [
  {
    hook: '囤工具 ≠ 飞轮',
    title: '只囤工具不成飞轮：AI 工作流为什么越搭越乱',
    meta: '18.6万 播放 · 7-04 20:00',
    grad: 'linear-gradient(135deg,#e2d6bd,#c2a878)',
    hookColor: '#2a2620',
    published: true,
  },
  {
    hook: '7M 掀翻大模型',
    title: '7M 参数小模型反超前沿大模型：推理一定要靠规模吗',
    meta: '22.3万 播放 · 7-06 20:00',
    grad: 'linear-gradient(135deg,#c9b48f,#8f7550)',
    hookColor: '#fffdfa',
    published: true,
    preview: true,
  },
  {
    hook: '一张卡，打平几百万',
    title: '一张消费级显卡，如何打平几百万的训练集群',
    meta: '9.7万 播放 · 7-05 20:00',
    grad: 'linear-gradient(135deg,#dccdb1,#b89a6f)',
    hookColor: '#2a2620',
    published: true,
  },
  {
    hook: '会做题 ≠ 会推理',
    title: '会做题 ≠ 会推理：基准分数掩盖了什么',
    meta: '未发布 · 草稿',
    grad: 'linear-gradient(135deg,#bfb9ad,#8a8175)',
    hookColor: '#fffdfa',
    published: false,
  },
];

function Eye() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" stroke={SUCCESS} strokeWidth={2} />
      <circle cx={12} cy={12} r={2.6} stroke={SUCCESS} strokeWidth={2} />
    </svg>
  );
}

function Card({ w }: { w: Work }) {
  return (
    <div style={{ width: 300 }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: 12,
          overflow: 'hidden',
          background: w.grad,
          boxShadow: SHADOW_MD,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontFamily: DISPLAY,
            fontWeight: 900,
            fontSize: 26,
            color: w.hookColor,
            letterSpacing: '-0.01em',
            textAlign: 'center',
            padding: '0 18px',
            textShadow:
              w.hookColor === '#fffdfa'
                ? '0 1px 10px rgba(42,38,32,0.28)'
                : '0 1px 0 rgba(255,255,255,0.26)',
          }}
        >
          {w.hook}
        </div>

        <div
          style={{
            position: 'absolute',
            right: 8,
            top: 8,
            width: 10,
            height: 10,
            borderRadius: 999,
            background: w.published ? SUCCESS : '#8a8f98',
            boxShadow: '0 0 0 2px rgba(255,255,255,0.7)',
          }}
        />

        {w.preview && (
          <div
            style={{
              position: 'absolute',
              left: 8,
              top: 8,
              background: 'rgba(42,38,32,0.85)',
              color: '#fff',
              borderRadius: 999,
              padding: '6px 12px',
              fontSize: 11,
              fontWeight: 800,
              backdropFilter: 'blur(4px)',
              boxShadow: '0 3px 12px rgba(0,0,0,0.28)',
              display: 'inline-flex',
              gap: 6,
              alignItems: 'center',
            }}
          >
            <Eye />
            预览
          </div>
        )}
      </div>

      <div
        style={{
          fontFamily: DISPLAY,
          fontWeight: 700,
          fontSize: 13,
          lineHeight: 1.35,
          color: INK,
          marginTop: 12,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {w.title}
      </div>
      <div style={{ fontSize: 11, color: MUTED, marginTop: 6 }}>{w.meta}</div>
    </div>
  );
}

export default function WorkCard() {
  return (
    <PreviewFrame bg={CREAM} padded={false}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: CREAM,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(${GRID_LINE} 1px, transparent 1px), linear-gradient(90deg, ${GRID_LINE} 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 28, alignItems: 'flex-start' }}>
          {WORKS.map(w => (
            <Card key={w.hook} w={w} />
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}
