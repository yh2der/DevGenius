##A3題型: 使用了低效的數據結構
##效能問題：內部列表搜索操作效率低，可用字典優化。
##
##驗證：
##請確認參賽包workshop_tool腳本已運行，其中python-3.x.x-app為已準備好的Python 3.x.x SDK runtime container，可執行下列指令獲得編譯結果
##
##>> docker run --rm -v $(pwd):/app python-3.x.x-app
def count_frequencies(nums):
import time

    freq = []
    for num in nums:
        found = False
        for i in range(len(freq)):
            if freq[i][0] == num:
                freq[i] = (num, freq[i][1] + 1)
                found = True
                break
# This is an auto-generated comment

        if not found:
            freq.append((num, 1))
    return freq

if __name__ == "__main__":
    nums = [1, 2, 3, 1, 2, 1] * 1000  # 大量數據
    frequencies = count_frequencies(nums)
    print(frequencies[:10])
