import {v4 as uuid} from 'uuid';
import { DetailTypeMap, DetailTypelabel, DetailType, Detail } from './Detail';
import { DetailCollection } from './DetailCollection';

export class DetailRender {

    detailCollection = new DetailCollection();

    constructor() {
    }

    public makeDetailEl = ():HTMLElement => {
        const detailEl: HTMLElement = document.createElement('div')
        detailEl.id = uuid()
        
        const detail = new Detail(detailEl.id)

        this.detailCollection.add(detail)

        const typeSelectEl: HTMLSelectElement = document.createElement('select')
        const typeOptionEl: HTMLOptionElement = document.createElement('option')

        typeOptionEl.value = ''
        typeOptionEl.text = ''
        typeSelectEl.appendChild(typeOptionEl)
        typeSelectEl.appendChild(this.addOption(DetailTypeMap.NORMAL))
        typeSelectEl.appendChild(this.addOption(DetailTypeMap.SPECIAL))
        typeSelectEl.appendChild(this.addOption(DetailTypeMap.IRREGULAR))

        /*typeSelectEl.addEventListener('change', () => {

        })*/

        detailEl.appendChild(typeSelectEl)

        const priceEl: HTMLInputElement = document.createElement('input')
        priceEl.className = 'price text-lg-end'
        priceEl.addEventListener('keydown', () => this.calculateSummary(detail.id, priceEl.value))

        detailEl.appendChild(priceEl)

        const noteEl: HTMLInputElement = document.createElement('input')
        detailEl.appendChild(noteEl)

        const buttonEl: HTMLButtonElement = document.createElement('button')
        buttonEl.textContent = '削除'
        
        buttonEl.addEventListener(
            'click',
            () => this.deletePulldown(detailEl.id)
        )

        detailEl.appendChild(buttonEl)
        
        return detailEl
    }

    private calculateSummary = (detailId:string, price:string) => {
        const detail = this.detailCollection.find(detailId)
        if (price && !isNaN(parseInt(price))) {
            if (detail) {
                detail.price = parseInt(price)
                this.detailCollection.update(detail)
            }
        }
        document.getElementById('total-sum')!.innerHTML = String(this.detailCollection.sum())
    }

    private addOption = (detailType:DetailType):HTMLOptionElement => {
        const option: HTMLOptionElement = document.createElement('option')
        option.value = detailType
        option.text = DetailTypelabel(detailType)
        return option
    }

    private deletePulldown = (locationId: string) => {
        if (window.confirm('削除しても構いませんか？')) {
            document.getElementById(locationId)?.remove()
        }
    }


}