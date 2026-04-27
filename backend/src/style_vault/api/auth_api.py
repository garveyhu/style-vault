"""认证路由：Google OAuth 登录 / 当前用户 / 登出"""

from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from style_vault.complex.auth.oauth import get_current_user
from style_vault.complex.database import get_db
from style_vault.complex.response.result import Result
from style_vault.models.user import User
from style_vault.modules.auth.schemas.auth_dto import (
    GoogleLoginDTO,
    LoginResultVO,
    UpdateMeDTO,
    UserVO,
)
from style_vault.modules.auth.service.google_auth_service import GoogleAuthService

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/google")
def google_login(
    dto: GoogleLoginDTO,
    db: Annotated[Session, Depends(get_db)],
):
    """Google 登录：用 access_token 换取用户信息，返回 JWT。"""
    user, token, _is_new = GoogleAuthService.google_login(db, dto.access_token)
    payload = LoginResultVO(token=token, user=UserVO.model_validate(user))
    return Result.ok(payload.model_dump())


@router.get("/me")
def get_me(current_user: Annotated[User, Depends(get_current_user)]):
    """获取当前登录用户信息。无效/缺失 token 返回 401。"""
    return Result.ok({"user": UserVO.model_validate(current_user).model_dump()})


@router.post("/me")
def update_me(
    dto: UpdateMeDTO,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
):
    """更新当前用户的资料（目前仅支持改 name）。

    注意：`get_current_user` 内部用独立 SessionLocal 查询并关闭，
    返回的 User 是 detached 实例，必须 merge 进当前请求 session
    才能 commit，否则报 InvalidRequestError: not persistent。
    """
    name = dto.name.strip()
    if not name:
        return Result.fail("name 不能为空")
    user = db.merge(current_user)
    user.name = name
    user.name_customized = True
    db.commit()
    db.refresh(user)
    return Result.ok({"user": UserVO.model_validate(user).model_dump()})


@router.post("/logout")
def logout():
    """登出。JWT 无状态实现下服务端无需动作，前端丢弃 token 即可。"""
    return Result.ok(None, message="logged out")
