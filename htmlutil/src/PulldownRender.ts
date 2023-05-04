import location from './location.json';
import {v4 as uuid} from 'uuid';

export class PulldownRender {

    constructor() {
    }

    public makeLocationEl = ():HTMLElement => {
        const locationEl: HTMLElement = document.createElement('div')
        locationEl.id = uuid()

        const prefSelectEl: HTMLSelectElement = document.createElement('select')
        const prefOptionEl: HTMLOptionElement = document.createElement('option')

        prefOptionEl.value = ''
        prefOptionEl.text = ''
        prefSelectEl.appendChild(prefOptionEl)

        location.pref.forEach((pref:any) => {
            const option: HTMLOptionElement = document.createElement('option')
            option.value = pref.code
            option.text = pref.name
            prefSelectEl.appendChild(option)
        })
        locationEl.appendChild(prefSelectEl)

        const townSelectEl: HTMLSelectElement = document.createElement('select')

        prefSelectEl.addEventListener('change',(e:Event) => {
            const element = e.currentTarget as HTMLSelectElement;
            this.makeTownSelectEl(townSelectEl, element.value)
        })

        locationEl.appendChild(townSelectEl)

        const buttonEl: HTMLButtonElement = document.createElement('button')
        buttonEl.textContent = '削除'
        
        buttonEl.addEventListener(
            'click',
            () => this.deletePulldown(locationEl.id)
        )

        locationEl.appendChild(buttonEl)

        return locationEl
    }

    public makeTownSelectEl = (townSelectEl:HTMLSelectElement, belog_city_code:string):void => {

        townSelectEl.querySelectorAll('option')?.forEach((element:Element) => element.remove())

        const option: HTMLOptionElement = document.createElement('option')

        option.value = ''
        option.text = ''

        townSelectEl.appendChild(option)

        location.town.filter((town:any) => {
            return town.belong_city_code === belog_city_code
        }).forEach((town:any) => {
            const option: HTMLOptionElement = document.createElement('option')
            option.value = town.code
            option.text = town.name
            townSelectEl.appendChild(option)
        })
    }

    private deletePulldown = (locationId: string) => {
        if (window.confirm('削除しても構いませんか？')) {
            document.getElementById(locationId)?.remove()
        }
    }
}