import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, message } from 'antd';
import { CheckCircleFilled, LoadingOutlined, EditOutlined } from '@ant-design/icons';
import { notesApi } from '../utils/api';
import { useAuth } from '../auth/AuthContext';
import { LoginModal } from './LoginModal';

type Status = 'idle' | 'saving' | 'saved' | 'error';

const SAVE_DEBOUNCE_MS = 800;

export function NoteEditor({ entryId }: { entryId: string }) {
  const { user, loading: authLoading } = useAuth();
  const [content, setContent] = useState('');
  const [serverContent, setServerContent] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [loginOpen, setLoginOpen] = useState(false);
  const debounceRef = useRef<number | null>(null);
  const [messageApi, ctx] = message.useMessage();

  // 载入服务端笔记
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoaded(true);
      return;
    }
    let cancelled = false;
    setLoaded(false);
    notesApi
      .get(entryId)
      .then((d) => {
        if (cancelled) return;
        setContent(d.content ?? '');
        setServerContent(d.content ?? '');
      })
      .catch(() => {
        /* 静默；极端情况下当作空 */
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [entryId, user, authLoading]);

  // debounced 保存
  const scheduleSave = useCallback(
    (next: string) => {
      if (!user) return;
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      setStatus('idle');
      debounceRef.current = window.setTimeout(async () => {
        if (next === serverContent) return;
        setStatus('saving');
        try {
          await notesApi.upsert(entryId, next);
          setServerContent(next);
          setStatus('saved');
        } catch (err) {
          const e = err as Error;
          setStatus('error');
          messageApi.error({ content: e.message || '保存失败', duration: 2 });
        }
      }, SAVE_DEBOUNCE_MS);
    },
    [entryId, user, serverContent, messageApi],
  );

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setContent(v);
    scheduleSave(v);
  };

  // 卸载时兜底一次保存（仅在有 pending debounce 时）
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
        if (user && content !== serverContent) {
          notesApi.upsert(entryId, content).catch(() => {});
        }
      }
    };
    // 仅在 unmount 时触发；content/serverContent 通过 ref 读最新版本
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-slate-200 bg-white/60 px-6 py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400">
          <EditOutlined className="text-[20px]" />
        </div>
        <div>
          <div className="font-display text-[18px] text-slate-900">登录后即可写笔记</div>
          <div className="mt-1 text-[13px] text-slate-500">
            记录你对这个风格的使用心得、改造点
          </div>
        </div>
        <Button type="primary" onClick={() => setLoginOpen(true)}>
          登录
        </Button>
        <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      </div>
    );
  }

  if (!loaded) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-8 text-slate-400">
        <LoadingOutlined /> 载入笔记…
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {ctx}
      <textarea
        value={content}
        onChange={onChange}
        placeholder="记录使用心得 / 改造点 / 搭配建议…（支持 Markdown）"
        rows={16}
        className="w-full resize-y rounded-xl border border-slate-200 bg-white p-4 text-[14px] leading-relaxed text-slate-800 shadow-sm outline-none transition focus:border-violet-300 focus:shadow-[0_0_0_3px_rgba(167,139,250,0.15)]"
      />
      <div className="flex items-center justify-between text-[11px] text-slate-400">
        <div>{content.length} 字 · 自动保存</div>
        <SaveIndicator status={status} />
      </div>
    </div>
  );
}

function SaveIndicator({ status }: { status: Status }) {
  if (status === 'saving')
    return (
      <span className="flex items-center gap-1 text-slate-400">
        <LoadingOutlined /> 保存中…
      </span>
    );
  if (status === 'saved')
    return (
      <span className="flex items-center gap-1 text-emerald-500">
        <CheckCircleFilled /> 已保存
      </span>
    );
  if (status === 'error')
    return <span className="text-rose-500">保存失败</span>;
  return <span className="text-slate-300">尚未改动</span>;
}

export default NoteEditor;
