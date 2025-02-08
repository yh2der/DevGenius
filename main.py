from fastapi import FastAPI
from routes import llm_routes

app = FastAPI(title="Python Code Version Converter API")

# 載入 LLM 路由
app.include_router(llm_routes.router, prefix="/llm", tags=["LLM"])

@app.get("/")
def home():
    return {"message": "Welcome to the Python Code Version Converter API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
