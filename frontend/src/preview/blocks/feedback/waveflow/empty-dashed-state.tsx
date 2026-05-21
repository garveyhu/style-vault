import { PreviewFrame } from '../../../_layout';
import { ListChecks } from 'lucide-react';

export default function EmptyDashedState() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 480, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{
          background: '#fffefb', border: '2px dashed #e7e5e0', borderRadius: 8,
          padding: '40px 24px', textAlign: 'center',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%', background: '#f5f4ee', color: '#a8a29e',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
          }}>
            <ListChecks size={20} />
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#44403c' }}>请选择一个任务集</div>
          <div style={{ fontSize: 12, color: '#78716c', marginTop: 4, marginBottom: 16 }}>左侧选中后查看详情，或新建一个</div>
          <button style={{ height: 28, padding: '0 10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 11.5, fontWeight: 500, cursor: 'pointer' }}>+ 新建任务集</button>
        </div>
      </div>
    </PreviewFrame>
  );
}
