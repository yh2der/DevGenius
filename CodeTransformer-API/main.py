from fastapi import FastAPI
from routes import llm_routes
from fastapi.middleware.cors import CORSMiddleware
import logging
app = FastAPI(title="Python Code Version Converter API")

# 載入 LLM 路由
app.include_router(llm_routes.router, prefix="/llm", tags=["LLM"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 或者指定允許的來源，例如 ["https://example.com"]
    allow_credentials=True,
    allow_methods=["*"],  # 允許所有方法
    allow_headers=["*"],  # 允許所有標頭
)

# logging.basicConfig(
#     level=logging.DEBUG,
#     format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
# )
# logger = logging.getLogger(__name__)


@app.get("/")
def home():
    return {"message": "Welcome to the Python Code Version Converter API"}

if __name__ == "__main__":
    import uvicorn
    # uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
    uvicorn.run(app, host="0.0.0.0", port=12345) # For test
