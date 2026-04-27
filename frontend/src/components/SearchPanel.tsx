import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { useRegistry } from '../data/useRegistry';
import { typeLabel } from '../utils/taxonomy';
import { matchesPlatform, type PlatformSel } from '../contexts/PlatformContext';
import type {
  RegistryItem,
  EntryType,
} from '../../scripts/sync-from-skill/types';

/* =========================================================
   全站搜索面板 · ⌘K / Ctrl+K / `/` 唤起 · ESC 关
   - module-level singleton（Toast 同款 pattern）
   - 字段加权打分（name 5 / desc 2 / id 1 / tags 1）
   - localStorage 存最近 5 条
   ========================================================= */

let isOpen = false;
const listeners = new Set<() => void>();
function emit() {
  listeners.forEach((l) => l());
}

export const searchPanel = {
  open: () => {
    isOpen = true;
    emit();
  },
  close: () => {
    isOpen = false;
    emit();
  },
  toggle: () => {
    isOpen = !isOpen;
    emit();
  },
};

/* ============ 常量 ============ */

const TYPE_DOT: Record<EntryType, string> = {
  product: '#a855f7',
  style: '#f43f5e',
  page: '#6366f1',
  block: '#06b6d4',
  component: '#10b981',
  token: '#f59e0b',
};

const TYPE_ORDER: EntryType[] = [
  'product',
  'style',
  'page',
  'block',
  'component',
  'token',
];

// id 第二段（bucket）→ 中文短标签
const BUCKET_LABEL: Record<string, string> = {
  // components
  buttons: '按钮',
  inputs: '输入',
  overlays: '浮层',
  'tags-badges': '标签',
  toggles: '切换',
  indicators: '指示',
  'avatars-icons': '头像',
  selects: '选择',
  'typography-atoms': '字体原子',
  // blocks
  marketing: '营销',
  display: '展示',
  layout: '布局',
  nav: '导航',
  filters: '筛选',
  feedback: '反馈',
  form: '表单',
  commerce: '电商',
  editor: '编辑器',
  entry: '入口',
  media: '媒体',
  social: '社交',
  // pages
  landing: '落地',
  detail: '详情',
  dashboard: '仪表盘',
  'list-table': '列表',
  auth: '认证',
  checkout: '结账',
  'content-reader': '阅读',
  'empty-error': '空错',
  'form-flow': '表单流',
  pricing: '定价',
  'search-result': '搜索结果',
  settings: '设置',
  // tokens
  palettes: '调色',
  typography: '字体',
  gradient: '渐变',
  motion: '动效',
  border: '边框',
  shadow: '阴影',
  cursor: '光标',
  'focus-ring': '焦点',
  iconography: '图标',
  radius: '圆角',
  spacing: '间距',
  texture: '纹理',
  // styles
  'portfolio-studio': '作品集',
  'saas-tool': 'SaaS 工具',
  'community-social': '社区社交',
  'content-media': '内容媒体',
  'ecommerce-shop': '电商',
  'admin-console': '管理后台',
  'marketing-brand': '营销品牌',
  experimental: '实验',
};

const POPULAR_IDS = [
  'products/style-vault',
  'blocks/marketing/style-vault/cool-blob-hero',
  'tokens/gradient/style-vault/cool-blob-decor',
  'components/buttons/style-vault/dark-pill-cta',
];

/* ============ 工具 ============ */

function score(item: RegistryItem, q: string): number {
  if (!q) return 0;
  const l = q.toLowerCase();
  let s = 0;
  if (item.name.toLowerCase().includes(l)) s += 5;
  if (item.description.toLowerCase().includes(l)) s += 2;
  if (item.id.toLowerCase().includes(l)) s += 1;
  const tags = [
    ...item.tags.aesthetic,
    ...item.tags.mood,
    ...item.tags.stack,
  ];
  if (tags.some((t) => t.toLowerCase().includes(l))) s += 1;
  return s;
}

function bucketKey(id: string): string {
  return id.split('/')[1] ?? '_';
}

function bucketShort(id: string): string {
  if (id.startsWith('products/')) return '';
  const b = bucketKey(id);
  if (b === '_') return '';
  return BUCKET_LABEL[b] ?? b;
}

function isInputFocused(): boolean {
  const a = document.activeElement;
  if (!a) return false;
  const tag = a.tagName.toLowerCase();
  return (
    tag === 'input' ||
    tag === 'textarea' ||
    (a as HTMLElement).isContentEditable
  );
}

function highlight(text: string, q: string): React.ReactNode {
  if (!q) return text;
  const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  const matches: { idx: number; len: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    matches.push({ idx: m.index, len: m[0].length });
    if (m.index === re.lastIndex) re.lastIndex++;
  }
  if (matches.length === 0) return text;
  const parts: React.ReactNode[] = [];
  let last = 0;
  matches.forEach((mt, i) => {
    if (mt.idx > last)
      parts.push(<span key={`b${i}`}>{text.slice(last, mt.idx)}</span>);
    parts.push(
      <mark
        key={`m${i}`}
        className="rounded bg-cyan-100/70 px-[2px] font-semibold text-cyan-800"
      >
        {text.slice(mt.idx, mt.idx + mt.len)}
      </mark>,
    );
    last = mt.idx + mt.len;
  });
  if (last < text.length) parts.push(<span key="t">{text.slice(last)}</span>);
  return parts;
}

const RECENT_KEY = 'sv-search-recent';
function getRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function pushRecent(q: string) {
  if (!q.trim()) return;
  const prev = getRecent();
  const next = [q, ...prev.filter((x) => x !== q)].slice(0, 5);
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

/* ============ Mini preview（热门推荐用） ============ */

function PopPreview({ id }: { id: string }) {
  switch (id) {
    case 'products/style-vault':
      return (
        <>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(135deg, #cffafe 0%, #fff 50%, #e2e8f0 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: '#0f172a',
            }}
          >
            Style{' '}
            <span
              style={{
                marginLeft: 3,
                backgroundImage:
                  'linear-gradient(to bottom right, #0891b2, #1e293b)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Vault
            </span>
          </div>
        </>
      );
    case 'blocks/marketing/style-vault/cool-blob-hero':
      return (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#fff',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: -12,
              top: -12,
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'rgba(207,250,254,0.7)',
              filter: 'blur(8px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: -10,
              bottom: -8,
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'rgba(226,232,240,0.7)',
              filter: 'blur(8px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              fontWeight: 600,
              color: '#0f172a',
              letterSpacing: '-0.01em',
            }}
          >
            Hero
          </div>
        </div>
      );
    case 'tokens/gradient/style-vault/cool-blob-decor':
      return (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#fff',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: -6,
              top: -4,
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: 'rgba(207,250,254,0.85)',
              filter: 'blur(10px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: -4,
              bottom: -2,
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'rgba(226,232,240,0.85)',
              filter: 'blur(10px)',
            }}
          />
        </div>
      );
    case 'components/buttons/style-vault/dark-pill-cta':
      return (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              height: 22,
              padding: '0 12px',
              background: '#0f172a',
              color: '#fff',
              fontSize: 9,
              fontWeight: 500,
              borderRadius: 9999,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              boxShadow: '0 4px 12px -4px rgba(15,23,42,0.5)',
            }}
          >
            立即开始 <span>→</span>
          </div>
        </div>
      );
    default:
      return (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #f8fafc, #fff)',
          }}
        />
      );
  }
}

/* ============ 顶层 wrapper · 订阅 module 状态 + 全局快捷键 ============ */

export function SearchPanel() {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    const cb = () => setOpen(isOpen);
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  }, []);

  // 全局唤起快捷键（panel 关闭时生效）
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isOpen) return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchPanel.open();
      } else if (e.key === '/' && !isInputFocused()) {
        e.preventDefault();
        searchPanel.open();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!open) return null;
  return <PanelInner onClose={() => searchPanel.close()} />;
}

/* ============ 面板主体 ============ */

type TypeFilter = 'all' | EntryType;

function PanelInner({ onClose }: { onClose: () => void }) {
  const reg = useRegistry();
  const nav = useNavigate();

  const [q, setQ] = useState('');
  const [type, setType] = useState<TypeFilter>('all');
  const [platform, setPlatform] = useState<'all' | PlatformSel>('all');
  const [kbIdx, setKbIdx] = useState(-1);
  const [recent, setRecent] = useState<string[]>(() => getRecent());

  const inputRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // 自动聚焦输入框
  useEffect(() => {
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, []);

  // 锁定 body 滚动
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // results = 平台过滤 + 查询打分排序
  const results = useMemo<RegistryItem[]>(() => {
    let arr = reg.items.slice();
    if (platform !== 'all') {
      arr = arr.filter((i) => matchesPlatform(i.platforms, platform));
    }
    const qt = q.trim();
    if (qt) {
      arr = arr
        .map((i) => ({ i, s: score(i, qt) }))
        .filter((x) => x.s > 0)
        .sort((a, b) => b.s - a.s)
        .map((x) => x.i);
    }
    return arr;
  }, [reg.items, q, platform]);

  // 各 type 计数（基于 results · 不受 type filter 影响）
  const counts = useMemo(() => {
    const c: Record<TypeFilter, number> = {
      all: results.length,
      product: 0,
      style: 0,
      page: 0,
      block: 0,
      component: 0,
      token: 0,
    };
    results.forEach((i) => {
      c[i.type]++;
    });
    return c;
  }, [results]);

  // 显示项（应用 type filter）
  const visible = useMemo(() => {
    return type === 'all' ? results : results.filter((i) => i.type === type);
  }, [results, type]);

  // 按 type → bucket 分组（空 query 状态用）
  const grouped = useMemo(() => {
    const m: Record<
      string,
      { type: EntryType; bucket: string; items: RegistryItem[] }
    > = {};
    visible.forEach((i) => {
      const b = bucketKey(i.id);
      const key = `${i.type}::${b}`;
      (m[key] = m[key] ?? { type: i.type, bucket: b, items: [] }).items.push(i);
    });
    return TYPE_ORDER.flatMap((t) =>
      Object.values(m).filter((g) => g.type === t),
    );
  }, [visible]);

  // 键盘可导航的扁平 id 列表
  const flatNav = useMemo(() => {
    const ids: string[] = [];
    const qt = q.trim();
    if (!qt && type === 'all') {
      POPULAR_IDS.forEach((id) => {
        if (reg.items.find((x) => x.id === id)) ids.push(id);
      });
    }
    visible.forEach((i) => ids.push(i.id));
    return ids;
  }, [q, type, visible, reg.items]);

  // 数据变化时重置 kb idx
  useEffect(() => {
    setKbIdx(-1);
  }, [q, type, platform]);

  // 面板内键盘
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (flatNav.length === 0) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setKbIdx((p) => (p + 1 + flatNav.length) % flatNav.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setKbIdx((p) =>
          p < 0 ? flatNav.length - 1 : (p - 1 + flatNav.length) % flatNav.length,
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const idx = kbIdx >= 0 ? kbIdx : 0;
        openItem(flatNav[idx]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flatNav, kbIdx]);

  // active row 滚入视口
  useEffect(() => {
    if (kbIdx < 0) return;
    const el = contentRef.current?.querySelector<HTMLElement>(
      `[data-kb="${kbIdx}"]`,
    );
    el?.scrollIntoView({ block: 'nearest' });
  }, [kbIdx]);

  function openItem(id: string) {
    const qt = q.trim();
    if (qt) {
      pushRecent(qt);
      setRecent(getRecent());
    }
    if (id.startsWith('products/')) {
      nav(`/products/${id.replace(/^products\//, '')}`);
    } else {
      nav(`/item/${id}`);
    }
    onClose();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="搜索"
      onClick={onClose}
      className="sv-search-mask-anim fixed inset-0 z-[200] flex items-start justify-center pt-[12vh]"
      style={{
        background: 'rgba(15,23,42,0.28)',
        backdropFilter: 'blur(1px)',
        WebkitBackdropFilter: 'blur(1px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="sv-search-panel-anim flex max-h-[680px] w-[min(840px,calc(100vw-48px))] flex-col overflow-hidden rounded-3xl border border-slate-200 shadow-[0_32px_80px_-20px_rgba(15,23,42,0.5)]"
        style={{
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        {/* toolbar */}
        <div className="flex items-center gap-4 border-b border-slate-100 px-[22px] py-[18px]">
          <SearchOutlined className="shrink-0 text-[20px] text-slate-400" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索风格"
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent text-[17px] tracking-tight text-slate-900 outline-none placeholder:text-slate-400"
          />
          {q && (
            <button
              type="button"
              onClick={() => {
                setQ('');
                inputRef.current?.focus();
              }}
              aria-label="清空"
              className="flex h-6 w-6 items-center justify-center rounded-md text-slate-300 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <CloseOutlined className="text-[14px]" />
            </button>
          )}
          <PlatformGroup value={platform} onChange={setPlatform} />
        </div>

        {/* recent */}
        {recent.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-[22px] py-[14px]">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
              最近
            </span>
            {recent.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setQ(r)}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/60 px-2.5 py-1 text-[11px] text-slate-600 transition hover:border-slate-900 hover:text-slate-900"
              >
                {r}
              </button>
            ))}
          </div>
        )}

        {/* body */}
        <div className="grid min-h-0 flex-1 grid-cols-[168px_1fr]">
          {/* sidebar */}
          <aside className="overflow-y-auto border-r border-slate-100 px-2 py-4">
            <div className="mb-2 px-3 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
              类型
            </div>
            {(
              [
                { v: 'all', label: '全部', dot: '#94a3b8' },
                { v: 'product', label: '产品', dot: TYPE_DOT.product },
                { v: 'style', label: '风格', dot: TYPE_DOT.style },
                { v: 'page', label: '页面', dot: TYPE_DOT.page },
                { v: 'block', label: '模块', dot: TYPE_DOT.block },
                { v: 'component', label: '组件', dot: TYPE_DOT.component },
                { v: 'token', label: '原语', dot: TYPE_DOT.token },
              ] as { v: TypeFilter; label: string; dot: string }[]
            ).map((t) => {
              const on = type === t.v;
              return (
                <button
                  key={t.v}
                  type="button"
                  onClick={() => setType(t.v)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-[13px] font-medium transition ${
                    on
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: t.dot }}
                    />
                    {t.label}
                  </span>
                  <span
                    className={`font-mono text-[11px] tabular-nums ${
                      on ? 'text-slate-300' : 'text-slate-300'
                    }`}
                  >
                    {counts[t.v]}
                  </span>
                </button>
              );
            })}
          </aside>

          {/* content */}
          <section
            ref={contentRef}
            className="overflow-y-auto px-[22px] py-[18px]"
          >
            {q.trim() ? (
              visible.length === 0 ? (
                <EmptyResult q={q} />
              ) : (
                <QueryResults
                  visible={visible}
                  q={q}
                  kbIdx={kbIdx}
                  flatNav={flatNav}
                  onOpen={openItem}
                />
              )
            ) : (
              <EmptyView
                reg={reg}
                grouped={grouped}
                type={type}
                kbIdx={kbIdx}
                flatNav={flatNav}
                onOpen={openItem}
              />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

/* ============ 子组件 ============ */

function PlatformGroup({
  value,
  onChange,
}: {
  value: 'all' | PlatformSel;
  onChange: (v: 'all' | PlatformSel) => void;
}) {
  const opts: { v: 'all' | PlatformSel; label: string }[] = [
    { v: 'all', label: '全部' },
    { v: 'web', label: 'Web' },
    { v: 'ios', label: 'iOS' },
    { v: 'android', label: 'Android' },
  ];
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-[3px]">
      {opts.map((o) => (
        <button
          key={o.v}
          type="button"
          onClick={() => onChange(o.v)}
          className={`rounded-full px-3 py-[5px] text-[11px] font-medium transition ${
            value === o.v
              ? 'bg-slate-900 text-white'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function EmptyResult({ q }: { q: string }) {
  return (
    <div className="py-20 text-center text-[13px] text-slate-400">
      <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-300">
        No Results
      </div>
      没有匹配 "<span className="text-slate-700">{q}</span>" 的条目
      <div className="mt-3 text-[12px] text-slate-300">
        试试别的关键词，或切换 类型 / 平台
      </div>
    </div>
  );
}

function QueryResults({
  visible,
  q,
  kbIdx,
  flatNav,
  onOpen,
}: {
  visible: RegistryItem[];
  q: string;
  kbIdx: number;
  flatNav: string[];
  onOpen: (id: string) => void;
}) {
  // 按 type 分组（query 模式 collapse buckets，按 type 看更直观）
  const byType: Record<EntryType, RegistryItem[]> = {
    product: [],
    style: [],
    page: [],
    block: [],
    component: [],
    token: [],
  };
  visible.forEach((i) => byType[i.type].push(i));

  return (
    <>
      {TYPE_ORDER.filter((t) => byType[t].length > 0).map((t) => (
        <div key={t} className="mb-5">
          <div className="mb-2 flex items-baseline gap-2 border-b border-dashed border-slate-200 pb-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: TYPE_DOT[t] }}
            />
            <span className="text-[13px] font-semibold text-slate-900">
              {typeLabel[t]}
            </span>
            <span className="ml-auto font-mono text-[11px] text-slate-300">
              {byType[t].length}
            </span>
          </div>
          {byType[t].map((i) => {
            const idx = flatNav.indexOf(i.id);
            const on = idx === kbIdx;
            const bk = bucketShort(i.id);
            return (
              <button
                key={i.id}
                type="button"
                data-kb={idx}
                onClick={() => onOpen(i.id)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition ${
                  on ? 'bg-slate-100' : 'hover:bg-slate-50'
                }`}
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: TYPE_DOT[t] }}
                />
                <span className="shrink-0 text-[13px] font-medium text-slate-900">
                  {highlight(i.name, q)}
                </span>
                <span className="flex-1 truncate text-[12px] text-slate-500">
                  {highlight(i.description, q)}
                </span>
                {bk && (
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-slate-300">
                    {bk}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </>
  );
}

function EmptyView({
  reg,
  grouped,
  type,
  kbIdx,
  flatNav,
  onOpen,
}: {
  reg: { items: RegistryItem[] };
  grouped: { type: EntryType; bucket: string; items: RegistryItem[] }[];
  type: TypeFilter;
  kbIdx: number;
  flatNav: string[];
  onOpen: (id: string) => void;
}) {
  return (
    <>
      {/* 热门推荐（仅 type=all 显示） */}
      {type === 'all' && (
        <div className="mb-6">
          <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            热门推荐
          </div>
          <div className="flex flex-col gap-2">
            {POPULAR_IDS.map((id) => {
              const i = reg.items.find((x) => x.id === id);
              if (!i) return null;
              const idx = flatNav.indexOf(i.id);
              const on = idx === kbIdx;
              const bk = bucketShort(i.id);
              return (
                <button
                  key={i.id}
                  type="button"
                  data-kb={idx}
                  onClick={() => onOpen(i.id)}
                  className={`flex items-center gap-3.5 rounded-xl border bg-white p-3 text-left transition hover:-translate-y-0.5 hover:shadow-[0_2px_6px_-1px_rgba(15,23,42,0.06),0_12px_28px_-10px_rgba(15,23,42,0.18)] ${
                    on
                      ? '-translate-y-0.5 border-slate-900 shadow-[0_2px_6px_-1px_rgba(15,23,42,0.06),0_12px_28px_-10px_rgba(15,23,42,0.18)]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-slate-200">
                    <PopPreview id={i.id} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500">
                      <span
                        className="h-[5px] w-[5px] rounded-full"
                        style={{ background: TYPE_DOT[i.type] }}
                      />
                      {typeLabel[i.type]}
                      {bk && ` · ${bk}`}
                    </div>
                    <div className="mt-1 text-[14px] font-semibold tracking-tight text-slate-900">
                      {i.name}
                    </div>
                    <div className="mt-0.5 truncate text-[12px] text-slate-500">
                      {i.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* bucket 分组 */}
      {grouped.map((g, gi) => {
        const bk = BUCKET_LABEL[g.bucket] ?? g.bucket;
        return (
          <div
            key={`${g.type}::${g.bucket}`}
            className={gi === 0 ? '' : 'mt-5'}
          >
            <div className="mb-2 flex items-baseline gap-2 border-b border-dashed border-slate-200 pb-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: TYPE_DOT[g.type] }}
              />
              <span className="text-[13px] font-semibold text-slate-900">
                {typeLabel[g.type]}
              </span>
              {g.bucket !== '_' && (
                <span className="text-[12px] text-slate-400">· {bk}</span>
              )}
              <span className="ml-auto font-mono text-[11px] text-slate-300">
                {g.items.length}
              </span>
            </div>
            {g.items.slice(0, 8).map((i) => {
              const idx = flatNav.indexOf(i.id);
              const on = idx === kbIdx;
              return (
                <button
                  key={i.id}
                  type="button"
                  data-kb={idx}
                  onClick={() => onOpen(i.id)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition ${
                    on ? 'bg-slate-100' : 'hover:bg-slate-50'
                  }`}
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: TYPE_DOT[g.type] }}
                  />
                  <span className="shrink-0 text-[13px] font-medium text-slate-900">
                    {i.name}
                  </span>
                  <span className="flex-1 truncate text-[12px] text-slate-500">
                    {i.description}
                  </span>
                </button>
              );
            })}
            {g.items.length > 8 && (
              <div className="mt-1 px-3 text-[11px] text-slate-400">
                还有 {g.items.length - 8} 条 · 用 ↑↓ 滚或继续打字筛选
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export default SearchPanel;
