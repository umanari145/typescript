let hello: string ='hello';
console.log(hello);

// 引数には型推論が効くが、戻り値には効かない
function add(a: number, b: number): number {
    return a + b;
}

// 変数代入
let add2 = function(a: number, b:number): number {
    return a + b;
}

console.log(add2(1,3))

let add3 = (a: number, b:number): number => {
    return a + b;
};

console.log(add3(1,3));

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

// タイプエイリアス
type ClothSize = 'short' | 'tall'
//enum型の書き方
enum Size {
    S = 'Small',
    M = 'Middle',
    L = 'Large'
};

let clothSize: ClothSize;
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
    let hogehoge;
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

// 配列の定義は以下のようにできる
let data:Array<string> = ['Java', 'Python', 'PHP'];
let data_1: string[] = ['Java', 'Python', 'PHP'];
console.log(data);
console.log(data_1);

let data2: number[][] = [
    [1,2,3],
    [4,5,6],
]
console.log(data2)

let data3: readonly string[] = ['.net', 'Go'];
console.log(data3);
// data3[1] = 'aaaaa' //エラーになる


//　一般的な連想配列(ハッシュ)
let sample_obj: {
    [index: string]: string;
} = {
    'name': '山田太郎',
    'email': 'sample@gmail.com'
};

console.log(sample_obj['name']);

interface addFunc {
    (num1: number, num2:number): number;
}

let addFunc: addFunc;
addFunc = (n1: number, n2:number) => {
    return n1 + n2
}

type NameableNeo = {
    name: string,
    // nickNameはあってもなくてもOK
    nickName?: string
}

const namable: NameableNeo = {
    name: 'Yamada'
}

const namable2: NameableNeo = {
    name: 'suzuki',
    nickName: 'tarou'
}


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

// AかつB インターセクション
type Engineer = {
    name: string;
    role: string;
}

type Blogger = {
    name: string;
    follower: number;
}

// エンジニアかつブロガー
type EngineerBlogger = Engineer & Blogger;

const guile: EngineerBlogger = {
    name: 'tarou',
    role: 'back-end',
    follower: 100
}

// IFでも同じような書き方ができる

interface Engineer2 {
    name: string;
    role: string;
}

interface Blogger2 {
    name: string;
    follower: number;
}

// エンジニアかつブロガー
// Interfaceでも実現可能だが、typeでないとtypeGuardなどが使えない
interface EngineerBlogger2 extends Engineer2, Blogger {};

const guile2: EngineerBlogger2 = {
    name: 'tarou',
    role: 'back-end',
    follower: 100
}

type NumberBoolean = number | boolean;
type StringNumber  = string | number;
// 複数になると共通集合のnumberが適用される
type Mix = NumberBoolean & StringNumber;

const mix_sample: Mix = 1111;



// タイプガード
function toUpperCase(x: string|number): string {
    if (typeof x === 'string') {
        return x.toUpperCase();
    }
    return ''
}

type NomadWorker = Engineer | Blogger;
function describeNOmadWorkerProfile(nomadWorker: NomadWorker) {
    // name(共通集合のもののみ)アクセスできる
    console.log(nomadWorker.name);
    // typeofで判定できるのはプリミティブ型のみ
    //if (typeof nomadWorker === 'object')
    //そこで特定のプロパティの存在から代替的に型を判定する
    if ('role' in nomadWorker) {
        // roleが保管される
        console.log(nomadWorker.role)
    }

    if ('follower' in nomadWorker) {
        // roleが保管される
        console.log(nomadWorker.follower)
    }
}


class Dog {
    speak() {

    }
    bow() {

    }
}

class Bird {
    speak() {

    }
    fry() {

    }
}

type Pet = Dog | Bird;

function havePet(pet: Pet) {
    pet.speak();
    //インスタンスを見たいときはinstance of
    if (pet instanceof Bird) {
        pet.fry()
    }
}

// タグ付きUnion
// リテラル型により方を絞り込む

class Dog2 {
    kind: 'dog' = 'dog'
    speak() {

    }
    bow() {
        
    }
}

class Bird2 {
    kind: 'bird' = 'bird'
    speak() {

    }
    fry() {

    }
}

type Pet2 = Dog2 | Bird2
function havePet2(pet: Pet2) {
    pet.speak();
    // 共通のリテラルがたを使って分岐が可能
    switch (pet.kind) {

    }
}

// 型アサーション
// inputはNullとHTMLElementになるため型を指定できない↓
// const input: HTMLInputElement = document.getElementById('hogehoge');
// input.value 補完ができない

//　型アサーションで無理やり決めてしまう
// 書き方1
const input = document.getElementById('hogehoge') as HTMLInputElement;
// 書き方2
//const input = <HTMLInputElement>document.getElementById('hogehoge');
// 補完ができる
input.value

//Non null assersion
// 絶対にnullじゃない場合の記述行末に!をつける
// nullの条件判定をしない分コストが下がる
const input2 = document.getElementById('hogehoge')!;

// インデックスシグネチャ(動的プロパティ)
interface Designer {
    name: string;
    [index: string]: string;
}

const designer: Designer = {
    name: 'Yamada'
}
//動的なプロパティを持たせることができる
designer.role = 'web'
console.log(designer);

// 関数のオーバーロード 引数が複数ある場合の方の指定(上のものが優先される)
function toUpperCase2(x: string): string;
function toUpperCase2(x: string | number) {
    if (typeof x === 'string') {
        return x.toUpperCase();
    }
    return ''
}

// 関数の型を関数に伝える
const toUpperhello = toUpperCase2('hello')

// オプショナルチェイニング
interface DownloadedData {
    id: number;
    user?: {
        name?: {
            first: string,
            last: string
        }
    }
}

const downloadedData: DownloadedData = {
    id: 1
}

//通常の場合、下記の書き方だとundefinedが出てしまう
//console.log(downloadedData.user.name)
//もしデータがあれば出力(nullであることを許可)
console.log(downloadedData.user?.name?.first)

//NullishCoalscing
// 三項演算子に近いがundefinedとnullのみ判定される
const userData = downloadedData.user ?? 'no-user'
// カラ文字、0, falseなどでも'no-userになってしまう
const userData2 = downloadedData.user || 'no-user'

//LookUp型
//以下のように書くとtypeで正確に型の判定ができる
type id = DownloadedData["id"];

// 型の互換性
let target = 'hello';
let source: 'hello' = 'hello'
// target(string型) > source('hello型')はOK
target = source;
// target(string型) > source('hello型')はなのでsourceにtargetは入らない
// source = target;

enum Color {
    RED,
    BLUE
};

let target2 = 100;
let source2 = Color.RED
// 互換性あり
target2 = source2

let target_func = function(a: string, b: string){}
let source_func = function(a: string){}

target_func = source_func;
// 最初の引数のみ有効になる
target_func('hi', 'source');

class AdvancedPerson {
    name: string = 'Peter'
    private age: number = 35;
}

class AdvancedCar {
    name: string = 'Prius';
    age: number = 35;
}

let person_instance = new AdvancedPerson();
let car_instance = new AdvancedCar();
// 変数に互換性がないためエラーが出てしまう
//person_instance = car_instance

//TypeScriptの厳密性とJavaScriptの柔軟性

//TypeScript 数字＋文字列→文字列
// https://github.com/microsoft/TypeScript/blob/main/doc/spec-ARCHIVED.md#4.19.2

// key of 演算子

type KeyClass = keyof {name:string, age:number}