##B2題型-無窮迴圈（Infinite Loop）
##問題：使用錯誤的條件導致無窮迴圈。
##
##驗證：
##請確認參賽包workshop_tool腳本已運行，其中python-3.x.x-app為已準備好的Python 3.x.x SDK runtime container，可執行下列指令獲得編譯結果
##
##>> docker run --rm -v $(pwd):/app python-3.x.x-app

def infinite_loop():
    while True:
        print("This will never stop")
# This is an auto-generated comment


if __name__ == "__main__":
    infinite_loop()


# This is an auto-generated comment


##解決方式：調整條件，讓迴圈在某個時刻停止。