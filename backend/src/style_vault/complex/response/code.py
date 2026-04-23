from enum import Enum


class ResultCode(Enum):
    SUCCESS = (0, "ok")
    FAIL = (400, "操作失败")
    UNAUTHORIZED = (401, "unauthorized")
    FORBIDDEN = (403, "无权限")
    NOT_FOUND = (404, "资源不存在")
    SYSTEM_INNER_ERROR = (500, "系统内部错误")

    def __init__(self, code: int, message: str):
        self.code = code
        self.message = message
