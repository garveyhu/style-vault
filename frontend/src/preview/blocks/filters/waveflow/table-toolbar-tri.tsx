import { PreviewFrame } from '../../../_layout';
import { Search, ChevronDown, Plus } from 'lucide-react';

export default function TableToolbarTri() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 1000, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 12, padding: 20, boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <h3 style={{ fontSize: 13.5, fontWeight: 600, color: '#1c1917', margin: 0 }}>任务管理</h3>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <div style={{ position: 'relative' }}>
                <Search size={12} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: '#a8a29e' }} />
                <input style={{ height: 28, paddingLeft: 24, paddingRight: 12, fontSize: 12, border: '1px solid #d6d3d1', borderRadius: 6, width: 180, outline: 'none', boxSizing: 'border-box' }} placeholder="搜索任务" />
              </div>
              {['任务类型', '执行状态', '开关状态'].map(p => (
                <button key={p} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 28, padding: '0 10px', width: 110, background: '#fff', border: '1px solid #d6d3d1', borderRadius: 6, fontSize: 12, color: '#a8a29e', cursor: 'pointer' }}>
                  <span style={{ flex: 1, textAlign: 'left' }}>{p}</span>
                  <ChevronDown size={12} color="#a8a29e" />
                </button>
              ))}
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 11.5, fontWeight: 500, cursor: 'pointer' }}>
                <Plus size={14} /> 添加任务
              </button>
            </div>
          </div>
          <div style={{ height: 240, border: '1px solid rgba(231,229,224,0.6)', borderRadius: 8, background: '#fff' }} />
        </div>
      </div>
    </PreviewFrame>
  );
}
