import { PreviewFrame } from '../../../_layout';
import {
  AlertCircle,
  ArrowLeft,
  Bot,
  ChevronDown,
  CircleDashed,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Sparkles,
  ThumbsUp,
} from 'lucide-react';

const MONO = 'ui-monospace, SFMono-Regular, "JetBrains Mono", monospace';

type ScoreChip =
  | { kind: 'thumbs'; up: boolean; source: 'feedback' | 'annotation' | 'eval' | 'api' }
  | { kind: 'value'; name: string; value: string; source: 'feedback' | 'annotation' | 'eval' | 'api' };

type Row = {
  depth: number;
  icon: typeof Layers;
  type: string;
  color: string;
  name: string;
  dur: number;
  pct: number;
  ok: boolean;
  tok?: number;
  selected?: boolean;
  err?: string;
  collapse?: boolean;
  scores?: ScoreChip[];
};

const TREE: Row[] = [
  { depth: 0, icon: Layers, type: 'trace', color: '#44403c', name: 'playground', dur: 3240, pct: 100, ok: true, collapse: true },
  { depth: 1, icon: Bot, type: 'agent', color: '#2563eb', name: 'rag-qa', dur: 3180, pct: 98, ok: true, collapse: true },
  { depth: 2, icon: Database, type: 'retriever', color: '#059669', name: 'product-kb', dur: 612, pct: 19, ok: true },
  { depth: 2, icon: Cpu, type: 'embedding', color: '#0891b2', name: 'bge-m3', dur: 88, pct: 3, ok: true, tok: 24 },
  {
    depth: 2, icon: Sparkles, type: 'generation', color: '#7c3aed', name: 'qwen-max', dur: 2380, pct: 73, ok: true, tok: 1842, selected: true,
    scores: [
      { kind: 'thumbs', up: true, source: 'feedback' },
      { kind: 'value', name: 'relevance', value: '0.92', source: 'eval' },
    ],
  },
  { depth: 2, icon: CircleDashed, type: 'span', color: '#78716c', name: 'post-process', dur: 96, pct: 3, ok: false, err: 'JSON parse failed' },
];

const SPANS = [
  { name: 'prompt.assemble', ms: 12, status: 'ok' },
  { name: 'llm.stream', ms: 2304, status: 'ok' },
  { name: 'usage.collect', ms: 6, status: 'ok' },
];

// ScoreBadge 按 source 配色（border 实色）
const SCORE_SOURCE: Record<ScoreChip['source'], { bg: string; fg: string; border: string }> = {
  feedback: { bg: '#ecfdf5', fg: '#047857', border: '#a7f3d0' }, // emerald-50/700/200
  annotation: { bg: '#fffbeb', fg: '#b45309', border: '#fde68a' }, // amber-50/700/200
  eval: { bg: '#f5f3ff', fg: '#6d28d9', border: '#ddd6fe' }, // violet-50/700/200
  api: { bg: '#eff6ff', fg: '#1d4ed8', border: '#bfdbfe' }, // blue-50/700/200
};

export default function TraceDetailTreeGantt() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: 16, fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* header */}
        <header style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 6, padding: '4px 8px', fontSize: 12.5, color: '#78716c' }}>
            <ArrowLeft size={14} strokeWidth={2} /> 返回
          </span>
          <span style={{ color: '#d6d3d1' }}>/</span>
          <div style={{ display: 'flex', flex: 1, alignItems: 'baseline', gap: 8 }}>
            <GitBranch size={14} strokeWidth={2} color="#78716c" style={{ alignSelf: 'center' }} />
            <span style={{ fontSize: 15, fontWeight: 500, color: '#1c1917' }}>Trace 详情</span>
            <span style={{ fontFamily: MONO, fontSize: 11, color: '#78716c' }}>req_9f3a1c8b40e2</span>
          </div>
          {/* view toggle */}
          <div style={{ display: 'inline-flex', overflow: 'hidden', borderRadius: 6, border: '1px solid rgba(231,229,224,0.7)', fontSize: 11.5 }}>
            <span style={{ padding: '4px 10px', background: '#292524', color: '#fff' }}>树视图</span>
            <span style={{ padding: '4px 10px', background: '#fff', color: '#57534e' }}>甘特图</span>
          </div>
        </header>

        {/* tree view: 2fr / 3fr */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 12 }}>
          {/* observation tree */}
          <Card>
            <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11.5, fontWeight: 500, color: '#44403c' }}>观测嵌套树</span>
              <span style={{ fontSize: 10.5, color: '#78716c' }}>
                <span style={{ fontFamily: MONO, color: '#44403c' }}>6</span> 节点 ·{' '}
                <span style={{ fontFamily: MONO, color: '#059669' }}>5</span> ok ·{' '}
                <span style={{ fontFamily: MONO, color: '#e11d48' }}>1</span> err
              </span>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 11.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {TREE.map((r, i) => (
                <div
                  key={i}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    borderRadius: 4,
                    padding: '4px 4px',
                    paddingLeft: r.depth * 14 + 4,
                    background: r.selected ? '#eff6ff' : 'transparent',
                  }}
                >
                  {r.selected && (
                    <span style={{ position: 'absolute', insetBlock: 0, left: 0, width: 3, borderTopRightRadius: 3, borderBottomRightRadius: 3, background: '#3b82f6' }} />
                  )}
                  {r.depth > 0 && (
                    <span style={{ position: 'absolute', top: 0, bottom: 0, left: (r.depth - 1) * 14 + 10, borderLeft: '1px solid rgba(231,229,224,0.8)' }} />
                  )}
                  {/* 折叠：hasChildren → chevron 按钮 -mr-1 p-0.5（h-3 w-3=12）；叶子 → -mr-1 w-4(16) 占位 */}
                  {r.collapse ? (
                    <span style={{ marginRight: -4, flexShrink: 0, borderRadius: 4, padding: 2, color: '#a8a29e', display: 'flex' }}>
                      <ChevronDown size={12} strokeWidth={2} />
                    </span>
                  ) : (
                    <span style={{ marginRight: -4, width: 16, flexShrink: 0 }} />
                  )}
                  <r.icon size={14} strokeWidth={2} color={r.ok ? r.color : '#f43f5e'} style={{ flexShrink: 0 }} />
                  <span style={{ width: 64, flexShrink: 0, fontWeight: 500, color: r.ok ? r.color : '#f43f5e' }}>{r.type}</span>
                  <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#292524' }}>
                    {r.name}
                    {r.err && (
                      <span style={{ marginLeft: 6, display: 'inline-flex', alignItems: 'center', gap: 2, color: '#f43f5e' }}>
                        <AlertCircle size={12} strokeWidth={2} />
                        {r.err}
                      </span>
                    )}
                  </span>
                  {/* scores 徽章（feedback/annotation/eval/api 各配色） */}
                  {r.scores && r.scores.length > 0 && (
                    <div style={{ display: 'flex', flexShrink: 0, alignItems: 'center', gap: 2 }}>
                      {r.scores.map((s, si) => {
                        const c = SCORE_SOURCE[s.source];
                        if (s.kind === 'thumbs') {
                          return (
                            <span key={si} style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 4, border: `1px solid ${c.border}`, background: c.bg, color: c.fg, padding: '2px 4px' }}>
                              <ThumbsUp size={12} strokeWidth={2} />
                            </span>
                          );
                        }
                        return (
                          <span key={si} style={{ display: 'inline-flex', alignItems: 'center', gap: 2, borderRadius: 4, border: `1px solid ${c.border}`, background: c.bg, color: c.fg, padding: '2px 4px', fontSize: 10 }}>
                            <span style={{ fontWeight: 500 }}>{s.name}</span>
                            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{s.value}</span>
                          </span>
                        );
                      })}
                    </div>
                  )}
                  {/* token Badge：variant=outline = rounded-md(6) border-stone-300(#d6d3d1) text-stone-700(#44403c) px-2 py-0.5 font-mono text-[10px] */}
                  {r.tok != null && (
                    <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', borderRadius: 6, border: '1px solid #d6d3d1', padding: '2px 8px', fontFamily: MONO, fontSize: 10, fontWeight: 500, color: '#44403c' }}>{r.tok} tok</span>
                  )}
                  {/* duration 块 w-32(128) + 数字 w-12(48) */}
                  <div style={{ display: 'flex', width: 128, flexShrink: 0, alignItems: 'center', gap: 6 }}>
                    <div style={{ height: 4, flex: 1, borderRadius: 9999, background: '#f5f5f4', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.max(2, r.pct)}%`, background: r.ok ? '#60a5fa' : '#fb7185' }} />
                    </div>
                    <span style={{ width: 48, textAlign: 'right', fontSize: 10.5, color: '#78716c', fontVariantNumeric: 'tabular-nums' }}>{r.dur}ms</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* node detail —— SectionCard 内直接是 type 徽标行（无标题） */}
          <Card>
            {/* badge row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: 11.5 }}>
              <Bot size={14} strokeWidth={2} color="#78716c" />
              <span style={{ borderRadius: 4, padding: '2px 6px', fontFamily: MONO, fontSize: 10.5, textTransform: 'uppercase', background: '#ecfdf5', color: '#047857' }}>generation</span>
              <span style={{ borderRadius: 4, background: '#f5f3ff', padding: '2px 6px', fontFamily: MONO, fontSize: 10.5, color: '#6d28d9' }}>qwen-max</span>
              <span style={{ fontFamily: MONO, fontSize: 11, color: '#78716c' }}>rag-qa</span>
              <span style={{ marginLeft: 'auto', fontFamily: MONO, fontSize: 10.5, color: '#78716c' }}>06-13 11:24:08</span>
            </div>
            {/* metrics */}
            <div style={{ display: 'flex', gap: 12, fontSize: 11, color: '#78716c', marginBottom: 10 }}>
              <span>duration: <span style={{ fontFamily: MONO, color: '#44403c' }}>2380ms</span></span>
              <span>tokens: <span style={{ fontFamily: MONO, color: '#44403c' }}>1842</span></span>
              <span>ttfb: <span style={{ fontFamily: MONO, color: '#44403c' }}>312ms</span></span>
            </div>

            <DetailSection title="Request payload">
              <Json>{`{
  "model": "qwen-max",
  "messages": [
    { "role": "system", "content": "你是…" },
    { "role": "user", "content": "RAG 流程是怎样的？" }
  ],
  "temperature": 0.2
}`}</Json>
            </DetailSection>

            <DetailSection title="Spans">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {SPANS.map(s => (
                  <div key={s.name} style={{ borderRadius: 4, border: '1px solid rgba(231,229,224,0.7)', background: '#fff', padding: '4px 8px', fontFamily: MONO, fontSize: 11 }}>
                    <span style={{ color: '#44403c' }}>{s.name}</span>
                    <span style={{ marginLeft: 8, color: '#78716c' }}>{s.ms}ms</span>
                    <span style={{ marginLeft: 8, borderRadius: 4, padding: '0 4px', fontSize: 10, background: '#ecfdf5', color: '#047857' }}>{s.status}</span>
                  </div>
                ))}
              </div>
            </DetailSection>
          </Card>
        </div>
      </div>
    </PreviewFrame>
  );
}

/** SectionCard !p-3：rounded-xl(16) border-stone-200/40 bg-paper shadow-soft p-3(12) */
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: '1px solid rgba(231,229,224,0.4)',
        background: '#fffefb',
        padding: 12,
        boxShadow: '0 1px 2px rgb(0 0 0/4%), 0 4px 12px rgb(0 0 0/3%)',
      }}
    >
      {children}
    </div>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ marginBottom: 4, fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#78716c' }}>{title}</div>
      {children}
    </div>
  );
}

function Json({ children }: { children: string }) {
  return (
    <pre
      style={{
        margin: 0,
        borderRadius: 6,
        border: '1px solid #f5f4ee',
        background: '#fafaf9',
        padding: 8,
        fontFamily: MONO,
        fontSize: 11,
        lineHeight: 1.5,
        color: '#57534e',
        overflow: 'auto',
        maxHeight: 150,
      }}
    >
      {children}
    </pre>
  );
}
