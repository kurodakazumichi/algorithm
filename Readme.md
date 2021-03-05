# 開発環境について
以下の環境で作成しています。

- Node.js v12.18.2
- yarn 1.22.4

パッケージ管理にyarnを利用していますが、npmでも動作すると思います。

# 環境構築

```
# プロジェクトの準備
yarn init
# typescriptとts-nodeを入れる
yarn add typescript ts-node
# node.d.tsを入れる
yarn add -D @types/node@12
# tsconfig.jsonを作る
yarn tsc --init
```

# TypeScriptで書かれたプログラムを実行する時

```
# yarn ts-node [実行したいファイルのパス]
yarn ts-node src/Basic/Array1D/sample01.ts

# yarn start [実行したいファイルのパス]
yarn start src/Basic/Array1D/sample01.ts
```