
import { DetailRender } from "./DetailRender"

class Application2 {
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


window.addEventListener('load', () => {
    const app = new Application2();
    app.start()
})
