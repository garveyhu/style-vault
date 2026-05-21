import { PreviewFrame } from '../../../_layout';
import { MoreHorizontal, Pencil, List, Square, Trash2 } from 'lucide-react';

export default function ActionDropdownMore() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 320, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <button style={{ background: '#f5f4ee', border: 'none', borderRadius: 4, padding: 4, cursor: 'pointer', marginRight: 0, marginBottom: 8 }}>
          <MoreHorizontal size={14} color="#78716c" />
        </button>
        <div style={{ minWidth: 160, background: '#fffefb', border: '1px solid rgba(231,229,224,0.6)', borderRadius: 8, boxShadow: '0 8px 24px rgb(0 0 0 / 8%), 0 2px 8px rgb(0 0 0 / 4%)', padding: 4 }}>
          <Item icon={<Pencil size={12} color="#78716c" />} label="编辑任务" />
          <Item icon={<List size={12} color="#78716c" />} label="日志列表" />
          <Item icon={<Square size={12} color="#dc2626" />} label="终止任务" danger />
          <div style={{ margin: '4px 0', height: 1, background: '#f5f4ee' }} />
          <Item icon={<Trash2 size={12} color="#dc2626" />} label="删除任务" danger />
        </div>
      </div>
    </PreviewFrame>
  );
}

function Item({ icon, label, danger }: any) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 4, fontSize: 12.5, color: danger ? '#dc2626' : '#44403c', cursor: 'pointer' }}>
      {icon}{label}
    </div>
  );
}
