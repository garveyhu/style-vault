// 字典的单一权威：skill 里保留英文，网站显示走此处
export const tagI18n = {
  aesthetic: {
    minimal: '极简',
    maximal: '繁复',
    brutalist: '粗野',
    editorial: '编辑',
    glass: '玻璃拟态',
    neumorph: '新拟态',
    claymorph: '粘土',
    bento: '便当网格',
    retro: '复古',
    organic: '有机',
    industrial: '工业',
    playful: '俏皮',
    luxe: '奢华',
    raw: '原始',
  },
  mood: {
    cold: '冷峻',
    warm: '温暖',
    serious: '严肃',
    playful: '俏皮',
    calm: '平静',
    energetic: '活力',
    'dark-academia': '暗黑学院',
  },
  theme: {
    light: '浅色',
    dark: '深色',
  },
  stack: {
    'react-antd-tailwind': 'React + Antd + Tailwind',
    'html-tailwind': 'HTML + Tailwind',
    'shadcn-radix': 'shadcn + Radix',
    'vanilla-css': '原生 CSS',
  },
} as const;

export type TagGroup = keyof typeof tagI18n;

/** 取 tag 的中文；字典不存在则原样返回 */
export function zh(group: TagGroup, value: string): string {
  const dict = tagI18n[group] as Record<string, string>;
  return dict[value] ?? value;
}

/** 扁平化给术语表用 */
export function allTagEntries(): Array<{ group: TagGroup; en: string; zh: string }> {
  const out: Array<{ group: TagGroup; en: string; zh: string }> = [];
  for (const g of ['aesthetic', 'mood', 'theme', 'stack'] as TagGroup[]) {
    const d = tagI18n[g] as Record<string, string>;
    for (const en of Object.keys(d)) {
      out.push({ group: g, en, zh: d[en] });
    }
  }
  return out;
}
