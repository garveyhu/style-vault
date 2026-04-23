"""文件上传路由：MinIO 对象存储"""

from typing import Annotated

from fastapi import APIRouter, Depends, File, UploadFile
from loguru import logger

from style_vault.complex.auth.oauth import get_current_user
from style_vault.complex.response.result import Result
from style_vault.models.user import User
from style_vault.modules.files.service.minio_service import MinioService

router = APIRouter(prefix="/api/files", tags=["files"])


@router.post("/upload")
async def upload_file(
    current_user: Annotated[User, Depends(get_current_user)],
    file: UploadFile = File(...),
):
    """上传文件到 MinIO（需登录）。

    按用户分目录：`user-<id>/<uuid><ext>`。返回 object_name / url /
    size / content_type。
    """
    try:
        info = await MinioService.upload(file, prefix=f"user-{current_user.id}")
        return Result.ok(info)
    except ValueError as e:
        return Result.fail(message=str(e), code=400)
    except Exception as e:
        logger.exception(e)
        return Result.fail(message=f"上传失败: {e}", code=500)
