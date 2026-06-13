import { PreviewFrame } from '../../../_layout';
import {
  ArrowLeft, Sparkles, GitCompare, ChevronRight, X,
} from 'lucide-react';

/**
 * run-master-detail-rail-overlay · 评测运行详情整页
 * 左 244px run 列表(master) + 中 run 详情主区 + 右侧 URL 驱动单层覆盖物(样本详情)
 * 源码：src/system/datasets/components/run-list-rail.tsx + pages/run-detail-page.tsx
 */

const RUNS = [
  { name: '基线评测 · qwen-chat', status: 'success', score: 0.84, optimized: true, parent: false, time: '06-13 14:22' },
  { name: '优化版 v2', status: 'success', score: 0.91, optimized: false, parent: true, time: '06-13 15:08' },
  { name: 'gpt-4o 对照', status: 'success', score: 0.78, optimized: false, parent: false, time: '06-12 10:15' },
  { name: 'temp=0.9 探索', status: 'failed', score: null, optimized: false, parent: false, time: '06-12 09:40' },
  { name: '冒烟跑', status: 'running', score: null, optimized: false, parent: false, time: '06-11 18:02' },
];

const STATUS_LABEL: Record<string, string> = { success: '成功', failed: '失败', running: '运行中' };
const statusDot = (s: string) => (s === 'success' ? '#34d399' : s === 'failed' ? '#fb7185' : '#d6d3d1');
const scoreColor = (s: number | null) => (s == null ? '#a8a29e' : s >= 0.8 ? '#059669' : s >= 0.5 ? '#d97706' : '#dc2626');

const SAMPLES = [
  { input: '如何重置我的账户密码？', actual: '前往设置 → 安全 → 重置密码…', verdict: '通过', score: 0.92 },
  { input: '订单多久能发货？', actual: '一般 24 小时内安排发货…', verdict: '通过', score: 0.88 },
  { input: '能开发票吗？', actual: '抱歉我无法处理该请求', verdict: '不通过', score: 0.31, err: true },
  { input: '支持哪些支付方式？', actual: '支持微信、支付宝、银行卡…', verdict: '通过', score: 0.85 },
];

export default function RunMasterDetailRailOverlay() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '16px 24px', height: 660, fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* ── header 面包屑 ── */}
        <header style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 6, padding: '4px 8px', fontSize: 12.5, color: '#78716c', cursor: 'pointer' }}>
            <ArrowLeft size={14} /> 客服问答评测集
          </span>
          <span style={{ color: '#d6d3d1' }}>/</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#1c1917' }}>运行详情</span>
        </header>

        {/* ── 主体一张大卡裹三栏 ── */}
        <div style={{ display: 'flex', minHeight: 0, flex: 1, overflow: 'hidden', borderRadius: 12, border: '1px solid #e7e5e0', background: '#fff' }}>

          {/* ── 左：run 列表 aside (244px) ── */}
          <aside style={{ display: 'flex', width: 244, flexShrink: 0, flexDirection: 'column', overflow: 'hidden', borderRight: '1px solid #e7e5e0', background: '#fff' }}>
            <div style={{ borderBottom: '1px solid #e7e5e0', padding: '10px 12px', fontSize: 12, fontWeight: 500, color: '#44403c' }}>
              运行（{RUNS.length}）
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: '4px 0' }}>
              {RUNS.map((r, i) => {
                const active = i === 1;
                return (
                  <button key={r.name} style={{
                    display: 'flex', width: '100%', flexDirection: 'column', gap: 4, padding: '8px 12px', textAlign: 'left', cursor: 'pointer',
                    borderLeft: `2px solid ${active ? '#292524' : 'transparent'}`,
                    background: active ? '#fafaf9' : 'transparent', border: 'none', borderLeftWidth: 2, borderLeftStyle: 'solid', borderLeftColor: active ? '#292524' : 'transparent',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 6, height: 6, flexShrink: 0, borderRadius: '50%', background: statusDot(r.status) }} />
                      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12.5, fontWeight: active ? 500 : 400, color: active ? '#1c1917' : '#44403c' }} title={r.name}>{r.name}</span>
                      {r.optimized && <Sparkles size={12} color="#a78bfa" />}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 12 }}>
                      {r.parent && (
                        <span style={{ background: '#f5f3ff', padding: '0 4px', borderRadius: 6, fontSize: 9, color: '#6d28d9', border: '1px solid #d6d3d1' }}>优化产物</span>
                      )}
                      <span style={{ fontSize: 11, fontVariantNumeric: 'tabular-nums', color: scoreColor(r.score) }}>{r.score != null ? r.score.toFixed(2) : '—'}</span>
                      <span style={{ marginLeft: 'auto', fontSize: 10, color: '#a8a29e' }}>{STATUS_LABEL[r.status]}</span>
                    </div>
                    <div style={{ paddingLeft: 12, fontSize: 9.5, color: '#a8a29e' }}>{r.time}</div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* ── 中：run 详情主区 ── */}
          <main style={{ minWidth: 0, flex: 1, background: '#fffefb', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <header style={{ borderBottom: '1px solid #e7e5e0', padding: '14px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h2 style={{ fontSize: 16, fontWeight: 500, color: '#1c1917', margin: 0 }}>优化版 v2</h2>
                <span style={{ background: '#f5f3ff', borderRadius: 4, padding: '1px 6px', fontSize: 10.5, color: '#6d28d9', border: '1px solid #ddd6fe' }}>← 优化自上一版本</span>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button style={{ display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 6, background: '#fafaf9', padding: '4px 8px', fontSize: 11, color: '#44403c', border: 'none', cursor: 'pointer' }}><GitCompare size={14} /> 对比上一版本</button>
                  <button style={{ display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 6, background: '#f5f3ff', padding: '4px 8px', fontSize: 11, color: '#6d28d9', border: 'none', cursor: 'pointer' }}><Sparkles size={14} /> 智能优化</button>
                </div>
              </div>
              <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, fontSize: 11.5, color: '#78716c' }}>
                <span style={{ borderRadius: 4, padding: '1px 6px', fontSize: 10.5, background: '#ecfdf5', color: '#047857', border: '1px solid #e7e5e0' }}>成功</span>
                <span>评分器 LLM 裁判</span>
                <span>· 模型 qwen-chat</span>
                <span>· 均分 <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 500, color: '#44403c' }}>0.91</span></span>
              </div>
            </header>

            <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* 评估配置（折叠态） */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12.5, fontWeight: 500, color: '#292524' }}>
                <ChevronRight size={14} color="#a8a29e" /> 评估配置
              </div>

              {/* 分数分布 */}
              <section>
                <h4 style={{ margin: '0 0 12px', fontSize: 12.5, fontWeight: 500, color: '#292524' }}>
                  分数分布 <span style={{ marginLeft: 8, fontSize: 10.5, fontWeight: 400, color: '#a8a29e' }}>点击柱子可筛选下方样本</span>
                </h4>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 88, padding: '0 4px' }}>
                  {[8, 14, 22, 40, 64].map((h, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <div style={{ width: '100%', height: h, borderRadius: '4px 4px 0 0', background: i >= 3 ? '#34d399' : i === 2 ? '#fbbf24' : '#fca5a5' }} />
                      <span style={{ fontSize: 9, color: '#a8a29e' }}>{(i * 0.2).toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 样本明细表 */}
              <section>
                <h4 style={{ margin: '0 0 12px', fontSize: 12.5, fontWeight: 500, color: '#292524' }}>样本明细（4）</h4>
                <div style={{ border: '1px solid rgba(231,229,224,0.6)', borderRadius: 8, overflow: 'hidden' }}>
                  <table style={{ width: '100%', fontSize: 12.5, borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                    <colgroup><col style={{ width: 4 }} /><col /><col /><col style={{ width: 96 }} /><col style={{ width: 32 }} /></colgroup>
                    <thead>
                      <tr style={{ background: 'rgba(244,243,238,0.4)', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>
                        <th></th>
                        <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>输入</th>
                        <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>模型回答</th>
                        <th style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 500 }}>分数</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {SAMPLES.map((s, i) => {
                        const sel = i === 2;
                        const sc = s.score >= 0.8 ? { bg: '#ecfdf5', fg: '#047857' } : s.score >= 0.5 ? { bg: '#fffbeb', fg: '#b45309' } : { bg: '#fef2f2', fg: '#b91c1c' };
                        return (
                          <tr key={i} style={{ borderTop: '1px solid #f5f4ee', cursor: 'pointer' }}>
                            <td style={{ padding: 0 }}><div style={{ height: 38, width: 4, background: sel ? '#44403c' : 'transparent' }} /></td>
                            <td style={{ padding: '8px 12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 11.5, color: '#57534e' }}>{s.input}</td>
                            <td style={{ padding: '8px 12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 11.5, color: '#44403c' }}>{s.actual}</td>
                            <td style={{ padding: '8px 12px', textAlign: 'right' }}>
                              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                                <span style={{ borderRadius: 4, padding: '0 4px', fontSize: 10, background: s.verdict === '通过' ? '#ecfdf5' : '#fef2f2', color: s.verdict === '通过' ? '#047857' : '#b91c1c' }}>{s.verdict}</span>
                                <span style={{ borderRadius: 4, padding: '2px 6px', fontSize: 10.5, background: sc.bg, color: sc.fg, fontVariantNumeric: 'tabular-nums' }}>{s.score.toFixed(2)}</span>
                              </span>
                            </td>
                            <td style={{ textAlign: 'center' }}>{s.err && <span style={{ color: '#f43f5e' }}>●</span>}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </main>

          {/* ── 右：覆盖物 · 样本详情侧栏 ── */}
          <aside style={{ width: 360, flexShrink: 0, borderLeft: '1px solid #e7e5e0', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e7e5e0', padding: '12px 16px' }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#1c1917' }}>样本详情</span>
              <span style={{ display: 'inline-flex', borderRadius: 6, padding: 4, color: '#a8a29e', cursor: 'pointer' }}><X size={16} /></span>
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Field label="输入" value="能开发票吗？" />
              <Field label="模型回答" value="抱歉我无法处理该请求" tone="err" />
              <div>
                <div style={{ fontSize: 10, color: '#a8a29e', marginBottom: 4 }}>评分</div>
                <span style={{ borderRadius: 4, padding: '2px 8px', fontSize: 12, background: '#fef2f2', color: '#b91c1c', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>0.31 不通过</span>
              </div>
              <Field label="裁判说明" value="未给出开票路径，直接拒绝，判定为答非所问。" />
            </div>
          </aside>
        </div>
      </div>
    </PreviewFrame>
  );
}

function Field({ label, value, tone }: { label: string; value: string; tone?: 'err' }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: '#a8a29e', marginBottom: 4 }}>{label}</div>
      <div style={{ borderRadius: 6, border: '1px solid #f5f4ee', background: tone === 'err' ? '#fef2f2' : '#fafaf9', padding: '8px 10px', fontSize: 12, lineHeight: 1.5, color: tone === 'err' ? '#b91c1c' : '#44403c' }}>{value}</div>
    </div>
  );
}
