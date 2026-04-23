import { Dropdown } from 'antd';
import { DownOutlined, CheckOutlined } from '@ant-design/icons';
import type { TagDict } from '../../scripts/sync-from-skill/types';
import { tagGroupLabel } from '../utils/i18n';
import { zh, type TagGroup } from '../utils/tagI18n';

export type FilterValue = {
  aesthetic: string[];
  mood: string[];
  stack: string[];
};

export const emptyFilterValue: FilterValue = {
  aesthetic: [],
  mood: [],
  stack: [],
};

const GROUPS: Array<keyof FilterValue> = ['aesthetic', 'mood', 'stack'];

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

  const hasAnyActive = GROUPS.some((k) => value[k].length > 0);

  return (
    <div className="flex items-center gap-2">
      {GROUPS.map((key) => {
        const options = dict[key];
        const selected = value[key];
        const active = selected.length > 0;

        return (
          <Dropdown
            key={key}
            trigger={['click']}
            placement="bottomRight"
            overlayClassName="sv-filter-dropdown"
            dropdownRender={() => (
              <div className="w-[220px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_40px_-12px_rgba(15,23,42,0.2)]">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5">
                  <span className="text-[12px] font-semibold text-slate-900">
                    {tagGroupLabel[key]}
                  </span>
                  {active && (
                    <button
                      type="button"
                      onClick={() => onChange({ ...value, [key]: [] })}
                      className="text-[11px] text-slate-500 transition hover:text-slate-900"
                    >
                      清除
                    </button>
                  )}
                </div>
                <ul className="m-0 list-none p-1">
                  {options.map((v) => {
                    const checked = selected.includes(v);
                    return (
                      <li key={v}>
                        <button
                          type="button"
                          onClick={() => toggle(key, v)}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[13px] transition ${
                            checked
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{zh(key as TagGroup, v)}</span>
                          {checked && (
                            <CheckOutlined className="text-[12px] text-emerald-500" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          >
            <button
              type="button"
              className={`group flex h-10 items-center gap-2 rounded-full border px-4 text-[13px] font-medium transition
                ${
                  active
                    ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
                }`}
            >
              <span>{tagGroupLabel[key]}</span>
              {active && (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white/20 px-1 text-[11px] font-semibold tabular-nums text-white">
                  {selected.length}
                </span>
              )}
              <DownOutlined className="text-[10px] opacity-70 transition group-hover:opacity-100" />
            </button>
          </Dropdown>
        );
      })}

      {hasAnyActive && (
        <button
          type="button"
          onClick={() => onChange(emptyFilterValue)}
          className="ml-1 h-10 px-3 text-[12px] text-slate-500 transition hover:text-slate-900"
        >
          全部清除
        </button>
      )}
    </div>
  );
}

export default TagFilterBar;
