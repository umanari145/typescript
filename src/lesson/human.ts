// interfaceについて

interface Nameable {
    readonly name: string;
}
// ifの継承
interface Human extends Nameable {
    age: number;
    greeting(message: string): void;
}

// オブジェクトに対する継承
const human: Human = {
    name: 'Yamada',
    age: 38,
    greeting(message: string) {
        console.log(`${message}`)
    }
}

// ifに関しては複数つけることが可能
class Developers implements Human {
    constructor(public name: string, public age: number, public experience: number) {};
    // ?は引数あってもなくても良いケース
    greeting(message?: string): void {
        console.log(message);
    }
} 

// 実装先に変数や関数が多くても構わない
const user: Human = new Developers('Tarou', 42, 12);
//readonlyだとエラーが出る(初期化の際はOK)
// user.name = 'aaa';

// 関数の型
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