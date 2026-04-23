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

export interface Entry {
  frontmatter: Frontmatter;
  body: string;
  relativePath: string;
}
