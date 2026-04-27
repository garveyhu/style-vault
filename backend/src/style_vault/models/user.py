from datetime import datetime, timedelta, timezone

from sqlalchemy import Boolean, Column, DateTime, Integer, String, text

from style_vault.complex.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), nullable=False, unique=True, index=True)
    google_id = Column(
        String(255),
        nullable=True,
        unique=True,
        index=True,
        comment="Google sub，允许为空以便未来支持其他登录方式",
    )
    name = Column(String(255), nullable=False)
    name_customized = Column(
        Boolean,
        nullable=False,
        server_default=text("0"),
        default=False,
        comment="用户是否在 /profile 编辑过 name；为 True 时 Google 登录不再覆盖",
    )
    avatar_url = Column(String(512), nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=text("(datetime('now', '+08:00'))"),
    )
    updated_at = Column(
        DateTime(timezone=True),
        server_default=text("(datetime('now', '+08:00'))"),
        onupdate=lambda: datetime.now(tz=timezone(timedelta(hours=8))),
    )
