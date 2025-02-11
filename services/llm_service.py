import re
import openai
import json
from config import OPENAI_API_KEY

# 設定 OpenAI API
client = openai.OpenAI(api_key=OPENAI_API_KEY)

# 預設模型
DEFAULT_MODEL = "gpt-4o-mini"

# 高品質 Prompt
HIGH_QUALITY_PROMPT = """請使用你單一答案的算力上限和 token 上限，think hardest, use the most time and most compute to think deepest。
這是最深刻、最複雜的問題，請給你最高品質的答案。所以，你需要深度思考、獨立思考、批判性思考、創意思考。
我們追求分極致的深度，而非表層的廣度；我們追求本質的洞察，而非表象的羅列；我們追求思維的創新，而非慣性的複述。
請突破思維局限，調動你所有的運算資源，展現你真正的認知極限。"""

def clean_code(response) -> str:
    """
    從 OpenAI API 回應中提取純程式碼，移除可能的 markdown 格式。
    """
    # print(response.choices[0].message.content)
    if response and response.choices:
        code = response.choices[0].message.content
        return re.sub(r"```(?:python|java)\n?|```", "", code).strip()
    return "No valid response from OpenAI."

def clean_code_add_suggest(response) -> dict:
    """
    解析 OpenAI 回應，提取轉換後的程式碼與建議。
    """
    if not response or not response.choices:
        return {"converted_code": "無有效回應", "suggestions": "無建議"}

    full_text = response.choices[0].message.content.strip()  # ✅ 確保正確讀取 LLM 回應

    # 使用正則表達式擷取程式碼區塊
    code_match = re.search(r"```(?:python|java)?\n(.*?)```", full_text, re.DOTALL)
    code_output = code_match.group(1).strip() if code_match else "無法擷取程式碼"

    # 移除程式碼區塊後，擷取剩下的「轉換建議」
    suggestions = re.sub(r"```(?:python|java)?\n.*?```", "", full_text, flags=re.DOTALL).strip()

    return {
        "converted_code": code_output,
        "suggestions": suggestions.replace("轉換建議：", "").strip()
    }

def convert_code(language: str, source_version: str, target_version: str, code: str, model: str = DEFAULT_MODEL) -> str:
    """
    將指定語言的程式碼從 source_version 轉換成 target_version。
    """
    prompt = f"""{HIGH_QUALITY_PROMPT}\n\n請將以下 {language} {source_version} 代碼轉換成 {target_version} 版本:\n\n{code}\n**要求：**
    - **第一部分**：請先提供**轉換後的程式碼**，只輸出程式碼內容，不要任何額外說明。
    - **第二部分**：請提供 **轉換建議**，說明此版本的主要變更點，例如語法變更、最佳實踐、效能改進等。"""
    system_message = f"你是一個專業的 {language} 版本轉換工具，只輸出正確格式的 {language} 程式碼。"
    
    response = client.chat.completions.create(
        model=model,  
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ]
    )
    # print(response)
    return clean_code_add_suggest(response) #clean_code(response)

def language_convert(language: str, target_version: str, code: str, model: str = DEFAULT_MODEL) -> str:
    """
    將程式碼轉換成指定的語言與版本。
    """
    prompt = f"""{HIGH_QUALITY_PROMPT}\n\n請將以下程式碼轉換成 {language} 語言（目標版本：{target_version}）：\n\n{code}\n**要求：**
    - **第一部分**：請先提供**轉換後的程式碼**，只輸出程式碼內容，不要任何額外說明。
    - **第二部分**：請提供 **轉換建議**，說明此版本的主要變更點，例如語法變更、最佳實踐、效能改進等。"""
    system_message = f"你是一個專業的程式語言轉換工具，請將程式碼正確轉換成 {language} {target_version} 版本。"
    
    response = client.chat.completions.create(
        model=model,  
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ]
    )
    
    return clean_code_add_suggest(response)

def optimize_code(language: str, code: str, model: str = DEFAULT_MODEL) -> str:
    """
    根據最佳實踐對程式碼進行效能優化。
    """
    prompt = f"""{HIGH_QUALITY_PROMPT}\n\n請對以下 {language} 程式碼進行效能優化，\n\n{code}**要求：**
    - **第一部分**：請先提供**效能優化後的程式碼**，只輸出程式碼內容，不要任何額外說明。
    - **第二部分**：請提供 **轉換建議**，說明此版本的主要變更點，例如語法變更、最佳實踐、效能改進等。"""
    system_message = f"你是一個專業的 {language} 程式碼效能優化工具，請依照最佳實踐優化程式碼。"
    
    response = client.chat.completions.create(
        model=model,  
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ]
    )
    
    return clean_code_add_suggest(response)

# 自然語言解析器：解析使用者輸入的 prompt，轉換成結構化 JSON
def parse_user_prompt(user_prompt: str, model: str = DEFAULT_MODEL) -> dict:
    """
    解析用戶輸入的自然語言，生成包含以下欄位的 JSON：
      - operation: "convert_code"、"language_convert" 或 "optimize_code"
      - language: 程式語言，例如 "Python", "Java" 等
      - source_version: 原始版本（如適用，否則為空字串）
      - target_version: 目標版本（如適用，否則為空字串）
      - code: 原始程式碼內容
    """
    parsing_prompt = f"""請根據以下用戶輸入的指令，提取並生成一個 JSON 格式的結構化描述，其中必須包含以下欄位：
- operation: 可選值包括 "convert_code"、"language_convert"、"optimize_code"。
- language: 請指定程式語言，例如 "Python"、"Java" 等。
- source_version: 如果適用，請指定原始版本，例如 "Python2"；若不適用請填空字串 ""。
- target_version: 如果適用，請指定目標版本，例如 "Python3"；若不適用請填空字串 ""。
- code: 請將原始程式碼內容提取出來。

用戶輸入如下：
{user_prompt}

請只輸出符合 JSON 格式的結果，不需要任何額外說明。"""
    
    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": parsing_prompt}]
    )
    print(response)
    print("opeen ai 回應"+response.choices[0].message.content.strip())
    try:
        json_text = response.choices[0].message.content.strip()
        structured_data = json.loads(json_text)
        return structured_data
    except Exception as e:
        print("解析用戶指令失敗:", e)
        return {}


def unified_service(user_prompt: str, model: str = DEFAULT_MODEL) -> dict:
    """
    統一入口：
      - 用戶直接輸入包含程式碼及需求的 prompt（例如「請將以下 Python 2 程式碼轉成 Python 3：...」，
        或「請修正以下 Java 程式碼的錯誤：...」）。
      - 結合高品質提示與用戶內容，要求 LLM 輸出兩部分內容：處理後的程式碼（僅程式碼）與相應的建議。
      - 直接返回結果（無需先將用戶輸入轉成 JSON）。
    """
    # 將高品質提示與用戶輸入組合成最終 prompt，可根據需求補充要求
    prompt = f"""{HIGH_QUALITY_PROMPT}

    {user_prompt}

    **要求：**
    - 第一部分：請先提供處理後的程式碼，僅輸出程式碼內容（不要任何額外說明）。
    - 第二部分：請提供相關建議，說明主要的改進點或變更重點。
    """
    system_message = "你是一個專業的程式碼處理工具，請根據用戶的指令對程式碼進行轉換、修正或優化，並僅提供正確格式的程式碼以及相應的建議。"
    
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ]
    )
    
    return clean_code_add_suggest(response)        
def fix_error(language: str, code: str, error_message: str, model: str = DEFAULT_MODEL) -> str:
    # print("error_message", error_message)
    """
    修正程式碼中的編譯錯誤。
    """
    prompt = f"""{HIGH_QUALITY_PROMPT}\n\n你是一個專業的 {language} 除錯專家，請根據以下資訊修正編譯錯誤：

    - 語言：{language}
    - 原始程式碼：
    {code}
    - 錯誤訊息：{error_message}

    **要求：**
    - **第一部分**：請先提供**修正後的程式碼**，只輸出程式碼內容，不要任何額外說明。
    - **第二部分**：請提供 **修正後的建議**，說明此版本的主要變更點，例如語法變更、最佳實踐、效能改進等。"""
    system_message = f"你是一個專業的 {language} 編譯錯誤修正工具，請根據錯誤訊息修正程式碼。"
    
    response = client.chat.completions.create(
        model=model,  
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ]
    )
    # print(response)
    return clean_code_add_suggest(response)




def generate_unit_test(code: str, model: str = DEFAULT_MODEL) -> str:
    """
    根據程式碼自動產生對應的單元測試
    """
    prompt = f"""{HIGH_QUALITY_PROMPT}請為以下程式碼生成完整的單元測試：
    
    ```
    {code}
    ```

    ✅ 要求：
    - 測試程式碼 **必須包含原始類別**，確保可以直接執行
    - 使用標準 測試框架（Python 使用 `unittest`，Java 使用 `JUnit`）
    - 覆蓋各種可能的測試情境
    - 只輸出測試程式碼，不要其他解釋
    """
    system_message = f"你是一個專業的單元測試專家，請產生完整可執行的測試代碼。"

    response = client.chat.completions.create(
        model=model,  
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ]
    )
    
    return clean_code(response)

def generate_deployment_files(code: str, model: str = DEFAULT_MODEL) -> dict:
    """
    根據給定的程式碼自動判斷使用的程式語言與版本，並生成部署所需的 Dockerfile 與 Kubernetes YAML 配置文件，
    # 以便在 GKE 上部署該應。，且部署後我們只需透過日誌讀取執行結果，
    因此不特別指定對外端口。
    
    回傳一個 dict，包含 "dockerfile" 與 "yaml" 兩個鍵，分別為生成的 Dockerfile 與 Kubernetes YAML 內容。
    """
    prompt = f"""{HIGH_QUALITY_PROMPT}

請根據以下程式碼自動判斷所使用的程式語言與版本，並生成一份完整的 Dockerfile 與 Kubernetes YAML 配置文件，用於在 GKE 上部署該應用。要求如下：
- **第一部分**：生成的 Dockerfile 必須能構建並運行該應用。請根據程式碼內容選擇合適的基礎映像、拷貝程式碼、以及設定正確的啟動指令。
- **第二部分**：生成的 Kubernetes YAML 文件應包含 Deployment（以及 Service，如有需要），但不需要特別指定對外端口（部署後我們將從日誌中讀取應用執行結果）。請確保生成的 YAML 文件可直接用於 GKE 部署。

請僅輸出純文本格式的 Dockerfile 與 YAML 配置文件，並使用 Markdown code block 分別標示（第一個為 Dockerfile，第二個為 YAML）。
以下是程式碼：
{code}
"""

    system_message = ("你是一個專業的部署工具，請根據用戶提供的程式碼自動判斷語言與版本，並生成適合於 GKE 部署的 Dockerfile "
                      "以及 Kubernetes YAML 配置文件，除此之外不要回傳任何資訊。")
    
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ]
    )
    
    full_text = response.choices[0].message.content.strip()

    # 使用正則表達式擷取第一個 code block（假定為 Dockerfile）
    pattern = r"```[^\r\n]*\r?\n(.*?)```"
    code_blocks = re.findall(pattern, full_text, flags=re.DOTALL)
    print(full_text)
    print(code_blocks)
    if len(code_blocks) >= 2:
        dockerfile_code = code_blocks[0].strip()
        yaml_code = code_blocks[1].strip()
    else:
        dockerfile_code = code_blocks[0].strip() if code_blocks else "無法擷取 Dockerfile"
        yaml_code = "無法擷取 YAML"
        
    return {
        "dockerfile": dockerfile_code,
        "yaml": yaml_code
    }