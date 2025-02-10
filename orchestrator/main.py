from flask import Flask, request, jsonify
from flask_cors import CORS  # 請確保這一行存在
import os
import subprocess
import random

app = Flask(__name__)
CORS(app)  # 啟用全域 CORS

# 定義一些隨機插入的程式碼
EXTRA_LINES = [
    "# This is an auto-generated comment\n",
    "import time\n",
]

def modify_python_code(old_code):
    """ 隨機插入 1~3 行新的 Python 程式碼 """
    code_lines = old_code.split('\n')

    num_insertions = random.randint(0, 2)
    for _ in range(num_insertions):
        insert_pos = random.randint(0, len(code_lines))  # 隨機插入點
        code_lines.insert(insert_pos, random.choice(EXTRA_LINES))

    new_code = '\n'.join(code_lines)

    return new_code 


@app.route("/")
def home():
    return "Flask API is running!"

@app.route("/health")
def health():
    return "OK", 200  # ✅ healthcheck 會用到這個


# 將舊code送給後端的地方
@app.route('/process-project', methods=['POST'])
def process_project():
    data = request.json
    files = data.get('files', [])
    prompt = data.get('prompt', '')  

    updated_files = []
    for file in files:
        file_name = file.get('fileName', 'unknown_file')
        old_code = file.get('oldCode', '')

        if not old_code:
            continue

        # 🔹 依照類別選擇不同的處理方式
        modified_code = f"# Prompt: {prompt}\n{old_code}"

        advice = f"建議: {file_name} 。\n使用者輸入的 Prompt: {prompt}"

        updated_files.append({
            'fileName': file_name,
            'oldCode': old_code,
            'newCode': modified_code,
            'advice': advice
        })

    return jsonify({'files': updated_files})




@app.route('/test-project', methods=['POST'])
def test_project():
    try:
        data = request.get_json()
        files = data.get("files", [])

        project_dir = "temp_project"
        os.makedirs(project_dir, exist_ok=True)
    
        # 將所有程式碼寫入暫存目錄
        for file in files:
            file_path = os.path.join(project_dir, file["fileName"])
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(file["newCode"] or file["oldCode"])

        # 執行測試（這裡假設 Python 專案有 `pytest`）
        result = subprocess.run(["pytest", project_dir], capture_output=True, text=True, timeout=10)

        return jsonify({"output": result.stdout, "error": result.stderr})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
