## コンセプト

コードを書かずに、設定ファイル(json)だけでmock-serverを作れるライブラリ
mockがメインにとらえているのは、クライアント側のアニメーションの確認用

## 仕様

* 設定ファイル(json)に、レスポンス形式とエンドポイントを書く
* npxで実行可能
* npx fast-mock init で、初期設定をする
    + tools/fast-mock/sample.json が作られる
* npx fast-mock check で、tools/easy-mock-api/*.json のフォーマットをチェック
* npx fast-mock start で、tools/easy-mock-api/*.jsonを使ってmockの立ち上げ
* npx fast-mock help で、使い方がわかる