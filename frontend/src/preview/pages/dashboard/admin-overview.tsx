import { Activity, Database, MessagesSquare, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PreviewFrame } from '../../_layout';

type Color = 'indigo' | 'blue' | 'purple' | 'emerald' | 'amber';
const GRAD: Record<Color, string> = {
  indigo: 'linear-gradient(135deg, #6366f1, #818cf8)',
  blue: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
  purple: 'linear-gradient(135deg, #a855f7, #c084fc)',
  emerald: 'linear-gradient(135deg, #10b981, #34d399)',
  amber: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
};
const SHADOW: Record<Color, string> = {
  indigo: '0 10px 15px -3px rgba(99,102,241,0.25)',
  blue: '0 10px 15px -3px rgba(59,130,246,0.25)',
  purple: '0 10px 15px -3px rgba(168,85,247,0.25)',
  emerald: '0 10px 15px -3px rgba(16,185,129,0.25)',
  amber: '0 10px 15px -3px rgba(245,158,11,0.25)',
};

function StatCard({ label, value, Icon, color }: {
  label: string; value: number | string; Icon: LucideIcon; color: Color;
}) {
  return (
    <div style={{
      background: '#fff', borderRadius: 14,
      border: '1px solid rgba(226,232,240,0.6)',
      padding: 18, cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, letterSpacing: 0.3, marginBottom: 6 }}>{label}</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{value}</div>
          <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500, marginTop: 6 }}>点击查看详情 →</div>
        </div>
        <div style={{
          width: 42, height: 42, borderRadius: 12,
          background: GRAD[color],
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: SHADOW[color],
        }}>
          <Icon color="#fff" size={20} />
        </div>
      </div>
    </div>
  );
}

function DistRow({ label, value, color, total }: { label: string; value: number; color: string; total: number }) {
  const pct = total > 0 ? Math.max((value / total) * 100, value > 0 ? 3 : 0) : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 11, color: '#9ca3af', width: 56, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, background: '#f1f5f9', borderRadius: 999, height: 8, overflow: 'hidden' }}>
        <div style={{ background: color, height: '100%', borderRadius: 999, width: `${pct}%` }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color: '#475569', width: 32, textAlign: 'right' }}>{value}</span>
    </div>
  );
}

function Trend({ label, value, sub, subColor }: { label: string; value: string; sub: string; subColor: string }) {
  return (
    <div style={{ borderRadius: 12, background: '#f8fafc', padding: 14 }}>
      <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginTop: 4, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      <div style={{ fontSize: 10, color: subColor, fontWeight: 600, marginTop: 6 }}>{sub}</div>
    </div>
  );
}

export default function AdminOverviewPreview() {
  return (
    <PreviewFrame bg="#f5f7fa">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 32px', fontFamily: 'Inter, system-ui, sans-serif', color: '#111827' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em', margin: '0 0 24px' }}>
          管理后台
        </h1>

        {/* Tabs 模拟 */}
        <div style={{ borderBottom: '1px solid #f1f5f9', marginBottom: 24, display: 'flex', gap: 24 }}>
          <button style={{ padding: '12px 0', fontSize: 14, fontWeight: 600, color: '#0f172a', background: 'transparent', border: 'none', borderBottom: '2px solid #0f172a', marginBottom: -1 }}>
            运营概览
          </button>
          {['仓库', '投稿', '实践', '评论', '用户'].map((t) => (
            <button key={t} style={{ padding: '12px 0', fontSize: 14, fontWeight: 500, color: '#64748b', background: 'transparent', border: 'none', marginBottom: -1 }}>
              {t}
            </button>
          ))}
        </div>

        <div style={{ padding: '0 16px' }}>
          {/* 4 格 stat card */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            <StatCard label="技能资产" value={76} Icon={Database} color="indigo" />
            <StatCard label="实践案例" value={184} Icon={Activity} color="blue" />
            <StatCard label="社区评论" value={920} Icon={MessagesSquare} color="purple" />
            <StatCard label="注册用户" value={1402} Icon={Users} color="emerald" />
          </div>

          {/* 分布 + 趋势 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
            <div style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.6)', borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>数据分布</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <DistRow label="技能" value={76} total={1192} color="linear-gradient(90deg, #6366f1, #818cf8)" />
                <DistRow label="实践" value={184} total={1192} color="linear-gradient(90deg, #3b82f6, #60a5fa)" />
                <DistRow label="评论" value={920} total={1192} color="linear-gradient(90deg, #a855f7, #c084fc)" />
                <DistRow label="数据源" value={12} total={1192} color="linear-gradient(90deg, #f59e0b, #fbbf24)" />
              </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid rgba(226,232,240,0.6)', borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>平台趋势</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <Trend label="同步成功率" value="98%" sub="528/540 次同步" subColor="#059669" />
                <Trend label="活跃数据源" value="11" sub="共 12 个源" subColor="#2563eb" />
                <Trend label="待审提交" value="4" sub="共 52 个提交" subColor="#7c3aed" />
                <Trend label="内容密度" value="0.8" sub="帖+评/活跃用户" subColor="#d97706" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
