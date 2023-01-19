// 型パラメータについては以下の記事を
// https://skill-up-engineering.com/2015/08/01/post-600/

// 型を引数として受け取れる
function copy<T>(value: T):T {

    return value;
}

// このようになった場合上記の関数のT=stringとなる
console.log(copy<string>('hello'))

// 一般的には特定の型をbaseにすることが一般的
function copy2<T extends{name: string}>(value: T): T {
    //value.name
    return value;
}