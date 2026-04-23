import { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Tag, Button, Empty, Select, Tabs, message, Tooltip } from 'antd';
import {
  ArrowLeftOutlined,
  CopyOutlined,
  CodeOutlined,
  FullscreenOutlined,
  EyeOutlined,
  EditOutlined,
  MobileOutlined,
  TabletOutlined,
  DesktopOutlined,
  ExpandOutlined,
} from '@ant-design/icons';
import { useRegistry, useItem, isRegistryMissing } from '../data/useRegistry';
import { typeLabel, typeColor } from '../utils/i18n';
import { zh } from '../utils/tagI18n';
import { buildPrompt } from '../utils/prompt';
import { TopBar } from '../components/TopBar';
import { FavoriteButton } from '../components/FavoriteButton';
import { NoteEditor } from '../components/NoteEditor';
import { ScreenshotGallery } from '../components/ScreenshotGallery';
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

export default function DetailPage() {
  const reg = useRegistry();
  const params = useParams();
  const nav = useNavigate();
  const [viewport, setViewport] = useState<ViewportKey>(1024);
  const [messageApi, ctx] = message.useMessage();

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
      messageApi.success({ content: 'Prompt 已复制', duration: 2 });
    } catch {
      messageApi.error({ content: '复制失败', duration: 2 });
    }
  };
  const handleCopySkillPath = async () => {
    try {
      await navigator.clipboard.writeText(
        `~/.agents/skills/style-vault/references/${item.skillPath}`,
      );
      messageApi.success({ content: '源码路径已复制', duration: 2 });
    } catch {
      messageApi.error({ content: '复制失败', duration: 2 });
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
      {ctx}
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

            {/* Tags 紧凑网格 */}
            <div className="space-y-3">
              <TagRow label="风格" values={item.tags.aesthetic} group="aesthetic" />
              <TagRow label="氛围" values={item.tags.mood} group="mood" />
              <TagRow label="主题" values={item.tags.theme} group="theme" />
              <TagRow label="技术栈" values={item.tags.stack} group="stack" />
            </div>

            {/* 关联 */}
            {usesItems.length > 0 && (
              <div>
                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  依赖
                </h3>
                <div className="space-y-1">
                  {usesItems.map((u) => (
                    <RelatedItem
                      key={u.id}
                      item={u}
                      onClick={() => nav(`/item/${u.id}`)}
                    />
                  ))}
                </div>
              </div>
            )}

            {usedByItems.length > 0 && (
              <div>
                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  被引用
                </h3>
                <div className="space-y-1">
                  {usedByItems.map((u) => (
                    <RelatedItem
                      key={u.id}
                      item={u}
                      onClick={() => nav(`/item/${u.id}`)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* CTA：主按钮 + 次级 icon */}
            <div className="flex items-stretch gap-2 pt-2">
              <Button
                type="primary"
                size="large"
                icon={<CopyOutlined />}
                onClick={handleCopyPrompt}
                className="!h-12 !flex-1 !border-0 !bg-slate-900 !font-medium !shadow-sm hover:!bg-slate-700"
              >
                复制 Prompt
              </Button>
              <Tooltip title="复制源码路径">
                <Button
                  size="large"
                  icon={<CodeOutlined />}
                  onClick={handleCopySkillPath}
                  className="!h-12 !w-12 !border-slate-200 !bg-white !text-slate-600 hover:!border-slate-300 hover:!text-slate-900"
                />
              </Tooltip>
            </div>
          </div>
        </aside>

        {/* ===================== 右列：预览 / 笔记 ===================== */}
        <main className="min-w-0 flex-1">
          <Tabs
            defaultActiveKey="preview"
            size="large"
            items={[
              {
                key: 'preview',
                label: (
                  <span className="flex items-center gap-1.5">
                    <EyeOutlined /> 预览
                  </span>
                ),
                children: (
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
                ),
              },
              {
                key: 'notes',
                label: (
                  <span className="flex items-center gap-1.5">
                    <EditOutlined /> 我的笔记
                  </span>
                ),
                children: <NoteEditor entryId={item.id} />,
              },
            ]}
          />
        </main>
      </div>

      {/* ===================== 底部：应用截图（宽版独立 section） ===================== */}
      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-[1600px] px-8 py-14">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="font-display text-[28px] font-bold tracking-[-0.02em] text-slate-900">
                应用截图
              </h2>
              <p className="mt-1 text-[13px] text-slate-500">
                在自己的项目里用上了？上传一张截图，记录风格是如何落地的
              </p>
            </div>
          </div>
          <ScreenshotGallery entryId={item.id} variant="section" />
        </div>
      </section>
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
  group: 'aesthetic' | 'mood' | 'theme' | 'stack';
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
