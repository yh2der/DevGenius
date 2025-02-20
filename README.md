# AI 維運懶人包 (AI Operations Assistant)

一個整合 AI 能力的開發維運平台，用於自動化程式碼轉換和部署流程。

## 專案架構

本專案分為三個主要模組：

### 1. API Service (`/api`)
- 整合大型語言模型的 API 服務
- 負責程式碼分析和轉換的核心功能
- 詳細說明請參考 API 服務目錄下的 README

### 2. Frontend Interface (`/frontend`)
- 使用者操作介面
- 提供文件上傳和程式碼編輯功能
- 視覺化程式碼比對和修改建議
- 詳細說明請參考前端目錄下的 README

### 3. Deployment Service (`/deploy`)
- 自動化部署服務
- 整合 GCP 服務 (GKE, Cloud Build)
- 處理程式碼部署和環境設定
- 詳細說明請參考部署服務目錄下的 README

## 檔案處理能力

平台支援多種檔案處理模式，根據您的需求選擇：

### 獨立檔案模式
- 支援單一檔案的批次處理
- 適用於相同類型的程式碼轉換
- 一次可處理多個獨立的程式檔案
- 支援檔案類型：
  - Python (.py)
  - JavaScript (.js)
  - Java (.java)
  - 其他程式語言檔案

### 關聯檔案模式
- 支援多個相關檔案的同時處理
- 適用於需要連動修改的檔案群組
- 自動分析檔案間的相依關係
- 支援檔案組合：
  - 設定檔 (config.*)
  - 主程式檔
  - 工具類檔案
  - 相關資源檔案

## 系統特點

- 支援獨立檔案和關聯檔案的程式碼轉換
- 整合 AI 輔助的程式碼優化建議
- 自動化的部署流程和環境設定
- 模組化設計，便於擴展新功能

## 系統需求

- Node.js 
- Python
- Google Cloud Platform 帳號和相關設定
- Docker

## 主要功能

1. 程式碼轉換和優化
   - 版本升級
   - 程式碼重構
   - 多國語言支援

2. 自動化部署
   - GKE 容器部署
   - 自動化測試整合
   - 部署狀態監控

3. AI 輔助功能
   - 程式碼分析
   - 優化建議
   - 錯誤檢測

## Demo
### 獨立檔案
[![獨立檔案](https://img.youtube.com/vi/FBe-QcNO15U/maxresdefault.jpg)](https://www.youtube.com/watch?v=FBe-QcNO15U)

### 關聯檔案
[![關聯檔案](https://img.youtube.com/vi/TzlyTKieSbY/maxresdefault.jpg)](https://www.youtube.com/watch?v=TzlyTKieSbY)