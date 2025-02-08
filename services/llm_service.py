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
    if response and response.choices:
        code = response.choices[0].message.content
        return re.sub(r"```(?:python|java)\n?|```", "", code).strip()
    return "No valid response from OpenAI."

def convert_code(language: str, source_version: str, target_version: str, code: str, model: str = DEFAULT_MODEL) -> str:
    """
    將指定語言的程式碼從 source_version 轉換成 target_version。
    """
    prompt = f"{HIGH_QUALITY_PROMPT}\n\n請將以下 {language} {source_version} 代碼轉換成 {target_version} 版本:\n\n{code}\n不要回傳額外的文字，只輸出程式碼。"
    system_message = f"你是一個專業的 {language} 版本轉換工具，只輸出正確格式的 {language} 程式碼。"
    
    response = client.chat.completions.create(
        model=model,  
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ]
    )
    
    return clean_code(response)

def language_convert(language: str, target_version: str, code: str, model: str = DEFAULT_MODEL) -> str:
    """
    將程式碼轉換成指定的語言與版本。
    """
    prompt = f"{HIGH_QUALITY_PROMPT}\n\n請將以下程式碼轉換成 {language} 語言（目標版本：{target_version}）：\n\n{code}\n不要回傳額外的文字，只輸出程式碼。"
    system_message = f"你是一個專業的程式語言轉換工具，請將程式碼正確轉換成 {language} {target_version} 版本。"
    
    response = client.chat.completions.create(
        model=model,  
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ]
    )
    
    return clean_code(response)

def optimize_code(language: str, code: str, model: str = DEFAULT_MODEL) -> str:
    """
    根據最佳實踐對程式碼進行效能優化。
    """
    prompt = f"{HIGH_QUALITY_PROMPT}\n\n請對以下 {language} 程式碼進行效能優化，並只輸出優化後的程式碼，不要額外解釋：\n\n{code}"
    system_message = f"你是一個專業的 {language} 程式碼效能優化工具，請依照最佳實踐優化程式碼。"
    
    response = client.chat.completions.create(
        model=model,  
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ]
    )
    
    return clean_code(response)

def fix_compile_error(language: str, code: str, error_message: str, model: str = DEFAULT_MODEL) -> str:
    """
    修正程式碼中的編譯錯誤。
    """
    prompt = f"""{HIGH_QUALITY_PROMPT}\n\n你是一個專業的 {language} 除錯專家，請根據以下資訊修正編譯錯誤：

- 語言：{language}
- 原始程式碼：
{code}
- 錯誤訊息：{error_message}

請修正錯誤並輸出正確的程式碼，不要添加額外的解釋或文字，只輸出純程式碼："""
    system_message = f"你是一個專業的 {language} 編譯錯誤修正工具，請根據錯誤訊息修正程式碼。"
    
    response = client.chat.completions.create(
        model=model,  
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ]
    )
    
    return clean_code(response)

def fix_runtime_error(language: str, code: str, error_message: str, model: str = DEFAULT_MODEL) -> str:
    """
    修正程式碼中的運行錯誤。
    """
    prompt = f"""{HIGH_QUALITY_PROMPT}\n\n你是一個專業的 {language} 除錯專家，請根據以下資訊修正運行錯誤：

- 語言：{language}
- 原始程式碼：
{code}
- 錯誤訊息：{error_message}

請修正錯誤並輸出正確的程式碼，不要添加額外的解釋或文字，只輸出純程式碼："""
    system_message = f"你是一個專業的 {language} 運行錯誤修正工具，請根據錯誤訊息修正程式碼。"
    
    response = client.chat.completions.create(
        model=model,  
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ]
    )
    
    return clean_code(response)
