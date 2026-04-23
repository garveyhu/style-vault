import { useEffect, useMemo, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { HeartFilled } from "@ant-design/icons";
import { useRegistry, isRegistryMissing } from "../data/useRegistry";
import { typePlural } from "../utils/i18n";
import { StyleCard } from "../components/StyleCard";
import {
  TagFilterBar,
  emptyFilterValue,
  type FilterValue,
} from "../components/TagFilterBar";
import { TopBar } from "../components/TopBar";
import { GlossaryDrawer } from "../components/GlossaryDrawer";
import { useAuth } from "../auth/AuthContext";
import { useFavorites } from "../auth/FavoritesContext";
import type {
  EntryType,
  RegistryItem,
} from "../../scripts/sync-from-skill/types";

type ViewKey = EntryType | "favorites";

const ORDER: EntryType[] = [
  "vibe",
  "archetype",
  "composite",
  "atom",
  "primitive",
];
const GROUP_KEYS = ["aesthetic", "mood", "theme", "stack"] as const;

const PREVIEW_VIRTUAL_WIDTH = 1440;
const PREVIEW_VIRTUAL_HEIGHT = 900;

export default function BrowsePage() {
  const reg = useRegistry();
  const { user } = useAuth();
  const { set: favSet } = useFavorites();
  const [view, setView] = useState<ViewKey>("composite");
  const [filters, setFilters] = useState<FilterValue>(emptyFilterValue);
  const [search, setSearch] = useState("");
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if (!user && view === "favorites") setView("composite");
  }, [user, view]);

  const counts = useMemo<Record<EntryType, number>>(() => {
    const c: Record<EntryType, number> = {
      vibe: 0,
      archetype: 0,
      composite: 0,
      atom: 0,
      primitive: 0,
    };
    if (reg?.items) for (const i of reg.items) c[i.type]++;
    return c;
  }, [reg]);

  const favCount = favSet.size;

  const filtered = useMemo(() => {
    if (!reg?.items) return [];
    const q = search.trim().toLowerCase();
    const base =
      view === "favorites"
        ? reg.items.filter((i) => favSet.has(i.id))
        : reg.items.filter((i) => i.type === view);
    return base
      .filter((item) => {
        if (!q) return true;
        return (
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q)
        );
      })
      .filter((item) =>
        GROUP_KEYS.every((k) => {
          if (filters[k].length === 0) return true;
          return item.tags[k].some((t) => filters[k].includes(t));
        }),
      );
  }, [reg, view, filters, search, favSet]);

  if (isRegistryMissing(reg)) return <Navigate to="/not-installed" replace />;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <TopBar search={search} onSearchChange={setSearch} />

      {/* ===================== Hero（极简，无 stats / featured） ===================== */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-white">
        <div className="pointer-events-none absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-slate-100/60 via-emerald-100/40 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -right-48 top-0 h-[36rem] w-[36rem] rounded-full bg-gradient-to-br from-emerald-100/50 via-emerald-50/30 to-transparent blur-3xl" />

        <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 gap-14 px-8 py-20 md:py-24 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          {/* 左：标题 + 副 */}
          <div>
            <h1 className="sv-anim-fade-up sv-delay-0 font-display text-[64px] font-extrabold leading-[1.02] tracking-[-0.04em] text-slate-900 md:text-[80px] lg:text-[96px]">
              Discover your
              <br />
              <span className="bg-gradient-to-br from-emerald-700 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                style vault.
              </span>
            </h1>

            <p className="sv-anim-fade-up sv-delay-150 mt-10 max-w-xl text-[17px] leading-[1.7] text-slate-600">
              探索设计风格，实时预览，收藏分享。
              <br />
              想做同款页面？复制提示词，瞬间复刻！
            </p>
          </div>

          {/* 右：真实预览堆叠装饰 */}
          <div className="relative hidden h-[480px] lg:block">
            <HeroStackDecor items={reg.items} />
          </div>
        </div>
      </section>

      {/* ===================== Nav：分类 + 筛选（不 sticky，滑到才看见） ===================== */}
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-[1600px] px-8">
          <div className="flex flex-wrap items-center gap-3 py-5">
            {/* 收藏 tab */}
            {user && (
              <button
                type="button"
                onClick={() => setView("favorites")}
                className={`flex h-10 items-center gap-2 rounded-full px-5 text-[14px] font-medium transition ${
                  view === "favorites"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                <HeartFilled
                  className={
                    view === "favorites" ? "text-white" : "text-slate-400"
                  }
                />
                我的收藏
                <span
                  className={`rounded-full px-1.5 text-[11px] font-semibold tabular-nums ${
                    view === "favorites"
                      ? "bg-white/15 text-white"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {favCount}
                </span>
              </button>
            )}

            {ORDER.map((t) => {
              const active = view === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setView(t)}
                  className={`flex h-10 items-center gap-2 rounded-full px-5 text-[14px] font-medium transition ${
                    active
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {typePlural[t]}
                  <span
                    className={`rounded-full px-1.5 text-[11px] font-semibold tabular-nums ${
                      active
                        ? "bg-white/15 text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {counts[t]}
                  </span>
                </button>
              );
            })}

            {/* 筛选下拉（TagFilterBar）靠右 */}
            <div className="ml-auto">
              <TagFilterBar
                dict={reg.tagDict}
                value={filters}
                onChange={setFilters}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===================== 卡片网格 ===================== */}
      <main className="mx-auto max-w-[1600px] px-8 py-10">
        <div className="mb-6 flex items-end justify-between">
          <div className="text-[13px] text-slate-500">
            {view === "favorites"
              ? `共 ${favCount} 个收藏 · 当前显示 ${filtered.length}`
              : `共 ${counts[view]} 个条目 · 当前显示 ${filtered.length}`}
          </div>
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-sm text-slate-500 hover:text-slate-900"
            >
              清除搜索「{search}」
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          view === "favorites" && favCount === 0 ? (
            <FavoritesEmpty onExplore={() => setView("composite")} />
          ) : (
            <EmptyState
              onReset={() => {
                setFilters(emptyFilterValue);
                setSearch("");
              }}
            />
          )
        ) : (
          <div className="columns-1 gap-6 md:columns-2 lg:columns-3 xl:columns-4">
            {filtered.map((item) => (
              <StyleCard
                key={item.id}
                item={item}
                onClick={() => nav(`/item/${item.id}`)}
              />
            ))}
          </div>
        )}
      </main>

      {/* ===================== Footer ===================== */}
      <footer className="border-t border-slate-100 bg-white">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-4 px-8 py-10 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="" className="h-7 w-7" />
            <span className="text-[14px] font-semibold tracking-tight text-slate-900">
              Style Vault
            </span>
          </div>

          <div className="flex items-center gap-6 text-[13px] text-slate-500">
            <button
              type="button"
              onClick={() => setGlossaryOpen(true)}
              className="transition hover:text-slate-900"
            >
              术语表
            </button>
            <span className="text-[12px] text-slate-400">
              © {new Date().getFullYear()} Style Vault
            </span>
          </div>
        </div>

        <GlossaryDrawer
          open={glossaryOpen}
          onClose={() => setGlossaryOpen(false)}
        />
      </footer>
    </div>
  );
}

/* -------------------- 子组件 -------------------- */

/**
 * Hero 右侧：几张预览卡片向后堆叠的装饰，不可点。
 */
function HeroStackDecor({ items }: { items: RegistryItem[] }) {
  const picks = useMemo(() => {
    const withPreview = items.filter((i) => i.hasPreviewFile && i.preview);
    const vibe = withPreview.find((i) => i.type === "vibe");
    const arche = withPreview.find((i) => i.type === "archetype");
    const comp = withPreview.find((i) => i.type === "composite");
    return [vibe, arche, comp].filter(Boolean) as RegistryItem[];
  }, [items]);

  if (picks.length === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-gradient-to-br from-slate-300/40 to-emerald-300/40 blur-2xl" />
      </div>
    );
  }

  const positions = [
    "left-0 top-6 rotate-[-6deg]",
    "left-24 top-20 rotate-[3deg]",
    "left-12 top-48 rotate-[-2deg]",
  ];

  return (
    <div className="pointer-events-none absolute inset-0">
      {picks.map((p, idx) => (
        <div
          key={p.id}
          className={`sv-anim-fade-up absolute aspect-[16/10] w-[400px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_-20px_rgba(15,23,42,0.3)] ${positions[idx]} sv-delay-${idx === 0 ? "300" : idx === 1 ? "500" : "600"}`}
          style={{ zIndex: 10 - idx }}
        >
          <StaticPreviewFrame item={p} />
        </div>
      ))}
    </div>
  );
}

function StaticPreviewFrame({ item }: { item: RegistryItem }) {
  const previewUrl = item.preview
    ? `${window.location.origin}${item.preview}`
    : null;
  const CARD_WIDTH = 400;
  const scale = CARD_WIDTH / PREVIEW_VIRTUAL_WIDTH;
  if (!previewUrl) return null;
  return (
    <div
      className="origin-top-left"
      style={{
        width: `${PREVIEW_VIRTUAL_WIDTH}px`,
        height: `${PREVIEW_VIRTUAL_HEIGHT}px`,
        transform: `scale(${scale})`,
      }}
    >
      <iframe
        src={previewUrl}
        title={item.name}
        className="pointer-events-none block h-full w-full border-0"
        loading="lazy"
      />
    </div>
  );
}

function FavoritesEmpty({ onExplore }: { onExplore: () => void }) {
  return (
    <div className="relative flex flex-col items-center gap-5 py-28">
      <div className="pointer-events-none absolute left-1/2 top-8 h-48 w-48 -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-200/60 to-pink-200/50 blur-3xl sv-anim-breathe" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_-8px_rgba(16,185,129,0.2)]">
        <HeartFilled className="text-[32px] text-emerald-400" />
      </div>
      <div className="relative text-center">
        <div className="font-display text-[22px] font-semibold text-slate-900">
          还没收藏任何风格
        </div>
        <div className="mt-1 text-[13px] text-slate-500">
          浏览风格库时点卡片上的心形即可加入收藏
        </div>
      </div>
      <button
        type="button"
        onClick={onExplore}
        className="relative h-10 rounded-full bg-slate-900 px-5 text-[13px] font-medium text-white transition hover:bg-slate-700"
      >
        去探索
      </button>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="relative flex flex-col items-center gap-5 py-28">
      <div className="pointer-events-none absolute left-1/2 top-8 h-48 w-48 -translate-x-1/2 rounded-full bg-gradient-to-br from-slate-200/60 to-emerald-200/50 blur-3xl sv-anim-breathe" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_-8px_rgba(15,23,42,0.15)]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-9 w-9 text-slate-500"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <div className="relative text-center">
        <div className="font-display text-[22px] font-semibold text-slate-900">
          没有匹配的风格
        </div>
        <div className="mt-1 text-[13px] text-slate-500">
          换一组筛选条件，或清除搜索再看看
        </div>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="relative h-10 rounded-full border border-slate-200 bg-white px-5 text-[13px] text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
      >
        清除所有筛选
      </button>
    </div>
  );
}
