import { categoryList, taxonomy } from '../utils/taxonomy';

export type ProductFilterState = {
  category: string[];
  aesthetic: string[];
  mood: string[];
  stack: string[];
};

export const emptyProductFilterState: ProductFilterState = {
  category: [],
  aesthetic: [],
  mood: [],
  stack: [],
};

export function hasActiveFilters(s: ProductFilterState): boolean {
  return (
    s.category.length > 0 ||
    s.aesthetic.length > 0 ||
    s.mood.length > 0 ||
    s.stack.length > 0
  );
}

type FilterKey = keyof ProductFilterState;

export function ProductFilterPanel({
  value,
  onChange,
}: {
  value: ProductFilterState;
  onChange: (next: ProductFilterState) => void;
}) {
  const toggle = (group: FilterKey, item: string) => {
    const curr = value[group];
    const next = curr.includes(item)
      ? curr.filter((v) => v !== item)
      : [...curr, item];
    onChange({ ...value, [group]: next });
  };

  const clearAll = () => onChange(emptyProductFilterState);
  const active = hasActiveFilters(value);

  return (
    <aside className="sticky top-[88px] self-start">
      <div className="relative overflow-hidden rounded-[20px] border border-slate-200/80 bg-white/60 p-5 backdrop-blur-xl">
        <div className="max-h-[calc(100vh-132px)] overflow-y-auto pr-1">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
              筛选
            </h2>
            {active && (
              <button
                type="button"
                onClick={clearAll}
                className="text-[11px] text-slate-500 transition hover:text-slate-900"
              >
                清除
              </button>
            )}
          </div>

          <FilterGroup
            title="category · 分类"
            values={categoryList().map((c) => ({
              slug: c.slug as string,
              label: c.zh,
              dot: c.dot,
            }))}
            selected={value.category}
            onToggle={(v) => toggle('category', v)}
          />

          <FilterGroup
            title="aesthetic · 风格"
            values={Object.entries(taxonomy.tag.aesthetic.values).map(
              ([slug, v]) => ({ slug, label: v.zh }),
            )}
            selected={value.aesthetic}
            onToggle={(v) => toggle('aesthetic', v)}
          />

          <FilterGroup
            title="mood · 氛围"
            values={Object.entries(taxonomy.tag.mood.values).map(
              ([slug, v]) => ({ slug, label: v.zh }),
            )}
            selected={value.mood}
            onToggle={(v) => toggle('mood', v)}
          />

          <FilterGroup
            title="stack · 技术栈"
            values={Object.entries(taxonomy.tag.stack.values).map(
              ([slug, v]) => ({ slug, label: v.zh }),
            )}
            selected={value.stack}
            onToggle={(v) => toggle('stack', v)}
          />
        </div>
      </div>
    </aside>
  );
}

function FilterGroup({
  title,
  values,
  selected,
  onToggle,
}: {
  title: string;
  values: Array<{ slug: string; label: string; dot?: string }>;
  selected: string[];
  onToggle: (slug: string) => void;
}) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="mb-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
        {title}
      </div>
      <div className="flex flex-wrap gap-1">
        {values.map((v) => {
          const on = selected.includes(v.slug);
          return (
            <button
              key={v.slug}
              type="button"
              onClick={() => onToggle(v.slug)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-[3px] text-[11px] transition ${
                on
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200/80 bg-white/70 text-slate-600 hover:border-slate-300 hover:bg-white hover:text-slate-900'
              }`}
            >
              {v.dot && (
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: on ? '#ffffff' : v.dot }}
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

export function matchProductFilters(
  item: {
    category?: string;
    tags: { aesthetic: string[]; mood: string[]; stack: string[] };
  },
  f: ProductFilterState,
): boolean {
  if (f.category.length > 0 && !f.category.includes(item.category ?? '')) {
    return false;
  }
  if (
    f.aesthetic.length > 0 &&
    !item.tags.aesthetic.some((t) => f.aesthetic.includes(t))
  ) {
    return false;
  }
  if (f.mood.length > 0 && !item.tags.mood.some((t) => f.mood.includes(t))) {
    return false;
  }
  if (f.stack.length > 0 && !item.tags.stack.some((t) => f.stack.includes(t))) {
    return false;
  }
  return true;
}
