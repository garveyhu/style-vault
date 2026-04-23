import { Dropdown } from 'antd';
import { DownOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { TagDict } from '../../scripts/sync-from-skill/types';
import { tagGroupLabel } from '../utils/i18n';
import { zh, type TagGroup } from '../utils/tagI18n';

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
    { key: 'theme', options: dict.theme },
    { key: 'stack', options: dict.stack },
  ];

  const groupKeys = ['aesthetic', 'mood', 'theme', 'stack'] as const;
  const hasAnyActive = groupKeys.some((k) => value[k].length > 0);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-3 py-2">
        {groups.map(({ key, options }) => (
          <Dropdown
            key={key}
            trigger={['click']}
            menu={{
              items: options.map((v) => ({
                key: v,
                label: (
                  <span className="flex min-w-[140px] items-center justify-between text-sm">
                    <span>{zh(key as TagGroup, v)}</span>
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

      {hasAnyActive && (
        <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pb-3 pt-2">
          <span className="text-xs text-slate-400">已选：</span>
          {groupKeys.flatMap((k) =>
            value[k].map((v) => (
              <button
                key={`${k}-${v}`}
                type="button"
                onClick={() => toggle(k, v)}
                className="group flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2.5 py-0.5 text-[12px] text-violet-700 transition hover:border-violet-300 hover:bg-violet-100"
              >
                <span>{zh(k as TagGroup, v)}</span>
                <CloseOutlined className="text-[10px] text-violet-400 group-hover:text-violet-600" />
              </button>
            )),
          )}
        </div>
      )}
    </div>
  );
}

export default TagFilterBar;
