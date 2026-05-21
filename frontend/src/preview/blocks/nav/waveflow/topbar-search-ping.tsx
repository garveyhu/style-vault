import { PreviewFrame } from '../../../_layout';
import { Search } from 'lucide-react';

export default function TopbarSearchPing() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <style>{`@keyframes wf-ping { 75%,100% { transform: scale(2); opacity: 0 } }`}</style>
      <div style={{ background: '#fafaf7', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <header style={{
          display: 'flex', alignItems: 'center', height: 48, borderBottom: '1px solid rgba(231,229,224,0.7)', padding: '0 24px', gap: 12,
        }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 8, width: 260, height: 28, padding: '0 12px',
            background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 6, cursor: 'pointer',
            fontSize: 12.5, color: '#a8a29e', boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)',
          }}>
            <Search size={14} color="#a8a29e" />
            <span>搜索任务、集合、项目</span>
            <span style={{ marginLeft: 'auto', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#78716c', background: '#fff', border: '1px solid #e7e5e0', padding: '1px 5px', borderRadius: 4, boxShadow: '0 1px 0 #e7e5e0' }}>⌘K</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 4px', color: '#57534e' }}>
            <span style={{ position: 'relative', display: 'inline-flex', width: 6, height: 6 }}>
              <span style={{ position: 'absolute', inset: 0, animation: 'wf-ping 1s infinite', borderRadius: '50%', background: '#34d399', opacity: 0.6 }} />
              <span style={{ position: 'relative', width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
            </span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, fontVariantNumeric: 'tabular-nums' }}>
              <span style={{ fontWeight: 500, color: '#292524' }}>8</span>
              <span style={{ marginLeft: 4, color: '#78716c' }}>在线</span>
            </span>
          </div>
        </header>
        <div style={{ height: 480, background: '#fafaf7' }} />
      </div>
    </PreviewFrame>
  );
}
