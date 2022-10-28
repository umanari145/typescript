class People2 {
    private static instance
    // シングルトンパターン
    // クラスから１つしかインスタンスを１つしか作れない
    private constructor(protected readonly name: string, protected age:number) {
    }

    // nameだけだと他のものでも使えるが方をいれると使えなくなる
    //greet(this: {name: string}) {
    // 下記のようにthisの型を明記できる
    greet(this: People2) {    
        console.log(`hello my name is ${this.name} I am ${this.age} years old`)
    }

    incrementAge() {
        this.age++;
    }
    static getInstance() {
        if (People2.instance) return People2.instance;
        People2.instance = new People2('清原', 54);
        return People2.instance
    }
}

// 通常のインスタンス生成ができない↓
// const people2 = new People2('清原', 54);
const people2 = People2.getInstance();
people2.greet();

const people_2 = People2.getInstance();
people_2.greet();