import { Checkbox, Typography } from 'antd';
import type { TagDict } from '../../scripts/sync-from-skill/types';

export type FilterValue = {
  aesthetic: string[];
  mood: string[];
  theme: string[];
  stack: string[];
};

type GroupKey = keyof FilterValue;

type Props = {
  tagDict: TagDict;
  value: FilterValue;
  onChange: (v: FilterValue) => void;
};

const groups: { key: GroupKey; label: string }[] = [
  { key: 'aesthetic', label: 'Aesthetic' },
  { key: 'mood', label: 'Mood' },
  { key: 'theme', label: 'Theme' },
  { key: 'stack', label: 'Stack' },
];

export function TagFilter({ tagDict, value, onChange }: Props) {
  const handleGroupChange = (key: GroupKey) => (next: Array<string | number | boolean>) => {
    onChange({ ...value, [key]: next.map(String) });
  };

  return (
    <div className="flex flex-col gap-5">
      {groups.map(({ key, label }) => {
        const options = tagDict[key] ?? [];
        return (
          <div key={key}>
            <Typography.Title level={5} style={{ marginTop: 0, marginBottom: 8 }}>
              {label}
            </Typography.Title>
            <Checkbox.Group
              options={options.map((o) => ({ label: o, value: o }))}
              value={value[key]}
              onChange={handleGroupChange(key)}
              className="flex flex-col gap-1"
            />
          </div>
        );
      })}
    </div>
  );
}

export const emptyFilterValue: FilterValue = {
  aesthetic: [],
  mood: [],
  theme: [],
  stack: [],
};

export default TagFilter;
