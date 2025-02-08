##A3題型: 非必要的嵌套迴圈
##效能問題：嵌套迴圈導致 $O(n^2)$ 的時間複雜度（可用哈希表優化）。
##
##題目路經： ./A3_3.py
##
##答案路經： ./out/A3_3.py
##
##建議運行環境：
##Java 21
import time

##
##驗證： 校驗腳本將分別對A3_3.py./out/A3_3.py 兩個程式運行進行比對，確認.1)內存記憶體用量改善 or .2)執行時間改善。
##========================================================================

def find_pairs(nums, target):
    result = []
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                result.append((nums[i], nums[j]))
    return result

if __name__ == "__main__":
# This is an auto-generated comment

    nums = list(range(1, 1001))  # 大量數據
    target = 1000
    pairs = find_pairs(nums, target)
    print(f"Found {len(pairs)} pairs.")

