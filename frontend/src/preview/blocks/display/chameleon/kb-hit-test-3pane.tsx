import { PreviewFrame } from '../../../_layout';
import { Search } from 'lucide-react';

/**
 * kb-hit-test-3pane · 检索命中测试三栏面板
 * 左参数 / 中命中 chunk 卡(rank + 文档 + 分项得分 + 摘要) / 右选中原文(关键词高亮) + 全分项得分。
 * RAG 召回调试，amber 强调命中/选中态。
 * 源码：frontend/src/system/kbs/components/hit-test-panel.tsx + score-breakdown.tsx
 */

const FONT = 'Inter, system-ui, sans-serif';
const MONO = 'JetBrains Mono, monospace';

interface Hit {
  rank: number;
  doc: string;
  seq: number;
  content: string;
  vector: number;
  bm25: number;
  rerank: number;
  active?: boolean;
}

const HITS: Hit[] = [
  {
    rank: 1,
    doc: '产品手册.pdf',
    seq: 3,
    content: '变色龙平台支持多源模型统一聚合，直连不同的上游 provider 调用。',
    vector: 88,
    bm25: 61,
    rerank: 95,
    active: true,
  },
  {
    rank: 2,
    doc: '产品手册.pdf',
    seq: 7,
    content: '检索增强生成（RAG）先从知识库召回相关切块，再拼进 prompt 交给大模型生成答案。',
    vector: 81,
    bm25: 44,
    rerank: 72,
  },
  {
    rank: 3,
    doc: 'FAQ.md',
    seq: 1,
    content: '如何配置 reranker？在知识库 collection 配置里选择 BGE 或 Cohere。',
    vector: 49,
    bm25: 70,
    rerank: 58,
  },
];

const CHANNELS = [
  { label: '向量相似度', short: '向量', bar: '#0ea5e9' },
  { label: '关键词匹配', short: '关键词', bar: '#f59e0b' },
  { label: '精排得分', short: '精排', bar: '#8b5cf6' },
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ marginBottom: 4, display: 'block', fontSize: 12, color: '#57534e' }}>
      {children}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: 32,
  padding: '0 8px',
  fontSize: 12.5,
  border: '1px solid #d6d3d1',
  borderRadius: 6,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: FONT,
  color: '#44403c',
};

export default function KbHitTest3Pane() {
  const active = HITS.find(h => h.active)!;
  const vals = [active.vector, active.bm25, active.rerank];

  return (
    <PreviewFrame bg="#fafaf7" padded>
      <div
        style={{
          fontFamily: FONT,
          display: 'grid',
          gridTemplateColumns: '260px minmax(0, 1fr) minmax(0, 1.05fr)',
          gap: 12,
        }}
      >
        {/* ① 参数栏 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <FieldLabel>查询语句</FieldLabel>
            <textarea
              defaultValue="什么是检索增强生成"
              rows={5}
              style={{
                width: '100%',
                resize: 'none',
                border: '1px solid #d6d3d1',
                borderRadius: 6,
                padding: 8,
                fontSize: 12.5,
                lineHeight: 1.5,
                color: '#44403c',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: FONT,
              }}
            />
          </div>
          <div>
            <FieldLabel>
              top_k = <span style={{ fontFamily: MONO, fontVariantNumeric: 'tabular-nums' }}>5</span>
            </FieldLabel>
            <input
              type="range"
              min={1}
              max={20}
              defaultValue={5}
              style={{ width: '100%', accentColor: '#d97706' }}
            />
          </div>
          <div>
            <FieldLabel>召回模式</FieldLabel>
            <div
              style={{
                ...inputStyle,
                display: 'flex',
                alignItems: 'center',
                color: '#44403c',
              }}
            >
              混合（向量 + 关键词）
            </div>
          </div>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              fontSize: 12,
              color: '#57534e',
            }}
          >
            <span>多查询扩展</span>
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
                background: '#2563eb',
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
                  transform: 'translateX(16px)',
                  boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)',
                }}
              />
            </span>
          </label>
          <div>
            <FieldLabel>标签过滤（多个用逗号）</FieldLabel>
            <input placeholder="product, faq" style={inputStyle} />
          </div>
          {/* Button 默认 primary / size=md → h-8(32) px-3 text-[12.5px]，Search h-3.5(14) mr-1 */}
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: 32,
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontSize: 12.5,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <Search size={14} style={{ marginRight: 4 }} />
            搜索
          </button>
        </div>

        {/* ② 命中 chunk 列表 */}
        <div style={{ minHeight: 280, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {HITS.map(h => (
            <button
              key={h.rank}
              style={{
                display: 'block',
                width: '100%',
                borderRadius: 8,
                border: `1px solid ${h.active ? '#fcd34d' : 'rgba(231,229,224,0.7)'}`,
                background: '#fff',
                padding: 10,
                textAlign: 'left',
                cursor: 'pointer',
                boxShadow: h.active ? '0 0 0 1px #fde68a' : 'none',
              }}
            >
              <div
                style={{
                  marginBottom: 6,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 11,
                  color: '#78716c',
                }}
              >
                <span style={{ fontFamily: MONO }}>#{h.rank}</span>
                <span
                  style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                >
                  {h.doc}
                </span>
                <span style={{ marginLeft: 'auto', flexShrink: 0, fontFamily: MONO }}>
                  seq {h.seq}
                </span>
              </div>
              {/* ScoreBreakdown compact */}
              <div
                style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: 10, rowGap: 2 }}
              >
                {[
                  { s: '向量', v: h.vector },
                  { s: '关键词', v: h.bm25 },
                  { s: '精排', v: h.rerank },
                ].map(c => (
                  <span key={c.s} style={{ fontSize: 10.5, color: '#78716c' }}>
                    {c.s}
                    <span
                      style={{
                        marginLeft: 2,
                        fontFamily: MONO,
                        fontVariantNumeric: 'tabular-nums',
                        color: '#44403c',
                      }}
                    >
                      {c.v}%
                    </span>
                  </span>
                ))}
              </div>
              <div
                style={{
                  marginTop: 6,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  fontSize: 12,
                  lineHeight: 1.375,
                  color: '#44403c',
                }}
              >
                {h.content}
              </div>
            </button>
          ))}
        </div>

        {/* ③ 选中原文 + 全分项得分 */}
        <div
          style={{
            borderRadius: 8,
            border: '1px solid rgba(231,229,224,0.7)',
            background: '#fff',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ borderBottom: '1px solid rgba(231,229,224,0.7)', padding: 12 }}>
            <div
              style={{
                marginBottom: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 11.5,
                color: '#57534e',
              }}
            >
              <span
                style={{
                  fontWeight: 500,
                  textDecoration: 'underline',
                  textDecorationColor: 'transparent',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }}
              >
                {active.doc}
              </span>
              <span
                style={{ marginLeft: 'auto', flexShrink: 0, fontFamily: MONO, fontSize: 10.5, color: '#a8a29e' }}
              >
                seq {active.seq}
              </span>
            </div>
            {/* ScoreBreakdown 全模式 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {CHANNELS.map((c, i) => (
                <div key={c.short} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 64, flexShrink: 0, textAlign: 'right', fontSize: 10.5, color: '#78716c' }}>
                    {c.label}
                  </span>
                  <div
                    style={{
                      // ChannelRow 轨道 bg-stone-100 = #f5f5f4
                      height: 6,
                      flex: 1,
                      overflow: 'hidden',
                      borderRadius: 9999,
                      background: '#f5f5f4',
                    }}
                  >
                    <div style={{ height: '100%', borderRadius: 9999, background: c.bar, width: `${vals[i]}%` }} />
                  </div>
                  <span
                    style={{
                      width: 36,
                      flexShrink: 0,
                      textAlign: 'right',
                      fontFamily: MONO,
                      fontSize: 10.5,
                      fontVariantNumeric: 'tabular-nums',
                      color: '#57534e',
                    }}
                  >
                    {vals[i]}%
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* 原文（关键词高亮：高亮词用 amber 底） */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: 12,
              fontSize: 12.5,
              lineHeight: 1.625,
              whiteSpace: 'pre-wrap',
              color: '#292524',
            }}
          >
            变色龙平台支持多源模型统一聚合，直连不同的上游{' '}
            {/* highlight <mark class="bg-amber-100 rounded px-0.5 text-stone-900"> */}
            <mark style={{ background: '#fef3c7', color: '#1c1917', borderRadius: 4, padding: '0 2px' }}>
              provider
            </mark>{' '}
            调用。检索增强{' '}
            <mark style={{ background: '#fef3c7', color: '#1c1917', borderRadius: 4, padding: '0 2px' }}>
              生成
            </mark>
            （RAG）先从知识库召回相关切块，再拼进 prompt 交给大模型生成答案。
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
