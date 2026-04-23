# Style Vault 扩容实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 扩容 style-vault：把 skill 重构成五层/多级分层 + 新建可视化网站 + 用 `~/.agents/path.json` 软链接两仓 + 走通首批样板条目的端到端沉淀/消费闭环。

**Architecture:** skill 仓（`~/.agents/skills/style-vault` 内嵌在 `~/.agents` git 仓）只存 `.md` 规格 + `_tags.yaml` + `_CATEGORY.md`；网站仓（`/Users/links/Coding/Archer/style-vault`，独立 git）用 Vite + React 19 + TS + Antd + Tailwind，`frontend/src/preview/` 存真实 React 预览页，`frontend/src/data/registry.json` 由 `scripts/sync-from-skill` 从 skill 的 `references/` 生成并 commit。`~/.agents/path.json` 加 `style-vault` 字段做链接。

**Tech Stack:**
- **skill 侧**：纯 Markdown + YAML
- **网站侧**：React 19 + Vite + TypeScript + Ant Design + Tailwind CSS + react-router v7 + Vitest
- **sync 脚本**：Node + TypeScript，依赖 gray-matter（frontmatter）、js-yaml（tag 字典）、fast-glob（walk）
- **设计稿**：`docs/plans/2026-04-23-style-vault-expansion-design.md`

**执行须知**：
- skill 侧所有改动 commit 到 `~/.agents` 仓（不是独立仓），使用 Angular 风格 `feat(style-vault): …` 或 `refactor(style-vault): …`
- 网站仓独立 git，直接在 master（当前分支）commit
- TDD 仅用于 sync 脚本（纯逻辑），UI / md / 目录骨架用"写→肉眼验→commit"三步
- 每完成一个 Task 后 commit；跨仓任务两仓**独立**各一次 commit

---

## 阶段概览

| 阶段 | 仓 | 任务数 | 目标 |
|---|---|---|---|
| A. Skill 重构与迁移 | ~/.agents | 9 | 新分层骨架 + 迁移旧条目 + 重写 SKILL.md |
| B. 网站初始化 | style-vault | 6 | Vite+React+Antd+Tailwind 骨架 + marker + 依赖 |
| C. sync-from-skill 脚本（TDD） | style-vault | 8 | 读 skill 树→校验→生成 registry.json |
| D. 网站 UI | style-vault | 8 | Browse / Detail / Filter / iframe / Prompt 复制 |
| E. Preview 模板 | style-vault | 2 | 5 类 + primitive 子类特化 |
| F. 首批样板条目 | 双仓 | 7 | 每层 1 条样板，走通端到端 |
| G. path.json + 容错 | ~/.agents | 5 | 加字段 + 手工验证 4 种容错场景 |

---

# 阶段 A · Skill 重构与迁移

仓：`~/.agents`（工作目录 `~/.agents/skills/style-vault/`）

### Task A1: 建立 `_tags.yaml` 和 `references/README.md`

**Files:**
- Create: `~/.agents/skills/style-vault/references/_tags.yaml`
- Create: `~/.agents/skills/style-vault/references/README.md`

**Step 1: 创建 `_tags.yaml`（对照设计稿 Ⅱ.5）**

```yaml
aesthetic:
  - minimal
  - maximal
  - brutalist
  - editorial
  - glass
  - neumorph
  - claymorph
  - bento
  - retro
  - organic
  - industrial
  - playful
  - luxe
  - raw

mood:
  - cold
  - warm
  - serious
  - playful
  - calm
  - energetic
  - dark-academia

theme:
  - light
  - dark

stack:
  - react-antd-tailwind
  - html-tailwind
  - shadcn-radix
  - vanilla-css
```

**Step 2: 创建 `references/README.md`**

内容：五层分层总览 + ID 约定 + frontmatter schema + 指向 `_CATEGORY.md` 和 `_tags.yaml` 的指引。保持 <200 行，从设计稿 Ⅰ + Ⅱ.1~Ⅱ.3 提炼。

**Step 3: 提交**

```bash
cd ~/.agents
git add skills/style-vault/references/_tags.yaml skills/style-vault/references/README.md
git commit -m "feat(style-vault): 新增 _tags.yaml 和 references README"
```

---

### Task A2: 五个一级目录 + 每个 `_CATEGORY.md`

**Files（全部 Create）:**
- `~/.agents/skills/style-vault/references/vibes/_CATEGORY.md`
- `~/.agents/skills/style-vault/references/archetypes/_CATEGORY.md`
- `~/.agents/skills/style-vault/references/composites/_CATEGORY.md`
- `~/.agents/skills/style-vault/references/atoms/_CATEGORY.md`
- `~/.agents/skills/style-vault/references/primitives/_CATEGORY.md`

**Step 1: vibes/_CATEGORY.md**

内容包含：层定义、二级桶列表（8 个产品形态桶）、与 archetypes 的边界判据、命名约定。

**Step 2: archetypes/_CATEGORY.md**

二级桶：12 个页面职能桶（landing / dashboard / list-table / detail / form-flow / auth / content-reader / settings / search-result / checkout / empty-error / pricing）+ 与 vibes / composites 的边界。

**Step 3: composites/_CATEGORY.md**

二级桶：10 个（display / entry / nav / feedback / layout / editor / media / social / marketing / commerce）+ 收录边界。

**Step 4: atoms/_CATEGORY.md**

二级桶：9 个（buttons / inputs / selects / toggles / tags-badges / overlays / indicators / avatars-icons / typography-atoms）。

**Step 5: primitives/_CATEGORY.md**

二级桶：12 个（palettes / typography / spacing / radius / shadow / motion / border / gradient / texture / iconography / focus-ring / cursor），并说明 typography 下有 fonts / pairs / scales 三级。

**Step 6: 提交**

```bash
cd ~/.agents
git add skills/style-vault/references/*/\_CATEGORY.md
git commit -m "feat(style-vault): 新增五个一级目录及 _CATEGORY.md 边界说明"
```

---

### Task A3: 建二级目录骨架（空占位）

**Files:**
- 所有二级目录里放一个 `.gitkeep`

**Step 1: 创建所有二级目录**

```bash
cd ~/.agents/skills/style-vault/references

# vibes 二级
mkdir -p vibes/{saas-tool,marketing-brand,admin-console,content-media,ecommerce-shop,portfolio-studio,community-social,experimental}

# archetypes 二级
mkdir -p archetypes/{landing,dashboard,list-table,detail,form-flow,auth,content-reader,settings,search-result,checkout,empty-error,pricing}

# composites 二级
mkdir -p composites/{display,entry,nav,feedback,layout,editor,media,social,marketing,commerce}

# atoms 二级
mkdir -p atoms/{buttons,inputs,selects,toggles,tags-badges,overlays,indicators,avatars-icons,typography-atoms}

# primitives 二级 + typography 三级
mkdir -p primitives/{palettes,spacing,radius,shadow,motion,border,gradient,texture,iconography,focus-ring,cursor}
mkdir -p primitives/typography/{fonts,pairs,scales}
```

**Step 2: 填 .gitkeep**

```bash
cd ~/.agents/skills/style-vault/references
find vibes archetypes composites atoms primitives -type d -empty -exec touch {}/.gitkeep \;
```

**Step 3: 验证结构**

```bash
tree ~/.agents/skills/style-vault/references -L 3
```

预期看到所有二级目录齐全。

**Step 4: 提交**

```bash
cd ~/.agents
git add skills/style-vault/references/
git commit -m "feat(style-vault): 预铺二级目录骨架（vibes/archetypes/composites/atoms/primitives）"
```

---

### Task A4: 迁移 admin-table → composites/display/table

**Files:**
- Delete: `~/.agents/skills/style-vault/references/composites/admin-table.md`
- Create: `~/.agents/skills/style-vault/references/composites/display/table.md`

**Step 1: 读原文件**

已在会话里读过（Ant Design 无边框表格 + 分页）。

**Step 2: 写新文件**

顶部加 frontmatter：

```yaml
---
id: composites/display/table
type: composite
name: Admin Table
description: 管理后台无边框表格，统一分页、中文本地化、行 hover 减淡
tags:
  aesthetic: [minimal]
  mood: [calm, serious]
  theme: [light]
  stack: [react-antd-tailwind]
uses: []
preview: /preview/composites/display/table
---
```

正文保留原有的：视觉特征描述、核心代码、样式要点（合并"Ant Design 覆盖"进来）、使用示例。
新增"反模式 / 禁忌"一节（简短即可：别加外框、别用默认深灰 hover）。
新增"适配指南"一节（`columns` 外部传入、`rowKey` 必填、`pagination` 可合并外部对象）。

**Step 3: 删除旧文件**

```bash
rm ~/.agents/skills/style-vault/references/composites/admin-table.md
```

**Step 4: 清掉 display/ 里的 .gitkeep（因为已有真实文件）**

```bash
rm ~/.agents/skills/style-vault/references/composites/display/.gitkeep
```

**Step 5: 提交**

```bash
cd ~/.agents
git add skills/style-vault/references/composites/
git commit -m "refactor(style-vault): 迁移 admin-table → composites/display/table，补 frontmatter"
```

---

### Task A5: 迁移 admin-toolbar → composites/layout/toolbar-bar

**Files:**
- Delete: `~/.agents/skills/style-vault/references/composites/admin-toolbar.md`
- Create: `~/.agents/skills/style-vault/references/composites/layout/toolbar-bar.md`

**Step 1: 新文件 frontmatter**

```yaml
---
id: composites/layout/toolbar-bar
type: composite
name: Admin Toolbar Bar
description: 表格顶部工具栏，搜索+筛选左对齐，功能按钮右对齐
tags:
  aesthetic: [minimal]
  mood: [calm, serious]
  theme: [light]
  stack: [react-antd-tailwind]
uses:
  - composites/display/table   # 共享 ADMIN_THEME
preview: /preview/composites/layout/toolbar-bar
---
```

**Step 2: 迁正文**

保留原内容，把里面 `./admin-table.md` 的相对链接改成 `../display/table.md`。

**Step 3: 删除旧文件和 .gitkeep**

```bash
rm ~/.agents/skills/style-vault/references/composites/admin-toolbar.md
rm ~/.agents/skills/style-vault/references/composites/layout/.gitkeep
```

**Step 4: 提交**

```bash
cd ~/.agents
git add skills/style-vault/references/composites/
git commit -m "refactor(style-vault): 迁移 admin-toolbar → composites/layout/toolbar-bar"
```

---

### Task A6: 清理旧 tokens/ 目录（已空）

**Step 1: 删除**

```bash
rm -rf ~/.agents/skills/style-vault/references/tokens
```

（目前就一个空目录，没有遗留文件，直接删。）

**Step 2: 提交**

```bash
cd ~/.agents
git add -A skills/style-vault/references/
git commit -m "refactor(style-vault): 移除旧 tokens/ 空目录，设计原语迁至 primitives/"
```

---

### Task A7: 重写 SKILL.md（新骨架）

**Files:**
- Modify: `~/.agents/skills/style-vault/SKILL.md`（完全重写）

**Step 1: 按设计稿 Ⅲ.7 的骨架写**

section 顺序：
1. frontmatter（含 triggers 列表）
2. 使用场景（沉淀 vs 消费两模式）
3. 分层结构速查（引用 `references/README.md`）
4. 沉淀 10 步流程
5. 消费 5 步流程
6. path.json 读法 + VAULT_OK 分支逻辑
7. 容错矩阵（表格形式）
8. 维护指南：给所有 AI 的规则

关键段落必须包含：
- 消费模式**禁止**读 path.json（避免误操作）
- 沉淀模式**必须**先归类再写文件
- 新 tag 值**必须**先改 `_tags.yaml`
- primitive 条目**必须**含可 JSON.parse 的 tokens 块

长度控制在 200~300 行。

**Step 2: 肉眼核对**

- triggers 覆盖 `/style-vault`、"沉淀风格"、"加到 vault"、"用 xxx 风格"、"style-vault skill"
- 10 步 + 5 步每步编号清晰，可被 AI 按步执行
- 容错矩阵覆盖设计稿 Ⅲ.5 的所有 9 种情况

**Step 3: 提交**

```bash
cd ~/.agents
git add skills/style-vault/SKILL.md
git commit -m "feat(style-vault): 重写 SKILL.md 加入沉淀/消费双模式与容错矩阵"
```

---

### Task A8: 跨 Task 自检——skill 目录结构完整性

**Step 1: 跑命令检查**

```bash
tree ~/.agents/skills/style-vault -L 3 --gitignore
```

**Expected：**
- 五个一级目录都有 `_CATEGORY.md`
- `_tags.yaml` 存在
- `references/README.md` 存在
- `composites/display/table.md` 和 `composites/layout/toolbar-bar.md` 存在
- 无残留 `admin-*.md` / `tokens/`

**Step 2: 如有不对**

Fix 并补一个 fix commit：`fix(style-vault): <具体>`。

---

### Task A9: 阶段 A 归档（skill 侧 A 阶段结束点）

**Step 1: 不做改动，只观察 git log**

```bash
cd ~/.agents && git log --oneline -15
```

**Expected：** 连续约 7~8 个 `feat(style-vault)` / `refactor(style-vault)` commit。

---

# 阶段 B · 网站初始化

仓：`/Users/links/Coding/Archer/style-vault`

### Task B1: 初始化 Vite + React 19 + TS

**Files:**
- Create: `/Users/links/Coding/Archer/style-vault/frontend/**`

**Step 1: 用 Vite 脚手架**

```bash
cd /Users/links/Coding/Archer/style-vault
yarn create vite frontend --template react-ts
```

**Step 2: 安装依赖**

```bash
cd frontend
yarn install
```

**Step 3: 跳过 Vite 默认 git init**

Vite 模板可能会初始化一个 frontend/ 内部 git，检查 `frontend/.git` 是否存在，存在则删除（根 git 已在仓根）：

```bash
rm -rf frontend/.git
```

**Step 4: 验证 dev server 启动**

```bash
yarn dev
```

浏览器访问 `http://localhost:5173`，看到 Vite 默认欢迎页。Ctrl+C 退出。

**Step 5: 提交**

```bash
cd /Users/links/Coding/Archer/style-vault
git add frontend/
git commit -m "chore: 初始化 Vite + React 19 + TS 前端骨架"
```

---

### Task B2: 安装运行时依赖

**Step 1: 装 UI / 路由 / 样式**

```bash
cd /Users/links/Coding/Archer/style-vault/frontend
yarn add antd react-router-dom
yarn add -D tailwindcss postcss autoprefixer @types/node
npx tailwindcss init -p
```

**Step 2: 配置 Tailwind**

修改 `frontend/tailwind.config.js`：

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
};
```

修改 `frontend/src/index.css`，顶部加：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Step 3: 验证 Tailwind 生效**

把 `frontend/src/App.tsx` 里加一个 `className="text-red-500 text-3xl"` 的元素，跑 `yarn dev` 肉眼验证红色大字显示。

**Step 4: 提交**

```bash
cd /Users/links/Coding/Archer/style-vault
git add frontend/
git commit -m "chore: 安装 Antd/Tailwind/react-router-dom 依赖"
```

---

### Task B3: 写入 `"style-vault-site": true` marker

**Files:**
- Modify: `/Users/links/Coding/Archer/style-vault/frontend/package.json`

**Step 1: 加字段**

在 `frontend/package.json` 顶层加：

```json
{
  "name": "style-vault-frontend",
  "style-vault-site": true,
  "private": true,
  ...
}
```

**Step 2: 验证**

```bash
jq '."style-vault-site"' frontend/package.json
```

Expected：`true`

**Step 3: 提交**

```bash
cd /Users/links/Coding/Archer/style-vault
git add frontend/package.json
git commit -m "feat: 加入 \"style-vault-site\" marker 供 skill 识别本仓"
```

---

### Task B4: 建源码骨架目录

**Files（全部 Create）:**
- `frontend/src/pages/.gitkeep`
- `frontend/src/preview/.gitkeep`
- `frontend/src/components/.gitkeep`
- `frontend/src/data/.gitkeep`
- `frontend/src/utils/.gitkeep`
- `frontend/scripts/.gitkeep`
- `frontend/tests/.gitkeep`

**Step 1: 建目录**

```bash
cd /Users/links/Coding/Archer/style-vault/frontend
mkdir -p src/{pages,preview,components,data,utils} scripts tests
for d in src/pages src/preview src/components src/data src/utils scripts tests; do
  touch "$d/.gitkeep"
done
```

**Step 2: 提交**

```bash
cd /Users/links/Coding/Archer/style-vault
git add frontend/
git commit -m "chore: 预铺源码骨架目录（pages/preview/components/data/utils/scripts/tests）"
```

---

### Task B5: App.tsx 基础路由 + Antd ConfigProvider

**Files:**
- Modify: `frontend/src/App.tsx`
- Modify: `frontend/src/main.tsx`
- Create: `frontend/src/pages/BrowsePage.tsx`（占位）
- Create: `frontend/src/pages/DetailPage.tsx`（占位）
- Create: `frontend/src/pages/NotInstalledPage.tsx`（占位）

**Step 1: main.tsx 包 BrowserRouter**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
```

**Step 2: App.tsx 基础路由**

```tsx
import { Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import BrowsePage from './pages/BrowsePage';
import DetailPage from './pages/DetailPage';
import NotInstalledPage from './pages/NotInstalledPage';

export default function App() {
  return (
    <ConfigProvider>
      <Routes>
        <Route path="/" element={<BrowsePage />} />
        <Route path="/item/:id*" element={<DetailPage />} />
        <Route path="/not-installed" element={<NotInstalledPage />} />
        {/* preview/* 路由在 Task E1 后加 */}
      </Routes>
    </ConfigProvider>
  );
}
```

**Step 3: 三个 Page 占位**

每个返回 `<div>Browse / Detail / NotInstalled - TODO</div>`。

**Step 4: 验证**

`yarn dev`，访问 `/`、`/item/xxx`、`/not-installed` 都能看到对应占位字样。

**Step 5: 提交**

```bash
cd /Users/links/Coding/Archer/style-vault
git add frontend/src/
git commit -m "feat: App 基础路由 + 三个 Page 占位"
```

---

### Task B6: 建 `scripts/` 目录 + 安装 sync 脚本依赖

**Step 1: 安装**

```bash
cd /Users/links/Coding/Archer/style-vault/frontend
yarn add -D gray-matter js-yaml fast-glob @types/js-yaml vitest tsx
```

**Step 2: package.json scripts**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "sync": "tsx scripts/sync-from-skill/index.ts",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

**Step 3: 验证 tsx 可跑**

```bash
echo 'console.log("tsx ok")' > scripts/_smoke.ts
yarn tsx scripts/_smoke.ts
rm scripts/_smoke.ts
```

Expected：打印 `tsx ok`。

**Step 4: 提交**

```bash
cd /Users/links/Coding/Archer/style-vault
git add frontend/
git commit -m "chore: 安装 sync 脚本依赖（gray-matter/js-yaml/fast-glob/vitest/tsx）"
```

---

# 阶段 C · sync-from-skill 脚本（TDD）

仓：`/Users/links/Coding/Archer/style-vault/frontend/`

脚本目录：`frontend/scripts/sync-from-skill/`，测试：`frontend/tests/sync/`

### Task C1: 定义类型与常量

**Files:**
- Create: `frontend/scripts/sync-from-skill/types.ts`
- Create: `frontend/scripts/sync-from-skill/config.ts`

**Step 1: types.ts**

```typescript
export type EntryType = 'vibe' | 'archetype' | 'composite' | 'atom' | 'primitive';

export interface Frontmatter {
  id: string;
  type: EntryType;
  name: string;
  description: string;
  tags: {
    aesthetic: string[];
    mood: string[];
    theme: ('light' | 'dark')[];
    stack: string[];
  };
  uses?: string[];
  preview?: string;
}

export interface TagDict {
  aesthetic: string[];
  mood: string[];
  theme: string[];
  stack: string[];
}

export interface RegistryItem extends Frontmatter {
  uses: string[];
  usedBy: string[];
  hasPreviewFile: boolean;
  skillPath: string;
  tokens?: unknown;
}

export interface Registry {
  version: string;
  items: RegistryItem[];
  tagDict: TagDict;
}

export interface ValidationIssue {
  level: 'error' | 'warning';
  entryId?: string;
  message: string;
}
```

**Step 2: config.ts**

```typescript
import path from 'node:path';
import os from 'node:os';

export const SKILL_ROOT = path.join(os.homedir(), '.agents/skills/style-vault');
export const REFERENCES_DIR = path.join(SKILL_ROOT, 'references');
export const TAGS_FILE = path.join(REFERENCES_DIR, '_tags.yaml');
export const WEBSITE_ROOT = path.resolve(__dirname, '../..');
export const PREVIEW_DIR = path.join(WEBSITE_ROOT, 'src/preview');
export const REGISTRY_OUT = path.join(WEBSITE_ROOT, 'src/data/registry.json');
```

**Step 3: 提交**

```bash
git add frontend/scripts/sync-from-skill/
git commit -m "feat(sync): 定义 sync 脚本类型与路径常量"
```

---

### Task C2: TDD — Frontmatter 解析与 ID 校验

**Files:**
- Create: `frontend/tests/sync/parse.test.ts`
- Create: `frontend/scripts/sync-from-skill/parse.ts`

**Step 1: 写失败测试**

```typescript
// frontend/tests/sync/parse.test.ts
import { describe, it, expect } from 'vitest';
import { parseEntry } from '../../scripts/sync-from-skill/parse';

describe('parseEntry', () => {
  it('parses valid frontmatter', () => {
    const md = `---
id: atoms/buttons/ghost-button
type: atom
name: Ghost Button
description: 幽灵按钮
tags:
  aesthetic: [minimal]
  mood: [calm]
  theme: [light, dark]
  stack: [react-antd-tailwind]
---
# Ghost Button`;
    const result = parseEntry(md, 'atoms/buttons/ghost-button.md');
    expect(result.frontmatter.id).toBe('atoms/buttons/ghost-button');
    expect(result.frontmatter.type).toBe('atom');
  });

  it('throws when id mismatches path', () => {
    const md = `---
id: atoms/buttons/wrong-id
type: atom
name: X
description: x
tags: {aesthetic: [], mood: [], theme: [light], stack: [html-tailwind]}
---`;
    expect(() => parseEntry(md, 'atoms/buttons/ghost-button.md')).toThrow(/id/i);
  });

  it('throws when required field missing', () => {
    const md = `---
id: atoms/buttons/x
type: atom
---`;
    expect(() => parseEntry(md, 'atoms/buttons/x.md')).toThrow(/name|description|tags/);
  });
});
```

**Step 2: 跑，确认失败**

```bash
cd frontend && yarn test tests/sync/parse.test.ts
```

Expected：`FAIL` —— `Cannot find module './scripts/sync-from-skill/parse'`

**Step 3: 实现最小 parse.ts**

```typescript
// frontend/scripts/sync-from-skill/parse.ts
import matter from 'gray-matter';
import type { Frontmatter } from './types';

export function parseEntry(content: string, relativePath: string) {
  const { data, content: body } = matter(content);
  const fm = data as Partial<Frontmatter>;

  const expectedId = relativePath.replace(/(\/README)?\.md$/, '');
  if (fm.id !== expectedId) {
    throw new Error(`id mismatch: frontmatter "${fm.id}" vs path "${expectedId}"`);
  }

  for (const field of ['id', 'type', 'name', 'description', 'tags'] as const) {
    if (!fm[field]) throw new Error(`missing required field: ${field}`);
  }
  for (const key of ['aesthetic', 'mood', 'theme', 'stack'] as const) {
    if (!Array.isArray(fm.tags?.[key])) {
      throw new Error(`tags.${key} must be array`);
    }
  }

  return { frontmatter: fm as Frontmatter, body };
}
```

**Step 4: 跑测试，PASS**

```bash
yarn test tests/sync/parse.test.ts
```

**Step 5: 提交**

```bash
git add frontend/
git commit -m "feat(sync): parse 与 ID 校验（TDD）"
```

---

### Task C3: TDD — Walk references 树

**Files:**
- Create: `frontend/tests/sync/walk.test.ts`
- Create: `frontend/scripts/sync-from-skill/walk.ts`
- Create: `frontend/tests/sync/fixtures/simple/` 作为 mock skill 根（含 2~3 个 mock 条目）

**Step 1: 建 fixture**

```
frontend/tests/sync/fixtures/simple/references/
├── _tags.yaml   (最小合法字典)
├── atoms/buttons/ghost.md
└── primitives/palettes/cool.md
```

**Step 2: 写测试**

```typescript
// walk.test.ts
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { walkReferences } from '../../scripts/sync-from-skill/walk';

const FIX = path.resolve(__dirname, 'fixtures/simple/references');

describe('walkReferences', () => {
  it('finds file-style entries', async () => {
    const entries = await walkReferences(FIX);
    const ids = entries.map(e => e.frontmatter.id).sort();
    expect(ids).toEqual(['atoms/buttons/ghost', 'primitives/palettes/cool']);
  });

  it('ignores _CATEGORY.md, README.md, _tags.yaml, .gitkeep', async () => {
    const entries = await walkReferences(FIX);
    expect(entries.every(e => !e.frontmatter.id.includes('_CATEGORY'))).toBe(true);
  });
});
```

**Step 3: 跑，失败**

**Step 4: 实现 walk.ts**

```typescript
import fg from 'fast-glob';
import fs from 'node:fs/promises';
import path from 'node:path';
import { parseEntry } from './parse';

export async function walkReferences(root: string) {
  const files = await fg(['**/*.md', '**/README.md'], {
    cwd: root,
    ignore: ['**/_CATEGORY.md', 'README.md'],
  });

  const entries = [];
  for (const rel of files) {
    const content = await fs.readFile(path.join(root, rel), 'utf-8');
    const parsed = parseEntry(content, rel);
    entries.push({ ...parsed, relativePath: rel });
  }
  return entries;
}
```

**Step 5: 跑测试，PASS**

**Step 6: 补一条 folder-style 条目 fixture + 测试**

在 `fixtures/simple/references/vibes/saas-tool/example-vibe/README.md` 加个文件夹条目，测试能被识别，id 为 `vibes/saas-tool/example-vibe`。

**Step 7: 提交**

```bash
git add frontend/
git commit -m "feat(sync): walkReferences 扫描 references 树（TDD）"
```

---

### Task C4: TDD — Tag 字典校验

**Files:**
- Create: `frontend/tests/sync/validate-tags.test.ts`
- Create: `frontend/scripts/sync-from-skill/validate.ts`

**Step 1: 写测试**

测 3 种情况：
- 全部 tag 合法 → 无 issue
- aesthetic 里出现字典外值 → error issue
- theme 里出现 `sepia`（不在字典）→ error issue

**Step 2: 失败 → 实现 → PASS**

```typescript
// validate.ts 片段
export function validateTags(fm: Frontmatter, dict: TagDict): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  for (const key of ['aesthetic', 'mood', 'theme', 'stack'] as const) {
    for (const v of fm.tags[key]) {
      if (!dict[key].includes(v)) {
        issues.push({
          level: 'error',
          entryId: fm.id,
          message: `tags.${key}[${v}] not in dictionary`,
        });
      }
    }
  }
  return issues;
}
```

**Step 3: 提交**

```bash
git commit -m "feat(sync): tag 字典校验（TDD）"
```

---

### Task C5: TDD — `uses` 存在性 + 反向 `usedBy`

**Files:**
- Extend: `frontend/scripts/sync-from-skill/validate.ts`（加 validateUses 和 computeUsedBy）
- Extend: `frontend/tests/sync/validate-uses.test.ts`

**Step 1: 写测试**

- uses 里引用的 ID 存在 → 合法
- uses 里有不存在的 ID → warning（不是 error，允许悬空）
- A uses B、C uses B → B.usedBy = [A, C]
- 自引用 → error

**Step 2: 失败 → 实现 → PASS**

```typescript
export function validateUses(entries: Entry[]): ValidationIssue[] {
  const allIds = new Set(entries.map(e => e.frontmatter.id));
  const issues: ValidationIssue[] = [];
  for (const e of entries) {
    const uses = e.frontmatter.uses ?? [];
    for (const ref of uses) {
      if (ref === e.frontmatter.id) {
        issues.push({ level: 'error', entryId: e.frontmatter.id, message: `self reference: ${ref}` });
      } else if (!allIds.has(ref)) {
        issues.push({ level: 'warning', entryId: e.frontmatter.id, message: `dangling uses: ${ref}` });
      }
    }
  }
  return issues;
}

export function computeUsedBy(entries: Entry[]): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const e of entries) {
    for (const ref of e.frontmatter.uses ?? []) {
      const arr = map.get(ref) ?? [];
      arr.push(e.frontmatter.id);
      map.set(ref, arr);
    }
  }
  return map;
}
```

**Step 3: 提交**

```bash
git commit -m "feat(sync): uses 校验 + usedBy 反向索引（TDD）"
```

---

### Task C6: TDD — Preview 文件存在性校验

**Files:**
- Extend: `frontend/scripts/sync-from-skill/validate.ts`
- Create: `frontend/tests/sync/validate-preview.test.ts`

**Step 1: 写测试**

- `preview` 字段有，对应 `src/preview/<id>.tsx` 存在 → hasPreviewFile=true
- `preview` 字段有但文件缺 → warning + hasPreviewFile=false
- `preview` 字段无 → hasPreviewFile=false，不警告

**Step 2: 实现**

```typescript
export async function validatePreview(
  fm: Frontmatter,
  previewRoot: string,
): Promise<{ hasPreviewFile: boolean; issues: ValidationIssue[] }> {
  if (!fm.preview) return { hasPreviewFile: false, issues: [] };

  const route = fm.preview.replace(/^\/preview\//, '');
  const filePath = path.join(previewRoot, `${route}.tsx`);
  const exists = await fs.access(filePath).then(() => true).catch(() => false);

  return {
    hasPreviewFile: exists,
    issues: exists ? [] : [{
      level: 'warning',
      entryId: fm.id,
      message: `preview file missing: ${filePath}`,
    }],
  };
}
```

**Step 3: 提交**

```bash
git commit -m "feat(sync): preview 文件存在性校验（TDD）"
```

---

### Task C7: TDD — 生成 `registry.json`

**Files:**
- Create: `frontend/scripts/sync-from-skill/emit.ts`
- Create: `frontend/tests/sync/emit.test.ts`
- Create: `frontend/scripts/sync-from-skill/index.ts`（入口，整合上述）

**Step 1: 写测试**

喂一组 mock entries + tagDict，期望 `emit` 产出的 JSON：
- 有 `version`（时间戳）
- items 数量正确
- 每个 item 有完整字段
- items 按 id 字典序稳定排序

**Step 2: 失败 → 实现 `emit`**

**Step 3: 实现 `index.ts` 串起来**

```typescript
// index.ts
import fs from 'node:fs/promises';
import yaml from 'js-yaml';
import { walkReferences } from './walk';
import { validateTags, validateUses, validatePreview, computeUsedBy } from './validate';
import { emit } from './emit';
import { REFERENCES_DIR, TAGS_FILE, PREVIEW_DIR, REGISTRY_OUT } from './config';

async function main() {
  const tagDict = yaml.load(await fs.readFile(TAGS_FILE, 'utf-8')) as TagDict;
  const entries = await walkReferences(REFERENCES_DIR);

  const issues: ValidationIssue[] = [];
  const items = [];
  const usedBy = computeUsedBy(entries);

  for (const e of entries) {
    issues.push(...validateTags(e.frontmatter, tagDict));
    const { hasPreviewFile, issues: pIssues } = await validatePreview(e.frontmatter, PREVIEW_DIR);
    issues.push(...pIssues);
    items.push({
      ...e.frontmatter,
      uses: e.frontmatter.uses ?? [],
      usedBy: usedBy.get(e.frontmatter.id) ?? [],
      hasPreviewFile,
      skillPath: e.relativePath,
    });
  }
  issues.push(...validateUses(entries));

  const errors = issues.filter(i => i.level === 'error');
  const warnings = issues.filter(i => i.level === 'warning');
  warnings.forEach(w => console.warn(`[warn] ${w.entryId}: ${w.message}`));
  errors.forEach(e => console.error(`[error] ${e.entryId}: ${e.message}`));

  if (errors.length > 0) {
    console.error(`\n✗ ${errors.length} errors, aborting.`);
    process.exit(1);
  }

  await emit(items, tagDict, REGISTRY_OUT);
  console.log(`✓ synced ${items.length} items to ${REGISTRY_OUT}`);
}

main().catch(e => { console.error(e); process.exit(1); });
```

**Step 4: 提交**

```bash
git commit -m "feat(sync): emit registry.json + 入口脚本整合校验管线（TDD）"
```

---

### Task C8: 端到端 smoke（跑真实 skill）

**Step 1: 当前 skill 已有 2 个真实 composite + `_tags.yaml`**

（A4/A5 迁移完成后）

```bash
cd /Users/links/Coding/Archer/style-vault/frontend
yarn sync
```

**Expected：**
- 输出 `✓ synced 2 items to .../registry.json`
- warnings：preview 文件缺失（Task E/F 之前必然缺）
- 产物 `src/data/registry.json` 存在且能 `jq .` 看到 2 个条目

**Step 2: 查看产物**

```bash
jq '.items | length' src/data/registry.json    # 2
jq '.items[] | .id' src/data/registry.json
```

**Step 3: 提交**

```bash
cd /Users/links/Coding/Archer/style-vault
git add frontend/src/data/registry.json
git commit -m "chore: 首次 sync 生成 registry.json（含 2 条迁移 composite）"
```

---

# 阶段 D · 网站 UI

仓：`/Users/links/Coding/Archer/style-vault/frontend/`

### Task D1: 读 registry.json 的 data loader

**Files:**
- Create: `frontend/src/data/useRegistry.ts`

**Step 1: 实现 hook**

```typescript
import registryJson from './registry.json';
import type { Registry } from '../../scripts/sync-from-skill/types';

export function useRegistry(): Registry {
  return registryJson as unknown as Registry;
}

export function useItem(id: string) {
  return useRegistry().items.find(i => i.id === id);
}
```

**Step 2: 提交**

```bash
git commit -m "feat(ui): registry data loader hook"
```

---

### Task D2: StyleCard 组件 + BrowsePage 列表

**Files:**
- Create: `frontend/src/components/StyleCard.tsx`
- Modify: `frontend/src/pages/BrowsePage.tsx`

**Step 1: StyleCard**

每张卡片：左上角 type chip、iframe（若 `hasPreviewFile`）或占位灰块、name、description、tag chips、`前往详情` 链接。

**Step 2: BrowsePage**

读 registry，按 type 分 tab（Vibes / Archetypes / Composites / Atoms / Primitives），每 tab 下一个 CSS grid。

**Step 3: 肉眼验证**

`yarn dev`，主页能看到 2 张 composite 卡片（Admin Table、Admin Toolbar Bar），暂时 iframe 为空占位。

**Step 4: 提交**

```bash
git commit -m "feat(ui): StyleCard + BrowsePage 列表"
```

---

### Task D3: TagFilter 侧栏

**Files:**
- Create: `frontend/src/components/TagFilter.tsx`
- Modify: `frontend/src/pages/BrowsePage.tsx`

**Step 1: TagFilter**

左侧固定栏：aesthetic / mood / theme / stack 四组，每组用 Antd `Checkbox.Group`。state 提升到 BrowsePage，按勾选交集过滤 items。

**Step 2: 验证**

勾 `aesthetic=minimal` 过滤掉非 minimal，切换即时生效。

**Step 3: 提交**

```bash
git commit -m "feat(ui): TagFilter 侧栏 + 交集筛选"
```

---

### Task D4: DetailPage + iframe + ViewportSwitcher

**Files:**
- Modify: `frontend/src/pages/DetailPage.tsx`
- Create: `frontend/src/components/ViewportSwitcher.tsx`

**Step 1: DetailPage**

- 通过 `useParams` 从 `/item/<id>` 取 id（注意 id 含斜杠，需要 `useParams<"*">` 或 `useLocation` 解析）
- 左 40%：name、description、tag chips、uses/usedBy 列表、"看代码"按钮（跳转到 skill 源文件的本地路径）
- 右 60%：iframe，`src = preview`（若 `hasPreviewFile`）
- 上方 ViewportSwitcher：375 / 768 / 1024 / 1440

**Step 2: ViewportSwitcher**

控制 iframe 宽度（通过 iframe 外层 div 的 max-width）。Antd `Radio.Group`。

**Step 3: 验证**

因为 2 个 composite 还没 preview 页，iframe 会显示 404（正常，回到阶段 E/F 再补）。基础结构先跑通。

**Step 4: 提交**

```bash
git commit -m "feat(ui): DetailPage + iframe + ViewportSwitcher"
```

---

### Task D5: Prompt 模板 util + TDD

**Files:**
- Create: `frontend/src/utils/prompt.ts`
- Create: `frontend/tests/utils/prompt.test.ts`

**Step 1: 测试**

```typescript
import { buildPrompt } from '../../src/utils/prompt';

it('builds basic prompt', () => {
  const p = buildPrompt({
    id: 'vibes/saas-tool/cold-industrial-saas',
    type: 'vibe',
    tags: { aesthetic: ['minimal'], mood: ['cold'], theme: ['dark'], stack: ['react-antd-tailwind'] },
    uses: ['primitives/palettes/slate-cyan-ice'],
  });
  expect(p).toContain('使用 style-vault skill');
  expect(p).toContain('主体: vibe: vibes/saas-tool/cold-industrial-saas');
  expect(p).toContain('aesthetic=[minimal]');
  expect(p).toContain('~/.agents/skills/style-vault/references/vibes/saas-tool/cold-industrial-saas');
});
```

**Step 2: 实现**

设计稿 Ⅱ.8 的模板。

**Step 3: 提交**

```bash
git commit -m "feat(ui): Prompt 模板 util（TDD）"
```

---

### Task D6: PromptCopyButton

**Files:**
- Create: `frontend/src/components/PromptCopyButton.tsx`
- Modify: `frontend/src/pages/DetailPage.tsx`

**Step 1: 按钮组件**

点击 `navigator.clipboard.writeText(buildPrompt(item))`，复制后 Antd `message.success('Prompt 已复制')`。

**Step 2: 挂到 DetailPage**

Step 3: 验证

Step 4: 提交

```bash
git commit -m "feat(ui): PromptCopyButton"
```

---

### Task D7: NotInstalledPage 与 registry 缺失兜底

**Files:**
- Modify: `frontend/src/pages/NotInstalledPage.tsx`
- Modify: `frontend/src/data/useRegistry.ts`（处理 registry 为空的兜底）

**Step 1: useRegistry 兜底**

```typescript
// 若 registry.items 为空或 version 为 '0'，视为未同步
export function isRegistryMissing(r: Registry) {
  return !r || !r.items || r.items.length === 0;
}
```

**Step 2: BrowsePage 检测 + 重定向**

BrowsePage 顶部 `if (isRegistryMissing(registry)) return <Navigate to="/not-installed" />`

**Step 3: NotInstalledPage 文案**

说明：
- 本项目是 style-vault 网站仓，需要从 skill 仓同步数据
- 运行 `yarn sync`
- 若完全是外部用户，访问 skill 即可，不需网站

**Step 4: 提交**

```bash
git commit -m "feat(ui): NotInstalledPage 与 registry 缺失兜底"
```

---

### Task D8: 顶部栏 + 整体样式收敛

**Files:**
- Create: `frontend/src/components/TopBar.tsx`
- Modify: `frontend/src/App.tsx`

**Step 1: TopBar**

含 logo、`Style Vault` 标题、总条目数（来自 registry）、GitHub 链接（暂占位）。

**Step 2: 全局 CSS 微调**

`index.css` 里加 `html, body, #root { height: 100% }` 等常见 reset，保证 iframe 容器高度。

**Step 3: 验证**

`yarn dev` 肉眼过一遍 UI 完整性。

**Step 4: 提交**

```bash
git commit -m "feat(ui): TopBar + 全局样式收敛"
```

---

# 阶段 E · Preview 模板

### Task E1: Preview 布局包装 + 注册路由

**Files:**
- Create: `frontend/src/preview/_layout.tsx`（所有 preview 页共享的外层容器，负责 body 纯白 / 深色背景、禁用 Antd 污染）
- Modify: `frontend/src/App.tsx`（加 `/preview/*` 路由，用 lazy 动态引入）

**Step 1: _layout.tsx**

```tsx
import { ReactNode } from 'react';

export function PreviewFrame({ children, bg = '#fff' }: { children: ReactNode; bg?: string }) {
  return (
    <div style={{ minHeight: '100vh', background: bg, padding: 24 }}>
      {children}
    </div>
  );
}
```

**Step 2: App.tsx 加路由**

```tsx
const lazyPreview = (id: string) => React.lazy(() => import(`./preview/${id}.tsx`));

// 在 App 里遍历 registry.items 若有 preview，就加一条路由
```

Alternative（更简单）：用 Vite 的 `import.meta.glob`，动态收集 `src/preview/**/*.tsx` 映射到路由。

```tsx
const previews = import.meta.glob('./preview/**/*.tsx', { eager: false });

// 每个 key 形如 './preview/atoms/buttons/ghost-button.tsx'
// 映射为 '/preview/atoms/buttons/ghost-button'
```

**Step 3: 验证（先搁置，等 F 阶段第一条 preview 产出再验）**

**Step 4: 提交**

```bash
git commit -m "feat(preview): PreviewFrame 容器 + 动态路由收集"
```

---

### Task E2: Preview 模板库（5 类 + primitive 子类）

**Files:**
- Create: `frontend/src/preview/_templates/vibe.tsx`（供 F 阶段拷贝）
- Create: `frontend/src/preview/_templates/archetype.tsx`
- Create: `frontend/src/preview/_templates/composite.tsx`
- Create: `frontend/src/preview/_templates/atom.tsx`
- Create: `frontend/src/preview/_templates/primitive-palette.tsx`
- Create: `frontend/src/preview/_templates/primitive-typography.tsx`
- Create: `frontend/src/preview/_templates/primitive-motion.tsx`

**Step 1: 每个模板含一段注释说明用法**

每个文件默认 export 一个示例组件，注释里写"拷贝本文件到 `src/preview/<id>.tsx`，替换 tokens 和内容"。

**Step 2: 这些模板本身不参与路由**

`App.tsx` 的 glob 过滤 `**/_templates/**` 排除。

**Step 3: 提交**

```bash
git commit -m "feat(preview): 5 类 + primitive 子类 preview 模板（供拷贝）"
```

---

# 阶段 F · 首批样板条目（端到端验证）

**顺序从下层到上层**：primitive → atom → composite → archetype → vibe。
每一条：先写 skill 条目 commit（~/.agents），再写 preview.tsx commit（style-vault），再 sync 一次看进度。

### Task F1: primitive.palette `slate-cyan-ice`

**Files（skill 侧）:**
- Create: `~/.agents/skills/style-vault/references/primitives/palettes/slate-cyan-ice.md`
- Delete: `~/.agents/skills/style-vault/references/primitives/palettes/.gitkeep`

**Step 1: skill 条目**

```yaml
---
id: primitives/palettes/slate-cyan-ice
type: primitive
name: Slate × Cyan Ice
description: 冷感留白、深 slate 底 + cyan 高亮、工具型界面基础色
tags:
  aesthetic: [minimal, industrial]
  mood: [cold, serious]
  theme: [dark, light]
  stack: [react-antd-tailwind, html-tailwind]
preview: /preview/primitives/palettes/slate-cyan-ice
---

# Slate × Cyan Ice

> 冷感留白工具型配色

## Tokens

```json
{
  "bg":         { "base": "#0f172a", "subtle": "#1e293b", "panel": "#0b1220" },
  "fg":         { "base": "#e2e8f0", "muted": "#94a3b8", "subtle": "#64748b" },
  "accent":     { "base": "#22d3ee", "hover": "#06b6d4", "active": "#0891b2" },
  "border":     { "base": "#1e293b", "strong": "#334155" },
  "status":     { "success": "#10b981", "warning": "#f59e0b", "danger": "#ef4444" }
}
```

## 视觉特征 / 适配指南 / 反模式 …
```

**Step 2: skill commit**

```bash
cd ~/.agents && git add skills/style-vault/references/primitives/palettes/
git commit -m "feat(style-vault): 新增 primitive.palette slate-cyan-ice"
```

**Step 3: 网站侧 preview**

Create `frontend/src/preview/primitives/palettes/slate-cyan-ice.tsx`。

从 `_templates/primitive-palette.tsx` 拷贝，替换 tokens。渲染色卡矩阵（bg/fg/accent/border/status 五组），每组显示 hex + 实色方块，并给明色/暗色背景对照。

**Step 4: sync + 验证**

```bash
cd /Users/links/Coding/Archer/style-vault/frontend
yarn sync
```

Expected：registry.items +1，warnings 减少 1（palette 的 preview 有了）。

**Step 5: 网站 commit**

```bash
cd /Users/links/Coding/Archer/style-vault
git add frontend/src/preview/primitives/palettes/ frontend/src/data/registry.json
git commit -m "feat: 新增 slate-cyan-ice palette preview"
```

---

### Task F2: primitive.typography.pairs `ibm-plex-duo`

同 F1 结构：
1. skill md（引用 Google Fonts CDN URL、Plex Sans + Plex Mono 搭配规则、字阶建议）
2. skill commit
3. preview.tsx（字阶样张：h1~caption + mono code 示例；`@import` 来加载字体）
4. sync
5. website commit

---

### Task F3: atom.buttons `ghost-button`

1. skill md：frontmatter（`uses: [primitives/palettes/slate-cyan-ice]`，引用色板变量）+ React 核心代码 + 反模式（不要填色）
2. skill commit
3. preview.tsx：5 个状态并列（default / hover / active / disabled / loading）
4. sync
5. website commit

---

### Task F4: 给已迁移的 2 个 composite 补 preview

**Files:**
- Create: `frontend/src/preview/composites/display/table.tsx`
- Create: `frontend/src/preview/composites/layout/toolbar-bar.tsx`

**Step 1: table preview**

用 mock 数据（5~10 行）+ 真实 AdminTable 组件实现（按 skill md 里的核心代码）。

**Step 2: toolbar-bar preview**

同上。

**Step 3: sync + commit**

```bash
cd /Users/links/Coding/Archer/style-vault
yarn --cwd frontend sync
git add frontend/src/preview/composites/ frontend/src/data/registry.json
git commit -m "feat: 补 admin-table 和 toolbar-bar 的 preview 页"
```

---

### Task F5: archetype.landing `saas-landing`

1. skill：文件夹式条目 `archetypes/landing/saas-landing/README.md`（含整页结构 + CSS 变量注入口）
2. skill commit
3. preview.tsx：完整一页（hero + logo wall + feature grid + pricing + CTA）
4. sync
5. website commit

---

### Task F6: vibe.saas-tool `cold-industrial-saas`

1. skill：`vibes/saas-tool/cold-industrial-saas/README.md`
   - `uses`: 引 F1/F2/F3 全部 + F5 的 archetype
2. skill commit
3. preview.tsx：展示"整站调性"——顶部导航 + 一段 hero + 一段 dashboard 缩略 + 底部 footer，用 slate-cyan-ice + ibm-plex-duo + ghost-button
4. sync
5. website commit

---

### Task F7: 端到端自检

**Step 1: 跑 sync**

```bash
cd /Users/links/Coding/Archer/style-vault/frontend
yarn sync
```

**Expected：** 0 errors, 0 warnings（所有条目的 preview 文件都就位）。

**Step 2: 跑 dev server**

```bash
yarn dev
```

肉眼核对：
- Browse 页看到 6 个条目（2 旧 composite + 4 新）分布在正确 tab
- 点 `cold-industrial-saas`，详情页 iframe 正确渲染 vibe 预览
- ViewportSwitcher 切换生效
- "复制 Prompt" 按下后粘贴板内容符合 Ⅱ.8 模板
- uses/usedBy 列表正确（vibe 的 uses 列出 palette/typography/button/archetype）

**Step 3: 如发现问题，fix + 补 commit**

---

# 阶段 G · path.json + 外部容错验证

仓：`~/.agents`（path.json 在仓内）

### Task G1: 写入 `style-vault` 字段

**Files:**
- Modify: `~/.agents/path.json`

**Step 1: 改 path.json**

```json
{
  "spechub": "/Users/links/Coding/A-complex/ikt/skills/spechub",
  "style-vault": "/Users/links/Coding/Archer/style-vault"
}
```

**Step 2: 验证 jq 读法**

```bash
jq -r '."style-vault" // empty' ~/.agents/path.json
```

Expected：打印绝对路径。

**Step 3: 提交**

```bash
cd ~/.agents
git add path.json
git commit -m "feat: path.json 新增 style-vault 字段指向本地网站仓"
```

---

### Task G2: 容错手验 — path.json 缺字段

**Step 1: 备份 + 临时改**

```bash
cp ~/.agents/path.json ~/.agents/path.json.bak
jq 'del(."style-vault")' ~/.agents/path.json.bak > ~/.agents/path.json
```

**Step 2: 模拟运行 skill 读逻辑（bash 脚本）**

```bash
VAULT=$(jq -r '."style-vault" // empty' ~/.agents/path.json 2>/dev/null)
if [[ -z "$VAULT" ]]; then echo "VAULT_OK=false"; else echo "VAULT_OK=true"; fi
```

Expected：`VAULT_OK=false`

**Step 3: 恢复**

```bash
mv ~/.agents/path.json.bak ~/.agents/path.json
```

**Step 4: 记录**

不 commit，仅验证，结果记到 `docs/plans/2026-04-23-style-vault-expansion-plan.md` 的末尾 validation log 节（可选）。

---

### Task G3: 容错手验 — 目录不存在

**Step 1: 临时改 path.json 指向不存在目录**

```bash
cp ~/.agents/path.json ~/.agents/path.json.bak
jq '."style-vault" = "/tmp/no-such-dir"' ~/.agents/path.json.bak > ~/.agents/path.json
```

**Step 2: 跑 VAULT_OK 判定**

```bash
VAULT=$(jq -r '."style-vault" // empty' ~/.agents/path.json 2>/dev/null)
if [[ -z "$VAULT" || ! -d "$VAULT/frontend" ]]; then echo "VAULT_OK=false"; fi
```

Expected：`VAULT_OK=false`

**Step 3: 恢复**

---

### Task G4: 容错手验 — 目录像但无 marker

**Step 1: 做一个假目录**

```bash
mkdir -p /tmp/fake-vault/frontend
echo '{"name":"fake"}' > /tmp/fake-vault/frontend/package.json
jq '."style-vault" = "/tmp/fake-vault"' ~/.agents/path.json.bak > ~/.agents/path.json
```

**Step 2: marker 检查**

```bash
grep -q '"style-vault-site": true' /tmp/fake-vault/frontend/package.json && echo HAS || echo NO_MARKER
```

Expected：`NO_MARKER`

**Step 3: 恢复 + 清理**

```bash
mv ~/.agents/path.json.bak ~/.agents/path.json
rm -rf /tmp/fake-vault
```

---

### Task G5: 容错手验 — 消费模式跨项目可用

**Step 1: 在任意无关目录起个会话**

```bash
cd /tmp && mkdir consume-test && cd consume-test
```

**Step 2: 让 Claude 按"用 cold-industrial-saas 风格做 landing"触发消费模式**

人工在新会话里发指令。

**Step 3: 验证**

AI 应：
- 不读 path.json
- Read `~/.agents/skills/style-vault/references/vibes/saas-tool/cold-industrial-saas/README.md`
- 递归 Read 它的 uses
- 生成代码

不 commit。记录结论到 validation log。

---

## 计划交付物清单

- `~/.agents` 仓：skill 扩容的 ~10 个 commit（A 阶段 + G 阶段）
- `/Users/links/Coding/Archer/style-vault` 仓：网站初始化 + UI + sync + 首批 preview 的 ~25 个 commit
- `~/.agents/path.json`：新增 `style-vault` 字段
- `~/.agents/skills/style-vault/references/`：五层目录骨架 + 6 个样板条目 + `_tags.yaml` + 各层 `_CATEGORY.md` + `README.md`
- `/Users/links/Coding/Archer/style-vault/frontend/`：可跑的 React 网站 + 6 条 preview + 可跑的 `yarn sync` + `yarn test`

---

## 风险与注意

- **Vite dynamic import 限制**：`import.meta.glob` 的 pattern 必须是字符串字面量，`/preview/**/*.tsx` 模式下，删改 preview 文件需重启 dev server 生效
- **gray-matter 的 YAML 解析**：`tags:` 里的 inline object `{theme: [light]}` 两种写法都支持；统一用多行格式
- **iframe 同源**：preview 页与外壳同源，`navigator.clipboard` / postMessage 可用
- **registry.json commit 的噪音**：每次 F 阶段任务都会动 registry.json，接受这个噪音作为审计信号
- **Task A7 SKILL.md 重写**：若篇幅过长，考虑把"沉淀 10 步"拆进 `references/_maintenance.md` 由 SKILL.md 引用
- **TDD 测试夹具路径**：`__dirname` 在 tsx/esm 下需要 `import.meta.url` 替代，留意

---

Plan complete and saved to `docs/plans/2026-04-23-style-vault-expansion-plan.md`. Two execution options:

**1. Subagent-Driven (this session)** — 我在本会话里每个 Task 派一个 fresh subagent 去做，回来 review，快速迭代。适合你想盯着结果一步步看。

**2. Parallel Session (separate)** — 你新开一个会话，用 executing-plans 跑这份计划，批量执行 + 中间 checkpoint。适合你想放手让它跑。

**Which approach?**
