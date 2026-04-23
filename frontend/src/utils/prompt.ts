import type { RegistryItem } from '../../scripts/sync-from-skill/types';

const TAG_GROUPS = ['aesthetic', 'mood', 'stack'] as const;

export function buildPrompt(item: RegistryItem, extras: RegistryItem[] = []): string {
  const tagLine = TAG_GROUPS.map((k) => `${k}=[${item.tags[k].join(',')}]`).join(', ');

  const extraLines = extras.length
    ? `\n叠加: ${extras.map((e) => `${e.type}: ${e.id}`).join(', ')}`
    : '';

  const readList = [item, ...extras]
    .map((e) => `- ~/.agents/skills/style-vault/references/${e.skillPath}`)
    .join('\n');

  return `使用 style-vault skill 生成下面的需求。

主体: ${item.type}: ${item.id}
tags: ${tagLine}${extraLines}

请先 read 下面文件：
${readList}

具体需求 ↓
`;
}
