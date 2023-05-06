
import { DetailRender } from "./DetailRender"

export class CalcMultiDetails {
    private readonly detailRender = new DetailRender()

    public start = ():void => {
        this.addDetails()
        const addButton = document.getElementById('add_detail_button') as HTMLButtonElement
        addButton.addEventListener('click', () => this.addDetails())
    }

    private addDetails = () => {
        const detailEl:HTMLElement = this.detailRender.makeDetailEl()
        document.getElementById('multi-detail')?.appendChild(detailEl)
    }
}