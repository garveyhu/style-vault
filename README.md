# Style Vault · 网站

**个人风格资产库 · 网站前端** · 浏览 / 筛选风格资产，复制 prompt 卡片分发到本地 AI 会话完成风格复刻。

---

## 三件套架构

style-vault 系统由三个相互协作的项目组成：

```mermaid
graph TB
    classDef read fill:#2B6CB0,stroke:#1E5090,stroke-width:2px,color:#fff
    classDef write fill:#48BB78,stroke:#38A169,stroke-width:2px,color:#fff
    classDef web fill:#ED8936,stroke:#C66A32,stroke-width:2px,color:#fff

    A["style-vault skill<br/>读 · 消费 + 分类字典"]:::read
    B["style-vault-sediment skill<br/>写 · 新增 / 修改 / 删除"]:::write
    C["style-vault web<br/>浏览 · 发现 · 分发 prompt"]:::web

    B ==>|运行时：读字典 + 查询| A
    B -.->|沉淀时：写 MD 条目| A
    B -.->|沉淀时：写 preview 组件| C
    C ==>|yarn sync：镜像 taxonomy + 扫描 references| A
```

| 项目 | 位置 | 作用 |
|---|---|---|
| **style-vault skill** | `~/.agents/skills/style-vault/` | AI 消费风格 + 查询分类字典 |
| **style-vault-sediment skill** | `~/.agents/skills/style-vault-sediment/` | AI 沉淀 / 修改 / 删除风格 |
| **style-vault web**（本仓） | `~/Coding/Archer/style-vault/` | 浏览网站 + prompt 卡片分发 |

---

## 本仓做什么

一个 **React 19 + Vite + TypeScript** 前端网站，功能：

- **浏览** —— 按粒度（6 层 × 3 平台）翻看所有资产
- **发现** —— 产品集、分类筛选、标签过滤、搜索
- **分发 prompt** —— 每条资产详情页都带"复制 prompt"卡片，粘到本地 AI 即可复刻
- **收藏** —— 登录后收藏喜欢的风格（后端账号体系）
- **Preview 预览** —— 每条非 token 资产都有 live preview 的 React 组件

## 典型用户流

```
浏览网站 → 找到喜欢的风格
       ↓
复制 prompt 卡片（含资产 id）
       ↓
粘贴到本地 Claude Code / AI 会话
       ↓
AI 装了 style-vault skill，读 MD + 合并 tokens → 产出代码
```

---

## 技术栈

- **前端**：React 19 + Vite + TypeScript + Tailwind CSS + Ant Design
- **路由**：React Router v7
- **状态**：React Context（Auth / Platform / Favorites）
- **预览渲染**：`src/preview/**/*.tsx` 动态加载，ResizeObserver 做封面等比缩放
- **数据源**：`src/data/registry.json` + `src/data/taxonomy.json` 都是 `yarn sync` 从 skill 仓生成的 build 产物

---

## 快速开始

```bash
cd frontend
yarn install
yarn sync      # 从 skill 仓同步 taxonomy + 所有资产条目
yarn dev       # http://localhost:5173
```

### 常用命令

```bash
yarn sync                # 重新从 skill 仓同步（加新条目后必跑）
yarn dev                 # 启动 dev server
yarn build               # 生产构建
yarn tsc --noEmit        # 类型检查
yarn test --run          # 单元测试
```

---

## 目录结构

```
style-vault/
├── README.md                           本文件
├── docs/
│   ├── plans/                          设计稿 + 实施计划（YYYY-MM-DD-<topic>-design.md）
│   └── mockups/                        UI 方案对比 HTML（归档用）
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── src/
│   │   ├── App.tsx                     路由入口
│   │   ├── pages/                      页面组件
│   │   ├── components/                 共享组件（TopBar / StyleCard / ...）
│   │   ├── contexts/                   全局状态（Platform 等）
│   │   ├── auth/                       认证 + 收藏
│   │   ├── data/
│   │   │   ├── registry.json           ← yarn sync 产出（不手改）
│   │   │   └── taxonomy.json           ← yarn sync 产出（不手改）
│   │   ├── preview/                    每条资产的 preview 组件（动态加载）
│   │   ├── utils/
│   │   │   └── taxonomy.ts             taxonomy.json 的 TS wrapper
│   │   └── services/                   API 客户端
│   ├── scripts/
│   │   └── sync-from-skill/            yarn sync 的实现（扫 skill → 产出 registry+taxonomy）
│   └── tests/
└── (可选)backend/                       用户账号 + 收藏的后端（本 repo 暂未包含）
```

---

## sync 机制

`yarn sync` 把 skill 仓当成**内容源头**，把本仓当成**渲染层**：

```
~/.agents/skills/style-vault/
  ├── assets/taxonomy.json           ──复制──→  frontend/src/data/taxonomy.json
  ├── references/**/*.md             ──扫描──→  frontend/src/data/registry.json
  └── （不做其它写入）
```

每条 MD 的 frontmatter + 正文被解析成 JSON，前端直接 import 消费。**手改 `registry.json` / `taxonomy.json` 会在下次 sync 被覆盖**——要改数据请改 skill 仓或用 `style-vault-sediment` skill。

---

## 与其它两件的关系

### 读 `style-vault` skill

每次 `yarn sync` 都会：
- 读 skill 的 `assets/taxonomy.json` 做分类字典
- 扫 skill 的 `references/**/*.md` 构建 registry
- 校验所有 MD 的 frontmatter 合法（tag / category / platform / theme 必须在 taxonomy 里）

### 被 `style-vault-sediment` skill 写入

用户沉淀时（且满足 `VAULT_OK` 条件）：
- sediment skill 会写 `frontend/src/preview/<id>.tsx`（新 preview 组件）
- 触发 `yarn sync` 验证
- 写入网站仓一个 commit（`feat(preview): add ...`）

`VAULT_OK` 的判定：`~/.agents/path.json` 里有 `"style-vault"` 字段指向本仓，且 `frontend/package.json` 有 `"style-vault-site": true` marker。

---

## 相关链接

- `~/.agents/skills/style-vault/` · 读 skill
- `~/.agents/skills/style-vault-sediment/` · 写 skill
- [docs/plans/](docs/plans/) · 历次设计稿 + 实施计划
- [docs/mockups/](docs/mockups/) · UI 方案对比稿归档

---

## 常见问题

**Q: 为什么 `registry.json` / `taxonomy.json` 不手写？**
A: 它们是 build 产物，唯一真相是 skill 仓的 MD 文件 + `assets/taxonomy.json`。每次 `yarn sync` 都会覆盖。

**Q: 新增一个风格要改哪里？**
A: **不要**直接在这里改。去触发 `style-vault-sediment` skill：新对话里说"沉淀 xxx"，它会指引你完成双仓改动 + 合规校验。

**Q: 分类标签怎么加新值？**
A: 编辑 `~/.agents/skills/style-vault/assets/taxonomy.json`（skill 仓），跑 `yarn sync`。前端会自动识别新值。

**Q: 为什么有 `data/registry.json` 又有 `data/taxonomy.json`？**
A: 两个职责：`taxonomy.json` 是**字典**（类型 / 分类 / tag / platform / theme 的枚举 + 中文 label），`registry.json` 是**数据**（所有资产条目的 frontmatter + 正文）。
