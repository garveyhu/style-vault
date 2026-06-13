import { PreviewFrame } from '../../../_layout';
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Copy,
  Eye,
  EyeOff,
  FileText,
  Pencil,
  RotateCcw,
  Search,
  Trash2,
  X,
} from 'lucide-react';

/**
 * kb-chunk-card-wall · 知识库切块卡片墙
 * responsive 卡片网格，每卡 #seq + tok + 正文(超 480 字截断) + hover 行内动作 + 停用弱化。
 * 文档详情头：breadcrumb + 信息卡(标题图标+状态徽标+meta+标签+元数据+右侧操作列) + 切块墙 + 分页。
 * 源码：frontend/src/system/kbs/components/chunk-card.tsx + kb-document-detail-page.tsx
 */

const FONT = 'Inter, system-ui, sans-serif';
const MONO = 'JetBrains Mono, monospace';

const SHADOW_SOFT = '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)';

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
  {
    seq: 4,
    tok: 72,
    hit: 3,
    enabled: true,
    content:
      'overlap（重叠窗口）让相邻 chunk 共享一小段文本，避免在切分边界丢失语义连贯，召回时更不易漏掉跨段答案。',
    keywords: ['overlap', '切分'],
  },
];

function Card({ c }: { c: Chunk }) {
  return (
    <div
      style={{
        borderRadius: 8,
        // 所有卡默认 border-stone-200/70；仅首卡演示 hover 态（amber-300 + shadow-sm）
        border: `1px solid ${c.seq === 1 ? '#fcd34d' : 'rgba(231,229,224,0.7)'}`,
        background: '#fff',
        padding: 12,
        opacity: c.enabled ? 1 : 0.55,
        boxShadow: c.seq === 1 ? '0 1px 2px 0 rgb(0 0 0 / 5%)' : 'none',
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
            {/* 取消 — Button size=sm variant=ghost text-stone-700 */}
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                height: 28,
                padding: '0 10px',
                background: 'transparent',
                border: 'none',
                borderRadius: 6,
                fontSize: 11.5,
                fontWeight: 500,
                color: '#44403c',
                cursor: 'pointer',
              }}
            >
              <X size={12} style={{ marginRight: 4 }} /> 取消
            </button>
            {/* 保存 — Button size=sm（primary bg-primary-600 #2563eb） */}
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                height: 28,
                padding: '0 10px',
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                fontSize: 11.5,
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
                    background: '#f5f5f4',
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

function PrimaryBtn({ children, disabled }: { children: React.ReactNode; disabled?: boolean }) {
  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        height: 28,
        padding: '0 10px',
        background: '#2563eb',
        color: '#fff',
        border: 'none',
        borderRadius: 6,
        fontSize: 11.5,
        fontWeight: 500,
        cursor: 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </button>
  );
}

function GhostBtn({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        height: 28,
        padding: '0 10px',
        background: 'transparent',
        color: '#44403c',
        border: 'none',
        borderRadius: 6,
        fontSize: 11.5,
        fontWeight: 500,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
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

        {/* 文档信息卡 — SectionCard: rounded-xl border-stone-200/40 bg-paper p-5 shadow-soft */}
        <div
          style={{
            borderRadius: 12,
            border: '1px solid rgba(231,229,224,0.4)',
            background: '#fffefb',
            boxShadow: SHADOW_SOFT,
            padding: 20,
          }}
        >
          {/* flex items-start justify-between gap-4 */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
            {/* 左列：标题区 + meta + 标签 + 元数据 */}
            <div style={{ minWidth: 0, flex: 1 }}>
              {/* 标题行：来源图标 + h2 16px + StatusBadge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#78716c', display: 'inline-flex' }}>
                  <FileText size={14} strokeWidth={1.6} />
                </span>
                <h2
                  style={{
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontSize: 16,
                    fontWeight: 500,
                    color: '#1c1917',
                  }}
                >
                  向量检索原理.md
                </h2>
                {/* StatusBadge ready = bg-emerald-50 text-emerald-700 rounded-full px-2 py-0.5 text-[10.5px] */}
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    borderRadius: 9999,
                    padding: '2px 8px',
                    fontSize: 10.5,
                    fontWeight: 500,
                    background: '#ecfdf5',
                    color: '#047857',
                  }}
                >
                  就绪
                </span>
              </div>

              {/* meta 行：类型/来源/大小/统计(mono)/创建 */}
              <div
                style={{
                  marginTop: 8,
                  display: 'flex',
                  flexWrap: 'wrap',
                  columnGap: 16,
                  rowGap: 4,
                  fontSize: 11.5,
                  color: '#78716c',
                }}
              >
                <span>类型: text/markdown</span>
                <span>来源: upload</span>
                <span>大小: 18.4 KB</span>
                <span>
                  统计:{' '}
                  <span style={{ fontVariantNumeric: 'tabular-nums', fontFamily: MONO }}>
                    24 chunks · 3,210 tokens
                  </span>
                </span>
                <span>创建: 2026-06-10 14:22</span>
              </div>

              {/* 标签 + 元数据区：mt-3 space-y-3 */}
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* 标签 label + TagEditor */}
                <div>
                  <div style={{ marginBottom: 4, fontSize: 11.5, color: '#57534e' }}>标签</div>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: 4,
                      borderRadius: 6,
                      border: '1px solid #e7e5e0',
                      background: '#fff',
                      padding: '6px 8px',
                    }}
                  >
                    {['技术文档', '检索', 'RAG'].map(t => (
                      <span
                        key={t}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          borderRadius: 9999,
                          background: '#fffbeb',
                          padding: '2px 8px',
                          fontSize: 11.5,
                          fontWeight: 500,
                          color: '#b45309',
                        }}
                      >
                        {t}
                        <span style={{ display: 'inline-flex', borderRadius: 9999, padding: 2 }}>
                          <X size={10} />
                        </span>
                      </span>
                    ))}
                    <span style={{ flex: 1, minWidth: 120, fontSize: 12.5, color: '#a8a29e' }}>
                      回车或逗号添加 tag
                    </span>
                  </div>
                </div>

                {/* 元数据 label + DocMetaFields（定义字段类型化输入 + 自由键值） */}
                <div>
                  <div style={{ marginBottom: 4, fontSize: 11.5, color: '#57534e' }}>元数据</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {/* 定义字段块：border-stone-200/70 bg-stone-50/40 p-2.5 space-y-2 */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                        borderRadius: 6,
                        border: '1px solid rgba(231,229,224,0.7)',
                        background: 'rgba(250,250,249,0.4)',
                        padding: 10,
                      }}
                    >
                      {[
                        { label: '部门', value: '研发中心' },
                        { label: '版本', value: 'v2.3' },
                      ].map(f => (
                        <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <label
                            style={{
                              width: 80,
                              flexShrink: 0,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              fontSize: 11.5,
                              color: '#57534e',
                            }}
                          >
                            {f.label}
                          </label>
                          <input
                            defaultValue={f.value}
                            style={{
                              flex: 1,
                              height: 28,
                              fontSize: 12,
                              borderRadius: 6,
                              border: '1px solid #e7e5e0',
                              background: '#fff',
                              padding: '0 8px',
                              outline: 'none',
                              boxSizing: 'border-box',
                              fontFamily: FONT,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize: 10.5, color: '#a8a29e' }}>其他元数据（自由键值）</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 右列：两个堆叠按钮 重新分块(ghost+RotateCcw) / 保存修改(primary) */}
            <div style={{ display: 'flex', flexShrink: 0, flexDirection: 'column', gap: 8 }}>
              <GhostBtn>
                <RotateCcw size={14} style={{ marginRight: 6 }} />
                重新分块
              </GhostBtn>
              <PrimaryBtn disabled>保存修改</PrimaryBtn>
            </div>
          </div>
        </div>

        {/* 切块墙 SectionCard */}
        <div
          style={{
            borderRadius: 12,
            border: '1px solid rgba(231,229,224,0.4)',
            background: '#fffefb',
            boxShadow: SHADOW_SOFT,
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
                defaultValue="overlap"
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
              {/* 有输入时右侧 X 清除按钮 */}
              <button
                title="清除"
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: 8,
                  transform: 'translateY(-50%)',
                  display: 'inline-flex',
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  color: '#a8a29e',
                  cursor: 'pointer',
                }}
              >
                <X size={14} />
              </button>
            </div>
            <span style={{ flexShrink: 0, fontSize: 11.5, color: '#78716c' }}>命中 4 块</span>
          </div>

          {/* 卡片网格：1/2/3 响应式（展品取 xl:3 列） */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 12,
            }}
          >
            {CHUNKS.map(c => (
              <Card key={c.seq} c={c} />
            ))}
          </div>

          {/* TablePagination */}
          <div
            style={{
              marginTop: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 11.5,
              color: '#78716c',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>1–12 / 24</span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: 28,
                  minWidth: 80,
                  padding: '0 8px',
                  borderRadius: 6,
                  border: '1px solid #e7e5e0',
                  background: '#fff',
                  fontSize: 11.5,
                  color: '#44403c',
                }}
              >
                12 条/页
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ display: 'inline-flex', borderRadius: 4, padding: 4, opacity: 0.3 }}>
                <ChevronsLeft size={14} />
              </span>
              <span style={{ display: 'inline-flex', borderRadius: 4, padding: 4, opacity: 0.3 }}>
                <ChevronLeft size={14} />
              </span>
              <span style={{ fontVariantNumeric: 'tabular-nums', fontFamily: MONO, padding: '0 4px' }}>
                1 / 2
              </span>
              <span style={{ display: 'inline-flex', borderRadius: 4, padding: 4 }}>
                <ChevronRight size={14} />
              </span>
              <span style={{ display: 'inline-flex', borderRadius: 4, padding: 4 }}>
                <ChevronsRight size={14} />
              </span>
              <span style={{ marginLeft: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span>跳至</span>
                <span
                  style={{
                    display: 'inline-flex',
                    justifyContent: 'center',
                    width: 32,
                    height: 22,
                    borderBottom: '1px dashed #d6d3d1',
                    fontVariantNumeric: 'tabular-nums',
                    fontFamily: MONO,
                    fontSize: 11.5,
                    fontWeight: 500,
                    color: '#292524',
                  }}
                >
                  1
                </span>
                <span>页</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
