##====================================
##題目說明：f-string (Python 3.6+ 支援)
##問題：使用 f-string 格式化字串，但 f-string 在 Python 3.6 之前不被支援。


##====================================

def greet(name):
    print(f"Hello, {name}!")  # 錯誤：舊版本不支援 f-string

greet("Alice")


#可能的錯誤訊息： SyntaxError: invalid syntax