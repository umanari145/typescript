import { Asynchronous } from "./asynchronous";
import { createApp } from "vue";
import { Calc } from "./calc";
import { App } from './vuemini';

const asynchronous = new Asynchronous();
asynchronous.start();

// vueのmount
const app = createApp(App);
app.mount('#app')

const calc = new Calc();
//calc.start();
calc.start2();