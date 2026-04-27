import { useState } from 'react';
import { Badge, Card, ConfigProvider, Popover, Table, Tag } from 'antd';
import { Code, Database, FileText, HelpCircle, User, Zap } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const HEX = '#10b981';
const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

type TabKey = 'tables' | 'rules' | 'prefab' | 'user' | 'low_quality';

const STATS: Array<{ key: TabKey; title: string; Icon: React.ComponentType<{ size?: number }>; count: number; found: number }> = [
  { key: 'tables', title: '表', Icon: Database, count: 6, found: 6 },
  { key: 'rules', title: '规则', Icon: FileText, count: 3, found: 3 },
  { key: 'prefab', title: '预制 SQL', Icon: Code, count: 4, found: 4 },
  { key: 'user', title: '用户 SQL', Icon: User, count: 2, found: 2 },
  { key: 'low_quality', title: '低质 SQL', Icon: HelpCircle, count: 1, found: 1 },
];

const distTag = (v: number) => {
  const color = v >= 0.5 ? 'red' : v >= 0.3 ? 'orange' : v >= 0.2 ? 'blue' : 'green';
  return <Tag color={color}>{v.toFixed(4)}</Tag>;
};

export default function VectorTestModalPage() {
  const [tab, setTab] = useState<TabKey>('tables');

  const tablesData = [
    { key: 1, name: 'orders', comment: '订单主表', dist: 0.1234 },
    { key: 2, name: 'products', comment: '产品主数据', dist: 0.1856 },
    { key: 3, name: 'order_items', comment: '订单明细', dist: 0.2421 },
    { key: 4, name: 'channels', comment: '销售渠道字典', dist: 0.3105 },
    { key: 5, name: 'refunds', comment: '退款记录', dist: 0.3789 },
    { key: 6, name: 'audit_logs', comment: '审计日志', dist: 0.5234 },
  ];

  const COLUMNS_TABLES = [
    { title: '表名', dataIndex: 'name', width: 200 },
    { title: '注释', dataIndex: 'comment' },
    { title: '距离', dataIndex: 'dist', width: 120, render: (v: number) => distTag(v) },
  ];

  return (
    <PreviewFrame bg="rgba(15,23,42,0.3)" padded>
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: HEX, borderRadius: 6 } }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 720, backdropFilter: 'blur(2px)' }}>
          <div style={{
            width: 1000, background: '#fff', borderRadius: 12,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            padding: 24,
          }}>
            {/* Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Zap size={18} color={HEX} />
              <span style={{ fontSize: 16, fontWeight: 500, color: '#1f2937' }}>向量测试结果</span>
              <Popover title="距离说明" content={<div style={{ maxWidth: 240, fontSize: 12, color: '#6b7280' }}>
                距离越小越相近：&lt; 0.2 极相关 / &lt; 0.3 相关 / &lt; 0.5 弱相关 / &gt; 0.5 不相关
              </div>}>
                <HelpCircle size={14} color="#9ca3af" style={{ cursor: 'help' }} />
              </Popover>
            </div>

            {/* 用户问题盒 */}
            <div style={{
              padding: 16, marginBottom: 16,
              background: '#fafafa',
              border: '1px solid #e5e7eb', borderRadius: 8,
            }}>
              <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>
                <User size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                用户问题
              </div>
              <div style={{ fontSize: 14, color: '#1f2937' }}>
                查一下本月销售额 Top 10 的产品，按线下、线上、海外三个渠道分别统计
              </div>
            </div>

            {/* 5 张 stat cards */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16,
              marginBottom: 24, marginTop: 12,
            }}>
              {STATS.map(s => {
                const isAct = tab === s.key;
                const I = s.Icon;
                return (
                  <Card
                    key={s.key} size="small" hoverable
                    onClick={() => setTab(s.key)}
                    style={{
                      cursor: 'pointer',
                      background: isAct ? `${HEX}10` : '#fff',
                      borderLeft: `4px solid ${isAct ? HEX : 'transparent'}`,
                      borderTop: '1px solid #e5e7eb',
                      borderRight: '1px solid #e5e7eb',
                      borderBottom: '1px solid #e5e7eb',
                    }}
                    styles={{ body: { padding: 12 } }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{
                            padding: 6, borderRadius: 6,
                            background: `${HEX}1A`, color: HEX,
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          }}><I size={14} /></span>
                          <span style={{ fontSize: 12, color: '#6b7280' }}>{s.title}</span>
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 700, marginTop: 8, color: '#1f2937' }}>
                          {s.count}
                        </div>
                      </div>
                      <Badge count={s.found} color={HEX} overflowCount={99} />
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Header */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 8, marginLeft: 8,
            }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>
                {STATS.find(s => s.key === tab)?.title}（{tablesData.length} 条）
              </span>
            </div>

            {/* 表格 */}
            <Table
              size="small"
              dataSource={tablesData}
              columns={COLUMNS_TABLES}
              pagination={false}
              scroll={{ y: 320 }}
              tableLayout="fixed"
            />
          </div>
        </div>
      </ConfigProvider>
    </PreviewFrame>
  );
}
