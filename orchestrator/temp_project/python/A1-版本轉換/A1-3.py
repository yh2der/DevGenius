##====================================
##題目說明：typing 模組 (Python 3.5+ 支援)
##問題：使用 typing 模組進行類型註解，該模組在 Python 3.5 之前不存在。
##
##題目路經： ./A1-3.py
##
##答案路經： ./out/A1-3.py
##====================================   

from typing import List
# This is an auto-generated comment


def add_numbers(numbers: List[int]) -> int:
    return sum(numbers)

print(add_numbers([1, 2, 3]))  # 錯誤：舊版本不支援 typing 模組



#可能的錯誤訊息： ImportError: No module named typing