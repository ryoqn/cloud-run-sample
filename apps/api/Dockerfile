# 2段階ビルドを使用
# ビルドステージ
FROM golang:1.22-alpine AS builder

# 作業ディレクトリの設定
WORKDIR /app

# 必要なパッケージのインストール
RUN apk add --no-cache git

# モジュールのダウンロード
COPY go.mod ./
RUN go mod download

# ソースコードのコピー
COPY . .

# アプリケーションのビルド
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# 実行ステージ
FROM alpine:latest

# タイムゾーンの設定
RUN apk --no-cache add tzdata
ENV TZ=Asia/Tokyo

# セキュリティ対策
RUN adduser -D -H -h /app appuser
WORKDIR /app
USER appuser

# ビルドステージからバイナリをコピー
COPY --from=builder /app/main .

# ポートの公開
EXPOSE 8000

# アプリケーションの実行
CMD ["./main"]