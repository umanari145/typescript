import axios, { AxiosPromise } from "axios"

export class LocationGetters {
    
    private api_key: string
    private api_url: string

    constructor() {
        this.api_key = process.env.MIX_API_KEY || ''
        this.api_url = process.env.MIX_API_URL || ''
    }

    public fetchPrefs = ():AxiosPromise => {
        return axios({
            url: `${this.api_url}prefectures`,
            method: "GET",
            headers: {
                'X-API-KEY': this.api_key
            }
        })
    }

    public fetchCities = (city_code:string): AxiosPromise => {
        return axios({
            url: `${this.api_url}cities?prefCode=${city_code}`,
            method: "GET",
            headers: {
                'X-API-KEY': this.api_key
            }
        })
    }
}