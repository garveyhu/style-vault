# Style Vault 扩容：Skill × 可视化网站 · 设计稿

> 日期：2026-04-23
> 范围：`~/.agents/skills/style-vault` 的重构升级 + 新建 `/Users/links/Coding/Archer/style-vault` 网站仓 + `~/.agents/path.json` 的链接字段
> 状态：设计已对齐，待进入 writing-plans 阶段

---

## 背景

`style-vault` 当前只沉淀组件级 `atoms / composites / tokens` 三桶，无法容纳"整站调性"、"页面样板"、"字体对"、"按钮变体"这类跨粒度资产。每开新项目仍需从零调教 UI 风格，复用成本高。

扩容目标：

1. **skill** 成为可分层、可扩展、能容纳从"整站 vibe"到"一条动效曲线"全粒度的风格库
2. **网站**（私有）作为可视化选型界面——浏览 → 筛选 → 一键复制 Prompt
3. **`~/.agents/path.json`** 作为两仓的软链接，skill 保持公开可分享，网站作为本地富消费层存在

---

## Ⅰ 分层结构

### 核心观念

分类从"并列的桶"改为 **单一 scope 栈（大→小）+ 正交 tag 维度**：
- **Scope 是目录**——覆盖多大的上下文
- **aesthetic / mood / theme / stack 是 tag**——写在 frontmatter，不占目录

### 五层 + 每层二级目录

```
references/
├── README.md                 分层说明 + 维护入口
├── _tags.yaml                tag 字典（权威，sync 脚本校验）
│
├── vibes/                    【整站调性】
│   ├── _CATEGORY.md
│   ├── saas-tool/            工具型 SaaS / 开发者站
│   ├── marketing-brand/      品牌站 / 活动落地
│   ├── admin-console/        管理后台 / 控制台
│   ├── content-media/        媒体 / 博客 / 长文
│   ├── ecommerce-shop/       电商
│   ├── portfolio-studio/     个人 / 工作室
│   ├── community-social/     社区 / UGC
│   └── experimental/         实验 / 艺术
│
├── archetypes/               【页面样板】
│   ├── _CATEGORY.md
│   ├── landing/              营销落地 / hero 型
│   ├── dashboard/            看板 / 大屏
│   ├── list-table/           列表 / 管理表页
│   ├── detail/               详情页
│   ├── form-flow/            多步表单 / wizard
│   ├── auth/                 登录 / 注册 / OTP
│   ├── content-reader/       长文阅读
│   ├── settings/             设置 / 账号中心
│   ├── search-result/        搜索结果
│   ├── checkout/             结算 / 下单
│   ├── empty-error/          空态 / 404 / 500
│   └── pricing/              定价
│
├── composites/               【场景块】
│   ├── _CATEGORY.md
│   ├── display/              read-only 展示（table / card-grid / kanban / timeline...）
│   ├── entry/                录入（form / stepper / inline-edit / filter-panel / upload）
│   ├── nav/                  导航（sidebar / topbar / breadcrumb / tabs / command-palette / footer）
│   ├── feedback/             overlay / 反馈（toast / dialog / drawer / empty-state / skeleton）
│   ├── layout/               容器 / 骨架（page-shell / two-column / split-view / toolbar-bar / modal-shell）
│   ├── editor/               富编辑（rich-text / code-editor / markdown-split）
│   ├── media/                多媒体（gallery / video / carousel）
│   ├── social/               社交（comment-thread / reaction-bar / mention-input）
│   ├── marketing/            营销块（hero / feature-grid / pricing-table / logo-wall / testimonial / cta-banner）
│   └── commerce/             电商块（product-card / cart-summary / price-tag / checkout-steps）
│
├── atoms/                    【原子件】
│   ├── _CATEGORY.md
│   ├── buttons/              含任何按钮变体
│   ├── inputs/               input / textarea / search / otp / password
│   ├── selects/              select / combobox / multi-select / date / time
│   ├── toggles/              switch / checkbox / radio / segmented
│   ├── tags-badges/          tag / badge / chip / pill / status-dot
│   ├── overlays/             tooltip / popover / menu-item
│   ├── indicators/           spinner / progress-bar / skeleton-atom / stepper-dot
│   ├── avatars-icons/        avatar / icon-button / logo-mark
│   └── typography-atoms/     heading / code-inline / kbd / link-styled / quote
│
└── primitives/               【设计原语】
    ├── _CATEGORY.md
    ├── palettes/             色板
    ├── typography/
    │   ├── fonts/            单个字体档案
    │   ├── pairs/            字体搭配
    │   └── scales/           字阶
    ├── spacing/              间距节奏
    ├── radius/               圆角阶
    ├── shadow/               阴影系统
    ├── motion/               动效曲线与时长
    ├── border/               边框语言
    ├── gradient/             渐变预设
    ├── texture/              背景纹理
    ├── iconography/          图标体系
    ├── focus-ring/           focus-visible 方言
    └── cursor/               自定义光标
```

### 层间职责边界

| 层 | 一条资产 = | 能引用 | 被谁引用 |
|---|---|---|---|
| **vibes** | 一整个网站该长什么样 | 所有下层 | 无 |
| **archetypes** | 一整个页面的骨架与节奏 | composites / atoms / primitives | vibes |
| **composites** | 一个功能块 | atoms / primitives | vibes / archetypes |
| **atoms** | 一个独立元素 | primitives | composites / archetypes / vibes |
| **primitives** | 一组设计变量 | 无 | 所有上层 |

分界判据："**能不能独立复用**"——按钮脱离 vibe 单独用 → `atoms/`；色板可被 10 个 vibe 复用 → `primitives/palettes/`；页面结构+配色+字体绑死 → `vibes/`；页面结构但色字可换 → `archetypes/`。

### 成长规则

- 二级桶 **<5 条**时保持扁平
- **≥6 条**且出现明显子类时再拆三级
- 子类名**总是角色**（`buttons/solid/`、`buttons/ghost/`），不按美学拆

---

## Ⅱ 数据模型

### 职责切分

| 内容 | 仓 | 路径 |
|---|---|---|
| frontmatter + 描述 + token JSON + 代码片段 + prompt 片段 | **skill**（公开） | `references/…` |
| 真实可跑的 React 预览页 | **网站**（私有） | `frontend/src/preview/…` |
| 聚合后的前端消费元数据 | **网站** | `frontend/src/data/registry.json`（sync 产物，commit） |

skill 只存 `.md`，无 React 依赖；外部用户 clone skill 就能在消费模式用起来。

### ID 约定：路径即 ID

从 `references/` 起，不含扩展名。

| 类型 | ID 例子 | 对应文件 |
|---|---|---|
| 文件夹条目（vibe / archetype） | `vibes/saas-tool/cold-industrial-saas` | `references/vibes/saas-tool/cold-industrial-saas/README.md` |
| 文件条目（composite / atom / primitive） | `composites/display/table` | `references/composites/display/table.md` |
| 深层 primitive | `primitives/typography/pairs/ibm-plex-duo` | `references/primitives/typography/pairs/ibm-plex-duo.md` |

### Frontmatter 规范（统一）

```yaml
---
id: vibes/saas-tool/cold-industrial-saas
type: vibe                                 # vibe|archetype|composite|atom|primitive
name: Cold Industrial SaaS
description: 冷感留白、几何切割、无圆角的工具型 SaaS 基调
tags:
  aesthetic: [minimal, industrial]
  mood: [cold, serious]
  theme: [dark, light]
  stack: [react-antd-tailwind]
uses:
  - primitives/palettes/slate-cyan-ice
  - primitives/typography/pairs/ibm-plex-duo
  - atoms/buttons/ghost-button
preview: /preview/vibes/saas-tool/cold-industrial-saas
---
```

**各层必填差异：**

| 层 | `preview` | `uses` | 其他 |
|---|---|---|---|
| vibe | 必填 | ≥1 个 primitive | — |
| archetype | 必填 | 可空 | — |
| composite | 建议填 | 可空 | — |
| atom | 可选 | 通常引 primitive | — |
| primitive | 不填 | 不填 | 正文必须含机器可读 tokens JSON 块 |

**`uses` 仅向下；`usedBy` 反向索引由 sync 计算，不手写。**

### 正文章节（统一模板）

```markdown
# 名称
> 一句话定位

## 视觉特征
## Tokens        （primitive 必有；其他层仅本层自定义部分）
## 核心代码
## 适配指南       （可替换点 / CSS 变量注入口 / ADAPT 注释）
## 反模式 / 禁忌
## 引用关系       （sync 自动生成，frontmatter 为准）
```

### Tag 字典 `_tags.yaml`

```yaml
aesthetic: [minimal, maximal, brutalist, editorial, glass, neumorph, claymorph, bento, retro, organic, industrial, playful, luxe, raw]
mood:      [cold, warm, serious, playful, calm, energetic, dark-academia]
theme:     [light, dark]
stack:     [react-antd-tailwind, html-tailwind, shadcn-radix, vanilla-css]
```

条目 frontmatter 里用到的值必须在字典中。新值必须先改 `_tags.yaml`。

### Registry Schema

```typescript
type RegistryItem = {
  id: string;
  type: 'vibe' | 'archetype' | 'composite' | 'atom' | 'primitive';
  name: string;
  description: string;
  tags: {
    aesthetic: string[];
    mood: string[];
    theme: ('light' | 'dark')[];
    stack: string[];
  };
  uses: string[];
  usedBy: string[];              // sync 计算
  preview?: string;
  hasPreviewFile: boolean;       // sync 校验
  skillPath: string;             // "看代码"锚点
  tokens?: object;               // 仅 primitive
};

type Registry = {
  version: string;               // sync 时间戳
  items: RegistryItem[];
  tagDict: { aesthetic: string[]; mood: string[]; theme: string[]; stack: string[] };
};
```

`registry.json` **提交进网站仓**，保证不跑 sync 也能冷启动。

### 网站前端结构

```
frontend/src/
├── App.tsx                     路由外壳 + 顶部栏
├── data/registry.json          sync 产物（committed）
├── pages/
│   ├── BrowsePage.tsx          左侧 tag 筛选 + 中部卡片网格
│   ├── DetailPage.tsx          /item/<id>：描述 + iframe + 视口切换 + Prompt 复制
│   └── NotInstalledPage.tsx    外部用户无 path.json 时的说明
├── preview/                    每条风格一个独立路由的真实 React 页
│   ├── vibes/…
│   ├── archetypes/…
│   ├── composites/…
│   ├── atoms/…
│   └── primitives/…            primitive 按类型特化渲染（色板=色卡、字体=字阶样张…）
├── components/
│   ├── StyleCard.tsx
│   ├── TagFilter.tsx
│   ├── PromptCopyButton.tsx
│   └── ViewportSwitcher.tsx
└── utils/prompt.ts             Prompt 模板
```

### Prompt 复制模板

```
使用 style-vault skill 生成下面的需求。

主体: <type>: <id>
tags: aesthetic=[…], mood=[…], theme=[…], stack=[…]

（如需叠加）
叠加: <type>: <id>

请先 read 下面文件：
- ~/.agents/skills/style-vault/references/<id>.md
（以及 uses 里引用的各条）

具体需求 ↓
```

---

## Ⅲ `/style-vault` 工作流

### path.json 字段

```json
{
  "spechub": "/Users/links/Coding/A-complex/ikt/skills/spechub",
  "style-vault": "/Users/links/Coding/Archer/style-vault"
}
```

读法：

```bash
VAULT=$(jq -r '."style-vault" // empty' ~/.agents/path.json 2>/dev/null)
if [[ -z "$VAULT" || ! -d "$VAULT/frontend" ]]; then
  VAULT_OK=false
elif ! grep -q '"style-vault-site": true' "$VAULT/frontend/package.json" 2>/dev/null; then
  VAULT_OK=false    # 目录像但不是本网站仓
else
  VAULT_OK=true
fi
```

### 两种模式

| 模式 | 触发 | 读 path.json |
|---|---|---|
| **沉淀 (Maintenance)** | `/style-vault`；"沉淀 / 存一下 / 加到 vault" | 读 |
| **消费 (Consumption)** | "用 xxx 风格"；Prompt 卡片含 `使用 style-vault skill` | 不读 |

消费模式完全独立于网站，外部 clone skill 即可用。

### 沉淀流程（10 步）

1. **定位主体** — 从上下文识别；模糊则一次一问
2. **归类** — 读 `_CATEGORY.md`；用分界判据决定 scope + 二级桶
3. **生成 ID = 路径** — kebab-case；冲突则加后缀
4. **Tag 校验** — 对照 `_tags.yaml`；新 tag 先改字典
5. **写 skill 条目** — frontmatter + 正文；primitive 强制带 tokens JSON 块
6. **处理 uses 悬空引用** — 列出不存在的 ID；问"一起沉 / 先放着"（允许 warning 通过）
7. **path.json 分叉** — VAULT_OK=false → 跳 9；VAULT_OK=true → 进 8
8. **网站侧**
   - 按层级模板创建 `frontend/src/preview/<id>.tsx`
   - 跑 `yarn sync`（重建 `registry.json` + 校验）
   - 校验失败则停，不 commit
9. **双仓独立 commit**
   - skill 仓：`feat(<type>): add <id>`
   - 网站仓：`feat(preview): add <id>`
   - 仅 commit 不 push
10. **行动摘要** — ID / 路径 / tag / 两 commit hash；提示"切到 $VAULT/frontend 跑 yarn dev 查看"

### 消费流程（5 步）

1. 解析 Prompt 里的 ID（主体 + 叠加）
2. Read `~/.agents/skills/style-vault/references/<id>.md`
3. 递归 Read `frontmatter.uses` 里的每个 ID
4. 合并规格，按"反模式 / 禁忌"做负向过滤
5. 生成代码

不写入 skill，不读 path.json，不进网站。

### Preview 模板（按层级差异化）

| 层 | 模板内容 |
|---|---|
| vibe | hero + feature grid + 缩略 table，展示整站调性 |
| archetype | 对应页面骨架 |
| composite | 单块居中，带真实数据 mock |
| atom | 单体居中 + 3~5 种状态并列 |
| primitive.palette | 色卡 / 对比测试 / 暗明模式对照 |
| primitive.typography | 字阶样张 / 字重对比 / 真实文案 |
| primitive.motion | 可触发的动效演示 |
| 其他 primitive | 专门化渲染 |

### 容错矩阵

| 情况 | 动作 |
|---|---|
| `~/.agents/path.json` 不存在 | 只更 skill；提示加字段 |
| 有 path.json 但无 `style-vault` 字段 | 同上 |
| 字段值目录不存在 | 只更 skill；警告字段失效，问是否清掉 |
| 目录存在但无 `"style-vault-site": true` marker | 拒写，报错 |
| skill 已改 / 网站 sync 失败 | 回滚网站侧未 commit 改动；skill 改动保留但不 commit；提示修复后重跑 |
| 两仓都 commit 成功 / registry 事后发现问题 | 报告差异，用户决定 revert / 修 |
| 外部用户（只 clone skill） | VAULT_OK=false，整流程走 skill 分支，无感 |
| 用户手改网站 preview 未反映回 skill | sync 反向 orphan warning（不自动删） |
| 并发 `/style-vault` | 检测 `$VAULT/.style-vault-lock`，存在则拒启 |

### 不自动做的事

- **不自动起 dev server**——生命周期归用户
- **不自动 push**——skill / 网站的 push 由用户决定
- **不自动删 orphan**——永远先 warning

### SKILL.md 新骨架

```
---
name: style-vault
description: … Triggers: "/style-vault", "沉淀风格", "用 style-vault 里的 xxx", …
---

# Style Vault

## 两种模式
1. 沉淀 (Maintenance)：触发条件 / 10 步流程
2. 消费 (Consumption)：触发条件 / 5 步流程

## 分层与归类判据
（引用 references/_CATEGORY.md）

## ID 约定 / Frontmatter 规范 / Tag 字典
（指向 references/_tags.yaml）

## 网站联动
（path.json 读法、VAULT_OK 分支、容错矩阵摘要）

## 维护指南
（预览模板位置、sync 脚本命令、常见错误）
```

---

## 关键决策记录

| 决策 | 选择 | 原因 |
|---|---|---|
| 风格粒度 | 三层都要（vibe / archetype / aesthetic），aesthetic 降级为 tag | 边界清晰、可叠加、tag 跨层复用 |
| 网站展示形式 | iframe 真实渲染 + 多视口切换 | 可玩性最高；字体和 reset CSS 的 hack 自然隔离 |
| preview 管理 | 同仓下的 React 路由 | 复用 Vite 和共享 primitives，比静态 HTML 更易演进 |
| Prompt 格式 | 指令小卡片（skill 手册式） | 短、稳；AI 消费前会 read skill 展开细节 |
| skill ↔ 网站 分工 | skill 只存 md（规格 / 代码片段）；网站存 preview.tsx | skill 保持公开可分享、零前端依赖 |
| ID 形态 | 路径即 ID | 无命名冲突；冗长但机器可解析 |
| `registry.json` | commit 进网站仓 | 冷启动免 sync；sync 覆写即同步 |
| 层级数量 | 5 层（vibe / archetype / composite / atom / primitive） | 容纳最大 & 最细粒度；tag 做正交维度补足 |
| 二级目录 | 每层按角色/场景预铺 | 避免"装满再拆"的混乱；`_CATEGORY.md` 规范边界 |

---

## 不包含的范围

以下内容**不在本次扩容范围**，未来再议：

- skill 消费侧的自动推荐（"根据 tag 推荐 vibe"）
- 跨项目的 vault 合并或订阅机制
- 网站上的私有草稿区 / 版本历史
- 移动端原生（iOS/Android）样式沉淀
- 自动从现网站截图反推沉淀条目

---

## 下一步

进入 `writing-plans` 生成逐步实施计划，至少覆盖：

1. skill 仓改造（重写 SKILL.md / 搬迁旧 atoms+composites / 建立 `_CATEGORY.md` 和 `_tags.yaml`）
2. 网站仓初始化（用 `website-creator` 起 React + Antd + Tailwind 骨架 + `"style-vault-site": true` marker）
3. `scripts/sync-from-skill.ts` 实现
4. 首条 vibe / archetype / composite / atom / primitive 的样板录入（一条一层，验证流程跑通）
5. `path.json` 字段写入 + 外部用户文档
