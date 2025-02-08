from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from models.llm_models import CodeTaskRequest
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
    try:
        result = None
        if request.operation == "version_conversion":
            if not request.source_version or not request.target_version:
                raise HTTPException(
                    status_code=400,
                    detail="版本轉換必須提供 source_version 與 target_version"
                )
            # 呼叫同步函式，不用 await
            result = convert_code(request.language, request.source_version, request.target_version, request.code)
        
        elif request.operation == "language_conversion":
            if not request.target_version:
                raise HTTPException(
                    status_code=400,
                    detail="語言轉換必須提供 target_version（目標語言版本）"
                )
            result = language_convert(request.language, request.target_version, request.code)
        
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
        
        return JSONResponse(
            content={"result": result, "message": "操作完成成功"},
            media_type="application/json"
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
