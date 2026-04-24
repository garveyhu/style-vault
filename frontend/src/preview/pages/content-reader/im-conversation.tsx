import { Send } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';
import { PreviewFrame } from '../../_layout';

const AVATAR = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
const CURRENT_USER_ID = 0; // 自己

type Conv = {
  id: number; name: string; avatar: number;
  lastMsg: string; time: string; unread: number;
};

const CONVERSATIONS: Conv[] = [
  { id: 1, name: '设计师-L', avatar: 0, lastMsg: '海报的事搞定了，谢啦！', time: '3 分钟前', unread: 2 },
  { id: 2, name: '后端-M', avatar: 1, lastMsg: '那个 caching 配置能发我一下吗？', time: '1 小时前', unread: 0 },
  { id: 3, name: '前端-J', avatar: 2, lastMsg: '好，我试试', time: '昨天', unread: 0 },
  { id: 4, name: '工程-K', avatar: 3, lastMsg: '5 问的流程确实有效', time: '2 天前', unread: 1 },
];

type Msg = { id: number; fromId: number; text: string; time: string };

const THREADS: Record<number, Msg[]> = {
  1: [
    { id: 1, fromId: 1, text: '嗨，看了你写的 canvas-design 实战，写得太棒了', time: '10:30' },
    { id: 2, fromId: CURRENT_USER_ID, text: '谢啦～ 主要是试出来的，prompt 总结这部分花了挺久', time: '10:35' },
    { id: 3, fromId: 1, text: '有个问题想请教：结构化的 prompt 是直接写在 SKILL.md 里，还是独立 references?', time: '10:36' },
    { id: 4, fromId: CURRENT_USER_ID, text: '我是放 references/ 下面，SKILL.md 只保留入口，避免主文件太大影响加载', time: '10:40' },
    { id: 5, fromId: 1, text: '明白了，那如果引用 references 里的内容，需要在 SKILL.md 里手动引吗?', time: '10:42' },
    { id: 6, fromId: CURRENT_USER_ID, text: '对，SKILL.md 里用 Markdown link 显式指，agent 会按链访问', time: '10:43' },
    { id: 7, fromId: 1, text: '海报的事搞定了，谢啦！', time: '刚刚' },
  ],
  2: [
    { id: 1, fromId: 2, text: '那个 caching 配置能发我一下吗？', time: '13:05' },
    { id: 2, fromId: 2, text: '我看了你那篇实践帖，想直接复用', time: '13:05' },
    { id: 3, fromId: CURRENT_USER_ID, text: '可以，我贴个 gist 给你', time: '13:12' },
    { id: 4, fromId: CURRENT_USER_ID, text: 'https://gist.github.com/links/xxxx', time: '13:12' },
  ],
  3: [
    { id: 1, fromId: CURRENT_USER_ID, text: 'hooks 拆分试试这个写法', time: '昨天 16:40' },
    { id: 2, fromId: 3, text: '好，我试试', time: '昨天 16:45' },
  ],
  4: [
    { id: 1, fromId: CURRENT_USER_ID, text: '新人 onboard 直接扔 5 问表挺好用', time: '2 天前' },
    { id: 2, fromId: 4, text: '5 问的流程确实有效', time: '2 天前' },
  ],
};

export default function IMConversationPreview() {
  const [selected, setSelected] = useState<number>(1);
  const [draft, setDraft] = useState('');
  const [textareaFocus, setTextareaFocus] = useState(false);
  const threadBodyRef = useRef<HTMLDivElement>(null);

  const currentConv = CONVERSATIONS.find((c) => c.id === selected)!;
  const thread = THREADS[selected] || [];

  // 切换会话时同步瞬移到底（paint 前完成 · 不走 smooth 动画）
  // StyleCard 把本预览渲在卡片里时，smooth 动画会在卡上持续播放
  // 反复抖动滚动条——这里改为瞬移避免
  useLayoutEffect(() => {
    const el = threadBodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [selected]);

  return (
    <PreviewFrame bg="#ffffff" padded={false}>
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a', height: 700, display: 'flex', overflow: 'hidden', maxWidth: 1152, margin: '0 auto', background: '#fff' }}>

        {/* 左：会话列表 */}
        <aside style={{ width: 320, borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em', margin: 0 }}>消息</h2>
          </div>

          <div style={{ padding: 12, borderBottom: '1px solid #f1f5f9' }}>
            <button style={{
              width: '100%', padding: '6px 12px', fontSize: 12, fontWeight: 600,
              background: '#fff', border: '1px solid #d1d5db', borderRadius: 6,
              cursor: 'pointer', color: '#374151', fontFamily: 'inherit',
            }}>
              + 新建对话
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {CONVERSATIONS.map((c) => {
              const isActive = selected === c.id;
              return (
                <div key={c.id} onClick={() => setSelected(c.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '14px 16px', cursor: 'pointer',
                    background: isActive ? 'rgba(241,245,249,0.8)' : 'transparent',
                    borderLeft: isActive ? '3px solid #1a1a1a' : '3px solid transparent',
                    transition: 'all 150ms',
                  }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 999, background: AVATAR[c.avatar],
                      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: 18,
                    }}>
                      {c.name[0]}
                    </div>
                    {c.unread > 0 && (
                      <span style={{
                        position: 'absolute', top: -4, right: -4,
                        minWidth: 18, height: 18, padding: '0 5px',
                        borderRadius: 999, background: '#f97316', color: '#fff',
                        fontSize: 11, fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {c.unread}
                      </span>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {c.name}
                      </span>
                      <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500, flexShrink: 0 }}>
                        {c.time}
                      </span>
                    </div>
                    <p style={{ fontSize: 12, color: '#64748b', margin: '2px 0 0', lineHeight: 1.6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {c.lastMsg}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* 右：Thread */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'rgba(248,250,252,0.3)' }}>
          {/* Thread header */}
          <div style={{
            padding: '14px 20px', borderBottom: '1px solid #e2e8f0', background: '#fff',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 999, background: AVATAR[currentConv.avatar],
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 16,
              boxShadow: '0 0 0 2px #f1f5f9',
            }}>
              {currentConv.name[0]}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <a style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', cursor: 'pointer', display: 'block' }}>
                {currentConv.name}
              </a>
              <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>点击查看个人主页</span>
            </div>
          </div>

          {/* Thread body */}
          <div ref={threadBodyRef} style={{
            flex: 1, overflowY: 'auto', padding: 16,
            background: 'linear-gradient(to bottom, #f8fafc, rgba(248,250,252,0.5))',
          }}>
            {thread.map((m, i) => {
              const isMine = m.fromId === CURRENT_USER_ID;
              const prevMsg = i > 0 ? thread[i - 1] : null;
              const senderChanged = !prevMsg || prevMsg.fromId !== m.fromId;
              return (
                <div key={m.id} style={{
                  display: 'flex', justifyContent: isMine ? 'flex-end' : 'flex-start',
                  marginTop: senderChanged ? 12 : 2,
                }}>
                  {!isMine && senderChanged && (
                    <div style={{
                      width: 32, height: 32, borderRadius: 999, background: AVATAR[currentConv.avatar],
                      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: 13, marginRight: 8, marginTop: 4, flexShrink: 0,
                    }}>
                      {currentConv.name[0]}
                    </div>
                  )}
                  {!isMine && !senderChanged && <div style={{ width: 32, marginRight: 8, flexShrink: 0 }} />}
                  <div style={{ maxWidth: '70%' }}>
                    <div style={{
                      padding: '10px 16px',
                      background: isMine ? '#1a1a1a' : '#fff',
                      color: isMine ? '#fff' : '#334155',
                      borderRadius: 16,
                      borderBottomRightRadius: isMine ? 6 : 16,
                      borderBottomLeftRadius: isMine ? 16 : 6,
                      border: isMine ? 'none' : '1px solid rgba(226,232,240,0.8)',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                      fontSize: 14, lineHeight: 1.7,
                      whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                    }}>
                      {m.text}
                    </div>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      justifyContent: isMine ? 'flex-end' : 'flex-start',
                      marginTop: 2, paddingLeft: isMine ? 0 : 4,
                    }}>
                      <span style={{ fontSize: 10, color: '#cbd5e1' }}>{m.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Composer · 真实风格 */}
          <div style={{ padding: 16, borderTop: '1px solid #e2e8f0', background: '#fff' }}>
            <div style={{
              display: 'flex', gap: 8, alignItems: 'flex-end',
              padding: 8, borderRadius: 16,
              background: 'rgba(248,250,252,0.8)',
              boxShadow: `0 0 0 ${textareaFocus ? 2 : 1}px ${textareaFocus ? 'rgba(148,163,184,0.5)' : '#e2e8f0'}, 0 1px 2px rgba(0,0,0,0.04)`,
              transition: 'box-shadow 150ms',
            }}>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onFocus={() => setTextareaFocus(true)}
                onBlur={() => setTextareaFocus(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    setDraft('');
                  }
                }}
                placeholder="输入消息..."
                rows={1}
                style={{
                  flex: 1, border: 'none', outline: 'none',
                  background: 'transparent', resize: 'none',
                  fontSize: 14, padding: '4px 8px', lineHeight: 1.6,
                  fontFamily: 'inherit', maxHeight: 96,
                }}
              />
              <button
                disabled={!draft.trim()}
                style={{
                  flexShrink: 0, width: 32, height: 32, borderRadius: 999,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  background: draft.trim() ? '#1a1a1a' : '#e2e8f0',
                  color: draft.trim() ? '#fff' : '#94a3b8',
                  border: 'none', cursor: draft.trim() ? 'pointer' : 'not-allowed',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                  transition: 'background 150ms',
                }}
              >
                <Send size={14} />
              </button>
            </div>
            <p style={{ fontSize: 10, color: '#94a3b8', textAlign: 'center', margin: '6px 0 0' }}>
              Enter 发送 · Shift+Enter 换行
            </p>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
