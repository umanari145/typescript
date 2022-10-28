// interfaceについて
interface Human {
    name: string;
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
    constructor(public name: string, public age: number) {

    }
    greeting(message: string): void {
        console.log(message);
    }
} 