FROM python:3.9-slim

WORKDIR /app

# 確保系統更新並安裝 curl（用於 healthcheck）
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

ENV FLASK_APP=main.py

# ✅ 讓 Flask 正確啟動
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000", "--reload"]
