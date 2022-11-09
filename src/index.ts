import city_pref from './city_pref.json';
//import City from './City';
//import Town from './Town';
//import LoadCityJson from './LoadCityJson';

/*
// 出力できる
console.log(city);
interface City {
  pref_code: number;
  pref_name: string
}*/

/*let cities = new Map<string, string>();
city_pref.city.forEach ((city) => {
  cities.set(city.code, city.name);
})*/
/*city_pref.town.forEach ((town) => {
  cities.set(city.code, city.name);
})*/

// これでも一応読み込むことはできるが・・・一段下の方がエラーでない
//const cities: Array<City> = city_pref.city;
//一般的なクラスへの転換
//const cities: Array<City> = JSON.parse(JSON.stringify(city_pref.city));
//const towns: Array<Town> = JSON.parse(JSON.stringify(city_pref.town));
//const load_city_json = new LoadCityJson(cities, towns);
/*console.log(cities);
console.log(towns);
console.log(load_city_json);
*/
// 型指定なければ一気に読み込める
const tmp = JSON.parse(JSON.stringify(city_pref));
console.log(tmp)
const cities: Map<number, string> = tmp['city'];
console.log(cities);
const towns: Map<number, Map<string, string>> = tmp['town'];
console.log(towns);

