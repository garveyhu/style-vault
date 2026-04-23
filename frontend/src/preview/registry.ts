import type { ComponentType } from 'react';

/**
 * Eager 收集所有 preview 组件 —— 打包进主 bundle，供卡片 / Hero 装饰
 * 直接 mount（不走 iframe，不触发独立 SPA 重新加载 AuthProvider 等）。
 *
 * key 为相对 id：'composites/display/table'、'vibes/saas-tool/cold-industrial-saas' ...
 */
const modules = import.meta.glob<{ default: ComponentType }>(
  './**/*.tsx',
  { eager: true },
);

export const previewComponents: Record<string, ComponentType> = {};

for (const [path, mod] of Object.entries(modules)) {
  if (path.includes('/_layout') || path.includes('/_templates/')) continue;
  const id = path.replace(/^\.\//, '').replace(/\.tsx$/, '');
  previewComponents[id] = mod.default;
}

export function getPreviewId(previewPath: string | null | undefined): string | null {
  if (!previewPath) return null;
  return previewPath.replace(/^\/preview\//, '');
}

export function getPreviewComponent(
  previewPath: string | null | undefined,
): ComponentType | null {
  const id = getPreviewId(previewPath);
  return id ? previewComponents[id] ?? null : null;
}
