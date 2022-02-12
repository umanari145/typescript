let hello: string ='hello';
console.log(hello);

function add(a: number, b: number): number {
    return a + b;
}

class Person {
    talk: string;

    constructor() {
        this.talk = 'talkだよ'
    }

    public getTalk(): string{
        return this.talk
    }    
}