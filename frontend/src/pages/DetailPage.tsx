import { useMemo, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Tag, Empty, Select } from 'antd';
import {
  ArrowLeftOutlined,
  CopyOutlined,
  FullscreenOutlined,
  MobileOutlined,
  TabletOutlined,
  DesktopOutlined,
  ExpandOutlined,
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { useRegistry, useItem, isRegistryMissing } from '../data/useRegistry';
import { typeLabel, typeColor, platformLabel, themeLabel, zh } from '../utils/taxonomy';
import { buildPrompt } from '../utils/prompt';
import { TopBar } from '../components/TopBar';
import { FavoriteButton } from '../components/FavoriteButton';
import { toast } from '../components/Toast';
import { getPreviewComponent } from '../preview/registry';
import type { RegistryItem } from '../../scripts/sync-from-skill/types';

type ViewportKey = 375 | 768 | 1024 | 1440 | 'full';

const VIEWPORT_OPTIONS: {
  value: ViewportKey;
  label: string;
  icon: React.ReactNode;
  desc: string;
}[] = [
  { value: 375, label: '手机', icon: <MobileOutlined />, desc: '375 px' },
  { value: 768, label: '平板', icon: <TabletOutlined />, desc: '768 px' },
  { value: 1024, label: '桌面', icon: <DesktopOutlined />, desc: '1024 px' },
  { value: 1440, label: '大屏', icon: <DesktopOutlined />, desc: '1440 px' },
  { value: 'full', label: '全宽', icon: <ExpandOutlined />, desc: '响应式' },
];

function RelatedItem({
  item,
  onClick,
}: {
  item: RegistryItem;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3 rounded-xl border border-transparent bg-slate-50/60 px-3 py-2.5 text-left transition hover:border-slate-200 hover:bg-white"
    >
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${typeDotColor(item.type)}`}
      />
      <span className="flex-1 truncate">
        <span className="block text-[13px] font-medium text-slate-900">
          {item.name}
        </span>
        <span className="mt-0.5 block text-[11px] text-slate-400">
          {typeLabel[item.type]}
        </span>
      </span>
      <ArrowLeftOutlined
        rotate={180}
        className="shrink-0 text-slate-300 transition group-hover:text-slate-900"
      />
    </button>
  );
}

function typeDotColor(type: string): string {
  switch (type) {
    case 'product':
      return 'bg-purple-500';
    case 'style':
      return 'bg-rose-500';
    case 'page':
      return 'bg-indigo-500';
    case 'block':
      return 'bg-cyan-500';
    case 'component':
      return 'bg-emerald-500';
    case 'token':
      return 'bg-amber-500';
    default:
      return 'bg-slate-400';
  }
}

/* --- 关联组：按 type 分组、空组不展示，每组超过 N 项独立折叠 --- */
const TYPE_ORDER: RegistryItem['type'][] = [
  'product',
  'style',
  'page',
  'block',
  'component',
  'token',
];
const PER_GROUP_COLLAPSE = 4;

type GroupState = { collapsed: boolean; expanded: boolean };

function RelationGroups({
  title,
  items,
  onItemClick,
}: {
  title: string;
  items: RegistryItem[];
  onItemClick: (id: string) => void;
}) {
  const [stateMap, setStateMap] = useState<Record<string, GroupState>>({});

  const groups = useMemo(() => {
    const m: Partial<Record<RegistryItem['type'], RegistryItem[]>> = {};
    items.forEach((it) => {
      (m[it.type] ??= []).push(it);
    });
    return TYPE_ORDER.map((t) => ({ type: t, items: m[t] ?? [] })).filter(
      (g) => g.items.length > 0,
    );
  }, [items]);

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </h3>
        <span className="text-[11px] tabular-nums text-slate-300">
          {items.length}
        </span>
      </div>
      <div className="space-y-3">
        {groups.map(({ type, items: groupItems }) => {
          const { collapsed, expanded } = stateMap[type] ?? {
            collapsed: false,
            expanded: false,
          };
          const visible = collapsed
            ? []
            : expanded
              ? groupItems
              : groupItems.slice(0, PER_GROUP_COLLAPSE);
          const hidden = groupItems.length - visible.length;
          const toggleCollapsed = () =>
            setStateMap((s) => ({
              ...s,
              [type]: { collapsed: !collapsed, expanded: false },
            }));
          const toggleExpanded = () =>
            setStateMap((s) => ({
              ...s,
              [type]: { collapsed: false, expanded: !expanded },
            }));
          return (
            <div key={type}>
              <button
                type="button"
                onClick={toggleCollapsed}
                aria-expanded={!collapsed}
                className="group/group mb-1.5 flex w-full items-center justify-between rounded-md px-1 py-1 text-[11px] font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
              >
                <span className="flex items-center gap-1.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${typeDotColor(type)}`}
                  />
                  {typeLabel[type]}
                </span>
                <span className="flex items-center gap-1.5 text-slate-300 group-hover/group:text-slate-500">
                  <span className="tabular-nums">{groupItems.length}</span>
                  <DownOutlined
                    className="text-[9px] transition-transform"
                    rotate={collapsed ? -90 : 0}
                  />
                </span>
              </button>
              {!collapsed && (
                <>
                  <div className="space-y-1">
                    {visible.map((u) => (
                      <RelatedItem
                        key={u.id}
                        item={u}
                        onClick={() => onItemClick(u.id)}
                      />
                    ))}
                  </div>
                  {groupItems.length > PER_GROUP_COLLAPSE && (
                    <button
                      type="button"
                      onClick={toggleExpanded}
                      className="mt-1 inline-flex items-center gap-1 text-[11px] text-slate-400 transition hover:text-slate-700"
                    >
                      {expanded ? (
                        <>
                          收起 <UpOutlined className="text-[9px]" />
                        </>
                      ) : (
                        <>
                          展开剩余 {hidden} 项{' '}
                          <DownOutlined className="text-[9px]" />
                        </>
                      )}
                    </button>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DetailPage() {
  const reg = useRegistry();
  const params = useParams();
  const nav = useNavigate();
  const [viewport, setViewport] = useState<ViewportKey>(1024);

  const id = params['*'] ?? '';
  const item = useItem(id);

  if (isRegistryMissing(reg)) return <Navigate to="/not-installed" replace />;

  if (!item) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <TopBar />
        <div className="p-8 text-slate-500">找不到条目：{id}</div>
      </div>
    );
  }

  const usesItems = item.uses
    .map((u) => reg.items.find((i) => i.id === u))
    .filter((x): x is RegistryItem => Boolean(x));
  const usedByItems = item.usedBy
    .map((u) => reg.items.find((i) => i.id === u))
    .filter((x): x is RegistryItem => Boolean(x));
  const PreviewComp = getPreviewComponent(item.preview);

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(buildPrompt(item));
      toast.success('Prompt 已复制');
    } catch {
      toast.error('复制失败');
    }
  };

  const openFullscreen = () => {
    if (item.preview && item.hasPreviewFile) {
      window.open(item.preview, '_blank');
    }
  };

  const iframeMaxWidth = viewport === 'full' ? '100%' : `${viewport}px`;
  const currentViewport = VIEWPORT_OPTIONS.find((v) => v.value === viewport);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <TopBar />

      {/* 面包屑 */}
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-8 py-3 text-[13px]">
          <button
            type="button"
            onClick={() => nav(-1)}
            className="flex items-center gap-1 text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeftOutlined /> 返回
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500">{typeLabel[item.type]}</span>
          <span className="text-slate-300">/</span>
          <span className="font-medium text-slate-900">{item.name}</span>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1600px] gap-10 px-8 py-10">
        {/* ===================== 左列：元信息（不 sticky，避免粘粘感） ===================== */}
        <aside className="w-[340px] shrink-0">
          <div className="space-y-8">
            {/* 标题块 */}
            <div>
              <div className="flex items-center justify-between gap-2">
                <Tag color={typeColor[item.type]} bordered={false} className="!m-0">
                  {typeLabel[item.type]}
                </Tag>
                <FavoriteButton entryId={item.id} size="sm" variant="icon" />
              </div>
              <h1 className="mt-3 font-display text-[32px] font-bold leading-[1.15] tracking-[-0.03em] text-slate-900">
                {item.name}
              </h1>
              <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
                {item.description}
              </p>
            </div>

            {/* 主 CTA · 复制 Prompt · 描边幽灵 */}
            <button
              type="button"
              onClick={handleCopyPrompt}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-[1.5px] border-slate-300 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
            >
              <CopyOutlined className="text-[13px]" />
              复制 Prompt
            </button>

            {/* 平台 + 主题（顶层元数据） */}
            <div className="flex flex-wrap items-center gap-1.5">
              {item.platforms.map((p) => (
                <span
                  key={p}
                  className="rounded-md bg-slate-900 px-2 py-0.5 text-[11px] font-medium text-white"
                >
                  {platformLabel[p] ?? p}
                </span>
              ))}
              <span className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] text-slate-600">
                {themeLabel[item.theme] ?? item.theme}
              </span>
            </div>

            {/* Tags 紧凑网格 */}
            <div className="space-y-3">
              <TagRow label="风格" values={item.tags.aesthetic} group="aesthetic" />
              <TagRow label="氛围" values={item.tags.mood} group="mood" />
              <TagRow label="技术栈" values={item.tags.stack} group="stack" />
            </div>

            {/* 关联 */}
            {usesItems.length > 0 && (
              <RelationGroups
                title="依赖"
                items={usesItems}
                onItemClick={(id) => nav(`/item/${id}`)}
              />
            )}

            {usedByItems.length > 0 && (
              <RelationGroups
                title="被引用"
                items={usedByItems}
                onItemClick={(id) => nav(`/item/${id}`)}
              />
            )}
          </div>
        </aside>

        {/* ===================== 右列：预览 ===================== */}
        <main className="min-w-0 flex-1">
          <div className="space-y-4">
            {/* 视口选择 + 全屏 */}
            <div className="flex items-center gap-3">
              <Select<ViewportKey>
                value={viewport}
                onChange={(v) => setViewport(v)}
                size="large"
                suffixIcon={null}
                className="sv-viewport-select"
                popupMatchSelectWidth={200}
                style={{ width: 200 }}
                options={VIEWPORT_OPTIONS.map((v) => ({
                  value: v.value,
                  label: (
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-slate-600">
                        {v.icon}
                      </span>
                      <span className="flex-1 text-[13px] font-medium">
                        {v.label}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {v.desc}
                      </span>
                    </div>
                  ),
                }))}
              />
              <button
                type="button"
                onClick={openFullscreen}
                disabled={!item.hasPreviewFile}
                className="flex h-10 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 text-[13px] text-slate-600 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FullscreenOutlined />
                全屏预览
              </button>
              <div className="ml-auto flex items-center gap-1 text-[12px] text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {currentViewport?.label}
              </div>
            </div>

            {/* 浏览器 chrome */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <div className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 truncate text-center text-[12px] font-medium text-slate-500">
                  {item.name}
                </div>
                <div className="w-16" />
              </div>
              <div className="flex justify-center bg-slate-50 p-4">
                <div
                  className="sv-preview-embedded relative overflow-auto rounded-md border border-slate-200 bg-white"
                  style={{
                    maxWidth: iframeMaxWidth,
                    width: '100%',
                    maxHeight: '72vh',
                    transition: 'max-width 240ms ease',
                  }}
                >
                  {PreviewComp ? (
                    <PreviewComp />
                  ) : (
                    <Empty description="暂无预览" className="py-16" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function TagRow({
  label,
  values,
  group,
}: {
  label: string;
  values: string[];
  group: 'aesthetic' | 'mood' | 'stack';
}) {
  if (values.length === 0) return null;
  return (
    <div className="flex items-start gap-3">
      <span className="w-14 shrink-0 pt-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {values.map((v) => (
          <span
            key={v}
            className="rounded-md bg-slate-100 px-2 py-0.5 text-[12px] text-slate-700"
          >
            {zh(group, v)}
          </span>
        ))}
      </div>
    </div>
  );
}
