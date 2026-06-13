import { PreviewFrame } from '../../../_layout';
import {
  ArrowLeft,
  BarChart3,
  FileText,
  FlaskConical,
  KeyRound,
  Search,
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

const HITS = [
  { rank: 1, doc: '产品手册.pdf', seq: 3, score: 0.92, content: '变色龙平台支持多源模型统一聚合，直连不同的上游 provider 调用。', active: true },
  { rank: 2, doc: '产品手册.pdf', seq: 7, score: 0.78, content: '检索增强生成（RAG）先从知识库召回相关切块，再拼进 prompt 交给大模型生成答案。' },
  { rank: 3, doc: 'FAQ.md', seq: 1, score: 0.55, content: '如何配置 reranker？在知识库 collection 配置里选择 BGE 或 Cohere。' },
];

export default function KbDetailTabbedWorkbench() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: 16, fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', gap: 16, height: 560 }}>
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

        {/* RIGHT main: hit-test 3-pane */}
        <div
          style={{
            minWidth: 0,
            flex: 1,
            borderRadius: 16,
            border: '1px solid rgba(231,229,224,0.7)',
            background: '#fff',
            padding: 16,
            boxShadow: '0 1px 3px rgb(0 0 0/5%), 0 2px 8px rgb(0 0 0/3%)',
            display: 'grid',
            gridTemplateColumns: '210px minmax(0,1fr) minmax(0,1.05fr)',
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
            <button style={{ height: 34, borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}>
              <Search size={14} strokeWidth={2} /> 搜索
            </button>
          </div>

          {/* ② hit list */}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <span style={{ borderRadius: 4, background: '#fffbeb', padding: '1px 6px', fontFamily: MONO, fontSize: 10.5, color: '#b45309' }}>{h.score.toFixed(2)}</span>
                  <span style={{ height: 4, flex: 1, borderRadius: 2, background: '#f4f3ee', overflow: 'hidden' }}>
                    <span style={{ display: 'block', height: 4, width: `${h.score * 100}%`, background: '#fbbf24' }} />
                  </span>
                </div>
                <div style={{ fontSize: 12, lineHeight: 1.4, color: '#44403c', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {h.content}
                </div>
              </div>
            ))}
          </div>

          {/* ③ source view */}
          <div style={{ borderRadius: 8, border: '1px solid rgba(231,229,224,0.7)', background: '#fff', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <div style={{ borderBottom: '1px solid rgba(231,229,224,0.7)', padding: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 11.5, color: '#57534e' }}>
                <span style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>产品手册.pdf</span>
                <span style={{ marginLeft: 'auto', flexShrink: 0, fontFamily: MONO, fontSize: 10.5, color: '#a8a29e' }}>seq 3</span>
              </div>
              <div style={{ display: 'flex', gap: 6, fontSize: 10, fontFamily: MONO }}>
                <span style={{ borderRadius: 4, background: '#ecfdf5', padding: '1px 5px', color: '#047857' }}>vec 0.88</span>
                <span style={{ borderRadius: 4, background: '#eff6ff', padding: '1px 5px', color: '#1d4ed8' }}>bm25 0.61</span>
                <span style={{ borderRadius: 4, background: '#f5f3ff', padding: '1px 5px', color: '#6d28d9' }}>rerank 0.95</span>
              </div>
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: 12, fontSize: 12.5, lineHeight: 1.6, color: '#1c1917' }}>
              变色龙平台支持
              <mark style={{ background: '#fef08a', color: '#1c1917', borderRadius: 2 }}>多源模型</mark>
              统一聚合，直连不同的上游 provider 调用，统一计费、统一溯源。
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
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
