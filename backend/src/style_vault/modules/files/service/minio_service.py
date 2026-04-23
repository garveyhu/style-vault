"""MinIO 对象存储服务：上传 / 删除 / 预签名下载链接"""

import uuid
from datetime import timedelta
from io import BytesIO
from pathlib import PurePosixPath

from fastapi import UploadFile
from loguru import logger
from minio.error import S3Error

from style_vault.complex.config.inventory import MinioSettings
from style_vault.complex.storage.minio_client import get_minio_client


class MinioService:
    """MinIO 对象存储服务"""

    @staticmethod
    def _gen_object_name(filename: str, prefix: str = "uploads") -> str:
        ext = PurePosixPath(filename).suffix.lower() or ""
        return f"{prefix}/{uuid.uuid4().hex}{ext}"

    @staticmethod
    async def upload(
        file: UploadFile,
        *,
        prefix: str = "uploads",
        max_size_mb: int = 10,
    ) -> dict:
        """上传 UploadFile 到 MinIO，返回 { object_name, url, size, content_type }"""
        client = get_minio_client()
        bucket = MinioSettings.BUCKET

        data = await file.read()
        size = len(data)
        if size == 0:
            raise ValueError("空文件")
        if size > max_size_mb * 1024 * 1024:
            raise ValueError(f"文件超过 {max_size_mb}MB 限制")

        object_name = MinioService._gen_object_name(file.filename or "unknown", prefix)
        content_type = file.content_type or "application/octet-stream"

        try:
            client.put_object(
                bucket_name=bucket,
                object_name=object_name,
                data=BytesIO(data),
                length=size,
                content_type=content_type,
            )
        except S3Error as e:
            logger.error(f"[minio] put_object 失败: {e}")
            raise

        url = f"{MinioSettings.PUBLIC_URL.rstrip('/')}/{bucket}/{object_name}"
        return {
            "object_name": object_name,
            "url": url,
            "size": size,
            "content_type": content_type,
        }

    @staticmethod
    def delete(object_name: str) -> None:
        """删除对象"""
        client = get_minio_client()
        try:
            client.remove_object(MinioSettings.BUCKET, object_name)
        except S3Error as e:
            logger.error(f"[minio] remove_object 失败: {e}")
            raise

    @staticmethod
    def presigned_get(object_name: str, expires_minutes: int = 60) -> str:
        """生成带签名的临时下载链接（私有 bucket 用）"""
        client = get_minio_client()
        return client.presigned_get_object(
            MinioSettings.BUCKET,
            object_name,
            expires=timedelta(minutes=expires_minutes),
        )
