import { useCallback, useEffect, useState } from 'react';
import { Button, Empty, Image, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import {
  InboxOutlined,
  DeleteOutlined,
  LoadingOutlined,
  CameraOutlined,
} from '@ant-design/icons';
import { filesApi, screenshotsApi, type Screenshot } from '@/services';
import { useAuth } from '../auth/AuthContext';
import { LoginModal } from './LoginModal';
import { toast } from './Toast';

const { Dragger } = Upload;

export function ScreenshotGallery({
  entryId,
  variant = 'compact',
}: {
  entryId: string;
  variant?: 'compact' | 'section';
}) {
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState<Screenshot[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

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
      toast.error('只支持图片文件');
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
      toast.success('已上传', 1500);
      onSuccess?.({}, new XMLHttpRequest());
    } catch (err) {
      const e = err as Error;
      toast.error(e.message || '上传失败');
      onError?.(e);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await screenshotsApi.remove(id);
      setItems((prev) => prev.filter((x) => x.id !== id));
      toast.success('已删除', 1500);
    } catch (err) {
      const e = err as Error;
      toast.error(e.message || '删除失败');
    }
  };

  const isSection = variant === 'section';

  if (!user) {
    return (
      <div
        className={`flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-white/60 text-center ${
          isSection ? 'py-16' : 'px-4 py-8'
        }`}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400">
          <CameraOutlined className="text-[20px]" />
        </div>
        <div className="text-[13px] text-slate-500">
          {isSection
            ? '登录后可上传应用截图，记录风格的真实落地'
            : '登录后可上传应用截图'}
        </div>
        <Button type="primary" onClick={() => setLoginOpen(true)}>
          登录
        </Button>
        <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      </div>
    );
  }

  return (
    <div className={isSection ? 'space-y-6' : 'space-y-3'}>
      <Dragger
        name="file"
        multiple={false}
        accept="image/*"
        showUploadList={false}
        customRequest={customRequest}
        disabled={uploading}
        fileList={[] as UploadFile[]}
        className={`!rounded-2xl !border-dashed !border-slate-200 !bg-white/70 ${
          isSection ? '!py-10' : ''
        }`}
      >
        <p className="ant-upload-drag-icon !mb-3">
          {uploading ? (
            <LoadingOutlined className="text-emerald-500" />
          ) : (
            <InboxOutlined className="text-emerald-400" />
          )}
        </p>
        <p
          className={`ant-upload-text !text-slate-800 ${
            isSection ? '!text-[15px] !font-medium' : '!text-[13px]'
          }`}
        >
          {uploading
            ? '上传中…'
            : isSection
              ? '拖入图片或点击上传'
              : '拖入或点击上传截图'}
        </p>
        <p className="ant-upload-hint !text-[12px] !text-slate-400">
          支持 PNG / JPG / WEBP · 单张 ≤10MB
        </p>
      </Dragger>

      {loading ? (
        <div className="py-6 text-center text-[12px] text-slate-400">
          <LoadingOutlined /> 载入中…
        </div>
      ) : items.length === 0 ? isSection ? null : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span className="text-[12px] text-slate-400">还没有截图</span>
          }
          className="!my-4"
        />
      ) : (
        <div
          className={
            isSection
              ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid grid-cols-2 gap-2'
          }
        >
          {items.map((s) => (
            <div
              key={s.id}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 ${
                isSection ? '' : ''
              }`}
            >
              <Image
                src={s.url}
                alt={s.caption ?? 'screenshot'}
                className={`!block !w-full !object-cover ${
                  isSection ? '!h-56' : '!h-24'
                }`}
                preview={{ src: s.url }}
              />
              <button
                type="button"
                onClick={() => handleDelete(s.id)}
                title="删除"
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg bg-black/60 text-white opacity-0 transition group-hover:opacity-100 hover:bg-black/80"
              >
                <DeleteOutlined className="text-[12px]" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ScreenshotGallery;
