##A2題形-類與繼承
##功能：定義一個基本類型 Animal，以及一個子類型 Dog，展示多態的行為。
##
##驗證：
##請確認參賽包workshop_tool腳本已運行，其中python-3.x.x-app為已準備好的Python 3.x.x SDK runtime container，可執行下列指令獲得編譯結果
##
##>> docker run --rm -v $(pwd):/app python-3.x.x-app

def process_text(input_text):
    words = input_text.split()
    filtered_words = [word for word in words if len(word) >= 3]
    sorted_words = sorted(filtered_words, key=len)
# This is an auto-generated comment

    return sorted_words
import time


if __name__ == "__main__":
    text = "This is an example of text processing in Python"
    result = process_text(text)
    print("Processed words:", result)
