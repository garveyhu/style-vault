# Style Vault Sediment Skill · 设计稿

日期：2026-04-24
状态：Design-only（等 writing-plans 产出 implementation plan 后落地）
输入来源：brainstorming 会话纪要 · 参与者 Links

---

## 0 · 为什么做

现阶段 style-vault 项目骨架（网站 + skill + taxonomy）已稳定。接下来最关键的工作是 **快速、可重复、可协作地把风格沉淀到 vault**。

现状痛点：

1. 现有 `style-vault` skill 混合了**读（消费）**和**写（沉淀）**两种模式。长期看读的心智极轻（只要命中 id 就生成代码），写的心智极重（10 步流程 + tag 校验 + 双仓 commit）。混在一起让读 skill 的 SKILL.md 臃肿到 250+ 行。
2. 沉淀场景本身有明显差异：**从本地项目提取**、**从在线资源（URL / 截图）提取**、**从零创作** 三种起点，discovery 阶段完全不同，但下游写入流程共享。现有单一 10 步流程没覆盖这些差异。
3. **多人协作在即**。未来要把沉淀 skill 分发给社区维护者时，需要：(a) 可持久化审计的沉淀历史；(b) 按作者隔离的记录空间；(c) 安装/分发解耦——只分发写 skill 不带歧义。

解法：**新建 `style-vault-sediment` skill，接管全部写入操作；瘦身 `style-vault` 为纯读 skill。**

---

## 1 · 总体架构

### 1.1 两个 skill 分工

```
~/.agents/skills/
├── style-vault/                  ← 瘦身后的读 skill（消费 + 查询）
│   ├── SKILL.md                  （只保留消费模式 + 术语索引 + 路由提示）
│   ├── assets/taxonomy.json      （真相字典不变）
│   ├── references/               （资产条目不变）
│   └── scripts/taxonomy.py       （查询工具不变，可能加 history 子命令）
│
└── style-vault-sediment/         ← 新建写 skill
    ├── SKILL.md                  （触发词路由）
    ├── references/
    │   ├── shared-workflow.md    （通用主干，被所有模式共享）
    │   ├── sediment-from-project.md
    │   ├── sediment-from-web.md
    │   ├── sediment-from-scratch.md
    │   ├── sediment-from-other.md
    │   ├── modify-workflow.md
    │   └── delete-workflow.md
    └── assets/
        └── sediment-history/     （版本化沉淀历史，按作者分目录）
            └── <author-slug>/
                └── YYYY-MM-DD-<topic>/
                    ├── plan.md
                    ├── report.md
                    └── source.md (可选)
```

### 1.2 硬依赖关系

- `style-vault-sediment` **硬依赖** `style-vault`：
  - 读 `style-vault/assets/taxonomy.json`（分类字典权威）
  - 调 `style-vault/scripts/taxonomy.py` 查询 id / tag / 反向引用
  - 引 `style-vault/references/README.md` 的 frontmatter 规范
- 安装时两个 skill 必须成对出现；新 skill 的 SKILL.md 顶部声明这个依赖

### 1.3 触发分离

- **消费意图**（"用 xxx 风格" / 网站 prompt 卡片）→ 旧 `style-vault`
- **沉淀意图**（"沉淀" / "加到 vault" / `/style-vault-sediment`）→ 新 `style-vault-sediment`
- 旧 skill 对沉淀相关触发词**仅做路由提示**："沉淀请调用 style-vault-sediment skill"

---

## 2 · 入口路由

`SKILL.md` 启动时**不主动问操作类型**，根据触发语判定操作模式（create / modify / delete）。默认进入 create 模式。

### 2.1 路由表

| 触发情况 | 走的路径 |
|---|---|
| `/style-vault-sediment` 裸词 / "沉淀" / "加到 vault" | **默认 create**：问起点"本次沉淀的起点是？(1 本地项目 / 2 在线资源 / 3 从零 / 4 其他)" |
| 描述里有项目路径 / cwd 提示 | create + `sediment-from-project` |
| 描述里有 URL / "截图" / "参考这个网站" | create + `sediment-from-web` |
| "想做一个 xxx 风格" / "从零" | create + `sediment-from-scratch` |
| **"修改 <id>"** / **"改 <id> 的 tag"** / **"调整已有的 xxx"** | **`modify-workflow`** |
| **"删除 <id>"** / **"下掉 <id>"** / **"移除 <id>"** | **`delete-workflow`** |

### 2.2 歧义处理

- 用户说"我要调整 vault 里的风格"（既像 create 又像 modify）→ skill 先反问："你是要新增还是调整已有的 `<id>`？"
- 从头到尾没提"修改 / 删除"字眼 → skill 一路走 create，不主动弹"要不要改 / 删"

---

## 3 · Create 模式：四条 discovery 分支

所有分支的**输出统一为"沉淀计划"**（结构化列表：要新增的条目 + 依赖图 + 来源溯源），然后交给 `shared-workflow`。

### 3.1 `sediment-from-project.md` · 本地项目提取

- **输入**：项目路径
- **分析**：
  - 扫目录、读 `package.json` 识别技术栈
  - 扫 Tailwind / CSS 变量 / design tokens 文件
  - 识别典型组件（Button / Table / Layout 等）
  - 推断整体 aesthetic（配色 + 字体 + 留白）
- **输出**：沉淀计划草稿（"此项目够沉淀为 1 product + 2 styles + 5 blocks + 3 components + 2 tokens"），附每条的来源文件路径
- **核心能力**：**把已有代码反向归类到六层资产**

### 3.2 `sediment-from-web.md` · 在线资源解析

- **输入**：URL / 截图路径 / 设计稿图片
- **分析**：
  - URL → WebFetch 拉页面 + 视觉观察
  - 截图 → Claude 多模态直接读图
  - 从视觉反推：配色、字体、气质、可复用结构
- **输出**：沉淀计划 + **AI 实现建议代码**（源码不可得，必须重写）
- **溯源**：原始 URL / 图片哈希写入 `source.md`

### 3.3 `sediment-from-scratch.md` · 从零创作

- **输入**：用户口头描述（"想做一个冷感 SaaS 后台"）
- **分析**：
  - 互动对齐：配色方向、字体、气质、参考（"想像 Linear 那样还是 Notion 那样？"）
  - 生成 moodboard + code 草案
  - 迭代到用户满意
- **输出**：沉淀计划 + 完整代码
- **Exit 机制**：每轮迭代结束问一次"确认推进？"，避免无限对话

### 3.4 `sediment-from-other.md` · 兜底路由

- 反问 2–3 个问题识别意图 → 能归到前三就路由
- 混合场景（项目 + 参考网站）→ 给手工合并建议（先用 (3.1) 扒骨架，再按 (3.2) 的风格改色）

### 3.5 统一输出格式

```
沉淀计划:
  目标：<主题一句话>
  起点：from-project | from-web | from-scratch
  新增条目（依赖拓扑序）：
    - tokens/palettes/xxx
    - blocks/display/xxx
    - styles/saas-tool/xxx
    - products/xxx
  依赖关系：<refs 图>
  来源溯源：<项目路径 / URL / 截图 / 对话摘录>
```

---

## 4 · 共享主流程 `shared-workflow.md`

所有 create 分支 + modify + delete 都走这里。8 步主干：

### 步骤 1 · 加载分类字典

调 `style-vault/scripts/taxonomy.py overview`，拿当前所有合法 category / tag 值。保证新条目不会引入不存在的 slug。

### 步骤 2 · 授权 auto-fill

一次授权："本次 N 条条目的元信息由 AI 自动填？(Y / N / 逐条决定)"

- **Y** → AI 填所有字段
- **N** → 所有字段留空占位，步骤 3 让用户逐字段填
- **逐条决定** → 退回到每条问一次

### 步骤 3 · 生成完整写入方案

每条条目准备完整 **frontmatter + 正文骨架**。如果授权了 auto-fill，AI 完成所有字段；否则占位等用户输入。

### 步骤 4 · 整批 review

把 N 条条目整理成预览文档贴给用户：

```
=== 写入预览 (N 条) ===
1. tokens/palettes/xxx-new
   category: —     tags: {aesthetic:[...], mood:[...], stack:[...]}
   platforms: [...] theme: [...]
   --- 正文（50 字预览）---

2. blocks/display/xxx-new
   ...
```

用户操作：整批确认 / 整批 reject / 单条改 slug / 单条改 tag / 单条改正文 / 单条删除。

**用户确认后立即落盘 `plan.md`**（即使后续写入失败也保留，作为"尝试过"记录）。

### 步骤 5 · path.json 分叉

复用旧 skill 的 `VAULT_OK` 判定逻辑：

```bash
VAULT=$(jq -r '."style-vault" // empty' ~/.agents/path.json 2>/dev/null)
if [[ -z "$VAULT" || ! -d "$VAULT/frontend" ]]; then
  VAULT_OK=false
elif ! jq -e '.["style-vault-site"] == true' "$VAULT/frontend/package.json" >/dev/null 2>&1; then
  VAULT_OK=false
else
  VAULT_OK=true
fi
```

- `VAULT_OK=false` → skill-only 沉淀
- `VAULT_OK=true` → 双仓同步，加并发锁 `$VAULT/.style-vault-lock`

### 步骤 6 · 逐条写入

依 refs 拓扑顺序（token 先、product 最后）：

- skill 仓：`references/<id>/README.md` 或 `references/<id>.md`
- 网站仓（若 `VAULT_OK=true`）：`frontend/src/preview/<id>.tsx`
- 每条写完跑 `yarn sync` 做增量校验——**一条失败就停**

### 步骤 7 · 双仓聚合 commit

全部写入 + `yarn sync` 全绿后：

- skill 仓：1 个 commit `feat(style-vault): add <主题> (N 条: A+B+C)`
- 网站仓：1 个 commit `feat(preview): add <主题> preview (N 条)`
- commit footer 按 `~/.claude/rules/git.md` 追加 `Co-Authored-By`
- **不 push**，留给用户

### 步骤 8 · 沉淀报告

给用户报告（见 § 6）+ 落盘 `report.md`。释放并发锁（若建了）。

---

## 5 · 修改 / 删除工作流

### 5.1 `modify-workflow.md`

**入口**：用户指定要改的 id。

**支持改动**：
- frontmatter 字段（tags / category / platforms / theme / name / description / refs / uses）
- 正文内容（视觉特征 / Tokens 代码块 / 核心代码 / 反模式 / 适配指南）
- 对应的 `preview/*.tsx`

**不支持**：
- 改 id（重命名）→ 语义等于 "删旧 + 建新"，要求用户走 delete + create

**流程**（shared-workflow 修改模式）：
1. 加载 taxonomy
2. 展示当前条目全貌 + 让用户说"改什么"
3. 生成改动 diff（frontmatter 对比 + 正文 diff）贴给用户 review
4. 整体确认 / 单项拒绝 / 再改
5. 执行改动（skill + web）
6. `yarn sync` 校验 → 失败回滚
7. 双仓聚合 commit（`refactor(style-vault): modify <id>` + `refactor(preview): update <id> preview`）
8. 沉淀报告（带"改了什么"摘要）

### 5.2 `delete-workflow.md`

**入口**：用户给 id（支持批量）。

**必做的依赖检查**：
- `taxonomy.py item <id>` 反向查询（被谁引用）
- 有引用者 → 拒绝删除，列出所有引用方
- 用户选：先修引用者 / 退出 / 强删（"cascade"）

**Cascade 语义**：把引用者里指向被删 id 的 ref **清掉**（只删这一条引用，不删引用者本身）。

**流程**：
1. 加载 taxonomy
2. 列出待删 id + 反向引用检查
3. 若有引用者 → 拒绝 / 等用户选
4. 整体确认（展示"将删除的文件清单 + cascade 时还会改哪些引用者"）
5. 执行删除（skill 侧 rm MD、网站侧 rm preview tsx、cascade 时改引用者 frontmatter）
6. `yarn sync` 校验
7. 双仓聚合 commit（`feat(style-vault): remove <id>` + `feat(preview): remove <id> preview`）
8. 沉淀报告

---

## 6 · 沉淀报告格式

步骤 8 给用户的总结，覆盖"**做了什么 / 怎么分类的 / 下一步**"三块。直接打印在对话里 + 落盘 `report.md`。

模板：

```markdown
# 沉淀报告 · <主题>

日期：2026-04-24
模式：create | modify | delete
起点：from-web (https://dribbble.com/shots/xxx)
作者：links

## 涉及条目（N 条）

| 操作 | 类型 | ID | 名称 | 分类 / 标签 |
|---|---|---|---|---|
| 新增 | token | tokens/palettes/cold-mint | 冷薄荷调色板 | aesthetic: [organic] · mood: [calm] |
| 新增 | block | blocks/display/mint-table | 薄荷表格 | aesthetic: [minimal] · mood: [calm] · stack: [react-tailwind] |

## 元信息来源

- AI 自动填（授权）：`tokens/palettes/cold-mint`、`blocks/display/mint-table`
- 用户手改：`styles/saas-tool/cold-mint-saas` 的 tags.aesthetic
- 纯手填：无

## 分类决策说明

- `tokens/palettes/cold-mint` → 主色 #A7F3D0 + 冷灰；aesthetic=organic（色板偏有机），mood=calm（低饱和）
- `products/mint-analytics` → category=productivity（分析 dashboard）

## Commit

- skill 仓：`a3f9c21` · `feat(style-vault): add mint analytics suite (1 product + 1 style + 1 block + 1 token)`
- 网站仓：`b5d12fc` · `feat(preview): add mint analytics preview (4 条)`
- **均未 push**

## 下一步

1. `cd $VAULT/frontend && yarn dev` 肉眼过 preview
2. OK 后 `git push` 两仓
3. 发现问题 `git reset --soft HEAD~1` 回到工作区

---
*由 style-vault-sediment skill 生成 · 来源：from-web*
```

---

## 7 · 沉淀历史的版本管理

### 7.1 目录结构

```
style-vault-sediment/
└── assets/
    └── sediment-history/
        ├── .author-config.json                   ← 本机作者 slug 缓存
        ├── links/                                ← 作者 slug
        │   ├── 2026-04-23-acme-cold-saas/
        │   │   ├── plan.md                       ← 沉淀计划（步骤 4 落盘）
        │   │   ├── report.md                     ← 沉淀报告（步骤 8 落盘）
        │   │   └── source.md (可选)              ← 原始素材溯源
        │   ├── 2026-04-24-mint-analytics/
        │   └── ...
        └── jiawei-hu/
            └── 2026-04-28-editorial-blog/
```

### 7.2 作者 slug 生成

- 默认：`git config user.name` 小写 + kebab（"Jiawei Hu" → `jiawei-hu`）
- 第一次使用 skill 时显示推断 slug 让用户确认
- 存入 `assets/sediment-history/.author-config.json`：`{ "author": "links" }`
- 如果 `git config user.name` 为空 → skill 让用户手工输入

### 7.3 主题 slug 生成

- AI 从沉淀计划"目标"里提取（如 `mint-analytics` / `acme-cold-saas`）
- 用户可在步骤 4 手工改
- 同日多次：加后缀 `-02` / `-03`
- 不同模式：folder 名可加语义后缀 `-modify` / `-delete`

### 7.4 文件规格

**`plan.md`** 步骤 4 落盘：

```markdown
# 沉淀计划 · <主题>

日期：2026-04-24
作者：links
模式：create | modify | delete
起点：from-web (https://dribbble.com/shots/xxx)

## 目标
<一句话说明>

## 涉及条目（依赖拓扑序）
1. tokens/palettes/cold-mint
2. blocks/display/mint-table
3. styles/saas-tool/cold-mint-saas
4. products/mint-analytics

## 依赖关系
mint-analytics → cold-mint-saas → [mint-table, cold-mint]
mint-table → cold-mint

## 元信息填写方式
- AI 自动填: tokens/palettes/cold-mint, blocks/display/mint-table
- 用户手填: styles/saas-tool/cold-mint-saas

## 执行状态
☑ 用户已确认 · 待写入
```

**`report.md`** 步骤 8 落盘 —— 结构见 § 6。

**`source.md`**（可选，from-web / from-project 才有）：

```markdown
# 素材溯源 · <主题>

## URL
- 参考站点：https://dribbble.com/shots/xxx（访问时间：2026-04-24 13:20）

## 截图
- 本地路径（临时）：/tmp/dribbble-mint-xxx.png
- 关键截图要点：主视觉色 #A7F3D0，typography 用 Inter + IBM Plex Mono

## 对话摘录
<AI 精炼提取的关键对话片段>
```

### 7.5 Commit 集成

3 个历史文件进**同一次 skill 仓 commit**（和新增 references/*.md 一起）。commit 同时包含：
- `references/**/*.md` 新/改/删条目
- `assets/sediment-history/<author>/<date-topic>/*` 历史文件

### 7.6 查询接口

给 `style-vault/scripts/taxonomy.py` 加 history 子命令（查询侧，归读 skill）：

```bash
taxonomy.py history                       # 全部沉淀批次
taxonomy.py history --author links        # 某作者的全部批次
taxonomy.py history --since 2026-04-01    # 日期范围过滤
taxonomy.py history show <date-topic>     # 查看某批次的 plan + report
```

---

## 8 · 旧 `style-vault` skill 瘦身

### 8.1 保留

- Frontmatter 声明、消费侧触发关键词
- **消费模式（Consumption，5 步）** 章节整条
- **6 层结构 / 引用方向** 总览
- **Frontmatter 规范** 简述 + 链向 `references/README.md`
- **分类探索工具** `scripts/taxonomy.py` 子命令速查
- **术语速查**
- **入口索引**

### 8.2 删除或迁走

| 原章节 | 处理 |
|---|---|
| 沉淀模式（Maintenance，10 步） | **删** |
| 沉淀 Checklist | **删** |
| 容错矩阵（混合读写场景） | 只保留消费相关几行（悬空引用处理、registry 过期提醒） |
| Tag 字典与 Frontmatter | 保留，简述 + 链向 `assets/taxonomy.json` |
| 常见错误 | 只留消费相关的（tag 字典过期 / 引用悬空 / 合并顺序错） |
| 维护指南（给所有 AI） | 精简成"读 skill 的维护原则"：不写入、不 sync、不 commit |

### 8.3 新增

- **路由提示节**：列出沉淀 / 修改 / 删除触发词，路由到 `style-vault-sediment` skill
- 对 `scripts/taxonomy.py history` 子命令的介绍（若实现）

### 8.4 预期体积

从当前 ~250 行缩到 ~120 行——消费 5 步 + 分类说明 + 术语 + 路由。

---

## 9 · 错误处理与 edge cases

### 9.1 主流程错误回滚

| 场景 | 动作 |
|---|---|
| 步骤 4 用户整批 reject | 放弃所有改动、不写、不 commit、不落盘 plan.md |
| 步骤 6 某条 `yarn sync` 失败 | 停止写后续；已写的 skill 文件保留不 commit；网站侧已建的 preview/tsx 用 `git checkout` 清理；报错让用户修后重跑；plan.md 已落盘（步骤 4 后）保留 |
| 用户中途 Ctrl-C | 和 sync 失败同策略 |
| 并发锁冲突 | 拒启："另一个会话正在沉淀 `<主题>`，等它完成或手工清锁" |

### 9.2 Edge cases

| 场景 | 预期行为 |
|---|---|
| `git config user.name` 为空 | skill 让用户手工输入 author slug，存入 `.author-config.json` |
| from-web URL 拉不到 | skill 降级：让用户手工粘贴内容 / 截图 |
| from-scratch 对话陷入无限迭代 | 每轮后问"确认推进？"，给清晰 exit 点 |
| auto-fill 填出不在字典里的 category | skill 拒绝："此 category 不在字典，请先改 `taxonomy.json` 或换已有 slug" |
| 步骤 4 用户说"删 3 条" | review 支持单条删除 |
| modify 时用户改了 id | 拒绝（要求删旧 + 建新） |
| delete 有引用者 | 拒绝 + 列出引用方；用户选择先修引用者 / 退出 / cascade |

---

## 10 · 验收场景

### 10.1 Create 场景

1. **from-project 单条**：Vite + React 项目，提取 1 个 token → skill 仓 1 MD + 3 history 文件；网站仓 1 preview tsx。
2. **from-project 批量**：同上，识别 1 product + 1 style + 2 blocks + 2 tokens 全套 → 各 1 commit。
3. **from-web URL**：Dribbble URL，WebFetch + 视觉 → 沉淀计划 + 代码。
4. **from-web 截图**：本地 PNG 路径，多模态 → 同上。
5. **from-scratch**：用户说"冷 SaaS 风格"，对话迭代 → 沉淀计划。
6. **VAULT_OK=false**：没有 path.json / marker → skill-only 沉淀，1 commit。
7. **整批 reject**：步骤 4 回绝 → skill 无任何改动。
8. **单条 sync 失败**：第 k 条失败 → 前 k−1 skill 保留、网站侧 tsx 清理、无 commit。
9. **并发锁冲突**：手工 `touch .style-vault-lock` 后启动 → 拒启。
10. **同日重复主题**：连续两次沉 "mint-analytics" → 第二次 folder 自动加 `-02`。

### 10.2 Modify 场景

11. **modify 改 tag**：改某 block 的 `tags.mood` → 两仓各 1 commit。
12. **modify 改正文**：改某 style 的"视觉特征"节 + 对应 preview.tsx 重构。

### 10.3 Delete 场景

13. **delete 无依赖**：删 leaf token，成功。
14. **delete 有依赖**：删被 5 个 block 引用的 token → 拒绝，列出引用者。
15. **delete cascade**：用户确认 cascade → 删 token + 改 5 个引用者 frontmatter。

---

## 11 · 不在本 skill 范围

- taxonomy 本身的改动（走直接编辑 `style-vault/assets/taxonomy.json`）
- 沉淀历史文件的跨作者冲突（已通过 author 文件夹 + date 前缀规避）
- 网站 UI 设计（在 style-vault 仓 frontend 里做）
- push 到远端（永远留给用户）
- skill 分发机制本身（安装方式由用户决定；skill 目录结构标准化即可）

---

## 12 · 下一步

writing-plans skill 产出 implementation plan，按 phase 落地：

- **Phase 0**：瘦身旧 `style-vault/SKILL.md`（非破坏性，可先做）
- **Phase 1**：新建 `style-vault-sediment` skill 骨架（SKILL.md + references/ + assets/）
- **Phase 2**：填 `shared-workflow.md` + 4 条 create 分支
- **Phase 3**：填 modify-workflow + delete-workflow
- **Phase 4**：给 `scripts/taxonomy.py` 加 history 子命令
- **Phase 5**：走 10.1–10.3 的验收场景

具体任务切分、文件内容草案、依赖关系由 writing-plans 展开。
