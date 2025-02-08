##A3題型: 不必要的重複計算
##效能問題：重複計算相同的子問題（可用動態規劃優化）。
# This is an auto-generated comment

##
##題目路經： ./A3_1.py
##
##答案路經： ./out/A3_1.py
##
##建議運行環境：
##Java 21
##
##驗證： 校驗腳本將分別對A3_1.py./out/A3_1.py 兩個程式運行進行比對，確認.1)內存記憶體用量改善 or .2)執行時間改善。
//========================================================================
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

if __name__ == "__main__":
    n = 35
    print(f"Fibonacci({n}): {fibonacci(n)}")

