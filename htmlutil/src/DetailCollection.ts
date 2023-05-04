import { Detail } from './Detail'

const STORAGE_KEY = 'DETAIL'

export class DetailCollection {

    private readonly storage
    private details: Detail[]
    private totalSum: number

    constructor() {
        this.details = this.getStoredTasks();
        this.storage = localStorage
        this.totalSum = 0
    }

    add(detail: Detail) {
        this.details.push(detail)
        this.updateStorage()
    }

    find(id: string):Detail|undefined {
        return this.details.find((detail) => detail.id === id)
    }

    update(detail: Detail) {
        this.details = this.details.map((item) => {
            if (item.id !== detail.id) {
                return item
            } else {
                return detail
            }
        })
    }

    sum(): number {
        this.details = this.details.filter((item) => {
            if(item.price && isNaN(item.price)) {
                this.totalSum += item.price
            }
        })
        return this.totalSum
    }

    private updateStorage() {
        this.storage.setItem(STORAGE_KEY, JSON.stringify(this.details))
    }
    
    private getStoredTasks() {
        const jsonString = this.storage.getItem(STORAGE_KEY)
        if (jsonString) {
            const storedTasks = JSON.parse(jsonString)
            const details = storedTasks.map((detail:Detail) => new Detail(detail.id, detail.price))
            return details
        }
    }
}

