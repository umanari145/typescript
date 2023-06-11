
type PrefRes = {
    message: string;
    result: Pref[];
}

type CityRes = {
    message: string;
    result: City[];
}

type Pref = {
    prefCode: number;
    prefName: string;
}

type City = {
    prefCode: number,
    cityCode: string,
    cityName: string,
    bigCityFlag: string
}

export {PrefRes, CityRes, Pref, City}