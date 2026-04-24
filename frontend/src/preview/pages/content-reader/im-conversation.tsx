import { Search, Send } from 'lucide-react';
import { useState } from 'react';
import { PreviewFrame } from '../../_layout';

const AVATAR = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

const CONVERSATIONS = [
  { id: 1, name: '设计师-L', avatar: 0, lastMsg: '海报的事搞定了，谢啦！', time: '3 分钟前', unread: 2 },
  { id: 2, name: '后端-M', avatar: 1, lastMsg: '那个 caching 配置能发我一下吗？', time: '1 小时前', unread: 0 },
  { id: 3, name: '前端-J', avatar: 2, lastMsg: '好，我试试', time: '昨天', unread: 0 },
  { id: 4, name: '工程-K', avatar: 3, lastMsg: '5 问的流程确实有效', time: '2 天前', unread: 1 },
];

const THREAD = [
  { id: 1, own: false, text: '嗨，看了你写的 canvas-design 实战，写得太棒了', time: '10:30' },
  { id: 2, own: true, text: '谢啦～ 主要是试出来的，prompt 总结这部分花了挺久', time: '10:35' },
  { id: 3, own: false, text: '有个问题想请教：结构化的 prompt 是直接写在 SKILL.md 里，还是独立 references？', time: '10:36' },
  { id: 4, own: true, text: '我是放 references/ 下面，SKILL.md 只保留入口，避免主文件太大影响加载', time: '10:40' },
  { id: 5, own: false, text: '明白了，那如果引用 references 里的内容，需要在 SKILL.md 里手动引吗？', time: '10:42' },
  { id: 6, own: true, text: '对，SKILL.md 里用 Markdown link 显式指，agent 会按链访问', time: '10:43' },
  { id: 7, own: false, text: '海报的事搞定了，谢啦！', time: '刚刚' },
];

export default function IMConversationPreview() {
  const [selected, setSelected] = useState(1);
  const [msg, setMsg] = useState('');

  return (
    <PreviewFrame bg="#ffffff" padded={false}>
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#111827', height: 700, display: 'flex', overflow: 'hidden' }}>
        {/* 左：会话列表 */}
        <aside style={{ width: 320, borderRight: '1px solid rgba(226,232,240,0.6)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: 16, borderBottom: '1px solid rgba(226,232,240,0.6)' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: 12, top: 12 }} />
              <input placeholder="搜索会话 / 新对话" style={{
                width: '100%', padding: '10px 12px 10px 36px', borderRadius: 10,
                border: '1px solid #e2e8f0', fontSize: 13, outline: 'none', fontFamily: 'inherit',
              }} />
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {CONVERSATIONS.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                style={{
                  width: '100%', padding: '12px 16px',
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  background: selected === c.id ? 'rgba(240,253,250,0.4)' : 'transparent',
                  border: 'none', cursor: 'pointer', textAlign: 'left',
                  transition: 'background 150ms', fontFamily: 'inherit',
                }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 999, background: AVATAR[c.avatar], color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
                  {c.name[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
                    <span style={{ fontSize: 10, color: '#9ca3af', whiteSpace: 'nowrap' }}>{c.time}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, marginTop: 2 }}>
                    <p style={{ fontSize: 12, color: '#64748b', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.lastMsg}</p>
                    {c.unread > 0 && (
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: '#f97316', borderRadius: 999, padding: '0 6px', minWidth: 18, textAlign: 'center' }}>
                        {c.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* 右：消息主流 */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
          {/* 顶栏 */}
          <div style={{ height: 56, borderBottom: '1px solid rgba(226,232,240,0.6)', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 999, background: AVATAR[0], color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>
              L
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>设计师-L</div>
              <div style={{ fontSize: 11, color: '#9ca3af', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.8)' }} />
                在线
              </div>
            </div>
          </div>

          {/* 消息流 */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {THREAD.map((m) => (
              <div key={m.id} style={{ display: 'flex', justifyContent: m.own ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '70%', padding: '10px 14px', fontSize: 14,
                  borderRadius: 16,
                  borderBottomRightRadius: m.own ? 4 : 16,
                  borderBottomLeftRadius: m.own ? 16 : 4,
                  background: m.own ? '#14b8a6' : '#f1f5f9',
                  color: m.own ? '#fff' : '#0f172a',
                  lineHeight: 1.7,
                }}>
                  <div>{m.text}</div>
                  <div style={{ fontSize: 10, marginTop: 4, color: m.own ? 'rgba(255,255,255,0.7)' : '#9ca3af' }}>
                    {m.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Composer */}
          <div style={{ borderTop: '1px solid rgba(226,232,240,0.6)', padding: 16, background: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <textarea
                rows={2}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="输入消息，Enter 发送 / Shift+Enter 换行"
                style={{
                  flex: 1, padding: '10px 16px', fontSize: 14,
                  border: '1px solid #cbd5e1', borderRadius: 12,
                  outline: 'none', resize: 'none', fontFamily: 'inherit',
                }}
              />
              <button
                disabled={!msg.trim()}
                style={{
                  padding: '10px 20px', background: msg.trim() ? '#1a1a1a' : '#cbd5e1', color: '#fff',
                  borderRadius: 12, border: 'none', display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 14, fontWeight: 500, cursor: msg.trim() ? 'pointer' : 'not-allowed',
                  fontFamily: 'inherit',
                }}
              >
                <Send size={14} /> 发送
              </button>
            </div>
          </div>
        </main>
      </div>
    </PreviewFrame>
  );
}
