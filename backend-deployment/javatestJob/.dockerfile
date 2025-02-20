# 使用 OpenJDK 8 作為基底映像檔
FROM openjdk:8-jdk-alpine

# 設定工作目錄
WORKDIR /app

# 將程式碼複製到容器中
COPY HelloWorld.java /app

# 編譯 Java 程式
RUN javac HelloWorld.java

# 執行程式
CMD ["java", "HelloWorld"]
