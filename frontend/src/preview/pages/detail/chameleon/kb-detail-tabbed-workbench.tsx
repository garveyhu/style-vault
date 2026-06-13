import { PreviewFrame } from '../../../_layout';
import {
  ArrowLeft,
  BarChart3,
  FileText,
  FlaskConical,
  KeyRound,
  Search,
  SearchX,
  Settings,
  ShieldCheck,
  Tag,
} from 'lucide-react';

const MONO = 'ui-monospace, SFMono-Regular, "JetBrains Mono", monospace';

const PRIMARY = [
  { key: 'documents', label: '文档', icon: FileText },
  { key: 'search', label: '召回测试', icon: Search, active: true },
  { key: 'overview', label: '概览', icon: BarChart3 },
];
const ADVANCED = [
  { key: 'metadata', label: '元数据', icon: Tag },
  { key: 'eval', label: '评测', icon: FlaskConical },
  { key: 'consistency', label: '一致性', icon: ShieldCheck },
  { key: 'service-api', label: '服务 API', icon: KeyRound },
  { key: 'config', label: '设置', icon: Settings },
];

interface Hit {
  rank: number;
  doc: string;
  seq: number;
  content: string;
  vec: number;
  bm25: number;
  rerank: number;
  active?: boolean;
}

const HITS: Hit[] = [
  { rank: 1, doc: '产品手册.pdf', seq: 3, content: '变色龙平台支持多源模型统一聚合，直连不同的上游 provider 调用。', vec: 0.88, bm25: 0.61, rerank: 0.95, active: true },
  { rank: 2, doc: '产品手册.pdf', seq: 7, content: '检索增强生成（RAG）先从知识库召回相关切块，再拼进 prompt 交给大模型生成答案。', vec: 0.81, bm25: 0.44, rerank: 0.72 },
  { rank: 3, doc: 'FAQ.md', seq: 1, content: '如何配置 reranker？在知识库 collection 配置里选择 BGE 或 Cohere。', vec: 0.49, bm25: 0.7, rerank: 0.58 },
];

const pct = (v: number) => Math.max(0, Math.min(100, Math.round(v * 100)));

export default function KbDetailTabbedWorkbench() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: 16, fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', gap: 16, height: 620 }}>
        {/* LEFT rail */}
        <nav style={{ width: 176, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* identity block */}
          <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8, padding: '0 4px' }}>
            <span style={{ display: 'flex', height: 24, width: 24, flexShrink: 0, alignItems: 'center', justifyContent: 'center', borderRadius: 6, color: '#a8a29e' }}>
              <ArrowLeft size={16} strokeWidth={2} />
            </span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1c1917', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>产品知识库</div>
              <div style={{ fontFamily: MONO, fontSize: 10.5, color: '#a8a29e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>product-kb</div>
            </div>
          </div>

          {PRIMARY.map(t => (
            <NavBtn key={t.key} icon={t.icon} label={t.label} active={!!t.active} />
          ))}

          <div style={{ margin: '8px 0', borderTop: '1px solid rgba(231,229,224,0.6)' }} />
          <div style={{ padding: '0 12px 4px', fontSize: 10.5, letterSpacing: '0.08em', color: '#a8a29e', textTransform: 'uppercase' }}>进阶</div>
          {ADVANCED.map(t => (
            <NavBtn key={t.key} icon={t.icon} label={t.label} active={false} />
          ))}
        </nav>

        {/* RIGHT main: hit-test 3-pane（SectionCard） */}
        <div
          style={{
            minWidth: 0,
            flex: 1,
            borderRadius: 16,
            border: '1px solid rgba(231,229,224,0.4)',
            background: '#fffefb',
            padding: 20,
            boxShadow: '0 1px 2px rgb(0 0 0/4%), 0 4px 12px rgb(0 0 0/3%)',
            display: 'grid',
            gridTemplateColumns: '260px minmax(0,1fr) minmax(0,1.05fr)',
            gap: 12,
            minHeight: 0,
          }}
        >
          {/* ① params */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 12, color: '#57534e' }}>查询语句</label>
              <div style={{ borderRadius: 8, border: '1px solid #d6d3d1', background: '#fff', padding: '8px 9px', height: 70, fontSize: 12.5, color: '#44403c' }}>
                变色龙支持哪些上游模型？
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 12, color: '#57534e' }}>
                top_k = <span style={{ fontFamily: MONO }}>6</span>
              </label>
              <div style={{ position: 'relative', height: 4, borderRadius: 2, background: '#e7e5e0' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: 4, width: '30%', borderRadius: 2, background: '#d97706' }} />
                <div style={{ position: 'absolute', left: '30%', top: -4, height: 12, width: 12, marginLeft: -6, borderRadius: '50%', background: '#d97706' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 12, color: '#57534e' }}>召回模式</label>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 32, borderRadius: 8, border: '1px solid #d6d3d1', background: '#fff', padding: '0 9px', fontSize: 12.5, color: '#44403c' }}>
                混合（向量 + 关键词）
              </div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: '#57534e' }}>
              多查询扩展
              <span style={{ display: 'inline-block', width: 28, height: 16, borderRadius: 8, background: '#d6d3d1', position: 'relative' }}>
                <span style={{ position: 'absolute', top: 2, left: 2, width: 12, height: 12, borderRadius: '50%', background: '#fff' }} />
              </span>
            </label>
            <div>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 12, color: '#57534e' }}>标签过滤（多个用逗号）</label>
              <div style={{ display: 'flex', alignItems: 'center', height: 32, borderRadius: 8, border: '1px solid #d6d3d1', background: '#fff', padding: '0 9px', fontSize: 12.5, color: '#a8a29e' }}>
                product, faq
              </div>
            </div>
            <button style={{ height: 32, borderRadius: 6, border: 'none', background: '#2563eb', color: '#fff', fontSize: 12.5, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}>
              <Search size={14} strokeWidth={2} /> 搜索
            </button>
          </div>

          {/* ② hit list（含 compact ScoreBreakdown 内联三通道百分比） */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
            {HITS.map(h => (
              <div
                key={h.rank}
                style={{
                  borderRadius: 8,
                  border: h.active ? '1px solid #fcd34d' : '1px solid rgba(231,229,224,0.7)',
                  boxShadow: h.active ? '0 0 0 1px #fde68a' : undefined,
                  background: '#fff',
                  padding: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: 11, color: '#78716c' }}>
                  <span style={{ fontFamily: MONO }}>#{h.rank}</span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{h.doc}</span>
                  <span style={{ marginLeft: 'auto', flexShrink: 0, fontFamily: MONO }}>seq {h.seq}</span>
                </div>
                {/* compact：flex flex-wrap gap-x-2.5 gap-y-0.5，每通道 short + font-mono 百分比 */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: 10, rowGap: 2 }}>
                  <CompactChan short="向量" v={h.vec} />
                  <CompactChan short="关键词" v={h.bm25} />
                  <CompactChan short="精排" v={h.rerank} />
                </div>
                <div style={{ marginTop: 6, fontSize: 12, lineHeight: 1.3, color: '#44403c', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {h.content}
                </div>
              </div>
            ))}
          </div>

          {/* ③ source view（非 compact ScoreBreakdown 横向通道条） */}
          <div style={{ borderRadius: 8, border: '1px solid rgba(231,229,224,0.7)', background: '#fff', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <div style={{ borderBottom: '1px solid rgba(231,229,224,0.7)', padding: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 11.5, color: '#57534e' }}>
                {/* doc 名是 Link hover:underline */}
                <span style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textDecoration: 'underline', textDecorationColor: 'transparent', cursor: 'pointer' }}>产品手册.pdf</span>
                <span style={{ marginLeft: 'auto', flexShrink: 0, fontFamily: MONO, fontSize: 10.5, color: '#a8a29e' }}>seq 3</span>
              </div>
              {/* 三通道横向条：label w-16 right + bar h-1.5 flex-1 + 右 pct w-9 right */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <ChannelRow label="向量相似度" v={0.88} bar="#0ea5e9" />
                <ChannelRow label="关键词匹配" v={0.61} bar="#f59e0b" />
                <ChannelRow label="精排得分" v={0.95} bar="#8b5cf6" />
              </div>
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: 12, fontSize: 12.5, lineHeight: 1.625, color: '#1c1917', whiteSpace: 'pre-wrap' }}>
              变色龙平台支持
              {/* <mark> bg-amber-100 #fef3c7 rounded(4) px-0.5(2) text-stone-900 */}
              <mark style={{ background: '#fef3c7', color: '#1c1917', borderRadius: 4, padding: '0 2px' }}>多源模型</mark>
              统一聚合，直连不同的上游 provider 调用，统一计费、统一溯源。
            </div>
          </div>
        </div>
      </div>

      {/* 其它态示意（isPending / 空态 / 未选原文）—— 完全复刻所有命中/原文状态 */}
      <div style={{ padding: '0 16px 16px', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a8a29e', marginBottom: 8 }}>命中列表 / 原文 其它态</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {/* isPending */}
          <div style={{ minHeight: 120, borderRadius: 8, border: '1px solid rgba(231,229,224,0.7)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a8a29e', fontSize: 12.5 }}>
            正在检索…
          </div>
          {/* 空态：SearchX h-8 w-8 strokeWidth 1.4 */}
          <CenteredState text="未命中任何 chunk" />
          {/* SourceView 未选 */}
          <CenteredState text="选中左侧 chunk 查看原文与分项得分" />
        </div>
      </div>
    </PreviewFrame>
  );
}

function CompactChan({ short, v }: { short: string; v: number }) {
  return (
    <span style={{ fontSize: 10.5, color: '#78716c' }}>
      {short}
      <span style={{ marginLeft: 2, fontFamily: MONO, fontVariantNumeric: 'tabular-nums', color: '#44403c' }}>{pct(v)}%</span>
    </span>
  );
}

function ChannelRow({ label, v, bar }: { label: string; v: number; bar: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ width: 64, flexShrink: 0, textAlign: 'right', fontSize: 10.5, color: '#78716c' }}>{label}</span>
      <span style={{ height: 6, flex: 1, overflow: 'hidden', borderRadius: 9999, background: '#f5f5f4' }}>
        <span style={{ display: 'block', height: '100%', borderRadius: 9999, background: bar, width: `${pct(v)}%` }} />
      </span>
      <span style={{ width: 36, flexShrink: 0, textAlign: 'right', fontFamily: MONO, fontSize: 10.5, fontVariantNumeric: 'tabular-nums', color: '#57534e' }}>{pct(v)}%</span>
    </div>
  );
}

function CenteredState({ text }: { text: string }) {
  return (
    <div style={{ minHeight: 120, borderRadius: 8, border: '1px solid rgba(231,229,224,0.7)', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#a8a29e' }}>
      <SearchX size={32} strokeWidth={1.4} color="#a8a29e" />
      <div style={{ padding: '0 16px', textAlign: 'center', fontSize: 12.5 }}>{text}</div>
    </div>
  );
}

function NavBtn({ icon: Icon, label, active }: { icon: typeof FileText; label: string; active: boolean }) {
  return (
    <button
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        gap: 10,
        borderRadius: 8,
        padding: '8px 12px',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        fontSize: 13,
        fontWeight: 500,
        background: active ? '#eff6ff' : 'transparent',
        color: active ? '#1d4ed8' : '#57534e',
      }}
    >
      <Icon size={16} strokeWidth={2} />
      {label}
    </button>
  );
}
