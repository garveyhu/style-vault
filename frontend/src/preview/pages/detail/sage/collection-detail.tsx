import { Button, ConfigProvider, Table, Tooltip } from 'antd';
import { ArrowLeft, Bot, Crown, Download, Eye, History, PanelLeftOpen, Play, Star } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const HEX = '#10b981';
const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

const LOGS = [
  { id: 1, t: '2026-04-27 14:32:18', status: 'success', dur: '1.42s', rows: '10 行 × 5 列' },
  { id: 2, t: '2026-04-25 11:08:02', status: 'success', dur: '1.85s', rows: '10 行 × 5 列' },
  { id: 3, t: '2026-04-22 09:15:46', status: 'failed', dur: '0.30s', rows: '失败' },
  { id: 4, t: '2026-04-20 16:42:11', status: 'success', dur: '1.58s', rows: '10 行 × 5 列' },
  { id: 5, t: '2026-04-18 10:00:00', status: 'success', dur: '1.93s', rows: '10 行 × 5 列' },
];

export default function CollectionDetailPage() {
  return (
    <PreviewFrame bg="#fff" padded={false}>
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: HEX, borderRadius: 8 } }}>
        <div style={{ minHeight: 720, display: 'flex', flexDirection: 'column', background: '#fff', fontFamily: SAGE_FONT }}>
          {/* Header */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: 16, borderBottom: '1px solid #e2e8f0',
            position: 'relative',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Button type="text" icon={<PanelLeftOpen size={16} color="#64748b" />} />
              <Button type="text" icon={<ArrowLeft size={16} />} style={{ height: 40, width: 40 }} />
            </div>
            <div style={{
              position: 'absolute', left: '50%', transform: 'translateX(-50%)',
              fontSize: 14, fontWeight: 600, color: '#475569',
            }}>本月销售 Top 10</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button type="primary" icon={<Play size={14} />}>重新执行</Button>
              <Button icon={<Star size={14} fill={HEX} color={HEX} />} style={{ color: HEX }}>已收藏</Button>
            </div>
          </div>

          {/* Main */}
          <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
            <div style={{ maxWidth: 896, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* User bubble */}
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{
                  background: 'rgb(246,246,246)', color: '#0f172a',
                  padding: '12px 20px', borderRadius: 24,
                  fontSize: 14, lineHeight: 1.6,
                  maxWidth: '90%',
                }}>
                  查询本月销售额前 10 的产品，按线下、线上、海外渠道分别统计
                </div>
                <span style={{
                  position: 'absolute', right: -48, top: 6,
                  width: 32, height: 32, borderRadius: '50%',
                  background: '#fff', border: '1px solid #e2e8f0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: HEX,
                }}><Crown size={16} /></span>
              </div>

              {/* AI bubble */}
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute', left: -48, top: 4,
                  width: 32, height: 32, borderRadius: '50%',
                  background: '#fff', border: '1px solid #e2e8f0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: HEX,
                }}><Bot size={16} /></span>
                <div style={{
                  padding: '12px 16px',
                  background: '#fafafa',
                  border: `1px solid ${HEX}40`,
                  borderRadius: 8,
                  fontSize: 14, color: '#404040',
                }}>
                  按销售订单聚合，统计每个产品在线下、线上、海外三个渠道的销售额，按总销售额降序给出 Top 10。
                </div>
                {/* 简化的表格 */}
                <div style={{ marginTop: 12, border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
                  <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'rgba(248,250,252,0.75)' }}>
                        {['排名', '产品', '销量', '销售额', '环比'].map(c => (
                          <th key={c} style={{ padding: '10px 16px', fontSize: 11, color: '#4b5563', textAlign: 'center', textTransform: 'uppercase' }}>{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['1', 'Aeron 椅', '624', '¥1,872,000', '+12.4%'],
                        ['2', 'Kindle PW', '982', '¥588,000', '+8.1%'],
                        ['3', '小米空气', '412', '¥412,000', '+15.2%'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderTop: '1px solid #f3f4f6' }}>
                          {r.map((v, j) => (
                            <td key={j} style={{
                              padding: '10px 16px', textAlign: 'center', color: '#4b5563',
                              fontFamily: j === 1 ? SAGE_FONT : 'ui-monospace, SFMono-Regular, monospace',
                            }}>{v}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 执行历史 */}
              <div style={{
                background: '#fff', padding: 24,
                borderRadius: 12, border: '1px solid #e2e8f0',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <History size={16} color="#64748b" />
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>执行历史</span>
                </div>
                <Table
                  size="small"
                  dataSource={LOGS}
                  rowKey="id"
                  pagination={false}
                  columns={[
                    { title: '执行时间', dataIndex: 't', render: t => <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: 12, color: '#64748b' }}>{t}</span> },
                    {
                      title: '状态', dataIndex: 'status', width: 90,
                      render: s => (
                        <span style={{
                          padding: '2px 8px', borderRadius: 4, fontSize: 12,
                          background: s === 'success' ? '#dcfce7' : '#fee2e2',
                          color: s === 'success' ? '#15803d' : '#b91c1c',
                        }}>{s === 'success' ? '成功' : '失败'}</span>
                      ),
                    },
                    { title: '耗时', dataIndex: 'dur', width: 80, render: d => <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>{d}</span> },
                    { title: '结果', dataIndex: 'rows', render: r => <span style={{ color: '#64748b' }}>{r}</span> },
                    {
                      title: '操作', key: 'op', width: 100, align: 'center',
                      render: () => (
                        <div style={{ display: 'inline-flex', gap: 4 }}>
                          <Tooltip title="预览"><Button size="small" type="text" icon={<Eye size={14} />} /></Tooltip>
                          <Tooltip title="导出"><Button size="small" type="text" icon={<Download size={14} />} /></Tooltip>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </ConfigProvider>
    </PreviewFrame>
  );
}
