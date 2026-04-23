import { Radio } from 'antd';

export type ViewportValue = 375 | 768 | 1024 | 1440 | 'full';

const options: { label: string; value: ViewportValue }[] = [
  { label: '375', value: 375 },
  { label: '768', value: 768 },
  { label: '1024', value: 1024 },
  { label: '1440', value: 1440 },
  { label: 'Full', value: 'full' },
];

type Props = {
  value: ViewportValue;
  onChange: (v: ViewportValue) => void;
};

export function ViewportSwitcher({ value, onChange }: Props) {
  return (
    <Radio.Group
      optionType="button"
      buttonStyle="solid"
      value={value}
      onChange={(e) => onChange(e.target.value as ViewportValue)}
      options={options}
    />
  );
}

export default ViewportSwitcher;
