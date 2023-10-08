# ベースとなるイメージを指定
FROM node:14

# アプリケーションのディレクトリを作成
WORKDIR /usr/src/app

# create-react-app グローバルにインストール
RUN npm install -g create-react-app

# React アプリケーションのセットアップ
RUN create-react-app login-front

# アプリケーションのディレクトリに移動
WORKDIR /usr/src/app/login-front

RUN npm install -y @mui/material @emotion/react @emotion/styled

# src以下をコピー
COPY front/src ./src

# ポート3000を開放
EXPOSE 3000

# アプリケーションを起動
CMD ["npm", "start"]
