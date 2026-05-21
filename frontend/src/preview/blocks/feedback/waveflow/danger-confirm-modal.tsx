import { PreviewFrame } from '../../../_layout';
import { AlertTriangle, X } from 'lucide-react';

export default function DangerConfirmModal() {
  return (
    <PreviewFrame bg="rgba(28,25,23,0.4)">
      <div style={{ maxWidth: 440, margin: '0 auto', background: '#fffefb', border: '1px solid rgba(231,229,224,0.6)', borderRadius: 16, boxShadow: '0 8px 24px rgb(0 0 0 / 8%)', overflow: 'hidden', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid #f5f4ee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#fef2f2', color: '#dc2626', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={16} />
            </span>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1c1917', margin: 0 }}>确认删除</h3>
          </div>
          <button style={{ background: 'transparent', border: 'none', color: '#a8a29e', cursor: 'pointer', padding: 4 }}><X size={16} /></button>
        </div>
        <div style={{ padding: '16px 20px', fontSize: 13, color: '#57534e' }}>
          将删除任务 <span style={{ fontWeight: 500, color: '#1c1917' }}>「财务对账」</span>，此操作不可恢复，确认继续？
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, borderTop: '1px solid #f5f4ee', background: 'rgba(244,243,238,0.4)', padding: '12px 20px' }}>
          <button style={{ height: 32, padding: '0 12px', background: 'transparent', color: '#44403c', border: 'none', borderRadius: 6, fontSize: 12.5, cursor: 'pointer' }}>取消</button>
          <button style={{ height: 32, padding: '0 12px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: 6, fontSize: 12.5, fontWeight: 500, cursor: 'pointer' }}>删除</button>
        </div>
      </div>
    </PreviewFrame>
  );
}
