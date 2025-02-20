# models.py
from pydantic import BaseModel
from typing import  List


class CodeUnitTestRequest(BaseModel):
    file_name: str
    code: str  # 需要產生測試的程式碼

# 新增統一入口用的 Request 模型，只需傳入一個自然語言的 prompt
class CodeUnifiedRequest(BaseModel):
    prompt: str  # 使用者輸入的自然語言描述，內含操作、程式語言、版本資訊及程式碼

class CodeDeploymentRequest(BaseModel):
    """
    請求模型：使用者提供原始程式碼，系統自動判斷語言與版本，
    並生成適用於 GKE 部署的 Dockerfile 與 Kubernetes YAML 文件。
    """
    file_name: str
    code: str

class FileContent(BaseModel):
    file_name: str
    content: str

class MultifileRequest(BaseModel):
    """
    前端傳入的請求模型，包含任務描述和多個檔案
    """
    task: str
    files: List[FileContent]