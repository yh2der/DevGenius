# Code Conversion API

這是一個基於 FastAPI 的程式碼轉換 API 專案，整合了 OpenAI API 用於處理以下任務：

- **版本轉換**（例如：將 Java 8 代碼轉換成 Java 21）
- **語言轉換**（例如：從 Python 轉為 Java 或反之）
- **程式碼效能優化**
- **編譯錯誤修正**
- **運行錯誤修正**

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
uvicorn main:app --reload
```

預設伺服器會在 [http://127.0.0.1:8000](http://127.0.0.1:8000) 運行。

## API 說明

### `POST /llm/code/operation`
統一入口 API，根據請求中的 `operation` 參數執行不同功能：

| `operation` | 功能 | 必要參數 |
|-------------|------|----------|
| `version_conversion` | 版本轉換 | `source_version`, `target_version` |
| `language_conversion` | 語言轉換 | `target_version` |
| `performance_optimization` | 程式碼效能優化 | 無 |
| `compile_error` | 編譯錯誤修正 | `error_message` |
| `runtime_error` | 運行錯誤修正 | `error_message` |

請根據需求構造 JSON 請求，API 會根據操作返回相應處理結果（僅回傳純程式碼，不含額外說明）。

