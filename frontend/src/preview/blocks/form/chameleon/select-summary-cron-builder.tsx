import { PreviewFrame } from '../../../_layout';
import { ChevronDown } from 'lucide-react';

/**
 * select-summary-cron-builder · Chameleon CronBuilder
 * 下拉切频率（每小时/每天/每周/每月/自定义）+ 时/分/周/日 Select
 * + 底部人类可读摘要 + mono cron 字符串；输出 5 段标准 cron
 * 源码：core/components/common/cron-builder.tsx
 *
 * 根节点即 div.space-y-2（无标题、无脚注）。此预览并排堆叠 5 种频率态，
 * 静态覆盖 hourly(只分) / daily(时:分) / weekly(周+时:分) / monthly(月日+时:分) / custom(裸 mono Input) 的字段差异。
 * SelectTrigger 默认 token：h-8(32) rounded-md(6) border-stone-300(#d6d3d1) px-3(12) text-[13px] + ChevronDown h-4 w-4(16) opacity-50。
 */

const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

interface CronState {
  freq: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'custom';
  hour: number;
  minute: number;
  weekday: number;
  dom: number;
  customText: string;
}

const buildCron = (s: CronState): string => {
  const { minute: m, hour: h } = s;
  switch (s.freq) {
    case 'hourly':
      return `${m} * * * *`;
    case 'daily':
      return `${m} ${h} * * *`;
    case 'weekly':
      return `${m} ${h} * * ${s.weekday}`;
    case 'monthly':
      return `${m} ${h} ${s.dom} * *`;
    default:
      return s.customText;
  }
};

const describe = (s: CronState): string => {
  const hh = String(s.hour).padStart(2, '0');
  const mm = String(s.minute).padStart(2, '0');
  switch (s.freq) {
    case 'hourly':
      return `每小时的第 ${s.minute} 分钟触发`;
    case 'daily':
      return `每天 ${hh}:${mm} 触发`;
    case 'weekly':
      return `每${WEEKDAYS[s.weekday]} ${hh}:${mm} 触发`;
    case 'monthly':
      return `每月 ${s.dom} 号 ${hh}:${mm} 触发`;
    default:
      return s.customText.trim() ? `自定义：${s.customText.trim()}` : '请填写 cron 表达式';
  }
};

const FREQ_LABEL: Record<CronState['freq'], string> = {
  hourly: '每小时',
  daily: '每天',
  weekly: '每周',
  monthly: '每月',
  custom: '自定义表达式',
};

const STATES: CronState[] = [
  { freq: 'hourly', hour: 9, minute: 30, weekday: 3, dom: 1, customText: '' },
  { freq: 'daily', hour: 9, minute: 30, weekday: 3, dom: 1, customText: '' },
  { freq: 'weekly', hour: 9, minute: 30, weekday: 3, dom: 1, customText: '' },
  { freq: 'monthly', hour: 9, minute: 0, weekday: 3, dom: 15, customText: '' },
  { freq: 'custom', hour: 9, minute: 30, weekday: 3, dom: 1, customText: '*/15 9-17 * * 1-5' },
];

export default function SelectSummaryCronBuilder() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: 24, display: 'flex', justifyContent: 'center', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <section
          style={{
            width: 480,
            background: '#fffefb',
            border: '1px solid rgba(231,229,224,0.4)',
            borderRadius: 12,
            boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)',
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {STATES.map(s => (
            <CronBuilder key={s.freq} state={s} />
          ))}
        </section>
      </div>
    </PreviewFrame>
  );
}

/* CronBuilder 根节点：div.space-y-2 */
function CronBuilder({ state }: { state: CronState }) {
  const showTime = state.freq === 'daily' || state.freq === 'weekly' || state.freq === 'monthly';
  const isCustomEmpty = state.freq === 'custom' && !state.customText.trim();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* 频率行 flex flex-wrap items-center gap-2 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
        <SelectBox width={120} value={FREQ_LABEL[state.freq]} />
        {/* weekly: w-[92px] 周 Select */}
        {state.freq === 'weekly' && <SelectBox width={92} value={WEEKDAYS[state.weekday]} />}
        {/* monthly: w-[92px] 月日 Select「{d} 号」 */}
        {state.freq === 'monthly' && <SelectBox width={92} value={`${state.dom} 号`} />}
        {/* daily/weekly/monthly: 时 Select w-[78px]「{HH} 时」+ : 分隔 */}
        {showTime && (
          <>
            <SelectBox width={78} value={`${String(state.hour).padStart(2, '0')} 时`} />
            <span style={{ color: '#a8a29e' }}>:</span>
          </>
        )}
        {/* 非 custom: 分 Select w-[78px]「{MM} 分」 */}
        {state.freq !== 'custom' && <SelectBox width={78} value={`${String(state.minute).padStart(2, '0')} 分`} />}
      </div>

      {/* custom 模式裸 mono Input（h-8 rounded-md border-stone-300 px-3 text-[13px] font-mono） */}
      {state.freq === 'custom' && (
        <input
          defaultValue={state.customText}
          placeholder="* * * * *（分 时 日 月 周）"
          style={{
            height: 32,
            width: '100%',
            padding: '0 12px',
            fontSize: 13,
            fontFamily: 'JetBrains Mono, monospace',
            borderRadius: 6,
            border: '1px solid #d6d3d1',
            outline: 'none',
            color: '#1c1917',
            boxSizing: 'border-box',
          }}
        />
      )}

      {/* 摘要行 text-[11px]（custom 且空 → text-stone-400 否则 text-stone-500） */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 11,
          color: isCustomEmpty ? '#a8a29e' : '#78716c',
        }}
      >
        <span>{describe(state)}</span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#a8a29e' }}>{buildCron(state)}</span>
      </div>
    </div>
  );
}

/* SelectTrigger：h-8(32) rounded-md(6) border-stone-300(#d6d3d1) px-3(12) text-[13px] + ChevronDown h-4 w-4(16) opacity-50 */
function SelectBox({ width, value }: { width: number; value: string }) {
  return (
    <button
      style={{
        display: 'flex',
        height: 32,
        width,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 4,
        padding: '0 12px',
        fontSize: 13,
        borderRadius: 6,
        border: '1px solid #d6d3d1',
        background: '#fff',
        color: '#1c1917',
        cursor: 'default',
        boxSizing: 'border-box',
      }}
    >
      <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {value}
      </span>
      <ChevronDown size={16} color="#1c1917" style={{ opacity: 0.5 }} />
    </button>
  );
}
