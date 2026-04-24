import { ConfigProvider, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { PreviewFrame } from '../../_layout';

const ADMIN_PAGINATION = {
  defaultPageSize: 10,
  showSizeChanger: true,
  showQuickJumper: true,
  pageSizeOptions: ['10', '15', '20', '50'],
  showTotal: (total: number) => `共 ${total} 条`,
  size: 'small' as const,
  style: { paddingRight: 16 },
  locale: {
    jump_to: '跳至',
    page: '页',
    items_per_page: '条/页',
  },
};

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

function AdminTable<T extends object>(props: TableProps<T>) {
  return (
    <ConfigProvider theme={ADMIN_THEME}>
      <Table<T>
        size="small"
        bordered={false}
        {...props}
        className={`[&_.ant-table]:!border-0 [&_.ant-table-container]:!border-0 [&_.ant-table-cell]:!border-inline-end-0 [&_.ant-table-row:hover>*]:!bg-slate-50/80 [&_.ant-table-row-selected>*]:!bg-slate-100/60 [&_.ant-table-expanded-row>*]:!bg-slate-50/50 ${props.className || ''}`}
        pagination={
          props.pagination === false
            ? false
            : { ...ADMIN_PAGINATION, ...(typeof props.pagination === 'object' ? props.pagination : {}) }
        }
      />
    </ConfigProvider>
  );
}

type Row = {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'draft';
  owner: string;
  createdAt: string;
};

const STATUS_META: Record<Row['status'], { label: string; color: string }> = {
  online: { label: '已上线', color: 'green' },
  offline: { label: '已下线', color: 'default' },
  draft: { label: '草稿', color: 'blue' },
};

const DATA: Row[] = Array.from({ length: 10 }, (_, i) => {
  const statuses: Row['status'][] = ['online', 'draft', 'offline'];
  const owners = ['张三', '李四', 'Alice', 'Bob', 'Carol'];
  return {
    id: `SK-${(1001 + i).toString()}`,
    name: `示例技能 ${i + 1}`,
    status: statuses[i % 3],
    owner: owners[i % owners.length],
    createdAt: `2026-04-${(10 + i).toString().padStart(2, '0')} 09:${(i * 7) % 60}`.padEnd(16, '0'),
  };
});

const columns = [
  { title: '编号', dataIndex: 'id', key: 'id', width: 100 },
  { title: '名称', dataIndex: 'name', key: 'name' },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (s: Row['status']) => <Tag color={STATUS_META[s].color}>{STATUS_META[s].label}</Tag>,
  },
  { title: '所有者', dataIndex: 'owner', key: 'owner', width: 120 },
  { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', width: 180 },
  {
    title: '操作',
    key: 'action',
    width: 120,
    render: () => (
      <span className="text-blue-500 hover:text-blue-400 cursor-pointer">编辑 · 删除</span>
    ),
  },
];

export default function AdminTablePreview() {
  return (
    <PreviewFrame bg="#f8fafc">
      <div style={{ maxWidth: 1100, margin: '0 auto', background: '#fff', padding: 24, borderRadius: 4 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 16px' }}>示例列表</h2>
        <AdminTable<Row> dataSource={DATA} rowKey="id" columns={columns} />
      </div>
    </PreviewFrame>
  );
}
