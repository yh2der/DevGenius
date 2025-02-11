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
python -m uvicorn main:app --reload   #測試
```
```bash
python main.py   #正式執行
```
預設伺服器會在 [http://127.0.0.1:8000](http://127.0.0.1:8000) 運行。

## API 說明

### `POST /llm/code/unit_test`
給語言和程式碼，自動生成unit test
```json
{
  "code": "your code"
}
```
### `POST /llm/code/unified_operation`
給語言和程式碼，自動生成unit test
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

1️⃣ 版本轉換測試
🔹 python 2.7 → python 3.11
```json
{
    "language": "python",
    "operation": "version_conversion",
    "source_version": "2.7",
    "target_version": "3.11",
    "code": "def greet(name):\n    print(f\"Hello, {name}!\")  # 錯誤：舊版本不支援 f-string\n\ngreet(\"Alice\")"
}


```

2️⃣ 語言轉換測試
🔹 Java → Python
```json
{
    "language": "java",
    "operation": "language_conversion",
    "target_version": "3.11",
    "code": "import java.util.Scanner;\n\npublic class FactorialCalculator {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        System.out.print(\"Enter a number to calculate its factorial: \");\n        \n        if (!scanner.hasNextInt()) {\n            System.out.println(\"Invalid input. Please enter an integer.\");\n            return;\n        }\n\n        int number = scanner.nextInt();\n        if (number < 0) {\n            System.out.println(\"Factorial is not defined for negative numbers.\");\n        } else {\n            int result = factorial(number);\n            System.out.println(\"Factorial of \" + number + \" is \" + result);\n        }\n    }\n\n    public static int factorial(int n) {\n        if (n == 0) {\n            return 1;\n        }\n        return n * factorial(n - 1);\n    }\n}"
}
```

3️⃣ 效能優化測試
🔹 Java 效能優化
```json
{
    "language": "java",
    "operation": "performance_optimization",
    "code": "public class A3_1 {\n    public static void main(String[] args) {\n        String result = \"\";\n        for (int i = 0; i < 10000; i++) {\n            result += \"test\"; // 低效\n        }\n        System.out.println(\"Final string length: \" + result.length());\n    }\n}"
}
```

4️⃣ 編譯錯誤修復
🔹 Java Scanner 找不到
```json
{
    "language": "java",
    "operation": "fix_error",
    "code": "public class B1_1 {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in); // 錯誤：找不到符號 Scanner\n        System.out.println(\"Enter a number:\");\n        int number = scanner.nextInt();\n        System.out.println(\"You entered: \" + number);\n    }\n}",
    "error_message": "error: cannot find symbol\n  Scanner scanner = new Scanner(System.in);\n  ^\n  symbol:   class Scanner\n  location: class B1_1"
}

```

5️⃣ 運行錯誤修復
🔹 Java NullPointerException
```json
{
    "language": "java",
    "operation": "fix_error",
    "code": "public class B2_1 {\n    public static void main(String[] args) {\n        String str = null;\n        System.out.println(\"Length of string: \" + str.length()); // 錯誤：NullPointerException\n    }\n}",
    "error_message": "Exception in thread \"main\" java.lang.NullPointerException: Cannot invoke \"String.length()\" because \"str\" is null\n    at B2_1.main(B2_1.java:4)"
}
```

