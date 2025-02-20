# FROM node:18-alpine

# # 安裝 curl
# RUN apk add --no-cache curl

# WORKDIR /app

# COPY package.json package-lock.json ./
# RUN npm install --legacy-peer-deps

# COPY . .

# RUN npm run build

# # ✅ 使用 `vite` 預覽模式
# CMD ["npm", "run", "dev"]

# ========== 第一階段：建置階段 (builder) ==========
FROM node:18-alpine AS builder

WORKDIR /app

# 先複製 package.json、lock 檔
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# 再複製其餘程式碼
COPY . .

# 執行建置 (預設 Vite build 產出 dist/ 資料夾)
RUN npm run build


# ========== 第二階段：正式環境 (Nginx) ==========
FROM nginx:alpine

# 複製第一階段編譯出來的靜態檔到 Nginx 預設目錄
COPY --from=builder /app/dist /usr/share/nginx/html

# 開放容器內部的 80 port
EXPOSE 80

# 前景模式啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]
