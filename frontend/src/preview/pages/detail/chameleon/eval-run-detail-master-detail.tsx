import { PreviewFrame } from '../../../_layout';
import {
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  GitCompare,
  Sparkles,
  Star,
  X,
} from 'lucide-react';

const MONO = 'ui-monospace, SFMono-Regular, "JetBrains Mono", monospace';

const scoreBg = (s: number | null): [string, string] =>
  s == null ? ['#f5f5f4', '#a8a29e'] : s >= 0.8 ? ['#ecfdf5', '#047857'] : s >= 0.5 ? ['#fffbeb', '#b45309'] : ['#fef2f2', '#b91c1c'];
const scoreColor = (s: number | null): string =>
  s == null ? '#a8a29e' : s >= 0.8 ? '#059669' : s >= 0.5 ? '#d97706' : '#dc2626';

const RUNS = [
  { name: 'baseline v1', score: 0.71, status: '成功', dot: '#34d399', t: '06-10 14:02', active: false },
  { name: 'rerank 接入', score: 0.82, status: '成功', dot: '#34d399', t: '06-11 09:31', active: true, opt: false },
  { name: '优化提示词 v2', score: 0.88, status: '成功', dot: '#34d399', t: '06-12 16:48', active: false, opt: true, fromOpt: true },
  { name: 'temp=0.2', score: 0.46, status: '失败', dot: '#fb7185', t: '06-12 18:10', active: false },
];

const SAMPLES = [
  { input: '变色龙平台支持哪些上游模型？', actual: '支持 OpenAI / Anthropic / 通义 / 本地 ComfyUI 等多源聚合直连。', score: 0.93, dur: 842, selected: false },
  { input: 'RAG 的检索增强流程是怎样的？', actual: '先从知识库召回相关切块，再拼进 prompt 交给大模型生成答案。', score: 0.81, dur: 1204, verdict: '好', selected: true },
  { input: '如何配置 reranker？', actual: '在 collection 配置里选择 BGE 或 Cohere 重排器即可。', score: 0.55, dur: 967, selected: false },
  { input: '雪花 ID 为什么要用字符串？', actual: '因为 64 位超过 JS MAX_SAFE_INTEGER，Number() 会丢精度。', score: 0.34, dur: 1530, err: true, selected: false },
];

// 单 metric 直方图桶：6 桶 [0,0.2)...[0.8,1]，count 高度归一；选中桶 active、其余 dimmed
const BUCKETS = [
  { low: 0.0, count: 2 },
  { low: 0.2, count: 3 },
  { low: 0.4, count: 5 },
  { low: 0.6, count: 7 },
  { low: 0.8, count: 10 },
  { low: 1.0, count: 8 },
];
const bucketColor = (low: number): string => (low < 0.5 ? '#fca5a5' : low < 0.8 ? '#fcd34d' : '#6ee7b7');

export default function EvalRunDetailMasterDetail() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: '14px 16px', fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 12, height: 620 }}>
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
                      <span style={{ borderRadius: 6, background: '#f5f3ff', padding: '0 4px', fontSize: 9, fontWeight: 500, color: '#6d28d9' }}>优化产物</span>
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
                {/* Badge variant=outline（border stone-300）+ bg-emerald-50 text-emerald-700 覆盖 */}
                <span style={{ borderRadius: 6, border: '1px solid #d6d3d1', background: '#ecfdf5', padding: '1px 7px', fontSize: 10.5, fontWeight: 500, color: '#047857' }}>成功</span>
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
                {/* 单 metric 直方图（MetricHist） */}
                <MetricHist name="回答正确性" mean={0.78} buckets={BUCKETS} selectedLow={0.8} />
              </div>

              {/* sample table —— DataTable 壳 + leftBar 独立 4px 列 */}
              <div>
                <div style={{ marginBottom: 12, fontSize: 12.5, fontWeight: 500, color: '#292524' }}>样本明细（4）</div>
                <div style={{ borderRadius: 8, border: '1px solid rgba(231,229,224,0.6)', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', fontSize: 12.5 }}>
                    <colgroup>
                      <col style={{ width: 4 }} />
                      <col />
                      <col />
                      <col style={{ width: 96 }} />
                      <col style={{ width: 68 }} />
                      <col style={{ width: 32 }} />
                    </colgroup>
                    <thead style={{ borderBottom: '1px solid rgba(231,229,224,0.7)' }}>
                      <tr style={{ fontSize: 11, fontWeight: 500, color: '#a8a29e', textAlign: 'left' }}>
                        <th style={{ padding: 0 }} />
                        <th style={{ padding: '10px 12px', fontWeight: 500 }}>输入</th>
                        <th style={{ padding: '10px 12px', fontWeight: 500 }}>模型回答</th>
                        <th style={{ padding: '10px 12px', fontWeight: 500, textAlign: 'right' }}>分数</th>
                        <th style={{ padding: '10px 12px', fontWeight: 500, textAlign: 'right' }}>耗时</th>
                        <th style={{ padding: '10px 12px' }} />
                      </tr>
                    </thead>
                    <tbody>
                      {SAMPLES.map((s, i) => {
                        const [bg, fg] = scoreBg(s.score);
                        return (
                          <tr key={i} style={{ borderTop: i ? '1px solid #f5f5f4' : 'none', background: s.selected ? '#fafafa' : 'transparent' }}>
                            {/* leftBar 独立 4px 列：选中 bg-stone-700 */}
                            <td style={{ padding: 0, position: 'relative' }}>
                              <span style={{ position: 'absolute', insetBlock: 0, left: 0, width: 4, background: s.selected ? '#44403c' : 'transparent' }} />
                            </td>
                            <td style={{ padding: '12px 12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 11.5, color: '#57534e' }}>
                              {s.input}
                            </td>
                            <td style={{ padding: '12px 12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 11.5, color: '#44403c' }}>{s.actual}</td>
                            <td style={{ padding: '12px 12px', textAlign: 'right' }}>
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
                                {/* verdict Badge variant=success：实底 emerald-100/emerald-800 rounded-md px-1 py-0 text-[10px] */}
                                {s.verdict && (
                                  <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 6, border: '1px solid transparent', background: '#d1fae5', padding: '0 4px', fontSize: 10, fontWeight: 500, color: '#065f46' }}>{s.verdict}</span>
                                )}
                                <span style={{ borderRadius: 4, padding: '2px 6px', fontSize: 10.5, background: bg, color: fg }}>{s.score.toFixed(2)}</span>
                              </span>
                            </td>
                            <td style={{ padding: '12px 12px', textAlign: 'right', fontFamily: MONO, fontSize: 11, color: '#a8a29e' }}>{s.dur}ms</td>
                            <td style={{ padding: '12px 12px', textAlign: 'center', color: s.err ? '#f43f5e' : 'transparent', fontSize: 10 }}>●</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>

          {/* RIGHT overlay: sample detail */}
          <aside style={{ display: 'flex', flexDirection: 'column', width: 420, flexShrink: 0, borderLeft: '1px solid #e7e5e0', background: '#fffefb' }}>
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e7e5e0', padding: '12px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: MONO, fontSize: 10.5, color: '#a8a29e' }}>样本 …a3f9c1</span>
                <span style={{ borderRadius: 4, padding: '2px 6px', fontSize: 10.5, background: '#ecfdf5', color: '#047857' }}>0.81</span>
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
              {/* FieldScores 区块：星级 raw_1_5 + verdict 徽章 + 其它逐项 */}
              <FieldScores />
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

/** 单 metric 直方图：头行(metric_name + 均值) + flex h-16 items-end gap-0.5 桶条 + 端点 0/1 */
function MetricHist({ name, mean, buckets, selectedLow }: { name: string; mean: number; buckets: { low: number; count: number }[]; selectedLow: number }) {
  const max = Math.max(...buckets.map(b => b.count), 1);
  return (
    <div style={{ marginBottom: 16 }}>
      {/* 头行 */}
      <div style={{ marginBottom: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11 }}>
        <span style={{ color: '#57534e' }}>{name}</span>
        <span style={{ color: '#a8a29e' }}>均值 {mean.toFixed(2)}</span>
      </div>
      {/* 桶条 h-16(64) items-end gap-0.5(2) */}
      <div style={{ display: 'flex', height: 64, alignItems: 'flex-end', gap: 2 }}>
        {buckets.map((b, i) => {
          const active = b.low === selectedLow;
          const dimmed = !active;
          return (
            <span key={i} style={{ display: 'flex', flex: 1, height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
              <span
                style={{
                  width: '100%',
                  height: `${(b.count / max) * 100}%`,
                  background: bucketColor(b.low),
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                  opacity: dimmed ? 0.4 : 1,
                  boxShadow: active ? '0 0 0 1px #fffefb, 0 0 0 3px #44403c' : 'none',
                }}
              />
            </span>
          );
        })}
      </div>
      {/* 端点 0/1 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#a8a29e' }}>
        <span>0</span>
        <span>1</span>
      </div>
    </div>
  );
}

/** FieldScores：星级 + GSB verdict 徽章 + 逐项数值，rounded border bg-white px-2.5 py-2 */
function FieldScores() {
  return (
    <div>
      <div style={{ marginBottom: 4, fontSize: 10.5, color: '#78716c' }}>评分明细</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, borderRadius: 4, border: '1px solid #e7e5e0', background: '#fff', padding: '8px 10px' }}>
        {/* raw_1_5 星级 4/5 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={14} fill={i < 4 ? '#fbbf24' : '#e7e5e4'} color={i < 4 ? '#fbbf24' : '#e7e5e4'} />
            ))}
          </span>
          <span style={{ fontSize: 11, color: '#57534e' }}>
            4/5<span style={{ color: '#a8a29e' }}> · 归一 0.81</span>
          </span>
        </div>
        {/* verdict 徽章 success：emerald-100/emerald-800 rounded-md */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 6, border: '1px solid transparent', background: '#d1fae5', padding: '0.125rem 0.5rem', fontSize: 10.5, fontWeight: 500, color: '#065f46' }}>好（G）</span>
          <span style={{ fontSize: 10.5, color: '#a8a29e' }}>GSB 判定</span>
        </div>
        {/* 其它逐项 */}
        <div style={{ fontSize: 11, color: '#57534e' }}>
          <span style={{ color: '#a8a29e' }}>completeness：</span>0.78
        </div>
      </div>
    </div>
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
