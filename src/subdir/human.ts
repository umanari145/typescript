interface Human {
    name: string;
    age: number;
    greeting(message: string): void;
}


const human: Human = {
    name: 'Yamada',
    age: 38,
    greeting(message: string): void {
        console.log(`${message}`)
    }
}