import { useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { isRegistryMissing, useRegistry } from '../data/useRegistry';
import { StyleCard } from '../components/StyleCard';
import { TagFilter, emptyFilterValue, type FilterValue } from '../components/TagFilter';
import { TopBar } from '../components/TopBar';
import type { EntryType, RegistryItem } from '../../scripts/sync-from-skill/types';

const tabs: { key: EntryType; label: string }[] = [
  { key: 'vibe', label: 'Vibes' },
  { key: 'archetype', label: 'Archetypes' },
  { key: 'composite', label: 'Composites' },
  { key: 'atom', label: 'Atoms' },
  { key: 'primitive', label: 'Primitives' },
];

const groupKeys: (keyof FilterValue)[] = ['aesthetic', 'mood', 'theme', 'stack'];

function matchFilter(item: RegistryItem, value: FilterValue): boolean {
  return groupKeys.every((key) => {
    const selected = value[key];
    if (selected.length === 0) return true;
    const itemTags = item.tags[key] ?? [];
    return itemTags.some((t) => selected.includes(t));
  });
}

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
  const [filter, setFilter] = useState<FilterValue>(emptyFilterValue);

  const filteredItems = useMemo(
    () => registry.items.filter((item) => matchFilter(item, filter)),
    [registry.items, filter],
  );

  if (isRegistryMissing(registry)) {
    return <Navigate to="/not-installed" replace />;
  }

  const tabItems: TabsProps['items'] = tabs.map(({ key, label }) => ({
    key,
    label,
    children: <Grid items={filteredItems.filter((i) => i.type === key)} />,
  }));

  return (
    <div className="h-full flex flex-col">
      <TopBar />
      <div className="flex-1 flex min-h-0">
        <aside className="w-64 border-r p-4 bg-white overflow-auto">
          <TagFilter tagDict={registry.tagDict} value={filter} onChange={setFilter} />
        </aside>
        <main className="flex-1 min-w-0 overflow-auto">
          <Tabs defaultActiveKey="composite" items={tabItems} className="px-6 pt-2" />
        </main>
      </div>
    </div>
  );
}
