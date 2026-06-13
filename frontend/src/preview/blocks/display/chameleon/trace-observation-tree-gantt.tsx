import { PreviewFrame } from '../../../_layout';
import {
  AlertCircle,
  Bot,
  ChevronDown,
  CircleDashed,
  Cpu,
  Database,
  Layers,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
  ThumbsUp,
  Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * trace-observation-tree-gantt · Trace 观测树 + 甘特双视图
 * 树：9 类 observation icon+色 / 14px 缩进竖向 guide / 选中蓝竖条 / duration 条+ms。
 * 甘特：label sticky-left + ruler + bar 按 type 着色叠 cost/token。
 * LangFuse/LangSmith 范式。
 * 源码：observation-tree.tsx + gantt-bar.tsx + trace-gantt.tsx + cost-label.tsx
 */

const MONO = 'JetBrains Mono, monospace';

// 树：type → icon + 文字色
const TREE: Record<string, { icon: LucideIcon; color: string }> = {
  trace: { icon: Layers, color: '#44403c' },
  span: { icon: CircleDashed, color: '#78716c' },
  generation: { icon: Sparkles, color: '#7c3aed' },
  agent: { icon: Bot, color: '#2563eb' },
  tool: { icon: Wrench, color: '#ea580c' },
  retriever: { icon: Database, color: '#059669' },
  evaluator: { icon: ShieldCheck, color: '#d97706' },
  embedding: { icon: Cpu, color: '#0891b2' },
  guardrail: { icon: ShieldCheck, color: '#e11d48' },
};

// 甘特：type → bar 底色
const BAR_COLOR: Record<string, string> = {
  trace: '#a8a29e',
  span: '#38bdf8',
  generation: '#a78bfa',
  agent: '#818cf8',
  tool: '#fbbf24',
  retriever: '#2dd4bf',
  evaluator: '#e879f9',
  embedding: '#22d3ee',
  guardrail: '#fda4af',
};

interface Node {
  type: string;
  name: string;
  depth: number;
  durationMs: number;
  total: number; // 父总时长
  success: boolean;
  error?: string;
  tok?: number;
  score?: { name: string; value: string; thumb?: boolean };
}

const NODES: Node[] = [
  { type: 'trace', name: 'advisor-chat-run', depth: 0, durationMs: 4120, total: 4120, success: true },
  { type: 'agent', name: 'advisor_demo', depth: 1, durationMs: 4020, total: 4120, success: true },
  { type: 'retriever', name: 'kb_search', depth: 2, durationMs: 412, total: 4120, success: true },
  { type: 'embedding', name: 'bge-m3', depth: 3, durationMs: 88, total: 4120, success: true },
  {
    type: 'generation',
    name: 'qwen-max',
    depth: 2,
    durationMs: 2980,
    total: 4120,
    success: true,
    tok: 1842,
    score: { name: 'thumbs', value: '', thumb: true },
  },
  { type: 'tool', name: 'sql_query', depth: 2, durationMs: 220, total: 4120, success: false, error: 'connection timeout' },
  {
    type: 'evaluator',
    name: 'faithfulness',
    depth: 2,
    durationMs: 540,
    total: 4120,
    success: true,
    score: { name: '准确', value: '0.92' },
  },
];

// 甘特行（含几何 left/width）
const GANTT: { node: Node; leftPct: number; widthPct: number; selected?: boolean }[] = [
  { node: NODES[0], leftPct: 0, widthPct: 100 },
  { node: NODES[1], leftPct: 1, widthPct: 97 },
  { node: NODES[2], leftPct: 2, widthPct: 10 },
  { node: NODES[3], leftPct: 2.5, widthPct: 2.1 },
  { node: NODES[4], leftPct: 14, widthPct: 72, selected: true },
  { node: NODES[5], leftPct: 87, widthPct: 5.3 },
  { node: NODES[6], leftPct: 88, widthPct: 13 },
];

const LABEL_W = 210;
const ROW_H = 30;

export default function TraceObservationTreeGantt() {
  const selectedTreeIdx = 4; // generation 行选中

  return (
    <PreviewFrame bg="#fafaf7" padded>
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* ===== ① 观测树 ===== */}
        <div>
          <div style={{ marginBottom: 6, fontSize: 11, color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            观测树视图
          </div>
          <div
            style={{
              borderRadius: 8,
              border: '1px solid rgba(231,229,224,0.6)',
              background: '#fffefb',
              padding: 8,
              fontFamily: MONO,
              fontSize: 11.5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {NODES.map((n, i) => {
              const t = TREE[n.type];
              const Icon = t.icon;
              const selected = i === selectedTreeIdx;
              const widthPct = Math.max(2, Math.min(100, (n.durationMs / n.total) * 100));
              return (
                <div
                  key={i}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    borderRadius: 4,
                    padding: '4px 4px',
                    paddingLeft: n.depth * 14 + 4,
                    background: selected ? '#eff6ff' : 'transparent',
                  }}
                >
                  {selected && (
                    <span
                      style={{ position: 'absolute', insetBlock: 0, left: 0, width: 3, borderRadius: '0 2px 2px 0', background: '#3b82f6' }}
                    />
                  )}
                  {/* depth guide line */}
                  {n.depth > 0 && (
                    <span
                      style={{
                        pointerEvents: 'none',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        borderLeft: '1px solid rgba(231,229,224,0.8)',
                        left: (n.depth - 1) * 14 + 10,
                      }}
                    />
                  )}
                  {/* 折叠占位 */}
                  <span style={{ width: 16, flexShrink: 0, display: 'inline-flex' }}>
                    {(i === 0 || i === 1) && <ChevronDown size={12} color="#a8a29e" />}
                  </span>
                  <Icon size={14} color={n.success ? t.color : '#f43f5e'} style={{ flexShrink: 0 }} />
                  <span style={{ width: 64, flexShrink: 0, fontWeight: 500, color: t.color }}>{n.type}</span>
                  {/* 名称 + 失败 */}
                  <span
                    style={{
                      minWidth: 0,
                      flex: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      color: '#292524',
                    }}
                  >
                    {n.name}
                    {!n.success && (
                      <span style={{ marginLeft: 6, display: 'inline-flex', alignItems: 'center', gap: 2, color: '#f43f5e' }}>
                        <AlertCircle size={12} />
                        {n.error}
                      </span>
                    )}
                  </span>
                  {/* scores 徽章 */}
                  {n.score && (
                    <span
                      style={{
                        flexShrink: 0,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 2,
                        borderRadius: 4,
                        border: `1px solid ${n.score.thumb ? '#a7f3d0' : '#ddd6fe'}`,
                        background: n.score.thumb ? '#ecfdf5' : '#f5f3ff',
                        color: n.score.thumb ? '#047857' : '#6d28d9',
                        padding: '1px 4px',
                        fontSize: 10,
                      }}
                    >
                      {n.score.thumb ? (
                        <ThumbsUp size={12} />
                      ) : (
                        <>
                          <span style={{ fontWeight: 500 }}>{n.score.name}</span>
                          <span style={{ fontVariantNumeric: 'tabular-nums' }}>{n.score.value}</span>
                        </>
                      )}
                    </span>
                  )}
                  {/* token Badge */}
                  {n.tok && (
                    <span
                      style={{
                        flexShrink: 0,
                        borderRadius: 4,
                        border: '1px solid #d6d3d1',
                        padding: '1px 5px',
                        fontFamily: MONO,
                        fontSize: 10,
                        color: '#57534e',
                      }}
                    >
                      {n.tok.toLocaleString()} tok
                    </span>
                  )}
                  {/* duration 条 + 数字 */}
                  <div style={{ display: 'flex', width: 128, flexShrink: 0, alignItems: 'center', gap: 6 }}>
                    <div style={{ height: 4, flex: 1, overflow: 'hidden', borderRadius: 9999, background: '#f4f3ee' }}>
                      <div
                        style={{ height: '100%', background: n.success ? '#60a5fa' : '#fb7185', width: `${widthPct}%` }}
                      />
                    </div>
                    <span
                      style={{
                        width: 48,
                        textAlign: 'right',
                        fontVariantNumeric: 'tabular-nums',
                        fontSize: 10.5,
                        color: '#78716c',
                      }}
                    >
                      {n.durationMs}ms
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== ② 甘特时间轴 ===== */}
        <div>
          <div style={{ marginBottom: 6, fontSize: 11, color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            甘特时间轴视图
          </div>
          {/* 缩放工具条 */}
          <div
            style={{
              marginBottom: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 4,
              color: '#78716c',
            }}
          >
            <button style={{ borderRadius: 4, padding: 2, background: 'transparent', border: 'none', cursor: 'pointer', display: 'inline-flex' }}>
              <Minus size={14} color="#78716c" />
            </button>
            <span style={{ width: 40, textAlign: 'center', fontFamily: MONO, fontSize: 10.5, fontVariantNumeric: 'tabular-nums' }}>
              100%
            </span>
            <button style={{ borderRadius: 4, padding: 2, background: 'transparent', border: 'none', cursor: 'pointer', display: 'inline-flex' }}>
              <Plus size={14} color="#78716c" />
            </button>
          </div>

          <div
            style={{
              borderRadius: 8,
              border: '1px solid rgba(231,229,224,0.6)',
              background: '#fffefb',
              overflow: 'hidden',
            }}
          >
            {/* ruler */}
            <div style={{ display: 'flex', height: 24 }}>
              <div style={{ width: LABEL_W, flexShrink: 0, fontSize: 10.5, color: '#a8a29e', display: 'flex', alignItems: 'center', paddingLeft: 6 }}>
                时间轴
              </div>
              <div style={{ position: 'relative', flex: 1, borderBottom: '1px solid rgba(231,229,224,0.7)' }}>
                {[0, 1030, 2060, 3090, 4120].map((ms, i, arr) => (
                  <span
                    key={ms}
                    style={{
                      position: 'absolute',
                      top: 4,
                      left: `${(ms / 4120) * 100}%`,
                      transform: i === arr.length - 1 ? 'translateX(-100%)' : undefined,
                      fontFamily: MONO,
                      fontSize: 9.5,
                      color: '#a8a29e',
                    }}
                  >
                    {ms === 0 ? '0ms' : `${(ms / 1000).toFixed(1)}s`}
                  </span>
                ))}
              </div>
            </div>

            {/* body 行 */}
            <div>
              {GANTT.map((g, i) => {
                const n = g.node;
                const color = n.success ? BAR_COLOR[n.type] : '#f43f5e';
                const labelOnRight = g.leftPct + g.widthPct < 82;
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'stretch',
                      borderBottom: '1px solid #f1f0eb',
                      height: ROW_H,
                      background: g.selected ? 'rgba(254,243,199,0.6)' : '#fff',
                    }}
                  >
                    {/* label 列 sticky-left */}
                    <div
                      style={{
                        width: LABEL_W,
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: '0 6px',
                        paddingLeft: 6 + n.depth * 12,
                        background: g.selected ? 'rgba(254,243,199,0.95)' : '#fff',
                      }}
                    >
                      <span style={{ width: 16, flexShrink: 0 }} />
                      <span
                        style={{
                          flexShrink: 0,
                          borderRadius: 4,
                          padding: '1px 4px',
                          fontFamily: MONO,
                          fontSize: 9,
                          textTransform: 'uppercase',
                          background: n.success ? '#f4f3ee' : '#fef2f2',
                          color: n.success ? '#78716c' : '#e11d48',
                        }}
                      >
                        {n.type.slice(0, 4)}
                      </span>
                      <span
                        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 11, color: '#44403c' }}
                      >
                        {n.name}
                      </span>
                    </div>
                    {/* 时间区 */}
                    <div style={{ position: 'relative', flex: 1 }}>
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          height: 14,
                          transform: 'translateY(-50%)',
                          borderRadius: 3,
                          background: color,
                          left: `${g.leftPct}%`,
                          width: `${g.widthPct}%`,
                          boxShadow: g.selected ? '0 0 0 2px #fff, 0 0 0 4px #292524' : 'none',
                        }}
                      >
                        {g.widthPct > 12 && (
                          <span
                            style={{
                              display: 'flex',
                              height: '100%',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '0 4px',
                              fontFamily: MONO,
                              fontSize: 9.5,
                              color: 'rgba(255,255,255,0.9)',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {n.durationMs >= 1000 ? `${(n.durationMs / 1000).toFixed(1)}s` : `${n.durationMs}ms`}
                          </span>
                        )}
                      </div>
                      {/* CostLabel：generation 有成本绿色 / 其它 token 灰 */}
                      <span
                        style={{
                          position: 'absolute',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          whiteSpace: 'nowrap',
                          padding: '0 6px',
                          fontFamily: MONO,
                          fontSize: 10,
                          fontVariantNumeric: 'tabular-nums',
                          color: n.tok ? '#047857' : '#a8a29e',
                          ...(labelOnRight
                            ? { left: `${g.leftPct + g.widthPct}%` }
                            : { right: `${100 - g.leftPct}%` }),
                        }}
                      >
                        {n.tok ? '$0.0182' : ''}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
