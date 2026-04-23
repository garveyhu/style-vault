"""
Google OAuth Service — token 验证、用户查找/创建。

核心逻辑：
1. 用前端传来的 access_token 调 Google userinfo API 获取用户信息
2. 按 google_id → email 顺序查找用户，找不到则创建
3. 生成 JWT 返回给前端
"""

import requests
from fastapi import HTTPException, status
from loguru import logger
from sqlalchemy.orm import Session

from style_vault.complex.auth.auth_util import create_access_token
from style_vault.models.user import User

GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"


class GoogleAuthService:
    @staticmethod
    def fetch_google_user(access_token: str) -> dict:
        """用 access_token 调用 Google userinfo API 获取用户信息。

        返回 dict 包含: sub, email, name, picture 等字段。
        """
        try:
            resp = requests.get(
                GOOGLE_USERINFO_URL,
                headers={"Authorization": f"Bearer {access_token}"},
                timeout=10,
            )
        except requests.RequestException as e:
            logger.error(f"Fetch Google userinfo network error: {e}")
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="Failed to reach Google userinfo API",
            )
        if resp.status_code != 200:
            logger.warning(
                f"Google userinfo returned {resp.status_code}: {resp.text[:200]}"
            )
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Google access token",
            )
        return resp.json()

    @staticmethod
    def find_or_create_user(
        db: Session,
        google_id: str,
        email: str,
        name: str,
        picture: str | None,
    ) -> tuple[User, bool]:
        """按 google_id → email 查找用户，找不到则创建。返回 (user, is_new_user)。"""
        # 先按 google_id 查找（已绑定的用户）
        user = db.query(User).filter(User.google_id == google_id).first()
        if user:
            # 顺带刷新名字和头像，让登录即同步
            changed = False
            if name and user.name != name:
                user.name = name
                changed = True
            if picture and user.avatar_url != picture:
                user.avatar_url = picture
                changed = True
            if changed:
                db.commit()
                db.refresh(user)
            return user, False

        # 再按 email 查找（未来若允许其他登录方式注册，这里自动关联）
        user = db.query(User).filter(User.email == email).first()
        if user:
            user.google_id = google_id
            if not user.avatar_url and picture:
                user.avatar_url = picture
            if name and not user.name:
                user.name = name
            db.commit()
            db.refresh(user)
            return user, False

        # 创建新用户
        user = User(
            email=email,
            google_id=google_id,
            name=name or email.split("@")[0],
            avatar_url=picture,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        logger.info(f"Created new user via Google login: id={user.id} email={email}")
        return user, True

    @staticmethod
    def google_login(db: Session, access_token: str) -> tuple[User, str, bool]:
        """完整的 Google 登录流程。返回 (user, jwt_token, is_new_user)。"""
        user_info = GoogleAuthService.fetch_google_user(access_token)

        google_id = user_info.get("sub")
        email = user_info.get("email")
        if not google_id or not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Google userinfo missing required fields (sub/email)",
            )
        name = user_info.get("name", "")
        picture = user_info.get("picture")

        user, is_new_user = GoogleAuthService.find_or_create_user(
            db, google_id, email, name, picture
        )

        jwt_token = create_access_token(user)
        return user, jwt_token, is_new_user
