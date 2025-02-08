##B1題型-函數呼叫參數錯誤（TypeError）
##問題：將字符串 "4" 傳遞給函數，導致計算錯誤
##
##驗證：
##請確認參賽包workshop_tool腳本已運行，其中python-3.x.x-app為已準備好的Python 3.x.x SDK runtime container，可執行下列指令獲得編譯結果
##
##>> docker run --rm -v $(pwd):/app python-3.x.x-app


def calculate_square(number):
    return number ** 2

if __name__ == "__main__":
    print(calculate_square("4"))


##預期解法：將輸入參數轉換為整數，例如 int("4")，或檢查輸入類型。