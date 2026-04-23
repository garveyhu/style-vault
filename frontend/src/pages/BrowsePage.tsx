import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useRegistry } from '../data/useRegistry';
import { StyleCard } from '../components/StyleCard';
import type { EntryType, RegistryItem } from '../../scripts/sync-from-skill/types';

const tabs: { key: EntryType; label: string }[] = [
  { key: 'vibe', label: 'Vibes' },
  { key: 'archetype', label: 'Archetypes' },
  { key: 'composite', label: 'Composites' },
  { key: 'atom', label: 'Atoms' },
  { key: 'primitive', label: 'Primitives' },
];

function Grid({ items }: { items: RegistryItem[] }) {
  if (items.length === 0) {
    return <div className="p-6 text-gray-400">当前分类下暂无条目</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-6">
      {items.map((item) => (
        <StyleCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default function BrowsePage() {
  const registry = useRegistry();

  const tabItems: TabsProps['items'] = tabs.map(({ key, label }) => ({
    key,
    label,
    children: <Grid items={registry.items.filter((i) => i.type === key)} />,
  }));

  return (
    <div className="h-full flex flex-col">
      <div className="h-14 border-b flex items-center px-6 bg-white">
        <span className="text-lg font-semibold">Style Vault</span>
      </div>
      <div className="flex-1 flex min-h-0">
        <aside className="w-64 border-r p-4 bg-white">Filters</aside>
        <main className="flex-1 min-w-0 overflow-auto">
          <Tabs defaultActiveKey="composite" items={tabItems} className="px-6 pt-2" />
        </main>
      </div>
    </div>
  );
}
