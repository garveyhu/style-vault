import { useState } from 'react';
import { Alert, Button, Card, ConfigProvider, Form, Input, Progress, Space, Steps, Table, Tag, Typography } from 'antd';
import { CloudSyncOutlined, DatabaseOutlined, PlusOutlined, SaveOutlined, ThunderboltOutlined, CheckCircleOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { PreviewFrame } from '../../../_layout';

const { Title } = Typography;
const HEX = '#10b981';
const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

export default function DataSourceDetailTabsPage() {
  const [step, setStep] = useState(1);

  return (
    <PreviewFrame bg="rgb(248,250,252)" padded={false}>
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: HEX } }}>
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
            {step === 0 && (
              <Button type="primary" icon={<SaveOutlined />}>保存配置</Button>
            )}
          </div>

          {/* 三段式步骤指示 */}
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
            {step === 1 && <MetadataStep />}
            {step === 2 && <VectorStep />}
          </div>
        </div>
      </ConfigProvider>
    </PreviewFrame>
  );
}

function ConnectionStep() {
  return (
    <Card title={<span className="font-medium text-slate-700">连接信息</span>}>
      <Form layout="vertical">
        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="主机" required><Input defaultValue="db-prod.hangzhou.aliyuncs.com" /></Form.Item>
          <Form.Item label="端口" required><Input defaultValue="3306" /></Form.Item>
          <Form.Item label="用户名" required><Input defaultValue="readonly_user" /></Form.Item>
          <Form.Item label="密码" required><Input.Password defaultValue="••••••••••••" /></Form.Item>
          <Form.Item label="数据库名" required><Input defaultValue="hangzhou_business" /></Form.Item>
          <Form.Item label="Schema"><Input defaultValue="public" /></Form.Item>
        </div>
        <div className="flex gap-2">
          <Button icon={<CheckCircleOutlined />}>测试连接</Button>
          <Tag color="success">连接成功（latency 23ms）</Tag>
        </div>
      </Form>
    </Card>
  );
}

function MetadataStep() {
  const tables = [
    { name: 'orders', comment: '订单主表', fields: 24, status: 'synced' },
    { name: 'order_items', comment: '订单明细', fields: 12, status: 'synced' },
    { name: 'products', comment: '产品主数据', fields: 18, status: 'synced' },
    { name: 'channels', comment: '销售渠道', fields: 6, status: 'syncing' },
    { name: 'refunds', comment: '退款', fields: 9, status: 'unsync' },
    { name: 'audit_logs', comment: '审计日志', fields: 15, status: 'unsync' },
  ];
  return (
    <Card title={<span className="font-medium text-slate-700">元数据同步</span>}>
      <div className="flex justify-between mb-4">
        <Space>
          <Button type="primary" icon={<CloudSyncOutlined />}>同步元数据</Button>
          <Button icon={<PlusOutlined />}>添加单表</Button>
        </Space>
      </div>

      <Alert
        type="info"
        showIcon
        message={
          <div>
            <div>正在同步 channels 表元数据...（4/6）</div>
            <Progress percent={65} size="small" status="active" />
          </div>
        }
        closable
        className="mb-4"
      />

      <Table
        size="middle"
        dataSource={tables}
        rowKey="name"
        pagination={{ pageSize: 10, showSizeChanger: true }}
        rowSelection={{}}
        columns={[
          { title: '表名', dataIndex: 'name', render: n => <span className="font-mono" style={{ color: HEX }}>{n}</span> },
          { title: '注释', dataIndex: 'comment' },
          { title: '字段数', dataIndex: 'fields', align: 'center', width: 100 },
          {
            title: '同步状态', dataIndex: 'status', width: 120, align: 'center',
            render: s => {
              const map: Record<string, [string, string]> = {
                synced: ['green', '已同步'],
                syncing: ['blue', '同步中'],
                unsync: ['default', '未同步'],
              };
              return <Tag color={map[s][0]}>{map[s][1]}</Tag>;
            },
          },
          {
            title: '操作', key: 'op', width: 140, align: 'center',
            render: () => (
              <Space>
                <Button size="small" type="text" icon={<EyeOutlined />} />
                <Button size="small" type="text" icon={<DeleteOutlined />} danger />
              </Space>
            ),
          },
        ]}
      />
    </Card>
  );
}

function VectorStep() {
  return (
    <Card title={<span className="font-medium text-slate-700">向量训练</span>}>
      <Space className="mb-4">
        <Button type="primary" icon={<ThunderboltOutlined />}>全量训练</Button>
        <Button icon={<ThunderboltOutlined />}>仅训练未训练</Button>
        <Button>向量测试检索</Button>
      </Space>
      <Alert
        type="success"
        showIcon
        message="向量训练已完成，6 张表索引可用。"
        className="mb-4"
      />
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center text-slate-500">
        点击「向量测试检索」可对当前数据源执行问题检索，验证模型是否能正确识别相关表 / 规则 / 预制 SQL
      </div>
    </Card>
  );
}
