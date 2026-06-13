import { useLayoutEffect, useRef, useState } from 'react';
import { PreviewFrame } from '../../../_layout';

export default function SlidingThumbSegmented() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 640, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · TOGGLE</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 24px' }}>Sliding-Thumb Segmented</h1>

        <Row label="size md · 三选一">
          <Segmented size="md" options={['卡片', '表格', '看板']} initial={0} />
        </Row>
        <Row label="size sm · 二选一">
          <Segmented size="sm" options={['启用', '停用']} initial={0} />
        </Row>
        <Row label="size md · 不等宽">
          <Segmented size="md" options={['全部', '我的应用', '团队共享']} initial={1} />
        </Row>

        <div style={{ fontSize: 12, color: '#a8a29e', marginTop: 24 }}>
          点选项看 thumb 弹性滑动 · duration-300 ease cubic-bezier(.34,1.4,.5,1) · ResizeObserver 实测定位 · active text-primary-700
        </div>
      </div>
    </PreviewFrame>
  );
}

function Segmented({ size, options, initial }: { size: 'sm' | 'md'; options: string[]; initial: number }) {
  const [value, setValue] = useState(initial);
  const listRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [thumb, setThumb] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const list = listRef.current;
      const el = btnRefs.current[value];
      if (!list || !el) return;
      const lr = list.getBoundingClientRect();
      const br = el.getBoundingClientRect();
      setThumb({ x: br.left - lr.left - 1, y: br.top - lr.top - 1, w: br.width, h: br.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (listRef.current) ro.observe(listRef.current);
    return () => ro.disconnect();
  }, [value, options]);

  const pad = size === 'sm' ? '4px 12px' : '6px 14px';
  const fs = size === 'sm' ? 12 : 12.5;

  return (
    <div
      ref={listRef}
      role="tablist"
      style={{
        position: 'relative', display: 'flex', width: 'fit-content', alignItems: 'center', gap: 2,
        borderRadius: 8, border: '1px solid #e7e5e4', background: 'rgba(245,245,244,0.7)', padding: 2,
      }}
    >
      {thumb && (
        <span
          aria-hidden
          style={{
            pointerEvents: 'none', position: 'absolute', left: 0, top: 0, zIndex: 0,
            borderRadius: 6, background: '#fffefb', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 5%)',
            transition: 'transform 300ms cubic-bezier(.34,1.4,.5,1), width 300ms cubic-bezier(.34,1.4,.5,1), height 300ms cubic-bezier(.34,1.4,.5,1)',
            transform: `translate(${thumb.x}px, ${thumb.y}px)`, width: thumb.w, height: thumb.h,
          }}
        />
      )}
      {options.map((opt, i) => {
        const active = i === value;
        return (
          <button
            key={opt}
            ref={el => { btnRefs.current[i] = el; }}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => setValue(i)}
            style={{
              position: 'relative', zIndex: 10, borderRadius: 6, border: 'none', background: 'transparent',
              fontWeight: 500, cursor: 'pointer', padding: pad, fontSize: fs,
              transition: 'color 200ms', color: active ? '#1d4ed8' : '#78716c',
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #f5f4ee' }}>
      <span style={{ fontSize: 13, color: '#44403c' }}>{label}</span>
      {children}
    </div>
  );
}
