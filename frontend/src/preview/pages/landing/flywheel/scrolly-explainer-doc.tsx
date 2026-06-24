import { PreviewFrame } from '../../../_layout';
import { Play, ArrowRight } from 'lucide-react';

const INK = '#1A1A1A';
const PAPER = '#FFF8EC';
const YELLOW = '#FFD12E';
const BLUE = '#2B5BE8';
const RED = '#FF4D4D';
const MINT = '#16C79A';
const INK_SOFT = '#6E6A62';

const DISPLAY = '"Noto Sans SC","PingFang SC",sans-serif';
const MONO = '"JetBrains Mono",ui-monospace,monospace';
const HARD = `6px 6px 0 ${INK}`;
const SIG = `6px 6px 0 ${MINT}`;
const BORDER = `2.5px solid ${INK}`;

function BlackCat({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden>
      {/* ears */}
      <path d="M26 44 L30 14 L52 36 Z" fill={INK} />
      <path d="M94 44 L90 14 L68 36 Z" fill={INK} />
      {/* head/body */}
      <rect x="22" y="34" width="76" height="72" rx="20" fill={INK} />
      {/* eyes */}
      <ellipse cx="46" cy="66" rx="8.5" ry="12" fill={MINT} />
      <ellipse cx="74" cy="66" rx="8.5" ry="12" fill={MINT} />
    </svg>
  );
}

export default function ScrollyExplainerDoc() {
  return (
    <PreviewFrame bg={PAPER} padded={false}>
      <div style={{ fontFamily: DISPLAY, color: INK, lineHeight: 1.4 }}>
        {/* ============ HERO ============ */}
        <section
          style={{
            position: 'relative',
            background: YELLOW,
            backgroundImage:
              'radial-gradient(rgba(26,26,26,.2) 1.1px, transparent 1.1px)',
            backgroundSize: '22px 22px',
            minHeight: 360,
            borderBottom: BORDER,
            overflow: 'hidden',
          }}
        >
          {/* memphis geometry */}
          <div
            style={{
              position: 'absolute',
              top: 40,
              right: 360,
              width: 46,
              height: 46,
              background: BLUE,
              border: BORDER,
              boxShadow: HARD,
              transform: 'rotate(18deg)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 230,
              right: 300,
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: RED,
              border: BORDER,
              boxShadow: HARD,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 120,
              left: 38,
              width: 34,
              height: 34,
              background: MINT,
              border: BORDER,
              boxShadow: HARD,
              transform: 'rotate(45deg)',
            }}
          />

          <div
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              padding: '40px 32px 44px',
              display: 'grid',
              gridTemplateColumns: '1fr 240px',
              gap: 28,
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* left col */}
            <div>
              <div
                style={{
                  display: 'inline-block',
                  background: PAPER,
                  border: BORDER,
                  boxShadow: `3px 3px 0 ${INK}`,
                  padding: '5px 12px',
                  fontFamily: MONO,
                  fontSize: 12,
                  fontWeight: 700,
                  marginBottom: 20,
                }}
              >
                LINKS 飞轮社 · 制片流水线拆解
              </div>
              <h1
                style={{
                  fontSize: 56,
                  fontWeight: 900,
                  margin: '0 0 16px',
                  lineHeight: 1.05,
                  letterSpacing: '-0.01em',
                }}
              >
                一句灵感 →
                <br />
                一条
                <span
                  style={{
                    background: MINT,
                    color: PAPER,
                    padding: '0 0.12em',
                    boxDecorationBreak: 'clone',
                    WebkitBoxDecorationBreak: 'clone',
                  }}
                >
                  成片
                </span>
              </h1>
              <p
                style={{
                  fontSize: 16,
                  color: INK,
                  maxWidth: 440,
                  margin: '0 0 22px',
                  fontWeight: 500,
                }}
              >
                把一闪而过的念头，喂进九阶段流水线，自动跑成四平台同步的成品。这一页，拆给你看。
              </p>
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: INK,
                  color: PAPER,
                  border: BORDER,
                  boxShadow: SIG,
                  padding: '12px 22px',
                  fontFamily: DISPLAY,
                  fontWeight: 900,
                  fontSize: 16,
                  cursor: 'pointer',
                }}
              >
                <Play size={16} fill={PAPER} stroke={PAPER} />
                看流水线
              </button>
            </div>

            {/* right col: cat */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  background: PAPER,
                  border: BORDER,
                  boxShadow: HARD,
                  padding: 14,
                }}
              >
                <BlackCat size={120} />
              </div>
              <div
                style={{
                  background: PAPER,
                  border: BORDER,
                  boxShadow: `3px 3px 0 ${INK}`,
                  padding: '5px 12px',
                  fontFamily: MONO,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                emo · 频道的脸
              </div>
            </div>
          </div>
        </section>

        {/* ============ PAPER SECTION 01 ============ */}
        <section style={{ background: PAPER, borderBottom: BORDER }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '44px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: YELLOW,
                  border: BORDER,
                  boxShadow: `4px 4px 0 ${INK}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: MONO,
                  fontWeight: 900,
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                01
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: INK_SOFT,
                }}
              >
                INTAKE · 灵感入口
              </div>
            </div>
            <h2 style={{ fontSize: 30, fontWeight: 900, margin: '4px 0 24px' }}>
              三个口子，把一句话收成结构化选题
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
              <HardCard head={BLUE} headText="topic-radar" title="前沿雷达">
                扫一线信源，把热点、信息差、争议点抓回成 backlog 候选。
              </HardCard>
              <HardCard head={MINT} headText="topic-craft" title="选题打磨">
                一句灵感扩成钩子、角度、母版结构，落地一张选题卡。
              </HardCard>
              <HardCard head={BLUE} headText="script-craft" title="脚本生成">
                按母版生成深度脚本，分段、留白、signature 一次到位。
              </HardCard>
            </div>
          </div>
        </section>

        {/* ============ DARK SCROLL-PIN SECTION ============ */}
        <section style={{ background: INK, minHeight: 180, borderBottom: BORDER }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 32px' }}>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: MINT,
                marginBottom: 18,
              }}
            >
              PINNED SCROLL · 九阶段流水线
            </div>
            <div style={{ position: 'relative', padding: '14px 0 4px' }}>
              {/* progress line */}
              <div
                style={{
                  position: 'absolute',
                  top: 26,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: MINT,
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                {['采集', '选题', '脚本', '分镜', '素材', '渲染', '配音', '去PPT', '字幕'].map((s, i) => (
                  <div
                    key={s}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
                  >
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: i === 5 ? YELLOW : PAPER,
                        border: `2.5px solid ${INK}`,
                        boxShadow: `0 0 0 2.5px ${MINT}`,
                      }}
                    />
                    <span style={{ color: PAPER, fontSize: 12, fontWeight: 700 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ FOOTER (dark) ============ */}
        <section style={{ background: INK, padding: '40px 32px 44px' }}>
          <div
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 18,
              textAlign: 'center',
            }}
          >
            <BlackCat size={64} />
            <h2
              style={{
                fontSize: 34,
                fontWeight: 900,
                color: PAPER,
                margin: 0,
                lineHeight: 1.2,
                maxWidth: 680,
              }}
            >
              别做 AI 工具的收藏家，
              <br />
              转你自己的
              <span style={{ background: YELLOW, color: INK, padding: '0 0.12em' }}>飞轮</span>
            </h2>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
              {['四平台同步', 'AI 原生·无人设', '九阶段流水线'].map((t, i) => (
                <span
                  key={t}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    background: [BLUE, MINT, RED][i],
                    color: PAPER,
                    border: `2.5px solid ${PAPER}`,
                    borderRadius: 999,
                    padding: '6px 14px',
                    fontFamily: MONO,
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  <ArrowRight size={14} />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PreviewFrame>
  );
}

function HardCard({
  head,
  headText,
  title,
  children,
}: {
  head: string;
  headText: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ background: PAPER, border: BORDER, boxShadow: HARD }}>
      <div
        style={{
          background: head,
          borderBottom: BORDER,
          padding: '8px 14px',
          fontFamily: MONO,
          fontSize: 12,
          fontWeight: 700,
          color: PAPER,
        }}
      >
        {headText}
      </div>
      <div style={{ padding: '16px 16px 18px' }}>
        <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 8 }}>{title}</div>
        <div style={{ fontSize: 13.5, color: INK_SOFT, fontWeight: 500, lineHeight: 1.55 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
