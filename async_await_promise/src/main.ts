import { Asynchronous } from "./asynchronous";
import { createApp } from "vue";
import { App } from './vuemini';

const asynchronous = new Asynchronous();
asynchronous.start();

// vueのmount
const app = createApp(App);
app.mount('#app')