import { Drawer, Table, Tag } from 'antd';
import { allTagEntries, tagI18n, tagGroupLabel, typeLabel } from '../utils/taxonomy';

const groupColor: Record<string, string> = {
  aesthetic: 'blue',
  mood: 'purple',
  stack: 'geekblue',
};

const typeDescription: Record<string, string> = {
  product:
    'Products（产品）：一个完整的网站/应用聚合 — 绑定一个 Style + 若干 Pages / Blocks / Components / Tokens。',
  style: 'Styles（风格）：整套设计语言。',
  page: 'Pages（页面）：可独立渲染的整页样板。',
  block: 'Blocks（模块）：页面里可复用的 section。',
  component: 'Components（组件）：单一可复用的交互原子。',
  token:
    'Tokens（原语）：没有交互形态的设计资源（调色板、字体对、动效、边框…）。',
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
        真相字典在 skill 的 <code>assets/taxonomy.json</code>，新增 tag 改那里即可。
      </p>

      <section className="mb-6">
        <h3 className="mb-2 text-[13px] font-semibold text-slate-700">层级（type）</h3>
        <Table
          size="small"
          pagination={false}
          rowKey="en"
          dataSource={Object.entries(typeLabel).map(([en, zh]) => ({
            en,
            zh,
            desc: typeDescription[en] ?? '',
          }))}
          columns={[
            {
              title: 'English',
              dataIndex: 'en',
              width: 110,
              render: (v: string) => (
                <code className="text-[12px] text-slate-500">{v}</code>
              ),
            },
            {
              title: '中文',
              dataIndex: 'zh',
              width: 70,
              render: (v: string) => <b>{v}</b>,
            },
            {
              title: '说明',
              dataIndex: 'desc',
              render: (v: string) => (
                <span className="text-[12px] leading-relaxed text-slate-600">{v}</span>
              ),
            },
          ]}
        />
      </section>

      {(['aesthetic', 'mood', 'stack'] as const).map((g) => (
        <section key={g} className="mb-6">
          <h3 className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-slate-700">
            <Tag color={groupColor[g]} bordered={false}>
              {tagGroupLabel[g]}
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
