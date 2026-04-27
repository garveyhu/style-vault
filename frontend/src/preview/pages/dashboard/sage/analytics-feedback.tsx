import { useState } from 'react';
import { Button, ConfigProvider, DatePicker, Steps } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import { Cat, Coffee, Feather, Search, Star, ThumbsDown, ThumbsUp, User } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const { RangePicker } = DatePicker;
const T_HEX = '#10b981';

const FB_LIKES: Array<{ user: string; Icon: React.ComponentType<{ size?: number }>; session: string; question: string; answer: string; time: string }> = [
  { user: 'archer', Icon: Feather, session: '本月销售 Top 10', question: '本月销量最高的 10 个产品？',                answer: '查询 sales_main · orders + products，给出销售额排序前 10 …',     time: '2026-04-27 12:32' },
  { user: 'lyna',   Icon: Star,    session: '客户留存',          question: '近 30 天的回头客占比是多少',                 answer: '从 user_events 表里聚合，回头客占比 38.2% …',                       time: '2026-04-27 11:50' },
  { user: 'zhao',   Icon: Cat,     session: '财务对账',          question: '4 月应收应付差额',                           answer: 'JOIN ar_ledger 与 ap_ledger，差额为 ¥124,300 …',                    time: '2026-04-27 10:18' },
  { user: 'sun',    Icon: Coffee,  session: 'GMV 趋势',          question: '过去 30 天每日 GMV',                         answer: '按日聚合 sum(amount)，整体环比上涨 12% …',                          time: '2026-04-27 09:42' },
  { user: 'wang',   Icon: User,    session: 'SQL 学习',          question: '解释一下 LEFT JOIN 和 INNER JOIN 区别',     answer: 'INNER JOIN 只保留匹配行，LEFT JOIN 保留左表全部 …',                 time: '2026-04-27 09:10' },
];

export default function AnalyticsFeedbackPage() {
  const [tab, setTab] = useState(0);
  const [days, setDays] = useState<1 | 7 | 30>(7);
  const [range, setRange] = useState<[Dayjs, Dayjs]>([dayjs().subtract(7, 'day'), dayjs()]);

  return (
    <PreviewFrame bg="rgb(249,249,249)" padded={false}>
      <ConfigProvider theme={{ token: { colorPrimary: T_HEX, borderRadius: 8 } }}>
        <div style={{
          minHeight: 720,
          background: 'linear-gradient(135deg, #fafafa 0%, #f3f4f6 100%)',
          padding: 24, fontFamily: 'Inter, sans-serif', color: '#0f172a',
        }}>
          {/* Header · 真实 sage 用 flex flex-col lg:flex-row 布局 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111827', margin: 0 }}>用户反馈分析</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {/* 时间快捷按钮组 · 还原源码 bg-gray-200/60 rounded-xl p-1 */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                background: 'rgba(229,231,235,0.60)',
                borderRadius: 12, padding: 4,
              }}>
                {([
                  { d: 1, lab: '今天' },
                  { d: 7, lab: '近 7 天' },
                  { d: 30, lab: '近 30 天' },
                ] as const).map(o => {
                  const active = days === o.d;
                  return (
                    <button
                      key={o.d}
                      onClick={() => { setDays(o.d); setRange([dayjs().subtract(o.d, 'day'), dayjs()]); }}
                      style={{
                        padding: '6px 16px', borderRadius: 8,
                        background: active ? T_HEX : 'transparent',
                        color: active ? '#fff' : '#475569',
                        border: 'none', cursor: 'pointer',
                        fontSize: 14, fontWeight: 500,
                        boxShadow: active ? '0 4px 6px -1px rgba(0,0,0,0.10)' : 'none',
                        fontFamily: 'Inter, sans-serif',
                        transition: 'all 200ms',
                      }}
                    >{o.lab}</button>
                  );
                })}
              </div>
              <span style={{ width: 1, height: 20, background: '#cbd5e1' }} />
              {/* antd RangePicker · 真实组件 */}
              <RangePicker
                showTime
                value={range}
                onChange={v => v && v[0] && v[1] && setRange([v[0], v[1]])}
                format="YYYY-MM-DD HH:mm:ss"
                style={{ borderRadius: 8 }}
              />
              <Button type="primary" icon={<Search size={14} />} style={{ borderRadius: 8 }}>
                搜索
              </Button>
            </div>
          </div>

          {/* antd Steps · 还原源码 · current + onChange + items 含 icon */}
          <div style={{ marginBottom: 16 }}>
            <Steps
              current={tab}
              onChange={setTab}
              items={[
                { title: '点赞分析', icon: <ThumbsUp size={18} /> },
                { title: '点踩分析', icon: <ThumbsDown size={18} /> },
                { title: '收藏分析', icon: <Star size={18} /> },
              ]}
            />
          </div>

          {/* 列表 */}
          <div style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: 12, overflow: 'hidden' }}>
            <table style={{ width: '100%', fontSize: 14, borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#fafafa', textAlign: 'left' }}>
                  <th style={{ ...th, width: 130 }}>用户</th>
                  <th style={{ ...th, width: 160 }}>所属会话</th>
                  <th style={th}>问题</th>
                  <th style={{ ...th, width: 220 }}>答案摘要</th>
                  <th style={{ ...th, width: 180 }}>时间</th>
                </tr>
              </thead>
              <tbody>
                {FB_LIKES.map((f, idx) => {
                  const M = f.Icon;
                  return (
                    <tr key={idx} style={{ borderTop: '1px solid #fafafa' }}>
                      <td style={td}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{
                            width: 24, height: 24, borderRadius: '50%',
                            background: `${T_HEX}1A`, color: T_HEX,
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          }}><M size={14} /></span>
                          <span>{f.user}</span>
                        </div>
                      </td>
                      <td style={{ ...td, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 160 }}>{f.session}</td>
                      <td style={{ ...td, color: T_HEX, cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.question}</td>
                      <td style={{ ...td, color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 220 }}>{f.answer}</td>
                      <td style={{ ...td, color: '#64748b', fontSize: 13, fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>{f.time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{
              padding: '12px 24px', fontSize: 13, color: '#94a3b8',
              borderTop: '1px solid #fafafa',
              display: 'flex', justifyContent: 'space-between',
            }}>
              <span>共 {FB_LIKES.length} 条</span>
              <span>第 1 页 · 每页 20 条</span>
            </div>
          </div>
        </div>
      </ConfigProvider>
    </PreviewFrame>
  );
}

const th = { padding: '12px 24px', fontSize: 12, color: '#737373', textTransform: 'uppercase' as const, letterSpacing: '0.05em', fontWeight: 600 as const };
const td = { padding: '16px 24px', color: '#404040' };
