import { PreviewFrame } from '../../../_layout';
import { Check } from 'lucide-react';

const INK = '#1A1A1A';
const PAPER = '#FFF8EC';
const PAPER2 = '#F3EAD8';
const YELLOW = '#FFD12E';
const BLUE = '#2B5BE8';
const MINT = '#16C79A';

const DISPLAY = '"Noto Sans SC","PingFang SC",sans-serif';
const MONO = '"JetBrains Mono",ui-monospace,monospace';

interface Node {
  no: number;
  name: string;
  state: 'done' | 'current' | 'upcoming';
}

const NODES: Node[] = [
  { no: 1, name: '选题', state: 'done' },
  { no: 2, name: '脚本', state: 'done' },
  { no: 3, name: '分镜', state: 'done' },
  { no: 4, name: '素材', state: 'done' },
  { no: 5, name: '渲母版', state: 'done' },
  { no: 6, name: '配音', state: 'done' },
  { no: 7, name: '去PPT', state: 'current' },
  { no: 8, name: '字幕', state: 'upcoming' },
  { no: 9, name: '质检', state: 'upcoming' },
];

const ARTIFACTS = [
  '选题卡.md',
  '深度脚本.md',
  'StoryboardPlan.json',
  '素材清单.json',
  'master.mp4',
  'voice.wav',
  'depptt.mp4',
  'captions.srt',
  'qc-report.json',
];
const ARTIFACT_LIT = 7;

function NodeCircle({ node }: { node: Node }) {
  const isCurrent = node.state === 'current';
  const isDone = node.state === 'done';
  const size = isCurrent ? 46 : 36;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        flex: 1,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: `2.5px solid ${isCurrent ? BLUE : MINT}`,
          background: isCurrent ? BLUE : isDone ? PAPER : 'transparent',
          boxShadow: isCurrent ? `0 0 0 5px rgba(43,91,232,0.22)` : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontWeight: 900,
            fontSize: isCurrent ? 17 : 14,
            color: isCurrent ? PAPER : isDone ? INK : 'rgba(255,248,236,0.5)',
          }}
        >
          {node.no}
        </span>
      </div>
      <span
        style={{
          fontFamily: DISPLAY,
          fontSize: 12,
          fontWeight: isCurrent ? 900 : 600,
          color: isCurrent ? PAPER : isDone ? PAPER : 'rgba(255,248,236,0.5)',
          whiteSpace: 'nowrap',
        }}
      >
        {node.name}
      </span>
    </div>
  );
}

export default function ScrollPinnedSpine() {
  return (
    <PreviewFrame bg={INK}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* 顶部小标题 */}
        <div
          style={{
            fontFamily: MONO,
            fontSize: 12,
            color: MINT,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            marginBottom: 12,
          }}
        >
          02 · THE ASSEMBLY LINE
        </div>
        <h2
          style={{
            fontFamily: DISPLAY,
            fontWeight: 900,
            fontSize: 40,
            lineHeight: 1.04,
            color: PAPER,
            margin: '0 0 40px',
            letterSpacing: '-0.01em',
          }}
        >
          一根{' '}
          <span style={{ background: MINT, color: INK, padding: '0 0.14em' }}>数据脊梁</span>
          ，串起九个 skill
        </h2>

        {/* 脊梁线 */}
        <div style={{ position: 'relative', margin: '0 0 56px', height: 56 }}>
          <div
            style={{
              position: 'absolute',
              top: 25,
              left: 0,
              right: 0,
              height: 6,
              borderRadius: 3,
              background: 'rgba(255,248,236,0.15)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 25,
              left: 0,
              width: '66%',
              height: 6,
              borderRadius: 3,
              background: MINT,
            }}
          />
          {/* JSON token */}
          <div
            style={{
              position: 'absolute',
              top: 14,
              left: '66%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                background: YELLOW,
                border: `2.5px solid ${INK}`,
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 9, color: INK }}>JSON</span>
            </div>
            <span
              style={{
                fontFamily: MONO,
                fontSize: 10,
                color: YELLOW,
                whiteSpace: 'nowrap',
                fontWeight: 700,
              }}
            >
              StoryboardPlan
            </span>
          </div>
        </div>

        {/* 段标 */}
        <div style={{ display: 'flex', marginBottom: 10 }}>
          <div
            style={{
              flexBasis: '44.4%',
              fontFamily: MONO,
              fontSize: 11,
              color: MINT,
              borderTop: `1.5px dashed ${MINT}`,
              paddingTop: 6,
              letterSpacing: '0.08em',
            }}
          >
            创意段 ①-④
          </div>
          <div style={{ width: 12 }} />
          <div
            style={{
              flex: 1,
              fontFamily: MONO,
              fontSize: 11,
              color: BLUE,
              borderTop: `1.5px dashed ${BLUE}`,
              paddingTop: 6,
              letterSpacing: '0.08em',
            }}
          >
            机械段 ⑤-⑨
          </div>
        </div>

        {/* 节点排 */}
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 44 }}>
          {NODES.map(node => (
            <NodeCircle key={node.no} node={node} />
          ))}
        </div>

        {/* 底部两栏 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 24 }}>
          {/* 详情卡 */}
          <div
            style={{
              background: PAPER,
              border: `2.5px solid ${INK}`,
              boxShadow: `6px 6px 0 ${INK}`,
              borderRadius: 0,
              padding: 24,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontWeight: 900,
                  fontSize: 13,
                  background: BLUE,
                  color: PAPER,
                  padding: '3px 9px',
                }}
              >
                STEP 07
              </span>
              <h3
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 900,
                  fontSize: 26,
                  color: INK,
                  margin: 0,
                  letterSpacing: '-0.01em',
                }}
              >
                7 · 去 PPT
              </h3>
            </div>
            <p style={{ fontFamily: DISPLAY, fontSize: 15, lineHeight: 1.6, color: INK, margin: 0 }}>
              <span style={{ background: MINT, color: PAPER, padding: '0 0.16em' }}>video-polish</span>{' '}
              接管渲好的母版，砸碎模板装饰、注入专属图解动效与节奏断点，把「叙事 PPT 感」精修成真片质感。
            </p>
          </div>

          {/* 产物累积卡 */}
          <div
            style={{
              background: 'rgba(255,248,236,0.95)',
              border: `2.5px solid ${INK}`,
              boxShadow: `3px 3px 0 ${INK}`,
              borderRadius: 0,
              padding: 20,
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                color: INK,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginBottom: 14,
                fontWeight: 700,
              }}
            >
              产物累积 · 7/9
            </div>
            {ARTIFACTS.map((name, i) => {
              const lit = i < ARTIFACT_LIT;
              return (
                <div
                  key={name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 9,
                    opacity: lit ? 1 : 0.34,
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      flexShrink: 0,
                      background: lit ? MINT : 'transparent',
                      border: lit ? 'none' : `2px solid rgba(26,26,26,0.3)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {lit && <Check size={12} color={PAPER} strokeWidth={3} />}
                  </span>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 12,
                      color: INK,
                      textDecoration: lit ? 'none' : 'none',
                    }}
                  >
                    {name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
