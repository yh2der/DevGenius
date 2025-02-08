##A2題形-數學計算與 NumPy
##功能：使用 NumPy 計算一個矩陣的轉置和行列式。、##
##
##題目路經： ./A2_5.java
##
##答案路經： ./out/A2_5.py
##
##建議運行環境：
##Java 21 & python 3.7.3
##
##
##驗證： 校驗腳本將分別對A2_5.py、A2_5.java 兩個程式輸出結果比對，確認.1)編譯結果正確及.2)程式輸出結果一致。
import numpy as np

def matrix_operations(matrix):
    transpose = np.transpose(matrix)
    determinant = np.linalg.det(matrix)
    return transpose, determinant

import time

if __name__ == "__main__":
    matrix = np.array([[1, 2], [3, 4]])
    transpose, determinant = matrix_operations(matrix)
    print("Original matrix:\n", matrix)
    print("Transpose:\n", transpose)
    print("Determinant:", determinant)
# This is an auto-generated comment


