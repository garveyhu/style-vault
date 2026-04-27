import { useState } from 'react';
import { Button, Checkbox, ConfigProvider, Tooltip } from 'antd';
import { PanelLeftOpen, Pencil, Star, Trash2 } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const HEX = '#10b981';
const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

const ITEMS = [
  { id: '1', session: '本月销售 Top 10', q: '查询本月销售额前 10 的产品，按线下/线上/海外渠道分别统计', t: '2 小时前 · 10 行', cols: ['rank', 'product', '线下', '线上', '海外', '合计'] },
  { id: '2', session: 'GMV 月度趋势', q: '过去 12 个月每月 GMV 走势', t: '昨天 · 12 行', cols: ['month', 'gmv', 'mom_pct', 'yoy_pct'] },
  { id: '3', session: '客户留存', q: '查询近 30 天回头客占比，按渠道拆分', t: '昨天 · 5 行', cols: ['channel', 'returning', 'new', 'rate'] },
  { id: '4', session: '退款原因', q: '统计 2026 Q1 各品类退款原因 Top 5', t: '3 天前 · 25 行', cols: ['category', 'reason', 'count', 'pct'] },
  { id: '5', session: '渠道流量', q: '比较各广告渠道 ROI', t: '4 天前 · 8 行', cols: ['channel', 'spend', 'revenue', 'roi'] },
  { id: '6', session: '产品转化率', q: '产品详情页 → 加购 → 下单各阶段漏斗', t: '上周 · 200 行', cols: ['product', 'pdp_view', 'add_cart', 'order'] },
  { id: '7', session: '财务对账', q: '4 月应收应付差额', t: '上周 · 30 行', cols: ['account', 'ar', 'ap', 'diff'] },
  { id: '8', session: '库存周转', q: '近 90 天库存周转天数', t: '2 周前 · 50 行', cols: ['sku', 'avg_inv', 'turnover'] },
];

export default function CollectionListPage() {
  const [batch, setBatch] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => setSelected(s => {
    const n = new Set(s);
    if (n.has(id)) n.delete(id); else n.add(id);
    return n;
  });

  return (
    <PreviewFrame bg="rgb(248,250,252)" padded={false}>
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: HEX, borderRadius: 8 } }}>
        <div style={{ minHeight: 720, padding: 24, fontFamily: SAGE_FONT, background: '#fff' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Star size={22} color={HEX} fill={HEX} />
              收藏夹
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Tooltip title="收起侧栏">
                <Button type="text" icon={<PanelLeftOpen size={16} color="#64748b" />} />
              </Tooltip>
              {batch ? (
                <>
                  <Button danger icon={<Trash2 size={14} />}>删除（{selected.size}）</Button>
                  <Button onClick={() => { setBatch(false); setSelected(new Set()); }}>取消</Button>
                </>
              ) : (
                <Button type="primary" onClick={() => setBatch(true)}>批量管理</Button>
              )}
            </div>
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {ITEMS.map(it => {
              const sel = selected.has(it.id);
              return (
                <div
                  key={it.id}
                  onClick={() => batch && toggle(it.id)}
                  style={{
                    position: 'relative',
                    background: '#fff',
                    border: `1px solid ${sel ? HEX : '#e2e8f0'}`,
                    boxShadow: sel ? `0 0 0 1px ${HEX}` : 'none',
                    borderRadius: 8, padding: 16,
                    cursor: 'pointer',
                  }}
                  className="card"
                >
                  {batch && (
                    <Checkbox
                      checked={sel}
                      onClick={e => e.stopPropagation()}
                      onChange={() => toggle(it.id)}
                      style={{ position: 'absolute', top: 12, right: 12, zIndex: 10 }}
                    />
                  )}
                  <div style={{ marginBottom: 12, flex: 1 }}>
                    <span style={{
                      display: 'inline-block',
                      fontSize: 10, fontWeight: 500, color: '#64748b',
                      background: 'rgb(252,252,252)',
                      padding: '2px 8px', borderRadius: 999,
                      marginBottom: 8,
                      border: '1px solid #f1f5f9',
                    }}>{it.session}</span>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
                      <p style={{
                        margin: 0, fontWeight: 600, color: '#1e293b', fontSize: 13,
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>{it.q}</p>
                      <button
                        onClick={e => e.stopPropagation()}
                        className="pencil"
                        style={{
                          background: 'transparent', border: 'none', cursor: 'pointer',
                          padding: 2, opacity: 0,
                          transition: 'opacity 200ms',
                        }}
                      ><Pencil size={12} color={HEX} /></button>
                    </div>
                  </div>

                  <p style={{ margin: '0 0 12px', fontSize: 11, color: '#94a3b8' }}>{it.t}</p>

                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid #f1f5f9',
                    borderRadius: 4, padding: 10,
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                      {it.cols.slice(0, 6).map(c => (
                        <Tooltip key={c} title={c}>
                          <span style={{
                            fontSize: 10, color: '#64748b',
                            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                            background: '#fff', border: '1px solid #e2e8f0',
                            padding: '2px 6px', borderRadius: 4,
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}>{c}</span>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <style>{`
            .card:hover .pencil { opacity: 1 !important; }
          `}</style>
        </div>
      </ConfigProvider>
    </PreviewFrame>
  );
}
