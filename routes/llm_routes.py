from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from models.llm_models import CodeTaskRequest, CodeUnitTestRequest, CodeUnifiedRequest, CodeDeploymentRequest, MultifileRequest
import json
from services.llm_service import generate_unit_test,unified_service, generate_deployment_files, process_multifiles
from services.llm_service import (
    convert_code,
    language_convert,
    optimize_code,
    fix_error,
)

router = APIRouter()

@router.post("/code/operation")
async def perform_code_operation(request: CodeTaskRequest):
    try:
        result = None

        if request.operation == "version_conversion":
            if not request.source_version or not request.target_version:
                raise HTTPException(
                    status_code=400,
                    detail="版本轉換必須提供 source_version 與 target_version"
                )
            result = convert_code(request.language, request.source_version, request.target_version, request.code)

        elif request.operation == "language_conversion":
            if not request.target_version:
                raise HTTPException(
                    status_code=400,
                    detail="語言轉換必須提供 target_version（目標語言版本）"
                )
            # 確保轉換目標語言正確
            target_language = "python" if request.language == "java" else "java"
            result = language_convert(target_language, request.target_version, request.code)

        elif request.operation == "performance_optimization":
            result = optimize_code(request.language, request.code)

        elif request.operation == "fix_error":
            if not request.error_message:
                raise HTTPException(
                    status_code=400,
                    detail="錯誤修正必須提供 error_message"
                )
            result = fix_error(request.language, request.code, request.error_message)

        else:
            raise HTTPException(status_code=400, detail="不支援的 operation 類型")

        # ✅ 確保 `result` 是 `dict`，包含 `converted_code` 和 `suggestions`
        if not isinstance(result, dict):
            result = {"converted_code": result, "suggestions": "無建議"}

        # **🔹 加入 Cache-Control 標頭，確保不使用快取**
        response = JSONResponse(
            content={"result": result, "message": "操作完成成功"},
            media_type="application/json"
        )
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "0"
        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/code/unified_operation")
async def perform_unified_code_operation(request: CodeUnifiedRequest):
    try:
        # 使用 unified_service 處理使用者自然語言指令，統一路由至對應的內部服務
        result = unified_service(request.prompt)
        
        # 確保結果為 dict 格式（包含 converted_code 與 suggestions）
        if not isinstance(result, dict):
            result = {"converted_code": result, "suggestions": "無建議"}
        
        response = JSONResponse(
            content={"result": result, "message": "操作完成成功"},
            media_type="application/json"
        )
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "0"
        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/code/unit_test")
async def generate_unit_test_api(request: CodeUnitTestRequest):
    """
    產生 Python 或 Java 程式碼的單元測試
    """
    try:
        result = generate_unit_test(request.code)

        return JSONResponse(
            content={"unit_test": result, "message": "單元測試生成成功"},
            media_type="application/json"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/code/deployment_files")
async def generate_deployment_files_api(request: CodeDeploymentRequest):
    """
    根據使用者提供的程式碼生成部署文件：
      - Dockerfile：構建並運行應用的 Docker 配置
      - Kubernetes YAML：適用於 GKE 部署的配置文件

    根據程式碼自動判斷所使用的語言與版本，
    部署後僅透過日誌讀取執行結果，不特別指定對外端口。
    """
    try:
        result = generate_deployment_files(request.code)
        return JSONResponse(
            content={
                "dockerfile": result.get("dockerfile", ""),
                "yaml": result.get("yaml", ""),
                "message": "部署文件生成成功"
            },
            media_type="application/json"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/code/process_multi_files")
async def process_files_endpoint(request: MultifileRequest):
    """
    接收前端傳入的包含任務與檔案的 JSON 請求，調用 GPT 處理後返回結果。
    """
    try:
        # 將每個檔案轉換成字典格式，以便於服務層處理
        files_list = [file.model_dump() for file in request.files]
        result = process_multifiles(request.task, files_list)
        return JSONResponse(content=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))