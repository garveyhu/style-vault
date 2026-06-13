import { PreviewFrame } from '../../../_layout';
import { Calendar, X, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const SHADOW_POP = '0 8px 24px rgb(0 0 0 / 8%), 0 2px 8px rgb(0 0 0 / 4%)';
const PAPER = '#fffefb';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日'];
const STONE_200 = '#e7e5e4';

// 固定演示：2026 年 6 月，区间 9 ~ 16（周一首列）。6/1 视为周一对齐。
const FIRST_WEEKDAY = 1;
function buildDays() {
  const leading = (FIRST_WEEKDAY + 6) % 7; // = 0
  const cells: { day: number; out: boolean }[] = [];
  for (let i = 0; i < leading; i++) cells.push({ day: 31 - (leading - 1 - i), out: true });
  for (let d = 1; d <= 30; d++) cells.push({ day: d, out: false });
  let tail = 1;
  while (cells.length < 42) cells.push({ day: tail++, out: true });
  return cells;
}
const DAYS = buildDays();
const RANGE_START = 9;
const RANGE_END = 16;
const TODAY = 13;
const HOVER_DAY = 22; // 演示日格 hover:bg-stone-100

function MonthCalendar() {
  return (
    <div>
      {/* mb-1.5(6) px-1(4)；翻月按钮 rounded(4) p-1(4) text-stone-400 hover:bg-stone-100 hover:text-stone-700 */}
      <div style={{ marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
        <button style={navBtn}><ChevronLeft size={14} strokeWidth={2} /></button>
        <span style={{ fontSize: 12.5, fontWeight: 500, color: '#44403c' }}>2026 年 6 月</span>
        {/* 右翻月 hover 态：bg-stone-100 text-stone-700 */}
        <button style={navBtnHover}><ChevronRight size={14} strokeWidth={2} /></button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: 2 }}>
        {WEEKDAYS.map(w => (
          <div key={w} style={{ padding: '4px 0', textAlign: 'center', fontSize: 10.5, color: '#a8a29e' }}>{w}</div>
        ))}
        {DAYS.map((c, i) => {
          const sel = !c.out && (c.day === RANGE_START || c.day === RANGE_END);
          const inRange = !c.out && c.day > RANGE_START && c.day < RANGE_END;
          const today = !c.out && c.day === TODAY;
          const hovered = !c.out && !sel && !inRange && c.day === HOVER_DAY;
          // h-7 w-7(28) rounded-md(6) text-[12px]；out=text-stone-300(#d6d3d1)，否则 text-stone-700(#44403c)
          const style: React.CSSProperties = {
            margin: '0 auto', display: 'flex', height: 28, width: 28,
            alignItems: 'center', justifyContent: 'center', borderRadius: 6,
            fontSize: 12, border: 'none', cursor: 'pointer', background: 'transparent',
            color: c.out ? '#d6d3d1' : '#44403c',
          };
          // class 顺序：range → sel → (!sel&&!range hover) → today；today 颜色覆盖 range
          if (inRange) { style.background = '#eff6ff'; style.color = '#1d4ed8'; } // bg-blue-50 text-blue-700
          if (sel) { style.background = '#2563eb'; style.color = '#fff'; style.fontWeight = 500; } // bg-blue-600 text-white
          if (hovered) { style.background = '#f5f5f4'; } // hover:bg-stone-100
          if (today && !sel) { style.fontWeight = 600; style.color = '#2563eb'; } // font-semibold text-blue-600（叠在 inRange 上）
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

        <Section title="窄版 trigger 三态 — 静态 / hover / focus">
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            {/* 静态：border-stone-300(#d6d3d1) */}
            <NarrowTrigger />
            {/* hover:border-stone-400(#a8a29e) */}
            <NarrowTrigger borderColor="#a8a29e" tag="hover" />
            {/* focus:border-blue-500(#3b82f6) + focus:ring-2 focus:ring-blue-100(#dbeafe) */}
            <NarrowTrigger borderColor="#3b82f6" ring tag="focus" />
          </div>
        </Section>

        <Section title="侧栏版 trigger (h-7 + ChevronDown · border-stone-200)">
          {/* CalIcon strokeWidth=1.75；border-stone-200=#e7e5e4 */}
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 28, borderRadius: 6, border: `1px solid ${STONE_200}`, background: PAPER, padding: '0 10px', fontSize: 12, color: '#44403c', cursor: 'pointer' }}>
            <Calendar size={14} strokeWidth={1.75} style={{ color: '#a8a29e' }} />
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>2026-06-09 ~ 2026-06-16</span>
            <ChevronDown size={12} strokeWidth={2} style={{ color: '#a8a29e' }} />
          </button>
        </Section>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <Section title="窄版 popover (280px + 底部横排预设)">
            <div style={{ width: 280, borderRadius: 8, border: `1px solid ${STONE_200}`, background: PAPER, padding: 12, boxShadow: SHADOW_POP }}>
              <MonthCalendar />
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f5f5f4', paddingTop: 8 }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  {/* 预设小按钮 border-stone-200(#e7e5e4) text-stone-600；末项画 hover:border-stone-400 hover:text-stone-900 */}
                  <PresetChip>今天</PresetChip>
                  <PresetChip>近 7 天</PresetChip>
                  <PresetChip hover>近 30 天</PresetChip>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <SmBtn>清空</SmBtn>
                  <SmBtn primary>应用</SmBtn>
                </div>
              </div>
              {/* 已选回显：font-mono text-[11px] text-stone-500 */}
              <div style={{ marginTop: 6, textAlign: 'center', fontFamily: MONO, fontSize: 11, color: '#78716c' }}>06-09 ~ 06-16</div>
            </div>
          </Section>

          <Section title="窄版 popover 占位态 (未选 — 非 mono)">
            <div style={{ width: 280, borderRadius: 8, border: `1px solid ${STONE_200}`, background: PAPER, padding: 12, boxShadow: SHADOW_POP }}>
              <MonthCalendarEmpty />
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f5f5f4', paddingTop: 8 }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  <PresetChip>今天</PresetChip>
                  <PresetChip>近 7 天</PresetChip>
                  <PresetChip>近 30 天</PresetChip>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <SmBtn>清空</SmBtn>
                  <SmBtn primary disabled>应用</SmBtn>
                </div>
              </div>
              {/* 占位回显：text-[11px] text-stone-400(#a8a29e)，非 mono */}
              <div style={{ marginTop: 6, textAlign: 'center', fontSize: 11, color: '#a8a29e' }}>点选起止日期</div>
            </div>
          </Section>

          <Section title="侧栏版 popover (左 96px 预设 + 右月历)">
            <div style={{ display: 'flex', borderRadius: 8, border: `1px solid ${STONE_200}`, background: PAPER, boxShadow: SHADOW_POP, overflow: 'hidden' }}>
              <ul style={{ width: 96, flexShrink: 0, listStyle: 'none', margin: 0, borderRight: '1px solid #f5f5f4', padding: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* 预设项 text-stone-600 hover:bg-stone-100 hover:text-stone-900；演示「本月」hover 态 */}
                {['今天', '昨天', '近 7 天', '近 30 天', '本月', '上月'].map(p => {
                  const hov = p === '本月';
                  return (
                    <li key={p}>
                      <button style={{ width: '100%', borderRadius: 6, padding: '6px 8px', textAlign: 'left', fontSize: 12, color: hov ? '#1c1917' : '#57534e', background: hov ? '#f5f5f4' : 'transparent', border: 'none', cursor: 'pointer' }}>{p}</button>
                    </li>
                  );
                })}
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

// 窄版 trigger：gap-2(8) w-200 h-7(28) rounded-md(6) bg-white px-2.5(10) text-[12px]
function NarrowTrigger({ borderColor = '#d6d3d1', ring, tag }: { borderColor?: string; ring?: boolean; tag?: string }) {
  return (
    <div style={{ position: 'relative' }}>
      <button style={{ display: 'flex', alignItems: 'center', gap: 8, width: 200, height: 28, borderRadius: 6, border: `1px solid ${borderColor}`, background: '#fff', padding: '0 10px', fontSize: 12, cursor: 'pointer', boxShadow: ring ? '0 0 0 2px #dbeafe' : undefined }}>
        {/* CalIcon h-3.5 w-3.5(14) text-stone-400，strokeWidth 默认 2 */}
        <Calendar size={14} strokeWidth={2} style={{ flexShrink: 0, color: '#a8a29e' }} />
        {/* 已选 text-stone-800(#292524) font-mono；清空 X span rounded(4) p-0.5(2) text-stone-400 hover:bg-stone-100 hover:text-stone-700 */}
        <span style={{ flex: 1, textAlign: 'left', fontFamily: MONO, fontVariantNumeric: 'tabular-nums', color: '#292524', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>06-09 ~ 06-16</span>
        <span style={{ borderRadius: 4, padding: 2, color: '#a8a29e', lineHeight: 0 }}><X size={12} strokeWidth={2} /></span>
      </button>
      {tag && <span style={{ position: 'absolute', top: -7, right: 4, fontSize: 8.5, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#a8a29e' }}>{tag}</span>}
    </div>
  );
}

const navBtn: React.CSSProperties = { borderRadius: 4, padding: 4, color: '#a8a29e', background: 'transparent', border: 'none', cursor: 'pointer', lineHeight: 0 };
// 翻月按钮 hover：bg-stone-100(#f5f5f4) text-stone-700(#44403c)
const navBtnHover: React.CSSProperties = { borderRadius: 4, padding: 4, color: '#44403c', background: '#f5f5f4', border: 'none', cursor: 'pointer', lineHeight: 0 };

// 预设小按钮 rounded(4) border-stone-200 px-1.5(6) py-0.5(2) text-[11px] text-stone-600
function PresetChip({ children, hover }: { children: React.ReactNode; hover?: boolean }) {
  return (
    <button style={{ borderRadius: 4, border: `1px solid ${hover ? '#a8a29e' : STONE_200}`, padding: '2px 6px', fontSize: 11, color: hover ? '#1c1917' : '#57534e', background: '#fff', cursor: 'pointer' }}>{children}</button>
  );
}

function SmBtn({ children, primary, disabled }: { children: React.ReactNode; primary?: boolean; disabled?: boolean }) {
  return (
    <button disabled={disabled} style={{ height: 28, padding: '0 10px', borderRadius: 6, fontSize: 11.5, fontWeight: 500, background: primary ? '#2563eb' : 'transparent', color: primary ? '#fff' : '#44403c', border: '1px solid transparent', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>{children}</button>
  );
}

// 占位态月历（无选区，演示 hover:bg-stone-100 单格）
function MonthCalendarEmpty() {
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
          const today = !c.out && c.day === TODAY;
          const hovered = !c.out && c.day === HOVER_DAY;
          const style: React.CSSProperties = {
            margin: '0 auto', display: 'flex', height: 28, width: 28,
            alignItems: 'center', justifyContent: 'center', borderRadius: 6,
            fontSize: 12, border: 'none', cursor: 'pointer', background: 'transparent',
            color: c.out ? '#d6d3d1' : '#44403c',
          };
          if (hovered) style.background = '#f5f5f4';
          if (today) { style.fontWeight = 600; style.color = '#2563eb'; }
          return <button key={i} style={style}>{c.day}</button>;
        })}
      </div>
    </div>
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
