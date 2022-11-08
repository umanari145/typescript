
export default class LoadCityJson {

    constructor(
        private _cities: Map<string, string>,
        private _towns: Map<string, Map<string, string>>
    ) {

    }

    get cities(): Map<string, string> {
        return this._cities;
    }

    set cities(cities: Map<string, string>) {
        this._cities = cities;
    }

    get towns(): Map<string, Map<string, string>> {
        return this._towns;
    }

    set towns(towns: Map<string, Map<string, string>>) {
        this._towns = towns;
    }
}

