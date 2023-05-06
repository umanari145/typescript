
import { PulldownRender } from "./PulldownRender"

export class MultiPulldown {
    private readonly pulldownRender = new PulldownRender()

    public start = ():void => {
        this.addMultiPulldown()
        const addButton = document.getElementById('add_button') as HTMLButtonElement
        addButton.addEventListener('click', () => this.addMultiPulldown())
    }

    private addMultiPulldown = () => {
        const locationEl:HTMLElement = this.pulldownRender.makeLocationEl()
        document.getElementById('dobule_pulldown')?.appendChild(locationEl)
    }
}

