# ref: https://zenn.dev/peishim/articles/de0dd58ba89ca8
FROM node:20-alpine

WORKDIR /app/

COPY ./package.json ./
COPY src ./src

# buid時に実行
RUN yarn install

# コンテナ起動時に実行
CMD ["yarn", "dev"]