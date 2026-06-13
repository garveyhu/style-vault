import { PreviewFrame } from '../../../_layout';

const SANS = 'Inter, system-ui, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

export default function ParamSlider() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 420, margin: '0 auto', fontFamily: SANS, color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>
          COMPONENT · PARAM SLIDER
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>参数滑块</h1>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
            padding: 20,
            background: '#fff',
            border: '1px solid #e7e5e0',
            borderRadius: 12,
            boxShadow: '0 1px 3px rgb(0 0 0/0.05), 0 2px 8px rgb(0 0 0/0.03)',
          }}
        >
          <Slider label="Temperature" value="0.7" min="0" max="2" step={0.1} defaultValue={0.7}
            hint="越高输出越随机，越低越确定" />
          <Slider label="Top P" value="0.9" min="0" max="1" step={0.05} defaultValue={0.9} />
          <Slider label="Max Tokens" value="∞" min="0" max="8192" step={64} defaultValue={0}
            minLabel="0" maxLabel="∞" hint="0 表示不限制输出长度" />
        </div>
      </div>
    </PreviewFrame>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  defaultValue,
  minLabel,
  maxLabel,
  hint,
}: {
  label: string;
  value: string;
  min: string;
  max: string;
  step: number;
  defaultValue: number;
  minLabel?: string;
  maxLabel?: string;
  hint?: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label style={{ fontSize: 12, fontWeight: 500, color: '#44403c' }}>{label}</label>
        <span
          style={{
            borderRadius: 4,
            background: '#f5f5f4',
            padding: '2px 6px',
            fontFamily: MONO,
            fontSize: 11.5,
            fontVariantNumeric: 'tabular-nums',
            color: '#44403c',
          }}
        >
          {value}
        </span>
      </div>
      <input
        type="range"
        min={Number(min)}
        max={Number(max)}
        step={step}
        defaultValue={defaultValue}
        style={{ width: '100%', cursor: 'pointer', accentColor: '#d97706' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontVariantNumeric: 'tabular-nums', color: '#a8a29e' }}>
        <span>{minLabel ?? min}</span>
        <span>{maxLabel ?? max}</span>
      </div>
      {hint && <p style={{ margin: 0, fontSize: 10.5, lineHeight: 1.4, color: '#78716c' }}>{hint}</p>}
    </div>
  );
}
