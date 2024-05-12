from pathlib import Path

from pydantic import BaseSettings

FILE = Path(__file__).resolve()
ROOT = FILE.parent.parent


class Settings(BaseSettings):
    HOST: str
    PORT: int
    CORS_ORIGINS: list[str]
    CORS_HEADERS: list[str]
    # HOST='0.0.0.0'
    # PORT=5000
    # CORS_HEADERS=["*"]
    # CORS_ORIGINS=["*"]

    class Config:
        env_file = ROOT / '.env'


settings = Settings()
