import { PreviewFrame } from '../../../_layout';
import { ChevronLeft, RotateCw, Sparkles } from 'lucide-react';

/**
 * kb-chunking-3pane-preview · 切块策略三栏实时预览
 * 左原文 textarea / 中 chunks 卡片列表(选中高亮) / 右 strategy 表单(mode 网格 + amber 滑块 + 清洗开关)。
 * amber 强调的调试面，300ms 防抖即时预览不写库。
 * 源码：frontend/src/system/kbs/pages/kb-chunking-preview-page.tsx
 */

const FONT = 'Inter, system-ui, sans-serif';
const MONO = 'JetBrains Mono, monospace';

const DEFAULT_TEXT = `Chameleon 是一个多 provider AI Agent 聚合平台。

它把 Dify 的可视化编排、LobeChat 的颜值、LangFuse 的观测、FastGPT 的 RAG、One-API 的网关能力缝合在一个 OSS 项目里。

调用方按 model_code 路由到 channel，失败自动 failover，trace 嵌套 observation 串到 call_logs。`;

const MODES = ['固定字数', '按段落', '按句子', '自定义正则', '按 Token', '父子分层', 'QA 问答'];

const CHUNKS = [
  { seq: 1, chars: 28, tok: 18, content: 'Chameleon 是一个多 provider AI Agent 聚合平台。', selected: true },
  {
    seq: 2,
    chars: 64,
    tok: 42,
    content:
      '它把 Dify 的可视化编排、LobeChat 的颜值、LangFuse 的观测、FastGPT 的 RAG、One-API 的网关能力缝合在一个 OSS 项目里。',
  },
  {
    seq: 3,
    chars: 52,
    tok: 34,
    content: '调用方按 model_code 路由到 channel，失败自动 failover，trace 嵌套 observation 串到 call_logs。',
  },
];

const colHead: React.CSSProperties = {
  background: 'rgba(244,243,238,0.4)',
  borderBottom: '1px solid rgba(231,229,224,0.7)',
  padding: '6px 12px',
  fontSize: 10.5,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: '#78716c',
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ marginBottom: 4, display: 'block', fontSize: 11.5, color: '#44403c' }}>
      {children}
    </label>
  );
}

export default function KbChunking3PanePreview() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ fontFamily: FONT }}>
        <div
          style={{
            borderRadius: 12,
            border: '1px solid rgba(231,229,224,0.5)',
            background: '#fffefb',
            boxShadow: '0 1px 3px rgb(0 0 0 / 5%), 0 2px 8px rgb(0 0 0 / 3%)',
            overflow: 'hidden',
          }}
        >
          {/* header */}
          <header
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(231,229,224,0.7)',
              padding: '8px 12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: 28,
                  padding: '0 8px',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 12,
                  color: '#57534e',
                  cursor: 'pointer',
                }}
              >
                <ChevronLeft size={14} style={{ marginRight: 2 }} />
                返回
              </button>
              <div>
                <h2 style={{ margin: 0, fontSize: 14, fontWeight: 500, color: '#1c1917' }}>
                  切块策略预览
                </h2>
                <div style={{ fontSize: 11, color: '#78716c' }}>KB「产品文档」· 不写库；调试用</div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 11.5,
                color: '#78716c',
              }}
            >
              <span>
                <span style={{ fontWeight: 500, color: '#44403c' }}>3</span> chunks
              </span>
              <span style={{ color: '#d6d3d1' }}>·</span>
              <span>mode=fixed</span>
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: 28,
                  padding: '0 8px',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 12,
                  color: '#57534e',
                  cursor: 'pointer',
                }}
              >
                <RotateCw size={12} style={{ marginRight: 4 }} />
                重跑
              </button>
            </div>
          </header>

          {/* 三栏 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.2fr 320px',
              height: 480,
            }}
          >
            {/* 左：原文 */}
            <div
              style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(231,229,224,0.7)' }}
            >
              <div style={colHead}>原文（{DEFAULT_TEXT.length} 字符）</div>
              <textarea
                defaultValue={DEFAULT_TEXT}
                style={{
                  flex: 1,
                  minHeight: 0,
                  resize: 'none',
                  border: 'none',
                  borderRadius: 0,
                  padding: 12,
                  fontFamily: MONO,
                  fontSize: 12,
                  lineHeight: 1.625,
                  color: '#292524',
                  outline: 'none',
                }}
              />
            </div>

            {/* 中：chunks */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(244,243,238,0.2)',
                borderRight: '1px solid rgba(231,229,224,0.7)',
              }}
            >
              <div style={colHead}>Chunks</div>
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                {CHUNKS.map(c => (
                  <button
                    key={c.seq}
                    style={{
                      width: '100%',
                      borderRadius: 6,
                      border: `1px solid ${c.selected ? '#fbbf24' : '#e7e5e0'}`,
                      background: '#fff',
                      padding: '8px 12px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      boxShadow: c.selected ? '0 0 0 2px #fef3c7' : 'none',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: 10,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        color: '#78716c',
                      }}
                    >
                      <span style={{ fontFamily: MONO }}>#{c.seq}</span>
                      <span style={{ fontFamily: MONO, fontVariantNumeric: 'tabular-nums' }}>
                        {c.chars} 字 · ~{c.tok} tok
                      </span>
                    </div>
                    <div
                      style={{
                        marginTop: 4,
                        fontSize: 12,
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-wrap',
                        color: '#292524',
                      }}
                    >
                      {c.content}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 右：策略 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(244,243,238,0.4)',
              }}
            >
              <div style={colHead}>策略</div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  overflowY: 'auto',
                  padding: 12,
                }}
              >
                {/* mode 七按钮 */}
                <div>
                  <FieldLabel>mode</FieldLabel>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                    {MODES.map((m, i) => (
                      <button
                        key={m}
                        style={{
                          // 选中：border-amber-400 #fbbf24 / bg-amber-50/60 rgba(255,251,235,0.6) / text-amber-800 #92400e
                          borderRadius: 6,
                          border: `1px solid ${i === 0 ? '#fbbf24' : '#e7e5e0'}`,
                          background: i === 0 ? 'rgba(255,251,235,0.6)' : '#fff',
                          color: i === 0 ? '#92400e' : '#57534e',
                          padding: '6px 8px',
                          fontSize: 11.5,
                          cursor: 'pointer',
                          fontFamily: FONT,
                        }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* chunk_size 滑块 */}
                <div>
                  <FieldLabel>chunk_size = 200 字符</FieldLabel>
                  <input
                    type="range"
                    min={50}
                    max={4000}
                    step={50}
                    defaultValue={200}
                    style={{ width: '100%', accentColor: '#d97706' }}
                  />
                </div>

                {/* overlap 滑块 */}
                <div>
                  <FieldLabel>overlap = 30 字符</FieldLabel>
                  <input
                    type="range"
                    min={0}
                    max={500}
                    step={10}
                    defaultValue={30}
                    style={{ width: '100%', accentColor: '#d97706' }}
                  />
                </div>

                {/* 文本清洗 CleanRow */}
                <div>
                  <FieldLabel>文本清洗</FieldLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {[
                      { label: '规范化空白', on: true },
                      { label: '删除 URL / 邮箱', on: false },
                    ].map(r => (
                      <label
                        key={r.label}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderRadius: 6,
                          border: '1px solid #e7e5e0',
                          background: '#fff',
                          padding: '6px 10px',
                          fontSize: 11.5,
                          color: '#57534e',
                          cursor: 'pointer',
                        }}
                      >
                        {r.label}
                        {/* Switch: h-5 w-9(20×36) border-2 transparent, checked bg-primary-600 #2563eb,
                            thumb h-4 w-4(16) bg-white shadow-soft, checked translate-x-4(16) */}
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            width: 36,
                            height: 20,
                            borderRadius: 9999,
                            border: '2px solid transparent',
                            background: r.on ? '#2563eb' : '#d6d3d1',
                            backgroundClip: 'padding-box',
                            boxSizing: 'border-box',
                          }}
                        >
                          <span
                            style={{
                              width: 16,
                              height: 16,
                              borderRadius: '50%',
                              background: '#fff',
                              transform: r.on ? 'translateX(16px)' : 'translateX(0)',
                              boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)',
                            }}
                          />
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 底部防抖提示 */}
                <div
                  style={{
                    borderTop: '1px solid #e7e5e0',
                    paddingTop: 8,
                    fontSize: 10.5,
                    lineHeight: 1.375,
                    color: '#78716c',
                  }}
                >
                  <Sparkles
                    size={12}
                    color="#f59e0b"
                    style={{ marginRight: 4, display: 'inline', verticalAlign: 'middle' }}
                  />
                  修改即时预览（300ms 防抖）；不会改 KB 的策略，需到「配置」tab 保存。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
