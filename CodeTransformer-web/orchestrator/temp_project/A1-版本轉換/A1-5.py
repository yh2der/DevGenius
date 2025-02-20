# Prompt: 123456
##====================================
##題目說明：dataclasses 模組 (Python 3.7+ 支援)
##問題：使用 dataclasses 模組定義資料類型，但該模組在 Python 3.7 之前不存在。
##
##題目路經： ./A1_5.py
##
##答案路經： ./out/A1_5.py
##====================================     

from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int

person = Person(name="Alice", age=30)
print(person)  # 錯誤：舊版本不支援 dataclasses 模組



#可能的錯誤訊息： ModuleNotFoundError: No module named 'dataclasses'
#解決方式：在低版本中安裝 dataclasses backport，或手動實現類似的類別結構。