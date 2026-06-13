import { PreviewFrame } from '../../../_layout';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

/**
 * select-summary-cron-builder · Chameleon CronBuilder
 * 下拉切频率（每小时/每天/每周/每月/自定义）+ 时/分/周/日 Select
 * + 底部人类可读摘要 + mono cron 字符串；输出 5 段标准 cron
 * 源码：core/components/common/cron-builder.tsx
 */

const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

export default function SelectSummaryCronBuilder() {
  const [freq, setFreq] = useState<'hourly' | 'daily' | 'weekly' | 'monthly' | 'custom'>('weekly');
  const [hour] = useState(9);
  const [minute] = useState(30);
  const [weekday] = useState(3);
  const [dom] = useState(1);
  const customText = '*/15 9-17 * * 1-5';

  const buildCron = () => {
    const m = minute;
    const h = hour;
    switch (freq) {
      case 'hourly':
        return `${m} * * * *`;
      case 'daily':
        return `${m} ${h} * * *`;
      case 'weekly':
        return `${m} ${h} * * ${weekday}`;
      case 'monthly':
        return `${m} ${h} ${dom} * *`;
      default:
        return customText;
    }
  };
  const describe = () => {
    const hh = String(hour).padStart(2, '0');
    const mm = String(minute).padStart(2, '0');
    switch (freq) {
      case 'hourly':
        return `每小时的第 ${minute} 分钟触发`;
      case 'daily':
        return `每天 ${hh}:${mm} 触发`;
      case 'weekly':
        return `每${WEEKDAYS[weekday]} ${hh}:${mm} 触发`;
      case 'monthly':
        return `每月 ${dom} 号 ${hh}:${mm} 触发`;
      default:
        return customText.trim() ? `自定义：${customText.trim()}` : '请填写 cron 表达式';
    }
  };

  const showTime = freq === 'daily' || freq === 'weekly' || freq === 'monthly';

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
          }}
        >
          <div style={{ fontSize: 12.5, color: '#44403c', marginBottom: 12, fontWeight: 500 }}>触发周期</div>

          {/* space-y-2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {/* 频率行 flex flex-wrap gap-2 */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
              <SelectBox
                width={120}
                value={
                  { hourly: '每小时', daily: '每天', weekly: '每周', monthly: '每月', custom: '自定义表达式' }[freq]
                }
                onClick={() =>
                  setFreq(f =>
                    f === 'weekly' ? 'daily' : f === 'daily' ? 'monthly' : f === 'monthly' ? 'custom' : f === 'custom' ? 'hourly' : 'weekly',
                  )
                }
              />
              {freq === 'weekly' && <SelectBox width={92} value={WEEKDAYS[weekday]} />}
              {freq === 'monthly' && <SelectBox width={92} value={`${dom} 号`} />}
              {showTime && (
                <>
                  <SelectBox width={78} value={`${String(hour).padStart(2, '0')} 时`} />
                  <span style={{ color: '#a8a29e' }}>:</span>
                </>
              )}
              {freq !== 'custom' && <SelectBox width={78} value={`${String(minute).padStart(2, '0')} 分`} />}
            </div>

            {/* custom 模式裸 mono input */}
            {freq === 'custom' && (
              <input
                defaultValue={customText}
                placeholder="* * * * *（分 时 日 月 周）"
                style={{
                  height: 36,
                  width: '100%',
                  padding: '0 10px',
                  fontSize: 13,
                  fontFamily: 'JetBrains Mono, monospace',
                  borderRadius: 8,
                  border: '1px solid #e7e5e0',
                  outline: 'none',
                  color: '#1c1917',
                  boxSizing: 'border-box',
                }}
              />
            )}

            {/* 摘要行 text-[11px] */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 11,
                color: freq === 'custom' && !customText.trim() ? '#a8a29e' : '#78716c',
              }}
            >
              <span>{describe()}</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#a8a29e' }}>{buildCron()}</span>
            </div>
          </div>

          <div style={{ marginTop: 12, fontSize: 10.5, color: '#a8a29e' }}>
            点击「频率」下拉可循环切换 5 种模式查看不同字段组合
          </div>
        </section>
      </div>
    </PreviewFrame>
  );
}

/* SelectTrigger（h-9 默认 shadcn 高度 36） */
function SelectBox({ width, value, onClick }: { width: number; value: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        height: 36,
        width,
        alignItems: 'center',
        gap: 4,
        padding: '0 10px',
        fontSize: 13,
        borderRadius: 8,
        border: '1px solid #e7e5e0',
        background: '#fff',
        color: '#1c1917',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {value}
      </span>
      <ChevronDown size={14} color="#a8a29e" />
    </button>
  );
}
