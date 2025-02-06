FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 80
CMD ["sh", "-c", "npm run preview -- --host 0.0.0.0"]
