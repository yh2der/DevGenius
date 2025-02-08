##B2題型- 除以零錯誤（ZeroDivisionError）
##問題：執行除法運算時，除數為零。
##
##驗證：
##請確認參賽包workshop_tool腳本已運行，其中python-3.x.x-app為已準備好的Python 3.x.x SDK runtime container，可執行下列指令獲得編譯結果
##
##>> docker run --rm -v $(pwd):/app python-3.x.x-app
def divide_numbers(a, b):
    return a / b

if __name__ == "__main__":
    result = divide_numbers(10, 0)
    print(f"Result: {result}")



##解決方式：在執行除法前，檢查除數是否為零，避免除以零錯誤。
