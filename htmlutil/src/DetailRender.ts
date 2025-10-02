import {v4 as uuid} from 'uuid';
import { DetailTypeMap, DetailTypelabel, type DetailType, Detail, DetailCollection} from './Detail';

export class DetailRender {

    private detailCollection = new DetailCollection()

    constructor() {
    }

    public makeDetailEl = ():HTMLElement => {
        const detailEl: HTMLElement = document.createElement('div')
        detailEl.id = uuid()
        detailEl.className = 'detail-line'

        const typeSelectEl: HTMLSelectElement = document.createElement('select')
        const typeOptionEl: HTMLOptionElement = document.createElement('option')

        typeSelectEl.className = 'detail-type'
        typeOptionEl.value = ''
        typeOptionEl.text = ''
        typeSelectEl.appendChild(typeOptionEl)
        typeSelectEl.appendChild(this.addOption(DetailTypeMap.NORMAL))
        typeSelectEl.appendChild(this.addOption(DetailTypeMap.SPECIAL))
        typeSelectEl.appendChild(this.addOption(DetailTypeMap.IRREGULAR))

        typeSelectEl.addEventListener('change', () => this.calculateSummary())

        detailEl.appendChild(typeSelectEl)

        const priceEl: HTMLInputElement = document.createElement('input')
        priceEl.className = 'price text-lg-end'
        priceEl.placeholder = '1000'
        priceEl.addEventListener('keydown', () => this.calculateSummary())
        priceEl.addEventListener('keypress', () => this.calculateSummary())
        priceEl.addEventListener('keyup', () => this.calculateSummary())
        detailEl.appendChild(priceEl)

        const noteEl: HTMLInputElement = document.createElement('input')
        noteEl.placeholder = '備考'
        detailEl.appendChild(noteEl)

        const buttonEl: HTMLButtonElement = document.createElement('button')
        buttonEl.textContent = '削除'
        
        buttonEl.addEventListener('click', () => this.deletePulldown(detailEl.id))

        detailEl.appendChild(buttonEl)
        
        return detailEl
    }

    private calculateSummary = () => {
        const detail_lines = document.querySelectorAll<HTMLInputElement>('.detail-line')
        this.detailCollection.clear()
        detail_lines.forEach((ele: HTMLDivElement) => {
            if (ele) {
                const detailId = ele.id
                const detailType = ele.querySelector<HTMLSelectElement>('.detail-type')?.value as DetailType | undefined
                const price = ele.querySelector<HTMLInputElement>('.price')?.value
               
                this.detailCollection.add(
                    new Detail(
                        detailId,
                        detailType,
                        price
                    )
                )

                this.detailCollection.summrize()
            }
        })
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
            this.calculateSummary()
        }
    }
}