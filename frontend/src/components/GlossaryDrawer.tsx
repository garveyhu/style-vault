import { Drawer, Table, Tag } from 'antd';
import { allTagEntries, tagI18n } from '../utils/tagI18n';
import { typeLabel } from '../utils/i18n';

const groupColor: Record<string, string> = {
  aesthetic: 'blue',
  mood: 'purple',
  theme: 'gold',
  stack: 'geekblue',
};

const groupLabel: Record<string, string> = {
  aesthetic: '风格',
  mood: '氛围',
  theme: '主题',
  stack: '技术栈',
};

export function GlossaryDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const entries = allTagEntries();

  return (
    <Drawer
      title="术语表 · 中英对照"
      open={open}
      onClose={onClose}
      width={520}
      className="glossary-drawer"
    >
      <p className="mb-4 text-[13px] text-slate-500 leading-relaxed">
        Skill 文件里存英文 tag（便于公网分享），网站显示按本对照表反显中文。
        新增 tag 前先在 <code>_tags.yaml</code> 加字典，再在本文件加中文。
      </p>

      <section className="mb-6">
        <h3 className="mb-2 text-[13px] font-semibold text-slate-700">层级（type）</h3>
        <Table
          size="small"
          pagination={false}
          rowKey="en"
          dataSource={Object.entries(typeLabel).map(([en, zh]) => ({ en, zh }))}
          columns={[
            {
              title: 'English',
              dataIndex: 'en',
              render: (v: string) => (
                <code className="text-[12px] text-slate-500">{v}</code>
              ),
            },
            {
              title: '中文',
              dataIndex: 'zh',
              render: (v: string) => <b>{v}</b>,
            },
          ]}
        />
      </section>

      {(['aesthetic', 'mood', 'theme', 'stack'] as const).map((g) => (
        <section key={g} className="mb-6">
          <h3 className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-slate-700">
            <Tag color={groupColor[g]} bordered={false}>
              {groupLabel[g]}
            </Tag>
            <span className="text-[12px] font-normal text-slate-400">
              {Object.keys(tagI18n[g]).length} 项
            </span>
          </h3>
          <Table
            size="small"
            pagination={false}
            rowKey="en"
            dataSource={entries.filter((e) => e.group === g)}
            columns={[
              {
                title: 'English',
                dataIndex: 'en',
                render: (v: string) => (
                  <code className="text-[12px] text-slate-500">{v}</code>
                ),
              },
              {
                title: '中文',
                dataIndex: 'zh',
                render: (v: string) => v,
              },
            ]}
          />
        </section>
      ))}
    </Drawer>
  );
}

export default GlossaryDrawer;
