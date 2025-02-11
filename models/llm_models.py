# models.py
from pydantic import BaseModel
from typing import Optional, Literal

class CodeTaskRequest(BaseModel):
    language: Literal["python", "java"]
    operation: Literal[
        "version_conversion",       # 版本轉換
        "language_conversion",      # 語言轉換
        "performance_optimization", # 效能優化
        "fix_error",                # 錯誤修正
    ]
    code: str  # 原始程式碼，支援多行
    source_version: Optional[str] = None  # 版本轉換時的來源版本
    target_version: Optional[str] = None  # 版本轉換或語言轉換時的目標版本
    error_message: Optional[str] = None   # 錯誤修正時需要的錯誤訊息
    
class CodeUnitTestRequest(BaseModel):
    code: str  # 需要產生測試的程式碼

# 新增統一入口用的 Request 模型，只需傳入一個自然語言的 prompt
class CodeUnifiedRequest(BaseModel):
    prompt: str  # 使用者輸入的自然語言描述，內含操作、程式語言、版本資訊及程式碼

class CodeDeploymentRequest(BaseModel):
    """
    請求模型：使用者提供原始程式碼，系統自動判斷語言與版本，
    並生成適用於 GKE 部署的 Dockerfile 與 Kubernetes YAML 文件。
    """
    code: str