import importlib
import pkgutil
import sys
from contextlib import asynccontextmanager

from alembic.command import upgrade
from alembic.config import Config
from fastapi import APIRouter, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
from starlette.responses import JSONResponse

from style_vault.complex.config.constants import ROOT_PATH
from style_vault.complex.config.inventory import AppSettings
from style_vault.complex.config.request_context import RequestContext
from style_vault.complex.response.code import ResultCode
from style_vault.complex.response.exception import CustomException
from style_vault.complex.response.result import Result
from style_vault.complex.storage.minio_client import ensure_bucket

# 日志配置
logger.remove()
logger.add(
    sys.stderr,
    level=AppSettings.LOG_LEVEL,
    format=(
        "<green>{time:YYYY-MM-DD HH:mm:ss}</green> | "
        "<level>{level: <8}</level> | "
        "<cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - "
        "<level>{message}</level>"
    ),
)


def run_migrations() -> None:
    try:
        cfg = Config(str(ROOT_PATH / "alembic.ini"))
        cfg.set_main_option("script_location", str(ROOT_PATH / "migrations"))
        upgrade(cfg, "head")
        logger.info("Migrations completed.")
    except Exception as e:
        logger.error(f"Migration failed: {e}")


def _register_routers(app: FastAPI) -> None:
    """自动扫描 style_vault/api/ 下所有 APIRouter 并注册"""
    import style_vault.api as api_pkg

    for _, name, _ in pkgutil.walk_packages(api_pkg.__path__, api_pkg.__name__ + "."):
        try:
            module = importlib.import_module(name)
            for attr_name in dir(module):
                obj = getattr(module, attr_name)
                if isinstance(obj, APIRouter):
                    app.include_router(obj)
                    logger.info(f"Registered router: {name}")
        except Exception as e:
            logger.error(f"Failed to register router {name}: {e}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    run_migrations()
    # MinIO bucket 自检：连不上不阻塞启动，只打 warning
    try:
        ensure_bucket()
    except Exception as e:
        logger.warning(f"[minio] 启动时 bucket 检查失败（非致命）: {e}")
    logger.info("Application started.")
    yield
    logger.info("Application shutting down.")


def create_app() -> FastAPI:
    app = FastAPI(title=AppSettings.APP_NAME, lifespan=lifespan)

    # CORS（放在最外层）
    app.add_middleware(
        CORSMiddleware,
        allow_origins=AppSettings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # HTTPException → Result 包装（主要用于 401/400 等由 Depends 抛出的）
    @app.exception_handler(HTTPException)
    async def http_exception_handler(request: Request, exc: HTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content=Result(
                code=exc.status_code,
                message=str(exc.detail) if exc.detail else "error",
                data=None,
            ).model_dump(),
        )

    # 自定义业务异常
    @app.exception_handler(CustomException)
    async def custom_exception_handler(request: Request, exc: CustomException):
        return JSONResponse(
            status_code=exc.result_code.code if exc.result_code.code >= 400 else 400,
            content=Result(
                code=exc.result_code.code,
                message=exc.message,
                data=None,
            ).model_dump(),
        )

    # 兜底异常
    @app.exception_handler(Exception)
    async def all_exception_handler(request: Request, exc: Exception):
        logger.exception(exc)
        return JSONResponse(
            status_code=500,
            content=Result(
                code=ResultCode.SYSTEM_INNER_ERROR.code,
                message=str(exc),
                data=None,
            ).model_dump(),
        )

    # 请求上下文中间件
    @app.middleware("http")
    async def context_middleware(request: Request, call_next):
        try:
            return await call_next(request)
        finally:
            RequestContext.clear()

    # 健康检查
    @app.get("/health", tags=["health"])
    def health():
        return Result.ok({"status": "ok"})

    _register_routers(app)
    return app


app = create_app()


def main() -> None:
    import uvicorn

    uvicorn.run(
        "style_vault.app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )


if __name__ == "__main__":
    main()
