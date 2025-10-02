import axios from "axios"

export class LocationGetters {
    
    private api_key: string
    private api_url: string

    constructor() {
        this.api_key = ''
        this.api_url = ''
    }

    public fetchPrefs = () => {
        return axios({
            url: `${this.api_url}prefectures`,
            method: "GET",
            headers: {
                'X-API-KEY': this.api_key
            }
        })
    }

    public fetchCities = (city_code:string) => {
        return axios({
            url: `${this.api_url}cities?prefCode=${city_code}`,
            method: "GET",
            headers: {
                'X-API-KEY': this.api_key
            }
        })
    }
}