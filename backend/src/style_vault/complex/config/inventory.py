import os

from .settings import app_settings, component_settings


class AppSettings:
    """应用配置访问类"""

    LOG_LEVEL = os.getenv("LOG_LEVEL") or app_settings.get("LOG_LEVEL") or "INFO"
    APP_NAME = app_settings.get("APP_NAME") or "style-vault"

    # JWT
    JWT_SECRET = (
        os.getenv("JWT_SECRET")
        or app_settings.get("JWT_SECRET")
        or "change-me-in-production"
    )
    JWT_ALGORITHM = app_settings.get("JWT_ALGORITHM") or "HS256"
    JWT_EXPIRE_DAYS = int(app_settings.get("JWT_EXPIRE_DAYS") or 7)

    # Google OAuth
    GOOGLE_CLIENT_ID = (
        os.getenv("GOOGLE_CLIENT_ID") or app_settings.get("GOOGLE_CLIENT_ID") or ""
    )

    # CORS
    CORS_ORIGINS = app_settings.get("CORS_ORIGINS") or [
        "http://localhost:5173",
        "http://localhost:5174",
    ]


class DatabaseSettings:
    """数据库配置访问类"""

    _cached_url = None

    @staticmethod
    def get_type() -> str:
        return component_settings.get("database.type") or "sqlite"

    @staticmethod
    def get_url() -> str:
        if DatabaseSettings._cached_url:
            return DatabaseSettings._cached_url

        db_type = DatabaseSettings.get_type()
        if db_type == "sqlite":
            path = (
                component_settings.get("database.sqlite.path") or "sqlite:///./data.db"
            )
            DatabaseSettings._cached_url = path
        else:
            raise ValueError(f"Unsupported database type: {db_type}")
        return DatabaseSettings._cached_url

    @staticmethod
    def is_sqlite() -> bool:
        return DatabaseSettings.get_type() == "sqlite"
