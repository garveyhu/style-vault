import { Dropdown } from 'antd';
import { DownOutlined, CheckOutlined } from '@ant-design/icons';
import type { TagDict } from '../../scripts/sync-from-skill/types';
import { tagGroupLabel, themeLabel } from '../utils/i18n';

export type FilterValue = {
  aesthetic: string[];
  mood: string[];
  theme: string[];
  stack: string[];
};

export const emptyFilterValue: FilterValue = {
  aesthetic: [],
  mood: [],
  theme: [],
  stack: [],
};

type GroupConfig = {
  key: keyof FilterValue;
  options: string[];
  labelMap?: Record<string, string>;
};

export function TagFilterBar({
  dict,
  value,
  onChange,
}: {
  dict: TagDict;
  value: FilterValue;
  onChange: (v: FilterValue) => void;
}) {
  const toggle = (group: keyof FilterValue, v: string) => {
    const curr = value[group];
    const next = curr.includes(v) ? curr.filter((x) => x !== v) : [...curr, v];
    onChange({ ...value, [group]: next });
  };

  const activeCount = (g: keyof FilterValue) => value[g].length;

  const groups: GroupConfig[] = [
    { key: 'aesthetic', options: dict.aesthetic },
    { key: 'mood', options: dict.mood },
    { key: 'theme', options: dict.theme, labelMap: themeLabel },
    { key: 'stack', options: dict.stack },
  ];

  const hasAnyActive = (['aesthetic', 'mood', 'theme', 'stack'] as const).some(
    (k) => value[k].length > 0,
  );

  return (
    <div className="flex flex-wrap items-center gap-3 py-3">
      {groups.map(({ key, options, labelMap }) => (
        <Dropdown
          key={key}
          trigger={['click']}
          menu={{
            items: options.map((v) => ({
              key: v,
              label: (
                <span className="flex min-w-[120px] items-center justify-between text-sm">
                  <span>{labelMap?.[v] ?? v}</span>
                  {value[key].includes(v) && (
                    <CheckOutlined className="text-violet-500" />
                  )}
                </span>
              ),
              onClick: () => toggle(key, v),
            })),
          }}
        >
          <button
            type="button"
            className={`group flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm transition
              ${
                activeCount(key) > 0
                  ? 'border-violet-400 bg-violet-50 text-violet-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
          >
            <span>{tagGroupLabel[key]}</span>
            {activeCount(key) > 0 && (
              <span className="rounded-full bg-violet-500 px-1.5 text-[11px] leading-4 text-white">
                {activeCount(key)}
              </span>
            )}
            <DownOutlined className="text-[10px] opacity-60 transition group-hover:opacity-100" />
          </button>
        </Dropdown>
      ))}

      {hasAnyActive && (
        <button
          type="button"
          onClick={() => onChange(emptyFilterValue)}
          className="ml-2 text-xs text-slate-500 underline-offset-2 hover:underline"
        >
          清除筛选
        </button>
      )}
    </div>
  );
}

export default TagFilterBar;
