import { useState } from 'react';
import { PreviewFrame } from '../../../_layout';

const SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";
const MONO = "ui-monospace, 'SF Mono', Menlo, monospace";

type FilterKey = 'category' | 'aesthetic' | 'mood' | 'stack';
type FilterState = Record<FilterKey, string[]>;

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
  { slug: 'maximal', label: '繁复' },
  { slug: 'brutalist', label: '粗野' },
  { slug: 'editorial', label: '编辑' },
  { slug: 'glass', label: '玻璃拟态' },
  { slug: 'neumorph', label: '新拟态' },
  { slug: 'industrial', label: '工业' },
  { slug: 'bento', label: '便当网格' },
];

const MOODS = [
  { slug: 'calm', label: '平静' },
  { slug: 'cold', label: '冷峻' },
  { slug: 'warm', label: '温暖' },
  { slug: 'serious', label: '严肃' },
  { slug: 'playful', label: '俏皮' },
  { slug: 'confident', label: '自信' },
];

const STACKS = [
  { slug: 'react-tailwind', label: 'React + Tailwind' },
  { slug: 'react-antd-tailwind', label: 'React + Antd + Tailwind' },
  { slug: 'html-tailwind', label: 'HTML + Tailwind' },
  { slug: 'shadcn-radix', label: 'shadcn + Radix' },
];

const EMPTY: FilterState = { category: [], aesthetic: [], mood: [], stack: [] };

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
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
        }}
      >
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
              onMouseEnter={(e) => {
                if (on) return;
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = '#0f172a';
              }}
              onMouseLeave={(e) => {
                if (on) return;
                e.currentTarget.style.borderColor = 'rgba(226,232,240,0.8)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.7)';
                e.currentTarget.style.color = '#475569';
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

export default function StickyChipFilterPanelPreview() {
  const [filters, setFilters] = useState<FilterState>({
    category: ['design'],
    aesthetic: ['minimal', 'editorial'],
    mood: [],
    stack: [],
  });

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

  return (
    <PreviewFrame bg="#fafafa" padded={false}>
      <div
        style={{
          padding: '40px 40px 80px',
          fontFamily: SANS,
          color: '#0f172a',
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#94a3b8',
            marginBottom: 12,
          }}
        >
          blocks / filters / style-vault
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            letterSpacing: '-0.025em',
            marginBottom: 8,
          }}
        >
          Sticky Chip Filter Panel
        </div>
        <div style={{ fontSize: 14, color: '#64748b', marginBottom: 32 }}>
          点 chip 切换选中态 · 4 组 chip toggle · category 自带 6 色圆点
        </div>

        {/* showcase: panel 嵌在 260px 列里，旁边一个 mock list */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '260px 1fr',
            gap: 32,
            alignItems: 'start',
          }}
        >
          {/* The actual filter panel */}
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
                      transition:
                        'color 200ms cubic-bezier(0.2, 0.7, 0.2, 1)',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = '#0f172a')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = '#64748b')
                    }
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

          {/* Mock list with floating cover rows */}
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            {[
              {
                name: 'Style Vault',
                cat: '设计',
                dot: '#6366f1',
                gradient:
                  'linear-gradient(135deg, #cffafe 0%, #fff 50%, #e2e8f0 100%)',
                label: '冷感漂浮 Hero',
                light: true,
              },
              {
                name: 'SkillHub · 技能社区',
                cat: '效率工具',
                dot: '#a855f7',
                gradient:
                  'linear-gradient(135deg, #ccfbf1 0%, #fff 50%, #f0f9ff 100%)',
                label: 'Skill Cards Grid',
                light: true,
              },
              {
                name: 'Acme · 冷感工业 SaaS',
                cat: '效率工具',
                dot: '#a855f7',
                gradient:
                  'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
                label: 'KPI Grid',
                light: false,
              },
            ].map((p) => (
              <article
                key={p.name}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(226,232,240,0.8)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: '300px 1fr',
                }}
              >
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
                        background: p.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: p.light ? '#0f172a' : '#67e8f9',
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    >
                      {p.label}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    padding: 20,
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
                    </div>
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 18,
                        fontWeight: 600,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {p.name}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
