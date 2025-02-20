import os
from dotenv import load_dotenv

# 載入 .env 設定
load_dotenv()

# 取得 OpenAI API Key
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


if not OPENAI_API_KEY:
    raise ValueError("❌ OpenAI API Key is missing! Please set it in the .env file.")
