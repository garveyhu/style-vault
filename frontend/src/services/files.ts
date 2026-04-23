import { apiFetchForm } from './http';

export type UploadedFile = {
  object_name: string;
  url: string;
  size: number;
  content_type: string;
};

export const filesApi = {
  upload(file: File): Promise<UploadedFile> {
    const form = new FormData();
    form.append('file', file);
    return apiFetchForm<UploadedFile>('/api/files/upload', form);
  },
};
