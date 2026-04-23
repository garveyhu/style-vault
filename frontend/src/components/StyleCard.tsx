import { useEffect, useRef, useState } from 'react';
import { Tag } from 'antd';
import { ArrowRightOutlined, FullscreenOutlined } from '@ant-design/icons';
import type { RegistryItem } from '../../scripts/sync-from-skill/types';
import { typeLabel, typeColor } from '../utils/i18n';
import { zh } from '../utils/tagI18n';

const PREVIEW_VIRTUAL_WIDTH = 1440;
const PREVIEW_VIRTUAL_HEIGHT = 900;

export function StyleCard({
  item,
  onClick,
}: {
  item: RegistryItem;
  onClick: () => void;
}) {
  const previewUrl = item.preview ? `${window.location.origin}${item.preview}` : null;
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.28);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        if (w > 0) setScale(w / PREVIEW_VIRTUAL_WIDTH);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <article
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300
                 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_12px_40px_-12px_rgba(99,102,241,0.25)]"
    >
      {/* Preview 区——固定 16:10 比例，iframe 用 scale 缩略整页 */}
      <div
        ref={previewRef}
        className="relative aspect-[16/10] overflow-hidden bg-slate-50"
      >
        {previewUrl && item.hasPreviewFile ? (
          <div
            className="absolute left-0 top-0 origin-top-left"
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
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            暂无预览
          </div>
        )}
        {/* 渐变遮罩让信息区衔接更柔和 */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />

        {/* 全屏按钮，hover 时浮出 */}
        {item.hasPreviewFile && item.preview && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              window.open(item.preview!, '_blank');
            }}
            title="全屏预览"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 opacity-0 shadow-sm backdrop-blur-sm transition hover:bg-white group-hover:opacity-100"
          >
            <FullscreenOutlined className="text-slate-600" />
          </button>
        )}
      </div>

      {/* 信息区 */}
      <div className="space-y-2 p-5">
        <div className="flex items-center gap-2">
          <Tag color={typeColor[item.type]} bordered={false}>
            {typeLabel[item.type]}
          </Tag>
          <h3 className="m-0 flex-1 truncate text-[16px] font-semibold text-slate-900">
            {item.name}
          </h3>
          <ArrowRightOutlined className="text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-violet-500" />
        </div>
        <p className="line-clamp-2 min-h-[40px] text-[13px] text-slate-500">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.tags.aesthetic.slice(0, 3).map((t) => (
            <span
              key={`a-${t}`}
              className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600"
            >
              {zh('aesthetic', t)}
            </span>
          ))}
          {item.tags.mood.slice(0, 2).map((t) => (
            <span
              key={`m-${t}`}
              className="rounded-md bg-violet-50 px-2 py-0.5 text-[11px] text-violet-600"
            >
              {zh('mood', t)}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default StyleCard;
