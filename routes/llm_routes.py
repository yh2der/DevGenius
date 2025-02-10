from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from models.llm_models import CodeTaskRequest, CodeUnitTestRequest
import json
from services.llm_service import generate_unit_test
from services.llm_service import (
    convert_code,
    language_convert,
    optimize_code,
    fix_compile_error,
    fix_runtime_error
)

router = APIRouter()

@router.post("/code/operation")
async def perform_code_operation(request: CodeTaskRequest):
    # print(request)  # 確保 FastAPI 正確解析新的請求
    # print(json.dumps(request.dict(), indent=4))  # ✅ 確保 `target_version` 存在
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
            #判斷目標語言
            target_language = "python" if request.language == "java" else "java"

            # print("now in language_conversion")
            # print(request.language)
            # print(request.target_version)
            result = language_convert(target_language, request.target_version, request.code)
        
        elif request.operation == "performance_optimization":
            result = optimize_code(request.language, request.code)
        
        elif request.operation == "compile_error":
            if not request.error_message:
                raise HTTPException(
                    status_code=400,
                    detail="編譯錯誤修正必須提供 error_message"
                )
            result = fix_compile_error(request.language, request.code, request.error_message)
        
        elif request.operation == "runtime_error":
            if not request.error_message:
                raise HTTPException(
                    status_code=400,
                    detail="運行錯誤修正必須提供 error_message"
                )
            result = fix_runtime_error(request.language, request.code, request.error_message)
        
        else:
            raise HTTPException(status_code=400, detail="不支援的 operation 類型")
        
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

@router.post("/code/unit_test")
async def generate_unit_test_api(request: CodeUnitTestRequest):
    """
    產生 Python 或 Java 程式碼的單元測試
    """
    try:
        if request.language not in ["java", "python"]:
            raise HTTPException(status_code=400, detail="僅支援 Java 與 Python 的單元測試生成")

        result = generate_unit_test(request.language, request.code)

        return JSONResponse(
            content={"unit_test": result, "message": "單元測試生成成功"},
            media_type="application/json"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))