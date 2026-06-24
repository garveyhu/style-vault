import { PreviewFrame } from '../../_layout';

const INK = '#1A1A1A';
const PAPER = '#FFF8EC';
const PAPER2 = '#F3EAD8';
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

const SWATCHES: [string, string][] = [
  ['ink', INK],
  ['paper', PAPER],
  ['yellow', YELLOW],
  ['blue', BLUE],
  ['red', RED],
  ['mint', MINT],
];

export default function MemphisScrollyDoc() {
  return (
    <PreviewFrame bg={PAPER}>
      <div style={{ maxWidth: 1100, margin: '0 auto', fontFamily: DISPLAY, color: INK }}>
        {/* title + tags */}
        <h1 style={{ fontSize: 36, fontWeight: 900, margin: '0 0 14px', lineHeight: 1.1 }}>
          孟菲斯滚动叙事文档站
        </h1>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {['brutalist', 'editorial', 'playful', 'energetic', 'react-tailwind'].map(t => (
            <span
              key={t}
              style={{
                background: PAPER2,
                border: `2px solid ${INK}`,
                borderRadius: 999,
                padding: '4px 12px',
                fontFamily: MONO,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* grid of face elements */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          {/* (a) palette */}
          <div style={{ background: PAPER, border: BORDER, boxShadow: HARD, padding: 16 }}>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: INK_SOFT,
                marginBottom: 12,
              }}
            >
              5 色板 + ink/paper
            </div>
            <div style={{ display: 'flex', gap: 0, border: `2.5px solid ${INK}` }}>
              {SWATCHES.map(([name, hex]) => (
                <div key={name} style={{ flex: 1 }}>
                  <div style={{ height: 56, background: hex }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', marginTop: 6 }}>
              {SWATCHES.map(([name, hex]) => (
                <div key={name} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700 }}>{name}</div>
                  <div style={{ fontFamily: MONO, fontSize: 8.5, color: INK_SOFT }}>{hex}</div>
                </div>
              ))}
            </div>
          </div>

          {/* (b) big type */}
          <div
            style={{
              background: YELLOW,
              border: BORDER,
              boxShadow: HARD,
              padding: 16,
              backgroundImage: 'radial-gradient(rgba(26,26,26,.18) 1.1px, transparent 1.1px)',
              backgroundSize: '20px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              display · 900 黑粗大字
            </div>
            <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em' }}>
              飞轮
            </div>
          </div>

          {/* (c) signature card */}
          <div style={{ background: PAPER, border: BORDER, boxShadow: SIG, padding: 18 }}>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: MINT,
                marginBottom: 10,
              }}
            >
              signature 阴影 · mint
            </div>
            <div style={{ fontSize: 20, fontWeight: 900, lineHeight: 1.35 }}>
              signature 三件套 ={' '}
              <span style={{ background: MINT, color: PAPER, padding: '0 0.14em' }}>薄荷青眼</span>{' '}
              + 黑粗大字 + 撞色背景
            </div>
          </div>

          {/* (d) kicker + mark example */}
          <div style={{ background: PAPER, border: BORDER, boxShadow: HARD, padding: 18 }}>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 12,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: INK_SOFT,
                marginBottom: 10,
              }}
            >
              01 — KICKER · 序号 + mono
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.5 }}>
              正文里用{' '}
              <span style={{ background: MINT, color: PAPER, padding: '0 0.18em' }}>青底 mark</span>{' '}
              或{' '}
              <span style={{ background: YELLOW, color: INK, padding: '0 0.18em' }}>黄底黑字</span>{' '}
              划重点，黑白灰留白托底。
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
