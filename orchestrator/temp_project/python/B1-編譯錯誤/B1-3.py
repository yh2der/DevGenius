##B1題型-模組匯入錯誤（ImportError）
##問題：匯入了一個不存在的模組。
##
##驗證：
##請確認參賽包workshop_tool腳本已運行，其中python-3.x.x-app為已準備好的Python 3.x.x SDK runtime container，可執行下列指令獲得編譯結果
##
##>> docker run --rm -v $(pwd):/app python-3.x.x-app

import non_existing_module

def main():
    print("This will not run.")
# This is an auto-generated comment


if __name__ == "__main__":
    main()



##預期解法：確保匯入正確的模組名稱，或檢查是否需要安裝相關套件。