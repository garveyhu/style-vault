import { PreviewFrame } from '../_layout';

const INK = '#1A1A1A';
const PAPER = '#FFF8EC';
const YELLOW = '#FFD12E';
const BLUE = '#2B5BE8';
const RED = '#FF4D4D';
const MINT = '#16C79A';
const EAR = '#FF8FA3';
const DISPLAY = '"Noto Sans SC","PingFang SC",sans-serif';
const MONO = '"JetBrains Mono",ui-monospace,monospace';

/** emo 黑猫 IP —— inline SVG（薄荷青眼 + 粉内耳） */
function EmoCat({ size = 240 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-label="emo 黑猫">
      <ellipse cx="60" cy="108" rx="30" ry="6" fill="rgba(26,26,26,.15)" />
      <path d="M30 44 L26 14 L52 34 Z" fill={INK} />
      <path d="M90 44 L94 14 L68 34 Z" fill={INK} />
      <path d="M34 38 L32 22 L45 33 Z" fill={EAR} />
      <path d="M86 38 L88 22 L75 33 Z" fill={EAR} />
      <circle cx="60" cy="58" r="34" fill={INK} />
      <path d="M40 84 Q60 96 80 84 L80 104 Q60 110 40 104 Z" fill={INK} />
      <path d="M86 92 Q104 90 100 104" stroke={INK} strokeWidth="7" fill="none" strokeLinecap="round" />
      <ellipse cx="49" cy="58" rx="8" ry="10" fill={MINT} />
      <ellipse cx="71" cy="58" rx="8" ry="10" fill={MINT} />
      <circle cx="49" cy="60" r="3.2" fill={INK} />
      <circle cx="71" cy="60" r="3.2" fill={INK} />
      <path d="M57 70 L63 70 L60 74 Z" fill={EAR} />
      <path d="M60 74 Q55 80 50 76 M60 74 Q65 80 70 76" stroke={PAPER} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <g stroke={PAPER} strokeWidth="1.4" strokeLinecap="round" opacity="0.85">
        <path d="M34 62 L14 58 M34 68 L16 70" />
        <path d="M86 62 L106 58 M86 68 L104 70" />
      </g>
    </svg>
  );
}

function Shape({ kind, color, style }: { kind: 'square' | 'circle' | 'diamond'; color: string; style: React.CSSProperties }) {
  const base: React.CSSProperties = { position: 'absolute', border: `2.5px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, background: color, ...style };
  if (kind === 'circle') return <div style={{ ...base, borderRadius: '50%' }} />;
  if (kind === 'diamond') return <div style={{ ...base, transform: 'rotate(45deg)' }} />;
  return <div style={{ ...base, transform: 'rotate(12deg)' }} />;
}

/** 产品封面 = 真实整屏 hero（min-h-screen·垂直居中·孟菲斯黄底 + 大字 + emo 黑猫 + 几何 + 滚动提示） */
export default function MediaStudioProduct() {
  return (
    <PreviewFrame bg={YELLOW} padded={false}>
      <div
        style={{
          position: 'relative',
          minHeight: 880,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          backgroundImage: 'radial-gradient(rgba(26,26,26,.2) 1.1px, transparent 1.1px)',
          backgroundSize: '22px 22px',
          fontFamily: DISPLAY,
        }}
      >
        {/* 孟菲斯几何（贴合原站布局） */}
        <Shape kind="square" color={BLUE} style={{ left: -36, top: 96, width: 150, height: 150 }} />
        <Shape kind="diamond" color={MINT} style={{ right: 64, top: '30%', width: 104, height: 104 }} />
        <Shape kind="circle" color={RED} style={{ left: '40%', bottom: 150, width: 60, height: 60 }} />

        {/* 主内容行（垂直居中） */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', maxWidth: 1180, margin: '0 auto', padding: '0 72px', gap: 48 }}>
          {/* 左列 */}
          <div style={{ flex: 1.5 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: `2.5px solid ${INK}`, background: PAPER, padding: '8px 13px', boxShadow: `3px 3px 0 ${INK}`, marginBottom: 28 }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: MINT }} />
              <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '.12em', color: INK }}>LINKS 飞轮社 · 制片流水线拆解</span>
            </div>

            <h1 style={{ margin: 0, fontWeight: 900, lineHeight: 0.98, letterSpacing: '-0.02em', color: INK }}>
              <span style={{ display: 'block', fontSize: 68 }}>一句灵感</span>
              <svg width="128" height="38" viewBox="0 0 128 38" style={{ display: 'block', margin: '8px 0' }}>
                <line x1="2" y1="19" x2="106" y2="19" stroke={INK} strokeWidth="6" />
                <path d="M101 7 L126 19 L101 31 Z" fill={INK} />
              </svg>
              <span style={{ fontSize: 68 }}>
                一条
                <span style={{ background: MINT, color: PAPER, padding: '0 0.14em' }}>成片</span>
              </span>
            </h1>

            <p style={{ maxWidth: 480, marginTop: 28, fontSize: 17, lineHeight: 1.7, color: 'rgba(26,26,26,.82)', fontFamily: '"PingFang SC",sans-serif' }}>
              你迭代出了这套工作流，却不知道它如何把一句话的灵感剪成一段完整视频。这个站把九阶段流水线拆开摊在你面前——看完一遍，你就懂它怎么转。
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 36 }}>
              <span style={{ border: `2.5px solid ${INK}`, background: INK, color: PAPER, padding: '13px 24px', fontSize: 15, fontWeight: 700, boxShadow: `5px 5px 0 ${MINT}` }}>
                ▸ 看流水线怎么跑
              </span>
              <span style={{ fontFamily: MONO, fontSize: 12, color: 'rgba(26,26,26,.6)' }}>9 阶段 · 5 区 · 1 根数据脊梁</span>
            </div>
          </div>

          {/* 右列 emo */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <EmoCat size={250} />
            <div style={{ marginTop: -4, border: `2.5px solid ${INK}`, background: PAPER, padding: '7px 16px', fontSize: 13, fontWeight: 700, boxShadow: `3px 3px 0 ${INK}` }}>
              emo · 频道的脸
            </div>
          </div>
        </div>

        {/* 底部滚动提示 */}
        <div style={{ position: 'absolute', bottom: 28, left: 0, right: 0, textAlign: 'center' }}>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '.18em', color: 'rgba(26,26,26,.6)' }}>向下滚动</div>
          <div style={{ fontSize: 22, color: INK, marginTop: 2 }}>↓</div>
        </div>
      </div>
    </PreviewFrame>
  );
}
