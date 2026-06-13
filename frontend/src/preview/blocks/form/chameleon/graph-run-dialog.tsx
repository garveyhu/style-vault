import { PreviewFrame } from '../../../_layout';
import { Play, Zap, History, RotateCcw } from 'lucide-react';
import { useState } from 'react';

/**
 * graph-run-dialog · Chameleon 工作流运行调试闭环
 * 左：RunDialog（start 字段表单 + Test/Run 双钮 + 运行摘要 + 逐节点进度折叠 + 最终输出）
 * 右：VersionHistoryPanel（版本卡 + 线上徽标 + 草稿 vs vN diff + 恢复按钮）
 * 源码：system/graphs/components/{run-dialog,node-run-result,version-history-panel}.tsx
 */

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

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16, maxHeight: 540, overflowY: 'auto' }}>
        {/* start 声明字段 → 表单 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <FormField name="query" label="用户问题" required />
          <FormField name="top_k" label="召回数量" type="number" defaultValue="5" />
        </div>

        {/* dirty 提示 */}
        <div style={{ fontSize: 10.5, color: '#d97706' }}>
          画布有未保存改动 —— 运行前会先自动保存草稿，确保跑的是当前画布。
        </div>

        {/* 双钮 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button style={primaryBtn}>
            <Play size={12} style={{ marginRight: 4 }} /> Test Run
          </button>
          <button style={outlineBtn}>
            <Zap size={12} style={{ marginRight: 4 }} /> Run（持久化）
          </button>
          <span style={{ fontSize: 10.5, color: '#a8a29e' }}>
            Test Run 不落库、实时流式；Run 写 call_logs
          </span>
        </div>

        {/* 运行摘要行 border-t pt-3 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            borderTop: '1px solid rgba(231,229,224,0.7)',
            paddingTop: 12,
          }}
        >
          <StatusBadge tone="success">成功</StatusBadge>
          <span style={{ fontSize: 11, color: '#78716c', fontVariantNumeric: 'tabular-nums' }}>1.82s</span>
          <span style={{ fontSize: 11, color: '#78716c' }}>4 节点</span>
          <span style={{ marginLeft: 'auto', fontSize: 10.5, color: '#a8a29e' }}>调试运行</span>
        </div>

        {/* 逐节点进度 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <NodeRow label="start" type="start" status="success" />
          <NodeRow label="意图分类器" type="classifier" status="success" expanded />
          <NodeRow label="知识库召回" type="kb" status="running" subActive="检索中" />
          <NodeRow label="重试节点" type="llm" status="running" retry="2/3" />
          <NodeRow label="兜底回复" type="llm" status="success" errorHandled />
        </div>

        {/* 最终输出 */}
        <div>
          <div style={{ marginBottom: 4, fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#a8a29e' }}>
            最终输出
          </div>
          <JsonBox>
            {`{\n  "intent": "退款咨询",\n  "answer": "您好，退款将在 3-5 个工作日…"\n}`}
          </JsonBox>
        </div>
      </div>
    </div>
  );
}

function FormField({
  name,
  label,
  required,
  type,
  defaultValue,
}: {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label style={{ marginBottom: 4, display: 'block', fontSize: 11.5, color: '#57534e' }}>
        {label}
        {required && <span style={{ marginLeft: 2, color: '#fb7185' }}>*</span>}
        <span style={{ marginLeft: 6, fontFamily: 'JetBrains Mono, monospace', fontSize: 9.5, color: '#d6d3d1' }}>
          start.{name}
        </span>
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={type === 'number' ? undefined : '我要退款'}
        style={{
          height: 32,
          width: '100%',
          padding: '0 10px',
          fontSize: 12.5,
          borderRadius: 8,
          border: '1px solid #e7e5e0',
          outline: 'none',
          color: '#1c1917',
          boxSizing: 'border-box',
        }}
      />
    </div>
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
}: {
  label: string;
  type: string;
  status: 'success' | 'running' | 'failed' | 'pending';
  subActive?: string;
  retry?: string;
  errorHandled?: boolean;
  expanded?: boolean;
}) {
  const [open, setOpen] = useState(!!expanded);
  return (
    <div style={{ borderRadius: 6, border: '1px solid #e7e5e0', background: '#fff' }}>
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
        }}
      >
        <span style={{ color: '#292524', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {label}
        </span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#a8a29e' }}>{type}</span>
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
          <StatusBadge tone={status === 'running' ? 'running' : status === 'failed' ? 'error' : 'success'}>
            {status === 'running' ? '执行中' : status === 'failed' ? '失败' : '成功'}
          </StatusBadge>
        </span>
      </button>
      {open && (
        <div style={{ borderTop: '1px solid #f5f4ee', padding: '8px' }}>
          <JsonBox compact>{`{ "label": "${label}", "tokens": 128 }`}</JsonBox>
        </div>
      )}
    </div>
  );
}

/* ── VersionHistoryPanel（Sheet w-[420px]） ── */
function VersionDrawer() {
  const [sel, setSel] = useState(2);
  const versions = [
    { v: 3, online: false, at: '06-13 14:02', note: '增加意图分类器多出口' },
    { v: 2, online: true, at: '06-12 09:30', note: '上线版本：召回 + 兜底' },
    { v: 1, online: false, at: '06-10 18:11', note: '' },
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
                border: isSel ? '1px solid #a8a29e' : '1px solid #e7e5e0',
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
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 600, color: '#292524' }}>
                  v{v.v}
                </span>
                {v.online && (
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <DiffGroup tone="emerald" label="草稿新增" entries={[{ id: 'classifier-2', type: 'classifier', name: '意图分类器' }]} />
                    <DiffGroup tone="amber" label="配置变更" entries={[{ id: 'kb-1', type: 'kb', name: '知识库召回' }]} />
                    <EdgeDiff tone="emerald" label="草稿新增连线" edges={[{ s: 'classifier-2', t: 'kb-1', h: 'refund' }]} />
                  </div>
                  <button style={{ ...outlineBtn, marginTop: 10, width: '100%', justifyContent: 'center' }}>
                    <RotateCcw size={12} style={{ marginRight: 4 }} /> 恢复此版本到草稿
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const TONE: Record<string, { bg: string; text: string }> = {
  emerald: { bg: '#ecfdf5', text: '#047857' },
  rose: { bg: '#fef2f2', text: '#be123c' },
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
            <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#78716c' }}>{e.id}</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9.5, color: '#a8a29e' }}>{e.type}</span>
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
            <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#78716c' }}>
              {e.s} → {e.t}
            </span>
            {e.h && <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9.5, color: '#a8a29e' }}>{e.h}</span>}
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

function StatusBadge({ tone, children }: { tone: 'success' | 'running' | 'error'; children: React.ReactNode }) {
  const map = {
    success: { bg: '#ecfdf5', text: '#047857', dot: '#10b981' },
    running: { bg: '#eff6ff', text: '#1d4ed8', dot: '#3b82f6' },
    error: { bg: '#fef2f2', text: '#be123c', dot: '#ef4444' },
  }[tone];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        borderRadius: 9999,
        background: map.bg,
        padding: '2px 8px',
        fontSize: 10.5,
        fontWeight: 500,
        color: map.text,
      }}
    >
      <span
        style={{
          height: 6,
          width: 6,
          borderRadius: '50%',
          background: map.dot,
          animation: tone === 'running' ? 'cm-pulse 1.2s ease-in-out infinite' : undefined,
        }}
      />
      {children}
      <style>{`@keyframes cm-pulse { 0%,100% { opacity: 1 } 50% { opacity: .3 } }`}</style>
    </span>
  );
}

function JsonBox({ children, compact }: { children: React.ReactNode; compact?: boolean }) {
  return (
    <pre
      style={{
        margin: 0,
        maxHeight: compact ? 200 : 280,
        overflow: 'auto',
        borderRadius: 6,
        border: '1px solid #e7e5e0',
        background: '#fff',
        padding: '8px 10px',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 11,
        lineHeight: 1.5,
        color: '#44403c',
      }}
    >
      {children}
    </pre>
  );
}

const primaryBtn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  height: 32,
  padding: '0 12px',
  background: '#2563eb',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  fontSize: 12.5,
  fontWeight: 500,
  cursor: 'pointer',
};

const outlineBtn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  height: 32,
  padding: '0 12px',
  background: '#fff',
  color: '#44403c',
  border: '1px solid #d6d3d1',
  borderRadius: 8,
  fontSize: 12.5,
  fontWeight: 500,
  cursor: 'pointer',
};
