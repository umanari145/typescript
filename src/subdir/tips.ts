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
