import { PreviewFrame } from '../../../_layout';
import {
  LayoutDashboard, Activity, MessagesSquare, FileText, MessageSquare,
  Database, Ruler, FlaskConical, Newspaper,
} from 'lucide-react';

/**
 * borderless-bookmark-rail · 224px 无边书签竖条二级导航
 * 与内容同 warm 表面、无 border；选中态=浅蓝药丸 + 左侧 3px 蓝书签竖条(霓虹微光)
 * 源码：src/core/components/layout/secondary-nav.tsx（观测域分组）
 */

const GROUPS = [
  { title: '概览', items: [{ label: '仪表盘', icon: LayoutDashboard, active: false }] },
  {
    title: '运行记录',
    items: [
      { label: '运行记录 / Trace', icon: Activity, active: true },
      { label: '会话', icon: MessagesSquare, active: false },
      { label: '会话文件', icon: FileText, active: false },
      { label: 'Playground', icon: MessageSquare, active: false },
    ],
  },
  {
    title: '评估',
    items: [
      { label: '数据集', icon: Database, active: false },
      { label: '评分方案', icon: Ruler, active: false },
      { label: '定时任务', icon: FlaskConical, active: false },
    ],
  },
  { title: '合规', items: [{ label: '审计日志', icon: Newspaper, active: false }] },
];

export default function BorderlessBookmarkRail() {
  return (
    <PreviewFrame bg="#fafaf7" padded={false}>
      {/* 同内容区 warm 表面 —— aside 无边、无独立底色 */}
      <div style={{ display: 'flex', height: 560, background: '#fafaf7', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <aside style={{ display: 'flex', width: 224, flexShrink: 0, flexDirection: 'column', overflowY: 'auto', background: '#fafaf7', padding: '16px 12px' }}>
          {GROUPS.map((g, gi) => (
            <div key={g.title}>
              <div style={{
                padding: `${gi === 0 ? 0 : 20}px 12px 6px`,
                fontSize: 10.5, fontWeight: 700, letterSpacing: '0.06em', color: '#a8a29e', textTransform: 'uppercase',
              }}>
                {g.title}
              </div>
              {g.items.map(it => {
                const Icon = it.icon;
                return (
                  <div key={it.label} style={{
                    position: 'relative', display: 'flex', alignItems: 'center', gap: 12,
                    borderRadius: 10, padding: '8px 12px', fontSize: 13,
                    fontWeight: it.active ? 600 : 500,
                    background: it.active ? '#eff6ff' : 'transparent',
                    color: it.active ? '#1d4ed8' : '#57534e',
                    cursor: 'pointer',
                  }}>
                    {/* signature: 左侧蓝书签竖条 + 霓虹微光 */}
                    {it.active && (
                      <span style={{
                        position: 'absolute', top: 8, bottom: 8, left: 0, width: 3,
                        borderRadius: '0 3px 3px 0', background: '#2563eb',
                        boxShadow: '0 0 8px rgba(59,130,246,0.45)',
                      }} />
                    )}
                    <Icon size={16} color={it.active ? '#2563eb' : '#a8a29e'} style={{ flexShrink: 0 }} />
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.label}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </aside>

        {/* 内容区占位 —— 与 aside 同表面，仅靠卡片浮起 */}
        <div style={{ flex: 1, padding: 24 }}>
          <div style={{ borderRadius: 12, border: '1px solid #e7e5e0', background: '#fffefb', height: '100%', boxShadow: '0 1px 2px rgb(0 0 0 / 4%), 0 4px 12px rgb(0 0 0 / 3%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a8a29e', fontSize: 13 }}>
            运行记录 / Trace 内容区
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
