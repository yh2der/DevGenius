from flask import Flask, request, jsonify
from flask_cors import CORS  # 請確保這一行存在
import random

app = Flask(__name__)
CORS(app)  # 啟用全域 CORS

# 定義一些隨機插入的程式碼
EXTRA_LINES = {
    "python": [
        "# This is an auto-generated comment\n",
        "print('Processing complete!')\n",
        "import time\n",
    ],
    "javascript": [
        "// TODO: Optimize this function\n",
        "console.log('Debugging...');\n",
        "const timestamp = Date.now();\n",
    ],
    "php": [
        "// This is an auto-generated comment\n",
        "echo 'Processing complete!';\n",
        "$timestamp = time();\n",
    ],
    "default": [
        "// This is a generic auto-generated comment\n",
        "/* Auto-generated change */\n",
        "printf('New line added');\n",
    ]
}

def get_file_type(file_name):
    """ 根據檔案名稱判斷程式碼類型 """
    if file_name.endswith('.py'):
        return "python"
    elif file_name.endswith('.js') or file_name.endswith('.ts'):
        return "javascript"
    elif file_name.endswith('.php'):
        return "php"
    else:
        return "default"

@app.route('/process-code', methods=['POST'])
def process_code():
    data = request.json
    file_name = data.get('fileName', 'unknown_file')
    old_code = data.get('oldCode', '')

    if not old_code:
        return jsonify({'error': 'No code provided'}), 400

    # 根據檔案類型選擇插入的程式碼
    file_type = get_file_type(file_name)
    extra_lines = EXTRA_LINES.get(file_type, EXTRA_LINES["default"])

    # 將原始程式碼分行
    code_lines = old_code.split('\n')

    # 隨機插入 1~3 行新的程式碼
    num_insertions = random.randint(1, 3)
    for _ in range(num_insertions):
        insert_pos = random.randint(0, len(code_lines))  # 隨機插入點
        code_lines.insert(insert_pos, random.choice(extra_lines))

    # 產生新的程式碼
    new_code = '\n'.join(code_lines)

    return jsonify({'newCode': new_code})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
