import { PreviewFrame } from '../../../_layout';
import { X, Paperclip, Send, MessageSquare, Plus, MoreHorizontal } from 'lucide-react';

/**
 * embed-widget-bubble-shell · Chameleon 嵌入式浮动气泡对话挂件
 * 源码：embed/src/styles.ts (buildStyles) · embed/src/widget.ts
 * 全视觉由 admin ui_config 驱动。默认：themeColor indigo #6366F1，header 白底深字，
 * 头像 icon_emoji 🤖，bubble_icon chat=message-square，tooltip transparent/top。
 * 1:1：含历史会话 sidebar overlay / 附件 chips（ready/busy/failed）/ transparent + fullscreen 气泡态。
 */

const THEME = '#6366F1';
const sans = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const SHADOW_LG = '0 12px 40px rgba(0,0,0,.18), 0 4px 12px rgba(0,0,0,.08)';
const FONT_PANEL = 13.5; // md
const FONT_META = 12; // md
const PANE_TEXT = '#111827';
const SUBTLE = '#6B7280';
const BORDER = '#E5E7EB';
// header_bg 默认 '#FFFFFF' → headerText 自适应深色 #111827（light），非主题紫
const HEADER_BG = '#FFFFFF';
const HEADER_TEXT = '#111827';
const themeColor55 = 'rgba(99,102,241,0.33)'; // ${themeColor}55
const themeColor14 = 'rgba(99,102,241,0.08)'; // active bg
const themeColor1a = 'rgba(99,102,241,0.10)'; // avatar bg

export default function EmbedWidgetBubbleShell() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <style>{`@keyframes ewb-typing{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-4px);opacity:1}}
@keyframes ewb-spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ position: 'relative', minHeight: 720, padding: 24, fontFamily: sans, display: 'flex', gap: 28, alignItems: 'flex-start', justifyContent: 'center', flexWrap: 'wrap' }}>

        {/* ============ 弹出面板（主对话态） ============ */}
        <div style={{ position: 'relative', width: 400, height: 600, background: '#fff', color: PANE_TEXT, borderRadius: 12, boxShadow: SHADOW_LG, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* header：白底 + 深字，emoji 22px */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: HEADER_BG, color: HEADER_TEXT }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
              <span style={{ fontSize: 22, lineHeight: 1 }}>🤖</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>客服助手</div>
                <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>在线 · 通常几秒内回复</div>
              </div>
            </div>
            <button style={{ background: 'transparent', border: 'none', color: HEADER_TEXT, cursor: 'pointer', padding: 4, borderRadius: 6, display: 'flex' }}>
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12, background: '#fff' }}>
            {/* greeting（bot） */}
            <Msg role="bot">
              你好！我可以帮你查询订单、退换货政策，或解答产品问题。试试下面的问题？
            </Msg>
            {/* suggested questions：紧跟 greeting，整块无缩进 */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
              {['查询我的订单', '退货流程'].map(q => (
                <button key={q} style={{ background: 'transparent', border: `1px solid ${THEME}`, color: THEME, padding: '5px 12px', borderRadius: 999, fontSize: FONT_META, cursor: 'pointer', lineHeight: 1.3, fontFamily: sans }}>{q}</button>
              ))}
            </div>
            {/* user */}
            <Msg role="user">我的订单 #20381 什么时候发货？</Msg>
            {/* bot with citation chip（📎 前缀） */}
            <Msg role="bot">
              订单 #20381 已于今天 14:30 出库，预计明天送达。
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#475569', padding: '2px 8px', borderRadius: 10, fontSize: FONT_META, lineHeight: 1.4 }}>📎 物流单 SF1234567</span>
              </div>
            </Msg>
            {/* typing（思考中） */}
            <div style={{ display: 'flex', alignSelf: 'flex-start', gap: 6, maxWidth: '88%' }}>
              <span style={{ fontSize: 18, lineHeight: 1, paddingTop: 3, flexShrink: 0 }}>🤖</span>
              <div style={{ padding: '9px 12px', borderRadius: 18, borderTopLeftRadius: 4, background: '#fff', border: `1px solid ${BORDER}` }}>
                <span style={{ display: 'inline-flex', gap: 4, padding: '4px 0' }}>
                  {[0, 0.15, 0.3].map(d => (
                    <span key={d} style={{ width: 6, height: 6, borderRadius: '50%', background: SUBTLE, animation: `ewb-typing 1.2s infinite ease-in-out`, animationDelay: `${d}s`, display: 'inline-block' }} />
                  ))}
                </span>
              </div>
            </div>
          </div>

          {/* 附件 chips（composer 上方，border-top；ready / busy / failed 三态） */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '8px 12px', borderTop: `1px solid ${BORDER}` }}>
            {/* ready：📎 + 名 + × */}
            <AttChip>
              <span style={{ width: 20, textAlign: 'center' }}>📎</span>
              <span style={attName}>合同.pdf</span>
              <AttRemove />
            </AttChip>
            {/* busy：spinner */}
            <AttChip variant="busy">
              <span style={{ width: 14, height: 14, border: `2px solid ${SUBTLE}`, borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', opacity: 0.6, animation: 'ewb-spin .7s linear infinite', flexShrink: 0, margin: '0 3px 0 1px' }} />
              <span style={attName}>报表.xlsx</span>
              <span style={{ fontSize: 11, color: SUBTLE, paddingRight: 2 }}>解析中</span>
              <AttRemove />
            </AttChip>
            {/* failed：⚠ */}
            <AttChip variant="failed">
              <span style={{ width: 20, textAlign: 'center' }}>⚠</span>
              <span style={{ ...attName, color: 'rgb(190,18,60)' }}>大文件.zip</span>
              <AttRemove failed />
            </AttChip>
          </div>

          {/* composer：upload-btn 38×38 radius 10 + textarea + send */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 14px 6px', background: '#fff' }}>
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: SUBTLE, width: 38, height: 38, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, flexShrink: 0 }}>
              <Paperclip size={17} strokeWidth={2} />
            </button>
            <textarea
              placeholder="输入消息…"
              rows={1}
              style={{ flex: 1, border: `1px solid #D1D5DB`, background: '#fff', color: PANE_TEXT, borderRadius: 12, minHeight: 38, padding: '8px 14px', resize: 'none', fontFamily: sans, fontSize: FONT_PANEL, lineHeight: 1.4, outline: 'none', boxShadow: '0 1px 2px rgba(15,23,42,.04), 0 4px 12px rgba(15,23,42,.04)', boxSizing: 'border-box' }}
            />
            <button style={{ background: THEME, color: '#fff', border: 'none', borderRadius: 12, width: 38, height: 38, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 6px rgba(99,102,241,.30)' }}>
              <Send size={16} strokeWidth={2} />
            </button>
          </div>

          {/* brand 水印 */}
          <div style={{ textAlign: 'center', fontSize: 11, color: '#94A3B8', padding: '4px 0 8px', background: '#fff' }}>
            powered by Chameleon
          </div>

          {/* 历史会话 sidebar overlay（absolute inset-0 z-5，覆盖主对话区） */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 5, display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 12 }}>
            {/* sidebar-head */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderBottom: `1px solid ${BORDER}` }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: PANE_TEXT }}>
                {/* sidebar-title::before 3px×14 竖条 themeColor */}
                <span style={{ display: 'block', width: 3, height: 14, borderRadius: 2, background: THEME }} />
                历史记录
              </span>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', background: '#fff', color: THEME, border: `1px solid ${themeColor55}`, borderRadius: 999, cursor: 'pointer', fontSize: 12, fontWeight: 500 }}>
                  <Plus size={14} strokeWidth={2} /> 新对话
                </button>
                <button style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, background: 'transparent', border: 'none', borderRadius: 5, color: SUBTLE, cursor: 'pointer' }}>
                  <X size={16} strokeWidth={2} />
                </button>
              </div>
            </div>
            {/* sidebar-list */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
              <SidebarItem title="订单 #20381 物流查询" time="2 分钟前" active />
              <SidebarItem title="退货政策咨询" time="昨天" />
              <SidebarItem title="产品规格对比" time="3 天前" />
            </div>
          </div>
        </div>

        {/* ============ 右侧：气泡三态 + tooltip ============ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'center' }}>
          {/* 实色气泡 + tooltip（transparent line，在气泡上方 top） */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            {/* tooltip transparent：无白底无边框无阴影，仅文字 #1f2937 13px */}
            <div style={{ padding: '4px 0', lineHeight: 1.4, whiteSpace: 'nowrap', maxWidth: 220, fontSize: 13, fontWeight: 400, color: '#1f2937' }}>
              有问题？点我聊聊
            </div>
            {/* 气泡 56px，bubble_icon=chat → message-square，icon size round(56*0.47)=26 */}
            <button style={{ position: 'relative', width: 56, height: 56, borderRadius: '50%', background: THEME, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: SHADOW_LG, border: 'none', flexShrink: 0 }}>
              <MessageSquare size={26} color="#fff" strokeWidth={2} />
            </button>
            <span style={{ fontSize: 10.5, color: '#a8a29e', fontFamily: 'Inter, system-ui, sans-serif' }}>实色气泡</span>
          </div>

          {/* transparent 气泡模式：去背景去阴影，svg drop-shadow 描黑 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <button style={{ width: 56, height: 56, borderRadius: '50%', background: 'transparent', color: THEME, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'none', border: 'none', flexShrink: 0 }}>
              <MessageSquare size={26} color={THEME} strokeWidth={2} style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))' }} />
            </button>
            <span style={{ fontSize: 10.5, color: '#a8a29e', fontFamily: 'Inter, system-ui, sans-serif' }}>transparent 气泡</span>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

/* ── 单条消息（bot 左用 🤖 emoji / user 右，带 tail 直角） ── */
function Msg({ role, children }: { role: 'bot' | 'user'; children: React.ReactNode }) {
  const isUser = role === 'user';
  return (
    <div style={{ display: 'flex', maxWidth: '88%', gap: 6, alignSelf: isUser ? 'flex-end' : 'flex-start', flexDirection: isUser ? 'row-reverse' : 'row' }}>
      {!isUser && (
        <span style={{ fontSize: 18, lineHeight: 1, paddingTop: 3, flexShrink: 0 }}>🤖</span>
      )}
      <div
        style={{
          padding: '9px 12px',
          borderRadius: 18,
          ...(isUser
            ? { borderTopRightRadius: 4, background: THEME, color: '#fff' }
            : { borderTopLeftRadius: 4, background: '#fff', color: PANE_TEXT, border: `1px solid ${BORDER}` }),
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

const attName: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

/* ── 附件 chip：rounded-999 边框 220 max-w，三态 ── */
function AttChip({ variant, children }: { variant?: 'busy' | 'failed'; children: React.ReactNode }) {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '4px 8px 4px 4px',
    border: `1px solid ${BORDER}`,
    borderRadius: 999,
    background: '#fff',
    fontSize: FONT_META,
    maxWidth: 220,
  };
  if (variant === 'busy') {
    base.background = 'rgba(127,127,127,.06)';
  }
  if (variant === 'failed') {
    base.background = 'rgba(244,63,94,0.08)';
    base.border = '1px solid rgba(244,63,94,0.45)';
    base.color = 'rgb(190,18,60)';
  }
  return <span style={base}>{children}</span>;
}

function AttRemove({ failed }: { failed?: boolean }) {
  return (
    <button
      style={{
        width: 18,
        height: 18,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: failed ? 'rgb(190,18,60)' : SUBTLE,
        fontSize: 14,
        lineHeight: 1,
        borderRadius: 999,
      }}
    >
      ×
    </button>
  );
}

/* ── sidebar-item：24px 圆 avatar + 标题 + 时间 + 三点（active 高亮 themeColor） ── */
function SidebarItem({ title, time, active }: { title: string; time: string; active?: boolean }) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 10px',
        borderRadius: 8,
        cursor: 'pointer',
        fontSize: 13,
        marginTop: 2,
        background: active ? themeColor14 : 'transparent',
        color: active ? THEME : PANE_TEXT,
      }}
    >
      <span style={{ width: 24, height: 24, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: themeColor1a, color: THEME, fontSize: 14, lineHeight: 1, overflow: 'hidden' }}>
        🤖
      </span>
      <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
      <span style={{ flexShrink: 0, fontSize: 11, color: active ? THEME : SUBTLE, opacity: active ? 0.7 : 1 }}>{time}</span>
      <span style={{ flexShrink: 0, opacity: active ? 1 : 0 }}>
        <button style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, padding: 0, background: 'transparent', border: 'none', borderRadius: 4, color: SUBTLE, cursor: 'pointer' }}>
          <MoreHorizontal size={14} strokeWidth={2} />
        </button>
      </span>
    </div>
  );
}
