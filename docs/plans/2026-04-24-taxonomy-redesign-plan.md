# Style Vault · 分类体系重构 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 把 vibe/archetype/composite/atom/primitive 的 5 层分类重命名为 Products/Styles/Pages/Blocks/Components/Tokens 6 类（Products 为聚合类型），给 Registry 加 platforms[]/theme 维度，skill 目录同步重命名，网站加 Products 路由、Layout B 详情页和平台/主题筛选，首页重构为纯宣传骨架。

**Architecture:** 分 7 个阶段渐进切换。Phase A 先让 sync 脚本支持新 schema（旧数据仍可读，新字段缺省 default），Phase B rename skill 目录 + MD frontmatter 迁移，Phase C 同步前端 i18n/types 让老页面继续跑，Phase D 上 Products 端到端，Phase E 上 filter bar 升级，Phase F 首页改造，Phase G 补样本和 polish。每个 Phase 独立可回滚。

**Tech Stack:** TypeScript · vitest · React 19 · Vite · AntD · Tailwind · `tsx scripts/sync-from-skill/index.ts` 生成 `src/data/registry.json`

**Setup:** 当前在 `master` 分支（非 worktree），项目根目录 `/Users/links/Coding/Archer/style-vault`。skill 在 `~/.agents/skills/style-vault/`。Registry 仅 7 条真实数据，**直接切换无向后兼容**。

---

## Phase 0 · Pre-flight

> 目的：校准基线，留好回退锚点。

### Task 0.1: 确认 baseline 正常

**Steps:**

1. 进项目目录：`cd /Users/links/Coding/Archer/style-vault/frontend`
2. 跑 sync：`yarn sync`
3. 期望输出：`✓ synced 7 items to ...registry.json`（可能有 warnings，无 errors）
4. 跑 dev：`yarn dev`（后台）
5. 浏览器打开 `http://localhost:5173`，确认 Browse Page 正常渲染 5 种类型 tab
6. 停掉 dev 进程（留作阶段末对比）
7. 记下当前 `src/data/registry.json` 的 `items.length` 和各 `type` 分布，写进一个 `docs/plans/_baseline.txt`（可选）

**不提交**——baseline 是观察点，无代码变更。

### Task 0.2: 创建分支隔离（可选但推荐）

**Steps:**

1. `git checkout -b refactor/taxonomy-v2`
2. `git push -u origin refactor/taxonomy-v2`（如需远端同步）

后续所有 commit 落在这条分支。

---

## Phase A · Sync 脚本 Schema 升级

> 目的：让 sync 脚本同时**读旧格式 + 识别新字段**，为 Phase B 的 skill 端迁移做铺垫。旧 MD 若缺 platforms 字段默认 `['web']`，缺顶层 theme 从 `tags.theme` 兜底。

### Task A.1: 扩展 RegistryItem types

**Files:**
- Modify: `frontend/scripts/sync-from-skill/types.ts`

**Step 1: Write the new types**

```ts
export type EntryType =
  | 'product'
  | 'style'
  | 'page'
  | 'block'
  | 'component'
  | 'token'
  // legacy（Phase B 结束后删除）
  | 'vibe'
  | 'archetype'
  | 'composite'
  | 'atom'
  | 'primitive';

export type Platform = 'web' | 'ios' | 'android' | 'any';
export type Theme = 'light' | 'dark' | 'both';

export interface ProductRefs {
  style?: string;
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
}

export interface Frontmatter {
  id: string;
  type: EntryType;
  name: string;
  description: string;
  platforms?: Platform[];        // 新字段，可选（parse 时 default [web]）
  theme?: Theme;                 // 新顶层字段，可选
  category?: string;             // 仅 product 用
  refs?: ProductRefs;            // 仅 product 用
  cover?: string;
  tags: {
    aesthetic: string[];
    mood: string[];
    theme?: ('light' | 'dark')[]; // legacy，读完后 strip
    stack: string[];
  };
  uses?: string[];
  preview?: string;
}

export interface RegistryItem extends Frontmatter {
  platforms: Platform[];         // normalize 后非空
  theme: Theme;                  // normalize 后非空
  uses: string[];
  usedBy: string[];
  hasPreviewFile: boolean;
  skillPath: string;
  tags: {
    aesthetic: string[];
    mood: string[];
    stack: string[];
  };
}

export interface TagDict {
  aesthetic: string[];
  mood: string[];
  stack: string[];
}

export interface PlatformDict {
  platforms: Platform[];
}

export interface Registry {
  version: string;
  items: RegistryItem[];
  tagDict: TagDict;
  platformDict: PlatformDict;
}

export interface ValidationIssue {
  level: 'error' | 'warning';
  entryId?: string;
  message: string;
}

export interface Entry {
  frontmatter: Frontmatter;
  body: string;
  relativePath: string;
}
```

**Step 2: 编译通过**

Run: `cd frontend && yarn tsc --noEmit -p tsconfig.json` — 可能报错，因为其他 TS 文件还引用旧 type 名，暂时先确认 types.ts 本身无语法错误即可。

**Step 3: Commit**

```bash
git add frontend/scripts/sync-from-skill/types.ts
git commit -m "feat(sync): 扩展 Registry schema 支持 platforms/theme/refs/product"
```

### Task A.2: 新建 \_platforms.yaml 并让 config 能读

**Files:**
- Create: `~/.agents/skills/style-vault/references/_platforms.yaml`
- Modify: `frontend/scripts/sync-from-skill/config.ts`

**Step 1: 写 \_platforms.yaml**

```yaml
platforms:
  - web
  - ios
  - android
  - any
```

**Step 2: 加 PLATFORMS_FILE 常量**

在 `config.ts` 末尾追加：

```ts
export const PLATFORMS_FILE = path.join(REFERENCES_DIR, '_platforms.yaml');
```

**Step 3: Commit**

```bash
git add frontend/scripts/sync-from-skill/config.ts
# skill 的 _platforms.yaml 不在项目 repo 里，手动创建即可无需 git
git commit -m "feat(sync): 新增 _platforms.yaml 路径常量"
```

### Task A.3: parse.ts 兼容新字段 + normalize

**Files:**
- Modify: `frontend/scripts/sync-from-skill/parse.ts`

**Step 1: 写对应单元测试（新文件）**

Create: `frontend/scripts/sync-from-skill/parse.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { parseEntry } from './parse';

const mkFm = (fm: Record<string, unknown>) =>
  '---\n' + Object.entries(fm).map(([k, v]) =>
    typeof v === 'object' ? `${k}:\n${yamlSub(v)}` : `${k}: ${JSON.stringify(v)}`
  ).join('\n') + '\n---\nbody';

function yamlSub(obj: unknown, indent = 2): string {
  const pad = ' '.repeat(indent);
  if (Array.isArray(obj)) return obj.map((v) => `${pad}- ${v}`).join('\n');
  return Object.entries(obj as Record<string, unknown>)
    .map(([k, v]) => Array.isArray(v)
      ? `${pad}${k}:\n${v.map((x) => `${pad}  - ${x}`).join('\n')}`
      : `${pad}${k}: ${JSON.stringify(v)}`
    ).join('\n');
}

describe('parse.ts', () => {
  it('accepts new-style frontmatter with platforms/theme', () => {
    const raw = mkFm({
      id: 'components/buttons/ghost',
      type: 'component',
      name: 'Ghost Button',
      description: 'd',
      platforms: ['web'],
      theme: 'light',
      tags: { aesthetic: [], mood: [], stack: [] },
    });
    const { frontmatter: fm } = parseEntry(raw, 'components/buttons/ghost.md');
    expect(fm.platforms).toEqual(['web']);
    expect(fm.theme).toBe('light');
  });

  it('accepts legacy-style frontmatter (tags.theme + no platforms)', () => {
    const raw = mkFm({
      id: 'atoms/buttons/ghost-button',
      type: 'atom',
      name: 'Ghost',
      description: 'd',
      tags: { aesthetic: [], mood: [], theme: ['light'], stack: [] },
    });
    const { frontmatter: fm } = parseEntry(raw, 'atoms/buttons/ghost-button.md');
    expect(fm.type).toBe('atom');
    expect(fm.tags.theme).toEqual(['light']);
  });

  it('rejects mismatched id vs path', () => {
    const raw = mkFm({
      id: 'wrong/id',
      type: 'component',
      name: 'n',
      description: 'd',
      tags: { aesthetic: [], mood: [], stack: [] },
    });
    expect(() => parseEntry(raw, 'components/buttons/ghost.md')).toThrow(
      /id mismatch/,
    );
  });
});
```

**Step 2: 调整 parse.ts 允许 tags.theme 可选**

Modify: `frontend/scripts/sync-from-skill/parse.ts`

```ts
import matter from 'gray-matter';
import type { Frontmatter } from './types';

export function parseEntry(content: string, relativePath: string): {
  frontmatter: Frontmatter;
  body: string;
} {
  const { data, content: body } = matter(content);
  const fm = data as Partial<Frontmatter>;

  const expectedId = relativePath.replace(/(\/README)?\.md$/, '');
  if (fm.id !== expectedId) {
    throw new Error(`id mismatch: frontmatter "${fm.id}" vs path "${expectedId}"`);
  }

  for (const field of ['id', 'type', 'name', 'description', 'tags'] as const) {
    if (fm[field] === undefined || fm[field] === null) {
      throw new Error(`missing required field: ${field}`);
    }
  }

  const tags = fm.tags as Frontmatter['tags'];
  for (const key of ['aesthetic', 'mood', 'stack'] as const) {
    if (!Array.isArray(tags[key])) {
      throw new Error(`tags.${key} must be array (got ${typeof tags[key]})`);
    }
  }
  // theme 现在在顶层；legacy 数据的 tags.theme 仍允许存在，但不校验类型（读完会被 strip）

  return { frontmatter: fm as Frontmatter, body };
}
```

**Step 3: 跑测试验证**

Run: `cd frontend && yarn vitest run scripts/sync-from-skill/parse.test.ts`
Expected: 3 passed

**Step 4: Commit**

```bash
git add frontend/scripts/sync-from-skill/parse.ts frontend/scripts/sync-from-skill/parse.test.ts
git commit -m "feat(sync): parse 支持新/旧 frontmatter（platforms 可选、theme 顶层化）"
```

### Task A.4: validate.ts 增加 platforms / refs / type 校验

**Files:**
- Modify: `frontend/scripts/sync-from-skill/validate.ts`
- Create: `frontend/scripts/sync-from-skill/validate.test.ts`

**Step 1: 写验证测试（先失败）**

```ts
import { describe, it, expect } from 'vitest';
import { validatePlatforms, validateRefs, validateType } from './validate';

const mkFm = (over: Record<string, unknown> = {}) => ({
  id: 'components/buttons/ghost',
  type: 'component',
  name: 'n',
  description: 'd',
  platforms: ['web'],
  theme: 'light',
  tags: { aesthetic: [], mood: [], stack: [] },
  ...over,
}) as unknown as import('./types').Frontmatter;

describe('validate.ts', () => {
  it('validatePlatforms accepts allowed enum', () => {
    const issues = validatePlatforms(mkFm({ platforms: ['web', 'ios'] }));
    expect(issues).toEqual([]);
  });
  it('validatePlatforms rejects unknown', () => {
    const issues = validatePlatforms(mkFm({ platforms: ['desktop'] }));
    expect(issues.length).toBe(1);
    expect(issues[0].level).toBe('error');
  });
  it('validateType rejects unknown', () => {
    const issues = validateType(mkFm({ type: 'doodad' as unknown as string }));
    expect(issues[0].level).toBe('error');
  });
  it('validateRefs requires style on product type', () => {
    const issues = validateRefs(mkFm({ type: 'product', refs: {} }));
    expect(issues.some((i) => /refs.style/i.test(i.message))).toBe(true);
  });
});
```

**Step 2: 在 validate.ts 追加三个函数**

```ts
const VALID_TYPES = new Set([
  'product', 'style', 'page', 'block', 'component', 'token',
  'vibe', 'archetype', 'composite', 'atom', 'primitive', // legacy 暂容
]);
const VALID_PLATFORMS = new Set(['web', 'ios', 'android', 'any']);

export function validateType(fm: Frontmatter): ValidationIssue[] {
  if (!VALID_TYPES.has(fm.type)) {
    return [{ level: 'error', entryId: fm.id, message: `unknown type: ${fm.type}` }];
  }
  return [];
}

export function validatePlatforms(fm: Frontmatter): ValidationIssue[] {
  const p = fm.platforms ?? [];
  const issues: ValidationIssue[] = [];
  for (const v of p) {
    if (!VALID_PLATFORMS.has(v)) {
      issues.push({ level: 'error', entryId: fm.id, message: `unknown platform: ${v}` });
    }
  }
  return issues;
}

export function validateRefs(fm: Frontmatter): ValidationIssue[] {
  if (fm.type !== 'product') return [];
  const issues: ValidationIssue[] = [];
  if (!fm.refs?.style) {
    issues.push({ level: 'error', entryId: fm.id, message: 'product missing refs.style' });
  }
  return issues;
}
```

**Step 3: 验证测试全过**

Run: `yarn vitest run scripts/sync-from-skill/validate.test.ts` → 4 passed

**Step 4: 在 index.ts 主流程里调用三个新校验函数**

Modify: `frontend/scripts/sync-from-skill/index.ts`，在 for 循环里加：

```ts
issues.push(...validateType(e.frontmatter));
issues.push(...validatePlatforms(e.frontmatter));
issues.push(...validateRefs(e.frontmatter));
```

并在顶部 import 加入 `validateType`, `validatePlatforms`, `validateRefs`。

**Step 5: 跑 sync 确认老数据仍过**

Run: `yarn sync` → 仍应得 `✓ synced 7 items` 无 error。

**Step 6: Commit**

```bash
git add frontend/scripts/sync-from-skill/validate.ts frontend/scripts/sync-from-skill/validate.test.ts frontend/scripts/sync-from-skill/index.ts
git commit -m "feat(sync): 加入 type/platform/refs 校验"
```

### Task A.5: emit.ts normalize platforms/theme 到 RegistryItem

**Files:**
- Modify: `frontend/scripts/sync-from-skill/index.ts`（在 items.push 前 normalize）
- Modify: `frontend/scripts/sync-from-skill/emit.ts`（加 platformDict 字段）

**Step 1: index.ts 里 normalize**

在 items.push 前加入：

```ts
// normalize
const platforms: Platform[] = (e.frontmatter.platforms && e.frontmatter.platforms.length > 0)
  ? e.frontmatter.platforms
  : (e.frontmatter.type === 'token' || e.frontmatter.type === 'primitive' ? ['any'] : ['web']);

const themeFromTags = (e.frontmatter.tags.theme ?? []).join('-'); // 'light-dark' | 'light' | 'dark' | ''
const theme: Theme =
  e.frontmatter.theme
  ?? (themeFromTags === 'light-dark' || themeFromTags === 'dark-light' ? 'both'
    : themeFromTags === 'dark' ? 'dark' : 'light');

const { theme: _strip, ...restTags } = e.frontmatter.tags; // strip legacy tags.theme
```

记得在顶部 import 补上 `Platform, Theme`。

然后 items.push 里使用：

```ts
items.push({
  ...e.frontmatter,
  platforms,
  theme,
  tags: restTags as RegistryItem['tags'],
  uses: e.frontmatter.uses ?? [],
  usedBy: usedBy.get(e.frontmatter.id) ?? [],
  hasPreviewFile,
  skillPath: e.relativePath,
});
```

**Step 2: emit.ts 加 platformDict**

```ts
import type { Registry, RegistryItem, TagDict, PlatformDict } from './types';

export async function emit(
  items: RegistryItem[],
  tagDict: TagDict,
  platformDict: PlatformDict,
  outPath: string,
): Promise<void> {
  const sorted = [...items].sort((a, b) => a.id.localeCompare(b.id));
  const registry: Registry = {
    version: new Date().toISOString(),
    items: sorted,
    tagDict,
    platformDict,
  };
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
}
```

**Step 3: index.ts 读取 \_platforms.yaml 并传入 emit**

在 main 顶部加：

```ts
import { PLATFORMS_FILE } from './config';
const platformDict = yaml.load(await fs.readFile(PLATFORMS_FILE, 'utf-8')) as PlatformDict;
```

并将 `emit(items, tagDict, REGISTRY_OUT)` 改为 `emit(items, tagDict, platformDict, REGISTRY_OUT)`。

**Step 4: 从 tagDict 里 strip theme**

把 `_tags.yaml` 解析后的 `theme` 字段删掉（不做到 TagDict 里），或者改为：

```ts
const rawTagDict = yaml.load(...) as Record<string, string[]>;
const tagDict: TagDict = {
  aesthetic: rawTagDict.aesthetic ?? [],
  mood: rawTagDict.mood ?? [],
  stack: rawTagDict.stack ?? [],
};
```

并更新 `validateTags` 移除 theme 校验：

```ts
(['aesthetic', 'mood', 'stack'] as const).forEach(...)
```

**Step 5: 跑 sync 验证老数据**

Run: `yarn sync`
Expected:
- `✓ synced 7 items`
- 查看 `src/data/registry.json`：每条都有 `platforms: ['web']`（token 类例外 `['any']`）和 `theme: 'light'`（或 dark）
- `tagDict` 里不再有 `theme` key
- 顶层多了 `platformDict: { platforms: [...] }`

**Step 6: Commit**

```bash
git add frontend/scripts/sync-from-skill/{index,emit,validate}.ts frontend/src/data/registry.json
git commit -m "feat(sync): 生成 registry 时 normalize platforms/theme 并输出 platformDict"
```

---

## Phase B · Skill 端 Rename + Frontmatter 迁移

> 目的：把 skill 目录里的 5 个旧桶 rename，把 5 条 MD 文件的 frontmatter 升级到新 schema（platforms 显式、theme 顶层、type 用新名）。

### Task B.1: Rename 5 个 references/ 顶层目录

**Steps:**

1. `cd ~/.agents/skills/style-vault/references`
2. `mv vibes styles`
3. `mv archetypes pages`
4. `mv composites blocks`
5. `mv atoms components`
6. `mv primitives tokens`
7. `ls` 验证只剩新目录名 + products/（下一步创建）+ `_tags.yaml` / `_platforms.yaml` / `README.md`

**不 commit**——skill 不在项目 repo 里。

### Task B.2: 更新 5 条 MD 的 frontmatter

5 个文件：
- `components/buttons/ghost-button.md` (type: atom → component)
- `blocks/layout/toolbar-bar.md` (type: composite → block)
- `blocks/display/table.md` (type: composite → block)
- `tokens/palettes/slate-cyan-ice.md` (type: primitive → token)
- `pages/landing/saas-landing.md` 等（如有，按 ls 结果枚举）
- `styles/saas-tool/cold-industrial-saas.md` (type: vibe → style)
- `tokens/typography/ibm-plex-duo.md` (type: primitive → token)

**针对每个文件：**

1. 修改顶部 `id` 字段：把旧桶名换成新桶名（e.g. `atoms/buttons/ghost-button` → `components/buttons/ghost-button`）
2. 修改 `type` 字段：旧值 → 新值
3. 新增 `platforms: [web]`（token 类用 `[any]`）
4. 新增顶层 `theme: light`（或 dark，按原 tags.theme 推）
5. 删除 `tags.theme` 这一行
6. `uses` 数组里的 id 也需要把旧桶前缀替换成新桶前缀（e.g. `atoms/buttons/ghost-button` → `components/buttons/ghost-button`）

**示例：ghost-button.md 前**

```yaml
---
id: atoms/buttons/ghost-button
type: atom
name: Ghost Button
description: ...
tags:
  aesthetic: [minimal]
  mood: [calm]
  theme: [light]
  stack: [react-antd-tailwind]
---
```

**示例：ghost-button.md 后**

```yaml
---
id: components/buttons/ghost-button
type: component
name: Ghost Button
description: ...
platforms: [web]
theme: light
tags:
  aesthetic: [minimal]
  mood: [calm]
  stack: [react-antd-tailwind]
---
```

### Task B.3: Rename 前端 src/preview 下的相同 5 个目录

**Steps:**

1. `cd /Users/links/Coding/Archer/style-vault/frontend/src/preview`
2. `git mv vibes styles`
3. `git mv archetypes pages`
4. `git mv composites blocks`
5. `git mv atoms components`
6. `git mv primitives tokens`

### Task B.4: 更新 preview 内部 import 路径

**Files:**
- Check all files under `frontend/src/preview/**/*.tsx`

**Steps:**

1. 搜：`grep -rln "from '\\.\\./\\.\\./_templates\\|from '\\.\\./_layout\\|preview/vibes\\|preview/archetypes\\|preview/composites\\|preview/atoms\\|preview/primitives" frontend/src/preview`
2. 逐个文件用 Edit 改相对路径（\_layout 相对位置可能变，需人工确认）
3. `_templates/*.tsx` 的 import 如果引用到其他 preview 分类，也需 rename

**Step 5: 跑 build/dev 确认无编译错误**

Run: `cd frontend && yarn tsc --noEmit`
Expected: no errors

### Task B.5: 跑 sync + 肉眼检查 registry

**Steps:**

1. `cd frontend && yarn sync`
2. 期望：`✓ synced 7 items` 无 error
3. 打开 `src/data/registry.json`，确认：
   - 所有 `id` 都是新桶前缀
   - 所有 `type` 都是新枚举值
   - 所有条目都有 `platforms` 和 `theme` 字段
4. `uses` 里引用的 id 全部能在 registry 里找到（脚本的 dangling warning 应为 0）

### Task B.6: Commit

```bash
cd /Users/links/Coding/Archer/style-vault
git add frontend/src/preview/ frontend/src/data/registry.json
git commit -m "refactor(preview): 重命名 5 个分类目录并同步 registry

vibes→styles / archetypes→pages / composites→blocks
atoms→components / primitives→tokens"
```

---

## Phase C · 前端 i18n / 类型 / 引用同步

> 目的：让 Browse / Detail / StyleCard / TopBar 等页面继续正常工作，只是显示新命名。

### Task C.1: 更新 i18n.ts

**Files:**
- Modify: `frontend/src/utils/i18n.ts`

**Step 1: 替换文件内容**

```ts
export const typeLabel: Record<string, string> = {
  product: '产品',
  style: '风格',
  page: '页面',
  block: '模块',
  component: '组件',
  token: '原语',
};

export const typePlural: Record<string, string> = {
  product: '产品',
  style: '风格',
  page: '页面',
  block: '模块',
  component: '组件',
  token: '原语',
};

export const tagGroupLabel = {
  aesthetic: '风格',
  mood: '氛围',
  stack: '技术栈',
} as const;

export const themeLabel: Record<string, string> = {
  light: '浅色',
  dark: '深色',
  both: '双主题',
};

export const platformLabel: Record<string, string> = {
  web: 'Web',
  ios: 'iOS',
  android: 'Android',
  any: '通用',
};

export const typeColor: Record<string, string> = {
  product: 'purple',
  style: 'magenta',
  page: 'geekblue',
  block: 'cyan',
  component: 'green',
  token: 'orange',
};
```

**Step 2: Commit**

```bash
git add frontend/src/utils/i18n.ts
git commit -m "refactor(i18n): 类型标签换成 Products/Styles/Pages/Blocks/Components/Tokens"
```

### Task C.2: 更新 BrowsePage 的 ORDER 和 ViewKey

**Files:**
- Modify: `frontend/src/pages/BrowsePage.tsx`

**Step 1: 把 ORDER 和 ViewKey 升级**

在文件顶部（import 完）找到：

```ts
type ViewKey = EntryType | "favorites";
const ORDER: EntryType[] = [
  "vibe",
  "archetype",
  "composite",
  "atom",
  "primitive",
];
```

改为：

```ts
type ViewKey = Exclude<EntryType, 'vibe'|'archetype'|'composite'|'atom'|'primitive'> | 'favorites';
const ORDER: Exclude<EntryType, 'vibe'|'archetype'|'composite'|'atom'|'primitive'>[] = [
  'style',
  'page',
  'block',
  'component',
  'token',
];
```

**Step 2: 搜索 BrowsePage 中所有硬编码的 'vibe'/'archetype'/... 字符串**，全部改为新名。

**Step 3: tsc --noEmit 验证**

Run: `yarn tsc --noEmit`
Expected: 可能 DetailPage/StyleCard 还有报错，暂时只关心 BrowsePage.tsx 自身无错

### Task C.3: 更新 DetailPage 的 typeDotColor 和硬编码

**Files:**
- Modify: `frontend/src/pages/DetailPage.tsx`

**Step 1: 找到 typeDotColor 函数**（约 74 行）

把 case 的 type 名全换新：

```ts
function typeDotColor(type: string): string {
  switch (type) {
    case 'product': return 'bg-purple-500';
    case 'style': return 'bg-rose-500';
    case 'page': return 'bg-indigo-500';
    case 'block': return 'bg-cyan-500';
    case 'component': return 'bg-emerald-500';
    case 'token': return 'bg-amber-500';
    default: return 'bg-slate-400';
  }
}
```

**Step 2: Commit**

```bash
git add frontend/src/pages/{BrowsePage,DetailPage}.tsx
git commit -m "refactor(pages): 更新 BrowsePage/DetailPage 的类型枚举为新名"
```

### Task C.4: 更新 StyleCard

**Files:**
- Modify: `frontend/src/components/StyleCard.tsx`

把 `typeDotColor` 同上述方式改。

**Step: Commit**

```bash
git add frontend/src/components/StyleCard.tsx
git commit -m "refactor(StyleCard): typeDotColor 映射到新类型名"
```

### Task C.5: 更新 GlossaryDrawer 文案

**Files:**
- Modify: `frontend/src/components/GlossaryDrawer.tsx`

把所有"整站风格/页面样板/场景组合/原子组件/设计原语"等旧文案统一换成新的 6 类说明（含 Products 的一段）：

```text
Products（产品）：一个完整的网站/应用聚合 — 绑定一个 Style + 若干 Pages / Blocks / Components / Tokens。
Styles（风格）：整套设计语言。
Pages（页面）：可独立渲染的整页样板。
Blocks（模块）：页面里可复用的 section。
Components（组件）：单一可复用的交互原子。
Tokens（原语）：没有交互形态的设计资源（调色板、字体对、动效、边框...）。
```

**Step: Commit**

```bash
git add frontend/src/components/GlossaryDrawer.tsx
git commit -m "docs(glossary): 更新 6 类分类词条"
```

### Task C.6: 删除 types.ts 里的 legacy type

**Files:**
- Modify: `frontend/scripts/sync-from-skill/types.ts`

Phase B 已完成后，再无 vibe/archetype 等引用，删除：

```ts
export type EntryType =
  | 'product'
  | 'style'
  | 'page'
  | 'block'
  | 'component'
  | 'token';
```

同时在 `validate.ts` 的 `VALID_TYPES` 里删除 legacy 条目。

**Step 1: tsc --noEmit + yarn sync 验证**

Run: `yarn tsc --noEmit && yarn sync`

**Step 2: Commit**

```bash
git add frontend/scripts/sync-from-skill/{types,validate}.ts
git commit -m "chore(sync): 清理 legacy type 联合（vibe/archetype/...）"
```

### Task C.7: Smoke test - dev server

**Steps:**

1. `yarn dev`
2. 打开 http://localhost:5173
3. 点过 5 个 tab（Styles/Pages/Blocks/Components/Tokens），每个至少 1 条数据显示
4. 点进任意一条详情，确认左栏 type 标签显示新中文名
5. 停掉 dev

---

## Phase D · Products 类型端到端

> 目的：把 Products 从 schema 贯通到 UI，包括 skill 样本数据、列表页、详情页（Layout B）、路由。

### Task D.1: 创建样本 Product MD

**Files:**
- Create: `~/.agents/skills/style-vault/references/products/acme-cold-saas/index.md`

```markdown
---
id: products/acme-cold-saas
type: product
name: Acme · Cold Industrial SaaS
description: A productivity cockpit for quant teams — dense tables, monospace numbers, no warmth.
platforms: [web]
theme: dark
category: productivity-tool
refs:
  style: styles/saas-tool/cold-industrial-saas
  pages:
    - pages/landing/saas-landing
  blocks:
    - blocks/layout/toolbar-bar
    - blocks/display/table
  components:
    - components/buttons/ghost-button
  tokens:
    palette: tokens/palettes/slate-cyan-ice
    typography: tokens/typography/ibm-plex-duo
tags:
  aesthetic: [minimal, industrial]
  mood: [cold, serious]
  stack: [react-antd-tailwind]
uses: []
---

## 设计叙事

Acme 是为 quant 分析师打造的冷感工具——数字优先、等宽字体、几乎没有装饰。所有视觉语言服从"可读密度"。

## 组成

- **Style**: Slate × Cyan Ice 设计语言
- **Pages**: Landing
- **Blocks**: Toolbar Bar / Table
- **Components**: Ghost Button
```

### Task D.2: parse.ts / validate.ts 对 product 的特判

Phase A.4 已加 validateRefs 校验 product 必须有 refs.style。此时跑 sync 应：

1. `yarn sync`
2. `✓ synced 8 items`
3. registry.json 里新条目 `products/acme-cold-saas` 的 refs 字段完整

**Commit**：

```bash
git add frontend/src/data/registry.json
git commit -m "feat(sample): 添加首个 Product 样本 acme-cold-saas"
```

### Task D.3: 在 TopBar 加 Products 导航项

**Files:**
- Modify: `frontend/src/components/TopBar.tsx`

查看当前 nav 结构（应有 ORDER 5 类），在顶头位置添加 Products link 指向 `/products`。

**Commit：**

```bash
git add frontend/src/components/TopBar.tsx
git commit -m "feat(TopBar): 加入 Products nav 项"
```

### Task D.4: 创建 ProductListPage

**Files:**
- Create: `frontend/src/pages/ProductListPage.tsx`

骨架：

```tsx
import { useNavigate, Navigate } from 'react-router-dom';
import { useRegistry, isRegistryMissing } from '../data/useRegistry';
import { TopBar } from '../components/TopBar';
import { platformLabel } from '../utils/i18n';

export default function ProductListPage() {
  const reg = useRegistry();
  const nav = useNavigate();
  if (isRegistryMissing(reg)) return <Navigate to="/not-installed" replace />;

  const products = reg.items.filter((i) => i.type === 'product');

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <TopBar />
      <div className="mx-auto max-w-[1400px] px-8 py-12">
        <h1 className="font-display text-[36px] font-semibold tracking-tight">
          Products
        </h1>
        <p className="mt-2 text-slate-500">A curated set of complete product shells.</p>

        <div className="mt-10 grid grid-cols-2 gap-6">
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => nav(`/products/${p.id.replace(/^products\//, '')}`)}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition hover:border-slate-300 hover:shadow-md"
            >
              <div
                className="h-[280px]"
                style={{
                  background:
                    'repeating-linear-gradient(135deg, #f8fafc, #f8fafc 10px, #f1f5f9 10px, #f1f5f9 20px)',
                }}
              />
              <div className="p-5">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-slate-400">
                  <span>{p.category ?? 'Product'}</span>
                  <span>·</span>
                  {p.platforms.map((pl) => (
                    <span key={pl}>{platformLabel[pl]}</span>
                  ))}
                </div>
                <h3 className="mt-2 font-display text-[22px] font-semibold">{p.name}</h3>
                <p className="mt-1 line-clamp-2 text-[13px] text-slate-500">
                  {p.description}
                </p>
                <div className="mt-3 flex gap-3 text-[12px] text-slate-400">
                  <span>{p.refs?.pages?.length ?? 0} Pages</span>
                  <span>·</span>
                  <span>{p.refs?.blocks?.length ?? 0} Blocks</span>
                  <span>·</span>
                  <span>{p.refs?.components?.length ?? 0} Components</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Commit：**

```bash
git add frontend/src/pages/ProductListPage.tsx
git commit -m "feat(pages): ProductListPage 展示 Products 网格"
```

### Task D.5: 创建 ProductDetailPage（Layout B）

**Files:**
- Create: `frontend/src/pages/ProductDetailPage.tsx`

参考 `docs/mockups/product-detail-layouts.html` 的 Layout B 的结构。骨架：

```tsx
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useRegistry, useItem, isRegistryMissing } from '../data/useRegistry';
import { TopBar } from '../components/TopBar';
import { platformLabel, typeLabel } from '../utils/i18n';

export default function ProductDetailPage() {
  const reg = useRegistry();
  const params = useParams();
  const nav = useNavigate();
  if (isRegistryMissing(reg)) return <Navigate to="/not-installed" replace />;

  const id = `products/${params.slug ?? ''}`;
  const product = useItem(id);
  if (!product) return <div className="p-8">找不到产品：{id}</div>;

  const pages = (product.refs?.pages ?? []).map((rid) => reg.items.find((i) => i.id === rid)).filter(Boolean);
  const blocks = (product.refs?.blocks ?? []).map((rid) => reg.items.find((i) => i.id === rid)).filter(Boolean);
  const components = (product.refs?.components ?? []).map((rid) => reg.items.find((i) => i.id === rid)).filter(Boolean);
  const style = product.refs?.style ? reg.items.find((i) => i.id === product.refs!.style) : null;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <TopBar />

      {/* Cover Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1100px] px-8 pb-20 pt-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" /> PRODUCT
          </div>
          <h1 className="mx-auto mt-5 max-w-[800px] font-display text-[56px] font-semibold leading-[1.05]">
            {product.name}
          </h1>
          <p className="mx-auto mt-5 max-w-[640px] text-[16px] leading-relaxed text-slate-500">
            {product.description}
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            {product.platforms.map((pl) => (
              <span key={pl} className="pill" data-on="true">{platformLabel[pl]}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-[1100px] px-8 py-20">
        <div className="grid grid-cols-[180px_1fr] gap-14">
          <aside className="sticky top-24 h-max">
            <div className="mb-3 text-[10px] uppercase tracking-[0.22em] text-slate-400">On this page</div>
            <ul className="space-y-2.5 text-[13px]">
              <li>01 · Style</li>
              <li>02 · Pages</li>
              <li>03 · Blocks</li>
              <li>04 · Components</li>
              <li>05 · Tokens</li>
            </ul>
          </aside>

          <div className="min-w-0 space-y-20">
            {/* Style */}
            {style && (
              <article>
                <h2 className="font-display text-[36px] font-semibold">The Style</h2>
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
                  <button onClick={() => nav(`/item/${style.id}`)} className="text-left">
                    <h3 className="font-display text-[22px] font-semibold">{style.name}</h3>
                    <p className="mt-2 text-[14px] text-slate-500">{style.description}</p>
                  </button>
                </div>
              </article>
            )}

            {/* Pages */}
            <article>
              <h2 className="font-display text-[36px] font-semibold">Pages · {pages.length}</h2>
              <div className="mt-6 space-y-10">
                {pages.map((p) => p && (
                  <div key={p.id}>
                    <h3 className="font-display text-[22px] font-semibold">{p.name}</h3>
                    <div className="mt-2 rounded-2xl border border-slate-200 bg-white h-[300px]" />
                  </div>
                ))}
              </div>
            </article>

            {/* Blocks */}
            <article>
              <h2 className="font-display text-[36px] font-semibold">Blocks · {blocks.length}</h2>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {blocks.map((b) => b && (
                  <button key={b.id} onClick={() => nav(`/item/${b.id}`)} className="rounded-xl border border-slate-200 bg-white p-4 text-left">
                    <div className="h-24 rounded bg-slate-50" />
                    <div className="mt-2 text-[14px] font-medium">{b.name}</div>
                  </button>
                ))}
              </div>
            </article>

            {/* Components */}
            <article>
              <h2 className="font-display text-[36px] font-semibold">Components · {components.length}</h2>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {components.map((c) => c && (
                  <button key={c.id} onClick={() => nav(`/item/${c.id}`)} className="rounded-xl border border-slate-200 bg-white p-4 text-left">
                    <div className="h-16 rounded bg-slate-50" />
                    <div className="mt-2 text-[13px]">{c.name}</div>
                  </button>
                ))}
              </div>
            </article>

            {/* Tokens */}
            {product.refs?.tokens && (
              <article>
                <h2 className="font-display text-[36px] font-semibold">Tokens</h2>
                {/* 展示 palette / typography 的缩略 */}
                <pre className="mt-4 rounded-xl bg-slate-100 p-4 text-[12px]">
                  {JSON.stringify(product.refs.tokens, null, 2)}
                </pre>
              </article>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
```

**Commit：**

```bash
git add frontend/src/pages/ProductDetailPage.tsx
git commit -m "feat(pages): ProductDetailPage 实现 Layout B（magazine + sticky TOC）"
```

### Task D.6: 加 /products 和 /products/:slug 路由

**Files:**
- Modify: `frontend/src/App.tsx`

**Step 1: 加 lazy import 和 Route**

```tsx
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
// ...
<Route path="/products" element={<ProductListPage />} />
<Route path="/products/:slug" element={<ProductDetailPage />} />
```

**Step 2: dev 检查**

1. `yarn dev`
2. 打开 /products，看到 Acme 卡片
3. 点进去，看到 Layout B 详情页

**Commit：**

```bash
git add frontend/src/App.tsx
git commit -m "feat(router): 注册 /products 和 /products/:slug 路由"
```

---

## Phase E · Filter Bar 升级（Platform + Theme）

> 目的：把 Platform / Theme 提升成一级筛选（常驻顶部 pill），aesthetic/mood/stack 保留在 Popover。

### Task E.1: 新建 PlatformThemeBar 组件

**Files:**
- Create: `frontend/src/components/PlatformThemeBar.tsx`

```tsx
import { platformLabel, themeLabel } from '../utils/i18n';
import type { Platform, Theme } from '../../scripts/sync-from-skill/types';

export interface PlatformThemeValue {
  platform: Platform | 'all';
  theme: Theme | 'any';
}

export const emptyPlatformTheme: PlatformThemeValue = { platform: 'all', theme: 'any' };

export function PlatformThemeBar({
  value,
  onChange,
}: {
  value: PlatformThemeValue;
  onChange: (next: PlatformThemeValue) => void;
}) {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <span className="text-[11px] uppercase tracking-widest text-slate-400">Platform</span>
        {(['all', 'web', 'ios', 'android'] as const).map((p) => (
          <button
            key={p}
            onClick={() => onChange({ ...value, platform: p })}
            data-on={value.platform === p}
            className="pill data-[on=true]:bg-slate-900 data-[on=true]:text-white rounded-full border border-slate-200 bg-white px-3 py-1 text-[12px] text-slate-600"
          >
            {p === 'all' ? 'All' : platformLabel[p]}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[11px] uppercase tracking-widest text-slate-400">Theme</span>
        {(['any', 'light', 'dark'] as const).map((t) => (
          <button
            key={t}
            onClick={() => onChange({ ...value, theme: t })}
            data-on={value.theme === t}
            className="pill data-[on=true]:bg-slate-900 data-[on=true]:text-white rounded-full border border-slate-200 bg-white px-3 py-1 text-[12px] text-slate-600"
          >
            {t === 'any' ? 'Any' : themeLabel[t]}
          </button>
        ))}
      </div>
    </div>
  );
}
```

**Commit：**

```bash
git add frontend/src/components/PlatformThemeBar.tsx
git commit -m "feat(filters): 新增 PlatformThemeBar 一级筛选组件"
```

### Task E.2: BrowsePage 接入 PlatformThemeBar + 过滤逻辑

**Files:**
- Modify: `frontend/src/pages/BrowsePage.tsx`

**Step 1: state**

```tsx
import { PlatformThemeBar, emptyPlatformTheme, type PlatformThemeValue } from '../components/PlatformThemeBar';
const [ptf, setPtf] = useState<PlatformThemeValue>(emptyPlatformTheme);
```

**Step 2: 过滤 useMemo 里加入**

```ts
const items = reg.items.filter((i) => {
  if (ptf.platform !== 'all' && !i.platforms.includes(ptf.platform) && !i.platforms.includes('any')) return false;
  if (ptf.theme !== 'any' && i.theme !== ptf.theme && i.theme !== 'both') return false;
  // 已有的 view / tags 过滤保留
  // ...
  return true;
});
```

**Step 3: UI 里把 PlatformThemeBar 插在现有 filter 行之前**

**Step 4: 从 TagFilterBar 里移除 theme 组**

**Files:**
- Modify: `frontend/src/components/TagFilterBar.tsx`

删除 theme 相关 key 的渲染和 type 定义。

**Step 5: smoke**

1. `yarn dev`
2. Platform 切 Web / iOS / Android，看数量变化
3. Theme 切 Light / Dark，看数量变化

**Commit：**

```bash
git add frontend/src/pages/BrowsePage.tsx frontend/src/components/TagFilterBar.tsx
git commit -m "feat(filters): BrowsePage 接入 Platform/Theme 一级筛选"
```

---

## Phase F · 首页纯宣传骨架

> 目的：把 `/` 从 BrowsePage 改成 HomePage（纯宣传），BrowsePage 挪到 `/browse` 或按类型分路径。

### Task F.1: 创建 HomePage

**Files:**
- Create: `frontend/src/pages/HomePage.tsx`

```tsx
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/TopBar';

export default function HomePage() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <TopBar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1100px] px-8 pb-28 pt-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
            Style Vault
          </div>
          <h1 className="mx-auto mt-6 max-w-[900px] font-display text-[72px] font-semibold leading-[1.02] tracking-[-0.03em]">
            A vault of distinctive UI styles, from token to product.
          </h1>
          <p className="mx-auto mt-6 max-w-[620px] text-[18px] leading-relaxed text-slate-500">
            Six layers. Six clear categories. Built to feed AI coding with style that doesn't look AI-made.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() => nav('/browse')}
              className="h-12 rounded-full bg-slate-900 px-8 text-[14px] font-medium text-white hover:bg-slate-700"
            >
              Browse the Vault →
            </button>
          </div>
        </div>
      </section>

      {/* Logo 墙 */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-[1100px] px-8 py-12 text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
            Covering aesthetics from
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 opacity-70">
            {['Editorial', 'Industrial', 'Playful', 'Brutal', 'Organic', 'Luxe'].map((t) => (
              <span key={t} className="font-display text-[22px] text-slate-500">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 价值点 3 段 */}
      <section className="mx-auto max-w-[1100px] px-8 py-28">
        <div className="space-y-28">
          <ValueBlock
            n="01"
            title="6 layers, from token to product"
            body="From the smallest color swatch to a complete product shell, every layer has a clear boundary — so inspiration is easy to find, and styles are easy to compose."
          />
          <ValueBlock
            n="02"
            title="Built for AI coding"
            body="Each style ships with a curated prompt payload. Copy it into your AI coding tool and get style-faithful code out the other end."
            flip
          />
          <ValueBlock
            n="03"
            title="Cross-platform by design"
            body="Browse by Web, iOS, or Android. Styles travel — components may differ, but the vibe stays."
          />
        </div>
      </section>

      {/* Manifesto */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-[1000px] px-8 py-28 text-center">
          <p className="font-display text-[40px] font-semibold leading-tight tracking-[-0.02em]">
            "Good design is seen. Great design is remembered."
          </p>
          <p className="mt-4 text-[13px] uppercase tracking-[0.22em] text-slate-400">
            Style Vault · Curated for makers
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-8 py-10 text-[12px] text-slate-400">
          <span>© 2026 Style Vault</span>
          <a href="https://github.com/" className="hover:text-slate-700">GitHub</a>
        </div>
      </footer>
    </div>
  );
}

function ValueBlock({ n, title, body, flip = false }: { n: string; title: string; body: string; flip?: boolean }) {
  return (
    <div className={`grid grid-cols-2 gap-10 ${flip ? 'direction-rtl' : ''}`}>
      <div>
        <div className="font-mono text-[13px] text-slate-400">{n}</div>
        <h2 className="mt-4 font-display text-[40px] font-semibold leading-[1.08] tracking-[-0.02em]">
          {title}
        </h2>
        <p className="mt-5 text-[16px] leading-relaxed text-slate-500">{body}</p>
      </div>
      <div className="h-[300px] rounded-2xl border border-slate-200 bg-slate-50" />
    </div>
  );
}
```

**Commit：**

```bash
git add frontend/src/pages/HomePage.tsx
git commit -m "feat(pages): HomePage 纯宣传骨架（Hero + Logo 墙 + 价值点 + Manifesto）"
```

### Task F.2: 路由 reshape — / 指 Home，/browse 指 BrowsePage

**Files:**
- Modify: `frontend/src/App.tsx`

```tsx
import HomePage from './pages/HomePage';
// ...
<Route path="/" element={<HomePage />} />
<Route path="/browse" element={<BrowsePage />} />
```

**Step: Commit**

```bash
git add frontend/src/App.tsx
git commit -m "feat(router): 首页指向 HomePage；BrowsePage 挪到 /browse"
```

### Task F.3: TopBar 里 Logo 指 `/`；加 Browse 入口

**Files:**
- Modify: `frontend/src/components/TopBar.tsx`

确保 Logo 点击回 `/`；nav 里加 `Browse` 指 `/browse`。

**Commit：**

```bash
git add frontend/src/components/TopBar.tsx
git commit -m "feat(TopBar): Logo 回 Home；nav 增加 Browse 链接"
```

### Task F.4: Smoke

1. `yarn dev`
2. `/` 应显示 HomePage
3. 点 Browse 按钮进 `/browse`，老 BrowsePage 正常
4. 点 Products 进 `/products`

---

## Phase G · Polish 与样本补齐

> 目的：补 Product 样本、StyleCard 平台徽标、回归测试。

### Task G.1: StyleCard 加平台图标

**Files:**
- Modify: `frontend/src/components/StyleCard.tsx`

在卡片右上角（收藏按钮旁）加一行小图标，显示 `platforms`。可用简单文字：`WEB · IOS`。

**Commit：**

```bash
git add frontend/src/components/StyleCard.tsx
git commit -m "feat(StyleCard): 显示 platforms 徽标"
```

### Task G.2: 加 1 个额外 Product 样本（可选）

**Files:**
- Create: `~/.agents/skills/style-vault/references/products/sandune-warm-reader/index.md`

参考 Acme 样例，换成一个 warm editorial 主题的 reader 产品，至少引用 1 Style + 2 Pages + 2 Blocks。

跑 `yarn sync` 更新 registry。

**Commit：**

```bash
git add frontend/src/data/registry.json
git commit -m "feat(sample): 添加 Sandune Warm Reader 第二个 Product 样本"
```

### Task G.3: 视觉回归自查清单

逐页过：

- [ ] `/`：HomePage 正常，没有购买/评价模块，只有纯宣传
- [ ] `/browse`：5 tab（Styles/Pages/Blocks/Components/Tokens）切换正常；PlatformThemeBar 筛选生效
- [ ] `/products`：Product 卡片网格正常；点进详情 Layout B 正常
- [ ] `/item/<id>`：5 种类型详情页（非 Product）正常
- [ ] TopBar 导航包含 Products + Styles/Pages/...

**Commit（如有修复）：**

```bash
git commit -m "chore(polish): 视觉回归修复"
```

### Task G.4: 最终合并

如果在 feature 分支上做：

```bash
git checkout master
git merge refactor/taxonomy-v2
```

---

## 总览

| Phase | 关键产出 | 典型耗时 |
|---|---|---|
| 0 | baseline + 分支 | 10m |
| A | sync 脚本新 schema + 校验 | 1.5h |
| B | skill rename + MD 迁移 + preview rename | 1h |
| C | 前端 i18n / 类型 rename | 1h |
| D | Product 端到端（含 Layout B 详情页） | 2.5h |
| E | Platform/Theme 筛选 | 1h |
| F | HomePage 纯宣传 | 1.5h |
| G | Polish + 样本 | 45m |

**合计约 9 小时工作量**，假设单人顺序执行。

---

## 风险与回退

| 风险 | 缓解 |
|---|---|
| rename 漏改引用导致 sync 报错 | parse.ts 的 id mismatch 校验会直接命中；先 dry-run |
| 前端 i18n rename 漏一处导致 UI 显 `undefined` | Phase C 末的 smoke test；grep 搜旧字符串 |
| Product 详情页 Layout B 实际渲染跟 mockup 不一致 | 以 `docs/mockups/product-detail-layouts.html` 为准 |
| 如需回退：phase 级可 `git revert` | 每个 Phase 的 commit 独立，回滚范围可控 |
