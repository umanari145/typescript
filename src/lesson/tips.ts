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

