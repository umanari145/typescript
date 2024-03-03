import { Asynchronous } from "./asynchronous";
import { createApp } from "vue";
import { Calc } from "./calc";
import { App } from './vuemini';
import { add } from '@umanari145/fm-common-utils';

const asynchronous = new Asynchronous();
asynchronous.start();

// vueのmount
const app = createApp(App);
app.mount('#app')

const calc = new Calc();
// calc.start();
// calc.start2();
calc.start3();
console.log(add(3,4));