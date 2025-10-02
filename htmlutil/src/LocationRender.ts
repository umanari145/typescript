import {AxiosError} from "axios"
import {v4 as uuid} from 'uuid';
import {type Pref, type City} from './ApiRes'
import {LocationGetters} from './LocationGetters'
export class LocationRender {

    private locationGetters = new LocationGetters();

    public start = ()=> {
        this.createPref()
        this.createCity()
    }

    private createPref = () => {

        this.locationGetters
            .fetchPrefs()
            .then((res)=> {
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

    private createCity = () => {
        
        document.getElementById('search')?.addEventListener('click', ()=> {
            const checked_pref: HTMLInputElement|null = document.querySelector('#pref_list input:checked')
            if (checked_pref?.value) {
                this.changeToCityMode()
                
                this.locationGetters
                    .fetchCities(checked_pref?.value)
                    .then((res)=> {
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
        })
        this.changeToBackPrefMode()
    }

    private changeToCityMode = () => {
        document.getElementById('city_list')!.classList.remove('d-none')
        document.getElementById('pref_list')!.classList.add('d-none')
        document.getElementById('close')!.classList.add('d-none')
        document.getElementById('back')!.classList.remove('d-none')
    }
    
    private changeToBackPrefMode = () => {
        document.getElementById('back')?.addEventListener('click', ()=> {
            document.getElementById('city_list')!.classList.add('d-none')
            document.getElementById('back')!.classList.add('d-none')
            document.getElementById('pref_list')!.classList.remove('d-none')
            document.getElementById('close')!.classList.remove('d-none')
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