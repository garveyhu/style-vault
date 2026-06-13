import { PreviewFrame } from '../../../_layout';
import { Bot, ListTree, BookmarkPlus, Wand2, MoreHorizontal, Image as ImageIcon, Loader2 } from 'lucide-react';

/**
 * message-list-bubble-thread · Chameleon Playground/widget 共用气泡式对话流
 * 源码：system/playground/components/message-thread.tsx (整文件，重点 :37-349)
 *        + core/components/ui/neon-loader.tsx + assets/styles/theme.css(.neon-loader__*)
 *        + core/components/common/image-gen-loading.tsx
 * 1:1：NeonLoader 环 conic from 90deg(violet→fuchsia→cyan + transparent 缺口)+辉光 / 流光文字 /
 *      failed rose-200/50/700 / pinned 📌 / 📎 emoji 文件 chip / ImageGenLoading 含 hint
 */

const sans = 'Inter, system-ui, sans-serif';
const mono = 'JetBrains Mono, ui-monospace, monospace';

export default function MessageListBubbleThread() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <style>{`
@keyframes mbt-spin{to{transform:rotate(360deg)}}
@keyframes mbt-neon-spin{to{transform:rotate(360deg)}}
@keyframes mbt-shimmer{to{background-position:200% center}}
.mbt-neon-ring{
  width:14px;height:14px;border-radius:9999px;display:inline-block;flex-shrink:0;
  background:conic-gradient(from 90deg, transparent 0%, #8b5cf6 35%, #d946ef 55%, #22d3ee 75%, transparent 100%);
  -webkit-mask:radial-gradient(farthest-side, transparent calc(100% - 2.25px), #000 0);
  mask:radial-gradient(farthest-side, transparent calc(100% - 2.25px), #000 0);
  filter:drop-shadow(0 0 3px rgba(139,92,246,0.85)) drop-shadow(0 0 7px rgba(34,211,238,0.5));
  animation:mbt-neon-spin 0.85s linear infinite;
}
.mbt-neon-text{
  background:linear-gradient(90deg,#7c3aed,#d946ef,#22d3ee,#7c3aed);
  background-size:200% auto;
  -webkit-background-clip:text;background-clip:text;color:transparent;
  animation:mbt-shimmer 2.6s linear infinite;
}
`}</style>
      {/* VirtualList 外框：flex-1 px-4 pt-4 itemClassName pb-4 */}
      <div style={{ padding: '16px 16px 0', fontFamily: sans, display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 640 }}>

        {/* user 气泡（右，blue-600 右上 tail）+ footer 用量 */}
        <Row user>
          <Bubble user>帮我把上传的这张图改成黄昏色调，再写一段商品文案。</Bubble>
          <Footer user usage="↑ 28 ↓ 0" />
        </Row>

        {/* user 附件预览：图 h-28 w-28=112×112 rounded-lg border-stone-200/70 */}
        <Row user>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'flex-end' }}>
            <div style={{ overflow: 'hidden', borderRadius: 8, border: '1px solid rgba(231,229,224,0.7)' }}>
              <div style={{ height: 112, width: 112, background: 'linear-gradient(135deg,#fcd34d,#fb923c)' }} />
            </div>
          </div>
        </Row>

        {/* bot 气泡（左，渐变头像 + 白底左上 tail）+ footer 调试动作 */}
        <Row>
          <Avatar />
          <Col>
            <Bubble>已为你处理。黄昏色调偏暖橙、降低高光，文案如下：「夕照里的温柔，每一帧都值得收藏。」</Bubble>
            <Footer usage="↑ 28 ↓ 142" actions />
          </Col>
        </Row>

        {/* bot 流式态：NeonLoader「思考中…」size=sm 环 14×14 厚 2.25 + 流光文字 */}
        <Row>
          <Avatar />
          <Col>
            <Bubble>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span className="mbt-neon-ring" />
                <span className="mbt-neon-text" style={{ fontSize: 11.5, fontWeight: 500, letterSpacing: '0.02em' }}>思考中…</span>
              </span>
            </Bubble>
            <Footer streaming />
          </Col>
        </Row>

        {/* bot 媒体生成：ImageGenLoading 骨架 w-60=240 aspect-4/3 + 计时 + hint 行 */}
        <Row>
          <Avatar />
          <Col>
            <div style={{ width: 240, aspectRatio: '4 / 3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, borderRadius: 12, border: '1px solid #e7e5e4', background: 'linear-gradient(100deg,#f4f3ee 30%,#faf9f5 50%,#f4f3ee 70%)' }}>
              <div style={{ position: 'relative' }}>
                <ImageIcon size={36} color="#d6d3d1" strokeWidth={2} />
                <span style={{ position: 'absolute', right: -8, bottom: -8, display: 'flex', height: 20, width: 20, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#fff', boxShadow: '0 1px 2px rgb(0 0 0 / 5%)' }}>
                  <Loader2 size={14} color="#8b5cf6" strokeWidth={2} style={{ animation: 'mbt-spin 0.9s linear infinite' }} />
                </span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#57534e' }}>正在生成图片</div>
              <div style={{ fontFamily: mono, fontSize: 12, color: '#a8a29e', fontVariantNumeric: 'tabular-nums' }}>0:42</div>
              {/* hint 行 text-[11px] text-stone-400 leading-snug max-w-[80%] center */}
              <div style={{ maxWidth: '80%', textAlign: 'center', fontSize: 11, lineHeight: 1.3, color: '#a8a29e' }}>
                正在生成图片…
              </div>
            </div>
          </Col>
        </Row>

        {/* bot failed 红气泡：border-rose-200 #fecdd3 / bg-rose-50 #fff1f2 / text-rose-700 #be123c */}
        <Row>
          <Avatar />
          <Col>
            <div style={{ minWidth: 0, maxWidth: '88%', borderRadius: 16, borderTopLeftRadius: 2, padding: '8px 12px', fontSize: 13, lineHeight: 1.625, border: '1px solid #fecdd3', background: '#fff1f2', color: '#be123c' }}>
              模型调用超时，请重试。
              {/* 错误副行 mt-1 text-[12px] text-rose-600 #dc2626 */}
              <div style={{ marginTop: 4, fontSize: 12, color: '#dc2626' }}>upstream timeout (30s)</div>
            </div>
          </Col>
        </Row>

        {/* bot pinned 琥珀 ring + paused 占位（⏸ emoji，纯文字） */}
        <Row>
          <Avatar />
          <Col>
            <div style={{ minWidth: 0, maxWidth: '88%', borderRadius: 16, borderTopLeftRadius: 2, padding: '8px 12px', fontSize: 13, lineHeight: 1.625, border: '1px solid #e7e5e4', background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.04)', outline: '1px solid #fcd34d', color: '#292524' }}>
              <span style={{ color: '#d97706' }}>⏸ 等待人工输入…</span>
            </div>
            {/* footer pinned 标记：纯 📌 emoji（text-amber-600 #d97706） */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 4px', fontSize: 10, color: '#a8a29e' }}>
              <span style={{ color: '#d97706' }}>📌</span>
              <span style={{ fontFamily: mono, fontVariantNumeric: 'tabular-nums' }}>↑ 16 ↓ 88</span>
            </div>
          </Col>
        </Row>

        {/* 文件附件 chip：📎 emoji 前缀 rounded-full border-stone-200/70 bg-stone-50/60 px-2.5 py-1 text-[11px] text-stone-700 */}
        <Row>
          <Avatar />
          <Col>
            <a style={{ display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 9999, border: '1px solid rgba(231,229,224,0.7)', background: 'rgba(250,250,249,0.6)', padding: '4px 10px', fontSize: 11, color: '#44403c' }}>
              📎 报告.pdf
            </a>
          </Col>
        </Row>
      </div>
    </PreviewFrame>
  );
}

/* ── 行 ── */
function Row({ user, children }: { user?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexDirection: user ? 'row-reverse' : 'row' }}>
      {children}
    </div>
  );
}

/* ── 渐变 bot 头像 h-6 w-6 from-violet-500 to-blue-500 ── */
function Avatar() {
  return (
    <div style={{ marginTop: 2, width: 24, height: 24, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'linear-gradient(135deg,#8b5cf6,#3b82f6)', color: '#fff' }}>
      <Bot size={14} color="#fff" strokeWidth={2} />
    </div>
  );
}

/* ── 气泡列 ── */
function Col({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0, maxWidth: '88%', alignItems: 'flex-start' }}>
      {children}
    </div>
  );
}

/* ── 气泡本体：rounded-2xl=16 px-3 py-2 text-[13px] leading-relaxed，tail rounded-tr/tl-sm=2 ── */
function Bubble({ user, children }: { user?: boolean; children: React.ReactNode }) {
  return (
    <div
      style={{
        minWidth: 0,
        maxWidth: user ? '88%' : undefined,
        borderRadius: 16,
        padding: '8px 12px',
        fontSize: 13,
        lineHeight: 1.625,
        ...(user
          ? { borderTopRightRadius: 2, background: '#2563eb', color: '#fff' }
          : { borderTopLeftRadius: 2, background: '#fff', color: '#292524', border: '1px solid #e7e5e4', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }),
      }}
    >
      {children}
    </div>
  );
}

/* ── footer：用量常显 + hover 动作（text-[10px] text-stone-400） ── */
function Footer({ user, usage, actions, streaming }: { user?: boolean; usage?: string; actions?: boolean; streaming?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 4px', fontSize: 10, color: '#a8a29e', flexDirection: user ? 'row-reverse' : 'row' }}>
      {streaming && <span style={{ color: '#2563eb' }}>生成中…</span>}
      {usage && <span style={{ fontFamily: mono, fontVariantNumeric: 'tabular-nums' }}>{usage}</span>}
      {actions && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <ActBtn icon={<ListTree size={12} color="#8b5cf6" strokeWidth={2} />} label="trace" color="#7c3aed" bg="#f5f3ff" />
          <ActBtn icon={<BookmarkPlus size={12} color="#10b981" strokeWidth={2} />} label="存样本" color="#059669" bg="#ecfdf5" />
          <ActBtn icon={<Wand2 size={12} color="#8b5cf6" strokeWidth={2} />} label="改写提示词" color="#7c3aed" bg="#f5f3ff" />
          <button style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 4, padding: '2px 4px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#a8a29e' }}>
            <MoreHorizontal size={12} color="#a8a29e" strokeWidth={2} />
          </button>
        </div>
      )}
    </div>
  );
}

/* 动作按钮（preview 用 hover 色直接上色示意「浮现态」）
 * trace/改写 hover:bg-violet-50(#f5f3ff)/text-violet-600(#7c3aed)，存样本 hover:bg-emerald-50(#ecfdf5)/text-emerald-600(#059669） */
function ActBtn({ icon, label, color, bg }: { icon: React.ReactNode; label: string; color: string; bg: string }) {
  return (
    <button style={{ display: 'inline-flex', alignItems: 'center', gap: 2, borderRadius: 4, padding: '2px 4px', background: bg, border: 'none', cursor: 'pointer', color, fontSize: 10, fontFamily: sans }}>
      {icon}
      {label}
    </button>
  );
}
