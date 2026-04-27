import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
const MONO = "ui-monospace, 'SF Mono', Menlo, monospace";

const CATEGORIES = [
  { slug: 'productivity', label: '效率工具', dot: '#a855f7' },
  { slug: 'content', label: '内容', dot: '#22d3ee' },
  { slug: 'lifestyle', label: '生活', dot: '#f59e0b' },
  { slug: 'social', label: '社交', dot: '#ec4899' },
  { slug: 'commerce', label: '电商', dot: '#10b981' },
  { slug: 'design', label: '设计', dot: '#6366f1' },
];

const AESTHETICS = [
  { slug: 'minimal', label: '极简' },
  { slug: 'editorial', label: '编辑' },
  { slug: 'industrial', label: '工业' },
  { slug: 'glass', label: '玻璃拟态' },
];

const MOODS = [
  { slug: 'calm', label: '平静' },
  { slug: 'cold', label: '冷峻' },
  { slug: 'confident', label: '自信' },
  { slug: 'serious', label: '严肃' },
];

const STACKS = [
  { slug: 'react-antd-tailwind', label: 'React + Antd + Tailwind' },
  { slug: 'html-tailwind', label: 'HTML + Tailwind' },
];

const PRODUCTS = [
  {
    id: 'products/style-vault',
    name: 'Style Vault',
    desc: '为 AI 编码协作而造的设计风格库——帮开发者在 AI 编码现场快速还原一种成熟视觉语言',
    cat: '设计',
    catSlug: 'design',
    dot: '#6366f1',
    aesthetic: ['minimal', 'editorial'],
    mood: ['calm', 'confident'],
    stack: ['react-antd-tailwind'],
    counts: { pages: 5, blocks: 6, components: 5 },
    coverGradient:
      'linear-gradient(135deg, #cffafe 0%, #fff 50%, #e2e8f0 100%)',
    coverLabel: '冷感漂浮 Hero',
    light: true,
  },
  {
    id: 'products/skillhub',
    name: 'SkillHub · AI 技能社区',
    desc: '聚合 Git 仓库扫描 SKILL.md 的技能发现、投稿、实践与管理平台',
    cat: '效率工具',
    catSlug: 'productivity',
    dot: '#a855f7',
    aesthetic: ['minimal', 'editorial'],
    mood: ['calm', 'confident'],
    stack: ['react-antd-tailwind'],
    counts: { pages: 13, blocks: 11, components: 6 },
    coverGradient:
      'linear-gradient(135deg, #ccfbf1 0%, #fff 50%, #f0f9ff 100%)',
    coverLabel: 'Skill Cards Grid',
    light: true,
  },
  {
    id: 'products/acme-cold-saas',
    name: 'Acme · 冷感工业 SaaS',
    desc: '冷感工业型监控 SaaS——把注意力留给数据本身，等宽数字 / 状态脉冲 / 零装饰',
    cat: '效率工具',
    catSlug: 'productivity',
    dot: '#a855f7',
    aesthetic: ['minimal', 'industrial'],
    mood: ['cold', 'serious'],
    stack: ['react-antd-tailwind'],
    counts: { pages: 5, blocks: 4, components: 4 },
    coverGradient:
      'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    coverLabel: 'KPI Grid',
    light: false,
  },
];

type FilterKey = 'category' | 'aesthetic' | 'mood' | 'stack';
type FilterState = Record<FilterKey, string[]>;

const EMPTY: FilterState = { category: [], aesthetic: [], mood: [], stack: [] };

function matches(p: (typeof PRODUCTS)[number], f: FilterState): boolean {
  if (f.category.length > 0 && !f.category.includes(p.catSlug)) return false;
  if (
    f.aesthetic.length > 0 &&
    !p.aesthetic.some((t) => f.aesthetic.includes(t))
  )
    return false;
  if (f.mood.length > 0 && !p.mood.some((t) => f.mood.includes(t))) return false;
  if (f.stack.length > 0 && !p.stack.some((t) => f.stack.includes(t))) return false;
  return true;
}

function FilterGroup({
  title,
  values,
  selected,
  onToggle,
}: {
  title: string;
  values: { slug: string; label: string; dot?: string }[];
  selected: string[];
  onToggle: (slug: string) => void;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          marginBottom: 8,
          fontFamily: MONO,
          fontSize: 10,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          color: '#64748b',
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {values.map((v) => {
          const on = selected.includes(v.slug);
          return (
            <button
              key={v.slug}
              onClick={() => onToggle(v.slug)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '3px 10px',
                borderRadius: 9999,
                border: on
                  ? '1px solid #0f172a'
                  : '1px solid rgba(226,232,240,0.8)',
                background: on ? '#0f172a' : 'rgba(255,255,255,0.7)',
                color: on ? '#fff' : '#475569',
                fontSize: 11,
                fontFamily: SANS,
                cursor: 'pointer',
                transition: 'all 200ms cubic-bezier(0.2, 0.7, 0.2, 1)',
              }}
            >
              {v.dot && (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    flexShrink: 0,
                    borderRadius: '50%',
                    background: on ? '#fff' : v.dot,
                  }}
                />
              )}
              {v.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Row({ p }: { p: (typeof PRODUCTS)[number] }) {
  const [hov, setHov] = useState(false);
  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#fff',
        border: '1px solid rgba(226,232,240,0.8)',
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'pointer',
        transition:
          'transform 400ms cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 400ms cubic-bezier(0.2, 0.7, 0.2, 1)',
        transform: hov ? 'translate3d(0,-4px,0)' : 'translate3d(0,0,0)',
        boxShadow: hov
          ? '0 2px 6px -1px rgba(15,23,42,0.06), 0 14px 32px -10px rgba(15,23,42,0.22), 0 24px 48px -20px rgba(15,23,42,0.14)'
          : 'none',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr' }}>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background:
              'linear-gradient(135deg, #f8fafc, #fff, rgba(241,245,249,0.6))',
            height: 180,
          }}
        >
          <div
            style={{
              width: '92%',
              height: '86%',
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              boxShadow: '0 8px 24px -10px rgba(15,23,42,0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: p.coverGradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: p.light ? '#0f172a' : '#67e8f9',
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              {p.coverLabel}
            </div>
          </div>
        </div>
        <div
          style={{
            padding: '20px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 10,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#64748b',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: p.dot,
                }}
              />
              {p.cat}
              <span style={{ color: '#cbd5e1' }}>·</span>
              <span style={{ color: '#94a3b8' }}>Web</span>
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: '-0.01em',
                color: '#0f172a',
              }}
            >
              {p.name}
            </div>
            <div
              style={{
                marginTop: 6,
                fontSize: 12,
                lineHeight: 1.5,
                color: '#475569',
              }}
            >
              {p.desc}
            </div>
          </div>
          <div
            style={{
              marginTop: 12,
              display: 'flex',
              gap: 20,
              fontSize: 11,
              color: '#94a3b8',
              fontFamily: MONO,
              letterSpacing: '0.05em',
            }}
          >
            <span>
              PAGES <span style={{ color: '#334155' }}>{p.counts.pages}</span>
            </span>
            <span>
              BLOCKS <span style={{ color: '#334155' }}>{p.counts.blocks}</span>
            </span>
            <span>
              COMPONENTS{' '}
              <span style={{ color: '#334155' }}>{p.counts.components}</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function StickyFilterProductListPreview() {
  const [filters, setFilters] = useState<FilterState>(EMPTY);

  const toggle = (g: FilterKey, slug: string) => {
    const curr = filters[g];
    const next = curr.includes(slug)
      ? curr.filter((v) => v !== slug)
      : [...curr, slug];
    setFilters({ ...filters, [g]: next });
  };
  const active =
    filters.category.length +
      filters.aesthetic.length +
      filters.mood.length +
      filters.stack.length >
    0;

  const visible = PRODUCTS.filter((p) => matches(p, filters));

  return (
    <PreviewFrame bg="#fafafa" padded={false}>
      <div style={{ fontFamily: SANS, color: '#0f172a' }}>
        {/* TopBar (mock) */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            borderBottom: '1px solid #f1f5f9',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(18px)',
            display: 'flex',
            alignItems: 'center',
            height: 72,
            padding: '0 40px',
            gap: 32,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #0891b2, #0f172a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontFamily: MONO,
              fontWeight: 600,
            }}
          >
            SV
          </div>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#475569' }}>
            浏览
          </span>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#0f172a' }}>
            产品集
          </span>
          <div style={{ flex: 1 }} />
        </header>

        <main style={{ padding: '16px 40px 80px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '260px 1fr',
              gap: 32,
              alignItems: 'start',
            }}
          >
            {/* Filter panel */}
            <div
              style={{
                position: 'sticky',
                top: 88,
                alignSelf: 'flex-start',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 20,
                  border: '1px solid rgba(226,232,240,0.8)',
                  background: 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  padding: 20,
                }}
              >
                <div
                  style={{
                    maxHeight: 'calc(100vh - 132px)',
                    overflowY: 'auto',
                    paddingRight: 4,
                  }}
                >
                  <div
                    style={{
                      marginBottom: 16,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <h2
                      style={{
                        margin: 0,
                        fontSize: 11,
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.18em',
                        color: '#64748b',
                      }}
                    >
                      筛选
                    </h2>
                    {active && (
                      <button
                        onClick={() => setFilters(EMPTY)}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: 11,
                          color: '#64748b',
                          cursor: 'pointer',
                          fontFamily: SANS,
                        }}
                      >
                        清除
                      </button>
                    )}
                  </div>
                  <FilterGroup
                    title="category · 分类"
                    values={CATEGORIES}
                    selected={filters.category}
                    onToggle={(v) => toggle('category', v)}
                  />
                  <FilterGroup
                    title="aesthetic · 风格"
                    values={AESTHETICS}
                    selected={filters.aesthetic}
                    onToggle={(v) => toggle('aesthetic', v)}
                  />
                  <FilterGroup
                    title="mood · 氛围"
                    values={MOODS}
                    selected={filters.mood}
                    onToggle={(v) => toggle('mood', v)}
                  />
                  <FilterGroup
                    title="stack · 技术栈"
                    values={STACKS}
                    selected={filters.stack}
                    onToggle={(v) => toggle('stack', v)}
                  />
                </div>
              </div>
            </div>

            {/* List */}
            <div>
              {visible.length === 0 ? (
                <div
                  style={{
                    borderRadius: 16,
                    border: '1px dashed #e2e8f0',
                    background: '#fff',
                    padding: 64,
                    textAlign: 'center',
                    color: '#94a3b8',
                  }}
                >
                  当前筛选条件下无匹配产品
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                  }}
                >
                  {visible.map((p) => (
                    <Row key={p.id} p={p} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </PreviewFrame>
  );
}
