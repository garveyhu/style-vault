import { PreviewFrame } from '../../../_layout';
import {
  Bot,
  History,
  KeyRound,
  ListTree,
  MessageSquare,
  Paperclip,
  Plus,
  Send,
  Settings2,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';

const MONO = 'ui-monospace, SFMono-Regular, "JetBrains Mono", monospace';
const GRADIENT = 'linear-gradient(to bottom right, #8b5cf6, #3b82f6)';

const HISTORY = [
  { label: 'qwen-max vs gpt-4o', sub: '2 列 · qwen-max · gpt-4o', active: true },
  { label: 'SQL 生成对照', sub: '3 列 · qwen-coder · …', active: false },
];

type Bubble = { role: 'user' | 'bot'; text: string; tok?: [number, number] };
const COL_A: Bubble[] = [
  { role: 'user', text: 'RAG 的检索增强流程是怎样的？' },
  { role: 'bot', text: '先从知识库召回相关切块，再把片段拼进 prompt，最后交给大模型生成答案。', tok: [128, 64] },
];
const COL_B: Bubble[] = [
  { role: 'user', text: 'RAG 的检索增强流程是怎样的？' },
  { role: 'bot', text: 'RAG = Retrieval-Augmented Generation：1) 检索相关文档 2) 拼接上下文 3) 生成回答。', tok: [128, 71] },
];

export default function ModelCompareChatLab() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div
        style={{
          margin: 16,
          borderRadius: 12,
          border: '1px solid rgba(231,229,224,0.7)',
          background: '#fffefb',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: 560,
        }}
      >
        {/* top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(231,229,224,0.7)', padding: '10px 16px' }}>
          <h2 style={{ fontSize: 14, fontWeight: 500, color: '#1c1917', margin: 0 }}>Playground</h2>
          <div style={{ display: 'flex', overflow: 'hidden', borderRadius: 8, border: '1px solid #e7e5e0', fontSize: 12 }}>
            <span style={{ padding: '4px 12px', color: '#78716c' }}>单聊</span>
            <span style={{ padding: '4px 12px', background: '#eff6ff', fontWeight: 500, color: '#1d4ed8' }}>对比</span>
          </div>
          <div style={{ marginLeft: 'auto' }} />
          {/* KeyPicker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 28, width: 200, borderRadius: 6, border: '1px solid #d6d3d1', background: '#fff', padding: '0 8px', fontSize: 12, color: '#44403c' }}>
            <KeyRound size={14} strokeWidth={2} color="#a8a29e" />
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>生产溯源 Key</span>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#78716c' }}>
            <Sparkles size={14} strokeWidth={2} /> 新对比
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#78716c' }}>
            <Plus size={14} strokeWidth={2} /> 加列
          </span>
        </div>

        {/* body */}
        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
          {/* compare history sidebar */}
          <aside style={{ display: 'flex', width: 200, flexShrink: 0, flexDirection: 'column', borderRight: '1px solid rgba(231,229,224,0.7)', background: 'rgba(244,243,238,0.3)', padding: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 6px', fontSize: 10.5, letterSpacing: '0.04em', color: '#a8a29e' }}>
              <History size={12} strokeWidth={2} /> 对比历史
            </div>
            {HISTORY.map(h => (
              <div
                key={h.label}
                style={{
                  marginBottom: 2,
                  borderRadius: 6,
                  background: h.active ? '#fff' : 'transparent',
                  boxShadow: h.active ? '0 1px 2px rgb(0 0 0/5%)' : undefined,
                  border: h.active ? '1px solid #e7e5e0' : '1px solid transparent',
                  padding: '6px 8px',
                }}
              >
                <div style={{ fontSize: 12, color: '#44403c', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{h.label}</div>
                <div style={{ fontSize: 10, color: '#a8a29e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{h.sub}</div>
              </div>
            ))}
          </aside>

          {/* columns + shared composer */}
          <div style={{ display: 'flex', flex: 1, minWidth: 0, flexDirection: 'column' }}>
            <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
              <CompareColumn index={0} model="qwen-max" bubbles={COL_A} bordered />
              <CompareColumn index={1} model="gpt-4o" bubbles={COL_B} bordered={false} />
            </div>
            {/* shared composer */}
            <div style={{ borderTop: '1px solid rgba(231,229,224,0.7)', padding: 12 }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, borderRadius: 12, border: '1px solid #d6d3d1', background: '#fff', padding: '8px 10px' }}>
                <Paperclip size={16} strokeWidth={2} color="#a8a29e" />
                <span style={{ flex: 1, fontSize: 13, color: '#a8a29e' }}>一次输入，广播到全部 2 列同时运行… Enter 发送（Shift+Enter 换行）</span>
                <span style={{ display: 'flex', height: 28, width: 28, alignItems: 'center', justifyContent: 'center', borderRadius: 8, background: '#2563eb', color: '#fff' }}>
                  <Send size={14} strokeWidth={2} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function CompareColumn({
  index,
  model,
  bubbles,
  bordered,
}: {
  index: number;
  model: string;
  bubbles: Bubble[];
  bordered: boolean;
}) {
  return (
    <div style={{ display: 'flex', flex: 1, minWidth: 0, flexDirection: 'column', borderRight: bordered ? '1px solid rgba(231,229,224,0.7)' : 'none' }}>
      {/* column head */}
      <header style={{ display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid rgba(231,229,224,0.7)', background: 'rgba(244,243,238,0.3)', padding: '8px 12px' }}>
        <span style={{ height: 16, width: 16, flexShrink: 0, borderRadius: 4, background: GRADIENT }} />
        <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12, fontWeight: 500, color: '#292524' }}>
          {model}
          <span style={{ marginLeft: 4, fontSize: 10.5, fontWeight: 400, color: '#a8a29e' }}>列 {index + 1}</span>
        </span>
        <MessageSquare size={14} strokeWidth={2} color="#a8a29e" />
        <Settings2 size={14} strokeWidth={2} color="#a8a29e" />
        <Trash2 size={14} strokeWidth={2} color="#a8a29e" />
        <X size={14} strokeWidth={2} color="#a8a29e" />
      </header>

      {/* messages */}
      <div style={{ flex: 1, overflow: 'auto', padding: '14px 14px 4px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {bubbles.map((b, i) => (
          <MessageBubble key={i} bubble={b} />
        ))}
      </div>
    </div>
  );
}

function MessageBubble({ bubble }: { bubble: Bubble }) {
  const isUser = bubble.role === 'user';
  return (
    <div style={{ display: 'flex', gap: 8, flexDirection: isUser ? 'row-reverse' : 'row' }}>
      {!isUser && (
        <span style={{ marginTop: 2, display: 'flex', height: 24, width: 24, flexShrink: 0, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: GRADIENT, color: '#fff' }}>
          <Bot size={14} strokeWidth={2} />
        </span>
      )}
      <div style={{ display: 'flex', minWidth: 0, maxWidth: '88%', flexDirection: 'column', gap: 4, alignItems: isUser ? 'flex-end' : 'flex-start' }}>
        <div
          style={{
            minWidth: 0,
            borderRadius: 16,
            borderTopRightRadius: isUser ? 4 : 16,
            borderTopLeftRadius: isUser ? 16 : 4,
            padding: '8px 12px',
            fontSize: 13,
            lineHeight: 1.55,
            background: isUser ? '#2563eb' : '#fff',
            color: isUser ? '#fff' : '#292524',
            border: isUser ? 'none' : '1px solid #e7e5e0',
            boxShadow: isUser ? 'none' : '0 1px 2px rgba(0,0,0,0.04)',
          }}
        >
          {bubble.text}
        </div>
        {!isUser && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 4px', fontSize: 10, color: '#a8a29e' }}>
            {bubble.tok && (
              <span style={{ fontFamily: MONO }}>↑{bubble.tok[0]} ↓{bubble.tok[1]}</span>
            )}
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
              <ListTree size={12} strokeWidth={2} /> trace
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
