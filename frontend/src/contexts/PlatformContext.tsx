import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { Platform } from '../../scripts/sync-from-skill/types';

export type PlatformSel = 'web' | 'ios' | 'android';

const STORAGE_KEY = 'sv.platform';
const VALID: ReadonlySet<PlatformSel> = new Set(['web', 'ios', 'android']);

const PlatformCtx = createContext<{
  platform: PlatformSel;
  setPlatform: (p: PlatformSel) => void;
} | null>(null);

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [platform, setPlatformState] = useState<PlatformSel>(() => {
    if (typeof window === 'undefined') return 'web';
    const saved = localStorage.getItem(STORAGE_KEY) as PlatformSel | null;
    return saved && VALID.has(saved) ? saved : 'web';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, platform);
  }, [platform]);

  return (
    <PlatformCtx.Provider value={{ platform, setPlatform: setPlatformState }}>
      {children}
    </PlatformCtx.Provider>
  );
}

export function usePlatform() {
  const ctx = useContext(PlatformCtx);
  if (!ctx) throw new Error('usePlatform must be used inside PlatformProvider');
  return ctx;
}

/** item 是否匹配当前选中的平台（tokens 等 'any' 永远匹配） */
export function matchesPlatform(
  itemPlatforms: Platform[],
  selected: PlatformSel,
): boolean {
  return itemPlatforms.includes(selected) || itemPlatforms.includes('any');
}
