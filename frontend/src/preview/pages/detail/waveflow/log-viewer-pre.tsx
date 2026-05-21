import { PreviewFrame } from '../../../_layout';
import { RefreshCw } from 'lucide-react';

const LOG = `[2026-05-21 14:32:01.205] INFO  XxlJobThread - <br>----------- xxl-job job execute start -----------<br>----------- Param: {"date":"2026-05-21","mode":"full"}
[2026-05-21 14:32:01.451] INFO  ReaderHelper - reader [mysql] @ 192.168.1.10:3306/orders connected
[2026-05-21 14:32:01.892] INFO  WriterHelper - writer [pg] @ 192.168.1.20:5432/dwh connected
[2026-05-21 14:32:01.901] INFO  ChannelProcessor - channel=3, byte=1048576, record=10000
[2026-05-21 14:32:02.144] DEBUG ReaderHelper - fetched 1024 rows in 240ms (offset=0)
[2026-05-21 14:32:02.361] DEBUG ReaderHelper - fetched 1024 rows in 218ms (offset=1024)
[2026-05-21 14:32:02.577] DEBUG ReaderHelper - fetched 1024 rows in 216ms (offset=2048)
[2026-05-21 14:32:02.793] DEBUG ReaderHelper - fetched 1024 rows in 215ms (offset=3072)
[2026-05-21 14:32:03.018] DEBUG WriterHelper - upserted 4096 rows in 225ms
[2026-05-21 14:32:03.024] INFO  ChannelProcessor - total processed: 4096 rows
[2026-05-21 14:32:04.108] INFO  XxlJobThread - <br>----------- xxl-job job execute end (finish) -----------<br>----------- ReturnT:ReturnT [code=200, msg=null, content=null]`;

export default function LogViewerPre() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      <div style={{ padding: '16px 24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <section style={{ background: '#fffefb', border: '1px solid rgba(231,229,224,0.4)', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)' }}>
          <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid #f5f4ee', background: 'rgba(244,243,238,0.4)' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#292524' }}>
              日志详情 <span style={{ marginLeft: 8, fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: '#78716c', fontVariantNumeric: 'tabular-nums' }}>#100201</span>
            </div>
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 11.5, fontWeight: 500, cursor: 'pointer' }}>
              <RefreshCw size={14} /> 刷新日志
            </button>
          </header>
          <pre style={{ margin: 0, height: 440, overflow: 'auto', background: '#f5f5f4', padding: '8px 12px', fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, lineHeight: 1.6, color: '#44403c', whiteSpace: 'pre-wrap' }}>{LOG}</pre>
        </section>
      </div>
    </PreviewFrame>
  );
}
