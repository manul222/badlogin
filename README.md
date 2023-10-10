![1696752524473](image/README/1696748310626.png)
# badLogin

### Overview

現在、Webなどの高レイヤのセキュリティ教材は豊富に存在し、学びやすい環境が整っています。一方で、低レイヤのセキュリティ教材は一般的には少なく、特にGUI上での動作の確認が難しいため、初学者にとっては取り組みづらいという課題があります。これを解決するために、私たちは低レイヤの脆弱性を実際に試すことができるWebアプリケーションを開発しました。このアプリケーションを使用することで、Webベースのインターフェースを通じて低レイヤセキュリティの学習を進めることができます。さらに、GUIによる視覚的な学習補助を提供することで、低レイヤセキュリティの理解を深める手助けを行います。

#### 演習環境: ログインフォーム

今回用意している演習環境は単純なログインフォームであり、ログインすることができれば成功です。ですが、ユーザ作成の機能はなく、デフォルトで作成されているユーザの情報もどこにも表示されていません。ソースコードは提供されているため、実装を読めばデフォルトユーザの情報がわかります。しかし、実はユーザ情報を知らなくてもある攻撃手法を使えば、ログイン処理をバイパスしてデフォルトユーザを使わずともログインを成功させることができてしまいます。その手法を探してみてください。

#### 機能１: メモリ内容のGUI上での表示

演習画面上にはログインフォームの他に、バックエンドで実際にログイン処理が行われる関数(check_user)でのスタックの状況が表示されています。こちらはフォームへの入力状況に応じて随時更新されるようになっており、スタックの状況を簡単に確かめながらエクスプロイトを考えることができます。

#### 機能2: 解説

~~エクスプロイトに成功すると解説ページを閲覧することができます。~~

[10/10更新]

こちら誤りです。正しくはエクスプロイトの成否に関係なく、***ログイン試行後に表示されるウィンドウから解説ページを閲覧することができます。***

プレゼン資料でも"デフォルトで設定してあるユーザでログインした時、又はエクスプロイト成功時に解説を表示する"といった旨の説明がされていますが、本READMEの記載が正しいものとなっています。より初学者向けに学習リソースは開くべきという意見がチーム内から出たことによる方針転換がチーム内で共有できていませんでした。申し訳ありません。

### Execution environment(As of Oct.8.2023)

- MacBook Air(m1, メモリ 16GB)
- docker(v20.10.21)

### Setup

以下に本演習環境の起動方法を示します。使用時に参考にしてください。

1. 以下コマンドを実行し、リポジトリをクローン

```
git clone https://github.com/nokinsikasenbei-neo/bad-login.git
```

2. 以下のコマンドを実行し、バックエンドサーバ、フロントエンドサーバを起動

```
cd ./bad-login
docker compose up -d
```

3. `http://localhost:3000/`にアクセスすると、演習画面が表示。

try harder!

### LICENSE

MIT

### Member

- RyosukeAraki
- ToiOoka
- KoheiTakigami
- YuyaYamada
