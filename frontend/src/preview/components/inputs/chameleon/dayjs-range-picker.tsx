import { PreviewFrame } from '../../../_layout';
import { Calendar, X, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const SHADOW_POP = '0 8px 24px rgb(0 0 0 / 8%), 0 2px 8px rgb(0 0 0 / 4%)';
const PAPER = '#fffefb';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日'];

// 固定演示：2026 年 6 月，区间 9 ~ 16（周一首列）
// 6/1 是周一 → leading 0；上月 trailing 无（演示用 6 月 1 日为周一对齐）
const FIRST_WEEKDAY = 1; // 6/1 视为周一
function buildDays() {
  const leading = (FIRST_WEEKDAY + 6) % 7; // = 0
  const cells: { day: number; out: boolean }[] = [];
  for (let i = 0; i < leading; i++) cells.push({ day: 31 - (leading - 1 - i), out: true }); // 上月尾
  for (let d = 1; d <= 30; d++) cells.push({ day: d, out: false });
  let tail = 1;
  while (cells.length < 42) cells.push({ day: tail++, out: true });
  return cells;
}
const DAYS = buildDays();
const RANGE_START = 9;
const RANGE_END = 16;
const TODAY = 13;

function MonthCalendar() {
  return (
    <div>
      <div style={{ marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
        <button style={navBtn}><ChevronLeft size={14} strokeWidth={2} /></button>
        <span style={{ fontSize: 12.5, fontWeight: 500, color: '#44403c' }}>2026 年 6 月</span>
        <button style={navBtn}><ChevronRight size={14} strokeWidth={2} /></button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: 2 }}>
        {WEEKDAYS.map(w => (
          <div key={w} style={{ padding: '4px 0', textAlign: 'center', fontSize: 10.5, color: '#a8a29e' }}>{w}</div>
        ))}
        {DAYS.map((c, i) => {
          const sel = !c.out && (c.day === RANGE_START || c.day === RANGE_END);
          const inRange = !c.out && c.day > RANGE_START && c.day < RANGE_END;
          const today = !c.out && c.day === TODAY;
          const style: React.CSSProperties = {
            margin: '0 auto',
            display: 'flex',
            height: 28,
            width: 28,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 6,
            fontSize: 12,
            border: 'none',
            cursor: 'pointer',
            background: 'transparent',
            color: c.out ? '#d6d3d1' : '#44403c',
          };
          if (inRange) { style.background = '#eff6ff'; style.color = '#1d4ed8'; }
          if (sel) { style.background = '#2563eb'; style.color = '#fff'; style.fontWeight = 500; }
          if (today && !sel) { style.fontWeight = 600; style.color = '#2563eb'; }
          return <button key={i} style={style}>{c.day}</button>;
        })}
      </div>
    </div>
  );
}

export default function DayjsRangePicker() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 760, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · INPUT</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>dayjs 月历区间选择器</h1>

        <Section title="Trigger — 窄版 (sm h-7) / 侧栏版 (h-7 + ChevronDown)">
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            {/* 窄版 trigger */}
            <button style={{ display: 'flex', alignItems: 'center', gap: 8, width: 200, height: 28, borderRadius: 6, border: '1px solid #d6d3d1', background: '#fff', padding: '0 10px', fontSize: 12, cursor: 'pointer' }}>
              <Calendar size={14} strokeWidth={2} style={{ flexShrink: 0, color: '#a8a29e' }} />
              <span style={{ flex: 1, textAlign: 'left', fontFamily: MONO, fontVariantNumeric: 'tabular-nums', color: '#292524', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>06-09 ~ 06-16</span>
              <span style={{ borderRadius: 4, padding: 2, color: '#a8a29e', lineHeight: 0 }}><X size={12} strokeWidth={2} /></span>
            </button>
            {/* 侧栏版 trigger */}
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 28, borderRadius: 6, border: '1px solid #e7e5e0', background: PAPER, padding: '0 10px', fontSize: 12, color: '#44403c', cursor: 'pointer' }}>
              <Calendar size={14} strokeWidth={1.75} style={{ color: '#a8a29e' }} />
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>2026-06-09 ~ 2026-06-16</span>
              <ChevronDown size={12} strokeWidth={2} style={{ color: '#a8a29e' }} />
            </button>
          </div>
        </Section>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <Section title="窄版 popover (280px + 底部横排预设)">
            <div style={{ width: 280, borderRadius: 8, border: '1px solid #e7e5e0', background: PAPER, padding: 12, boxShadow: SHADOW_POP }}>
              <MonthCalendar />
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f5f5f4', paddingTop: 8 }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  {['今天', '近 7 天', '近 30 天'].map(p => (
                    <button key={p} style={{ borderRadius: 4, border: '1px solid #e7e5e0', padding: '2px 6px', fontSize: 11, color: '#57534e', background: '#fff', cursor: 'pointer' }}>{p}</button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <SmBtn>清空</SmBtn>
                  <SmBtn primary>应用</SmBtn>
                </div>
              </div>
              <div style={{ marginTop: 6, textAlign: 'center', fontFamily: MONO, fontSize: 11, color: '#78716c' }}>06-09 ~ 06-16</div>
            </div>
          </Section>

          <Section title="侧栏版 popover (左 96px 预设 + 右月历)">
            <div style={{ display: 'flex', borderRadius: 8, border: '1px solid #e7e5e0', background: PAPER, boxShadow: SHADOW_POP, overflow: 'hidden' }}>
              <ul style={{ width: 96, flexShrink: 0, listStyle: 'none', margin: 0, borderRight: '1px solid #f5f5f4', padding: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {['今天', '昨天', '近 7 天', '近 30 天', '本月', '上月'].map(p => (
                  <li key={p}>
                    <button style={{ width: '100%', borderRadius: 6, padding: '6px 8px', textAlign: 'left', fontSize: 12, color: '#57534e', background: 'transparent', border: 'none', cursor: 'pointer' }}>{p}</button>
                  </li>
                ))}
              </ul>
              <div style={{ padding: 12 }}>
                <MonthCalendar />
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f5f5f4', paddingTop: 8 }}>
                  <span style={{ fontFamily: MONO, fontSize: 11, color: '#78716c' }}>06-09 ~ 06-16</span>
                  <SmBtn primary>应用</SmBtn>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </PreviewFrame>
  );
}

const navBtn: React.CSSProperties = { borderRadius: 4, padding: 4, color: '#a8a29e', background: 'transparent', border: 'none', cursor: 'pointer', lineHeight: 0 };

function SmBtn({ children, primary }: { children: React.ReactNode; primary?: boolean }) {
  return (
    <button style={{ height: 28, padding: '0 10px', borderRadius: 6, fontSize: 11.5, fontWeight: 500, background: primary ? '#2563eb' : 'transparent', color: primary ? '#fff' : '#44403c', border: `1px solid ${primary ? 'transparent' : 'transparent'}`, cursor: 'pointer' }}>{children}</button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c', marginBottom: 12 }}>{title}</div>
      {children}
    </div>
  );
}
