import { platformLabel, themeLabel } from '../utils/i18n';
import type { Platform, Theme } from '../../scripts/sync-from-skill/types';

export interface PlatformThemeValue {
  platform: Platform | 'all';
  theme: Theme | 'any';
}

export const emptyPlatformTheme: PlatformThemeValue = {
  platform: 'all',
  theme: 'any',
};

const PLATFORM_OPTIONS: Array<Platform | 'all'> = ['all', 'web', 'ios', 'android'];
const THEME_OPTIONS: Array<Theme | 'any'> = ['any', 'light', 'dark'];

export function PlatformThemeBar({
  value,
  onChange,
}: {
  value: PlatformThemeValue;
  onChange: (next: PlatformThemeValue) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-medium tracking-wider text-slate-400">
          平台
        </span>
        {PLATFORM_OPTIONS.map((p) => {
          const on = value.platform === p;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onChange({ ...value, platform: p })}
              className={`rounded-full border px-3 py-1 text-[12px] font-medium transition ${
                on
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              {p === 'all' ? '全部' : platformLabel[p]}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-medium tracking-wider text-slate-400">
          主题
        </span>
        {THEME_OPTIONS.map((t) => {
          const on = value.theme === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => onChange({ ...value, theme: t })}
              className={`rounded-full border px-3 py-1 text-[12px] font-medium transition ${
                on
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              {t === 'any' ? '任意' : themeLabel[t]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PlatformThemeBar;
