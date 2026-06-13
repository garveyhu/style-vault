import { PreviewFrame } from '../../../_layout';
import { Bot, X, Paperclip, Send, MessageSquare, History } from 'lucide-react';

/**
 * embed-widget-bubble-shell · Chameleon 嵌入式浮动气泡对话挂件
 * 源码：embed/src/styles.ts (buildStyles) · embed/src/widget.ts
 * 全视觉由 admin ui_config 驱动；主色默认 indigo #6366F1。
 */

const THEME = '#6366F1';
const sans = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const SHADOW_LG = '0 12px 40px rgba(0,0,0,.18), 0 4px 12px rgba(0,0,0,.08)';
const FONT_PANEL = 13.5; // md

export default function EmbedWidgetBubbleShell() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <style>{`@keyframes ewb-typing{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-4px);opacity:1}}`}</style>
      <div style={{ position: 'relative', minHeight: 660, padding: 24, fontFamily: sans, display: 'flex', gap: 28, alignItems: 'flex-end', justifyContent: 'center', flexWrap: 'wrap' }}>

        {/* ============ 弹出面板 ============ */}
        <div style={{ width: 400, height: 600, background: '#fff', color: '#111827', borderRadius: 12, boxShadow: SHADOW_LG, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: THEME, color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
              <span style={{ width: 22, height: 22, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={20} color="#fff" strokeWidth={2} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>客服助手</div>
                <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>在线 · 通常几秒内回复</div>
              </div>
            </div>
            <button style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: 4, borderRadius: 6, display: 'flex' }}>
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12, background: '#fff' }}>
            {/* bot */}
            <Msg role="bot">
              你好！我可以帮你查询订单、退换货政策，或解答产品问题。试试下面的问题？
            </Msg>
            {/* suggested questions */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: -4, paddingLeft: 28 }}>
              {['查询我的订单', '退货流程'].map(q => (
                <button key={q} style={{ background: 'transparent', border: `1px solid ${THEME}`, color: THEME, padding: '5px 12px', borderRadius: 999, fontSize: 12, cursor: 'pointer', lineHeight: 1.3, fontFamily: sans }}>{q}</button>
              ))}
            </div>
            {/* user */}
            <Msg role="user">我的订单 #20381 什么时候发货？</Msg>
            {/* bot with citation */}
            <Msg role="bot">
              订单 #20381 已于今天 14:30 出库，预计明天送达。
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#475569', padding: '2px 8px', borderRadius: 10, fontSize: 12, lineHeight: 1.4 }}>物流单 SF1234567</span>
              </div>
            </Msg>
            {/* typing */}
            <div style={{ display: 'flex', alignSelf: 'flex-start', gap: 6, maxWidth: '88%' }}>
              <span style={{ fontSize: 18, lineHeight: 1, paddingTop: 3, flexShrink: 0, color: THEME }}><Bot size={18} strokeWidth={2} /></span>
              <div style={{ padding: '9px 12px', borderRadius: 18, borderTopLeftRadius: 4, background: '#fff', border: '1px solid #E5E7EB' }}>
                <span style={{ display: 'inline-flex', gap: 4, padding: '4px 0' }}>
                  {[0, 0.15, 0.3].map(d => (
                    <span key={d} style={{ width: 6, height: 6, borderRadius: '50%', background: '#6B7280', animation: `ewb-typing 1.2s infinite ease-in-out`, animationDelay: `${d}s`, display: 'inline-block' }} />
                  ))}
                </span>
              </div>
            </div>
          </div>

          {/* composer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 14px 6px', background: '#fff' }}>
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#6B7280', width: 38, height: 38, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, flexShrink: 0 }}>
              <Paperclip size={17} strokeWidth={2} />
            </button>
            <textarea
              placeholder="输入消息…"
              rows={1}
              style={{ flex: 1, border: '1px solid #D1D5DB', background: '#fff', color: '#111827', borderRadius: 12, minHeight: 38, padding: '8px 14px', resize: 'none', fontFamily: sans, fontSize: FONT_PANEL, lineHeight: 1.4, outline: 'none', boxShadow: '0 1px 2px rgba(15,23,42,.04), 0 4px 12px rgba(15,23,42,.04)', boxSizing: 'border-box' }}
            />
            <button style={{ background: THEME, color: '#fff', border: 'none', borderRadius: 12, width: 38, height: 38, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 6px rgba(99,102,241,.30)' }}>
              <Send size={16} strokeWidth={2} />
            </button>
          </div>

          {/* brand 水印 */}
          <div style={{ textAlign: 'center', fontSize: 11, color: '#94A3B8', padding: '4px 0 8px', background: '#fff' }}>
            powered by Chameleon
          </div>
        </div>

        {/* ============ 浮动气泡 + tooltip ============ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, alignSelf: 'flex-end', marginBottom: 8 }}>
          {/* tooltip line（在气泡左） */}
          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: '7px 12px', lineHeight: 1.4, whiteSpace: 'nowrap', maxWidth: 220, boxShadow: '0 4px 14px rgba(0,0,0,0.08)', fontSize: 13, color: '#111827' }}>
            有问题？点我聊聊
          </div>
          {/* 气泡 56px */}
          <button style={{ position: 'relative', width: 56, height: 56, borderRadius: '50%', background: THEME, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: SHADOW_LG, border: 'none', flexShrink: 0 }}>
            <MessageSquare size={26} color="#fff" strokeWidth={2} />
          </button>
        </div>

        {/* 角落辅助：历史会话入口示意标签 */}
        <div style={{ position: 'absolute', left: 24, top: 24, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: '#a8a29e', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <History size={14} color="#a8a29e" strokeWidth={2} />
          挂件含历史会话 overlay 侧栏 + fullscreen iframe 模式
        </div>
      </div>
    </PreviewFrame>
  );
}

/* ── 单条消息（bot 左 / user 右，带 tail 直角） ── */
function Msg({ role, children }: { role: 'bot' | 'user'; children: React.ReactNode }) {
  const isUser = role === 'user';
  return (
    <div style={{ display: 'flex', maxWidth: '88%', gap: 6, alignSelf: isUser ? 'flex-end' : 'flex-start', flexDirection: isUser ? 'row-reverse' : 'row' }}>
      {!isUser && (
        <span style={{ fontSize: 18, lineHeight: 1, paddingTop: 3, flexShrink: 0, color: THEME }}>
          <Bot size={18} strokeWidth={2} />
        </span>
      )}
      <div
        style={{
          padding: '9px 12px',
          borderRadius: 18,
          ...(isUser
            ? { borderTopRightRadius: 4, background: THEME, color: '#fff' }
            : { borderTopLeftRadius: 4, background: '#fff', color: '#111827', border: '1px solid #E5E7EB' }),
          fontSize: FONT_PANEL,
          lineHeight: 1.6,
          wordBreak: 'break-word',
        }}
      >
        {children}
      </div>
    </div>
  );
}
