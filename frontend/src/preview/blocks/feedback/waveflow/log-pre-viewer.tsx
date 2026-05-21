import { PreviewFrame } from '../../../_layout';
import { RefreshCw } from 'lucide-react';

const LOG = `[2026-05-21 14:32:01] INFO  starting job #1234 financial-reconciliation
[2026-05-21 14:32:01] INFO  reader: mysql @ 192.168.1.10:3306/orders
[2026-05-21 14:32:02] INFO  writer: pg @ 192.168.1.20:5432/dwh
[2026-05-21 14:32:02] INFO  channels=3, byte=1048576, record=10000
[2026-05-21 14:32:02] DEBUG fetched 1024 rows in 240ms
[2026-05-21 14:32:03] DEBUG fetched 1024 rows in 218ms
[2026-05-21 14:32:03] INFO  total processed: 8192 rows
[2026-05-21 14:32:04] INFO  job #1234 completed in 3.2s`;

export default function LogPreViewer() {
  return (
    <PreviewFrame bg="#fafaf7">
      <div style={{ maxWidth: 900, margin: '0 auto', background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 12, boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)', overflow: 'hidden', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid #f5f4ee', background: 'rgba(244,243,238,0.4)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#292524' }}>
            日志详情 <span style={{ marginLeft: 8, fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: '#78716c', fontVariantNumeric: 'tabular-nums' }}>#1234</span>
          </div>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 11.5, fontWeight: 500, cursor: 'pointer' }}>
            <RefreshCw size={14} /> 刷新日志
          </button>
        </header>
        <pre style={{ margin: 0, height: 320, overflow: 'auto', background: '#f5f5f4', padding: '8px 12px', fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, lineHeight: 1.6, color: '#44403c' }}>{LOG}</pre>
      </div>
    </PreviewFrame>
  );
}
