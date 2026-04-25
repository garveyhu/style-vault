# style-vault backend

FastAPI 后端，提供 Google OAuth Popup 登录 + JWT 鉴权。

## 技术栈

- Python 3.12+ / uv
- FastAPI + SQLAlchemy 2 + Alembic
- Loguru 日志，Ruff 代码风格
- SQLite（默认落地到 `backend/data.db`）
- JWT（HS256，`pyjwt`）
- Google OAuth：access_token + Google userinfo API（无需 Client Secret）

## 目录结构

```
backend/
├── alembic.ini
├── config/
│   ├── .env              # 敏感（不提交 git）
│   ├── .env.example
│   ├── app.json          # 应用配置（不提交 git）
│   ├── app.json.example
│   ├── component.json    # 组件配置（不提交 git）
│   └── component.json.example
├── migrations/
│   ├── env.py
│   └── versions/
├── pyproject.toml
├── run.sh
└── src/
    └── style_vault/
        ├── api/                     # 路由（自动注册）
        │   └── auth_api.py
        ├── app/
        │   └── main.py              # FastAPI 入口
        ├── complex/                 # 技术组件
        │   ├── auth/                # JWT util + get_current_user
        │   ├── config/              # settings / inventory / request_context
        │   ├── constants/
        │   └── response/            # Result / ResultCode / CustomException
        ├── models/                  # SQLAlchemy 模型
        │   └── user.py
        └── modules/
            └── auth/
                ├── schemas/         # Pydantic DTO / VO
                └── service/         # GoogleAuthService
```

## 启动

```bash
cd backend
./run.sh
```

`run.sh` 会先跑 `uv sync` 再用 `uv run python -m style_vault.app.main` 启动。
**统一用 `./run.sh` 启动**，不再推荐手写单行命令。

启动时会自动执行 `alembic upgrade head`。默认监听 `0.0.0.0:8000`，开启 uvicorn reload。

## 环境变量

在 `config/.env` 中配置（已有本地默认值）：

| 变量               | 说明                               | 必填                             |
| ------------------ | ---------------------------------- | -------------------------------- |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID             | 可选（当前仅记录，不做严格校验） |
| `JWT_SECRET`       | JWT 签名密钥，生产务必改为长随机串 | 是                               |
| `LOG_LEVEL`        | 日志级别，默认 INFO                | 否                               |

其他非敏感配置在 `config/app.json`：

- `JWT_ALGORITHM`（默认 HS256）
- `JWT_EXPIRE_DAYS`（默认 7）
- `CORS_ORIGINS`（默认 `http://localhost:6001` / `6002`）

## API

统一前缀 `/api`，所有响应使用 `Result` 包装：

```json
{ "code": 0, "message": "ok", "data": ... }
```

成功 `code=0`；失败 `code=<http_status>` 且 `data=null`。

### POST `/api/auth/google`

Google 登录。前端拿到 access_token 后 POST 上来。

Request:

```json
{ "access_token": "ya29...." }
```

Response 200:

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "token": "<jwt>",
    "user": {
      "id": 1,
      "email": "...",
      "name": "...",
      "avatar_url": "...",
      "created_at": "2026-04-23T08:00:00+08:00"
    }
  }
}
```

失败（access_token 无效）返回 401 + `Invalid Google access token`。

### GET `/api/auth/me`

Headers: `Authorization: Bearer <jwt>`

Response 200:

```json
{ "code": 0, "message": "ok", "data": { "user": { ... } } }
```

Response 401：

```json
{ "code": 401, "message": "unauthorized", "data": null }
```

### POST `/api/auth/logout`

JWT 无状态，服务端不维护 session。前端丢弃 token 即可，此接口只返 200：

```json
{ "code": 0, "message": "logged out", "data": null }
```

### GET `/health`

健康检查，返回 `{ "code": 0, "message": "ok", "data": { "status": "ok" } }`。

### POST `/api/files/upload`

上传文件到 MinIO 对象存储。需登录（`Authorization: Bearer <jwt>`），
按 `user-<id>/<uuid><ext>` 的路径落到 bucket。

Request（multipart/form-data）：

- `file`：要上传的文件

Response 200：

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "object_name": "user-1/a1b2c3d4....png",
    "url": "http://127.0.0.1:9000/style-vault/user-1/a1b2c3d4....png",
    "size": 102400,
    "content_type": "image/png"
  }
}
```

失败：空文件或超过 10MB 返 400；MinIO 异常返 500。未登录返 401。

curl 示例：

```bash
curl -X POST http://localhost:8000/api/files/upload \
  -H "Authorization: Bearer <jwt>" \
  -F "file=@/path/to/image.png"
```

### 收藏：`/api/favorites`

所有接口需登录。`entry_id` 为 registry 条目的字符串 ID，可含斜杠
（如 `composites/display/table`），路由用 `:path` converter 直接匹配。

| 方法 | 路径                             | 说明                                             |
| ---- | -------------------------------- | ------------------------------------------------ |
| GET  | `/api/favorites`                 | 当前用户收藏列表 → `{"items": ["vibes/..", ..]}` |
| POST | `/api/favorites/{entry_id:path}` | toggle 收藏 → `{"favorited": bool}`              |

toggle curl 示例：

```bash
curl -X POST http://localhost:8000/api/favorites/composites/display/table \
  -H "Authorization: Bearer <jwt>"
# → {"code":0,"message":"ok","data":{"favorited":true}}
```

### 笔记：`/api/notes`

每个 `(user_id, entry_id)` 至多一条。空串也会存，删除由业务决定。

| 方法 | 路径                         | 说明                               |
| ---- | ---------------------------- | ---------------------------------- |
| GET  | `/api/notes/{entry_id:path}` | 无笔记时返回 `{"content": ""}`     |
| PUT  | `/api/notes/{entry_id:path}` | upsert，Body `{"content": string}` |

PUT curl 示例：

```bash
curl -X PUT http://localhost:8000/api/notes/composites/display/table \
  -H "Authorization: Bearer <jwt>" \
  -H "Content-Type: application/json" \
  -d '{"content": "# 我的笔记\n这里写心得……"}'
```

### 截图：`/api/screenshots`

文件上传 / DB 关联解耦：先 `POST /api/files/upload` 拿 `object_name` + `url`，
再 `POST /api/screenshots/{entry_id}` 落 DB。删除时服务端会同步清 MinIO 对象
（清理失败只 warn 不阻塞）。

| 方法   | 路径                               | 说明                                |
| ------ | ---------------------------------- | ----------------------------------- |
| GET    | `/api/screenshots/{entry_id:path}` | 列出当前用户对该 entry 的截图       |
| POST   | `/api/screenshots/{entry_id:path}` | Body `{object_name, url, caption?}` |
| DELETE | `/api/screenshots/{id}`            | 按主键 id 删除（校验归属）          |

## 文件上传（MinIO）

后端使用 MinIO 作为对象存储，默认连接 `http://127.0.0.1:9000`。

### 本地启动 MinIO

方式一：Docker（推荐）

```bash
docker run -d --name minio \
  -p 9000:9000 -p 9001:9001 \
  -e "MINIO_ROOT_USER=minioadmin" \
  -e "MINIO_ROOT_PASSWORD=<your-password>" \
  -v ~/minio-data:/data \
  minio/minio server /data --console-address ":9001"
```

- `9000`：S3 API 端口（后端连接用）
- `9001`：Web Console（浏览器访问 `http://127.0.0.1:9001` 可视化管理）

方式二：本地安装，详见 https://min.io/docs

### bucket 自动创建

后端启动时会自动检查 `style-vault` bucket 是否存在，不存在则创建。
MinIO 连不上不会阻塞启动，只打 warning 日志。

### 配置

`config/component.json` 的 `minio` 段：

```json
{
  "minio": {
    "url": "127.0.0.1:9000",
    "secure": false,
    "bucket": "style-vault",
    "public_url": "http://127.0.0.1:9000"
  }
}
```

- `url`：endpoint（不带 scheme，MinIO SDK 要求）
- `secure`：是否走 https
- `bucket`：默认 bucket 名
- `public_url`：拼接对外访问链接用，本地等于 endpoint；线上可指向 CDN

`config/.env` 的敏感密钥：

```
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=<your-password>
```

## 登录流程（前后端总览）

```
Front-end:
  1. Google SDK 弹出授权窗口 → 拿到 access_token
  2. POST /api/auth/google { access_token }
  3. 拿到 { token, user }，把 token 存 localStorage
  4. 后续请求带 Authorization: Bearer <token>

Back-end (/api/auth/google):
  1. 用 access_token 调 Google userinfo API 拿 (sub, email, name, picture)
  2. 按 google_id → email 查找用户，没有就创建
  3. 用 user.id 签发 JWT（HS256, 7 天）返回
```

## 数据库

SQLite 在 `backend/data.db`（已进 gitignore）。模型使用"逻辑外键"，不定义 `ForeignKey` 约束。

### Users 表

| 字段       | 类型                     | 说明                                     |
| ---------- | ------------------------ | ---------------------------------------- |
| id         | int PK                   | 主键                                     |
| email      | str(255) unique NOT NULL | 邮箱                                     |
| google_id  | str(255) unique NULL     | Google sub，允许为空以便未来支持其他登录 |
| name       | str(255) NOT NULL        | 显示名                                   |
| avatar_url | str(512) NULL            | 头像 URL                                 |
| created_at | datetime                 | 创建时间（+08:00）                       |
| updated_at | datetime                 | 更新时间（+08:00）                       |

### Favorites 表

| 字段       | 类型     | 说明                                              |
| ---------- | -------- | ------------------------------------------------- |
| id         | int PK   | 主键                                              |
| user_id    | int      | 逻辑外键 users.id                                 |
| entry_id   | str(255) | registry 条目 ID，形如 `composites/display/table` |
| created_at | datetime | 创建时间（+08:00）                                |

唯一约束：`(user_id, entry_id)`。

### Notes 表

| 字段       | 类型     | 说明                    |
| ---------- | -------- | ----------------------- |
| id         | int PK   | 主键                    |
| user_id    | int      | 逻辑外键 users.id       |
| entry_id   | str(255) | registry 条目 ID        |
| content    | text     | markdown 源码，允许空串 |
| updated_at | datetime | 更新时间（+08:00）      |

唯一约束：`(user_id, entry_id)`。

### Screenshots 表

| 字段        | 类型          | 说明               |
| ----------- | ------------- | ------------------ |
| id          | int PK        | 主键               |
| user_id     | int           | 逻辑外键 users.id  |
| entry_id    | str(255)      | registry 条目 ID   |
| object_name | str(512)      | MinIO 对象 key     |
| url         | str(1024)     | 公网访问 URL       |
| caption     | str(512) NULL | 可选说明           |
| created_at  | datetime      | 创建时间（+08:00） |

一个 user + entry 可以有多张截图。

### 迁移

```bash
uv run alembic revision --autogenerate -m "<desc>"
uv run alembic upgrade head
```

SQLite 必须用 `render_as_batch=True`（已在 `migrations/env.py` 配置）+ `batch_alter_table` 做列变更。

## CORS

默认允许 `http://localhost:6001` 和 `http://localhost:6002`，`credentials=True`。
生产部署请改 `config/app.json` 的 `CORS_ORIGINS`。

## 未完成事项（TODO）

- [ ] **Google Cloud Console 配置**（需用户手动做）：
  - 前往 https://console.cloud.google.com/ → APIs & Services → Credentials
  - 创建 / 编辑 Web OAuth 2.0 Client ID `160104575584-xxx`
  - 在 **Authorized JavaScript origins** 中添加：
    - `http://localhost:6001`
    - `http://localhost:6002`
  - **Redirect URIs 不需要配**（本方案走 access_token 流，不用跳转）
- [ ] 生产环境替换 `JWT_SECRET` 为长随机串
- [ ] 生产环境 CORS 改白名单正式域名
- [ ] 可选：用 `google-auth` 库对 access_token 做严格 Client ID 校验（当前仅调用 userinfo API，由 Google 验证 token 有效性）

## 代码规范

```bash
uv run ruff format .
uv run ruff check --fix .
```

- HTTP 方法只用 GET / POST（不用 PUT/DELETE/PATCH）
- 响应一律 `Result.ok()` / `Result.fail()` 包装
- MVC 分层：API → Service → Model/Schema
- Model 不用 `ForeignKey`，用 `index=True` + `comment`
