import { PreviewFrame } from '../../../_layout';
import { ExternalLink, Send, Sparkles, Trash2, X } from 'lucide-react';

/**
 * ai-copilot-panel · 右侧 AI 编排助手对话面板
 * 源码：src/system/graphs/components/ai-copilot-panel.tsx
 * 1:1：w-96 aside / 蓝-50 图标块 / 三态气泡 / trace 链接 / 进度气泡 / 蓝圆角发送钮
 */

const FONT = 'Inter, system-ui, sans-serif';

export default function AiCopilotPanel() {
  return (
    <PreviewFrame bg="#f4f3ee" padded>
      {/* 画布暗示底 + 右侧滑入 aside */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          height: 560,
          fontFamily: FONT,
          borderRadius: 12,
          overflow: 'hidden',
          background:
            'radial-gradient(circle, rgba(214,211,209,0.5) 1px, transparent 1px) 0 0 / 16px 16px, #f8f8f5',
        }}
      >
        <aside
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 384,
            background: '#fff',
            borderLeft: '1px solid rgba(226,232,240,0.8)',
            boxShadow: '-4px 0 24px rgb(0 0 0 / 6%)',
          }}
        >
          {/* 头部 */}
          <header
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              borderBottom: '1px solid rgba(226,232,240,0.8)',
              padding: '12px 16px',
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 28,
                width: 28,
                borderRadius: 8,
                background: '#eff6ff',
                color: '#2563eb',
              }}
            >
              <Sparkles size={14} />
            </span>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1c1917' }}>AI 编排助手</div>
              <div style={{ fontSize: 10.5, color: '#a8a29e' }}>
                描述需求，持续对话式生成 / 修改工作流
              </div>
            </div>
            <button style={iconBtn} title="清空会话历史">
              <Trash2 size={14} color="#a8a29e" />
            </button>
            <button style={iconBtn} title="关闭">
              <X size={15} color="#a8a29e" />
            </button>
          </header>

          {/* 消息流 */}
          <div
            style={{
              minHeight: 0,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              overflowY: 'auto',
              padding: '12px 16px',
            }}
          >
            {/* user 气泡 */}
            <Bubble role="user">加一个知识库检索，让大模型参考检索结果回答</Bubble>

            {/* assistant 气泡 + trace 链接 */}
            <Bubble role="assistant">
              已应用：+2 节点 · ~1 节点配置 · 连线变更 2 处
              <a
                href="#"
                onClick={e => e.preventDefault()}
                style={{
                  marginTop: 4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 10.5,
                  color: '#3b82f6',
                  textDecoration: 'none',
                }}
              >
                <ExternalLink size={12} />
                查看本轮生成 trace
              </a>
            </Bubble>

            <Bubble role="user">把回答前加一步意图分类，闲聊直接回复</Bubble>

            {/* error 气泡 */}
            <Bubble role="error">生成失败：图结构校验未通过（存在悬挂出边）</Bubble>

            {/* 进度气泡 */}
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div
                style={{
                  minWidth: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  borderRadius: 12,
                  background: '#f1f5f9',
                  padding: '8px 12px',
                  fontSize: 12,
                  color: '#57534e',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      height: 6,
                      width: 6,
                      borderRadius: '50%',
                      background: '#3b82f6',
                      animation: 'cp-pulse 1.4s ease-in-out infinite',
                    }}
                  />
                  生成中 · 已产出 412 字
                </div>
                <div
                  style={{
                    borderRadius: 6,
                    background: '#fffbeb',
                    padding: '4px 8px',
                    fontSize: 10.5,
                    lineHeight: 1.45,
                    color: '#b45309',
                  }}
                >
                  上轮问题：classifier 缺少默认出口
                </div>
              </div>
            </div>
          </div>

          {/* 输入区 */}
          <div style={{ borderTop: '1px solid rgba(226,232,240,0.8)', padding: 12 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <textarea
                rows={2}
                defaultValue=""
                placeholder="描述要生成 / 修改的内容…（Enter 发送，Shift+Enter 换行）"
                style={{
                  flex: 1,
                  resize: 'none',
                  minHeight: 48,
                  maxHeight: 128,
                  fontSize: 12,
                  fontFamily: FONT,
                  color: '#1c1917',
                  padding: '8px 10px',
                  border: '1px solid #d6d3d1',
                  borderRadius: 8,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              <button
                title="发送"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 36,
                  width: 36,
                  flexShrink: 0,
                  borderRadius: 12,
                  background: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  boxShadow: '0 1px 2px rgb(0 0 0 / 10%)',
                  cursor: 'pointer',
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </aside>
      </div>
      <style>{`@keyframes cp-pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.35 } }`}</style>
    </PreviewFrame>
  );
}

function Bubble({ role, children }: { role: 'user' | 'assistant' | 'error'; children: React.ReactNode }) {
  const isUser = role === 'user';
  const style: React.CSSProperties = {
    maxWidth: '85%',
    borderRadius: 12,
    padding: '8px 12px',
    fontSize: 12,
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap',
  };
  if (isUser) {
    Object.assign(style, { background: '#2563eb', color: '#fff' });
  } else if (role === 'error') {
    Object.assign(style, {
      background: '#fff1f2',
      color: '#be123c',
      boxShadow: 'inset 0 0 0 1px #fecdd3',
    });
  } else {
    Object.assign(style, { background: '#f1f5f9', color: '#44403c' });
  }
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div style={style}>{children}</div>
    </div>
  );
}

const iconBtn: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  padding: 6,
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
};
