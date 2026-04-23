import datetime
from typing import Optional

import jwt
from sqlalchemy.orm import Session

from style_vault.complex.config.inventory import AppSettings
from style_vault.complex.database import SessionLocal
from style_vault.models.user import User


def create_access_token(user: User) -> str:
    """生成 JWT Token（sub = user.id）"""
    expire = datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(
        days=AppSettings.JWT_EXPIRE_DAYS
    )
    payload = {
        "sub": str(user.id),
        "email": user.email,
        "exp": expire,
    }
    return jwt.encode(
        payload, AppSettings.JWT_SECRET, algorithm=AppSettings.JWT_ALGORITHM
    )


def verify_token(token: str) -> Optional[int]:
    """验证 Token，返回 user_id；失败返回 None"""
    try:
        payload = jwt.decode(
            token,
            AppSettings.JWT_SECRET,
            algorithms=[AppSettings.JWT_ALGORITHM],
        )
        sub = payload.get("sub")
        if sub is None:
            return None
        return int(sub)
    except Exception:
        return None


def verify_and_get_user(token: str) -> Optional[User]:
    """验证 Token 并返回 User 对象"""
    user_id = verify_token(token)
    if user_id is None:
        return None
    db: Session = SessionLocal()
    try:
        return db.query(User).filter(User.id == user_id).first()
    finally:
        db.close()
