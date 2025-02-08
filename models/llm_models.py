# models.py
from pydantic import BaseModel
from typing import Optional
from typing import Literal

class CodeTaskRequest(BaseModel):
    language: Literal["python", "java"]
    operation: Literal[
        "version_conversion",       # 版本轉換
        "language_conversion",      # 語言轉換
        "performance_optimization", # 效能優化
        "compile_error",            # 編譯錯誤修正
        "runtime_error"             # 運行錯誤修正
    ]
    code: str  # 原始程式碼，支援多行
    source_version: Optional[str] = None  # 版本轉換時的來源版本
    target_version: Optional[str] = None  # 版本轉換或語言轉換時的目標版本
    error_message: Optional[str] = None   # 錯誤修正時需要的錯誤訊息
