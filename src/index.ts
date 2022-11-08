import city_pref from './city_pref.json';
import LoadCityJson from './LoadCityJson';

/*const load_city_json =  new LoadCityJson(
    city_pref.city as Map<string, string>!,
    city_pref.town  as Map<string, Map<string, string>>
);*/

//console.log(city_pref.city);
//const city3: City = JSON.parse(`{"11":"東京","12":"千葉"}`); 
//let city_str: unknown = city_pref.city;
//console.log(city_pref.city);

const city = JSON.parse(city_pref.city) 
console.log(city);

interface City {
  pref_code: number;
  pref_name: string
}