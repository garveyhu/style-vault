import { PreviewFrame } from '../../../_layout';
import { ArrowLeft, Check, Copy, Eye, EyeOff, Pencil, Search, Trash2, X } from 'lucide-react';

/**
 * kb-chunk-card-wall · 知识库切块卡片墙
 * responsive 卡片网格，每卡 #seq + tok + 正文(超 480 字截断) + hover 行内动作 + 停用弱化。
 * 文档详情头：breadcrumb + 信息卡 + 切块墙标题 + 搜索 + 共 N 块。
 * 源码：frontend/src/system/kbs/components/chunk-card.tsx + kb-document-detail-page.tsx
 */

const FONT = 'Inter, system-ui, sans-serif';
const MONO = 'JetBrains Mono, monospace';

const iconBtn: React.CSSProperties = {
  borderRadius: 4,
  padding: 2,
  background: 'transparent',
  border: 'none',
  color: '#78716c',
  cursor: 'pointer',
  display: 'inline-flex',
};

interface Chunk {
  seq: number;
  tok: number;
  hit?: number;
  enabled: boolean;
  editing?: boolean;
  content: string;
  truncated?: boolean;
  keywords?: string[];
}

const CHUNKS: Chunk[] = [
  {
    seq: 1,
    tok: 128,
    hit: 12,
    enabled: true,
    content:
      '向量数据库是一种专门用于存储和检索高维向量的数据库系统。它通过近似最近邻（ANN）算法在海量向量中快速找到与查询向量最相似的若干条记录，常用于语义检索、推荐系统和 RAG 管线的召回阶段。',
    keywords: ['向量数据库', 'ANN', 'RAG'],
  },
  {
    seq: 2,
    tok: 96,
    enabled: true,
    editing: true,
    content:
      '检索增强生成（RAG）将外部知识库的相关片段拼入 prompt，缓解大模型幻觉并引入实时知识。',
  },
  {
    seq: 3,
    tok: 210,
    enabled: false,
    content:
      '分段策略直接影响召回质量：过长的 chunk 稀释语义、过短的 chunk 丢失上下文。通常按语义边界或固定 token 窗口切分，并设置 overlap 保留跨段连贯性。此段内容较长，超过 480 字会被截断并提供「展开」按钮…',
    truncated: true,
  },
];

function Card({ c }: { c: Chunk }) {
  return (
    <div
      style={{
        borderRadius: 8,
        border: `1px solid ${c.editing ? '#fcd34d' : 'rgba(231,229,224,0.7)'}`,
        background: '#fff',
        padding: 12,
        opacity: c.enabled ? 1 : 0.55,
        boxShadow: c.editing ? '0 1px 3px rgb(0 0 0 / 5%)' : 'none',
      }}
    >
      {/* 卡头 */}
      <div
        style={{
          marginBottom: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 11,
          color: '#78716c',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: MONO }}>
          #{c.seq}
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>{c.tok} tok</span>
          {c.hit != null && c.hit > 0 && (
            <span style={{ fontVariantNumeric: 'tabular-nums', color: '#059669' }}>命中 {c.hit}</span>
          )}
          {!c.enabled && <span style={{ color: '#a8a29e' }}>· 已停用</span>}
        </span>
        {/* hover 露出的动作组（演示恒显） */}
        <div style={{ display: 'flex', gap: 4 }}>
          <button title="复制" style={iconBtn}>
            <Copy size={12} />
          </button>
          {!c.editing && (
            <button title="编辑" style={iconBtn}>
              <Pencil size={12} />
            </button>
          )}
          <button title={c.enabled ? '停用' : '启用'} style={iconBtn}>
            {c.enabled ? <Eye size={12} /> : <EyeOff size={12} />}
          </button>
          <button title="删除" style={{ ...iconBtn, color: '#a8a29e' }}>
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {/* 正文 / 编辑态 */}
      {c.editing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <textarea
            defaultValue={c.content}
            rows={6}
            style={{
              width: '100%',
              resize: 'none',
              borderRadius: 6,
              border: '1px solid #d6d3d1',
              padding: 8,
              fontFamily: MONO,
              fontSize: 12.5,
              lineHeight: 1.625,
              color: '#292524',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: 28,
                padding: '0 10px',
                background: 'transparent',
                border: 'none',
                borderRadius: 6,
                fontSize: 12,
                color: '#57534e',
                cursor: 'pointer',
              }}
            >
              <X size={12} style={{ marginRight: 4 }} /> 取消
            </button>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: 28,
                padding: '0 10px',
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <Check size={12} style={{ marginRight: 4 }} /> 保存
            </button>
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              fontSize: 12.5,
              lineHeight: 1.625,
              whiteSpace: 'pre-wrap',
              color: '#292524',
            }}
          >
            {c.truncated ? `${c.content}…` : c.content}
          </div>
          {c.truncated && (
            <button
              style={{
                marginTop: 4,
                background: 'transparent',
                border: 'none',
                padding: 0,
                fontSize: 11,
                color: '#b45309',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              展开（共 612 字）
            </button>
          )}
          {c.keywords && c.keywords.length > 0 && (
            <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {c.keywords.map(k => (
                <span
                  key={k}
                  style={{
                    borderRadius: 4,
                    background: '#f4f3ee',
                    padding: '2px 6px',
                    fontSize: 10,
                    color: '#78716c',
                  }}
                >
                  {k}
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function KbChunkCardWall() {
  return (
    <PreviewFrame bg="#fafaf7" padded>
      <div style={{ fontFamily: FONT, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: '#78716c' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              borderRadius: 6,
              padding: '4px 8px',
            }}
          >
            <ArrowLeft size={14} /> 知识库
          </span>
          <span style={{ color: '#d6d3d1' }}>/</span>
          <span>KB 7</span>
          <span style={{ color: '#d6d3d1' }}>/</span>
          <span style={{ color: '#44403c' }}>向量检索原理.md</span>
        </div>

        {/* 文档信息卡 */}
        <div
          style={{
            borderRadius: 12,
            border: '1px solid rgba(231,229,224,0.5)',
            background: '#fffefb',
            boxShadow: '0 1px 3px rgb(0 0 0 / 5%), 0 2px 8px rgb(0 0 0 / 3%)',
            padding: 16,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 500, color: '#1c1917', marginBottom: 8 }}>
            向量检索原理.md
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
            {['技术文档', '检索', 'RAG'].map(t => (
              <span
                key={t}
                style={{
                  borderRadius: 9999,
                  border: '1px solid #e7e5e0',
                  background: '#fafaf7',
                  padding: '2px 8px',
                  fontSize: 11,
                  color: '#57534e',
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: 11.5, color: '#a8a29e' }}>
            <span>来源 · 手动上传</span>
            <span>分段策略 · 语义切分</span>
            <span>更新 · 2026-06-10</span>
          </div>
        </div>

        {/* 切块墙 SectionCard */}
        <div
          style={{
            borderRadius: 12,
            border: '1px solid rgba(231,229,224,0.5)',
            background: '#fffefb',
            boxShadow: '0 1px 3px rgb(0 0 0 / 5%), 0 2px 8px rgb(0 0 0 / 3%)',
            padding: 20,
          }}
        >
          {/* 头：标题 + 搜索 + 共 N 块 */}
          <div
            style={{
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <h3 style={{ flexShrink: 0, fontSize: 14, fontWeight: 500, color: '#1c1917', margin: 0 }}>
              切块卡片墙
            </h3>
            <div style={{ position: 'relative', maxWidth: 280, flex: 1 }}>
              <Search
                size={14}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: 10,
                  transform: 'translateY(-50%)',
                  color: '#a8a29e',
                }}
              />
              <input
                placeholder="搜索切块内容…"
                style={{
                  width: '100%',
                  height: 32,
                  paddingLeft: 32,
                  paddingRight: 28,
                  fontSize: 12.5,
                  border: '1px solid #d6d3d1',
                  borderRadius: 6,
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: FONT,
                }}
              />
            </div>
            <span style={{ flexShrink: 0, fontSize: 11.5, color: '#78716c' }}>共 24 块</span>
          </div>

          {/* 卡片网格 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: 12,
            }}
          >
            {CHUNKS.map(c => (
              <Card key={c.seq} c={c} />
            ))}
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
