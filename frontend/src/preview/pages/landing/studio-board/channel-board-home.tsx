import { PreviewFrame } from '../../../_layout';

// ── studio-board 首页 board 暖色 token（取自 tokens.css :root 原始暖色系）──
const CREAM = '#f6f2e8';
const SURFACE = '#fffdf7';
const INK = '#161616';
const INK_SOFT = '#746f66';
const FOCUS = '#2557d6'; // 首页焦点=冷蓝（激活/链接高光）
const SUCCESS = '#12805c';
const DISPLAY = "'IBM Plex Sans Condensed','PingFang SC',sans-serif";
const BODY = "'PingFang SC','IBM Plex Sans',sans-serif";
const MONO = "'JetBrains Mono',ui-monospace,monospace";

const PLATFORMS: { key: string; label: string; color: string; active?: boolean }[] = [
  { key: 'B', label: 'Bilibili', color: '#00AEEC', active: true },
  { key: '抖', label: '抖音', color: '#161823' },
  { key: '小', label: '小红书', color: '#FF2442' },
  { key: 'Y', label: 'YouTube', color: '#FF0000' },
];

const WORKS: { title: string; cover: string; coverBg: string; coverInk: string; meta: string; published: boolean; hover?: boolean }[] = [
  { title: '别做AI工具收藏家：你缺的不是工具，是飞轮', cover: '囤工具 ≠ 飞轮', coverBg: 'linear-gradient(135deg,#e7dcc4,#c3ad86)', coverInk: '#1f1c17', meta: '29.5万 播放 · 7-08 17:02', published: true },
  { title: '7M 参数小模型反超前沿大模型：推理一定要靠规模吗', cover: '7M 掀翻大模型', coverBg: 'linear-gradient(135deg,#d9cbb0,#b89a6f)', coverInk: '#1f1c17', meta: '22.3万 播放 · 7-06 20:00', published: true, hover: true },
  { title: 'RL 到底有没有教会大模型新本事', cover: '一张卡，打平几百万', coverBg: 'linear-gradient(135deg,#2a2620,#4a4438)', coverInk: '#f4d98a', meta: '29.9万 播放 · 7-07 18:25', published: true },
  { title: '你信任的「推理模型」，可能在「应付考试」', cover: '会做题 ≠ 会推理', coverBg: 'linear-gradient(135deg,#e2d7bf,#bfaa82)', coverInk: '#1f1c17', meta: '8.7万 播放 · 7-05 20:00', published: false },
  { title: '为什么越强的 AI agent 越危险', cover: '越能干，越好骗', coverBg: 'linear-gradient(135deg,#dfd3ba,#b7a079)', coverInk: '#1f1c17', meta: '14.8万 播放 · 7-08 17:38', published: true },
];

function CatAvatar() {
  return (
    <div style={{ width: 96, height: 96, borderRadius: 999, background: SURFACE, border: `4px solid ${CREAM}`, boxShadow: '0 8px 20px rgba(22,22,22,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="66" height="66" viewBox="0 0 66 66">
        {/* 黑猫 IP 极简占位 */}
        <path d="M14 20 L20 34 L12 36 Z" fill="#161616" />
        <path d="M52 20 L46 34 L54 36 Z" fill="#161616" />
        <ellipse cx="33" cy="40" rx="22" ry="20" fill="#161616" />
        <circle cx="25" cy="38" r="4.5" fill="#41e0b0" />
        <circle cx="41" cy="38" r="4.5" fill="#41e0b0" />
        <circle cx="25" cy="38" r="1.8" fill="#0c1a14" />
        <circle cx="41" cy="38" r="1.8" fill="#0c1a14" />
      </svg>
    </div>
  );
}

export default function ChannelBoardHomePreview() {
  return (
    <PreviewFrame bg={CREAM} padded={false}>
      <div
        style={{
          width: 1440,
          height: 900,
          position: 'relative',
          overflow: 'hidden',
          fontFamily: BODY,
          color: INK,
          background:
            'linear-gradient(90deg, rgba(22,22,22,0.04) 1px, transparent 1px),' +
            'linear-gradient(180deg, rgba(22,22,22,0.04) 1px, transparent 1px),' +
            'radial-gradient(circle at 82% 12%, rgba(37,87,214,0.10), transparent 26rem),' +
            'linear-gradient(180deg, #fbf8f0 0%, #f6f2e8 36rem)',
          backgroundSize: '48px 48px, 48px 48px, auto, auto',
          boxSizing: 'border-box',
        }}
      >
        {/* 顶栏 */}
        <div style={{ position: 'sticky', top: 0, zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '12px 40px', background: 'rgba(246,242,232,0.85)', backdropFilter: 'blur(8px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'inline-flex', gap: 3, alignItems: 'flex-end' }}>
              <span style={{ width: 5, height: 20, borderRadius: 2, background: '#5b6b8c' }} />
              <span style={{ width: 5, height: 20, borderRadius: 2, background: '#41e0b0' }} />
            </span>
            <span style={{ color: INK_SOFT }}>·</span>
            <span style={{ borderRadius: 999, border: '1px solid rgba(116,111,102,0.3)', padding: '5px 12px', fontSize: 12, fontWeight: 700, color: INK }}>飞轮日记 ▾</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 34, height: 34, borderRadius: 999, border: '1px solid rgba(116,111,102,0.25)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: INK_SOFT }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
            </span>
            <div style={{ display: 'flex', gap: 6 }}>
              {PLATFORMS.map((p) => (
                <span key={p.key} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 999, padding: '6px 14px', fontSize: 12, fontWeight: 700, background: p.active ? p.color : 'rgba(116,111,102,0.09)', color: p.active ? '#fff' : INK }}>
                  <span style={{ width: 14, height: 14, borderRadius: 999, background: p.active ? '#fff' : p.color, color: p.active ? p.color : '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 800 }}>{p.key}</span>
                  {p.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 频道头 */}
        <div style={{ position: 'relative', zIndex: 1, padding: '0 56px' }}>
          <div style={{ height: 100, borderRadius: 0, background: 'linear-gradient(180deg,#efe8d6,#f6f2e8)', margin: '0 -56px', width: 'calc(100% + 112px)' }} />
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginTop: -40 }}>
            <CatAvatar />
            <div style={{ paddingBottom: 4 }}>
              <h1 style={{ margin: 0, fontFamily: DISPLAY, fontSize: 26, fontWeight: 800, color: INK }}>飞轮日记</h1>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: INK_SOFT }}>AI 底层逻辑 · 前沿趋势 · 深度拆解 · 认知迭代 | 看透技术泡沫，重塑智能时代的核心认知</p>
            </div>
          </div>

          {/* 数据 */}
          <div style={{ display: 'flex', gap: 32, marginTop: 14, fontSize: 13 }}>
            {[['231', '关注'], ['20.9万', '粉丝'], ['88.6万', '获赞']].map(([n, l]) => (
              <span key={l}><b style={{ fontFamily: DISPLAY, fontWeight: 800, color: INK, fontVariantNumeric: 'tabular-nums' }}>{n}</b> <span style={{ color: INK_SOFT }}>{l}</span></span>
            ))}
          </div>

          {/* tabs */}
          <div style={{ display: 'flex', gap: 26, marginTop: 18, borderBottom: '1px solid rgba(116,111,102,0.15)', fontSize: 14 }}>
            {['主页', '投稿', '合集', '动态', '收藏'].map((t, i) => (
              <span key={t} style={{ paddingBottom: 8, fontWeight: i === 1 ? 700 : 500, color: i === 1 ? FOCUS : INK_SOFT, borderBottom: i === 1 ? `2px solid ${FOCUS}` : '2px solid transparent' }}>{t}</span>
            ))}
          </div>

          {/* 作品网格 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', columnGap: 16, rowGap: 24, padding: '24px 0' }}>
            {WORKS.map((w) => (
              <div key={w.title} style={{ position: 'relative' }}>
                <div style={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: 12, overflow: 'hidden', background: w.coverBg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10, boxSizing: 'border-box' }}>
                  <span style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 20, color: w.coverInk, textAlign: 'center', lineHeight: 1.1 }}>{w.cover}</span>
                  <span style={{ position: 'absolute', right: 8, top: 8, width: 10, height: 10, borderRadius: 999, background: w.published ? '#12805c' : '#8a8f98', boxShadow: '0 0 0 2px rgba(255,255,255,0.7)' }} />
                  {w.hover && (
                    <span style={{ position: 'absolute', left: 8, top: 8, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(22,22,22,0.85)', color: '#fff', borderRadius: 999, padding: '6px 12px', fontSize: 11, fontWeight: 800, backdropFilter: 'blur(4px)', boxShadow: '0 3px 12px rgba(0,0,0,0.28)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#41e0b0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                      预览
                    </span>
                  )}
                </div>
                <div style={{ marginTop: 8, fontSize: 13, fontWeight: 700, lineHeight: 1.35, color: INK, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{w.title}</div>
                <div style={{ marginTop: 4, fontSize: 11, color: INK_SOFT }}>{w.meta}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
