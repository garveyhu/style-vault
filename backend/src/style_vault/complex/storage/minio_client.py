"""MinIO 客户端单例 + bucket 初始化"""

import json
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


def _public_read_policy(bucket: str) -> str:
    """匿名只读 policy：浏览器直接能看图。"""
    policy = {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": {"AWS": ["*"]},
                "Action": ["s3:GetObject"],
                "Resource": [f"arn:aws:s3:::{bucket}/*"],
            }
        ],
    }
    return json.dumps(policy)


def ensure_bucket(bucket: str | None = None) -> None:
    """启动时保证 bucket 存在，不存在则创建；并设置匿名只读 policy 以支持浏览器直链访问。"""
    bucket = bucket or MinioSettings.BUCKET
    client = get_minio_client()
    try:
        if not client.bucket_exists(bucket):
            client.make_bucket(bucket)
            logger.info(f"[minio] bucket 不存在，已自动创建: {bucket}")
        else:
            logger.info(f"[minio] bucket 就绪: {bucket}")

        # 幂等设置 public-read policy
        try:
            client.set_bucket_policy(bucket, _public_read_policy(bucket))
            logger.info(f"[minio] bucket 匿名只读 policy 已应用: {bucket}")
        except S3Error as e:
            logger.warning(f"[minio] 设置 bucket policy 失败（非致命，可手动配置）: {e}")
    except S3Error as e:
        logger.error(f"[minio] bucket 检查失败: {e}")
        raise
