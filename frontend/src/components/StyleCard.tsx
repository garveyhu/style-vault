import { Card, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { RegistryItem, EntryType } from '../../scripts/sync-from-skill/types';

const typeColorMap: Record<EntryType, string> = {
  vibe: 'magenta',
  archetype: 'geekblue',
  composite: 'cyan',
  atom: 'green',
  primitive: 'orange',
};

export function StyleCard({ item }: { item: RegistryItem }) {
  const navigate = useNavigate();
  const previewSrc = item.hasPreviewFile ? item.preview : undefined;
  const aestheticTags = item.tags.aesthetic ?? [];
  const moodTags = item.tags.mood ?? [];

  const handleClick = () => {
    navigate(`/item/${item.id}`);
  };

  return (
    <Card
      hoverable
      onClick={handleClick}
      className="w-full h-[360px] cursor-pointer transition-shadow"
      styles={{ body: { padding: 16, height: '100%', display: 'flex', flexDirection: 'column' } }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Tag color={typeColorMap[item.type]} className="m-0">
          {item.type}
        </Tag>
        <h3 className="text-base font-semibold truncate flex-1 m-0">{item.name}</h3>
      </div>

      <p
        className="text-sm text-gray-500 mb-3"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {item.description}
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        {aestheticTags.map((t) => (
          <Tag key={`a-${t}`} color="blue" className="m-0">
            {t}
          </Tag>
        ))}
        {moodTags.map((t) => (
          <Tag key={`m-${t}`} color="purple" className="m-0">
            {t}
          </Tag>
        ))}
      </div>

      <div className="flex-1 min-h-0 rounded border border-gray-200 overflow-hidden bg-gray-50">
        {previewSrc ? (
          <iframe
            src={previewSrc}
            title={item.id}
            className="w-full h-full"
            style={{ border: 0 }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
            No preview yet
          </div>
        )}
      </div>
    </Card>
  );
}

export default StyleCard;
