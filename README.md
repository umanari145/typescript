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
  
  "strictNullChecks":true 
  // strictNullCheckがfalseの場合は例えばstring型でundefinedやnullを許容するが、trueの場合、エラーになる。厳密なチェックではtrueにした方が良い
  // string型でいちいちnullチェックをすることを防げる。string型ではstring型のみを考えられる
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

## 直実行
コンパイル→実行までを一括で行う
https://www.wakuwakubank.com/posts/726-typescript-ts-node/

```
# 例えば
docker exec -it ts_node sh 
cd /var/www/html/
npx ts-node src/lesson/compiler.ts 
```

クローラー<br>
https://qiita.com/Syoitu/items/6a136e3b8d2fb65e51a2<br>
src/Scraping

## 健康管理アプリ

http://localhost/health/


- health
  - dist 成果物
  - src 
    - Foods.ts 食べ物の抽象クラス
    - GoodFoods.ts 良い食べ物
    - BadFooeds.ts 悪い食べ物
    - Score.ts 得点計算
    - health.ts 食べ物のエントリーポイント
  - index.html HTML
### DOMの方について

HTMLElement<br>
getElementByIdなどで取得できる一般的な型。addEventLinster/remove・・・などを付与できる
HTML要素の親的な要素？
https://tech.012grp.co.jp/entry/2021/01/19/145339

```
const a = document.querySelector('a')
// => HTMLAnchorElement | null 型

const div = document.querySelector('div')
// => HTMLDivElement | null 型

// 入力値系はこちらを使うのが良さそう
const input = document.querySelector('input')
// => HTMLInputElement | null型

// allがあった場合
const a = document.querySelectorAll('a')
// => NodeListOf<HTMLAnchorElement>型
```