import { useState } from 'react';
import { Alert, Button, Card, ConfigProvider, Form, Input, Progress, Steps, Table, Tag } from 'antd';
import { ArrowLeft, CheckCircle, Cloud, Database, Plus, Search, Settings, Trash2, Zap } from 'lucide-react';
import { PreviewFrame } from '../../../_layout';

const HEX = '#10b981';
const SAGE_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

export default function DataSourceDetailTabsPage() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState<{ percent: number; current: string } | null>({ percent: 32, current: '正在同步 orders 表元数据...' });

  return (
    <PreviewFrame bg="rgb(248,250,252)" padded={false}>
      <ConfigProvider theme={{ token: { fontFamily: SAGE_FONT, colorPrimary: HEX, borderRadius: 8 } }}>
        <div style={{ height: '100%', minHeight: 720, padding: 24, overflow: 'auto', fontFamily: SAGE_FONT }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Button type="text" icon={<ArrowLeft size={16} />} />
              <Database size={20} color={HEX} />
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: '#1e293b' }}>杭州数据库</h2>
              <Tag color="blue">MySQL</Tag>
            </div>
          </div>

          <Card>
            <Steps
              current={step}
              onChange={setStep}
              items={[
                { title: '连接信息', icon: <Cloud size={16} /> },
                { title: '元数据', icon: <Database size={16} /> },
                { title: '向量训练', icon: <Zap size={16} /> },
              ]}
            />

            <div style={{ marginTop: 24 }}>
              {step === 0 && <ConnectionStep />}
              {step === 1 && <MetadataStep progress={progress} setProgress={setProgress} />}
              {step === 2 && <VectorStep />}
            </div>
          </Card>
        </div>
      </ConfigProvider>
    </PreviewFrame>
  );
}

function ConnectionStep() {
  return (
    <Form layout="vertical">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Form.Item label="主机地址"><Input defaultValue="db-prod.hangzhou.aliyuncs.com" /></Form.Item>
        <Form.Item label="端口"><Input defaultValue="3306" /></Form.Item>
        <Form.Item label="用户名"><Input defaultValue="readonly_user" /></Form.Item>
        <Form.Item label="密码"><Input.Password defaultValue="••••••••••••" /></Form.Item>
        <Form.Item label="数据库名"><Input defaultValue="hangzhou_business" /></Form.Item>
        <Form.Item label="Schema"><Input defaultValue="public" /></Form.Item>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <Button icon={<CheckCircle size={14} />} type="default">测试连接</Button>
        <Button type="primary">保存</Button>
      </div>
    </Form>
  );
}

function MetadataStep({ progress, setProgress }: { progress: { percent: number; current: string } | null; setProgress: (p: any) => void }) {
  const tables = [
    { name: 'orders', comment: '订单主表', fields: 24, status: 'synced' },
    { name: 'order_items', comment: '订单明细', fields: 12, status: 'synced' },
    { name: 'products', comment: '产品主数据', fields: 18, status: 'synced' },
    { name: 'channels', comment: '销售渠道', fields: 6, status: 'syncing' },
    { name: 'refunds', comment: '退款', fields: 9, status: 'unsync' },
    { name: 'audit_logs', comment: '审计日志', fields: 15, status: 'unsync' },
  ];
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button icon={<Cloud size={14} />} type="primary">同步元数据</Button>
          <Button icon={<Plus size={14} />}>添加单表</Button>
        </div>
      </div>
      {progress && (
        <Alert
          type="info"
          showIcon
          message={
            <div>
              <div>{progress.current}</div>
              <Progress percent={progress.percent} size="small" status="active" />
            </div>
          }
          closable
          onClose={() => setProgress(null)}
          style={{ marginBottom: 16 }}
        />
      )}
      <Table
        size="middle"
        dataSource={tables}
        rowKey="name"
        pagination={{ pageSize: 10 }}
        columns={[
          { title: '表名', dataIndex: 'name', render: (n) => <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', color: HEX }}>{n}</span> },
          { title: '注释', dataIndex: 'comment' },
          { title: '字段数', dataIndex: 'fields', align: 'center', width: 100 },
          {
            title: '同步状态', dataIndex: 'status', width: 120, align: 'center',
            render: (s) => {
              const map: Record<string, [string, string]> = {
                synced: ['green', '已同步'],
                syncing: ['blue', '同步中'],
                unsync: ['default', '未同步'],
              };
              return <Tag color={map[s][0]}>{map[s][1]}</Tag>;
            },
          },
          {
            title: '操作', key: 'op', width: 120, align: 'center',
            render: () => (
              <div style={{ display: 'inline-flex', gap: 4 }}>
                <Button size="small" type="text" icon={<Settings size={14} />} />
                <Button size="small" type="text" icon={<Trash2 size={14} />} danger />
              </div>
            ),
          },
        ]}
      />
    </>
  );
}

function VectorStep() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button icon={<Zap size={14} />} type="primary">训练向量</Button>
          <Button icon={<Zap size={14} />}>仅训练未训练</Button>
        </div>
        <Button icon={<Search size={14} />}>向量测试</Button>
      </div>
      <Alert
        type="success"
        showIcon
        message="向量训练已完成，6 张表索引可用。"
        style={{ marginBottom: 16 }}
      />
      <div style={{
        padding: 24, borderRadius: 8,
        background: '#f8fafc', border: '1px solid #e2e8f0',
        textAlign: 'center', color: '#64748b',
      }}>
        点击「向量测试」可对当前数据源执行问题检索，验证模型是否能正确识别相关表 / 规则 / 预制 SQL
      </div>
    </>
  );
}
