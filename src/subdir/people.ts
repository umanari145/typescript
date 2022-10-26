class People {
    name: string;    
    constructor(name: string) {
        this.name = name;
    }
    greet() {
        console.log(`hello my name is ${this.name}`)
    }
}

const yamada = new People('yamada');
yamada.greet();
// hello my name is yamada

const suzuki = {
    name:'suzuki',
    anotherGreet: yamada.greet
}

suzuki.anotherGreet();
// hello my name is suzuki