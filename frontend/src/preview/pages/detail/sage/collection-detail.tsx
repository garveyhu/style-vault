import { Button, ConfigProvider, Table, Tooltip } from 'antd';
import { ArrowLeft, Bot, Crown, Download, Eye, History, PanelLeftOpen, Play, Star } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const HEX = '#10b981';
const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

const LOGS = [
  { id: 1, executedAt: '2026-04-27 14:32:18', status: 'success', dur: 1.42, summary: '10 行 × 5 列' },
  { id: 2, executedAt: '2026-04-25 11:08:02', status: 'success', dur: 1.85, summary: '10 行 × 5 列' },
  { id: 3, executedAt: '2026-04-22 09:15:46', status: 'failed', dur: 0.30, summary: '失败：超时' },
  { id: 4, executedAt: '2026-04-20 16:42:11', status: 'success', dur: 1.58, summary: '10 行 × 5 列' },
  { id: 5, executedAt: '2026-04-18 10:00:00', status: 'success', dur: 1.93, summary: '10 行 × 5 列' },
];

export default function CollectionDetailPage() {
  return (
    <PreviewFrame bg="#fff" padded={false}>
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: HEX } }}>
        <div className="flex-1 w-full flex flex-col h-full bg-white" style={{ minHeight: 720, fontFamily: SAGE_FONT }}>
          {/* Header */}
          <div className="relative flex justify-between items-center p-4 border-b border-slate-200">
            <div className="z-10 flex items-center gap-2">
              <Tooltip title="展开侧栏">
                <button className="p-1 rounded-md hover:bg-slate-100 text-slate-500 transition-colors">
                  <PanelLeftOpen size={20} />
                </button>
              </Tooltip>
              <Tooltip title="返回">
                <Button type="text" icon={<ArrowLeft size={20} />} className="p-0 h-10 w-10 flex items-center justify-center" />
              </Tooltip>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-slate-700">
              本月销售 Top 10 (Top 10 销售产品对比)
            </div>
            <div className="flex items-center gap-2 z-10">
              <Tooltip title="重新执行">
                <button className="flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors text-white bg-emerald-500 hover:bg-emerald-600">
                  <Play size={16} />
                  重新执行
                </button>
              </Tooltip>
              <Tooltip title="取消收藏">
                <button className="flex items-center justify-center h-9 w-9 rounded-md transition-colors hover:bg-slate-100 text-emerald-600">
                  <Star size={20} fill="currentColor" />
                </button>
              </Tooltip>
            </div>
          </div>

          {/* Main */}
          <div className="flex-1 overflow-auto p-6 space-y-6 bg-white">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* User message bubble */}
              <div className="relative flex justify-end">
                <div className="max-w-[90%]">
                  <div className="bg-[rgb(246,246,246)] text-slate-900 px-5 py-3 rounded-3xl text-sm leading-relaxed">
                    查询本月销售额前 10 的产品，按线下、线上、海外三个渠道分别统计
                  </div>
                </div>
                <span className="absolute -right-12 top-1.5 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-emerald-600">
                  <Crown size={16} />
                </span>
              </div>

              {/* AI message */}
              <div className="relative">
                <span className="absolute -left-12 top-1 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-emerald-600">
                  <Bot size={16} />
                </span>
                <div className="text-sm leading-relaxed text-slate-800 py-2">
                  <div className="rounded-lg border border-emerald-100 bg-neutral-50 px-4 py-3 mb-3">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-emerald-600 mt-0.5"><Bot size={16} /></span>
                      <p className="text-sm text-neutral-700 m-0">
                        按销售订单聚合，统计每个产品在线下、线上、海外三个渠道的销售额，按总销售额降序给出 Top 10。仅统计已支付订单，剔除退款。
                      </p>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50/75">
                          {['排名', '产品', '销量', '销售额', '环比'].map(c => (
                            <th key={c} className="px-6 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider whitespace-nowrap text-center">{c}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 bg-white">
                        {[
                          ['1', 'Aeron 人体工学椅', '624', '¥1,872,000', '+12.4%'],
                          ['2', 'Kindle Paperwhite', '982', '¥588,000', '+8.1%'],
                          ['3', '小米空气净化器 4', '412', '¥412,000', '+15.2%'],
                        ].map((r, i) => (
                          <tr key={i}>
                            {r.map((v, j) => (
                              <td key={j} className={`px-6 py-3.5 text-gray-600 whitespace-nowrap text-center ${j === 1 ? '' : 'tabular-nums'}`}
                                style={{ fontFamily: j === 1 ? SAGE_FONT : 'ui-monospace, SFMono-Regular, monospace' }}>{v}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Execution History */}
              <div className="flex w-full justify-start px-4 md:px-6">
                <div className="flex flex-col w-full items-start min-w-0">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 w-full">
                    <div className="flex items-center gap-2 mb-4 text-slate-800 font-medium">
                      <History size={18} />
                      <h3 className="m-0 text-base font-medium">执行历史</h3>
                    </div>
                    <Table
                      dataSource={LOGS}
                      rowKey="id"
                      pagination={false}
                      size="small"
                      columns={[
                        { title: '执行时间', dataIndex: 'executedAt', render: (t: string) => <span className="font-mono text-xs text-slate-600">{t}</span> },
                        {
                          title: '状态', dataIndex: 'status', width: 90,
                          render: (s: string) => (
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              s === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>{s}</span>
                          ),
                        },
                        { title: '耗时', dataIndex: 'dur', width: 80, render: (v: number) => v.toFixed(2) + 's' },
                        { title: '结果摘要', dataIndex: 'summary' },
                        {
                          title: '操作', key: 'actions', width: 100,
                          render: (_, r) => (
                            <div className="flex gap-2">
                              <Tooltip title="预览">
                                <Button type="text" size="small" icon={<Eye size={14} />} disabled={r.status !== 'success'} className="text-slate-500 hover:text-emerald-600" />
                              </Tooltip>
                              <Tooltip title="导出">
                                <Button type="text" size="small" icon={<Download size={14} />} disabled={r.status !== 'success'} className="text-slate-500 hover:text-green-600" />
                              </Tooltip>
                            </div>
                          ),
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ConfigProvider>
    </PreviewFrame>
  );
}
