import { Button, ConfigProvider, Input, Select, Space, Table, Tag } from 'antd';
import type { ReactNode } from 'react';
import { PreviewFrame } from '../../_layout';

const ADMIN_THEME = {
  token: {
    colorPrimary: '#0f172a',
  },
  components: {
    Select: {
      optionSelectedBg: '#e2e8f0',
      optionSelectedColor: '#334155',
      optionActiveBg: '#f1f5f9',
      colorTextQuaternary: '#94a3b8',
      motionDurationMid: '0.2s',
    },
  },
};

interface AdminTableToolbarProps {
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  filters?: ReactNode;
  actions?: ReactNode;
}

const AdminTableToolbar = ({
  searchPlaceholder,
  onSearch,
  filters,
  actions,
}: AdminTableToolbarProps) => (
  <ConfigProvider theme={ADMIN_THEME}>
    <div className="flex items-center mb-3 gap-2">
      <div className="flex items-center gap-2">
        {onSearch && (
          <Input.Search
            placeholder={searchPlaceholder || '搜索...'}
            allowClear
            size="small"
            style={{ width: 180 }}
            onSearch={onSearch}
          />
        )}
        {filters}
      </div>
      {actions && <div className="flex items-center gap-2 ml-auto shrink-0">{actions}</div>}
    </div>
  </ConfigProvider>
);

type Row = { id: string; name: string; status: string; owner: string };

const DATA: Row[] = [
  { id: 'SK-1001', name: '示例技能 1', status: '已上线', owner: '张三' },
  { id: 'SK-1002', name: '示例技能 2', status: '草稿', owner: '李四' },
  { id: 'SK-1003', name: '示例技能 3', status: '已下线', owner: 'Alice' },
  { id: 'SK-1004', name: '示例技能 4', status: '已上线', owner: 'Bob' },
];

export default function ToolbarBarPreview() {
  return (
    <PreviewFrame bg="#f8fafc">
      <ConfigProvider theme={ADMIN_THEME}>
      <div style={{ maxWidth: 1100, margin: '0 auto', background: '#fff', padding: 24, borderRadius: 4 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 16px' }}>技能列表</h2>

        <AdminTableToolbar
          searchPlaceholder="搜索技能名称..."
          onSearch={() => {}}
          filters={
            <Space size="small">
              <Select
                size="small"
                style={{ width: 110 }}
                placeholder="状态"
                allowClear
                options={[
                  { label: '已上线', value: 'online' },
                  { label: '已下线', value: 'offline' },
                  { label: '草稿', value: 'draft' },
                ]}
              />
              <Input size="small" style={{ width: 110 }} placeholder="作者" />
            </Space>
          }
          actions={
            <Button type="primary" size="small">
              新建技能
            </Button>
          }
        />

        <Table<Row>
          size="small"
          bordered={false}
          dataSource={DATA}
          rowKey="id"
          pagination={false}
          columns={[
            { title: '编号', dataIndex: 'id', key: 'id', width: 100 },
            { title: '名称', dataIndex: 'name', key: 'name' },
            {
              title: '状态',
              dataIndex: 'status',
              key: 'status',
              width: 100,
              render: (s: string) => (
                <Tag color={s === '已上线' ? 'green' : 'default'}>{s}</Tag>
              ),
            },
            { title: '所有者', dataIndex: 'owner', key: 'owner', width: 140 },
          ]}
        />
      </div>
      </ConfigProvider>
    </PreviewFrame>
  );
}
