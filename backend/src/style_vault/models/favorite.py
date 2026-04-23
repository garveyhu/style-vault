from sqlalchemy import Column, DateTime, Integer, String, UniqueConstraint, text

from style_vault.complex.database import Base


class Favorite(Base):
    """收藏：user_id + entry_id 唯一。

    entry_id 是 registry 条目的字符串 ID（如 "composites/display/table"），
    不做外键，仅做逻辑关联。
    """

    __tablename__ = "favorites"
    __table_args__ = (
        UniqueConstraint("user_id", "entry_id", name="uq_favorites_user_entry"),
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
    created_at = Column(
        DateTime(timezone=True),
        server_default=text("(datetime('now', '+08:00'))"),
    )
