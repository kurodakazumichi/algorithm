# 環境構築

yarnを使っているけどnpmでもいけると思うよ。

```
# プロジェクトの準備
yarn init
# typescriptとts-nodeを入れる
yarn add typescript ts-node
# tsconfig.jsonを作る
yarn tsc --init
```

# TypeScriptで書かれたプログラムを実行する時

```
# yarn ts-node [実行したいファイルのパス]
yarn ts-node ./main.ts
```