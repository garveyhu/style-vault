import { useState } from 'react';
import { Button, Checkbox, ConfigProvider, Tooltip } from 'antd';
import { PanelLeftOpen, Pencil, Star, Trash2 } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const HEX = '#10b981';
const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

const ITEMS = [
  { id: '1', sessionTitle: '本月销售 Top 10', remark: '查询本月销售额前 10 的产品，按线下/线上/海外渠道分别统计', timestamp: '2026-04-27', columns: ['rank', 'product', '线下', '线上', '海外', '合计', 'mom_pct'] },
  { id: '2', sessionTitle: 'GMV 月度趋势', remark: '过去 12 个月每月 GMV 走势，含同比环比', timestamp: '2026-04-26', columns: ['month', 'gmv', 'mom_pct', 'yoy_pct'] },
  { id: '3', sessionTitle: '客户留存', remark: '查询近 30 天回头客占比，按渠道拆分', timestamp: '2026-04-26', columns: ['channel', 'returning', 'new', 'rate'] },
  { id: '4', sessionTitle: '退款原因', remark: '统计 2026 Q1 各品类退款原因 Top 5', timestamp: '2026-04-24', columns: ['category', 'reason', 'count', 'pct'] },
  { id: '5', sessionTitle: '渠道流量', remark: '比较各广告渠道 ROI', timestamp: '2026-04-23', columns: ['channel', 'spend', 'revenue', 'roi'] },
  { id: '6', sessionTitle: '产品转化率', remark: '产品详情页 → 加购 → 下单各阶段漏斗', timestamp: '2026-04-20', columns: ['product', 'pdp_view', 'add_cart', 'order'] },
  { id: '7', sessionTitle: '财务对账', remark: '4 月应收应付差额', timestamp: '2026-04-20', columns: ['account', 'ar', 'ap', 'diff'] },
  { id: '8', sessionTitle: '库存周转', remark: '近 90 天库存周转天数', timestamp: '2026-04-13', columns: ['sku', 'avg_inv', 'turnover'] },
];

export default function CollectionListPage() {
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggle = (id: string) => setSelectedIds(s => s.includes(id) ? s.filter(i => i !== id) : [...s, id]);

  return (
    <PreviewFrame bg="#fff" padded={false}>
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: HEX } }}>
        <div className="flex-1 bg-white w-full p-6 h-full overflow-auto bg-slate-50" style={{ minHeight: 720, fontFamily: SAGE_FONT }}>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Tooltip title="展开侧栏">
                <button className="p-1 rounded-md hover:bg-slate-200 text-slate-500 transition-colors mr-1">
                  <PanelLeftOpen size={24} />
                </button>
              </Tooltip>
              <Star className="text-slate-700" fill="currentColor" />
              收藏夹
            </h1>
            <div className="space-x-2">
              {isBatchMode ? (
                <>
                  <Button onClick={() => { setIsBatchMode(false); setSelectedIds([]); }}>取消</Button>
                  <Button danger type="primary" disabled={selectedIds.length === 0} icon={<Trash2 size={16} />}>
                    取消收藏 ({selectedIds.length})
                  </Button>
                </>
              ) : (
                <button
                  onClick={() => setIsBatchMode(true)}
                  className="px-4 py-1.5 rounded-md text-sm font-medium transition-colors text-white bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50"
                >批量管理</button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {ITEMS.map(item => (
              <div
                key={item.id}
                onClick={() => isBatchMode && toggle(item.id)}
                className={`tour-collection-card relative bg-white rounded-lg border p-4 cursor-pointer transition-all hover:shadow-md flex flex-col h-full ${
                  selectedIds.includes(item.id) ? 'border-emerald-200 ring-1 ring-emerald-200' : 'border-slate-200'
                }`}
              >
                {isBatchMode && (
                  <div className="absolute top-3 right-3 z-10">
                    <Checkbox checked={selectedIds.includes(item.id)} onClick={e => e.stopPropagation()} onChange={() => toggle(item.id)} />
                  </div>
                )}

                <div className="mb-3 flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-medium text-slate-500 bg-[rgb(252,252,252)] px-2 py-0.5 rounded-full truncate max-w-[150px] border border-slate-100"
                      title={item.sessionTitle}>{item.sessionTitle}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-slate-800 line-clamp-2 text-sm flex-1" title={item.remark}>{item.remark}</h3>
                    {!isBatchMode && (
                      <button
                        onClick={e => { e.stopPropagation(); }}
                        className="text-slate-400 hover:text-emerald-600 p-0.5 flex-shrink-0"
                      ><Pencil size={14} /></button>
                    )}
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400">{item.timestamp}</span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded p-3 text-xs text-slate-500 border border-slate-100 w-full">
                  <div className="font-medium mb-1 text-slate-600 text-[10px] uppercase tracking-wider">数据预览：</div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full">
                    {item.columns.slice(0, 6).map(c => (
                      <span key={c} className="bg-white px-2 py-1 rounded border border-slate-200 text-left text-[11px] text-slate-600 truncate w-full">{c}</span>
                    ))}
                  </div>
                  {item.columns.length > 6 && (
                    <div className="mt-2 flex justify-end">
                      <Tooltip
                        overlayClassName="max-w-xs"
                        title={
                          <div className="space-y-1 max-h-48 overflow-y-auto">
                            {item.columns.map(h => (
                              <div key={h} className="px-1 py-0.5 text-[11px] text-slate-600">{h}</div>
                            ))}
                          </div>
                        }
                      >
                        <span className="text-[10px] text-slate-400 cursor-pointer underline decoration-dotted">
                          +{item.columns.length - 6} more
                        </span>
                      </Tooltip>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ConfigProvider>
    </PreviewFrame>
  );
}
