import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { CopyOutlined } from '@ant-design/icons';
import { useRegistry, useItem, isRegistryMissing } from '../data/useRegistry';
import { TopBar } from '../components/TopBar';
import { FavoriteButton } from '../components/FavoriteButton';
import { toast } from '../components/Toast';
import { platformLabel, themeLabel, categoryLabel, categoryDot } from '../utils/taxonomy';
import { buildPrompt } from '../utils/prompt';
import { getPreviewComponent } from '../preview/registry';
import { GlobalLoading } from '../components/GlobalLoading';
import type { RegistryItem } from '../../scripts/sync-from-skill/types';

/**
 * 按 type 配虚拟宽度 —— 与各类预览组件的内容 maxWidth 大致对齐，
 * 让 block/component/token 的内容能"铺满"自己所在的列、不再被虚拟 1440 的白边压缩。
 */
const VIRTUAL_WIDTH_BY_TYPE: Record<string, number> = {
  product: 1440,
  style: 1440,
  page: 1440,
  block: 1000,
  component: 720,
  token: 1100,
};

/**
 * 自然高度预览卡：
 * - 按 type 在虚拟宽度下渲染预览组件 → 测量真实内容高度
 * - 按容器宽度等比缩放，容器高度 = 内容自然高度 × scale
 * - 不同内容自动产生不同高度，瀑布流自然成形
 */
function PreviewOnlyCard({
  item,
  onOpenDetail,
  onPeek,
}: {
  item: RegistryItem;
  onOpenDetail: () => void;
  onPeek: () => void;
}) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState<number | null>(null);
  const [scaledHeight, setScaledHeight] = useState<number | null>(null);
  const PreviewComp = getPreviewComponent(item.preview);
  const virtualWidth = VIRTUAL_WIDTH_BY_TYPE[item.type] ?? 1440;

  useLayoutEffect(() => {
    if (!PreviewComp) return;
    const frame = frameRef.current;
    const preview = previewRef.current;
    if (!frame || !preview) return;

    const compute = () => {
      const cw = frame.clientWidth;
      const naturalH = preview.offsetHeight;
      if (cw <= 0 || naturalH <= 0) return;
      const s = cw / virtualWidth;
      setScale(s);
      setScaledHeight(naturalH * s);
    };

    // 首次同步测一次（layoutEffect 内 setState 在 paint 前生效，不会闪）
    compute();

    // 只监听 frame 宽度变化（容器宽变了才需要重算 scale）。
    // 不监听 preview 内容高度变化 —— sage 预览组件内部有 timer / 动画 / 异步 mount，
    // 一观察就触发 setScaledHeight 让卡片在懒加载新批次时疯狂跳动。
    let lastW = frame.clientWidth;
    const ro = new ResizeObserver(entries => {
      for (const e of entries) {
        const newW = e.contentRect.width;
        if (Math.abs(newW - lastW) > 0.5) {
          lastW = newW;
          compute();
        }
      }
    });
    ro.observe(frame);
    return () => ro.disconnect();
  }, [PreviewComp, virtualWidth]);

  return (
    <div className="group mb-5 [break-inside:avoid]">
      {/* 缩略图 → 跳详情页 */}
      <button
        type="button"
        onClick={onOpenDetail}
        aria-label={`查看 ${item.name} 详情`}
        className="block w-full text-left"
      >
        {PreviewComp ? (
          <div
            ref={frameRef}
            className="sv-preview-embedded w-full overflow-hidden rounded-xl ring-1 ring-slate-200/60 transition group-hover:ring-slate-400 group-hover:shadow-md"
            style={{ height: scaledHeight ?? undefined }}
          >
            <div
              ref={previewRef}
              className="pointer-events-none origin-top-left"
              style={{
                width: `${virtualWidth}px`,
                transform: scale ? `scale(${scale})` : 'scale(0)',
                opacity: scale ? 1 : 0,
              }}
              aria-hidden
            >
              <PreviewComp />
            </div>
          </div>
        ) : (
          <div className="w-full rounded-xl bg-slate-100/70 py-12 text-center text-[12px] text-slate-400">
            暂无预览
          </div>
        )}
      </button>

      {/* caption → 弹出 peek 预览 */}
      <button
        type="button"
        onClick={onPeek}
        aria-label={`快速预览 ${item.name}`}
        className="mt-2 -mx-1 flex w-[calc(100%+0.5rem)] items-center gap-1.5 rounded px-1 py-1 transition-colors hover:bg-slate-100/70"
      >
        <span
          className="h-1 w-1 shrink-0 rounded-full bg-slate-400 transition-colors group-hover:bg-slate-600"
          aria-hidden
        />
        <span className="truncate text-[11px] leading-none text-slate-500 transition-colors group-hover:text-slate-700">
          {item.name}
        </span>
      </button>
    </div>
  );
}

/**
 * 卡片点名字时弹出的"快速预览"窗口。
 * - 真实渲染该 item 的 preview，按视口缩放到 max-w-[90vw]
 * - 点遮罩 / ESC / 关闭按钮 / "查看完整详情"链接 关闭
 */
function PreviewPeekModal({
  item,
  onClose,
  onOpenDetail,
}: {
  item: RegistryItem | null;
  onClose: () => void;
  onOpenDetail: (id: string) => void;
}) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState<number | null>(null);
  const [scaledHeight, setScaledHeight] = useState<number | null>(null);
  const PreviewComp = item ? getPreviewComponent(item.preview) : null;
  const virtualWidth = item
    ? (VIRTUAL_WIDTH_BY_TYPE[item.type] ?? 1440)
    : 1440;

  useLayoutEffect(() => {
    if (!item || !PreviewComp) return;
    const frame = frameRef.current;
    const preview = previewRef.current;
    if (!frame || !preview) return;

    const compute = () => {
      const cw = frame.clientWidth;
      const naturalH = preview.offsetHeight;
      if (cw <= 0 || naturalH <= 0) return;
      const s = cw / virtualWidth;
      setScale(s);
      setScaledHeight(naturalH * s);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(frame);
    ro.observe(preview);
    return () => ro.disconnect();
  }, [item, PreviewComp, virtualWidth]);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name} 快速预览`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/40 px-6 py-10 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[1180px] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200"
      >
        {/* header */}
        <div className="flex items-start justify-between gap-6 border-b border-slate-100 px-6 py-4">
          <div className="min-w-0 flex-1">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
              {item.type} · {item.id}
            </div>
            <h3 className="mt-1 truncate text-[17px] font-semibold text-slate-900">
              {item.name}
            </h3>
            {item.description && (
              <p className="mt-1 line-clamp-2 text-[12px] text-slate-500">
                {item.description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭"
            className="-mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <span className="text-[18px] leading-none">×</span>
          </button>
        </div>

        {/* preview frame · sv-preview-embedded 让全局 .sv-preview-frame { min-height: 100vh } 退化为 0，
            否则 preview.offsetHeight 会被撑到视口高，scaledHeight 被算超大产生大段空白 */}
        {PreviewComp ? (
          <div
            ref={frameRef}
            className="sv-preview-embedded w-full overflow-hidden bg-slate-50"
            style={{ height: scaledHeight ?? undefined }}
          >
            <div
              ref={previewRef}
              className="pointer-events-none origin-top-left"
              style={{
                width: `${virtualWidth}px`,
                transform: scale ? `scale(${scale})` : 'scale(0)',
                opacity: scale ? 1 : 0,
              }}
              aria-hidden
            >
              <PreviewComp />
            </div>
          </div>
        ) : (
          <div className="px-6 py-16 text-center text-[13px] text-slate-400">
            暂无预览
          </div>
        )}

        {/* footer */}
        <div className="flex items-center justify-between gap-4 border-t border-slate-100 px-6 py-3 text-[11px] text-slate-400">
          <span className="font-mono uppercase tracking-wider">
            按 ESC 关闭
          </span>
          <button
            type="button"
            onClick={() => onOpenDetail(item.id)}
            className="font-medium text-slate-500 transition-colors hover:text-slate-900"
          >
            查看完整详情 →
          </button>
        </div>
      </div>
    </div>
  );
}

const SECTION_IDS = ['style', 'pages', 'blocks', 'components', 'tokens'] as const;
type SectionId = (typeof SECTION_IDS)[number];

export default function ProductDetailPage() {
  const reg = useRegistry();
  const params = useParams();
  const nav = useNavigate();
  const slug = params.slug ?? '';
  const id = `products/${slug}`;
  const product = useItem(id);
  const [activeSection, setActiveSection] = useState<SectionId>('style');
  const [peekItem, setPeekItem] = useState<RegistryItem | null>(null);
  // 双 rAF 让浏览器先 paint，再渲染重内容（132 个 preview 同步挂载会卡 ~1s）
  // loading 立即显（比白屏好），content 准备好就立刻替换。
  // 滚动位置由全局 ScrollToTop 接管（PUSH 钉顶 / POP 还原），这里不主动改 scrollY。
  const [contentReady, setContentReady] = useState(false);
  useEffect(() => {
    setContentReady(false);
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setContentReady(true));
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [slug]);

  useEffect(() => {
    const sections = SECTION_IDS
      .map((sid) => document.getElementById(sid))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    // 视口上方 120px 触发，下方留 60% 缓冲 —— 滚到 section 头部时即激活
    const io = new IntersectionObserver(
      (entries) => {
        // 选取所有当前与 root 相交的，按 boundingClientRect.top 取最靠上的
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveSection(visible[0].target.id as SectionId);
        }
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [product?.id]);

  if (isRegistryMissing(reg)) return <Navigate to="/not-installed" replace />;

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <TopBar />
        <div className="p-8 text-slate-500">找不到产品：{id}</div>
      </div>
    );
  }

  // 立即显 loading，content 准备好就替换 —— 比白屏好
  if (!contentReady) return <GlobalLoading fullscreen />;

  const resolve = (rid: string) => reg.items.find((i) => i.id === rid);
  const style = product.refs?.style ? resolve(product.refs.style) : null;
  const pages = (product.refs?.pages ?? [])
    .map(resolve)
    .filter((x): x is RegistryItem => Boolean(x));
  const blocks = (product.refs?.blocks ?? [])
    .map(resolve)
    .filter((x): x is RegistryItem => Boolean(x));
  const components = (product.refs?.components ?? [])
    .map(resolve)
    .filter((x): x is RegistryItem => Boolean(x));
  const tokenRefs = product.refs?.tokens ?? {};
  // 收集 product.refs.tokens 下的所有 token id（单值槽 + layout 数组），按显示顺序去重
  const tokenIds: string[] = [
    tokenRefs.palette,
    tokenRefs.typography,
    tokenRefs.motion,
    tokenRefs.gradient,
    tokenRefs.border,
    tokenRefs.iconography,
    ...(tokenRefs.layout ?? []),
  ].filter((x): x is string => Boolean(x));
  const seen = new Set<string>();
  const tokenItems = tokenIds
    .filter((id) => (seen.has(id) ? false : (seen.add(id), true)))
    .map(resolve)
    .filter((x): x is RegistryItem => Boolean(x));

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <TopBar />

      {/* Cover Hero */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-white">
        <div className="pointer-events-none absolute -left-24 -top-24 h-[400px] w-[400px] rounded-full bg-cyan-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-[300px] w-[300px] rounded-full bg-slate-200/50 blur-3xl" />
        <div className="relative mx-auto max-w-[1100px] px-8 pb-20 pt-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: categoryDot(product.category) }}
            />
            产品 · {categoryLabel(product.category)}
          </div>
          <h1 className="mx-auto mt-5 max-w-[900px] font-display text-[64px] font-semibold leading-[1.03] tracking-[-0.025em] text-slate-900">
            {product.name}
          </h1>
          <p className="mx-auto mt-5 max-w-[640px] text-[17px] leading-relaxed text-slate-500">
            {product.description}
          </p>

          {/* 主 CTA · 复制完整 Prompt */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(buildPrompt(product));
                  toast.success('Prompt 已复制 · 粘到 AI 会话即可复刻整套设计系统');
                } catch {
                  toast.error('复制失败');
                }
              }}
              className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-[13px] font-medium text-white transition hover:bg-slate-700"
            >
              <CopyOutlined className="text-[13px]" />
              复制 Prompt
              <span className="text-slate-500">·</span>
              <span className="text-slate-300 transition-colors group-hover:text-slate-200">
                一键复刻整套设计系统
              </span>
            </button>
            <FavoriteButton entryId={product.id} size="md" variant="icon" />
          </div>

          {/* 平台 / 主题 meta */}
          <div className="mt-4 flex items-center justify-center gap-2 text-[12px]">
            {product.platforms.map((pl) => (
              <span
                key={pl}
                className="rounded-full border border-slate-200 bg-white/70 px-3 py-0.5 text-slate-600"
              >
                {platformLabel[pl] ?? pl}
              </span>
            ))}
            <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-0.5 text-slate-600">
              {themeLabel[product.theme] ?? product.theme}
            </span>
          </div>
        </div>
      </section>

      {/* Body with sticky TOC */}
      <section className="mx-auto max-w-[1280px] px-8 py-20">
        <div className="grid gap-10" style={{ gridTemplateColumns: '88px 1fr' }}>
          <aside className="sticky top-24 h-max">
            <div className="mb-3 text-[10px] uppercase tracking-[0.22em] text-slate-400">
              导航
            </div>
            <ul className="space-y-1 text-[12px]">
              {(
                [
                  ['style', '01', '风格'],
                  ['pages', '02', '页面'],
                  ['blocks', '03', '模块'],
                  ['components', '04', '组件'],
                  ['tokens', '05', '原语'],
                ] as const
              ).map(([sid, num, label]) => {
                const active = activeSection === sid;
                return (
                  <li key={sid}>
                    <a
                      href={`#${sid}`}
                      className={`relative flex items-center gap-2 rounded-md px-2 py-1 transition ${
                        active
                          ? 'font-medium text-slate-900'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <span
                        className={`absolute left-0 top-1/2 h-3 w-[2px] -translate-y-1/2 rounded-full transition ${
                          active ? 'bg-slate-900' : 'bg-transparent'
                        }`}
                      />
                      <span
                        className={`font-mono ${active ? 'text-slate-500' : 'text-slate-300'}`}
                      >
                        {num}
                      </span>
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </aside>

          <div className="min-w-0 space-y-16">
            {/* Style — 铺满 + 自然高度 */}
            {style && (
              <article id="style">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[12px] text-slate-400">01</span>
                  <h2 className="font-display text-[26px] font-semibold">
                    设计风格
                  </h2>
                </div>
                <div className="mt-8">
                  <PreviewOnlyCard
                    item={style}
                    onOpenDetail={() => nav(`/item/${style.id}`)}
                    onPeek={() => setPeekItem(style)}
                  />
                </div>
              </article>
            )}

            {/* Pages — masonry · 仅预览 */}
            <article id="pages">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[12px] text-slate-400">02</span>
                <h2 className="font-display text-[26px] font-semibold">页面</h2>
                <span className="text-[13px] text-slate-400">· {pages.length}</span>
              </div>
              <div className="mt-8 columns-2 gap-5 lg:columns-3">
                {pages.map((p) => (
                  <PreviewOnlyCard
                    key={p.id}
                    item={p}
                    onOpenDetail={() => nav(`/item/${p.id}`)}
                    onPeek={() => setPeekItem(p)}
                  />
                ))}
              </div>
            </article>

            {/* Blocks — masonry */}
            <article id="blocks">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[12px] text-slate-400">03</span>
                <h2 className="font-display text-[26px] font-semibold">模块</h2>
                <span className="text-[13px] text-slate-400">
                  · {blocks.length}
                </span>
              </div>
              <div className="mt-8 columns-2 gap-5 lg:columns-3">
                {blocks.map((b) => (
                  <PreviewOnlyCard
                    key={b.id}
                    item={b}
                    onOpenDetail={() => nav(`/item/${b.id}`)}
                    onPeek={() => setPeekItem(b)}
                  />
                ))}
              </div>
            </article>

            {/* Components — masonry */}
            <article id="components">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[12px] text-slate-400">04</span>
                <h2 className="font-display text-[26px] font-semibold">组件</h2>
                <span className="text-[13px] text-slate-400">
                  · {components.length}
                </span>
              </div>
              <div className="mt-8 columns-2 gap-5 md:columns-3 lg:columns-4">
                {components.map((c) => (
                  <PreviewOnlyCard
                    key={c.id}
                    item={c}
                    onOpenDetail={() => nav(`/item/${c.id}`)}
                    onPeek={() => setPeekItem(c)}
                  />
                ))}
              </div>
            </article>

            {/* Tokens — masonry · 全部 token 显示（palette / typography / motion / gradient / layout / ...） */}
            {tokenItems.length > 0 && (
              <article id="tokens">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[12px] text-slate-400">05</span>
                  <h2 className="font-display text-[26px] font-semibold">原语</h2>
                  <span className="text-[13px] text-slate-400">
                    · {tokenItems.length}
                  </span>
                </div>
                <div className="mt-8 columns-2 gap-5 lg:columns-3">
                  {tokenItems.map((t) => (
                    <PreviewOnlyCard
                      key={t.id}
                      item={t}
                      onOpenDetail={() => nav(`/item/${t.id}`)}
                      onPeek={() => setPeekItem(t)}
                    />
                  ))}
                </div>
              </article>
            )}
          </div>
        </div>
      </section>

      <PreviewPeekModal
        item={peekItem}
        onClose={() => setPeekItem(null)}
        onOpenDetail={(itemId) => {
          setPeekItem(null);
          nav(`/item/${itemId}`);
        }}
      />
    </div>
  );
}
