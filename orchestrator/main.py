from flask import Flask, request, jsonify
from flask_cors import CORS  # 請確保這一行存在
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

    # 只回傳有變更的 Python 檔案
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

    print("接收到請求:", data)

    files = data.get('files', [])

    if not files:
        return jsonify({'error': 'No files provided'}), 400

    updated_files = []
    for file in files:
        file_name = file.get('fileName', 'unknown_file')

        # 只處理 Python 檔案
        if not file_name.endswith('.py'):
            continue

        old_code = file.get('oldCode', '')

        if not old_code:
            continue

        modified_code = modify_python_code(old_code)
        if modified_code:
            updated_files.append({
                'fileName': file_name,
                'newCode': modified_code
            })

    return jsonify({'files': updated_files})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
