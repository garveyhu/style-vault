import { PreviewFrame } from '../../../_layout';
import {
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  GitCompare,
  Sparkles,
  X,
} from 'lucide-react';

const MONO = 'ui-monospace, SFMono-Regular, "JetBrains Mono", monospace';

const scoreBg = (s: number | null): [string, string] =>
  s == null ? ['#f5f4ee', '#a8a29e'] : s >= 0.8 ? ['#ecfdf5', '#047857'] : s >= 0.5 ? ['#fffbeb', '#b45309'] : ['#fef2f2', '#b91c1c'];
const scoreColor = (s: number | null): string =>
  s == null ? '#a8a29e' : s >= 0.8 ? '#059669' : s >= 0.5 ? '#d97706' : '#dc2626';

const RUNS = [
  { name: 'baseline v1', score: 0.71, status: '成功', dot: '#34d399', t: '06-10 14:02', active: false },
  { name: 'rerank 接入', score: 0.82, status: '成功', dot: '#34d399', t: '06-11 09:31', active: true, opt: false },
  { name: '优化提示词 v2', score: 0.88, status: '成功', dot: '#34d399', t: '06-12 16:48', active: false, opt: true, fromOpt: true },
  { name: 'temp=0.2', score: 0.46, status: '失败', dot: '#fb7185', t: '06-12 18:10', active: false },
];

const SAMPLES = [
  { input: '变色龙平台支持哪些上游模型？', actual: '支持 OpenAI / Anthropic / 通义 / 本地 ComfyUI 等多源聚合直连。', score: 0.93, dur: 842 },
  { input: 'RAG 的检索增强流程是怎样的？', actual: '先从知识库召回相关切块，再拼进 prompt 交给大模型生成答案。', score: 0.81, dur: 1204, verdict: 'Good' },
  { input: '如何配置 reranker？', actual: '在 collection 配置里选择 BGE 或 Cohere 重排器即可。', score: 0.55, dur: 967 },
  { input: '雪花 ID 为什么要用字符串？', actual: '因为 64 位超过 JS MAX_SAFE_INTEGER，Number() 会丢精度。', score: 0.34, dur: 1530, err: true },
];

const BUCKETS = [
  { label: '0.0', h: 18, c: '#fca5a5' },
  { label: '0.2', h: 26, c: '#fca5a5' },
  { label: '0.4', h: 44, c: '#fca5a5' },
  { label: '0.6', h: 60, c: '#fcd34d' },
  { label: '0.8', h: 86, c: '#6ee7b7' },
  { label: '1.0', h: 70, c: '#6ee7b7' },
];

export default function EvalRunDetailMasterDetail() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: '14px 16px', fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 12, height: 560 }}>
        {/* breadcrumb header */}
        <header style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 6, padding: '4px 8px', fontSize: 12.5, color: '#78716c' }}>
            <ArrowLeft size={14} strokeWidth={2} /> QA 评测集
          </span>
          <span style={{ color: '#d6d3d1' }}>/</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#1c1917' }}>运行详情</span>
        </header>

        {/* main 3-pane card */}
        <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden', borderRadius: 12, border: '1px solid #e7e5e0', background: '#fff' }}>
          {/* LEFT rail */}
          <aside style={{ display: 'flex', flexDirection: 'column', width: 244, flexShrink: 0, borderRight: '1px solid #e7e5e0', background: '#fff' }}>
            <div style={{ borderBottom: '1px solid #e7e5e0', padding: '10px 12px', fontSize: 12, fontWeight: 500, color: '#44403c' }}>运行（4）</div>
            <div style={{ flex: 1, overflow: 'auto', padding: '4px 0' }}>
              {RUNS.map(r => (
                <div
                  key={r.name}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    borderLeft: `2px solid ${r.active ? '#292524' : 'transparent'}`,
                    background: r.active ? '#fafaf9' : 'transparent',
                    padding: '8px 12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 6, height: 6, flexShrink: 0, borderRadius: '50%', background: r.dot }} />
                    <span style={{ flex: 1, fontSize: 12.5, fontWeight: r.active ? 500 : 400, color: r.active ? '#1c1917' : '#44403c', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {r.name}
                    </span>
                    {r.opt && <Sparkles size={12} strokeWidth={2} color="#a78bfa" />}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 12 }}>
                    {r.fromOpt && (
                      <span style={{ borderRadius: 3, background: '#f5f3ff', padding: '0 4px', fontSize: 9, color: '#6d28d9' }}>优化产物</span>
                    )}
                    <span style={{ fontFamily: MONO, fontSize: 11, color: scoreColor(r.score) }}>{r.score.toFixed(2)}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 10, color: '#a8a29e' }}>{r.status}</span>
                  </div>
                  <div style={{ paddingLeft: 12, fontSize: 9.5, color: '#a8a29e' }}>{r.t}</div>
                </div>
              ))}
            </div>
          </aside>

          {/* MIDDLE detail */}
          <main style={{ minWidth: 0, flex: 1, background: '#fffefb', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <header style={{ borderBottom: '1px solid #e7e5e0', padding: '14px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h2 style={{ fontSize: 16, fontWeight: 500, color: '#1c1917', margin: 0 }}>rerank 接入</h2>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 6, background: '#fafaf9', padding: '4px 8px', fontSize: 11, color: '#44403c' }}>
                    <GitCompare size={14} strokeWidth={2} /> 对比上一版本
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 6, background: '#f5f3ff', padding: '4px 8px', fontSize: 11, color: '#6d28d9' }}>
                    <Sparkles size={14} strokeWidth={2} /> 智能优化
                  </span>
                </div>
              </div>
              <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, fontSize: 11.5, color: '#78716c' }}>
                <span style={{ borderRadius: 5, border: '1px solid #d1fae5', background: '#ecfdf5', padding: '1px 7px', fontSize: 10.5, color: '#047857' }}>成功</span>
                <span>评分器 LLM 裁判</span>
                <span>· 模型 qwen-max</span>
                <span>· 均分 <span style={{ fontFamily: MONO, fontWeight: 500, color: '#44403c' }}>0.82</span></span>
              </div>
            </header>

            <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* config collapsed */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12.5, fontWeight: 500, color: '#292524' }}>
                <ChevronRight size={14} strokeWidth={2} color="#a8a29e" /> 评估配置
              </div>

              {/* score distribution */}
              <div>
                <div style={{ marginBottom: 12, fontSize: 12.5, fontWeight: 500, color: '#292524' }}>
                  分数分布
                  <span style={{ marginLeft: 8, fontSize: 10.5, fontWeight: 400, color: '#a8a29e' }}>点击柱子可筛选下方样本</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 96, paddingLeft: 4 }}>
                  {BUCKETS.map(b => (
                    <div key={b.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, flex: 1 }}>
                      <div style={{ width: '100%', maxWidth: 38, height: b.h, background: b.c, borderRadius: 3, opacity: 0.85 }} />
                      <span style={{ fontFamily: MONO, fontSize: 9, color: '#a8a29e' }}>{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* sample table */}
              <div>
                <div style={{ marginBottom: 12, fontSize: 12.5, fontWeight: 500, color: '#292524' }}>样本明细（4）</div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11.5 }}>
                  <thead>
                    <tr style={{ fontSize: 10.5, color: '#a8a29e', textAlign: 'left' }}>
                      <th style={{ padding: '6px 6px', fontWeight: 500 }}>输入</th>
                      <th style={{ padding: '6px 6px', fontWeight: 500 }}>模型回答</th>
                      <th style={{ padding: '6px 6px', fontWeight: 500, textAlign: 'right' }}>分数</th>
                      <th style={{ padding: '6px 6px', fontWeight: 500, textAlign: 'right' }}>耗时</th>
                      <th style={{ width: 28 }} />
                    </tr>
                  </thead>
                  <tbody>
                    {SAMPLES.map((s, i) => {
                      const [bg, fg] = scoreBg(s.score);
                      return (
                        <tr key={i} style={{ borderTop: '1px solid #f5f4ee', position: 'relative' }}>
                          <td style={{ padding: '8px 6px', maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#57534e', borderLeft: i === 1 ? '3px solid #44403c' : '3px solid transparent' }}>
                            {s.input}
                          </td>
                          <td style={{ padding: '8px 6px', maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#44403c' }}>{s.actual}</td>
                          <td style={{ padding: '8px 6px', textAlign: 'right' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
                              {s.verdict && (
                                <span style={{ borderRadius: 3, border: '1px solid #d1fae5', padding: '0 4px', fontSize: 10, color: '#047857' }}>{s.verdict}</span>
                              )}
                              <span style={{ borderRadius: 4, padding: '2px 6px', fontSize: 10.5, fontFamily: MONO, background: bg, color: fg }}>{s.score.toFixed(2)}</span>
                            </span>
                          </td>
                          <td style={{ padding: '8px 6px', textAlign: 'right', fontFamily: MONO, fontSize: 11, color: '#a8a29e' }}>{s.dur}ms</td>
                          <td style={{ padding: '8px 6px', textAlign: 'center', color: s.err ? '#f43f5e' : 'transparent', fontSize: 10 }}>●</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </main>

          {/* RIGHT overlay: sample detail */}
          <aside style={{ display: 'flex', flexDirection: 'column', width: 420, flexShrink: 0, borderLeft: '1px solid #e7e5e0', background: '#fffefb' }}>
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e7e5e0', padding: '12px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: MONO, fontSize: 10.5, color: '#a8a29e' }}>样本 …a3f9c1</span>
                <span style={{ borderRadius: 4, padding: '2px 6px', fontSize: 10.5, fontFamily: MONO, background: '#ecfdf5', color: '#047857' }}>0.81</span>
                <span style={{ fontSize: 10.5, color: '#a8a29e' }}>1204ms</span>
              </div>
              <X size={14} strokeWidth={2} color="#a8a29e" />
            </header>
            <div style={{ flex: 1, overflow: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 4, borderRadius: 6, background: '#f0f9ff', padding: '4px 8px', fontSize: 11, color: '#0369a1' }}>
                <ExternalLink size={14} strokeWidth={2} /> 查看调用 trace
              </span>
              <Field label="输入" color="#78716c" body="RAG 的检索增强流程是怎样的？" mono />
              <Field label="理想回答" color="#059669" body="先从知识库召回相关切块，再把片段拼进 prompt 交给大模型生成答案。" mono />
              <Field label="模型回答" color="#0284c7" body="先从知识库召回相关切块，再拼进 prompt 交给大模型生成答案。" mono />
              <div>
                <div style={{ marginBottom: 4, fontSize: 10.5, color: '#78716c' }}>评分理由</div>
                <p style={{ margin: 0, borderRadius: 4, border: '1px solid #e7e5e0', background: '#fff', padding: '6px 8px', fontSize: 11.5, lineHeight: 1.5, color: '#44403c' }}>
                  回答覆盖召回 + 拼接 + 生成三步，准确但略简，未提及 rerank 重排，扣 0.19。
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </PreviewFrame>
  );
}

function Field({ label, color, body, mono }: { label: string; color: string; body: string; mono?: boolean }) {
  return (
    <div>
      <div style={{ marginBottom: 4, fontSize: 10.5, color }}>{label}</div>
      <div
        style={{
          borderRadius: 6,
          border: '1px solid #e7e5e0',
          background: '#fafaf9',
          padding: '8px 9px',
          fontSize: 11.5,
          lineHeight: 1.5,
          color: '#44403c',
          fontFamily: mono ? MONO : undefined,
          whiteSpace: 'pre-wrap',
        }}
      >
        {body}
      </div>
    </div>
  );
}
