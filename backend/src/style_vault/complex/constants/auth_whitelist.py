class AuthWhitelist:
    """认证白名单：这些路由跳过 JWT 验证（注：当前用 Depends 粒度控制，留着以备中间件用）"""

    _WHITELIST = [
        "/api/auth/google",
        "/api/auth/logout",
        "/health",
        "/ping",
        "/docs",
        "/redoc",
        "/openapi.json",
    ]

    @classmethod
    def is_whitelisted(cls, path: str) -> bool:
        return any(path.startswith(route) for route in cls._WHITELIST)

    @classmethod
    def get_all(cls) -> list[str]:
        return cls._WHITELIST.copy()
