"""MinIO 客户端单例 + bucket 初始化"""

from functools import lru_cache

from loguru import logger
from minio import Minio
from minio.error import S3Error

from style_vault.complex.config.inventory import MinioSettings


@lru_cache(maxsize=1)
def get_minio_client() -> Minio:
    """单例 Minio 客户端"""
    return Minio(
        endpoint=MinioSettings.ENDPOINT,
        access_key=MinioSettings.ACCESS_KEY,
        secret_key=MinioSettings.SECRET_KEY,
        secure=MinioSettings.SECURE,
    )


def ensure_bucket(bucket: str | None = None) -> None:
    """启动时保证 bucket 存在，不存在则创建"""
    bucket = bucket or MinioSettings.BUCKET
    client = get_minio_client()
    try:
        if not client.bucket_exists(bucket):
            client.make_bucket(bucket)
            logger.info(f"[minio] bucket 不存在，已自动创建: {bucket}")
        else:
            logger.info(f"[minio] bucket 就绪: {bucket}")
    except S3Error as e:
        logger.error(f"[minio] bucket 检查失败: {e}")
        raise
