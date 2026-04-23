import { CheckOutlined } from '@ant-design/icons';
import type { TagDict } from '../../scripts/sync-from-skill/types';
import { tagGroupLabel } from '../utils/i18n';
import { zh, type TagGroup } from '../utils/tagI18n';
import { emptyFilterValue, type FilterValue } from './TagFilterBar';

const GROUPS: Array<keyof FilterValue> = ['aesthetic', 'mood', 'theme', 'stack'];

export function FiltersPanel({
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

  const hasAny = GROUPS.some((k) => value[k].length > 0);

  return (
    <div className="w-[420px] max-w-[92vw]">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
        <h3 className="m-0 text-[14px] font-semibold text-slate-900">筛选</h3>
        <button
          type="button"
          onClick={() => onChange(emptyFilterValue)}
          disabled={!hasAny}
          className="text-[12px] text-slate-500 transition hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          全部清除
        </button>
      </div>

      <div className="max-h-[520px] space-y-5 overflow-y-auto px-5 py-4">
        {GROUPS.map((key) => {
          const options = dict[key];
          const selected = value[key];
          return (
            <section key={key}>
              <div className="mb-2 flex items-center justify-between">
                <h4 className="m-0 text-[12px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  {tagGroupLabel[key]}
                </h4>
                {selected.length > 0 && (
                  <button
                    type="button"
                    onClick={() => onChange({ ...value, [key]: [] })}
                    className="text-[11px] text-slate-400 transition hover:text-slate-900"
                  >
                    清除
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {options.map((v) => {
                  const checked = selected.includes(v);
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => toggle(key, v)}
                      className={`flex items-center gap-1 rounded-full border px-3 py-1 text-[12px] transition ${
                        checked
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {checked && <CheckOutlined className="text-[10px]" />}
                      <span>{zh(key as TagGroup, v)}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default FiltersPanel;
