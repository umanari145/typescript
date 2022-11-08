import city_pref from './city_pref.json';
import LoadCityJson from './LoadCityJson';

// json読み込んだ時点で既に理想の型が取得できるので不要
console.log(city_pref);

// 意味不明な変換(stringifyからparseに)
/*let bbb:string = JSON.stringify(city_pref.city);
console.log(bbb);
const city = JSON.parse(bbb) 
// 出力できる
console.log(city);
interface City {
  pref_code: number;
  pref_name: string
}*/

/*const load_city_json = new LoadCityJson(
  city_pref.city,
  city_pref.town
);*/