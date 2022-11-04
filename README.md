# typescript

## 特徴
- 静的型付けのJavaScript
- JSへのコンパイル
- 肩検査に通るように書く必要ある
- JSの上位互換(JSの機能は全て持っている)
- 型情報があるため、ts自体が仕様書になる
- Lintチェックが自動で入る(コンパイラが自動的に構文チェックを入れてくれる)
- トランスパイラ的な機能も搭載

## playground(web上で実行できる)
https://www.typescriptlang.org/play

### インストール
docker起動後、コンテナに入ってインストール
```
docker-compose exec -it typescript_node_1 
cd /var/www/html
npm install -D typescript
```

### コンパイラ(トランスパイル)実行
```
./node_modules/typescript/bin/tsc lesson.ts (--target ES2015)
# index.jsが作成される
```

### コンパイラの設定など
監視
```
 ./node_modules/typescript/bin/tsc lesson.ts --target ES2015 --watch
```

tsconfig.jsonをおけば一括の置換が可能
```
# 以下のコマンドで作成可能
./node_modules/typescript/bin/tsc --init
＃以下で通常通りのコマンド実行が可能
./node_modules/typescript/bin/tsc 
```
重要な設定値を確認
```
  // トランスパイル
  "target": "es2015",   

  // ホワイトリスト
  "include": [
    "****"
  ],
  // ブラックリスト
  "exclude": [

  // コンパイラ(ES2015用など設定できる)
  // 通常はtargetによって自動的に決まる。[](空)にすると当たり前だが一切コンパイルできなくなる
  lib: [
      'ES6'
  ]
  // allowJS,checkJS JSのチェックをするか否か
  // jsx React用
  // declaration、declarationMap 他人に渡したい時
  // sourceMap ブラウザでtsのデバッグを行いたいとき
  // rootDir 読み込み先
  // outDir output先
  // noEmit エラーが出た場合出力しない
  // strict直下は細かい制約系のオプション
  // noUnusedLocals 未使用ローカル変数をチェック
  // noUnusedParameters 未使用のパラメータ
  // noImplicitReturns 関数戻り値の型注釈を必須
  // json使用時のオプション
  "moduleResolution": "node", 
  "resolveJsonModule": true,  
```


## laravel-mixを使ったコンパイル

build
```
npx mix build
```

watch
```
npx mix watch
```