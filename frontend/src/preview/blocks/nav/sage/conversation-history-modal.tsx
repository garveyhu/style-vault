import { useState } from 'react';
import { Checkbox, ConfigProvider, Empty, Input } from 'antd';
import { Check, Edit2, MessageSquare, Search, Trash2, X } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const HEX = '#10b981';
const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

type Session = { id: string; title: string; date: string; group: string };
const SESSIONS: Session[] = [
  { id: '1', title: '本月销售 Top 10', date: '今天 14:32', group: '今天' },
  { id: '2', title: '订单异常分析', date: '今天 11:08', group: '今天' },
  { id: '3', title: 'GMV 月度趋势', date: '昨天 18:42', group: '昨天' },
  { id: '4', title: '客户留存漏斗', date: '昨天 09:30', group: '昨天' },
  { id: '5', title: '财务对账问题', date: '4 月 22 日', group: '近 7 天' },
  { id: '6', title: '活跃用户 DAU', date: '4 月 21 日', group: '近 7 天' },
  { id: '7', title: '产品转化率', date: '4 月 20 日', group: '近 7 天' },
  { id: '8', title: 'KPI 月报草稿', date: '4 月 12 日', group: '近 30 天' },
  { id: '9', title: '渠道流量分析', date: '4 月 8 日', group: '近 30 天' },
  { id: '10', title: '用户行为路径', date: '3 月 28 日', group: '近 30 天' },
  { id: '11', title: '退款原因分布', date: '2025 年 11 月', group: '去年' },
  { id: '12', title: '库存周转分析', date: '2025 年 8 月', group: '去年' },
];

export default function ConversationHistoryModalPage() {
  const [batchMode, setBatchMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [editing, setEditing] = useState<string | null>(null);
  const [editVal, setEditVal] = useState('');
  const [search, setSearch] = useState('');
  const [current] = useState('1');

  const filtered = SESSIONS.filter(s => s.title.toLowerCase().includes(search.toLowerCase()));
  const groups = Array.from(new Set(filtered.map(s => s.group)));

  const toggle = (id: string) => {
    setSelected(s => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  };

  return (
    <PreviewFrame bg="rgba(15,23,42,0.3)" padded>
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: HEX, borderRadius: 8 } }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 720, backdropFilter: 'blur(2px)' }}>
          <div style={{
            width: 680, height: '70vh', maxHeight: 600,
            background: '#fff', borderRadius: 16, overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          }}>
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 24px', borderBottom: '1px solid #f5f5f5',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 18, fontWeight: 600, color: '#1f2937' }}>对话历史</span>
                <span style={{ fontSize: 14, color: '#9ca3af' }}>共 {SESSIONS.length} 条</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {batchMode ? (
                  <>
                    <button onClick={() => setSelected(new Set(filtered.map(s => s.id)))}
                      style={{ ...textBtn, color: HEX }}>全选</button>
                    <button onClick={() => alert(`删除 ${selected.size} 条`)}
                      style={{ ...textBtn, color: selected.size ? '#dc2626' : '#9ca3af' }}>
                      删除（{selected.size}）
                    </button>
                    <button onClick={() => { setBatchMode(false); setSelected(new Set()); }}
                      style={textBtn}>取消</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setBatchMode(true)}
                      style={{ ...textBtn, color: HEX }}>批量管理</button>
                    <button style={textBtn}><X size={16} color="#94a3b8" /></button>
                  </>
                )}
              </div>
            </div>

            {/* Search */}
            <div style={{ padding: '12px 24px', borderBottom: '1px solid #f5f5f5' }}>
              <Input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="搜索对话..."
                prefix={<Search size={14} color="#94a3b8" />}
                allowClear
                style={{ borderRadius: 8 }}
              />
            </div>

            {/* List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px' }}>
              {groups.length === 0 && (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ marginTop: 48 }} />
              )}
              {groups.map(g => (
                <div key={g} style={{ marginBottom: 16 }}>
                  <div style={{
                    padding: '6px 8px', fontSize: 12, fontWeight: 500,
                    color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em',
                    position: 'sticky', top: 0, background: '#fff', zIndex: 10,
                  }}>{g}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {filtered.filter(s => s.group === g).map(s => {
                      const isSel = selected.has(s.id);
                      const isCur = current === s.id;
                      const isEditing = editing === s.id;
                      const bg = isSel ? '#f5f5f5' : isCur ? '#f5f5f5' : 'transparent';
                      return (
                        <div key={s.id}
                          onClick={() => batchMode ? toggle(s.id) : null}
                          onMouseEnter={e => { if (bg === 'transparent') e.currentTarget.style.background = '#fafafa'; }}
                          onMouseLeave={e => { if (bg === 'transparent') e.currentTarget.style.background = 'transparent'; }}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            padding: '10px 12px', borderRadius: 12,
                            background: bg,
                            color: isCur ? HEX : '#374151',
                            cursor: 'pointer',
                            transition: 'all 200ms',
                          }}
                          className="group"
                        >
                          {batchMode && <Checkbox checked={isSel} onClick={e => e.stopPropagation()} />}
                          <MessageSquare size={16} color="#9ca3af" style={{ flexShrink: 0 }} />
                          {isEditing ? (
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}
                              onClick={e => e.stopPropagation()}>
                              <Input size="small" autoFocus value={editVal}
                                onChange={e => setEditVal(e.target.value)} />
                              <button onClick={() => setEditing(null)} style={iconBtn}><Check size={14} color={HEX} /></button>
                              <button onClick={() => setEditing(null)} style={iconBtn}><X size={14} color="#94a3b8" /></button>
                            </div>
                          ) : (
                            <>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: isCur ? HEX : '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {s.title}
                                </p>
                                <p style={{ margin: 0, fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{s.date}</p>
                              </div>
                              <div className="actions" style={{
                                display: 'inline-flex', alignItems: 'center', gap: 4,
                                opacity: 0,
                                transition: 'opacity 200ms',
                              }}>
                                <button onClick={e => { e.stopPropagation(); setEditing(s.id); setEditVal(s.title); }}
                                  style={iconBtn}><Edit2 size={14} color="#94a3b8" /></button>
                                <button style={iconBtn}><Trash2 size={14} color="#94a3b8" /></button>
                              </div>
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
        </div>

        <style>{`
          .group:hover .actions { opacity: 1 !important; }
        `}</style>
      </ConfigProvider>
    </PreviewFrame>
  );
}

const textBtn: React.CSSProperties = {
  padding: '6px 12px', borderRadius: 8,
  background: 'transparent', border: 'none', cursor: 'pointer',
  fontSize: 14, color: '#475569',
  fontFamily: SAGE_FONT,
};
const iconBtn: React.CSSProperties = {
  width: 24, height: 24,
  background: 'transparent', border: 'none', cursor: 'pointer', padding: 4,
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  borderRadius: 4,
};
