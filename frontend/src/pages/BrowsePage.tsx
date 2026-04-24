import { useMemo, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { FilterOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { useRegistry, isRegistryMissing } from "../data/useRegistry";
import { typePlural } from "../utils/i18n";
import { StyleCard } from "../components/StyleCard";
import { FiltersPanel } from "../components/FiltersPanel";
import { emptyFilterValue, type FilterValue } from "../components/TagFilterBar";
import { TopBar } from "../components/TopBar";
import { GlossaryDrawer } from "../components/GlossaryDrawer";
import {
  PlatformThemeBar,
  emptyPlatformTheme,
  type PlatformThemeValue,
} from "../components/PlatformThemeBar";
import type { Platform, RegistryItem } from "../../scripts/sync-from-skill/types";

type BrowseType = "style" | "page" | "block" | "component" | "token";

const ORDER: BrowseType[] = ["style", "page", "block", "component", "token"];
const PREVIEW_PER_SECTION = 3;
const GROUP_KEYS = ["aesthetic", "mood", "stack"] as const;

export default function BrowsePage() {
  const reg = useRegistry();
  const [filters, setFilters] = useState<FilterValue>(emptyFilterValue);
  const [ptf, setPtf] = useState<PlatformThemeValue>(emptyPlatformTheme);
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const nav = useNavigate();

  const activeFilterCount =
    GROUP_KEYS.reduce((acc, k) => acc + filters[k].length, 0) +
    (ptf.platform !== "all" ? 1 : 0) +
    (ptf.theme !== "any" ? 1 : 0);

  const sections = useMemo(() => {
    if (!reg?.items) return [] as Array<{ type: BrowseType; items: RegistryItem[] }>;

    const passesFilters = (item: RegistryItem): boolean => {
      for (const k of GROUP_KEYS) {
        if (filters[k].length === 0) continue;
        if (!item.tags[k].some((t) => filters[k].includes(t))) return false;
      }
      if (ptf.platform !== "all") {
        if (
          !item.platforms.includes(ptf.platform as Platform) &&
          !item.platforms.includes("any")
        ) {
          return false;
        }
      }
      if (ptf.theme !== "any") {
        if (item.theme !== ptf.theme && item.theme !== "both") return false;
      }
      return true;
    };

    return ORDER.map((type) => ({
      type,
      items: reg.items.filter((i) => i.type === type).filter(passesFilters),
    }));
  }, [reg, filters, ptf]);

  if (isRegistryMissing(reg)) return <Navigate to="/not-installed" replace />;

  const hasAnyResults = sections.some((s) => s.items.length > 0);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <TopBar />

      {/* ============ 标题区 + Filter（融合进一体） ============ */}
      <section className="relative overflow-hidden bg-[#fafafa]">
        {/* 极淡的 cyan 光晕做软过渡，消解顶部与下方的割裂感 */}
        <div className="pointer-events-none absolute -left-40 -top-32 h-[380px] w-[380px] rounded-full bg-cyan-100/40 blur-3xl" />
        <div className="pointer-events-none absolute right-0 -top-20 h-[260px] w-[260px] rounded-full bg-slate-200/45 blur-3xl" />

        <div className="relative mx-auto max-w-[1600px] px-8 pt-14">
          {/* 标题行：左标题 + 右小 CTA */}
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
                <span className="h-[3px] w-10 rounded-full bg-gradient-to-r from-cyan-500 to-slate-800" />
                Design Inspiration
              </div>
              <h1 className="mt-4 font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] text-slate-900 md:text-[52px]">
                设计灵感
              </h1>
            </div>
            <p className="mb-2 max-w-[440px] text-[14px] leading-relaxed text-slate-500">
              从产品到原语——看真实设计是怎么一层层落下来的。
              <br />
              按平台 / 主题 / 风格筛，灵感秒到手。
            </p>
          </div>

          {/* Filter 行：同 bg，靠细分割线分区不靠色块 */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-slate-200/70 pt-6">
            <PlatformThemeBar value={ptf} onChange={setPtf} />

            <Popover
              trigger="click"
              placement="bottomRight"
              arrow={false}
              content={
                <FiltersPanel
                  dict={reg.tagDict}
                  value={filters}
                  onChange={setFilters}
                />
              }
              overlayInnerStyle={{ padding: 0, borderRadius: 16 }}
            >
              <button
                type="button"
                className={`flex h-10 items-center gap-2 rounded-full border px-4 text-[13px] font-medium transition
                  ${
                    activeFilterCount > 0
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
              >
                <FilterOutlined className="text-[14px]" />
                <span>更多筛选</span>
                {activeFilterCount > 0 && (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white/20 px-1 text-[11px] font-semibold tabular-nums text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </Popover>
          </div>
        </div>
      </section>

      {/* ============ 分类 sections ============ */}
      <main className="mx-auto max-w-[1600px] px-8 pb-16 pt-8">
        {!hasAnyResults ? (
          <EmptyState
            onReset={() => {
              setFilters(emptyFilterValue);
              setPtf(emptyPlatformTheme);
            }}
          />
        ) : (
          <div className="space-y-10">
            {sections
              .filter((s) => s.items.length > 0)
              .map(({ type, items }, secIdx) => {
                const preview = items.slice(0, PREVIEW_PER_SECTION);
                const hasMore = items.length > PREVIEW_PER_SECTION;
                const num = String(secIdx + 1).padStart(2, "0");
                return (
                  <section key={type}>
                    <header className="mb-4 flex items-baseline justify-between gap-4">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[12px] tracking-wider text-slate-400">
                          {num}
                        </span>
                        <h2 className="font-display text-[22px] font-semibold tracking-[-0.015em] text-slate-900">
                          {typePlural[type]}
                        </h2>
                        <span className="text-[12px] text-slate-400">
                          · 共 {items.length} 个
                        </span>
                      </div>
                      {hasMore && (
                        <button
                          type="button"
                          onClick={() => {
                            const el = document.getElementById(`sec-${type}`);
                            el?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                          className="flex items-center gap-1 text-[13px] font-medium text-slate-500 transition hover:text-slate-900"
                        >
                          查看全部 <ArrowRightOutlined className="text-[11px]" />
                        </button>
                      )}
                    </header>

                    {/* auto-fill grid：卡片 340–480px 之间按容器宽度自适应，从左往右摆，
                        少量条目时不会被撑到空旷尺寸，也不会挤到一起 */}
                    <div
                      id={`sec-${type}`}
                      className="grid justify-start gap-4"
                      style={{
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(300px, 400px))",
                      }}
                    >
                      {preview.map((item) => (
                        <StyleCard
                          key={item.id}
                          item={item}
                          onClick={() => nav(`/item/${item.id}`)}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
          </div>
        )}
      </main>

      {/* ============ Footer ============ */}
      <footer className="border-t border-slate-100 bg-white">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-4 px-8 py-10 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="" className="h-7 w-7" />
            <span className="text-[14px] font-semibold tracking-tight text-slate-900">
              Style Vault · 风格库
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

        <GlossaryDrawer open={glossaryOpen} onClose={() => setGlossaryOpen(false)} />
      </footer>
    </div>
  );
}

/* -------------------- 子组件 -------------------- */

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="relative flex flex-col items-center gap-5 py-28">
      <div className="pointer-events-none absolute left-1/2 top-8 h-48 w-48 -translate-x-1/2 rounded-full bg-gradient-to-br from-slate-200/60 to-cyan-200/50 blur-3xl sv-anim-breathe" />
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
          没有匹配的设计
        </div>
        <div className="mt-1 text-[13px] text-slate-500">换一组筛选条件再试试</div>
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
