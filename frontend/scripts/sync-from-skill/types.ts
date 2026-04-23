export type EntryType =
  | 'product'
  | 'style'
  | 'page'
  | 'block'
  | 'component'
  | 'token'
  // legacy（Phase C 末删除）
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
