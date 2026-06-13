import { PreviewFrame } from '../../../_layout';
import { Play, Zap, Square, History, RotateCcw, Copy, Download, Search, ChevronRight } from 'lucide-react';
import { useState } from 'react';

/**
 * graph-run-dialog · Chameleon 工作流运行调试闭环
 * 左：RunDialog（start 字段表单含 5 类字段 / JSON 兜底变体 / Test/Run 双钮 +
 *      运行摘要含 paused / 逐节点进度 5 态 / 展开 NodeRunResult error+流式+推理+output+input / 最终输出）
 * 右：VersionHistoryPanel（版本卡 + 线上+草稿徽标 + isLoading 占位 + diff/clean 态 + 恢复+复制+导出）
 * 源码：system/graphs/components/{run-dialog,node-run-result,version-history-panel}.tsx
 *       + ui/status-badge.tsx + spec-diff-view.tsx + json-viewer.tsx
 */

const MONO = 'JetBrains Mono, monospace';

export default function GraphRunDialog() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div
        style={{
          display: 'flex',
          gap: 16,
          padding: 24,
          alignItems: 'flex-start',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <RunDialog />
        <VersionDrawer />
      </div>
    </PreviewFrame>
  );
}

/* ── RunDialog（ModalContent size=lg） ── */
function RunDialog() {
  return (
    <div
      style={{
        width: 460,
        background: '#fffefb',
        border: '1px solid rgba(231,229,224,0.6)',
        borderRadius: 12,
        boxShadow: '0 8px 24px rgb(0 0 0 / 8%), 0 2px 8px rgb(0 0 0 / 4%)',
        overflow: 'hidden',
      }}
    >
      {/* header h-14 */}
      <div
        style={{
          height: 56,
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          borderBottom: '1px solid rgba(231,229,224,0.7)',
          fontSize: 14,
          fontWeight: 600,
          color: '#1c1917',
        }}
      >
        运行 · 客服意图分流
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16, maxHeight: 760, overflowY: 'auto' }}>
        {/* start 声明字段 → 表单（space-y-2.5），覆盖 text / number / select / checkbox / paragraph / json 全 5 类字段 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <FormField name="query" label="用户问题" required>
            <TextInput defaultValue="我要退款" />
          </FormField>
          <FormField name="top_k" label="召回数量">
            <TextInput type="number" defaultValue="5" />
          </FormField>
          <FormField name="channel" label="渠道">
            <SelectField value="web" options={['web', 'app', 'wechat']} />
          </FormField>
          <FormField name="stream" label="流式输出">
            <SwitchField checked />
          </FormField>
          <FormField name="prompt" label="系统提示词">
            <ParagraphArea defaultValue="你是一名耐心的客服助手，回答要简洁。" />
          </FormField>
          <FormField name="extra" label="附加参数">
            <JsonArea defaultValue={'{\n  "trace": true\n}'} />
          </FormField>
        </div>

        {/* dirty 提示 */}
        <div style={{ fontSize: 10.5, color: '#d97706' }}>
          画布有未保存改动 —— 运行前会先自动保存草稿，确保跑的是当前画布。
        </div>

        {/* 双钮（Button size=sm：h-7 px-2.5 text-[11.5px] rounded-md） */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button style={primaryBtnSm}>
            <Play size={12} style={{ marginRight: 4 }} /> Test Run
          </button>
          <button style={outlineBtnSm}>
            <Zap size={12} style={{ marginRight: 4 }} /> Run（持久化）
          </button>
          <button style={{ ...outlineBtnSm, borderColor: '#fecdd3', color: '#e11d48' }}>
            <Square size={12} style={{ marginRight: 4 }} /> 停止
          </button>
          <span style={{ fontSize: 10.5, color: '#a8a29e' }}>
            Test Run 不落库、实时流式；Run 写 call_logs
          </span>
        </div>

        {/* 运行摘要行 border-t pt-3（含 paused 态：bg-amber-50 px-2 py-0.5 text-[11px] text-amber-700） */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            borderTop: '1px solid rgba(231,229,224,0.7)',
            paddingTop: 12,
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              borderRadius: 9999,
              background: '#fffbeb',
              padding: '2px 8px',
              fontSize: 11,
              fontWeight: 500,
              color: '#b45309',
            }}
          >
            ⏸ 已暂停（human_input 断点，回填见运行日志）
          </span>
          <span style={{ fontSize: 11, color: '#78716c', fontVariantNumeric: 'tabular-nums' }}>1.82s</span>
          <span style={{ fontSize: 11, color: '#78716c' }}>4 节点</span>
          <span style={{ marginLeft: 'auto', fontSize: 10.5, color: '#a8a29e' }}>调试运行</span>
        </div>

        {/* 逐节点进度（5 态：success / running(+子图执行中/重试中) / failed / pending / 错误已兜底） */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <NodeRow label="start" type="start" status="success" />
          <NodeRow label="意图分类器" type="classifier" status="success" expanded />
          <NodeRow label="知识库召回" type="kb" status="running" subActive="检索中" />
          <NodeRow label="重试节点" type="llm" status="running" retry="2/3" />
          <NodeRow label="SQL 查询" type="tool" status="failed" expandedFailed />
          <NodeRow label="兜底回复" type="llm" status="success" errorHandled />
          <NodeRow label="发送通知" type="http" status="pending" />
        </div>

        {/* 最终输出（JsonViewer maxHeight 280px，含搜索头） */}
        <div>
          <div style={{ marginBottom: 4, fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#a8a29e' }}>
            最终输出
          </div>
          <JsonViewerBox maxHeight={280}>
            {`{\n  "intent": "退款咨询",\n  "answer": "您好，退款将在 3-5 个工作日…"\n}`}
          </JsonViewerBox>
        </div>
      </div>
    </div>
  );
}

/* ── 表单字段：label + 控件 ── */
function FormField({
  name,
  label,
  required,
  children,
}: {
  name: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label style={{ marginBottom: 4, display: 'block', fontSize: 11.5, color: '#57534e' }}>
        {label}
        {/* required 星号 text-rose-400 #fb7185 */}
        {required && <span style={{ marginLeft: 2, color: '#fb7185' }}>*</span>}
        <span style={{ marginLeft: 6, fontFamily: MONO, fontSize: 9.5, color: '#d6d3d1' }}>
          start.{name}
        </span>
      </label>
      {children}
    </div>
  );
}

/* 基础 Input：h-8 rounded-md(6) border-stone-300(#d6d3d1) px-3(12) text-[12.5px] */
function TextInput({ type, defaultValue }: { type?: string; defaultValue?: string }) {
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      style={{
        height: 32,
        width: '100%',
        padding: '0 12px',
        fontSize: 12.5,
        borderRadius: 6,
        border: '1px solid #d6d3d1',
        outline: 'none',
        color: '#1c1917',
        boxSizing: 'border-box',
      }}
    />
  );
}

/* select 字段：h-8 w-full rounded-lg(8) border-stone-200(#e7e5e4) px-2(8) text-[12.5px] */
function SelectField({ value, options }: { value: string; options: string[] }) {
  return (
    <div
      style={{
        position: 'relative',
        height: 32,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        borderRadius: 8,
        border: '1px solid #e7e5e4',
        background: '#fff',
        fontSize: 12.5,
        color: '#1c1917',
        boxSizing: 'border-box',
      }}
    >
      {value}
      <ChevronRight size={14} color="#a8a29e" style={{ marginLeft: 'auto', transform: 'rotate(90deg)' }} />
      {/* options 隐含：{options.join(' / ')} */}
      <span style={{ display: 'none' }}>{options.join(',')}</span>
    </div>
  );
}

/* checkbox 字段：Switch h-5 w-9(20×36) thumb h-4 w-4 translate-x-4，checked bg-primary-600(#2563eb) */
function SwitchField({ checked }: { checked: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 20,
        width: 36,
        borderRadius: 9999,
        background: checked ? '#2563eb' : '#d6d3d1',
        padding: 2,
        boxSizing: 'border-box',
      }}
    >
      <span
        style={{
          height: 16,
          width: 16,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)',
          transform: checked ? 'translateX(16px)' : 'translateX(0)',
        }}
      />
    </span>
  );
}

/* paragraph Textarea：text-[12.5px] rows-3，base Textarea border-stone-300 rounded-md px-3 py-1.5 */
function ParagraphArea({ defaultValue }: { defaultValue: string }) {
  return (
    <textarea
      defaultValue={defaultValue}
      rows={3}
      style={{
        width: '100%',
        fontSize: 12.5,
        padding: '6px 12px',
        borderRadius: 6,
        border: '1px solid #d6d3d1',
        resize: 'none',
        outline: 'none',
        color: '#1c1917',
        fontFamily: 'inherit',
        boxSizing: 'border-box',
      }}
    />
  );
}

/* json Textarea：font-mono text-[12px] rows-4 */
function JsonArea({ defaultValue }: { defaultValue: string }) {
  return (
    <textarea
      defaultValue={defaultValue}
      rows={4}
      style={{
        width: '100%',
        fontSize: 12,
        padding: '6px 12px',
        borderRadius: 6,
        border: '1px solid #d6d3d1',
        resize: 'none',
        outline: 'none',
        color: '#44403c',
        fontFamily: MONO,
        boxSizing: 'border-box',
      }}
    />
  );
}

function NodeRow({
  label,
  type,
  status,
  subActive,
  retry,
  errorHandled,
  expanded,
  expandedFailed,
}: {
  label: string;
  type: string;
  status: 'success' | 'running' | 'failed' | 'pending';
  subActive?: string;
  retry?: string;
  errorHandled?: boolean;
  expanded?: boolean;
  expandedFailed?: boolean;
}) {
  const [open, setOpen] = useState(!!expanded || !!expandedFailed);
  return (
    <div style={{ borderRadius: 6, border: '1px solid #e7e5e4', background: '#fff' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          gap: 8,
          padding: '6px 8px',
          textAlign: 'left',
          fontSize: 11.5,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          opacity: status === 'pending' ? 0.6 : 1,
        }}
      >
        <span style={{ color: '#292524', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {label}
        </span>
        <span style={{ fontFamily: MONO, fontSize: 10, color: '#a8a29e' }}>{type}</span>
        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          {status === 'running' && subActive && (
            <span style={{ fontSize: 10, fontWeight: 500, color: '#2563eb' }}>子图执行中 · {subActive}</span>
          )}
          {status === 'running' && retry && (
            <span style={{ fontSize: 10, fontWeight: 500, color: '#d97706' }}>重试中 {retry}</span>
          )}
          {errorHandled && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                borderRadius: 9999,
                background: '#fffbeb',
                padding: '2px 6px',
                fontSize: 10,
                fontWeight: 500,
                color: '#b45309',
              }}
            >
              错误已兜底
            </span>
          )}
          <StatusBadge status={status} />
        </span>
      </button>
      {open && (
        <div style={{ borderTop: '1px solid #f5f4ee', padding: '8px' }}>
          {expandedFailed ? <NodeRunResultFailed /> : <NodeRunResultSuccess label={label} />}
        </div>
      )}
    </div>
  );
}

/* 展开成功节点：StatusBadge + output JsonViewer + input details */
function NodeRunResultSuccess({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 11.5 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <StatusBadge status="success" />
        <span style={{ fontSize: 10.5, color: '#78716c', fontVariantNumeric: 'tabular-nums' }}>312ms</span>
      </div>
      {/* 推理过程 details（violet-500 summary + violet-50/40 italic body） */}
      <details>
        <summary style={{ cursor: 'pointer', fontSize: 10.5, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#8b5cf6' }}>
          推理过程（128 字）
        </summary>
        <div
          style={{
            marginTop: 4,
            maxHeight: 192,
            overflow: 'auto',
            borderRadius: 6,
            border: '1px solid #ede9fe',
            background: 'rgba(245,243,255,0.4)',
            padding: '6px 8px',
            fontSize: 11,
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            color: '#57534e',
            fontStyle: 'italic',
          }}
        >
          用户意图为退款咨询，匹配到知识库「售后政策」段落，组织答复…
        </div>
      </details>
      {/* output（JsonViewer defaultExpanded maxHeight 240） */}
      <div>
        <div style={{ marginBottom: 4, fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#a8a29e' }}>
          output
        </div>
        <JsonViewerBox maxHeight={240} searchable={false}>
          {`{ "label": "${label}", "tokens": 128 }`}
        </JsonViewerBox>
      </div>
      {/* input（折叠 details + JsonViewer maxHeight 200） */}
      <details>
        <summary style={{ cursor: 'pointer', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#a8a29e' }}>
          input
        </summary>
        <div style={{ marginTop: 4 }}>
          <JsonViewerBox maxHeight={200} searchable={false}>
            {`{ "query": "我要退款" }`}
          </JsonViewerBox>
        </div>
      </details>
    </div>
  );
}

/* 展开失败节点：StatusBadge(error) + error 块 + 流式输出块 */
function NodeRunResultFailed() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 11.5 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <StatusBadge status="failed" />
        <span style={{ fontSize: 10.5, color: '#78716c', fontVariantNumeric: 'tabular-nums' }}>220ms</span>
      </div>
      {/* error 块：rounded-md border-rose-200 bg-rose-50 px-2 py-1.5；type font-mono text-[10px] uppercase text-rose-400 */}
      <div
        style={{
          borderRadius: 6,
          border: '1px solid #fecdd3',
          background: '#fff1f2',
          padding: '6px 8px',
          color: '#be123c',
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#fb7185' }}>
          ToolExecutionError
        </div>
        <div style={{ wordBreak: 'break-word' }}>connection timeout: SQL gateway 未响应（10s）</div>
      </div>
      {/* 流式输出块：max-h-40 mono text-[11px] border-stone-200 */}
      <div>
        <div style={{ marginBottom: 4, fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#a8a29e' }}>
          流式输出
        </div>
        <div
          style={{
            maxHeight: 160,
            overflow: 'auto',
            whiteSpace: 'pre-wrap',
            borderRadius: 6,
            border: '1px solid #e7e5e4',
            background: '#fff',
            padding: '6px 8px',
            fontFamily: MONO,
            fontSize: 11,
            lineHeight: 1.4,
            color: '#44403c',
          }}
        >
          {'> 正在连接 SQL gateway…\n> 重试 1/3 …\n> 连接失败'}
        </div>
      </div>
    </div>
  );
}

/* ── VersionHistoryPanel（Sheet w-[420px]） ── */
function VersionDrawer() {
  const [sel, setSel] = useState(2);
  const versions = [
    { v: 3, online: false, draft: true, at: '06-13 14:02', note: '增加意图分类器多出口' },
    { v: 2, online: true, draft: false, at: '06-12 09:30', note: '上线版本：召回 + 兜底' },
    { v: 1, online: false, draft: false, at: '06-10 18:11', note: '' },
  ];
  return (
    <div
      style={{
        width: 420,
        background: '#fffefb',
        border: '1px solid rgba(231,229,224,0.6)',
        borderRadius: 12,
        boxShadow: '0 1px 3px rgb(0 0 0 / 5%), 0 2px 8px rgb(0 0 0 / 3%)',
        overflow: 'hidden',
      }}
    >
      {/* SheetHeader p-4 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 16, fontSize: 14, fontWeight: 600, color: '#1c1917' }}>
        <History size={16} color="#a8a29e" />
        版本历史
      </div>

      {/* SheetBody p-3 · space-y-1.5 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 12, paddingTop: 0 }}>
        {versions.map(v => {
          const isSel = sel === v.v;
          return (
            <div
              key={v.v}
              style={{
                borderRadius: 8,
                background: '#fff',
                border: isSel ? '1px solid #a8a29e' : '1px solid #e7e5e4',
                boxShadow: isSel ? '0 1px 2px rgb(0 0 0 / 6%)' : undefined,
              }}
            >
              <button
                onClick={() => setSel(isSel ? -1 : v.v)}
                style={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 12px',
                  textAlign: 'left',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, color: '#292524' }}>
                  v{v.v}
                </span>
                {v.online && (
                  // 线上徽标 rounded(4) bg-emerald-50 px-1.5 py-0.5 text-[9.5px] text-emerald-700
                  <span
                    style={{
                      borderRadius: 4,
                      background: '#ecfdf5',
                      padding: '2px 6px',
                      fontSize: 9.5,
                      fontWeight: 500,
                      color: '#047857',
                    }}
                  >
                    线上
                  </span>
                )}
                {v.draft && (
                  // 草稿徽标 bg-amber-50 text-amber-700 ring-amber-200/60
                  <span
                    style={{
                      borderRadius: 4,
                      background: '#fffbeb',
                      padding: '2px 6px',
                      fontSize: 9.5,
                      fontWeight: 500,
                      color: '#b45309',
                      boxShadow: 'inset 0 0 0 1px rgba(253,230,138,0.6)',
                    }}
                  >
                    草稿
                  </span>
                )}
                <span style={{ marginLeft: 'auto', fontSize: 10.5, color: '#a8a29e' }}>{v.at}</span>
              </button>
              {v.note && (
                <div style={{ padding: '0 12px 8px', fontSize: 11, lineHeight: 1.4, color: '#78716c' }}>{v.note}</div>
              )}

              {isSel && (
                <div style={{ borderTop: '1px solid #f5f4ee', padding: '10px 12px' }}>
                  <div style={{ marginBottom: 6, fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a8a29e' }}>
                    当前草稿 vs v{v.v}
                    <span style={{ marginLeft: 6, textTransform: 'none' }}>· 该版本 5 节点</span>
                  </div>
                  {/* v3 选中：展示 diff 结果 / v1（最末）演示 isLoading + clean 中间态 */}
                  {v.v === 3 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <DiffGroup tone="emerald" label="新增" entries={[{ id: 'classifier-2', type: 'classifier', name: '意图分类器' }]} />
                      <DiffGroup tone="amber" label="配置变更" entries={[{ id: 'kb-1', type: 'kb', name: '知识库召回' }]} />
                      <EdgeDiff tone="emerald" label="新增连线" edges={[{ s: 'classifier-2', t: 'kb-1', h: 'refund' }]} />
                    </div>
                  ) : (
                    <>
                      {/* detailQ.isLoading 占位 py-2 text-center text-[11px] text-stone-400 */}
                      <div style={{ padding: '8px 0', textAlign: 'center', fontSize: 11, color: '#a8a29e' }}>
                        加载版本 spec…
                      </div>
                      {/* diff clean 态 text-[11px] text-stone-500 */}
                      <div style={{ fontSize: 11, color: '#78716c' }}>节点与连线均与该版本一致。</div>
                    </>
                  )}
                  <button style={{ ...outlineBtnSm, marginTop: 10, width: '100%', justifyContent: 'center' }}>
                    <RotateCcw size={12} style={{ marginRight: 4 }} /> 恢复此版本到草稿
                  </button>
                  <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>
                    <button style={{ ...ghostBtnSm, flex: 1, justifyContent: 'center' }}>
                      <Copy size={12} style={{ marginRight: 4 }} /> 复制 ID
                    </button>
                    <button style={{ ...ghostBtnSm, flex: 1, justifyContent: 'center' }}>
                      <Download size={12} style={{ marginRight: 4 }} /> 导出 DSL
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* DiffSummary 配色：emerald/rose/amber，pill bg-*-50 text-*-700 */
const TONE: Record<string, { bg: string; text: string }> = {
  emerald: { bg: '#ecfdf5', text: '#047857' },
  rose: { bg: '#fff1f2', text: '#be123c' },
  amber: { bg: '#fffbeb', text: '#b45309' },
};

function DiffGroup({
  tone,
  label,
  entries,
}: {
  tone: keyof typeof TONE;
  label: string;
  entries: { id: string; type: string; name: string }[];
}) {
  return (
    <div>
      <DiffBadge tone={tone} label={label} count={entries.length} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4 }}>
        {entries.map(e => (
          <div
            key={e.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              borderRadius: 4,
              background: '#fafaf9',
              padding: '4px 6px',
              fontSize: 10.5,
            }}
          >
            <span style={{ fontFamily: MONO, color: '#78716c' }}>{e.id}</span>
            <span style={{ fontFamily: MONO, fontSize: 9.5, color: '#a8a29e' }}>{e.type}</span>
            <span style={{ marginLeft: 'auto', color: '#57534e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {e.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EdgeDiff({
  tone,
  label,
  edges,
}: {
  tone: keyof typeof TONE;
  label: string;
  edges: { s: string; t: string; h?: string }[];
}) {
  return (
    <div>
      <DiffBadge tone={tone} label={label} count={edges.length} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4 }}>
        {edges.map((e, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              borderRadius: 4,
              background: '#fafaf9',
              padding: '4px 6px',
              fontSize: 10.5,
            }}
          >
            <span style={{ fontFamily: MONO, color: '#78716c' }}>
              {e.s} → {e.t}
            </span>
            {e.h && <span style={{ fontFamily: MONO, fontSize: 9.5, color: '#a8a29e' }}>{e.h}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function DiffBadge({ tone, label, count }: { tone: keyof typeof TONE; label: string; count: number }) {
  const c = TONE[tone];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 4,
        padding: '2px 6px',
        fontSize: 9.5,
        fontWeight: 500,
        background: c.bg,
        color: c.text,
      }}
    >
      {label} · {count}
    </span>
  );
}

/* StatusBadge（源码 ui/status-badge.tsx）：rounded-md(6) gap-1.5(6) px-2 py-0.5 text-[11px] font-medium
 * running=sky(dot #0ea5e9 / pill bg #f0f9ff text #0369a1) + animate-ping 扩散环
 * success=emerald(#10b981 / #ecfdf5 / #047857) failed→error=red(#ef4444 / #fef2f2 / #b91c1c) pending→neutral=stone(#a8a29e / #f5f5f4 / #57534e)
 */
function StatusBadge({ status }: { status: 'success' | 'running' | 'failed' | 'pending' }) {
  const map = {
    success: { bg: '#ecfdf5', text: '#047857', dot: '#10b981', label: '成功' },
    running: { bg: '#f0f9ff', text: '#0369a1', dot: '#0ea5e9', label: '执行中' },
    failed: { bg: '#fef2f2', text: '#b91c1c', dot: '#ef4444', label: '失败' },
    pending: { bg: '#f5f5f4', text: '#57534e', dot: '#a8a29e', label: '待执行' },
  }[status];
  const pulse = status === 'running';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        whiteSpace: 'nowrap',
        borderRadius: 6,
        background: map.bg,
        padding: '2px 8px',
        fontSize: 11,
        fontWeight: 500,
        color: map.text,
      }}
    >
      {/* relative flex h-1.5 w-1.5：内层 dot + pulse 时叠 absolute animate-ping 扩散环 */}
      <span style={{ position: 'relative', display: 'inline-flex', height: 6, width: 6 }}>
        {pulse && (
          <span
            style={{
              position: 'absolute',
              inset: 0,
              display: 'inline-flex',
              height: '100%',
              width: '100%',
              borderRadius: '50%',
              background: map.dot,
              opacity: 0.75,
              animation: 'cm-ping 1s cubic-bezier(0,0,0.2,1) infinite',
            }}
          />
        )}
        <span
          style={{
            position: 'relative',
            display: 'inline-flex',
            height: 6,
            width: 6,
            borderRadius: '50%',
            background: map.dot,
          }}
        />
      </span>
      {map.label}
      <style>{`@keyframes cm-ping { 75%,100% { transform: scale(2); opacity: 0 } }`}</style>
    </span>
  );
}

/* JsonViewer：rounded-md border-stone-200 bg-white；searchable 时顶部搜索头 bg-stone-50/60，body p-2 mono text-[12px] */
function JsonViewerBox({
  children,
  maxHeight,
  searchable = true,
}: {
  children: React.ReactNode;
  maxHeight: number;
  searchable?: boolean;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: 6,
        border: '1px solid #e7e5e4',
        background: '#fff',
      }}
    >
      {searchable && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            borderBottom: '1px solid #e7e5e4',
            background: 'rgba(250,250,249,0.6)',
            padding: '6px 8px',
          }}
        >
          <Search size={14} color="#a8a29e" />
          <span style={{ flex: 1, fontSize: 12.5, color: '#a8a29e' }}>搜索 key 或 value…</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 4, padding: '4px 6px', fontSize: 11.5, color: '#57534e' }}>
            <Copy size={12} /> 复制
          </span>
        </div>
      )}
      <pre
        style={{
          margin: 0,
          maxHeight,
          overflow: 'auto',
          padding: 8,
          fontFamily: MONO,
          fontSize: 12,
          lineHeight: 1.4,
          color: '#44403c',
        }}
      >
        {children}
      </pre>
    </div>
  );
}

/* Button size=sm：h-7(28) px-2.5(10) text-[11.5px] rounded-md(6) */
const primaryBtnSm: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  height: 28,
  padding: '0 10px',
  background: '#2563eb',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  fontSize: 11.5,
  fontWeight: 500,
  cursor: 'pointer',
};

const outlineBtnSm: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  height: 28,
  padding: '0 10px',
  background: '#fff',
  color: '#44403c',
  border: '1px solid #d6d3d1',
  borderRadius: 6,
  fontSize: 11.5,
  fontWeight: 500,
  cursor: 'pointer',
};

const ghostBtnSm: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  height: 28,
  padding: '0 10px',
  background: 'transparent',
  color: '#44403c',
  border: 'none',
  borderRadius: 6,
  fontSize: 11.5,
  fontWeight: 500,
  cursor: 'pointer',
};
