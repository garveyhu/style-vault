import { useEffect, useState } from 'react';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { PreviewFrame } from '../../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
const MONO = "ui-monospace, 'SF Mono', Menlo, monospace";

const TYPE_DOT: Record<string, string> = {
  product: '#a855f7',
  style: '#f43f5e',
  page: '#6366f1',
  block: '#06b6d4',
  component: '#10b981',
  token: '#f59e0b',
};

const KEYFRAMES = `
@keyframes svsp-mask  { from { opacity: 0 } to { opacity: 1 } }
@keyframes svsp-panel { from { opacity: 0; transform: translateY(-12px) scale(0.96) } to { opacity: 1; transform: translateY(0) scale(1) } }
@keyframes svsp-blob1 { 0%,100% { transform: translate3d(0,0,0) scale(1) } 50% { transform: translate3d(20px,-30px,0) scale(1.08) } }
@keyframes svsp-blob2 { 0%,100% { transform: translate3d(0,0,0) scale(1) } 50% { transform: translate3d(-30px,20px,0) scale(1.12) } }
`;

// 模拟 registry 的小子集 · 只为了让面板里看上去有内容
const ITEMS = [
  { id: 'products/style-vault', type: 'product', name: 'Style Vault', desc: '为 AI 编码协作而造的设计风格库 · 帮开发者在 AI 编码现场快速还原一种成熟视觉语言' },
  { id: 'products/skillhub', type: 'product', name: 'SkillHub', desc: '聚合 Git 仓库扫描 SKILL.md 的技能发现 · 投稿 · 实践与管理平台' },
  { id: 'products/acme-cold-saas', type: 'product', name: 'Acme · 冷感工业 SaaS', desc: '冷感工业型监控 SaaS · 把注意力留给数据本身' },
  { id: 'styles/portfolio-studio/style-vault-cool-editorial', type: 'style', name: '冷感 Editorial 设计目录站', desc: '#fafafa 浅底 + slate × cyan 冷感 + Inter 单字族' },
  { id: 'blocks/marketing/style-vault/cool-blob-hero', type: 'block', name: '冷感漂浮 Hero', desc: '全屏 hero · 双 blob 漂浮 + fade-up cascade' },
  { id: 'blocks/display/style-vault/preview-thumb-card', type: 'block', name: '虚拟视口预览缩略卡', desc: '1440×900 虚拟视口缩放成卡片缩略' },
  { id: 'blocks/nav/style-vault/sticky-platform-topbar', type: 'block', name: 'Sticky 平台切换顶栏', desc: 'sticky 玻璃感顶栏 · 视口绝对居中的 platform pill' },
  { id: 'components/buttons/style-vault/dark-pill-cta', type: 'component', name: '深色胶囊主 CTA', desc: 'rounded-full bg-slate-900 + 深柔投影' },
  { id: 'components/overlays/style-vault/spring-toast', type: 'component', name: 'Spring Toast 操作回执', desc: '顶部居中胶囊 · spring overshoot 入场 · 三态圆点' },
  { id: 'tokens/palettes/style-vault/slate-cyan-cool', type: 'token', name: 'Slate × Cyan Cool', desc: '浅底冷感设计目录站配色 · slate 全阶 + cyan 单点' },
  { id: 'tokens/gradient/style-vault/cool-blob-decor', type: 'token', name: '冷感漂浮气泡装饰', desc: '双 blob 漂浮 · cyan-100 + slate-200 · blur-3xl' },
];

const POPULAR_IDS = [
  'products/style-vault',
  'blocks/marketing/style-vault/cool-blob-hero',
  'tokens/gradient/style-vault/cool-blob-decor',
  'components/buttons/style-vault/dark-pill-cta',
];

const RECENT = ['blob', 'editorial', 'cta'];

const TYPE_LABEL: Record<string, string> = {
  product: '产品', style: '风格', page: '页面',
  block: '模块', component: '组件', token: '原语',
};

function PopPreview({ id }: { id: string }) {
  switch (id) {
    case 'products/style-vault':
      return (
        <>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #cffafe 0%, #fff 50%, #e2e8f0 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, letterSpacing: '-0.02em', color: '#0f172a' }}>
            Style{' '}
            <span style={{ marginLeft: 3, backgroundImage: 'linear-gradient(to bottom right, #0891b2, #1e293b)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>Vault</span>
          </div>
        </>
      );
    case 'blocks/marketing/style-vault/cool-blob-hero':
      return (
        <div style={{ position: 'absolute', inset: 0, background: '#fff', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: -12, top: -12, width: 60, height: 60, borderRadius: '50%', background: 'rgba(207,250,254,0.7)', filter: 'blur(8px)' }} />
          <div style={{ position: 'absolute', right: -10, bottom: -8, width: 48, height: 48, borderRadius: '50%', background: 'rgba(226,232,240,0.7)', filter: 'blur(8px)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: '#0f172a' }}>Hero</div>
        </div>
      );
    case 'tokens/gradient/style-vault/cool-blob-decor':
      return (
        <div style={{ position: 'absolute', inset: 0, background: '#fff', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: -6, top: -4, width: 50, height: 50, borderRadius: '50%', background: 'rgba(207,250,254,0.85)', filter: 'blur(10px)' }} />
          <div style={{ position: 'absolute', right: -4, bottom: -2, width: 38, height: 38, borderRadius: '50%', background: 'rgba(226,232,240,0.85)', filter: 'blur(10px)' }} />
        </div>
      );
    case 'components/buttons/style-vault/dark-pill-cta':
      return (
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ height: 22, padding: '0 12px', background: '#0f172a', color: '#fff', fontSize: 9, fontWeight: 500, borderRadius: 9999, display: 'inline-flex', alignItems: 'center', gap: 4, boxShadow: '0 4px 12px -4px rgba(15,23,42,0.5)' }}>
            立即开始 <span>→</span>
          </div>
        </div>
      );
    default:
      return <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #f8fafc, #fff)' }} />;
  }
}

export default function CmdKSearchPanelPreview() {
  const [q, setQ] = useState('');
  const [type, setType] = useState('all');
  const [platform, setPlatform] = useState<'all' | 'web' | 'ios' | 'android'>('all');

  const counts = ITEMS.reduce<Record<string, number>>((acc, i) => {
    acc[i.type] = (acc[i.type] ?? 0) + 1;
    return acc;
  }, { product: 0, style: 0, page: 0, block: 0, component: 0, token: 0 });
  const total = ITEMS.length;

  // 搜索 substring 加权
  const visible = (() => {
    const ql = q.trim().toLowerCase();
    if (!ql) return type === 'all' ? ITEMS : ITEMS.filter(i => i.type === type);
    const scored = ITEMS
      .map(i => {
        let s = 0;
        if (i.name.toLowerCase().includes(ql)) s += 5;
        if (i.desc.toLowerCase().includes(ql)) s += 2;
        if (i.id.toLowerCase().includes(ql)) s += 1;
        return { i, s };
      })
      .filter(x => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map(x => x.i);
    return type === 'all' ? scored : scored.filter(i => i.type === type);
  })();

  return (
    <PreviewFrame bg="#fafafa" padded={false}>
      <style>{KEYFRAMES}</style>
      {/* 背景 · 假 TopBar + 假 Hero（受 backdrop blur） */}
      <div style={{ fontFamily: SANS, color: '#0f172a' }}>
        <header
          style={{
            position: 'sticky', top: 0, zIndex: 1,
            borderBottom: '1px solid #f1f5f9',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(18px)',
            display: 'flex', alignItems: 'center', height: 72, padding: '0 40px', gap: 32,
          }}
        >
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg, #0891b2, #0f172a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: MONO, fontWeight: 600 }}>SV</div>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#475569' }}>浏览</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#475569' }}>产品集</span>
          <button style={{ height: 36, padding: '0 14px', borderRadius: 9999, border: '1px solid #e2e8f0', background: 'rgba(255,255,255,0.6)', display: 'inline-flex', alignItems: 'center', gap: 8, color: '#64748b', fontSize: 13, fontFamily: SANS, fontWeight: 500 }}>
            <SearchOutlined style={{ fontSize: 14 }} />
            搜索风格
          </button>
          <div style={{ flex: 1 }} />
        </header>

        <section
          style={{
            position: 'relative', overflow: 'hidden', background: '#fff',
            padding: '80px 40px', textAlign: 'center', minHeight: 500,
          }}
        >
          <div style={{ position: 'absolute', left: -120, top: -120, width: 360, height: 360, borderRadius: '50%', background: 'rgba(207,250,254,0.45)', filter: 'blur(48px)', animation: 'svsp-blob1 14s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', right: -100, top: 60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(226,232,240,0.5)', filter: 'blur(48px)', animation: 'svsp-blob2 18s ease-in-out infinite' }} />
          <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: 12 }}>blocks / search / style-vault</div>
            <h1 style={{ fontSize: 56, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, fontFeatureSettings: '"cv02","cv03","cv04","cv11","ss01"' }}>
              ⌘K Search Panel
            </h1>
            <p style={{ marginTop: 18, fontSize: 15, color: '#64748b', lineHeight: 1.7 }}>
              全站搜索浮层 · ⌘K 唤起 · 字段加权打分 + 类型 sidebar + 键盘 ↑↓Enter
              <br />底图给搜索面板呈现 backdrop 效果
            </p>
          </div>
        </section>
      </div>

      {/* 搜索面板（始终打开） */}
      <div
        role="dialog" aria-modal="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 200,
          background: 'rgba(15,23,42,0.28)',
          backdropFilter: 'blur(1px)',
          WebkitBackdropFilter: 'blur(1px)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          paddingTop: '12vh',
          animation: 'svsp-mask 220ms cubic-bezier(0.2, 0.7, 0.2, 1)',
        }}
      >
        <div
          style={{
            width: 'min(840px, calc(100% - 48px))',
            maxHeight: 680,
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid #e2e8f0',
            borderRadius: 24,
            boxShadow: '0 32px 80px -20px rgba(15,23,42,0.5)',
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            fontFamily: SANS, color: '#0f172a',
            animation: 'svsp-panel 320ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 22px', borderBottom: '1px solid #f1f5f9' }}>
            <SearchOutlined style={{ flexShrink: 0, color: '#94a3b8', fontSize: 20 }} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="搜索风格"
              autoComplete="off"
              spellCheck={false}
              style={{ flex: 1, border: 'none', outline: 'none', background: 'none', fontFamily: SANS, fontSize: 17, color: '#0f172a', letterSpacing: '-0.01em' }}
            />
            {q && (
              <button
                onClick={() => setQ('')}
                aria-label="清空"
                style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', width: 24, height: 24, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <CloseOutlined style={{ fontSize: 14 }} />
              </button>
            )}
            <div style={{ display: 'inline-flex', gap: 4, padding: 3, borderRadius: 9999, border: '1px solid #e2e8f0', background: '#f8fafc' }}>
              {(['all', 'web', 'ios', 'android'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  style={{
                    padding: '5px 12px', borderRadius: 9999, border: 'none', cursor: 'pointer',
                    fontSize: 11, fontWeight: 500, fontFamily: SANS,
                    background: platform === p ? '#0f172a' : 'transparent',
                    color: platform === p ? '#fff' : '#64748b',
                  }}
                >
                  {p === 'all' ? '全部' : p === 'web' ? 'Web' : p === 'ios' ? 'iOS' : 'Android'}
                </button>
              ))}
            </div>
          </div>

          {/* recent */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, padding: '14px 22px', borderBottom: '1px solid #f1f5f9' }}>
            <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#94a3b8' }}>最近</span>
            {RECENT.map((r) => (
              <button
                key={r}
                onClick={() => setQ(r)}
                style={{ padding: '4px 10px', borderRadius: 9999, border: '1px solid #e2e8f0', background: 'rgba(255,255,255,0.6)', fontFamily: SANS, fontSize: 11, color: '#475569', cursor: 'pointer' }}
              >
                {r}
              </button>
            ))}
          </div>

          {/* body */}
          <div style={{ display: 'grid', gridTemplateColumns: '168px 1fr', flex: 1, minHeight: 0 }}>
            {/* sidebar */}
            <aside style={{ borderRight: '1px solid #f1f5f9', padding: '16px 8px', overflowY: 'auto' }}>
              <div style={{ padding: '0 12px', marginBottom: 8, fontFamily: MONO, fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#94a3b8' }}>类型</div>
              {[
                { v: 'all', label: '全部', dot: '#94a3b8', count: total },
                { v: 'product', label: '产品', dot: TYPE_DOT.product, count: counts.product },
                { v: 'style', label: '风格', dot: TYPE_DOT.style, count: counts.style },
                { v: 'page', label: '页面', dot: TYPE_DOT.page, count: counts.page },
                { v: 'block', label: '模块', dot: TYPE_DOT.block, count: counts.block },
                { v: 'component', label: '组件', dot: TYPE_DOT.component, count: counts.component },
                { v: 'token', label: '原语', dot: TYPE_DOT.token, count: counts.token },
              ].map((t) => {
                const on = type === t.v;
                return (
                  <button
                    key={t.v}
                    onClick={() => setType(t.v)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '8px 12px', borderRadius: 8, border: 'none',
                      background: on ? '#0f172a' : 'transparent',
                      color: on ? '#fff' : '#334155',
                      cursor: 'pointer', fontSize: 13, fontWeight: 500, fontFamily: SANS, marginBottom: 2,
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.dot }} />
                      {t.label}
                    </span>
                    <span style={{ fontFamily: MONO, fontSize: 11, color: '#cbd5e1' }}>{t.count}</span>
                  </button>
                );
              })}
            </aside>

            {/* content */}
            <section style={{ padding: '18px 22px', overflowY: 'auto' }}>
              {q.trim() ? (
                visible.length === 0 ? (
                  <div style={{ padding: '80px 0', textAlign: 'center', color: '#94a3b8' }}>
                    <div style={{ fontFamily: MONO, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#cbd5e1', marginBottom: 12 }}>No Results</div>
                    没有匹配 "<span style={{ color: '#334155' }}>{q}</span>" 的条目
                  </div>
                ) : (
                  <ResultGroups items={visible} q={q.trim()} />
                )
              ) : (
                <>
                  {type === 'all' && (
                    <div style={{ marginBottom: 24 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#94a3b8', marginBottom: 12 }}>热门推荐</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {POPULAR_IDS.map((id) => {
                          const i = ITEMS.find((x) => x.id === id);
                          if (!i) return null;
                          return (
                            <div key={i.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 12, border: '1px solid #e2e8f0', background: '#fff', borderRadius: 12, cursor: 'pointer' }}>
                              <div style={{ position: 'relative', width: 96, height: 64, flexShrink: 0, borderRadius: 8, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                                <PopPreview id={i.id} />
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748b' }}>
                                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: TYPE_DOT[i.type] }} />
                                  {TYPE_LABEL[i.type]}
                                </div>
                                <div style={{ marginTop: 4, fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em' }}>{i.name}</div>
                                <div style={{ marginTop: 2, fontSize: 12, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{i.desc}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <ResultGroups items={visible} />
                </>
              )}
            </section>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function ResultGroups({ items, q }: { items: typeof ITEMS; q?: string }) {
  const order = ['product', 'style', 'page', 'block', 'component', 'token'];
  const groups: Record<string, typeof ITEMS> = {};
  items.forEach((i) => {
    (groups[i.type] = groups[i.type] || []).push(i);
  });

  return (
    <>
      {order.filter((t) => groups[t]?.length).map((t) => (
        <div key={t} style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8, paddingBottom: 6, borderBottom: '1px dashed #e2e8f0' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: TYPE_DOT[t] }} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>{TYPE_LABEL[t]}</span>
            <span style={{ marginLeft: 'auto', fontFamily: MONO, fontSize: 11, color: '#cbd5e1' }}>{groups[t].length}</span>
          </div>
          {groups[t].map((i) => (
            <div
              key={i.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 12px', borderRadius: 8, cursor: 'pointer',
                fontFamily: SANS,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f1f5f9')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ width: 6, height: 6, flexShrink: 0, borderRadius: '50%', background: TYPE_DOT[t] }} />
              <span style={{ flexShrink: 0, fontSize: 13, fontWeight: 500, color: '#0f172a' }}>{q ? hl(i.name, q) : i.name}</span>
              <span style={{ flex: 1, fontSize: 12, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q ? hl(i.desc, q) : i.desc}</span>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

function hl(text: string, q: string): React.ReactNode {
  if (!q) return text;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.split(re).map((p, i) =>
    i % 2 === 1 ? (
      <mark key={i} style={{ background: 'rgba(207,250,254,0.7)', color: '#0e7490', padding: '0 2px', borderRadius: 2, fontWeight: 600 }}>{p}</mark>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}
