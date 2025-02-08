##B2題型- 遞歸過深（RecursionError）
##問題：遞歸沒有基礎情況，導致達到最大遞歸深度，觸發 RecursionError。
##
##題目路經： ./B2_5.py
##
##答案路經： ./out/B2_5.py
##
##建議運行環境：
##Java 21
##
##驗證： 校驗腳本將用python跑B2_5.py,確認.1)編譯結果正確及.2)程式輸出結果一致。
import time

##========================================================================
def create_large_list():
    return [0] * (10**9)

if __name__ == "__main__":
    large_list = create_large_list()
    print("List created successfully")


##解決方式：為遞歸函數添加基礎情況來終止遞歸。