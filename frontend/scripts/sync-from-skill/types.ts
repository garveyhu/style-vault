// 类型从 taxonomy.json 派生——新增 type / platform / theme 值
// 只需改 skill 的 assets/taxonomy.json 并跑 `yarn sync`，TS 类型自动跟上
import taxonomyData from '../../src/data/taxonomy.json';

export type EntryType = keyof typeof taxonomyData.type;
export type Platform = keyof typeof taxonomyData.platform;
export type Theme = keyof typeof taxonomyData.theme;

export interface ProductRefs {
  style?: string;
  pages?: string[];
  blocks?: string[];
  components?: string[];
  tokens?: {
    palette?: string;
    typography?: string;
    motion?: string;
    gradient?: string;
    border?: string;
    iconography?: string;
    /** 任意条数的布局 token（断点列数 / 弹性自适应栅格 等），与单值槽位并列 */
    layout?: string[];
  };
}

export interface Frontmatter {
  id: string;
  type: EntryType;
  name: string;
  description: string;
  platforms?: Platform[];
  theme?: Theme;
  category?: string;
  refs?: ProductRefs;
  cover?: string;
  tags: {
    aesthetic: string[];
    mood: string[];
    theme?: ('light' | 'dark')[]; // legacy, will be stripped after read
    stack: string[];
  };
  uses?: string[];
  preview?: string;
}

export interface RegistryItem extends Frontmatter {
  platforms: Platform[];
  theme: Theme;
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

// Taxonomy JSON shape (真相文件 skill/assets/taxonomy.json)
export interface Taxonomy {
  type: Record<string, { zh: string; color: string }>;
  platform: Record<string, { zh: string }>;
  theme: Record<string, { zh: string }>;
  category: Record<string, { zh: string; dot: string; order: number }>;
  tag: Record<
    'aesthetic' | 'mood' | 'stack',
    {
      groupZh: string;
      values: Record<string, { zh: string }>;
    }
  >;
}

export interface Registry {
  version: string;
  items: RegistryItem[];
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
