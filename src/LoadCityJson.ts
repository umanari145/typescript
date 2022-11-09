import City from './City';
import Town from './Town';

export default class LoadCityJson {

    constructor(
        private _cities: Array<City>,
        private _towns: Array<Town>
    ) {

    }

    get cities(): Array<City> {
        return this._cities;
    }

    set cities(cities: Array<City>) {
        this._cities = cities;
    }

    get towns(): Array<Town> {
        return this._towns;
    }

    set towns(towns: Array<Town>) {
        this._towns = towns;
    }
}

