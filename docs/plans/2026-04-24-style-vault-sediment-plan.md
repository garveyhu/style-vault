# Style Vault Sediment Skill 实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 新建 `style-vault-sediment` skill 接管 style-vault 的全部写入操作（create / modify / delete），并瘦身现有 `style-vault` skill 为纯读 skill。

**Architecture:** 两个 skill 读写分离。新 skill 作为路由入口，按触发语分发到 create / modify / delete 三条主路径。Create 再细分 4 条 discovery 分支（本地项目 / 在线资源 / 从零创作 / 兜底），全部汇入共享主流程做批量写入 + 双仓聚合 commit。沉淀历史以 `plan.md` / `report.md` / `source.md` 形式版本化落盘到 `assets/sediment-history/<author>/<date-topic>/`。

**Tech Stack:** Markdown（skill 定义）· Python（taxonomy 查询工具扩展）· Bash（同步钩子）· 无新依赖

**Repos Affected:**
- Primary: `~/.agents/skills/` （skill 仓，main 分支）— 新增 `style-vault-sediment/` + 瘦身 `style-vault/SKILL.md`
- Secondary: 无。Phase 4 的 taxonomy.py 改动只在 skill 仓（网站仓的 taxonomy.py 不存在——网站仓只有 sync 脚本）

**Design Doc:** `docs/plans/2026-04-24-style-vault-sediment-design.md`

**Commit Convention:** Angular 风格中文 subject，footer 追加 `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`。skill 仓 commit 格式：`feat(style-vault-sediment): ...` 或 `refactor(style-vault): ...`

---

## Phase 0 · 瘦身旧 `style-vault/SKILL.md`

**目标**：删除写入相关章节，保留纯消费视角，插入对新 skill 的路由提示。非破坏性——旧 skill 功能（消费 + 查询）完全保留。

### Task 0.1 · 审读当前 SKILL.md 并规划改动

**Files:**
- Read: `~/.agents/skills/style-vault/SKILL.md`

**Step 1: 通读全文并列出章节清单**

命令：
```bash
grep -n '^## \|^### ' ~/.agents/skills/style-vault/SKILL.md
```
期望输出：每个章节的行号 + 标题。

**Step 2: 把章节按"保留 / 删除 / 新增"分类**

保留：
- frontmatter（只保留消费相关 triggers）
- "六层结构"
- "两种工作模式"改为"读/写分工提示"（沉淀部分指向新 skill）
- "消费模式（Consumption，5 步）"
- "分类探索工具"
- "Frontmatter 最小示例"
- "术语速查"
- "入口索引"

删除：
- "沉淀模式（Maintenance，10 步）"整节
- "沉淀 Checklist"整节
- "常见错误"里的沉淀相关条目（保留消费相关的）
- "维护原则"里的写入相关条目

新增：
- 在"两种工作模式"之后插入一节"**沉淀请调 style-vault-sediment**"，列出触发词路由到新 skill 的说明

**Step 3: 记录改动范围**

作为 scratch 笔记写到 `/tmp/skill-trim-plan.md`（临时文件，不 commit），供后续任务参照。

### Task 0.2 · 删除写入相关章节

**Files:**
- Modify: `~/.agents/skills/style-vault/SKILL.md`

**Step 1: 删除"沉淀模式（Maintenance，10 步）"整节**

从章节标题 `## 沉淀模式（Maintenance，10 步）` 开始，直到下一个 `##` 章节之前，整段删除。

**Step 2: 删除"沉淀 Checklist"整节**

同样的处理。

**Step 3: 裁剪"常见错误"**

保留这些（消费相关）：
- 消费去网站拉资产
- 合并 tokens 时没按层级覆盖顺序
- 文件夹式条目 id 填了路径但文件名不对
- 跨层错误引用（consumer 视角）

删除这些（写入相关）：
- 新条目写入后忘了跑 yarn sync
- frontmatter 里 tag 值不在字典
- primitive 没有 ## Tokens 块
- 沉淀模式跳过 tag 校验直接写
- 沉淀时把 mood 和 aesthetic 混用
- commit 把两个仓的改动写在一个 commit message 里

**Step 4: 裁剪"维护原则"**

保留（消费相关）：
- "消费模式禁止触发任何 commit / sync / 写入"
- skill 仓真实 git 根在 `/Users/links/.agents/skills/`

删除（写入相关）：
- 不自动起 dev server
- 不自动 push
- 不自动删 orphan
- 新 tag / category 先改 assets/taxonomy.json 再写条目
- 新二级桶先改对应层 _CATEGORY.md

**Step 5: 验证还能读**

命令：
```bash
wc -l ~/.agents/skills/style-vault/SKILL.md
```
期望：行数从 ~260 降到 ~150 以内。

### Task 0.3 · 新增对 sediment skill 的路由提示

**Files:**
- Modify: `~/.agents/skills/style-vault/SKILL.md`

**Step 1: 在"两种工作模式"章节的位置插入新节**

把原"两种工作模式"节整体替换为"**读/写分工**"节：

```markdown
## 读 / 写分工

本 skill 只负责**读**——消费资产 + 查询分类。**写入（新增 / 修改 / 删除风格）不在本 skill 处理**，请调 `style-vault-sediment` skill。

| 触发语 | 调哪个 skill |
|---|---|
| "用 xxx 风格" / 网站 prompt 卡片 / "参考 style-vault 里的 xxx" | **style-vault**（本 skill，走消费模式） |
| "沉淀" / "加到 vault" / "记录这套风格" / `/style-vault-sediment` | **style-vault-sediment** |
| "修改 <id>" / "删除 <id>" / "下掉 <id>" | **style-vault-sediment**（显式触发修改/删除） |

两 skill 硬依赖：`style-vault-sediment` 读 `style-vault/assets/taxonomy.json` 和 `style-vault/scripts/taxonomy.py`，安装时两个 skill 必须成对。
```

**Step 2: 在 frontmatter 的 description / triggers 里去掉沉淀意图词**

找到 SKILL.md 顶部的 YAML frontmatter，把写入触发语移走：

- 保留：`"用 xxx 风格"`、`"使用 style-vault skill"`、`"参考 style-vault 里的"`、组件样式/管理后台/落地页等前端生成场景
- 删除：`"/style-vault"`、`"沉淀"`、`"存一下样式"`、`"加到 vault"`、`"记录这个风格"`、`"保存这套样式"`

**Step 3: 检查入口索引**

找到"## 入口索引"节，确认链接仍有效：
- `references/README.md`（保留）
- `assets/taxonomy.json`（保留）
- `scripts/taxonomy.py`（保留）
- 各层 _CATEGORY.md（保留）

不要删除任何链接——读 skill 的入口索引应保留全部条目链接。

### Task 0.4 · 验证瘦身后的 SKILL.md

**Files:**
- Read: `~/.agents/skills/style-vault/SKILL.md`

**Step 1: 目视检查通读**

从头到尾读一遍，确认：
- 没有"沉淀"字样出现在非路由提示节
- 没有 "yarn sync" / "commit" / "path.json" 出现在任何章节（除了"读/写分工"的路由表里间接提及）
- 消费模式 5 步完整、可读

**Step 2: 统计行数**

```bash
wc -l ~/.agents/skills/style-vault/SKILL.md
```
期望：100–150 行。

**Step 3: 验证没有断链**

```bash
grep -oE '\]\(\S+\)' ~/.agents/skills/style-vault/SKILL.md | sort -u
```
对每个引用的文件手工 ls 一遍，确认都存在。

### Task 0.5 · Commit Phase 0

**Step 1: Review 改动**

```bash
git -C ~/.agents/skills diff style-vault/SKILL.md | head -80
```

**Step 2: Commit**

```bash
git -C ~/.agents/skills add style-vault/SKILL.md
git -C ~/.agents/skills commit -m "$(cat <<'EOF'
refactor(style-vault): 瘦身为纯读 skill，沉淀路由到 sediment skill

写入操作全部下放到新的 style-vault-sediment skill。本次改动：
- 删除"沉淀模式（Maintenance，10 步）"及 Checklist
- 从"常见错误"和"维护原则"移除写入相关条目
- 新增"读/写分工"章节，含触发词路由表
- frontmatter triggers 去掉沉淀意图词

消费模式 5 步 + 分类探索工具 + 术语速查 + 入口索引保持不变。

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase 1 · `style-vault-sediment` skill 骨架

**目标**：创建新 skill 的目录结构和顶层路由 SKILL.md，不展开各 workflow 细节（留到 Phase 2/3）。

### Task 1.1 · 建目录

**Step 1: 创建 skill 根和子目录**

```bash
mkdir -p ~/.agents/skills/style-vault-sediment/{references,assets/sediment-history,scripts}
```

**Step 2: 添加 .gitkeep 保证空目录入 git**

```bash
touch ~/.agents/skills/style-vault-sediment/assets/sediment-history/.gitkeep
touch ~/.agents/skills/style-vault-sediment/scripts/.gitkeep
```

**Step 3: 验证**

```bash
tree -L 3 ~/.agents/skills/style-vault-sediment
```
期望：
```
style-vault-sediment/
├── assets/
│   └── sediment-history/
│       └── .gitkeep
├── references/
└── scripts/
    └── .gitkeep
```

### Task 1.2 · 写顶层 SKILL.md

**Files:**
- Create: `~/.agents/skills/style-vault-sediment/SKILL.md`

**Step 1: 完整内容**

使用以下骨架（填入实际内容时以 design doc § 2 + § 9 为准）：

```markdown
---
name: style-vault-sediment
description: >
  写入类 skill：把风格沉淀到 style-vault（新增 / 修改 / 删除）。默认进入新增沉淀流程，
  支持 4 种起点（本地项目 / 在线资源 / 从零创作 / 兜底），按作者版本化记录沉淀历史。
  硬依赖 style-vault skill 作为分类字典源。
  Triggers: "/style-vault-sediment"、"沉淀"、"存一下样式"、"加到 vault"、"记录这个风格"、
  "修改 <id>"、"删除 <id>"、"下掉 <id>"、"调整已有的 xxx"、在完成风格创作后希望把它写入 vault 的场景。
---

# Style Vault Sediment

style-vault 的**写入端 skill**。全部新增 / 修改 / 删除操作都从这里进。

## 依赖声明

**硬依赖** `style-vault` skill：
- 读 `style-vault/assets/taxonomy.json`（分类字典真相源）
- 调 `style-vault/scripts/taxonomy.py`（查询 id / 反向引用 / tag 枚举）
- 引 `style-vault/references/README.md`（frontmatter 规范）

两 skill 必须成对安装。

## 入口路由

根据触发语判定操作模式，默认进 **create**。

| 触发情况 | 走的路径 |
|---|---|
| `/style-vault-sediment` 裸词 / "沉淀" / "加到 vault" | **默认 create**，见 [default-routing](#默认-create) |
| 描述里有项目路径 / cwd 提示 | create + [sediment-from-project](references/sediment-from-project.md) |
| 描述里有 URL / "截图" / "参考这个网站" | create + [sediment-from-web](references/sediment-from-web.md) |
| "想做一个 xxx 风格" / "从零" | create + [sediment-from-scratch](references/sediment-from-scratch.md) |
| 起点不明 | [sediment-from-other](references/sediment-from-other.md) |
| **"修改 <id>"** / **"改 <id> 的 tag"** / **"调整已有的 xxx"** | [modify-workflow](references/modify-workflow.md) |
| **"删除 <id>"** / **"下掉 <id>"** / **"移除 <id>"** | [delete-workflow](references/delete-workflow.md) |

## 默认 create

如果触发语没给起点，先问用户：

> 本次沉淀的起点是？
> 1) 本地项目路径（扫项目提取风格）
> 2) 在线资源（URL / 截图 / 设计稿）
> 3) 从零创作（有想法，要落成资产）
> 4) 其他 / 不确定

用户回复后路由到对应 `sediment-from-*.md`。

## 共享原则（所有路径都遵守）

- **写入前必须让用户 review 整批方案**（[shared-workflow 步骤 4](references/shared-workflow.md#步骤-4--整批-review)）
- **元信息 AI 自动填需一次性授权**（步骤 2），可选 Y / N / 逐条决定
- **双仓独立 commit，同一次沉淀各仓聚合为一个 commit**，不 push
- **沉淀报告是每次写入的收尾**，同时落盘到 `assets/sediment-history/`
- **分类字典以 style-vault/assets/taxonomy.json 为准**，新 category / tag 值必须先改字典再写条目

## 入口索引

- [共享主流程 shared-workflow.md](references/shared-workflow.md)
- [Create 分支一览](references/)
- 沉淀历史归档：`assets/sediment-history/<author>/<date-topic>/`
- 查询工具（读侧）：`style-vault/scripts/taxonomy.py`
```

**Step 2: 验证 frontmatter 语法**

```bash
head -20 ~/.agents/skills/style-vault-sediment/SKILL.md
```
确认 `---` 包裹的 YAML 合法。

### Task 1.3 · 写 references/README.md 索引

**Files:**
- Create: `~/.agents/skills/style-vault-sediment/references/README.md`

**Step 1: 内容**

```markdown
# style-vault-sediment · references

本目录按用户意图分文件：

## 共享主干（被所有路径共用）

- [shared-workflow.md](shared-workflow.md) · 8 步通用主流程：加载字典 → 授权 auto-fill → 生成方案 → 整批 review → path.json 分叉 → 逐条写入 → 聚合 commit → 沉淀报告

## Create 分支（按起点选一）

- [sediment-from-project.md](sediment-from-project.md) · 从本地项目路径提取
- [sediment-from-web.md](sediment-from-web.md) · 从 URL / 截图 / 设计稿提取
- [sediment-from-scratch.md](sediment-from-scratch.md) · 从零对话式创作
- [sediment-from-other.md](sediment-from-other.md) · 起点不明时的兜底路由

## 修改 / 删除（显式触发）

- [modify-workflow.md](modify-workflow.md) · 改已有条目的 frontmatter / 正文
- [delete-workflow.md](delete-workflow.md) · 删已有条目（含反向引用检查 + cascade）

## 如何查

- 按触发语查：见 [../SKILL.md#入口路由](../SKILL.md)
- 按共享原则查：见 [../SKILL.md#共享原则所有路径都遵守](../SKILL.md)
```

### Task 1.4 · Commit Phase 1

**Step 1: Review**

```bash
git -C ~/.agents/skills status
```

期望：
```
Untracked:
  style-vault-sediment/
```

**Step 2: Commit**

```bash
git -C ~/.agents/skills add style-vault-sediment/
git -C ~/.agents/skills commit -m "$(cat <<'EOF'
feat(style-vault-sediment): 骨架 · 路由 SKILL.md + 目录结构

新建 style-vault-sediment skill 的骨架（不含 workflow 细节，留给 Phase 2/3）：
- SKILL.md：触发语路由表 + 依赖声明 + 共享原则
- references/README.md：索引各 workflow 文件
- 目录：references/（待填）、assets/sediment-history/（空）、scripts/（预留）

硬依赖 style-vault skill，作为分类字典与查询工具的源。

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase 2 · `shared-workflow.md` + 4 条 create 分支

**目标**：把共享主流程和 4 条 create 路径全部落地。这是 skill 最大的一节。

### Task 2.1 · 写 shared-workflow.md

**Files:**
- Create: `~/.agents/skills/style-vault-sediment/references/shared-workflow.md`

**Step 1: 按 design doc § 4 写**

内容依据 design doc 第 4 节，展开 8 个步骤的细节。关键要点（必须覆盖）：

1. **步骤 1 · 加载分类字典**：调用 `~/.venvs/current/bin/python ~/.agents/skills/style-vault/scripts/taxonomy.py overview --json` 拿到当前所有合法 category/tag/platform/theme 值
2. **步骤 2 · 授权 auto-fill**：明示三选项 Y/N/逐条；给出 prompt 模板
3. **步骤 3 · 生成完整写入方案**：按依赖拓扑序（token → component → block → page → style → product），每条条目完整 frontmatter + 正文骨架
4. **步骤 4 · 整批 review**：预览文档格式（参考 design doc § 4 步骤 4 的示例），用户可单条增删改；**用户确认后立即落盘 plan.md**
5. **步骤 5 · path.json 分叉**：完整 bash 判定脚本（VAULT_OK），并发锁 `.style-vault-lock`
6. **步骤 6 · 逐条写入**：按拓扑序写；skill 仓 `references/<id>/README.md` 或 `references/<id>.md`；若 VAULT_OK=true 同时写网站仓 preview tsx；每条写完跑 `cd $VAULT/frontend && yarn sync` 做增量校验
7. **步骤 7 · 双仓聚合 commit**：commit message 模板 `feat(style-vault): add <主题> (N 条: A+B+C)` / `feat(preview): add <主题> preview (N 条)`；footer Co-Authored-By
8. **步骤 8 · 沉淀报告**：格式见 design doc § 6；同时落盘到 `assets/sediment-history/<author>/<date-topic>/report.md`；释放并发锁

**错误处理矩阵**（从 design doc § 9.1 抄）：
- 步骤 4 整批 reject → 放弃、不写、plan.md 不落盘
- 步骤 6 某条 sync 失败 → 停止后续、skill 侧保留、网站侧 git checkout 清理、plan.md 已落盘（步骤 4 后）保留
- 用户 Ctrl-C → 同 sync 失败
- 并发锁冲突 → 拒启

**作者 slug 初始化**（在步骤 5 之前加 substep）：
- 读 `~/.agents/skills/style-vault-sediment/assets/sediment-history/.author-config.json`
- 不存在则：从 `git config user.name` 推断 slug（小写 kebab）让用户确认
- user.name 为空则让用户手工输入
- 写入 `.author-config.json` 缓存

**Step 2: 验证完整性**

```bash
grep -c '^## 步骤' ~/.agents/skills/style-vault-sediment/references/shared-workflow.md
```
期望：8

**Step 3: 字数目测**

```bash
wc -l ~/.agents/skills/style-vault-sediment/references/shared-workflow.md
```
期望：300–500 行（这是最大的 reference 文件）

### Task 2.2 · 写 sediment-from-project.md

**Files:**
- Create: `~/.agents/skills/style-vault-sediment/references/sediment-from-project.md`

**Step 1: 按 design doc § 3.1 写**

必须覆盖：

- **输入解析**：如何接收项目路径（绝对或 cwd）
- **技术栈识别 checklist**：
  - `package.json` 读 dependencies / devDependencies
  - `tailwind.config.{js,ts,cjs,mjs}` 存在 → `html-tailwind` / `react-tailwind` / `react-antd-tailwind`
  - `node_modules/antd` 存在 → 含 antd
  - `shadcn-ui` 目录 → `shadcn-radix`
  - CSS 变量在 `:root` → 抽 token
- **Style 推断 checklist**：
  - 主色从 Tailwind config 或 :root CSS variables 读
  - 字体从 `font-family` 声明或 Google Fonts link 读
  - 密度从 `padding` / `font-size` 基线判
- **组件识别**：按文件名/导出名匹配（Button / Table / Card / Layout / Nav / ...）
- **层级反向归类表**：
  - `src/components/Button.tsx` → `components/buttons/<slug>`
  - `src/components/DataTable.tsx` → `blocks/display/<slug>`
  - `src/pages/Landing.tsx` → `pages/landing/<slug>`
  - `design-tokens.json` → `tokens/palettes/<slug>` + `tokens/typography/<slug>`
  - 整个项目作为一个产品 → `products/<project-slug>`
- **输出沉淀计划**：依赖拓扑序列表 + 每条标注来源文件路径
- **汇入共享主流程**：指向 [shared-workflow.md 步骤 2](shared-workflow.md)

**Step 2: 示例 walk-through**

加一节 `## 典型流程示例`，走一遍"分析 `~/Projects/acme-admin`"的完整步骤（假数据），让 AI 对这个流程有具象认知。

### Task 2.3 · 写 sediment-from-web.md

**Files:**
- Create: `~/.agents/skills/style-vault-sediment/references/sediment-from-web.md`

**Step 1: 按 design doc § 3.2 写**

必须覆盖：

- **输入形式 3 种**：
  - URL → 用 WebFetch 工具（或 Claude 原生 fetch）拉页面内容 + 视觉描述
  - 本地截图路径 → Claude 多模态直接读图
  - 粘贴的 HTML/截图 base64 → 降级处理
- **视觉分析 checklist**：
  - 主视觉色取值（顶部 hero / 主 CTA 按钮取色）
  - 字体识别（标题 / 正文 / mono）
  - 布局密度（留白 / 栅格 / 卡片间距）
  - 气质推断（冷 vs 暖、严肃 vs 俏皮）
- **实现代码生成**：强调"源码不可得，必须重写"——给 AI 提示重写时的参考规范（紧贴 style-vault 的 frontmatter + tokens 约定）
- **溯源落盘**：生成 `source.md` 模板，记录 URL / 访问时间 / 截图哈希 / 关键要点
- **汇入共享主流程**

**Step 2: 降级处理**

加一节 `## 常见降级`：
- WebFetch 失败 → 让用户手工粘贴内容或提供截图
- 截图模糊 → 要用户重传高清版本或直接描述
- 多页面混合（比如 Dribbble 多个 shot）→ 让用户指定主样本，其它作参考

### Task 2.4 · 写 sediment-from-scratch.md

**Files:**
- Create: `~/.agents/skills/style-vault-sediment/references/sediment-from-scratch.md`

**Step 1: 按 design doc § 3.3 写**

必须覆盖：

- **对齐阶段**（3–5 轮对话最多）：
  - 第一问：气质方向（冷 / 暖 / 俏皮 / 严肃）
  - 第二问：参考对标（"像 Linear、Notion、Vercel 还是…？"）
  - 第三问：技术栈（react-tailwind / react-antd-tailwind / …）
  - 第四问：主色 + 字体偏好
  - 第五问：目标产品类型（productivity / content / …）
- **Moodboard 输出**：对齐后 AI 给出结构化的"风格草图"——主色卡 + 字体对 + 2–3 行气质描述，让用户确认再推进
- **代码草案**：生成具体的 style + 1–2 个 block + 1 product 的完整 frontmatter + 正文骨架
- **迭代 exit 机制**：每轮后问"确认推进 / 再调 / 放弃"，三选一，避免无限迭代
- **汇入共享主流程**

**Step 2: 示范对话**

加一节 `## 示范对话`，写一段假对话："用户说想做一个'冷薄荷 SaaS'" → AI 走对齐 5 问 → 生成 moodboard → 用户微调 → 生成代码草案。

### Task 2.5 · 写 sediment-from-other.md

**Files:**
- Create: `~/.agents/skills/style-vault-sediment/references/sediment-from-other.md`

**Step 1: 按 design doc § 3.4 写**

必须覆盖：

- **反问逻辑**：
  - "是否有源码/项目路径可访问？" Y → 路由到 from-project
  - "是否有 URL 或截图可参考？" Y → 路由到 from-web
  - "是否只有想法/描述？" Y → 路由到 from-scratch
  - 都 N → 要求用户提供任一种入口才能推进
- **混合场景**：
  - "项目 + 参考网站"（扒项目骨架 + 参考网站改色）→ 先走 from-project 提取骨架，再进 shared-workflow 步骤 4 review 时手工加入参考网站的色板微调
  - "多个参考网站融合" → 挑主样本走 from-web，其它作辅助素材
- **无法归类**：直接说"暂不支持，请换一种入口"，不强行推进

### Task 2.6 · 作者配置模板

**Files:**
- Create: `~/.agents/skills/style-vault-sediment/assets/sediment-history/.author-config.example.json`

**Step 1: 模板内容**

```json
{
  "_comment": "本文件缓存本机作者 slug，用于 sediment-history 的文件夹命名。首次使用 skill 时自动生成。",
  "_example": {
    "author": "links",
    "configured_at": "2026-04-24T12:00:00Z",
    "source": "git-config | manual-input"
  }
}
```

**Step 2: 注意**

实际的 `.author-config.json` 不入 git（`.gitignore` 处理），只 commit `.example.json` 作为模板。

**Step 3: 加 .gitignore**

```bash
echo ".author-config.json" > ~/.agents/skills/style-vault-sediment/assets/sediment-history/.gitignore
```

### Task 2.7 · Commit Phase 2

**Step 1: Review**

```bash
git -C ~/.agents/skills status
git -C ~/.agents/skills diff --stat style-vault-sediment/
```

期望：
- 6 个新 markdown 文件
- 1 个 .author-config.example.json
- 1 个 .gitignore

**Step 2: Commit**

```bash
git -C ~/.agents/skills add style-vault-sediment/
git -C ~/.agents/skills commit -m "$(cat <<'EOF'
feat(style-vault-sediment): 填充共享主流程 + 4 条 create 分支

本次落地 create 模式的完整文档：
- shared-workflow.md：8 步主干（加载字典 / 授权 auto-fill / 生成方案 /
  整批 review / path.json 分叉 / 逐条写入 / 聚合 commit / 沉淀报告）
- sediment-from-project.md：本地项目反向归类六层资产
- sediment-from-web.md：URL / 截图视觉分析 + 重写代码 + 溯源
- sediment-from-scratch.md：对话式对齐 + moodboard + 代码草案 + exit 机制
- sediment-from-other.md：起点不明时的反问 + 混合场景指引
- assets/sediment-history/.author-config.example.json：作者配置模板
- assets/sediment-history/.gitignore：实际 .author-config.json 不入 git

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase 3 · modify + delete workflows

**目标**：落地 modify 和 delete 两条显式触发的路径。

### Task 3.1 · 写 modify-workflow.md

**Files:**
- Create: `~/.agents/skills/style-vault-sediment/references/modify-workflow.md`

**Step 1: 按 design doc § 5.1 写**

必须覆盖：

- **入口参数**：用户指定 id（模糊匹配通过 `taxonomy.py search --name` 反查）
- **支持的改动范围**（明确列出）：
  - frontmatter 字段：tags / category / platforms / theme / name / description / refs（product）/ uses / preview
  - 正文章节：视觉特征 / Tokens 代码块 / 核心代码 / 适配指南 / 反模式
  - 对应的 preview tsx（只在正文涉及组件重构时动）
- **不支持**：改 id（重命名）→ 明确拒绝，指向"删旧 + 建新"
- **流程 7 步**（简化版 shared-workflow）：
  1. 加载 taxonomy + 反查要改的条目（`taxonomy.py item <id>`）
  2. 展示当前条目全貌 + 问"改什么？"
  3. 生成**改动 diff**（frontmatter 表格对比 + 正文 unified diff）
  4. 整体确认 / 单项拒绝 / 再改（同 shared-workflow 步骤 4 风格）
  5. 执行改动（skill + web），跑 `yarn sync` 校验
  6. 双仓聚合 commit（`refactor(style-vault): modify <id>` + `refactor(preview): update <id> preview`）
  7. 沉淀报告（"改了什么"摘要）+ 落盘到 `sediment-history/<author>/YYYY-MM-DD-<id-slug>-modify/`
- **错误处理**：
  - 改了字典里没的 tag → 拒绝
  - sync 失败 → 回滚（skill 文件用 `git checkout` 恢复；网站 tsx 同理）

**Step 2: 边界情况**

加一节 `## 边界情况`：
- 改 `refs.style`（product 换底层 style）→ 允许，但要 sync 校验新 style 存在
- 改 tag 从 `minimal` 加 `organic` → 允许
- 改 `category` → 允许（只要新 slug 在 taxonomy.json）

### Task 3.2 · 写 delete-workflow.md

**Files:**
- Create: `~/.agents/skills/style-vault-sediment/references/delete-workflow.md`

**Step 1: 按 design doc § 5.2 写**

必须覆盖：

- **入口**：单条或批量 id
- **必做的反向引用检查**：
  - 调 `taxonomy.py item <id>` 读 `used_by`
  - 非空 → **默认拒绝**，列出所有引用方
  - 用户三选：先修引用者 / 退出 / 强删（"cascade"）
- **Cascade 语义明确**：
  - 把引用者里指向被删 id 的**那一条 ref** 清掉（只清一条不删引用者）
  - 例：删 `tokens/palettes/xxx`，引用它的 block `blocks/display/yyy` 的 frontmatter `refs.tokens.palette` 被清空
  - 引用者本身保留，只改它的 frontmatter
- **流程 8 步**：
  1. 加载 taxonomy
  2. 反向引用检查
  3. 若有引用者且用户选"退出" → 直接结束
  4. 整体确认（展示将删的文件清单 + cascade 会改哪些引用者）
  5. 执行删除（`rm` skill MD、`rm` 网站 tsx、cascade 时 patch 引用者 frontmatter）
  6. `yarn sync` 校验（确保 cascade 后没有悬空引用）
  7. 双仓聚合 commit（`feat(style-vault): remove <id>` + `feat(preview): remove <id> preview`）
  8. 沉淀报告 + 落盘到 `sediment-history/<author>/YYYY-MM-DD-<id-slug>-delete/`
- **常见错误**：
  - 删了但引用者没 cascade → sync 会报层级断链，回滚

**Step 2: 安全兜底**

加一节 `## 安全兜底`：
- 批量删除超过 3 条 → 强制二次确认（防手滑）
- cascade 改动超过 5 个引用者 → 强制二次确认
- 用户首次使用 cascade → 额外一句提示"cascade 会修改其它条目的 frontmatter，确认？"

### Task 3.3 · Commit Phase 3

**Step 1: Review**

```bash
git -C ~/.agents/skills status
```

**Step 2: Commit**

```bash
git -C ~/.agents/skills add style-vault-sediment/references/modify-workflow.md style-vault-sediment/references/delete-workflow.md
git -C ~/.agents/skills commit -m "$(cat <<'EOF'
feat(style-vault-sediment): modify / delete workflows

显式触发的修改和删除两条路径：

- modify-workflow.md：改 frontmatter / 正文 / 对应 preview。
  支持所有字段（除 id 重命名，语义为删旧+建新）。
  7 步流程：加载→review→diff→确认→执行→sync→commit+报告。

- delete-workflow.md：删单条或批量。
  必做反向引用检查（taxonomy.py item 读 used_by）；
  有引用者时默认拒绝，支持 cascade 语义（清引用者中指向被删 id 的那一条 ref）。
  8 步流程 + 安全兜底（批量>3 / cascade>5 二次确认）。

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase 4 · `taxonomy.py` 加 history 子命令

**目标**：给 `style-vault/scripts/taxonomy.py`（读 skill 的查询工具）加 `history` 子命令，读取 `style-vault-sediment/assets/sediment-history/`。

**Repo**：只改 skill 仓（`~/.agents/skills/style-vault/scripts/taxonomy.py`）。网站仓不涉及——它的 sync 脚本只读 taxonomy.json，不用 taxonomy.py。

### Task 4.1 · 实现 history 子命令

**Files:**
- Modify: `~/.agents/skills/style-vault/scripts/taxonomy.py`

**Step 1: 加 argparse 子命令定义**

在 `build_parser()` 函数里加：

```python
# history 相关（读 sediment skill 的沉淀历史）
ph = sub.add_parser("history", parents=[common], help="查询沉淀历史")
ph.add_argument("--author", help="过滤作者 slug")
ph.add_argument("--since", help="起始日期 YYYY-MM-DD")
ph.add_argument("--until", help="截止日期 YYYY-MM-DD")
ph.add_argument("show", nargs="?", help="显示某批次的 plan+report（传 <date-topic>）")
```

注：用 `nargs="?"` 让 `show` 成为可选位置参数，区分 `taxonomy.py history`（列表）和 `taxonomy.py history show <date-topic>`（详情）。

**Step 2: 加常量 + loader**

在文件顶部常量区加：

```python
SEDIMENT_HISTORY_ROOT = Path.home() / ".agents/skills/style-vault-sediment/assets/sediment-history"
```

加新函数：

```python
def load_history_batches():
    """扫 sediment-history 目录，返回 [(author, date, topic, folder_path), ...]。"""
    if not SEDIMENT_HISTORY_ROOT.is_dir():
        return []
    out = []
    for author_dir in sorted(SEDIMENT_HISTORY_ROOT.iterdir()):
        if not author_dir.is_dir() or author_dir.name.startswith("."):
            continue
        author = author_dir.name
        for batch_dir in sorted(author_dir.iterdir()):
            if not batch_dir.is_dir():
                continue
            # 期望格式 YYYY-MM-DD-<topic>[-modify|-delete|-NN]
            name = batch_dir.name
            if not re.match(r"^\d{4}-\d{2}-\d{2}-", name):
                continue
            date = name[:10]
            topic = name[11:]
            out.append((author, date, topic, batch_dir))
    return out
```

记得 `import re` 如果还没有。

**Step 3: 加 cmd_history 函数**

```python
def cmd_history(args):
    batches = load_history_batches()
    if args.show:
        # 显示某批次的 plan + report
        match = [b for b in batches if f"{b[1]}-{b[2]}" == args.show]
        if not match:
            print(f"未找到批次：{args.show}")
            return
        _, _, _, folder = match[0]
        for name in ("plan.md", "report.md", "source.md"):
            f = folder / name
            if f.is_file():
                print(f"\n=== {name} ===\n")
                print(f.read_text(encoding="utf-8"))
        return

    # 列表模式
    if args.author:
        batches = [b for b in batches if b[0] == args.author]
    if args.since:
        batches = [b for b in batches if b[1] >= args.since]
    if args.until:
        batches = [b for b in batches if b[1] <= args.until]

    if args.json:
        out = [{"author": a, "date": d, "topic": t, "path": str(p)} for a, d, t, p in batches]
        print(json.dumps(out, ensure_ascii=False, indent=2))
        return

    if not batches:
        print("（无匹配的沉淀记录）")
        return

    print(f"{'日期':<12} {'作者':<15} 主题")
    print("-" * 60)
    for author, date, topic, _ in batches:
        print(f"{date:<12} {author:<15} {topic}")
```

**Step 4: 在 main() 的分发逻辑里加**

```python
elif args.cmd == "history":
    cmd_history(args)
```

**Step 5: 验证 help**

```bash
~/.venvs/current/bin/python ~/.agents/skills/style-vault/scripts/taxonomy.py history --help
```

期望输出包含 `--author / --since / --until / show` 选项。

### Task 4.2 · 手工验证

**Step 1: 造测试数据**

```bash
mkdir -p ~/.agents/skills/style-vault-sediment/assets/sediment-history/testuser/2026-04-24-demo-topic
cat > ~/.agents/skills/style-vault-sediment/assets/sediment-history/testuser/2026-04-24-demo-topic/plan.md <<'EOF'
# 沉淀计划 · demo-topic
日期：2026-04-24
作者：testuser
模式：create
EOF
```

**Step 2: 测列表**

```bash
~/.venvs/current/bin/python ~/.agents/skills/style-vault/scripts/taxonomy.py history
```
期望输出包含：
```
2026-04-24    testuser        demo-topic
```

**Step 3: 测 --author 过滤**

```bash
~/.venvs/current/bin/python ~/.agents/skills/style-vault/scripts/taxonomy.py history --author testuser
```

期望：同上（testuser 匹配）

```bash
~/.venvs/current/bin/python ~/.agents/skills/style-vault/scripts/taxonomy.py history --author other
```

期望：`（无匹配的沉淀记录）`

**Step 4: 测 --since**

```bash
~/.venvs/current/bin/python ~/.agents/skills/style-vault/scripts/taxonomy.py history --since 2026-04-25
```

期望：`（无匹配的沉淀记录）`

**Step 5: 测 show**

```bash
~/.venvs/current/bin/python ~/.agents/skills/style-vault/scripts/taxonomy.py history show 2026-04-24-demo-topic
```

期望：打印 plan.md 内容

**Step 6: 测 --json**

```bash
~/.venvs/current/bin/python ~/.agents/skills/style-vault/scripts/taxonomy.py history --json
```

期望：JSON 数组

**Step 7: 清理测试数据**

```bash
rm -rf ~/.agents/skills/style-vault-sediment/assets/sediment-history/testuser
```

### Task 4.3 · 更新 style-vault/SKILL.md 的速查

**Files:**
- Modify: `~/.agents/skills/style-vault/SKILL.md`

**Step 1: 在"分类探索工具"节末尾加一段**

找到 SKILL.md 里介绍 `taxonomy.py` 的节，在子命令速查表末尾追加：

```
... taxonomy.py history                     # 列出所有沉淀历史
... taxonomy.py history --author links      # 过滤某作者
... taxonomy.py history --since 2026-04-01  # 日期范围
... taxonomy.py history show <date-topic>   # 查看某批次 plan+report
```

并加一句：

> 沉淀历史的真相源在 `style-vault-sediment/assets/sediment-history/<author>/<date-topic>/`。

### Task 4.4 · Commit Phase 4

**Step 1: Review**

```bash
git -C ~/.agents/skills status
git -C ~/.agents/skills diff style-vault/scripts/taxonomy.py | head -80
git -C ~/.agents/skills diff style-vault/SKILL.md | head -30
```

**Step 2: Commit**

```bash
git -C ~/.agents/skills add style-vault/scripts/taxonomy.py style-vault/SKILL.md
git -C ~/.agents/skills commit -m "$(cat <<'EOF'
feat(style-vault): taxonomy.py 加 history 子命令

读 style-vault-sediment/assets/sediment-history/ 列出沉淀批次。

子命令：
- taxonomy.py history                     列表
- taxonomy.py history --author <slug>     作者过滤
- taxonomy.py history --since YYYY-MM-DD  起始日期
- taxonomy.py history --until YYYY-MM-DD  截止日期
- taxonomy.py history show <date-topic>   展开某批次的 plan+report
- 任意子命令加 --json 输出机器可读格式

SKILL.md 的"分类探索工具"节追加子命令速查。

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase 5 · 验收场景（不 commit）

**目标**：按 design doc § 10 的 15 个场景手工走一遍，确认 skill 工作如预期。任何失败都要退回修 skill 文档或代码，直到通过。

### 操作方式

每个场景一个 task。每个 task 在 Claude Code 新对话里触发 skill，按脚本走一遍，记录实际结果。不 commit——这是验收不是实施。

### Task 5.1 · 场景 1 · from-project 单条

**准备**：临时 Vite + React 项目 `~/tmp/acme-test-project`，含 1 个 Tailwind 配置 + 1 个调色板定义。

**执行**：在 Claude Code 新对话里说 "沉淀 ~/tmp/acme-test-project"

**期望**：
- skill 进入 create + from-project 分支
- 识别出 1 条 token
- 整批 review 展示
- 确认后写入 skill 1 MD + 3 history 文件 + 网站仓 1 preview tsx
- 双仓各 1 commit（未 push）
- 沉淀报告打印

**失败处理**：如果某步卡住或错误，记录到 `/tmp/phase5-issue-N.md`，修完对应文档/代码，重跑。

### Task 5.2 · 场景 2 · from-project 批量

**准备**：较完整的示例项目（1 product + 1 style + 2 blocks + 2 tokens 所需所有文件）。

**执行**：沉淀该项目

**期望**：6 条条目全部写入，双仓各 1 聚合 commit。

### Task 5.3 · 场景 3 · from-web URL

**执行**：`沉淀 https://dribbble.com/shots/<真实shot>` 或选个目标站点

**期望**：
- WebFetch + 视觉分析
- 输出沉淀计划 + AI 生成的源代码
- source.md 记录 URL

### Task 5.4 · 场景 4 · from-web 截图

**准备**：本地 PNG `~/tmp/ref-screenshot.png`

**执行**：`沉淀 ~/tmp/ref-screenshot.png`

**期望**：多模态读图 → 沉淀计划 + 代码

### Task 5.5 · 场景 5 · from-scratch

**执行**：`想做一个冷薄荷 SaaS 管理后台的风格`

**期望**：对齐 3–5 问 → moodboard → 代码草案 → 汇入主流程

### Task 5.6 · 场景 6 · VAULT_OK=false

**准备**：临时重命名 `~/.agents/path.json` → `path.json.bak`

**执行**：跑任意 create 场景

**期望**：
- skill 检测 VAULT_OK=false
- 只写 skill 仓（1 commit）
- 不动网站侧
- 沉淀报告里明确说明"未联动网站"

**清理**：恢复 `path.json`

### Task 5.7 · 场景 7 · 整批 reject

**执行**：跑任意 create 到步骤 4，用户回答 "reject"

**期望**：
- 无任何文件写入
- 无任何 commit
- plan.md **不**落盘

### Task 5.8 · 场景 8 · 单条 sync 失败

**准备**：构造一个必然 sync 失败的场景（比如手工让 AI 在某条的 frontmatter 填一个不在 taxonomy.json 的 tag）。

**期望**：
- 写到第 k 条时 sync 报错
- 前 k-1 条 skill 文件保留、网站 tsx 清理
- 无 commit
- plan.md 已落盘（步骤 4 后）保留
- 错误信息清晰

### Task 5.9 · 场景 9 · 并发锁冲突

**准备**：`touch $VAULT/.style-vault-lock`

**执行**：跑任意 create 场景

**期望**：skill 拒启，打印"另一个会话正在沉淀 xxx"

**清理**：`rm $VAULT/.style-vault-lock`

### Task 5.10 · 场景 10 · 同日重复主题

**执行**：连续两次沉 "demo-topic"

**期望**：
- 第一次：`2026-04-24-demo-topic/`
- 第二次：`2026-04-24-demo-topic-02/`

### Task 5.11 · 场景 11 · modify 改 tag

**执行**：`修改 blocks/display/table 的 tags.mood 加 cold`

**期望**：
- 走 modify-workflow
- 展示当前条目 + 生成 diff
- 确认后改 frontmatter
- 双仓各 1 commit

### Task 5.12 · 场景 12 · modify 改正文

**执行**：`修改 styles/saas-tool/cold-industrial-saas 的视觉特征节`

**期望**：改正文 + 若有 preview 也同步改 tsx

### Task 5.13 · 场景 13 · delete 无依赖

**执行**：`删除 tokens/palettes/<某个无引用的 token>`

**期望**：直接删，双仓各 1 commit

### Task 5.14 · 场景 14 · delete 有依赖

**执行**：`删除 tokens/palettes/slate-cyan-ice`（假设被多个引用）

**期望**：
- skill 拒绝
- 列出引用者
- 三选：先修引用者 / 退出 / 强删

### Task 5.15 · 场景 15 · delete cascade

**执行**：接场景 14，用户输入 "cascade"

**期望**：
- 删 token
- 清引用者 frontmatter 里指向它的 ref
- sync 校验通过
- 双仓各 1 commit

### Task 5.16 · 汇总结论

**Files:**
- Create: `/tmp/phase5-acceptance.md`（不 commit 的临时文件）

**Step 1: 写一份 15 个场景的通过/失败矩阵**

对每个场景标 ✅ / ❌ / ⚠️，失败或部分成功的附链接指向 `/tmp/phase5-issue-N.md`。

**Step 2: 若有失败场景**

回到相应 Phase 修复对应 workflow 文档，重跑该场景，直到全绿。**所有修复走各自 Phase 的 commit（不在 Phase 5 commit）。**

**Step 3: 汇总报告**

全绿后打印：

```
Phase 5 验收全部通过 ✅
- Create: 10/10
- Modify: 2/2
- Delete: 3/3
```

---

## 完整 Commit 历史预期

Phase 0–4 产生 5 个 commit（skill 仓）：

```
feat(style-vault): taxonomy.py 加 history 子命令              ← Phase 4
feat(style-vault-sediment): modify / delete workflows         ← Phase 3
feat(style-vault-sediment): 填充共享主流程 + 4 条 create 分支  ← Phase 2
feat(style-vault-sediment): 骨架 · 路由 SKILL.md + 目录结构   ← Phase 1
refactor(style-vault): 瘦身为纯读 skill，沉淀路由到 sediment skill  ← Phase 0
```

Phase 5 验收不产生 commit，只本地验证。

全部结束后用户可选择 push。

---

## 依赖关系

```
Phase 0 ────→ Phase 1 ────→ Phase 2 ────→ Phase 3 ────→ Phase 4 ────→ Phase 5
(瘦身旧 SKILL)  (建骨架)     (shared+create) (mod+del)      (history CLI)  (验收)
```

线性串联，每一 Phase 前提是前一 Phase 完成。Phase 5 verify 全链路。

---

## 不在本计划范围

- push 到远端（留给用户手动）
- skill 分发（对外）机制
- GitHub Issue / Release Notes
- 沉淀历史的跨机同步
- 社区维护者 onboarding 文档（会在 Phase 2 的 SKILL.md 里简述即可）
