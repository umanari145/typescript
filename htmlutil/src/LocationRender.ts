import axios, { AxiosError, AxiosResponse } from "axios"
import {v4 as uuid} from 'uuid';
import {PrefRes, CityRes, Pref, City} from './ApiRes'

export class LocationRender {
    
    private api_key: string
    private api_url: string

    constructor() {
        this.api_key = process.env.MIX_API_KEY || ''
        this.api_url = process.env.MIX_API_URL || ''
    }

    
    public fetchPrefs = () => {
        axios({
            url: `${this.api_url}prefectures`,
            method: "GET",
            headers: {
                'X-API-KEY': this.api_key
            }
        }).then((res:AxiosResponse<PrefRes> )=> {
            const { data, status } = res;
            if (status === 200) {
                const pref_list:HTMLElement|null = document.getElementById('pref_list')
                data.result.forEach((pref:Pref) => {
                    pref_list?.appendChild(this.createPrefHTML(pref))
                })
            }

        }).catch((e: AxiosError<{ error: string }>) => {
            // エラー処理
            console.log(e.message);
        })
    }

    private createPrefHTML = (pref:Pref):HTMLElement => {
        const prefEl: HTMLElement = document.createElement('li')
        prefEl.id = uuid()
        prefEl.className = 'pref_li'

        const typeInputEl: HTMLInputElement = document.createElement('input')
        const typeLabelEl: HTMLLabelElement = document.createElement('label')
        
        typeInputEl.type = 'radio'
        typeInputEl.name = 'pref'
        typeInputEl.className = 'me-1'
        typeInputEl.value = pref.prefCode.toString()
        typeInputEl.id = `pref_code_${pref.prefCode}`

        typeLabelEl.innerHTML = pref.prefName
        typeLabelEl.setAttribute('for', `pref_code_${pref.prefCode}`)

        prefEl.appendChild(typeInputEl)
        prefEl.appendChild(typeLabelEl)

        return prefEl
    }

    public fetchCities = (city_code:string) => {

        axios({
            url: `${this.api_url}cities?prefCode=${city_code}`,
            method: "GET",
            headers: {
                'X-API-KEY': this.api_key
            }
        }).then((res:AxiosResponse<CityRes> )=> {
            const { data, status } = res;
            if (status === 200) {
                // nullじゃないことをかくていしないとinertHTMLに入る
                const city_list = document.getElementById('city_list')!
                city_list.innerHTML = '';

                data.result.forEach((city:City) => {
                    const cityElement = this.createCityHTML(city)
                    city_list.appendChild(cityElement)
                })
            }

        }).catch((e: AxiosError<{ error: string }>) => {
            // エラー処理
            console.log(e.message);
        })
    }

    private createCityHTML = (city:City):HTMLElement => {
        const cityEl: HTMLElement = document.createElement('li')
        cityEl.className = 'city_li'
        cityEl.id = uuid()

        const typeInputEl: HTMLInputElement = document.createElement('input')
        const typeLabelEl: HTMLLabelElement = document.createElement('label')
        
        typeInputEl.type = 'checkbox'
        typeInputEl.className = 'me-1'
        typeInputEl.value = city.cityCode
        typeInputEl.id = `city_code_${city.cityCode}`

        typeLabelEl.innerHTML = city.cityName
        typeLabelEl.setAttribute('for', `city_code_${city.cityCode}`)

        cityEl.appendChild(typeInputEl)
        cityEl.appendChild(typeLabelEl)

        return cityEl
    }
}