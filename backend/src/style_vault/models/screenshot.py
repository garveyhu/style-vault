from sqlalchemy import Column, DateTime, Integer, String, text

from style_vault.complex.database import Base


class Screenshot(Base):
    """截图：关联 MinIO 对象与 registry 条目。"""

    __tablename__ = "screenshots"

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
    object_name = Column(
        String(512),
        nullable=False,
        comment="MinIO 对象 key，如 user-1/abc.png",
    )
    url = Column(
        String(1024),
        nullable=False,
        comment="公网访问 URL",
    )
    caption = Column(String(512), nullable=True, comment="可选说明")
    created_at = Column(
        DateTime(timezone=True),
        server_default=text("(datetime('now', '+08:00'))"),
    )
