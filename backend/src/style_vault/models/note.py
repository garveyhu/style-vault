from datetime import datetime, timedelta, timezone

from sqlalchemy import Column, DateTime, Integer, String, Text, UniqueConstraint, text

from style_vault.complex.database import Base


class Note(Base):
    """笔记：每个 user + entry 只有一条，内容是 markdown 源码。"""

    __tablename__ = "notes"
    __table_args__ = (
        UniqueConstraint("user_id", "entry_id", name="uq_notes_user_entry"),
    )

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(
        Integer,
        nullable=False,
        index=True,
        comment="逻辑外键 users.id",
    )
    entry_id = Column(
        String(255),
        nullable=False,
        index=True,
        comment="registry 条目 ID（带斜杠）",
    )
    content = Column(Text, nullable=False, default="", comment="markdown 源码")
    updated_at = Column(
        DateTime(timezone=True),
        server_default=text("(datetime('now', '+08:00'))"),
        onupdate=lambda: datetime.now(tz=timezone(timedelta(hours=8))),
    )
