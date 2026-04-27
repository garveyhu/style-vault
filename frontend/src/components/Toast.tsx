import { useEffect, useState } from 'react';

/* =========================================================
   Toast · 全站操作反馈气泡（B · 顶部居中胶囊）
   - 单例 store + subscribe 模式
   - 调用方式：toast.success('xxx') / toast.error('xxx')
   - 视口需在 App 根挂一个 <ToastViewport />
   ========================================================= */

type ToastKind = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  kind: ToastKind;
  content: string;
}

let nextId = 0;
let items: ToastItem[] = [];
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function push(kind: ToastKind, content: string, duration = 2000) {
  const id = ++nextId;
  items = [...items, { id, kind, content }];
  emit();
  if (duration > 0) {
    window.setTimeout(() => {
      items = items.filter((t) => t.id !== id);
      emit();
    }, duration);
  }
  return id;
}

export const toast = {
  success: (content: string, duration?: number) =>
    push('success', content, duration),
  error: (content: string, duration?: number) => push('error', content, duration),
  info: (content: string, duration?: number) => push('info', content, duration),
};

export function ToastViewport() {
  const [, force] = useState(0);
  useEffect(() => {
    const cb = () => force((n) => n + 1);
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-[10000] flex flex-col items-center gap-2">
      {items.map((t) => (
        <ToastBubble key={t.id} item={t} />
      ))}
    </div>
  );
}

function ToastBubble({ item }: { item: ToastItem }) {
  const dot =
    item.kind === 'success'
      ? 'bg-emerald-500'
      : item.kind === 'error'
        ? 'bg-rose-500'
        : 'bg-slate-400';
  return (
    <div className="sv-toast-anim pointer-events-auto flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-900 shadow-[0_12px_30px_-12px_rgba(15,23,42,0.18)]">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {item.content}
    </div>
  );
}
