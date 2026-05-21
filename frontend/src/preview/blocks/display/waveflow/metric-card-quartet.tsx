import { PreviewFrame } from '../../../_layout';
import { ListChecks, CheckCircle2, PauseCircle, AlertCircle } from 'lucide-react';

const TONES = {
  default: { wrap: { background: 'rgba(244,243,238,0.6)', border: '1px solid rgba(231,229,224,0.4)' }, label: '#78716c', num: '#1c1917' },
  success: { wrap: { background: 'rgba(236,253,245,0.6)', border: '1px solid rgba(167,243,208,0.4)' }, label: '#047857', num: '#047857' },
  warning: { wrap: { background: 'rgba(255,237,213,0.6)', border: '1px solid rgba(253,186,116,0.4)' }, label: '#c2410c', num: '#c2410c' },
  danger: { wrap: { background: 'rgba(254,242,242,0.6)', border: '1px solid rgba(252,165,165,0.4)' }, label: '#b91c1c', num: '#b91c1c' },
};

export default function MetricCardQuartet() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 800, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          <Card icon={<ListChecks size={12} />} label="总任务" value={20} tone="default" />
          <Card icon={<CheckCircle2 size={12} />} label="运行中" value={15} tone="success" />
          <Card icon={<PauseCircle size={12} />} label="已暂停" value={3} tone="default" />
          <Card icon={<AlertCircle size={12} />} label="异常" value={2} tone="danger" />
        </div>
      </div>
    </PreviewFrame>
  );
}

function Card({ icon, label, value, tone }: any) {
  const t = TONES[tone as keyof typeof TONES];
  return (
    <div style={{ ...t.wrap, borderRadius: 8, padding: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: t.label, marginBottom: 2 }}>
        {icon}{label}
      </div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 24, fontWeight: 600, lineHeight: 1, color: t.num, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
    </div>
  );
}
