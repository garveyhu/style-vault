# Style Vault · 分类体系重构设计稿

日期：2026-04-24
状态：Design-only（等 writing-plans 产出 implementation plan 后落地）
输入来源：`docs/plans/2026-04-23-style-vault-expansion-design.md`、brainstorming 会话纪要

---

## 0. 为什么改

现有 5 层分类 `vibe / archetype / composite / atom / primitive`（中文「整站风格 / 页面样板 / 场景组合 / 原子组件 / 设计原语」）暴露三个问题：

1. **命名过于"行话"**：设计师/一般用户看到 vibe、archetype 要反复查"这是啥"
2. **层间边界模糊**：vibe ↔ archetype、archetype ↔ composite、atom ↔ primitive 各对都有"放哪都合理"的灰区
3. **缺少客户端维度**：参考 pageflows 的产品路径，用户首个筛选动作是 Web / iOS / Android，我们目前完全没有这个正交轴

同时发现：需要一个"**整站产品**"的聚合概念——把同一网站/应用的 Style + Pages + Blocks 捆绑展示，pageflows 的 "Products" 顶层就是这个角色，我们当前没有。

---

## 1. 分类体系：6 类资产 + 1 正交平台

### 1.1 六类资产

不改变粒度条数（5 层是真实存在的），只改名字让边界硬起来，并在顶部加一个**聚合视图**：

| 中文 | 英文 | 对应旧名 | 收录判定（硬边界） |
|---|---|---|---|
| **产品** | Products | 🆕 | 不产出新设计实现，只 **引用** 一个 Style + 若干 Pages / Blocks / Components / Tokens |
| **风格** | Styles | vibe | 能概括成"某某设计语言"；必须绑定至少一套 Tokens |
| **页面** | Pages | archetype | 可独立渲染一屏；通常由多个 Blocks 拼成 |
| **模块** | Blocks | composite | 页面里的一整块 section；小于 Page，大于 Component |
| **组件** | Components | atom | 单一可复用交互原子 |
| **原语** | Tokens | primitive | 没有交互形态的值/资源（调色板、字体对、动效、图标集…） |

**判定口诀**：先问"**产出新实现吗？**"——不 → Products；是 → 再按粒度 **整语言 → 整页 → 整段 → 单件 → 值** 往下走。

### 1.2 正交维度：Platform

- 枚举：`web` / `ios` / `android`
- 资产级数组：`platforms: ['web', 'ios']` 表示同构在两端
- Tokens 平台中立，固定 `['any']`
- Styles 默认 `['any']`，允许指定（如"iOS-only 设计语言"）

### 1.3 独立字段：Theme

- 从 `tags.theme` 提升为 frontmatter 顶层 `theme: 'light' | 'dark' | 'both'`
- 与 Platform 是"资产的双主维度"，UI 中作为 filter bar 顶部常驻

---

## 2. 数据模型（Registry schema）

```ts
type AssetType = 'product' | 'style' | 'page' | 'block' | 'component' | 'token';
type Platform = 'web' | 'ios' | 'android' | 'any';
type Theme = 'light' | 'dark' | 'both';

interface RegistryItem {
  id: string;                    // `${type}/${bucket}/${slug}`；product 形如 `products/acme-cold-saas`
  type: AssetType;
  name: string;
  description: string;

  platforms: Platform[];         // 🆕 数组
  theme: Theme;                  // 🆕 顶层

  tags: {                        // 保留的 facet（删 theme）
    aesthetic: string[];
    mood: string[];
    stack: string[];
  };

  refs?: {                       // 🆕 仅 product / style 使用
    style?: string;              // product 必填
    pages?: string[];
    blocks?: string[];
    components?: string[];
    tokens?: {
      palette?: string;
      typography?: string;
      motion?: string;
      border?: string;
      iconography?: string;
    };
  };

  cover?: string;                // 🆕 可选：Product / Style 的列表卡片 cover 图

  preview: string | null;
  skillPath: string;
  hasPreviewFile: boolean;

  uses: string[];                // 底层依赖（由 frontmatter 的 uses 字段累计）
  usedBy: string[];              // 脚本反向计算
}
```

差异要点：
- `refs` 是 Product/Style 的"结构化引用清单"；`uses`/`usedBy` 仍是通用的底层依赖关系
- `platforms` 是数组，不是单值
- `theme` 提顶层，`tags.theme` 删除

---

## 3. Skill 目录结构

全局 `~/.agents/path.json` 保留现状（`"style-vault": "/Users/links/Coding/Archer/style-vault"`）；skill 内部：

```
~/.agents/skills/style-vault/
├── SKILL.md                       # 重写分类语言 + 说明如何读全局 path.json
└── references/
    ├── _tags.yaml                 # aesthetic / mood / stack 标签池（删 theme）
    ├── _platforms.yaml            # 🆕 平台枚举 + 中文标签
    ├── README.md                  # 目录速览 + 旧桶 → 新桶对照
    │
    ├── products/                  # 🆕 扁平，不分场景桶
    │   └── <product-slug>/
    │       ├── index.md           # frontmatter + refs + 产品叙事
    │       └── cover.png          # 可选
    │
    ├── styles/                    # ← vibes/
    ├── pages/                     # ← archetypes/
    ├── blocks/                    # ← composites/
    ├── components/                # ← atoms/
    └── tokens/                    # ← primitives/
```

### 3.1 场景桶（第二层）规范

| 类型 | 场景桶 |
|---|---|
| products | *（不分桶）* |
| styles | `saas-tool` · `editorial` · `playful` · `e-commerce` · `dashboard` · `marketing` · `mobile-native` · `game` |
| pages | `landing` · `pricing` · `auth` · `dashboard` · `list-table` · `detail` · `form-flow` · `settings` · `checkout` · `content-reader` · `search-result` · `onboarding` · `profile` · `empty-error` |
| blocks | `hero` · `cta` · `feature-grid` · `pricing-table` · `testimonials` · `faq` · `logo-wall` · `stats` · `timeline` · `nav` · `footer` · `toolbar` · `tabs` · `breadcrumb` · `form` · `filters` · `search` · `card-grid` · `list` · `table` · `gallery` · `media-player` · `notification` · `banner` · `modal-content` |
| components | `buttons` · `inputs` · `selects` · `toggles` · `pickers` · `tags-badges` · `avatars-icons` · `indicators` · `overlays` · `typography-atoms` |
| tokens | `palettes` · `typography` · `motion` · `border` · `shadow` · `gradient` · `iconography` |

**桶 slug 是承诺**：一旦定义就不能随便改（会牵动 registry id + URL + 前端缓存）；确需 rename 时走正式迁移流程。

### 3.2 Platform 不做子目录

评估 `components/web/buttons/` vs 文件 frontmatter 的 `platforms:`，选后者：
- 一件跨平台组件不用复制
- 目录层级扁平
- 网站 filter 直接读字段

### 3.3 单条资产文件骨架

```
blocks/hero/cold-split-hero/
├── index.md           # frontmatter + 设计说明 + 用法
├── preview.tsx        # 网站渲染用
└── cover.png          # 可选
```

`index.md` frontmatter 模板：

```yaml
---
id: blocks/hero/cold-split-hero
type: block
name: Cold Split Hero
description: 左右分栏 · 等宽数字 · slate 底的冷感 Hero
platforms: [web]
theme: dark
tags:
  aesthetic: [minimal, industrial]
  mood: [cold, serious]
  stack: [react-antd-tailwind]
uses:
  - tokens/palettes/slate-cyan-ice
  - tokens/typography/ibm-plex-duo
  - components/buttons/ghost-button
---
```

**Product** 文件用 `refs` 代替 `uses`：

```yaml
---
id: products/acme-cold-saas
type: product
name: Acme · Cold Industrial SaaS
description: A productivity cockpit for quant teams
platforms: [web, ios]
category: productivity-tool
refs:
  style: styles/saas-tool/cold-industrial-saas
  pages:
    - pages/landing/cold-punk-landing
    - pages/pricing/tabular-pricing
  blocks: []
  tokens:
    palette: tokens/palettes/slate-cyan-ice
    typography: tokens/typography/ibm-plex-duo
cover: cover.png
---
```

---

## 4. 网站 IA（信息架构）

### 4.1 全局 sticky nav

```
[Logo]   Products · Styles · Pages · Blocks · Components · Tokens
         [ Search... ⌘K ]                         [Login / Fav ]
```

- 六类同一行，editorial underline 态
- 默认落 **Styles**
- `⌘K` 全局搜索，命中跨六类按粒度分组

### 4.2 类型页 filter bar

```
Platform: [All] Web  iOS  Android       Theme: [Any] Light Dark
[ Filters (场景桶 · 美学 · 情绪) ▾ ]     [ Sort: Latest · Popular ]
```

- Platform 放最前（用户首个动作）
- Theme 挨 Platform
- 场景桶 / aesthetic / mood / stack 收进 Popover
- Sort：Latest / Popular（Popular = 收藏数）

### 4.3 Product 列表卡与其他类型不同

- Cover 更大（竖屏 shot，像作品集封面）
- 底栏显"资产计数"：`3 Pages · 7 Blocks · 2 Tokens`
- 双栏瀑布流（而非现在的 3~4 栏 masonry）

### 4.4 Product 详情页：Layout B（magazine + sticky TOC）

节奏（HTML mockup 已 `docs/mockups/product-detail-layouts.html`）：

1. Cover Hero（大图 + tagline + platform pill）
2. `01 · Style`（大卡 + tokens 色卡预览）
3. `02 · Pages`（每页一屏大预览 + "uses blocks" 链回）
4. `03 · Blocks`（3 列网格）
5. `04 · Tokens`（palette / typography / motion 对照）

左侧 sticky TOC 列 01~04 锚点。

### 4.5 URL 规则

```
/                                  首页（纯宣传）
/products                          Product 列表
/products/:slug                    Product 详情
/styles /pages /blocks /components /tokens    各类型列表
/item/<type>/<bucket>/<slug>       通用资产详情（保留现有 /item/* 通吃）
/search?q=xxx                      搜索结果页
/favorites                         我的收藏
```

---

## 5. 首页（纯宣传骨架）

去掉一切功能入口、客户评价、价格方案。从上到下：

1. **Hero**：标语 + 副标题 + 单个 CTA (`Browse the Vault →`)
2. **Logo 墙**：Product / Style 缩略一排，纯展示不可点
3. **价值点 3 段**（带视觉叙事）：
   - `6 layers, from token to product`（分层插图）
   - `Built for AI coding`（Copy Prompt → 生成的动效演示）
   - `Cross-platform by design`（Web/iOS/Android 切换动画）
4. **Manifesto 大字**（类 Linear Changelog 那种品牌句）
5. **Footer**：logo · 版权 · GitHub 链接

设计调性：IBM Plex 家族 + Fraunces 大标题；黑白 + 极少 cyan；大量留白；无紫色渐变。

---

## 6. 迁移策略

Registry 当前仅 7 条真实数据，**直接切换，无向后兼容**。

### Skill 端
1. `mv references/vibes → styles`（其余四桶同理）
2. 批处理 `index.md` 的 `type` 字段 rename
3. 各条 frontmatter 加 `platforms: ['web']`、把 `tags.theme` 提升为顶层 `theme`
4. 新建 `_platforms.yaml`
5. 新建空的 `products/` 目录；首批做 1~2 条样例 Product（至少引用 1 Style + 2 Pages + 3 Blocks）

### 网站端
1. 同步脚本重新生成 `registry.json`（新增 platform / theme 字段）
2. 前端 i18n：`typeLabel` 更新、URL 适配
3. `typeColor` / `typeDotColor` 加 `product` 条目
4. 列表卡片加 platform 徽标
5. 新建 `/products`、`/products/:slug` 路由 + Layout B 详情页
6. filter bar 新增 Platform / Theme 作为一级筛选
7. 首页整体重构为"纯宣传骨架"

### 执行顺序（交 writing-plans 出完整 plan）
阶段 A：skill 目录 rename + registry schema 变更  
阶段 B：前端 i18n / 类型常量 / URL 同步（保证现有 5 条内容能正常显示）  
阶段 C：Product 模型 + `/products` 路由 + Layout B 详情页  
阶段 D：filter bar 平台/主题升级  
阶段 E：首页重构为纯宣传骨架  
阶段 F：Product 样本内容灌入

---

## 7. 未做 / YAGNI

- **Flows**（多屏用户旅程）：pageflows 的另一核心，我们当前无此类型；未来若要做再在 Page 之上加。
- **Version 归档**：同一 Product 的 v1/v2 版本切换，YAGNI。
- **iOS / Android 真实样例**：数据模型已支持，但首批内容还是 Web-only，用 `['web']` 留出扩展位。
- **多平台共用 Component**：数据模型允许，但预览只渲染一种（按 `platforms[0]` 或显式指定的默认）。

---

## 8. 风险与回退

| 风险 | 应对 |
|---|---|
| 场景桶 slug 错早了迁移成本高 | 上线前 code review 把 §3.1 的桶清单过一遍 |
| rename 时漏改引用 | 同步脚本里做 `uses` 里引用 id 的校验（ref 不到就报错） |
| 用户记不住 6 类 | SKILL.md 顶部 + 网站 nav 旁加 tooltip 速查 |
| Product 数据稀少时详情页空旷 | Layout B 本身对内容少也友好（magazine 分节留白） |

---

## 9. Next

交 writing-plans skill 产出逐任务的实施计划（阶段 A→F），随后进入 executing-plans。
