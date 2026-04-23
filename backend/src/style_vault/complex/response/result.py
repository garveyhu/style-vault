from typing import Generic, Optional, TypeVar

from pydantic import BaseModel, ConfigDict, Field

from .code import ResultCode

T = TypeVar("T")


class Result(BaseModel, Generic[T]):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    code: int = Field(..., description="状态码，0 表示成功")
    message: str = Field(..., description="响应消息")
    data: Optional[T] = Field(None, description="响应数据")

    @classmethod
    def ok(cls, data: Optional[T] = None, message: str = ResultCode.SUCCESS.message):
        return cls(code=ResultCode.SUCCESS.code, message=message, data=data)

    @classmethod
    def fail(
        cls,
        message: str = ResultCode.FAIL.message,
        data: Optional[T] = None,
        code: int = ResultCode.FAIL.code,
    ):
        return cls(code=code, message=message, data=data)

    @classmethod
    def create(cls, success: bool, data: Optional[T] = None, message: str = ""):
        code = ResultCode.SUCCESS.code if success else ResultCode.FAIL.code
        return cls(code=code, message=message, data=data)
