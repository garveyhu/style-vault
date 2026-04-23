"""收藏路由：toggle + 列表"""

from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from style_vault.complex.auth.oauth import get_current_user
from style_vault.complex.database import get_db
from style_vault.complex.response.result import Result
from style_vault.models.favorite import Favorite
from style_vault.models.user import User

router = APIRouter(prefix="/api/favorites", tags=["favorites"])


@router.get("")
def list_favorites(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
):
    """当前用户所有收藏的 entry_id 列表。"""
    rows = (
        db.query(Favorite)
        .filter(Favorite.user_id == current_user.id)
        .order_by(Favorite.created_at.desc())
        .all()
    )
    return Result.ok({"items": [r.entry_id for r in rows]})


@router.post("/{entry_id:path}")
def toggle_favorite(
    entry_id: str,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
):
    """toggle 收藏：存在则删，不存在则建。返回 {favorited: bool}。"""
    row = (
        db.query(Favorite)
        .filter(Favorite.user_id == current_user.id, Favorite.entry_id == entry_id)
        .first()
    )
    if row is not None:
        db.delete(row)
        db.commit()
        return Result.ok({"favorited": False})

    fav = Favorite(user_id=current_user.id, entry_id=entry_id)
    db.add(fav)
    db.commit()
    return Result.ok({"favorited": True})
