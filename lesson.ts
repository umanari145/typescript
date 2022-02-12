let hello: string ='hello';
console.log(hello);

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
    size: Size
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
const manager = 'nagashima shigeo';
let league: 'central' | 'pacific'; //enumにちかい　より簡便なパターンという位置付け



