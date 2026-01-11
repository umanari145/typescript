import GoodFoods from './GoodFoods';
import BadFoods from './BadFoods';

//　ちょっとtsで描くためにclassではなく食べ物にidをふって管理
const green: GoodFoods = new GoodFoods('green');
green.addEvent();

const orange: GoodFoods = new GoodFoods('orange');
orange.addEvent();

const butter: BadFoods = new BadFoods('butter');
butter.addEvent();

const cheese: BadFoods = new BadFoods('cheese');
cheese.addEvent();
