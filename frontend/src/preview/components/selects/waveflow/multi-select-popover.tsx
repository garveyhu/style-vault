import { PreviewFrame } from '../../../_layout';
import { ChevronDown, Search, Check } from 'lucide-react';

export default function MultiSelectPopover() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif', color: '#1c1917' }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#78716c' }}>COMPONENT · SELECT</div>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', margin: '8px 0 32px' }}>Multi-Select Popover</h1>

        <div style={{ display: 'flex', alignItems: 'start', gap: 24 }}>
          {/* trigger */}
          <button style={{ ...trig, width: 130, fontSize: 12, color: '#a8a29e' }}>
            <span>所属项目</span>
            <span style={{ marginLeft: 'auto', background: '#f5f4ee', color: '#57534e', padding: '2px 6px', borderRadius: 4, fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, fontVariantNumeric: 'tabular-nums' }}>已选 3</span>
            <ChevronDown size={14} color="#a8a29e" style={{ marginLeft: 4 }} />
          </button>

          {/* popover content */}
          <div style={{ width: 240, background: '#fffefb', border: '1px solid rgba(231,229,224,0.6)', borderRadius: 8, boxShadow: '0 8px 24px rgb(0 0 0 / 8%), 0 2px 8px rgb(0 0 0 / 4%)', padding: 4 }}>
            <div style={{ position: 'relative', padding: 4 }}>
              <Search size={12} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#a8a29e' }} />
              <input style={{ width: '100%', height: 28, paddingLeft: 24, fontSize: 12, border: '1px solid #d6d3d1', borderRadius: 4, boxSizing: 'border-box' }} placeholder="搜索项目" defaultValue="" />
            </div>
            {['浙有善育', '河南数据中心', '财务对账', '物联网采集'].map((opt, i) => (
              <div key={opt} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 4, fontSize: 12.5, color: '#44403c', cursor: 'pointer', background: i < 3 ? 'transparent' : '#f5f4ee' }}>
                <span style={{ width: 14, height: 14, border: '1px solid #d6d3d1', borderRadius: 3, background: i < 3 ? '#2563eb' : '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  {i < 3 && <Check size={10} color="#fff" />}
                </span>
                {opt}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

const trig: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 12px',
  background: '#fff', border: '1px solid #d6d3d1', borderRadius: 6, fontSize: 13, color: '#1c1917', cursor: 'pointer',
};
