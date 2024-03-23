# ref: https://qiita.com/frkawa/items/1dd12e19f10de034e0f5
# Dockerfile
FROM golang:1.19-alpine

# ログに出力する時間をJSTにするため、タイムゾーンを設定
ENV TZ /usr/share/zoneinfo/Asia/Tokyo

ENV ROOT=/go/src/app
WORKDIR ${ROOT}

# ModuleモードをON
ENV GO111MODULE=on

COPY . .
EXPOSE 4000

# Airをインストールし、コンテナ起動時に実行する
# go1.19をサポートしているのは air v1.41.0
RUN go install github.com/cosmtrek/air@v1.41.0
CMD ["air"]
