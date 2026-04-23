import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, Empty, Result, Tag, Typography, message } from 'antd';
import { useItem, useRegistry } from '../data/useRegistry';
import { ViewportSwitcher, type ViewportValue } from '../components/ViewportSwitcher';
import { buildPrompt } from '../utils/prompt';
import type { EntryType, RegistryItem } from '../../scripts/sync-from-skill/types';

const typeColorMap: Record<EntryType, string> = {
  vibe: 'magenta',
  archetype: 'geekblue',
  composite: 'cyan',
  atom: 'green',
  primitive: 'orange',
};

const TAG_GROUPS = ['aesthetic', 'mood', 'theme', 'stack'] as const;

function ItemLinks({ ids, registry }: { ids: string[]; registry: RegistryItem[] }) {
  if (ids.length === 0) return <div className="text-gray-400 text-sm">无</div>;
  return (
    <ul className="list-disc pl-5 m-0 text-sm">
      {ids.map((id) => {
        const found = registry.find((i) => i.id === id);
        return (
          <li key={id}>
            <Link to={`/item/${id}`} className="text-blue-600 hover:underline">
              {found ? `${found.name} (${id})` : id}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function DetailPage() {
  const params = useParams();
  const id = params['*'] ?? '';
  const navigate = useNavigate();
  const item = useItem(id);
  const registry = useRegistry();
  const [messageApi, contextHolder] = message.useMessage();
  const [viewport, setViewport] = useState<ViewportValue>('full');

  if (!item) {
    return (
      <div className="h-full flex items-center justify-center">
        <Result
          status="404"
          title="找不到条目"
          subTitle={`id: ${id || '(empty)'}`}
          extra={
            <Button type="primary" onClick={() => navigate('/')}>
              回到首页
            </Button>
          }
        />
      </div>
    );
  }

  const previewSrc = item.hasPreviewFile && item.preview ? item.preview : undefined;

  const handleCopyPath = async () => {
    const full = `~/.agents/skills/style-vault/references/${item.skillPath}`;
    try {
      await navigator.clipboard.writeText(full);
      messageApi.success('路径已复制');
    } catch {
      messageApi.error('复制失败，请手动复制');
    }
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(buildPrompt(item));
      messageApi.success('Prompt 已复制');
    } catch {
      messageApi.error('复制失败，请手动复制');
    }
  };

  const iframeMaxWidth = viewport === 'full' ? '100%' : `${viewport}px`;

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {contextHolder}
      <div className="h-14 border-b flex items-center px-6 bg-white gap-3">
        <Button onClick={() => navigate('/')}>返回</Button>
        <Tag color={typeColorMap[item.type]} className="m-0">
          {item.type}
        </Tag>
        <span className="text-lg font-semibold truncate">{item.name}</span>
        <span className="text-gray-400 text-sm ml-2 truncate">{item.id}</span>
      </div>

      <div className="flex-1 flex min-h-0">
        <aside className="basis-[40%] shrink-0 border-r bg-white overflow-auto p-6">
          <Typography.Paragraph>{item.description}</Typography.Paragraph>

          <Typography.Title level={5}>Tags</Typography.Title>
          <div className="flex flex-col gap-1 mb-4 text-sm">
            {TAG_GROUPS.map((k) => (
              <div key={k}>
                <span className="text-gray-500 mr-2">{k}:</span>
                {item.tags[k].length === 0 ? (
                  <span className="text-gray-300">-</span>
                ) : (
                  item.tags[k].map((t) => (
                    <Tag key={`${k}-${t}`} className="m-0 mr-1">
                      {t}
                    </Tag>
                  ))
                )}
              </div>
            ))}
          </div>

          <Typography.Title level={5}>Uses</Typography.Title>
          <ItemLinks ids={item.uses} registry={registry.items} />

          <Typography.Title level={5} style={{ marginTop: 16 }}>
            Used By
          </Typography.Title>
          <ItemLinks ids={item.usedBy} registry={registry.items} />

          <div className="mt-6 flex flex-wrap gap-2">
            <Button type="primary" onClick={handleCopyPrompt}>
              复制 Prompt
            </Button>
            <Button onClick={handleCopyPath}>看代码：{item.skillPath}</Button>
          </div>
        </aside>

        <main className="basis-[60%] shrink-0 overflow-auto p-6 flex flex-col gap-4 min-w-0">
          <div className="flex items-center gap-3">
            <ViewportSwitcher value={viewport} onChange={setViewport} />
            <span className="text-sm text-gray-400">preview</span>
          </div>

          <div
            className="bg-white border rounded overflow-hidden mx-auto w-full flex-1 min-h-[400px]"
            style={{ maxWidth: iframeMaxWidth }}
          >
            {previewSrc ? (
              <iframe
                src={`${window.location.origin}${previewSrc}`}
                title={item.id}
                className="w-full h-full"
                style={{ border: 0, minHeight: 400 }}
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <Empty description="Preview not built yet" />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
