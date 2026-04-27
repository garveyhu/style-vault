import { useState } from 'react';
import { Badge, Card, ConfigProvider, Popover, Table, Tag, Typography } from 'antd';
import {
  CheckCircleOutlined, CodeOutlined, DatabaseOutlined,
  ExclamationCircleOutlined, FileTextOutlined, QuestionCircleOutlined,
  ThunderboltOutlined, UserOutlined,
} from '@ant-design/icons';
import { PreviewFrame } from '../../../_layout';

const { Text } = Typography;
const HEX = '#10b981';
const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

type Tab = 'tables' | 'rules' | 'prefab' | 'user' | 'low_quality';

const TABLES = [
  { tableName: 'orders', tableComment: '订单主表', customComment: '已完成自定义注释', distance: 0.1234 },
  { tableName: 'products', tableComment: '产品主数据', distance: 0.1856 },
  { tableName: 'order_items', tableComment: '订单明细', distance: 0.2421 },
  { tableName: 'channels', tableComment: '销售渠道字典', distance: 0.3105 },
  { tableName: 'refunds', tableComment: '退款记录', distance: 0.3789 },
  { tableName: 'audit_logs', tableComment: '审计日志', distance: 0.5234 },
];

export default function VectorTestModalPage() {
  const [activeTab, setActiveTab] = useState<Tab>('tables');

  const renderDistanceTag = (val: number) => {
    let color = 'green';
    if (val >= 0.2) color = 'blue';
    if (val >= 0.3) color = 'orange';
    if (val >= 0.5) color = 'red';
    return <Tag color={color}>{val.toFixed(4)}</Tag>;
  };

  const tablesColumns = [
    { title: '表名', dataIndex: 'tableName', width: 250, render: (t: string) => <Text>{t}</Text> },
    {
      title: '注释', dataIndex: 'tableComment',
      render: (text: string, r: any) => (
        <div className="flex flex-col">
          {r.customComment && (
            <Text type="success" className="text-xs">
              <CheckCircleOutlined className="mr-1" />
              {r.customComment}
            </Text>
          )}
          <Text type="secondary" className="text-xs">{text || '-'}</Text>
        </div>
      ),
    },
    { title: '距离', dataIndex: 'distance', width: 120, align: 'center' as const, render: renderDistanceTag },
  ];

  return (
    <PreviewFrame bg="rgb(248,250,252)" padded>
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: HEX } }}>
        {/* 还原 Modal width=1000 内部 body 的纯展示 */}
        <div className="bg-white rounded-lg" style={{ maxWidth: 1000, margin: '0 auto', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          {/* Modal title 区 */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <ThunderboltOutlined style={{ color: HEX }} />
              <span className="text-base font-medium">向量测试结果</span>
              <Popover
                title="距离说明"
                content={<div className="max-w-xs text-xs">距离越小越相近：&lt; 0.2 极相关 / &lt; 0.3 相关 / &lt; 0.5 弱相关 / &gt; 0.5 不相关</div>}
              >
                <QuestionCircleOutlined className="text-gray-400 cursor-help" />
              </Popover>
            </div>
          </div>

          <div className="p-6">
            {/* User Question */}
            <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <Text type="secondary" className="block mb-1 text-xs">用户问题</Text>
              <Text strong className="text-base">
                查一下本月销售额 Top 10 的产品，按线下、线上、海外三个渠道分别统计
              </Text>
            </div>

            {/* Stat Cards · 5 column grid */}
            <div className="grid grid-cols-5 gap-4 mb-6 mt-3">
              <StatCard title="表" count={6} foundCount={6} icon={<DatabaseOutlined />} active={activeTab === 'tables'} onClick={() => setActiveTab('tables')} />
              <StatCard title="规则" count={3} foundCount={3} icon={<FileTextOutlined />} active={activeTab === 'rules'} onClick={() => setActiveTab('rules')} />
              <StatCard title="预制 SQL" count={4} foundCount={4} icon={<CodeOutlined />} active={activeTab === 'prefab'} onClick={() => setActiveTab('prefab')} />
              <StatCard title="高质 SQL" count={2} foundCount={2} icon={<UserOutlined />} active={activeTab === 'user'} onClick={() => setActiveTab('user')} />
              <StatCard title="低质 SQL" count={1} foundCount={1} icon={<ExclamationCircleOutlined />} active={activeTab === 'low_quality'} onClick={() => setActiveTab('low_quality')} />
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2 ml-2">
                <Text strong>
                  {activeTab === 'tables' && `相关表（${TABLES.length} 张）`}
                  {activeTab === 'rules' && '相关规则（3 条）'}
                  {activeTab === 'prefab' && '相关预制 SQL（4 条）'}
                  {activeTab === 'user' && '高质量用户 SQL（2 条）'}
                  {activeTab === 'low_quality' && '低质量用户 SQL（1 条）'}
                </Text>
              </div>
              {activeTab === 'tables' && (
                <Table
                  dataSource={TABLES}
                  rowKey="tableName"
                  pagination={false}
                  size="small"
                  scroll={{ y: 360 }}
                  tableLayout="fixed"
                  columns={tablesColumns}
                />
              )}
              {activeTab !== 'tables' && (
                <div className="text-center text-gray-400 py-12">「{activeTab}」面板待加载...</div>
              )}
            </div>
          </div>
        </div>
      </ConfigProvider>
    </PreviewFrame>
  );
}

function StatCard({ title, count, icon, active, onClick, foundCount }: {
  title: string; count: number; icon: React.ReactNode;
  active: boolean; onClick: () => void; foundCount: number;
}) {
  return (
    <Card
      size="small"
      hoverable
      onClick={onClick}
      className={`cursor-pointer transition-all ${
        active ? 'shadow-md border-transparent' : 'border-gray-200'
      }`}
      style={{ background: active ? `${HEX}10` : undefined }}
      styles={{ body: { padding: 12, position: 'relative' } }}
    >
      {active && (
        <div className="absolute top-0 left-0 w-1 h-full rounded-l-sm" style={{ backgroundColor: HEX }} />
      )}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg" style={{ background: active ? `${HEX}1A` : '#f9fafb' }}>
            <span style={{ color: active ? HEX : '#6b7280' }}>{icon}</span>
          </div>
          <div className="ml-1">
            <div className="text-xs" style={{ color: active ? HEX : '#6b7280' }}>{title}</div>
            <div className="text-lg font-bold">{count}</div>
          </div>
        </div>
        <Badge count={foundCount} overflowCount={99} color={active ? HEX : 'gray'} />
      </div>
    </Card>
  );
}
