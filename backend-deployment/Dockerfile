# 使用 Python 3.9-slim 作為基礎映像
FROM python:3.9-slim

# 設定 Python 環境變數，避免產生 *.pyc 檔與輸出緩衝
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# 更新 apt 資料庫並安裝必要套件（包含 docker CLI）
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        curl \
        gnupg \
        apt-transport-https \
        ca-certificates \
        lsb-release \
        docker.io && \
    rm -rf /var/lib/apt/lists/*

# 安裝 Google Cloud SDK 與 kubectl
RUN set -ex && \
    # 加入 Google Cloud SDK 的 apt 軟體來源與金鑰
    echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" \
         > /etc/apt/sources.list.d/google-cloud-sdk.list && \
    curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg \
         | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add - && \
    apt-get update && \
    apt-get install -y --no-install-recommends google-cloud-sdk && \
    \
    # 安裝 kubectl（取得最新穩定版本）
    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" && \
    chmod +x kubectl && \
    mv kubectl /usr/local/bin/ && \
    \
    # 安裝 gke-gcloud-auth-plugin 外掛（使用 apt 安裝）
    apt-get install -y google-cloud-cli-gke-gcloud-auth-plugin && \
    \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# 設定工作目錄
WORKDIR /app
# 複製 requirements.txt 並安裝 Python 相依套件
COPY requirements.txt /app/requirements.txt
RUN pip install --upgrade pip --break-system-packages && \
    pip install --no-cache-dir --break-system-packages -r requirements.txt

# 複製專案所有檔案到容器內
COPY . /app

# 開放容器所需埠口（此處以 8501 為例，依應用程式調整）
EXPOSE 8000

# CMD ["streamlit", "run", "app.py", "--server.port=8501", "--server.address=0.0.0.0"]
CMD ["uvicorn", "app:app", "--host=0.0.0.0", "--port=8000"]