##A3題型: 不必要的內存使用
##效能問題：將文件的所有行讀入列表中並進行處理，即使文件很大，導致內存使用過多。
##
##題目路經： ./A3_2.py
##
##答案路經： ./out/A3_2.py
##
##建議運行環境：
##Java 21
##
##驗證： 校驗腳本將分別對A3_2.py./out/A3_2.py 兩個程式運行進行比對，確認.1)內存記憶體用量改善 or .2)執行時間改善。
##========================================================================
def process_file(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()  # 整個文件一次性讀入內存
    return [line.strip() for line in lines]

if __name__ == "__main__":
    file_path = "large_file.txt"
    processed_lines = process_file(file_path)
    print(f"Processed {len(processed_lines)} lines.")




