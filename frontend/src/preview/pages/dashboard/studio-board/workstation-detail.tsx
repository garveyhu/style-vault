import { PreviewFrame } from '../../../_layout';

// ── studio-board 暖砂/workstation light token（一字不差取自源码 tokens.css）──
const SAND = '#f0eeea';
const SURFACE = '#fffdfa';
const INK = '#2a2620';
const MUTED = '#8f8676';
const MUTED_STRONG = '#4a4438';
const BORDER = 'rgba(42,38,32,0.11)';
const SUCCESS = '#5b8c5a';
const WARNING = '#c8891f';
const GLASS = 'rgba(255,253,248,0.74)';
const GLASS_BRD = 'rgba(255,255,255,0.82)';
const LEAK = 'rgba(255,255,255,0.95)';
const SHADOW_MD = '0 18px 36px -24px rgba(74,54,20,0.12), 0 2px 8px -6px rgba(74,54,20,0.05)';
const SHADOW_LG = '0 30px 60px -30px rgba(74,54,20,0.16), 0 6px 16px -10px rgba(74,54,20,0.07)';
const GLASS_INSET = 'inset 0 1px 0 rgba(255,255,255,0.7)';
const DISPLAY = "'Space Grotesk','IBM Plex Sans','PingFang SC',sans-serif";
const MONO = "'JetBrains Mono',ui-monospace,monospace";
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const glass: React.CSSProperties = {
  position: 'relative',
  background: GLASS,
  backdropFilter: 'blur(30px) saturate(140%)',
  WebkitBackdropFilter: 'blur(30px) saturate(140%)',
  border: `1px solid ${GLASS_BRD}`,
  boxShadow: `${SHADOW_MD}, ${GLASS_INSET}`,
  borderRadius: 16,
};

function Leak() {
  return (
    <span
      style={{
        position: 'absolute',
        top: 0,
        left: '8%',
        right: '8%',
        height: 1,
        background: `linear-gradient(90deg, transparent, ${LEAK}, transparent)`,
        pointerEvents: 'none',
      }}
    />
  );
}

function CheckDot({ size = 26 }: { size?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: SUCCESS,
        boxShadow: '0 4px 12px -4px rgba(91,140,90,0.5)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="#fff" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

function Step({ name, sub = '已完成' }: { name: string; sub?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 6px', position: 'relative' }}>
      <CheckDot />
      <span style={{ minWidth: 0 }}>
        <span style={{ display: 'block', fontFamily: DISPLAY, fontSize: 14, fontWeight: 500, color: INK }}>{name}</span>
        <span style={{ display: 'block', fontFamily: MONO, fontSize: 10, color: MUTED }}>{sub}</span>
      </span>
    </div>
  );
}

function LaneLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: '0 6px', marginBottom: 8 }}>
      <span style={{ fontFamily: MONO, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: MUTED, opacity: 0.6 }}>{children}</span>
    </div>
  );
}

function Stat({ value, unit, label }: { value: string; unit?: string; label: string }) {
  return (
    <div>
      <div style={{ fontFamily: DISPLAY, fontSize: 22, fontWeight: 700, color: INK, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
        {value}
        {unit && <span style={{ marginLeft: 2, fontSize: 13, fontWeight: 600, color: MUTED }}>{unit}</span>}
      </div>
      <div style={{ marginTop: 4, fontSize: 10.5, letterSpacing: '0.03em', color: MUTED }}>{label}</div>
    </div>
  );
}

function PlatformRow({ logo, color, name, url }: { logo: string; color: string; name: string; url: string }) {
  return (
    <div style={{ ...glass, display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 14 }}>
      <span style={{ width: 30, height: 30, borderRadius: 8, background: color, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 12, flexShrink: 0 }}>{logo}</span>
      <span style={{ minWidth: 0, flex: 1 }}>
        <span style={{ display: 'block', fontFamily: DISPLAY, fontSize: 14, fontWeight: 600, color: INK }}>{name}</span>
        <span style={{ display: 'block', fontFamily: MONO, fontSize: 10.5, color: MUTED, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{url}</span>
      </span>
      <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, color: SUCCESS, border: `1px solid ${SUCCESS}`, background: SURFACE, borderRadius: 999, padding: '2px 8px', flexShrink: 0 }}>已发布</span>
    </div>
  );
}

export default function WorkstationDetailPreview() {
  return (
    <PreviewFrame bg={SAND} padded={false}>
      <div
        style={{
          width: 1440,
          height: 900,
          position: 'relative',
          overflow: 'hidden',
          fontFamily: DISPLAY,
          color: INK,
          background:
            'radial-gradient(72vw 60vh at 84% -14%, rgba(200,137,31,0.10), transparent 60%),' +
            'radial-gradient(60vw 50vh at 8% 4%, rgba(178,152,116,0.10), transparent 55%),' +
            'linear-gradient(168deg, #f0eeea, #e9e5df 70%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          padding: 16,
          boxSizing: 'border-box',
        }}
      >
        {/* 全幅颗粒 */}
        <span style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.06, mixBlendMode: 'overlay', backgroundImage: GRAIN, pointerEvents: 'none' }} />

        {/* ① 浮动玻璃顶栏 */}
        <header style={{ ...glass, zIndex: 1, display: 'flex', alignItems: 'center', gap: 14, padding: '12px 22px', flexShrink: 0 }}>
          <Leak />
          <span style={{ border: `1px solid ${BORDER}`, background: 'rgba(255,253,250,0.6)', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 600, color: MUTED_STRONG }}>← 看板</span>
          <span style={{ minWidth: 0 }}>
            <span style={{ display: 'block', fontFamily: DISPLAY, fontSize: 15, fontWeight: 600, color: INK, lineHeight: 1.2 }}>7M 参数小模型反超前沿大模型：推理一定要靠规模吗</span>
            <span style={{ display: 'block', fontFamily: MONO, fontSize: 10, color: MUTED }}>260702-tiny-model-reasoning</span>
          </span>
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ display: 'inline-flex', gap: 4 }}>
                {[0, 1, 2].map((i) => <span key={i} style={{ width: 7, height: 7, borderRadius: 999, background: SUCCESS }} />)}
                <span style={{ width: 8 }} />
                {[0, 1, 2, 3, 4].map((i) => <span key={i} style={{ width: 7, height: 7, borderRadius: 999, background: SUCCESS }} />)}
              </span>
              <span style={{ fontFamily: DISPLAY, fontSize: 13, fontWeight: 600, color: SUCCESS }}>全部完成</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px solid ${BORDER}`, background: 'rgba(255,253,250,0.6)', borderRadius: 999, padding: '5px 12px', fontFamily: MONO, fontSize: 12, color: MUTED_STRONG }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: SUCCESS }} /> 已发布　74.6 MB · 7-05 17:58
            </span>
            <span style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${BORDER}`, background: 'rgba(255,253,250,0.6)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: MUTED_STRONG }}>◐</span>
            <span style={{ background: INK, color: SURFACE, borderRadius: 8, padding: '9px 16px', fontFamily: DISPLAY, fontWeight: 700, fontSize: 14 }}>打开成片</span>
          </span>
        </header>

        {/* ② 三栏主区 */}
        <div style={{ zIndex: 1, display: 'flex', gap: 14, flex: 1, minHeight: 0 }}>
          {/* 左 260 管线轨 */}
          <aside style={{ ...glass, width: 260, borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0 }}>
            <Leak />
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 4px' }}>
              <span style={{ fontFamily: DISPLAY, fontSize: 14, fontWeight: 600, color: INK }}>生产管线</span>
              <span style={{ fontFamily: MONO, fontSize: 11, color: SUCCESS, border: '1px solid rgba(91,140,90,0.3)', background: 'rgba(91,140,90,0.1)', borderRadius: 999, padding: '2px 8px' }}>9 / 9</span>
            </div>
            <div>
              <LaneLabel>创意 · 需你定稿</LaneLabel>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ position: 'absolute', top: 16, bottom: 16, left: 19, width: 1, background: BORDER }} />
                <Step name="选题" />
                <Step name="脚本" />
                <Step name="分镜" />
              </div>
            </div>
            <div>
              <LaneLabel>制作 · 自动执行</LaneLabel>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ position: 'absolute', top: 16, bottom: 44, left: 19, width: 1, background: BORDER }} />
                <Step name="素材" />
                <Step name="配音" />
                <Step name="字幕" />
                <Step name="剪辑" />
                <Step name="封面" />
                {/* 发布 = 当前步 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 6px', position: 'relative', background: 'linear-gradient(90deg, rgba(42,38,32,0.07), transparent 72%)', borderRadius: 12 }}>
                  <span style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 20, borderRadius: 999, background: INK }} />
                  <span style={{ width: 32, height: 32, borderRadius: 999, background: INK, color: '#fff', fontFamily: MONO, fontSize: 11, fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 16px -4px rgba(42,38,32,0.5), 0 0 0 4px rgba(42,38,32,0.1)', flexShrink: 0 }}>9</span>
                  <span>
                    <span style={{ display: 'block', fontFamily: DISPLAY, fontSize: 14, fontWeight: 600, color: INK }}>发布</span>
                    <span style={{ display: 'block', fontFamily: MONO, fontSize: 10, color: MUTED }}>已完成</span>
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* 中 主工作台 */}
          <section style={{ ...glass, flex: 1, borderRadius: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
            <Leak />
            <header style={{ display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${BORDER}`, padding: '12px 28px' }}>
              <CheckDot size={28} />
              <span style={{ fontFamily: DISPLAY, fontSize: 18, fontWeight: 600, color: INK, letterSpacing: '-0.01em' }}>发布</span>
              <span style={{ border: `1px solid ${BORDER}`, background: 'rgba(255,253,250,0.6)', borderRadius: 999, padding: '2px 10px', fontSize: 11, fontWeight: 500, color: MUTED }}>制作步</span>
              <span style={{ border: '1px solid rgba(91,140,90,0.4)', background: 'rgba(91,140,90,0.1)', borderRadius: 999, padding: '3px 10px', fontSize: 12, fontWeight: 700, color: SUCCESS }}>已完成</span>
              <span style={{ marginLeft: 'auto', fontFamily: MONO, fontSize: 11, color: MUTED }}>更新 · 7-07 11:54</span>
            </header>
            {/* 发布 Hero */}
            <div style={{ padding: '24px 28px', display: 'flex', gap: 28, alignItems: 'center' }}>
              <div style={{ position: 'relative', width: 300, flexShrink: 0 }}>
                <span aria-hidden style={{ position: 'absolute', inset: -24, borderRadius: 36, background: 'linear-gradient(135deg,#d9cbb0,#b89a6f)', opacity: 0.2, filter: 'blur(42px) saturate(1.5)', transform: 'scale(1.04)' }} />
                <div style={{ position: 'relative', aspectRatio: '16 / 9', width: '100%', borderRadius: 12, border: `1px solid ${BORDER}`, boxShadow: SHADOW_LG, overflow: 'hidden', background: 'linear-gradient(135deg,#d9cbb0,#b89a6f)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 30, color: '#2a2620', textAlign: 'center', lineHeight: 1.05 }}>7M<br />掀翻大模型</span>
                </div>
                <span style={{ position: 'absolute', bottom: -10, left: 12, background: INK, color: SURFACE, borderRadius: 999, padding: '4px 10px', fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.03em', boxShadow: SHADOW_MD }}>成片封面 · 16:9</span>
              </div>
              <div style={{ position: 'relative', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span style={{ fontFamily: DISPLAY, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.16em', color: WARNING }}>已完成 · 全矩阵同步</span>
                <h2 style={{ margin: 0, fontFamily: DISPLAY, fontSize: 28, fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.01em', color: INK }}>7M 参数小模型反超前沿大模型：推理一定要靠规模吗</h2>
                <p style={{ margin: 0, maxWidth: '52ch', fontSize: 13, lineHeight: 1.6, color: MUTED_STRONG }}>
                  母版 <code style={{ fontFamily: MONO, fontSize: 12, color: INK }}>master.mp4</code> · 横屏 16:9 · 有声 + 字幕。4 个平台发布稿已就绪，一键预填后亲手发布。
                </p>
                <div style={{ marginTop: 4, display: 'flex', gap: 40 }}>
                  <Stat value="74.6" unit="MB" label="母版大小" />
                  <Stat value="4" unit="/4" label="平台就绪" />
                  <Stat value="9" unit="/9" label="管线完成" />
                </div>
              </div>
            </div>
            {/* callout 条 */}
            <div style={{ margin: '4px 28px 24px', borderLeft: `3px solid ${SUCCESS}`, background: 'rgba(91,140,90,0.06)', borderRadius: 8, padding: '12px 16px', fontSize: 13, color: MUTED_STRONG, lineHeight: 1.6 }}>
              左侧逐平台核对发布稿（标题字数、正文、话题标签），右侧一键预填 → 亲手发布 → 回填链接。
            </div>
          </section>

          {/* 右 360 发布备料 */}
          <aside style={{ ...glass, width: 360, borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
            <Leak />
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 2px' }}>
              <span style={{ fontFamily: DISPLAY, fontSize: 14, fontWeight: 600, color: INK }}>发布备料</span>
              <span style={{ fontFamily: MONO, fontSize: 11, color: SUCCESS, border: '1px solid rgba(91,140,90,0.3)', background: 'rgba(91,140,90,0.1)', borderRadius: 999, padding: '2px 8px' }}>已上线 4 · 就绪 4/4</span>
            </div>
            <PlatformRow logo="B" color="#00AEEC" name="Bilibili" url="https://www.bilibili.com/video/B…" />
            <PlatformRow logo="抖" color="#161823" name="抖音" url="https://www.douyin.com/video/765…" />
            <PlatformRow logo="小" color="#FF2442" name="小红书" url="https://www.xiaohongshu.com/expl…" />
            <PlatformRow logo="Y" color="#FF0000" name="YouTube" url="https://youtu.be/gD8tsNHpexg" />
            <div style={{ marginTop: 4, background: INK, color: SURFACE, borderRadius: 12, padding: '13px 16px', fontFamily: DISPLAY, fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <span style={{ width: 20, height: 20, borderRadius: 999, background: 'rgba(255,253,250,0.22)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>1</span>
              自动填充（停在发布键）
            </div>
          </aside>
        </div>
      </div>
    </PreviewFrame>
  );
}
