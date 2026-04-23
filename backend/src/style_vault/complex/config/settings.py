from dotenv import load_dotenv

from .base_settings import BaseSettings
from .constants import CONFIG_PATH

load_dotenv(CONFIG_PATH / ".env")


class AppSettingsJson(BaseSettings):
    """应用配置（app.json）"""

    def __init__(self):
        super().__init__()
        self.data = self.from_json(CONFIG_PATH / "app.json").data


class ComponentSettingsJson(BaseSettings):
    """组件配置（component.json）"""

    def __init__(self):
        super().__init__()
        self.data = self.from_json(CONFIG_PATH / "component.json").data


app_settings = AppSettingsJson()
component_settings = ComponentSettingsJson()
