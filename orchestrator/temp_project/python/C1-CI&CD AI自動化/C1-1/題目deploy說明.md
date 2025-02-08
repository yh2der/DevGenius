# 使用 Google Cloud Run 部署 Java 應用

以下將引導您如何使用 Google Cloud Run 部署一個簡單的 Java 應用。

### 前置準備

在開始之前，請確保您已完成以下事項：

1. 安裝 Google Cloud CLI 並完成身份驗證。

2. 創建一個 Google Cloud 項目並啟用 Cloud Run API。

3. 安裝 Docker（用於構建容器映像）。

4. 安裝 JDK 11 或以上版本。

步驟 1：創建 Java 應用

## 步驟：部署到 Google Cloud Run

1. 推送映像到 Google Container Registry

執行以下命令將映像推送到 Google Container Registry：

```gcloud auth configure-docker

docker push gcr.io/[YOUR_PROJECT_ID]/cloudrun-python
```

2. 部署到 Cloud Run

執行以下命令將映像部署到 Cloud Run：

```gcloud run deploy cloudrun-python \
  --image gcr.io/[YOUR_PROJECT_ID]/cloudrun-python \
  --platform managed \
  --region [REGION] \
  --allow-unauthenticated
  ```

將 [REGION] 替換為您的部署區域（如 us-central1）。

3. 測試部署

部署完成後，終端會顯示應用的 URL。訪問該 URL，即可看到 "Hello, Cloud Run!"。