"""笔记路由：get + upsert"""

from typing import Annotated

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from style_vault.complex.auth.oauth import get_current_user
from style_vault.complex.database import get_db
from style_vault.complex.response.result import Result
from style_vault.models.note import Note
from style_vault.models.user import User

router = APIRouter(prefix="/api/notes", tags=["notes"])


class NoteUpsertDTO(BaseModel):
    content: str = Field(default="", description="markdown 源码，允许为空串")


@router.get("/{entry_id:path}")
def get_note(
    entry_id: str,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
):
    """取当前用户对该 entry 的笔记。无则 content=""。"""
    row = (
        db.query(Note)
        .filter(Note.user_id == current_user.id, Note.entry_id == entry_id)
        .first()
    )
    return Result.ok({"content": row.content if row else ""})


@router.put("/{entry_id:path}")
def upsert_note(
    entry_id: str,
    dto: NoteUpsertDTO,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
):
    """upsert 当前用户对该 entry 的笔记。空串也存。"""
    row = (
        db.query(Note)
        .filter(Note.user_id == current_user.id, Note.entry_id == entry_id)
        .first()
    )
    if row is None:
        row = Note(user_id=current_user.id, entry_id=entry_id, content=dto.content)
        db.add(row)
    else:
        row.content = dto.content
    db.commit()
    return Result.ok({"content": dto.content})
