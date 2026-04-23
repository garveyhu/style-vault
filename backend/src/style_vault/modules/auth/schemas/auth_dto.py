"""认证相关 DTO / VO"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class GoogleLoginDTO(BaseModel):
    """Google OAuth 登录请求。前端拿到 access_token 后 POST 上来。"""

    access_token: str = Field(min_length=1, description="Google OAuth access token")


class UserVO(BaseModel):
    """用户视图对象（响应）"""

    model_config = ConfigDict(from_attributes=True)

    id: int
    email: str
    name: str
    avatar_url: Optional[str] = None
    created_at: Optional[datetime] = None


class LoginResultVO(BaseModel):
    """登录成功返回：JWT + 用户信息"""

    token: str = Field(description="JWT（HS256，7 天过期）")
    user: UserVO
