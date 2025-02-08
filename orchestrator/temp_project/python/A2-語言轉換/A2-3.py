##A2題形-字典操作與文件處理
##功能：讀取一個文本文件，計算每個單詞出現的次數，並以字典形式返回。
##
##驗證：
##請確認參賽包workshop_tool腳本已運行，其中python-3.x.x-app為已準備好的Python 3.x.x SDK runtime container，可執行下列指令獲得編譯結果
##
##>> docker run --rm -v $(pwd):/app python-3.x.x-app

def word_count(file_path):
    word_freq = {}
    with open(file_path, 'r') as file:
        for line in file:
            words = line.split()
            for word in words:
                word_freq[word] = word_freq.get(word, 0) + 1
    return word_freq

if __name__ == "__main__":
    file_path = "example.txt"
    word_frequencies = word_count(file_path)
    print("Word frequencies:", word_frequencies)
