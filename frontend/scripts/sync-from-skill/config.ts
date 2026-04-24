import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const SKILL_ROOT = path.join(os.homedir(), '.agents/skills/style-vault');
export const REFERENCES_DIR = path.join(SKILL_ROOT, 'references');
export const TAXONOMY_SRC = path.join(SKILL_ROOT, 'assets/taxonomy.json');
export const WEBSITE_ROOT = path.resolve(__dirname, '../..');
export const PREVIEW_DIR = path.join(WEBSITE_ROOT, 'src/preview');
export const REGISTRY_OUT = path.join(WEBSITE_ROOT, 'src/data/registry.json');
export const TAXONOMY_OUT = path.join(WEBSITE_ROOT, 'src/data/taxonomy.json');
