"""截图路由：list / create / delete"""

from typing import Annotated, Optional

from fastapi import APIRouter, Depends
from loguru import logger
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from style_vault.complex.auth.oauth import get_current_user
from style_vault.complex.database import get_db
from style_vault.complex.response.result import Result
from style_vault.models.screenshot import Screenshot
from style_vault.models.user import User
from style_vault.modules.files.service.minio_service import MinioService

router = APIRouter(prefix="/api/screenshots", tags=["screenshots"])


class ScreenshotCreateDTO(BaseModel):
    object_name: str = Field(..., description="MinIO 对象 key")
    url: str = Field(..., description="公网访问 URL")
    caption: Optional[str] = Field(default=None, description="可选说明")


def _serialize(s: Screenshot) -> dict:
    return {
        "id": s.id,
        "entry_id": s.entry_id,
        "object_name": s.object_name,
        "url": s.url,
        "caption": s.caption,
        "created_at": s.created_at.isoformat() if s.created_at else None,
    }


@router.delete("/{screenshot_id}")
def delete_screenshot(
    screenshot_id: int,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
):
    """删除指定截图：校验归属 + 同步清理 MinIO 对象。

    注意：此路由放在 :path 路由前面，避免被吞掉。
    """
    row = db.query(Screenshot).filter(Screenshot.id == screenshot_id).first()
    if row is None:
        return Result.fail(message="截图不存在", code=404)
    if row.user_id != current_user.id:
        return Result.fail(message="无权删除", code=403)

    # 先删 MinIO 对象（失败只 warn，不阻塞数据库删除）
    try:
        MinioService.delete(row.object_name)
    except Exception as e:
        logger.warning(f"[screenshots] minio 清理失败（已忽略）: {e}")

    db.delete(row)
    db.commit()
    return Result.ok(None)


@router.get("/{entry_id:path}")
def list_screenshots(
    entry_id: str,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
):
    """列出当前用户对该 entry 的所有截图（按创建时间倒序）。"""
    rows = (
        db.query(Screenshot)
        .filter(
            Screenshot.user_id == current_user.id,
            Screenshot.entry_id == entry_id,
        )
        .order_by(Screenshot.created_at.desc())
        .all()
    )
    return Result.ok({"items": [_serialize(r) for r in rows]})


@router.post("/{entry_id:path}")
def create_screenshot(
    entry_id: str,
    dto: ScreenshotCreateDTO,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
):
    """创建截图关联（文件已经通过 /api/files/upload 上传到 MinIO）。"""
    row = Screenshot(
        user_id=current_user.id,
        entry_id=entry_id,
        object_name=dto.object_name,
        url=dto.url,
        caption=dto.caption,
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return Result.ok(_serialize(row))
