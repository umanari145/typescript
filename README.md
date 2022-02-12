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