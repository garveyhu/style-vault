import { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Tag, Descriptions, Button, Empty, message } from 'antd';
import {
  ArrowLeftOutlined,
  CopyOutlined,
  CodeOutlined,
  MobileOutlined,
  TabletOutlined,
  DesktopOutlined,
  ExpandOutlined,
  FullscreenOutlined,
} from '@ant-design/icons';
import { useRegistry, useItem, isRegistryMissing } from '../data/useRegistry';
import { typeLabel, typeColor, tagGroupLabel } from '../utils/i18n';
import { zh } from '../utils/tagI18n';
import { buildPrompt } from '../utils/prompt';
import { TopBar } from '../components/TopBar';
import type { RegistryItem } from '../../scripts/sync-from-skill/types';

type ViewportKey = 375 | 768 | 1024 | 1440 | 'full';

const VIEWPORTS: { key: ViewportKey; label: string; icon: React.ReactNode }[] = [
  { key: 375, label: '手机', icon: <MobileOutlined /> },
  { key: 768, label: '平板', icon: <TabletOutlined /> },
  { key: 1024, label: '桌面', icon: <DesktopOutlined /> },
  { key: 1440, label: '大屏', icon: <DesktopOutlined /> },
  { key: 'full', label: '全宽', icon: <ExpandOutlined /> },
];

function LinkedItemButton({
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
      className="group flex w-full items-center justify-between rounded-lg bg-white px-3 py-2 text-sm transition hover:bg-violet-50"
    >
      <span className="flex items-center gap-2">
        <Tag color={typeColor[item.type]} bordered={false} className="!mr-0">
          {typeLabel[item.type]}
        </Tag>
        <span className="text-slate-900">{item.name}</span>
      </span>
      <ArrowLeftOutlined
        rotate={180}
        className="text-slate-300 transition group-hover:text-violet-500"
      />
    </button>
  );
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
  const previewUrl = item.preview ? `${window.location.origin}${item.preview}` : null;

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(buildPrompt(item));
      messageApi.success({ content: 'Prompt 已复制', duration: 2 });
    } catch {
      messageApi.error({ content: '复制失败，请手动复制', duration: 2 });
    }
  };
  const handleCopySkillPath = async () => {
    try {
      await navigator.clipboard.writeText(
        `~/.agents/skills/style-vault/references/${item.skillPath}`,
      );
      messageApi.success({ content: '源码路径已复制', duration: 2 });
    } catch {
      messageApi.error({ content: '复制失败，请手动复制', duration: 2 });
    }
  };

  const openFullscreen = () => {
    if (item.preview && item.hasPreviewFile) {
      window.open(item.preview, '_blank');
    }
  };

  const iframeMaxWidth = viewport === 'full' ? '100%' : `${viewport}px`;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {ctx}
      <TopBar />

      {/* 面包屑 */}
      <div className="border-b border-slate-200/60 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-8 py-3 text-sm">
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

      <div className="mx-auto flex max-w-[1600px] gap-8 px-8 py-8">
        {/* 左列 */}
        <aside className="w-[360px] shrink-0 space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <Tag color={typeColor[item.type]} bordered={false}>
                {typeLabel[item.type]}
              </Tag>
            </div>
            <h1 className="mt-2 font-display text-[32px] font-medium leading-tight tracking-tight text-slate-900">
              {item.name}
            </h1>
            <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
              {item.description}
            </p>
          </div>

          <Descriptions
            column={1}
            size="small"
            labelStyle={{ width: 72, color: '#64748b' }}
            items={[
              {
                key: 'id',
                label: 'ID',
                children: <code className="text-xs text-slate-500">{item.id}</code>,
              },
              {
                key: 'aesthetic',
                label: tagGroupLabel.aesthetic,
                children:
                  item.tags.aesthetic.length === 0 ? (
                    <span className="text-slate-300">-</span>
                  ) : (
                    item.tags.aesthetic.map((t) => (
                      <Tag key={t} bordered={false}>
                        {zh('aesthetic', t)}
                      </Tag>
                    ))
                  ),
              },
              {
                key: 'mood',
                label: tagGroupLabel.mood,
                children:
                  item.tags.mood.length === 0 ? (
                    <span className="text-slate-300">-</span>
                  ) : (
                    item.tags.mood.map((t) => (
                      <Tag key={t} color="purple" bordered={false}>
                        {zh('mood', t)}
                      </Tag>
                    ))
                  ),
              },
              {
                key: 'theme',
                label: tagGroupLabel.theme,
                children:
                  item.tags.theme.length === 0 ? (
                    <span className="text-slate-300">-</span>
                  ) : (
                    item.tags.theme.map((t) => (
                      <Tag
                        key={t}
                        color={t === 'dark' ? 'default' : 'gold'}
                        bordered={false}
                      >
                        {zh('theme', t)}
                      </Tag>
                    ))
                  ),
              },
              {
                key: 'stack',
                label: tagGroupLabel.stack,
                children:
                  item.tags.stack.length === 0 ? (
                    <span className="text-slate-300">-</span>
                  ) : (
                    item.tags.stack.map((t) => (
                      <Tag key={t} color="geekblue" bordered={false}>
                        {zh('stack', t)}
                      </Tag>
                    ))
                  ),
              },
            ]}
          />

          {usesItems.length > 0 && (
            <div>
              <h3 className="mb-2 text-[13px] font-medium text-slate-500">依赖</h3>
              <ul className="m-0 list-none space-y-1.5 p-0">
                {usesItems.map((u) => (
                  <li key={u.id}>
                    <LinkedItemButton item={u} onClick={() => nav(`/item/${u.id}`)} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {usedByItems.length > 0 && (
            <div>
              <h3 className="mb-2 text-[13px] font-medium text-slate-500">被引用</h3>
              <ul className="m-0 list-none space-y-1.5 p-0">
                {usedByItems.map((u) => (
                  <li key={u.id}>
                    <LinkedItemButton item={u} onClick={() => nav(`/item/${u.id}`)} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-2 pt-2">
            <Button
              type="primary"
              size="large"
              icon={<CopyOutlined />}
              onClick={handleCopyPrompt}
              className="!border-0 !bg-gradient-to-br !from-violet-500 !to-indigo-600 !shadow-md !shadow-violet-500/20 hover:!shadow-lg"
            >
              复制 Prompt
            </Button>
            <Button icon={<CodeOutlined />} onClick={handleCopySkillPath} size="large">
              复制源码路径
            </Button>
          </div>
        </aside>

        {/* 右列 preview */}
        <main className="min-w-0 flex-1 space-y-4">
          {/* ViewportSwitcher + 全屏 */}
          <div className="flex flex-wrap items-center gap-2">
            {VIEWPORTS.map((v) => (
              <button
                key={String(v.key)}
                type="button"
                onClick={() => setViewport(v.key)}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition
                  ${
                    viewport === v.key
                      ? 'border-violet-400 bg-violet-50 text-violet-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
              >
                {v.icon}
                <span>{v.label}</span>
                {typeof v.key === 'number' && (
                  <span className="text-[11px] text-slate-400">{v.key}</span>
                )}
              </button>
            ))}

            <div className="mx-2 h-5 w-px bg-slate-200" />

            <button
              type="button"
              onClick={openFullscreen}
              disabled={!item.hasPreviewFile}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 transition hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FullscreenOutlined />
              <span>全屏预览</span>
            </button>
          </div>

          {/* 浏览器 chrome 装饰外框 */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <div className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 truncate text-center text-[12px] text-slate-400">
                {item.preview}
              </div>
              <div className="w-16" />
            </div>
            <div className="flex justify-center bg-slate-50 p-4">
              <div
                style={{
                  maxWidth: iframeMaxWidth,
                  width: '100%',
                  transition: 'max-width 200ms ease',
                }}
              >
                {item.hasPreviewFile && previewUrl ? (
                  <iframe
                    src={previewUrl}
                    title={item.name}
                    className="h-[70vh] w-full rounded-md border border-slate-200 bg-white"
                  />
                ) : (
                  <Empty description="暂无预览" className="py-16" />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
