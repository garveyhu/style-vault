import type { RegistryItem } from '../../scripts/sync-from-skill/types';
import { typeLabel, platformLabel, themeLabel } from './taxonomy';

const TAG_GROUPS = ['aesthetic', 'mood', 'stack'] as const;

/**
 * 构造一个能被 style-vault skill 消费模式识别的 prompt。
 *
 * 设计原则（与 SKILL.md 对齐）：
 * 1. 顶部触发短语 `使用 style-vault skill` —— skill 触发器命中
 * 2. 主体 id 用反引号包裹 —— SKILL.md 第 1 步会优先抓 ` `id` ` 形式
 * 3. 给出入口文件路径 —— SKILL.md 第 2 步直接命中，不用 AI 反推
 * 4. 把 4 步消费流程写出来 —— 即便 AI 没完整读 SKILL.md，也按此执行
 * 5. 末尾留空行 + 「我的需求 ↓」给用户写实际需求
 */
export function buildPrompt(item: RegistryItem): string {
  const platforms = item.platforms
    .map((p) => platformLabel[p] ?? p)
    .filter(Boolean)
    .join(' · ');
  const theme = themeLabel[item.theme] ?? item.theme;
  const meta = [typeLabel[item.type], platforms, theme].filter(Boolean).join(' · ');

  const tags = TAG_GROUPS.flatMap((k) => item.tags[k] ?? []).filter(Boolean);
  const tagLine = tags.length ? `Tags: ${tags.join(' · ')}\n` : '';

  // 用 skill 内相对路径（不写死安装位置）—— 由 AI 按各自的 skill 安装目录解析
  const entry = `references/${item.skillPath}`;

  return `使用 style-vault skill 生成代码。

主体: \`${item.id}\`（${item.name} · ${meta}）
${tagLine}入口（skill 内相对路径）: ${entry}

按 SKILL.md 消费模式执行：
1. 在 style-vault skill 目录下读入口文件
2. 沿 \`uses\` / \`refs\` 递归读全链（products 用 refs，其它层用 uses）
3. 自下而上合并 tokens：token → component → block → page → style → product
4. 按合并后的规格 + 我下方的需求产出代码；输出末尾说一句引用链 + 取舍

---

我的需求 ↓

`;
}
