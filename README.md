# typescript

## 特徴

- 静的型付けの JavaScript
- JS へのコンパイル
- 肩検査に通るように書く必要ある
- JS の上位互換(JS の機能は全て持っている)
- 型情報があるため、ts 自体が仕様書になる
- Lint チェックが自動で入る(コンパイラが自動的に構文チェックを入れてくれる)
- トランスパイラ的な機能も搭載

## playground(web 上で実行できる)

https://www.typescriptlang.org/play

### インストール

docker 起動後、コンテナに入ってインストール

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

tsconfig.json をおけば一括の置換が可能

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

## laravel-mix を使ったコンパイル

この場合、`webpack.mix.js`が設定ファイルになる。

build

```
npx mix build
```

watch

```
npx mix watch
```

## 直実行

コンパイル → 実行までを一括で行う
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

http://localhost:5173

- health
  - dist 成果物
  - src
    - Foods.ts 食べ物の抽象クラス
    - GoodFoods.ts 良い食べ物
    - BadFooeds.ts 悪い食べ物
    - Score.ts 得点計算
    - health.ts 食べ物のエントリーポイント
  - index.html HTML

### htmlUtil

http://localhost/htmlutil/

- htmlutil
  - dist 成果物
  - src
    - app.scss sass の css
    - custom.scss カスタマイズ用の scss
    - ApiRes.ts レスポンスの型
    - multi-pulldown.ts 連動プルダウン
    - PulldownRender.ts プルダウン HTML のレンダリング
    - calc-multi-detail.ts 明細の計算
    - DetailCollection.ts 明細のコレクション
    - Detail.ts 明細のモデル
    - LocationRender.ts HTML のレンダリング
    - LocationGetters.ts 都道府県、市の取得処理
    - DetailRender.ts 明細 HTML のレンダリング
    - Price.ts 金額系のオブジェクト
    - PriceRender.ts 画面表示系の処理
    - index.ts エントリーポイント
  - index.php HTML

### 健康管理アプリ(モデル)

- health-model
  - dist 成果物
  - src
    - Food.ts 食品クラス(単純なイベント登録)値は保持しない
    - Foodable.ts Food の IF
    - Foods.ts 主に計算系の責務
    - Foodsable.ts Foods の IF
    - Score.ts Score のクラス
    - Scoreable.ts Score の IF
    - index.ts 　エントリーポイント
  - index.html HTML

### consoleApp

- console-app
  - dist
  - src
    - index.ts

```
生tscコマンドで実装

コマンドラインのものは
laravel-mixでコンパイルするとなぜかエラーになる(コンパイラの質？)
(node:956) UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'write' of undefined
    at printLine (/var/www/html/console-app/dist/index.js:135:18)
    at /var/www/html/console-app/dist/index.js:140:7

```

### DOM の方について

HTMLElement<br>
getElementById などで取得できる一般的な型。addEventLinster/remove・・・などを付与できる
HTML 要素の親的な要素？
https://tech.012grp.co.jp/entry/2021/01/19/145339

```
const a = document.querySelector('a')
// => HTMLAnchorElement | null 型

const div = document.querySelector('div')
// => HTMLDivElement | null 型

// 入力値系はこちらを使うのが良さそう
const input = document.querySelector('input')
// => HTMLInputElement | null型

// selectに関して
const input = document.querySelector('select')
// => HTMLSelectElement | null型

// optionに関して
const input = document.querySelector('option')
// => HTMLOptionElement | null型

// allがあった場合
const a = document.querySelectorAll('a')
// => NodeListOf<HTMLAnchorElement>型
```

## async_await_promise

http://localhost/async_await_promise/

- src
  - asynchronous.ts 非同期処理(promise と async_await について)
  - vuemini.ts Vue の読み方
  - main.ts 読み込み
  - index.php (エントリーポイント 実際はブラウザの console で内容がみれる)
  - city.php 都道府県と区、市を返す API
  - hobbies.php 趣味を返す API

## プライベートリポジトリの読み込み

https://github.com/users/umanari145/packages/npm/package/fm-common-utils

1 .npmrc の作成(認証ファイルの作成)

```
@umanari145:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=xxxxxxxx
```

2. ライブラリのインストール

```
npm install @umanari145/fm-common-utils@バージョン名
```

3.実際のファイルの読み込み

```
async_await_promise/src/main.ts

import { add } from '@umanari145/fm-common-utils';

・・・・・・・・・・・
console.log(add(3,4));
```

## vite インストール

軽量&高速ビルドツール
(複雑な設定のモジュールバンドラーのアンチパターン?)

```
# グローバル
npm install -g vite
```

## vite テンプレート作成

```
# (.)カレントディレクトリに作る
npm create vite@latest . -- --template vanilla-ts
```

## vite 参考

https://qiita.com/miruon/items/58b9cc4dbabc3f945ede<br>
https://zenn.dev/zakimaz/articles/94f5b67fc7b585<br>
https://dtnavi.tcdigital.jp/dev_blog/devtool/vite-react-typescript-%E7%92%B0%E5%A2%83%E3%82%92-docker-%E3%81%A7%E6%A7%8B%E7%AF%89%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95/

## 今更ながら cursor の setting.json について

setting.json

```json
{
  "phpcs.standard": "PSR12",
  "phpcs.executablePath": "/Users/matsumotonorio/.composer/vendor/squizlabs/php_codesniffer/bin/phpcs",
  "php.validate.executablePath": "",
  "phpcs.showSources": true,
  "workbench.editorAssociations": {
    "*.html": "default"
  },
  "go.autocompleteUnimportedPackages": true,
  "go.gopath": "",
  "editor.unicodeHighlight.ambiguousCharacters": false,
  "eslint.enable": true,
  "eslint.nodePath": "/Users/matsumotonorio/.nodebrew/current/bin/eslint",
  "editor.tokenColorCustomizations": {},
  "editor.formatOnSave": true,
  "editor.semanticTokenColorCustomizations": {},
  "eslint.rules.customizations": [],
  "eslint.nodeEnv": "",
  "editor.largeFileOptimizations": false,
  "editor.unicodeHighlight.invisibleCharacters": false,
  "eslint.format.enable": true,
  "eslint.lintTask.enable": true,
  "eslint.options": {},
  "editor.codeActionsOnSave": {
    "source.removeUnused.ts": "explicit",
    "source.fixAll.eslint": "explicit"
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "yaml.customTags": [
    "!And",
    "!And sequence",
    "!If",
    "!If sequence",
    "!Not",
    "!Not sequence",
    "!Equals",
    "!Equals sequence",
    "!Or",
    "!Or sequence",
    "!FindInMap sequence",
    "!Base64",
    "!Base64 mapping",
    "!Cidr",
    "!Cidr sequence",
    "!Ref",
    "!Sub",
    "!GetAtt",
    "!GetAZs",
    "!ImportValue",
    "!Select",
    "!Select sequence",
    "!Split",
    "!Split sequence",
    "!Join sequence"
  ],
  "prettier.useEditorConfig": false,
  "workbench.activityBar.orientation": "vertical",
  "eslint.codeActionsOnSave.rules": null,
  "editor.fontLigatures": false
}
```

Prettier のデフォルト設定

```json
{
  "printWidth": 80, // 1行の最大文字数
  "tabWidth": 2, // インデントのスペース数
  "useTabs": false, // タブではなくスペースを使用
  "semi": true, // セミコロンを付ける
  "singleQuote": false, // ダブルクォートを使用
  "quoteProps": "as-needed", // 必要な時だけオブジェクトのキーをクォートで囲む
  "jsxSingleQuote": false, // JSXでダブルクォートを使用
  "trailingComma": "all", // 可能な限り末尾カンマを付ける（ES5ではなくall）
  "bracketSpacing": true, // オブジェクトリテラルの括弧内にスペースを入れる
  "bracketSameLine": false, // JSXの閉じ括弧を次の行に配置
  "arrowParens": "always", // アロー関数の引数を常に括弧で囲む
  "proseWrap": "preserve", // Markdownのテキストを折り返さない
  "htmlWhitespaceSensitivity": "css", // HTMLの空白の扱い
  "endOfLine": "lf", // 改行コードをLF（Unix形式）に統一
  "embeddedLanguageFormatting": "auto" // 埋め込み言語も自動フォーマット
}
```
