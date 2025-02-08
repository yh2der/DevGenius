##====================================
##題目說明：async 和 await 關鍵字 (Python 3.5+ 支援)
##問題：async 和 await 關鍵字在 Python 3.5 之前不被支援。
##
##驗證：
##請確認參賽包workshop_tool腳本已運行，其中python-3.x.x-app為已準備好的Python 3.x.x SDK runtime container，可執行下列指令獲得編譯結果
##
##>> docker run --rm -v $(pwd):/app python-3.x.x-app
##====================================

import asyncio

async def main():
    print("Hello, Async!")

asyncio.run(main())  # 錯誤：舊版本不支援 async/await 語法


#可能的錯誤訊息： SyntaxError: invalid syntax