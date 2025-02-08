##A2題形-生成器與迭代器
##功能：實現一個生成器函數，用於生成指定範圍內的所有奇數。
##
##驗證：
##請確認參賽包workshop_tool腳本已運行，其中python-3.x.x-app為已準備好的Python 3.x.x SDK runtime container，可執行下列指令獲得編譯結果
##
##>> docker run --rm -v $(pwd):/app python-3.x.x-app

def odd_numbers(start, end):
    for num in range(start, end + 1):
        if num % 2 != 0:
            yield num

if __name__ == "__main__":
    start, end = 1, 10
    print("Odd numbers from {} to {}:".format(start, end))
    for odd in odd_numbers(start, end):
        print(odd)

