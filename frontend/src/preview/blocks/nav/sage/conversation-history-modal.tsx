import { useState } from 'react';
import { Checkbox, ConfigProvider, Empty, Input, Tooltip } from 'antd';
import { Check, Edit2, MessageSquare, Search, Trash2, X } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const HEX = '#10b981';
const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

type Session = { id: string; title: string; updatedAt: string; group: string };
const SESSIONS: Session[] = [
  { id: '1', title: '本月销售 Top 10', updatedAt: '14:32', group: '今天' },
  { id: '2', title: '订单异常分析（重点是 4 月退款率突增的渠道）', updatedAt: '11:08', group: '今天' },
  { id: '3', title: 'GMV 月度趋势', updatedAt: '昨天 18:42', group: '昨天' },
  { id: '4', title: '客户留存漏斗', updatedAt: '昨天 09:30', group: '昨天' },
  { id: '5', title: '财务对账问题', updatedAt: '4 月 22 日', group: '近 7 天' },
  { id: '6', title: '活跃用户 DAU', updatedAt: '4 月 21 日', group: '近 7 天' },
  { id: '7', title: '产品转化率', updatedAt: '4 月 20 日', group: '近 7 天' },
  { id: '8', title: 'KPI 月报草稿', updatedAt: '4 月 12 日', group: '近 30 天' },
  { id: '9', title: '渠道流量分析', updatedAt: '4 月 8 日', group: '近 30 天' },
  { id: '10', title: '用户行为路径', updatedAt: '3 月 28 日', group: '近 30 天' },
  { id: '11', title: '退款原因分布', updatedAt: '2025 年 11 月', group: '去年' },
  { id: '12', title: '库存周转分析', updatedAt: '2025 年 8 月', group: '去年' },
];

export default function ConversationHistoryModalPage() {
  const [batch, setBatch] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [editing, setEditing] = useState<string | null>(null);
  const [editVal, setEditVal] = useState('');
  const [search, setSearch] = useState('');
  const currentSessionId = '1';

  const filtered = SESSIONS.filter(s => s.title.toLowerCase().includes(search.toLowerCase()));
  const groups = Array.from(new Set(filtered.map(s => s.group)));

  const handleClick = (id: string) => {
    if (batch) {
      setSelected(s => {
        const n = new Set(s);
        if (n.has(id)) n.delete(id); else n.add(id);
        return n;
      });
    }
  };
  const handleSelectAll = () => setSelected(s =>
    s.size === filtered.length ? new Set() : new Set(filtered.map(x => x.id))
  );

  return (
    <PreviewFrame bg="rgb(248,250,252)" padded>
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: HEX } }}>
        {/* Modal body 直接渲染（不要 mask 背景）· width=680 · h-[70vh] */}
        <div className="bg-white rounded-2xl overflow-hidden" style={{ width: 680, maxWidth: '100%', margin: '0 auto', height: 600, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-neutral-800 m-0">对话历史</h2>
              <span className="text-sm text-neutral-400">共 {SESSIONS.length} 条</span>
            </div>
            <div className="flex items-center gap-2">
              {batch ? (
                <>
                  <button
                    onClick={handleSelectAll}
                    className="px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                  >{selected.size === filtered.length ? '取消全选' : '全选'}</button>
                  <button
                    disabled={selected.size === 0}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      selected.size > 0 ? 'text-red-600 hover:bg-red-50' : 'text-neutral-300 cursor-not-allowed'
                    }`}
                  >删除（{selected.size}）</button>
                  <button
                    onClick={() => { setBatch(false); setSelected(new Set()); }}
                    className="px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                  >取消</button>
                </>
              ) : (
                <button
                  onClick={() => setBatch(true)}
                  className="px-3 py-1.5 text-sm text-emerald-600 hover:bg-neutral-100 rounded-lg transition-colors"
                >批量管理</button>
              )}
              <button className="p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="px-6 py-3 border-b border-neutral-100">
            <Input
              placeholder="搜索对话..."
              prefix={<Search size={16} className="text-neutral-400" />}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="rounded-lg"
              allowClear
            />
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-4 py-2">
            {groups.length === 0 && (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无对话" className="mt-12" />
            )}
            {groups.map(g => (
              <div key={g} className="mb-4">
                <div className="px-2 py-1.5 text-xs font-medium text-neutral-400 uppercase tracking-wider sticky top-0 bg-white z-10">
                  {g}
                </div>
                <div className="space-y-1">
                  {filtered.filter(s => s.group === g).map(s => {
                    const isSel = selected.has(s.id);
                    const isCur = s.id === currentSessionId;
                    const isEditing = editing === s.id;
                    return (
                      <div
                        key={s.id}
                        onClick={() => handleClick(s.id)}
                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                          isCur ? 'bg-neutral-100 text-emerald-600' : 'hover:bg-neutral-50'
                        } ${isSel ? 'bg-neutral-100' : ''}`}
                      >
                        {batch && (
                          <Checkbox
                            checked={isSel}
                            onClick={e => e.stopPropagation()}
                            onChange={() => handleClick(s.id)}
                          />
                        )}
                        <MessageSquare size={16} className="text-neutral-400 flex-shrink-0" />
                        {isEditing ? (
                          <div className="flex-1 flex items-center gap-2" onClick={e => e.stopPropagation()}>
                            <Input
                              size="small" value={editVal}
                              onChange={e => setEditVal(e.target.value)}
                              autoFocus className="flex-1"
                              onKeyDown={e => { if (e.key === 'Enter' || e.key === 'Escape') setEditing(null); }}
                            />
                            <button onClick={() => setEditing(null)} className="p-1 text-emerald-600 hover:bg-neutral-100 rounded">
                              <Check size={14} />
                            </button>
                            <button onClick={() => setEditing(null)} className="p-1 text-neutral-400 hover:bg-neutral-100 rounded">
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="flex-1 min-w-0">
                              <Tooltip title={s.title.length > 40 ? s.title : ''}>
                                <p className={`text-sm truncate font-medium m-0 ${isCur ? 'text-emerald-600' : 'text-neutral-700'}`}>{s.title}</p>
                              </Tooltip>
                              <p className="text-xs text-neutral-400 mt-0.5 m-0">{s.updatedAt}</p>
                            </div>
                            {!batch && (
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Tooltip title="重命名">
                                  <button
                                    onClick={e => { e.stopPropagation(); setEditing(s.id); setEditVal(s.title); }}
                                    className="p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                                  ><Edit2 size={14} /></button>
                                </Tooltip>
                                <Tooltip title="删除">
                                  <button
                                    onClick={e => e.stopPropagation()}
                                    className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                  ><Trash2 size={14} /></button>
                                </Tooltip>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ConfigProvider>
    </PreviewFrame>
  );
}
