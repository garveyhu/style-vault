import { useCallback, useEffect, useState } from 'react';
import { Button, Empty, Image, Upload, message } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import {
  InboxOutlined,
  DeleteOutlined,
  LoadingOutlined,
  CameraOutlined,
} from '@ant-design/icons';
import { filesApi, screenshotsApi, type Screenshot } from '../utils/api';
import { useAuth } from '../auth/AuthContext';
import { LoginModal } from './LoginModal';

const { Dragger } = Upload;

export function ScreenshotGallery({ entryId }: { entryId: string }) {
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState<Screenshot[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [messageApi, ctx] = message.useMessage();

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const list = await screenshotsApi.list(entryId);
      setItems(list);
    } catch {
      /* 静默 */
    } finally {
      setLoading(false);
    }
  }, [entryId, user]);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setItems([]);
      return;
    }
    load();
  }, [authLoading, user, load]);

  const customRequest: UploadProps['customRequest'] = async (options) => {
    const { file, onSuccess, onError } = options;
    const f = file as File;
    if (!f.type.startsWith('image/')) {
      messageApi.error({ content: '只支持图片文件', duration: 2 });
      onError?.(new Error('not image'));
      return;
    }
    setUploading(true);
    try {
      const uploaded = await filesApi.upload(f);
      const shot = await screenshotsApi.create(entryId, {
        object_name: uploaded.object_name,
        url: uploaded.url,
      });
      setItems((prev) => [shot, ...prev]);
      messageApi.success({ content: '已上传', duration: 1.5 });
      onSuccess?.({}, new XMLHttpRequest());
    } catch (err) {
      const e = err as Error;
      messageApi.error({ content: e.message || '上传失败', duration: 2 });
      onError?.(e);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await screenshotsApi.remove(id);
      setItems((prev) => prev.filter((x) => x.id !== id));
      messageApi.success({ content: '已删除', duration: 1.5 });
    } catch (err) {
      const e = err as Error;
      messageApi.error({ content: e.message || '删除失败', duration: 2 });
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-slate-200 bg-white/60 px-4 py-8 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400">
          <CameraOutlined className="text-[18px]" />
        </div>
        <div className="text-[13px] text-slate-500">
          登录后可上传应用截图
        </div>
        <Button size="small" type="primary" onClick={() => setLoginOpen(true)}>
          登录
        </Button>
        <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {ctx}
      <Dragger
        name="file"
        multiple={false}
        accept="image/*"
        showUploadList={false}
        customRequest={customRequest}
        disabled={uploading}
        fileList={[] as UploadFile[]}
        className="!rounded-xl !border-slate-200 !bg-white"
      >
        <p className="ant-upload-drag-icon !mb-2">
          {uploading ? (
            <LoadingOutlined className="text-violet-500" />
          ) : (
            <InboxOutlined className="text-violet-400" />
          )}
        </p>
        <p className="ant-upload-text !text-[13px] !text-slate-700">
          {uploading ? '上传中…' : '拖入或点击上传截图'}
        </p>
        <p className="ant-upload-hint !text-[11px] !text-slate-400">
          单张图片，≤10MB
        </p>
      </Dragger>

      {loading ? (
        <div className="py-6 text-center text-[12px] text-slate-400">
          <LoadingOutlined /> 载入截图…
        </div>
      ) : items.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span className="text-[12px] text-slate-400">还没有截图</span>}
          className="!my-4"
        />
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {items.map((s) => (
            <div
              key={s.id}
              className="group relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
            >
              <Image
                src={s.url}
                alt={s.caption ?? 'screenshot'}
                className="!block !h-24 !w-full !object-cover"
                preview={{ src: s.url }}
              />
              <button
                type="button"
                onClick={() => handleDelete(s.id)}
                title="删除"
                className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-md bg-black/60 text-white opacity-0 transition group-hover:opacity-100 hover:bg-black/80"
              >
                <DeleteOutlined className="text-[11px]" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ScreenshotGallery;
