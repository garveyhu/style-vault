from pathlib import Path

# src/style_vault/complex/config/ 上四级 → 项目根（backend/）
ROOT_PATH = Path(__file__).parents[4]
CONFIG_PATH = ROOT_PATH / "config"
