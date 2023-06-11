import axios, { AxiosError, AxiosResponse } from "axios"
import {v4 as uuid} from 'uuid';
import {ApiRes, City} from './ApiRes'

export class CityGetters {
    
    private api_key: string
    private api_url: string

    constructor() {
        this.api_key = process.env.MIX_API_KEY || ''
        this.api_url = process.env.MIX_API_URL || ''
    }

    
    public fetchCities = () => {
        axios({
            url: `${this.api_url}prefectures`,
            method: "GET",
            headers: {
                'X-API-KEY': this.api_key
            }
        }).then((res:AxiosResponse<ApiRes> )=> {
            const { data, status } = res;
            if (status === 200) {
                const city_list:HTMLElement|null = document.getElementById('city_list')
                data.result.forEach((city:City) => {
                    const cityElement = this.createCityHTML(city)
                    city_list?.appendChild(cityElement)
                })
            }

        }).catch((e: AxiosError<{ error: string }>) => {
            // エラー処理
            console.log(e.message);
        })
    }

    private createCityHTML = (city:City):HTMLElement => {
        const prefEl: HTMLElement = document.createElement('li')
        prefEl.id = uuid()

        const typeInputEl: HTMLInputElement = document.createElement('input')
        const typeLabelEl: HTMLLabelElement = document.createElement('label')
        
        typeInputEl.type = 'checkbox'
        typeInputEl.className = 'me-1'
        typeInputEl.value = city.prefCode
        typeInputEl.id = `pref_code_${city.prefCode}`

        typeLabelEl.innerHTML = city.prefName
        typeLabelEl.setAttribute('for', `pref_code_${city.prefCode}`)

        prefEl.appendChild(typeInputEl)
        prefEl.appendChild(typeLabelEl)

        return prefEl
    }
}