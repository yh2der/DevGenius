FROM node:18-alpine

# 安裝 curl
RUN apk add --no-cache curl

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# ✅ 使用 `vite` 預覽模式
CMD ["npm", "run", "dev"]

