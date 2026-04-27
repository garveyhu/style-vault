import { useEffect, useState } from 'react';
import { Alert, Badge, Button, Card, ConfigProvider, Descriptions, Form, Input, Popover, Space, Steps, Table, Tag, Typography } from 'antd';
import {
  CloudSyncOutlined, DatabaseOutlined, DeleteOutlined, EditOutlined,
  EyeOutlined, PlusOutlined, ThunderboltOutlined, CheckCircleOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { PreviewFrame } from '../../../_layout';

const { Title, Text } = Typography;
const HEX = '#10b981';
const HEX_RGB = '16,185,129';
const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

// 还原源码 DataSourceVector.tsx StyledAlert
const StyledAlert = styled(Alert)<{ $primaryColor: string }>`
  .ant-alert-icon {
    color: ${props => props.$primaryColor} !important;
    margin-top: 4px !important;
  }
  .ant-alert-message {
    color: ${props => props.$primaryColor} !important;
  }
`;

const KFCSS = `
@keyframes sv-cry-shimmer { 0% { transform: translateX(-150%) skewX(-15deg); } 50%, 100% { transform: translateX(100%) skewX(-15deg); } }
@keyframes sv-cry-stripes { 0% { background-position: 0 0; } 100% { background-position: 30px 0; } }
@keyframes sv-cry-pulse { 0%, 100% { box-shadow: 0 0 8px 0px rgba(${HEX_RGB},0.30); } 50% { box-shadow: 0 0 16px 2px rgba(${HEX_RGB},0.50); } }
`;

export default function DataSourceDetailTabsPage() {
  const [step, setStep] = useState(1);
  const [percent, setPercent] = useState(32);

  // 模拟进度递增
  useEffect(() => {
    const id = setInterval(() => setPercent(p => (p >= 95 ? 30 : p + 4)), 600);
    return () => clearInterval(id);
  }, []);

  return (
    <PreviewFrame bg="rgb(248,250,252)" padded={false}>
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: HEX } }}>
        <style>{KFCSS}</style>
        <div className="p-6 h-full overflow-auto" style={{ minHeight: 720, fontFamily: SAGE_FONT }}>
          <div className="flex justify-between items-center mb-6">
            <Space>
              <Button>返回列表</Button>
              <Title level={3} style={{ margin: 0 }}>
                <DatabaseOutlined className="mr-2" />
                杭州数据库
              </Title>
              <Tag color={HEX}>MySQL</Tag>
            </Space>
          </div>

          <Card className="mb-6">
            <Steps
              current={step}
              onChange={setStep}
              items={[
                { title: '连接信息', icon: <DatabaseOutlined /> },
                { title: '元数据', icon: <CloudSyncOutlined /> },
                { title: '向量训练', icon: <ThunderboltOutlined /> },
              ]}
            />
          </Card>

          <div className="step-content">
            {step === 0 && <ConnectionStep />}
            {step === 1 && <MetadataStep percent={percent} />}
            {step === 2 && <VectorStep percent={percent} />}
          </div>
        </div>
      </ConfigProvider>
    </PreviewFrame>
  );
}

function ConnectionStep() {
  return (
    <Card title="连接信息">
      <Form layout="vertical">
        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="主机" required><Input defaultValue="db-prod.hangzhou.aliyuncs.com" /></Form.Item>
          <Form.Item label="端口" required><Input defaultValue="3306" /></Form.Item>
          <Form.Item label="用户名" required><Input defaultValue="readonly_user" /></Form.Item>
          <Form.Item label="密码" required><Input.Password defaultValue="••••••••••••" /></Form.Item>
          <Form.Item label="数据库" required><Input defaultValue="hangzhou_business" /></Form.Item>
          <Form.Item label="Schema"><Input defaultValue="public" /></Form.Item>
        </div>
        <Space>
          <Button icon={<CheckCircleOutlined />}>测试连接</Button>
          <Tag color="success">连接成功（latency 23ms）</Tag>
        </Space>
      </Form>
    </Card>
  );
}

function MetadataStep({ percent }: { percent: number }) {
  const tables = [
    { id: 1, tableName: 'orders', tableComment: '订单主表', customComment: '已完成自定义注释', fieldCount: 24, isSynced: true },
    { id: 2, tableName: 'order_items', tableComment: '订单明细', customComment: '', fieldCount: 12, isSynced: true },
    { id: 3, tableName: 'products', tableComment: '产品主数据', customComment: '', fieldCount: 18, isSynced: true },
    { id: 4, tableName: 'channels', tableComment: '销售渠道', customComment: '', fieldCount: 6, isSynced: false },
    { id: 5, tableName: 'refunds', tableComment: '退款', customComment: '', fieldCount: 9, isSynced: false },
    { id: 6, tableName: 'audit_logs', tableComment: '审计日志', customComment: '', fieldCount: 15, isSynced: false },
  ];
  return (
    <Card
      title="元数据"
      extra={
        <Space>
          <Input.Search placeholder="按表名搜索" allowClear style={{ width: 180 }} />
          <Button type="primary" icon={<CloudSyncOutlined />}>同步元数据</Button>
          <Button icon={<PlusOutlined />}>添加单表</Button>
        </Space>
      }
    >
      <Descriptions className="mb-4">
        <Descriptions.Item label="总表数">{tables.length}</Descriptions.Item>
        <Descriptions.Item label="已同步">{tables.filter(t => t.isSynced).length}</Descriptions.Item>
        <Descriptions.Item label="未同步">{tables.filter(t => !t.isSynced).length}</Descriptions.Item>
      </Descriptions>

      {/* 异步任务进度块 · 主题色淡底 + 玻璃质感进度条 */}
      <div
        className="mb-4 p-4 rounded-lg border flex flex-col gap-2"
        style={{ backgroundColor: `${HEX}08`, borderColor: `${HEX}20` }}
      >
        <div className="flex items-center gap-2 text-sm font-medium" style={{ color: HEX }}>
          <CloudSyncOutlined spin />
          正在同步元数据
        </div>
        <CrystalProgress percent={percent} color={HEX} rgb={HEX_RGB} />
        <div className="flex justify-between text-xs opacity-70" style={{ color: HEX }}>
          <span>正在同步 channels 表元数据...</span>
          <span>{Math.floor(percent)}%</span>
        </div>
      </div>

      <Table
        size="small"
        dataSource={tables}
        rowKey="id"
        rowSelection={{}}
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: t => `共 ${t} 条` }}
        columns={[
          {
            title: '表名', dataIndex: 'tableName',
            render: (n: string) => <Text code>{n}</Text>,
          },
          {
            title: '表注释', dataIndex: 'tableComment', ellipsis: true,
            render: (t: string) => t || <Text type="secondary">无</Text>,
          },
          {
            title: '自定义注释', dataIndex: 'customComment', ellipsis: true,
            render: (text: string, r) => (
              <Space>
                {text || <Text type="secondary">无</Text>}
                <Popover
                  trigger="click"
                  title={`编辑：${r.tableName}`}
                  content={
                    <div style={{ width: 300 }}>
                      <div className="mb-2 text-gray-500 text-sm">为表添加额外的描述以辅助 AI 理解</div>
                      <Input.TextArea rows={3} placeholder="例如：本表存放订单主信息，OrderId 唯一" />
                      <div className="flex justify-end gap-2 mt-2">
                        <Button size="small">取消</Button>
                        <Button type="primary" size="small">保存</Button>
                      </div>
                    </div>
                  }
                >
                  <Button type="link" size="small" icon={<EditOutlined />} style={{ color: HEX }} />
                </Popover>
              </Space>
            ),
          },
          { title: '字段数', dataIndex: 'fieldCount', width: 80 },
          {
            title: '同步状态', dataIndex: 'isSynced', width: 100,
            render: (s: boolean) => s ? <Badge status="success" text="已同步" /> : <Badge status="warning" text="未同步" />,
          },
          {
            title: '操作', key: 'action', width: 200,
            render: (_, r) => (
              <Space size="small">
                <Button type="link" size="small" icon={<EyeOutlined />}>详情</Button>
                <Button type="link" size="small" icon={<ThunderboltOutlined />} style={{ color: r.isSynced ? '#faad14' : undefined }}>
                  {r.isSynced ? '重训练' : '训练'}
                </Button>
                <Button type="text" size="small" icon={<DeleteOutlined />} style={{ color: '#ee3838' }} />
              </Space>
            ),
          },
        ]}
      />
    </Card>
  );
}

function VectorStep({ percent }: { percent: number }) {
  return (
    <Card
      title="向量训练"
      className="mb-4"
      extra={
        <Space>
          <Button type="primary" icon={<ThunderboltOutlined />}>
            训练 4 个未同步表
          </Button>
        </Space>
      }
    >
      {/* 异步任务进度块 */}
      <div
        className="mb-4 p-4 rounded-lg border flex flex-col gap-2"
        style={{ backgroundColor: `${HEX}08`, borderColor: `${HEX}20` }}
      >
        <div className="flex items-center gap-2 text-sm font-medium" style={{ color: HEX }}>
          <ThunderboltOutlined spin />
          正在训练向量
        </div>
        <CrystalProgress percent={percent} color={HEX} rgb={HEX_RGB} />
        <div className="flex justify-between text-xs opacity-70" style={{ color: HEX }}>
          <span>正在训练 channels 表的向量索引</span>
          <span>{Math.floor(percent)}%</span>
        </div>
      </div>

      <StyledAlert
        $primaryColor={HEX}
        icon={<ThunderboltOutlined />}
        showIcon
        style={{ backgroundColor: `${HEX}10`, borderColor: `${HEX}30` }}
        message="向量训练会基于表结构和字段注释生成向量索引，用于自然语言查询时的相关性匹配"
        description={
          <ul className="list-disc pl-4 mt-2 text-slate-600">
            <li>训练前请确保已同步元数据</li>
            <li>表注释 / 自定义注释越详细，向量召回越准</li>
            <li>训练耗时与表数量、字段数有关，建议批量训练</li>
            <li>已训练的表会被标记，下次只训练增量变更</li>
          </ul>
        }
      />

      {/* 统计 */}
      <Descriptions column={3} layout="vertical" bordered size="small" className="mt-3">
        <Descriptions.Item label="已训练表数">2</Descriptions.Item>
        <Descriptions.Item label="待训练表数">4</Descriptions.Item>
        <Descriptions.Item label="训练进度">33%</Descriptions.Item>
      </Descriptions>

      {/* 测试检索 */}
      <Card title="测试向量检索" size="small" className="mt-4">
        <Form layout="vertical">
          <Form.Item name="testQuestion" label="测试问题" required>
            <Input placeholder="输入问题，例如：本月销售额 Top 10 的产品" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>开始测试</Button>
        </Form>
      </Card>
    </Card>
  );
}

/**
 * 玻璃质感进度条 · 还原 components/indicators/sage/crystal-progress-bar
 * 4 层视觉叠加：底色 → 上半反光 → 主体 + 45° 30×30 白条纹 → 倾斜流光 + 尾光点
 */
function CrystalProgress({ percent, color, rgb }: { percent: number; color: string; rgb: string }) {
  return (
    <div
      style={{
        height: 10,
        width: '100%',
        background: `${color}10`,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
        ['--c' as 'opacity']: rgb,
      } as React.CSSProperties}
    >
      {/* 上半反光 */}
      <span style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.20), transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />
      {/* 主体填充 */}
      <div
        style={{
          height: '100%', width: `${percent}%`,
          background: color,
          backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
          backgroundSize: '30px 30px',
          borderRadius: 20,
          transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          position: 'relative',
          animation: 'sv-cry-stripes 1s linear infinite, sv-cry-pulse 2s infinite ease-in-out',
        }}
      >
        {/* 倾斜流光 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
          transform: 'translateX(-150%) skewX(-15deg)',
          animation: 'sv-cry-shimmer 1.5s infinite',
        }} />
        {/* 尾端光点 */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, right: 0,
          width: 6, background: '#fff',
          boxShadow: '0 0 10px 2px #fff',
          borderRadius: '0 20px 20px 0',
          opacity: 0.8,
        }} />
      </div>
    </div>
  );
}
