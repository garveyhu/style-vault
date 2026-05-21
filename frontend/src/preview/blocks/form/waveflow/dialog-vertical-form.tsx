import { PreviewFrame } from '../../../_layout';
import { X } from 'lucide-react';

export default function DialogVerticalForm() {
  return (
    <PreviewFrame bg="rgba(28,25,23,0.4)">
      <div style={{ maxWidth: 480, margin: '0 auto', background: '#fffefb', border: '1px solid rgba(231,229,224,0.6)', borderRadius: 16, boxShadow: '0 8px 24px rgb(0 0 0 / 8%), 0 2px 8px rgb(0 0 0 / 4%)', overflow: 'hidden', fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid #f5f4ee' }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', color: '#1c1917', margin: 0 }}>添加项目</h3>
          <button style={{ background: 'transparent', border: 'none', padding: 4, color: '#a8a29e', cursor: 'pointer' }}><X size={16} /></button>
        </div>

        {/* Body */}
        <div style={{ padding: '16px 20px' }}>
          <div style={{ marginBottom: 14 }}>
            <Label required>项目名称</Label>
            <input style={inp} defaultValue="浙有善育" autoFocus />
          </div>
          <div>
            <Label required>项目描述</Label>
            <textarea style={{ ...inp, height: 64, padding: 8, resize: 'vertical' }} defaultValue="数据中台业务接入" rows={3} />
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, borderTop: '1px solid #f5f4ee', background: 'rgba(244,243,238,0.4)', padding: '12px 20px' }}>
          <button style={{ ...btn, background: 'transparent', color: '#44403c' }}>取消</button>
          <button style={{ ...btn, background: '#2563eb', color: '#fff' }}>创建</button>
        </div>
      </div>
    </PreviewFrame>
  );
}

const inp: React.CSSProperties = {
  width: '100%', height: 32, padding: '0 12px', fontSize: 13, color: '#1c1917', background: '#fff',
  border: '1px solid #d6d3d1', borderRadius: 6, outline: 'none', boxSizing: 'border-box',
};
const btn: React.CSSProperties = {
  height: 32, padding: '0 12px', borderRadius: 6, fontSize: 12.5, fontWeight: 500, border: 'none', cursor: 'pointer',
};

function Label({ required, children }: any) {
  return <div style={{ fontSize: 12, fontWeight: 500, color: '#44403c', marginBottom: 6 }}>{children}{required && <span style={{ color: '#dc2626', marginLeft: 2 }}>*</span>}</div>;
}
