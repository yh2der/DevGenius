import re
import openai
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




def generate_unit_test(language: str, code: str, model: str = DEFAULT_MODEL) -> str:
    """
    根據程式碼自動產生對應的單元測試
    """
    prompt = f"""{HIGH_QUALITY_PROMPT}請為以下 {language} 程式碼生成完整的單元測試：
    
    ```{language}
    {code}
    ```

    ✅ 要求：
    - 測試程式碼 **必須包含原始類別**，確保可以直接執行
    - 使用標準 {language} 測試框架（Python 使用 `unittest`，Java 使用 `JUnit`）
    - 覆蓋各種可能的測試情境
    - 只輸出測試程式碼，不要其他解釋
    """
    system_message = f"你是一個專業的 {language} 單元測試專家，請產生完整可執行的測試代碼。"

    response = client.chat.completions.create(
        model=model,  
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ]
    )
    
    return clean_code(response)