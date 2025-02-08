##B2題型-記憶體不足（MemoryError）
##問題：創建一個非常大的列表，超出可用內存。
##
##驗證：
##請確認參賽包workshop_tool腳本已運行，其中python-3.x.x-app為已準備好的Python 3.x.x SDK runtime container，可執行下列指令獲得編譯結果
##
##>> docker run --rm -v $(pwd):/app python-3.x.x-app

def create_large_list():
    return [0] * (10**9)

if __name__ == "__main__":
import time

    large_list = create_large_list()
    print("List created successfully")


##解決方式：優化資料結構或限制數據大小，可以考慮使用生成器或其他方法減少內存占用。
