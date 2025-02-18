# Code Conversion API

這是一個基於 FastAPI 的程式碼轉換 API 專案，整合了 OpenAI API 用於處理以下任務：

- **程式碼修正**（根據prompt修正程式碼，並回傳建議）
- **單元測試產生**
- **部署文件產生**(dockerfile，yaml)

每個功能的 prompt 前均會附上如下指示：
> 請使用你單一答案的算力上限和 token 上限，think hardest, use the most time and most compute to think deepest。  
> 這是最深刻、最複雜的問題，請給你最高品質的答案。所以，你需要深度思考、獨立思考、批判性思考、創意思考。  
> 我們追求分極致的深度，而非表層的廣度；我們追求本質的洞察，而非表象的羅列；我們追求思維的創新，而非慣性的複述。請突破思維局限，調動你所有的運算資源，展現你真正的認知極限。

## 專案架構
```
.
├── main.py              # 專案入口
├── config.py            # 設定檔，請在此檔案中設定 OPENAI_API_KEY
├── models
│   └── llm_models.py    # 定義 Pydantic 請求模型 (例如 CodeTaskRequest)
├── routes
│   └── llm_routes.py    # 定義 API 路由，根據 operation 分派到不同服務函式
├── services
│   └── llm_service.py   # 與 OpenAI API 整合的服務函式，提供版本轉換、語言轉換等功能
├── requirements.txt     # Python 依賴列表
└── README.md           # 專案說明檔案（本檔案）
```

## 安裝與執行

### 1. 建立虛擬環境

**建議使用 Python 3.8 以上版本**

在專案根目錄下執行：
```bash
python -m venv venv
```

啟動虛擬環境：

Linux/Mac:
```bash
source venv/bin/activate
```

Windows:
```bash
venv\Scripts\activate
```

### 2. 安裝依賴
```bash
pip install -r requirements.txt
```

### 3. 設定環境變數或修改 `config.py`

在 `config.py` 中設定你的 OpenAI API 金鑰，例如：
```python
OPENAI_API_KEY = "your_openai_api_key_here"
```
或設定對應的環境變數。

### 4. 啟動 FastAPI 伺服器

使用 uvicorn 啟動：
```bash
python -m uvicorn main:app --reload   #測試
```
```bash
python main.py   #正式執行
```
預設伺服器會在 [http://127.0.0.1:8000](http://127.0.0.1:8000) 運行。

可於http://127.0.0.1:8000/docs進行測試操作
## API 說明

### `POST /llm/code/unit_test`
給語言和程式碼，自動生成unit test
```json
{
  "code": "your code"
}
```
### `POST /llm/code/unified_operation`
給語言和程式碼，自動生成修正過後的程式碼和建議
```json
{
  "prompt": "your code and prompt"
}
```
### `POST /llm/code/deployment_files`
給程式碼，自動生成dockerfile和yaml
```json
{
  "code": "prompt"
}
```
### `POST /llm/code/unit_test`
給語言和**多關聯檔案程式碼**，自動生成程式碼
```json
{
  "task": "your task",
           "files": [
             {
               "file_name": "file_name1",
               "content": "file content"
             },
             {
               "file_name": "file_name2",
               "content": "file content"
             }
           ]
}
```
