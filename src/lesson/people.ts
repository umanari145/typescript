class People {
    // static変数と関数
    static species = 'Homo サピエンス';
    static isAdult(age: number): boolean{
        if (age > 17) {
            return true;
        } else {
            return false;
        }
    }

    /*private name: string;
    private age: number;
    constructor(name: string, age:number) {
        this.name = name;
        this.age = age;
    }*/

    // 以下の書き方で初期化が完了
    // readonlyをつけると変更ができなくなる
    // ただしconstructor内での変更は可能
    constructor(protected readonly name: string, protected age:number) {
    }


    // nameだけだと他のものでも使えるが方をいれると使えなくなる
    //greet(this: {name: string}) {
    // 下記のようにthisの型を明記できる
    greet(this: People) {    
        console.log(`hello my name is ${this.name} I am ${this.age} years old`)
    }

    incrementAge() {
        // static呼び出し
        console.log(People.species);
        this.age++;
    }
}

// 
// 他の言語仕様と同様、継承や抽象クラスなども可能(抽象クラスはtypescriptのみで対応可能)
class Teacher extends People{
    // getterの書き方
    get subject(): string {
        return this._subject;
    }
    // setterの書き方
    set subject(subject: string) {
        this._subject = subject;
    }
    constructor(name: string, age: number, private _subject: string) {
        super(name, age)
    }
    greet(): void {
        console.log(`hello my name is ${this.name} I am ${this.age} years old I teach ${this.subject}`)
    }
}

const yamada = new People('yamada', 21);
yamada.incrementAge();
yamada.greet();
// hello my name is yamada I am 22

const suzuki = {
    name:'suzuki',
    anotherGreet: yamada.greet
}

// greet(this: People) にするとエラーが出る
//suzuki.anotherGreet();
// hello my name is suzuki

/*const watanabe = {
    anotherGreet: yamada.greet
}*/
//greet(this: {name: string}) を記載するとコンパイルエラーを発生させることができる
// watanabe.anotherGreet();

const teacher = new Teacher('kiyohara', 53, 'english');
teacher.greet();
console.log(teacher.subject)
teacher.subject = 'music';
console.log(teacher.subject)
console.log(People.isAdult(20));