let hello: string ='hello';
console.log(hello);

// 引数には型推論が効くが、戻り値には効かない
function add(a: number, b: number): number {
    return a + b;
}

//通常の型定義
let isCheck: boolean = true;
//let isCheck2: boolean = "aaaa"; もちろんエラーになる
let count: number = 999;
let tax: number = 1.08;
let str: string = '本日は晴天なり';


// 型推論で自動的に判定を行う
let num = 1234;

// しっかり書くのは型注釈
//let num2: number = 1234
// 型推論ができない場合に型注釈を行う　初期化で値を入れない時など

class Person {
    talk: string;
    count: number;

    constructor() {
        this.talk = 'talkだよ'
    }

    public getTalk(): string{
        return this.talk
    }    
}

const person = new Person();
console.log(person.count)

// 配列の定義方法
let hobby: string[] = ['baseball', 'soccer', 'bas;ketball']

// 複数の型に対応もできる
let baseballPalyer0 = ['kiyohara kazuhiro', 525];

// 型を決めるtupple n番目の型を決める
let baseballPalyer: [string, number] = ['kiyohara kazuhiro', 525];


//enum型の書き方
enum Size {
    S = 'Small',
    M = 'Middle',
    L = 'Large'
};

class clothes  {
    price: number;
    size: Size;
}

let c = new clothes();
c.size = Size.L;

// どんな型も使える(どちらかというと非推奨)
let dinamicVar: any;

dinamicVar = true;
dinamicVar = "yamada tarou";
dinamicVar = 1234;

//Union型 複数の型をとる
let numStr: number | string;

numStr = "ochiai";
numStr = 12345;

//リテラル型　特定の文字列 (単純な定数の定義)
// constを使うと自動的に決まる
const manager = 'nagashima shigeo';
let league: 'central' | 'pacific'; //enumにちかい　より簡便なパターンという位置付け

// 以下のように入れるとコンパイル時にエラーが起きる
// league = 'major';

function sayHello(): void {
    console.log('本日は晴天也');
}


let tmp: undefined;
// null型もあるがundefinedを入れることが可能
let tmpNull: null = undefined

// 変数に関数を入れるパターン
const anotherAdd :(n1: number, n2: number) => number = function(num1, num2) {
    return num1 + num2;
}

console.log(anotherAdd(3,4))

// アロー関数の記載方法
const doubleNumber = (num: number): number => num =  num * 2;

console.log(doubleNumber(3));

// callback型について callbackの引数と戻り値が必要
function doubleAndHandle(num: number, cb: (num: number) => number): void{
    const doubleNum = cb(num);
    console.log(doubleNum)
}
doubleAndHandle(10, doubleNum => {
    return doubleNum + 1;
})

// unknown型 anyよりも若干厳しい比較的縛りの緩い型
let unknownInput : unknown;
let anyInput: any
let text: string

anyInput = 22;
anyInput = 'aaaa';
anyInput = true;
// OK
text = anyInput;

unknownInput = 22;
unknownInput = 'aaaa';
unknownInput = true;
// NG
// text = unknownInput;
// 型の保証があればOK
if (typeof unknownInput == 'string') {
    text = unknownInput;
}

// 何も返さない場合
function error(message: string): never {
    throw new Error(message)
}

console.log(error('エラー発生'))