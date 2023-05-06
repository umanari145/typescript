export const DetailTypeMap = {
    NORMAL: "1",
    SPECIAL: "2",
    IRREGULAR: "3"
} as const;
   
export type DetailType = typeof DetailTypeMap[keyof typeof DetailTypeMap];

export function DetailTypelabel(detailType:DetailType):string {
    let label:string = ''
    switch(detailType) {
        case DetailTypeMap.NORMAL:
            label = '通常'
            break;
        case DetailTypeMap.SPECIAL:
            label = '特別'
            break;
        case DetailTypeMap.IRREGULAR:
            label = '例外'
            break;         
    }
    return label
}

export class Detail {

    private _id: string
    private _detailType: DetailType|undefined
    private _price: number

    constructor(id: string, detailType?: DetailType, price?: string) {
        this._id = id
        if (detailType) {
            this._detailType = detailType
        } else {
            this._detailType = undefined
        }

        if (price) {
            this._price = Number(price)
        } else {
            this._price = 0
        }
    }

    get id(): string {
        return this._id
    }

    get detailType(): DetailType | undefined {
        return this._detailType
    }

    get price(): number | undefined {
        return this._price
    }
}


export class DetailCollection {

    private detailCollection :Detail[]
    private normalTotalSum: number
    private specialTotalSum: number
    private irregularTotalSum: number

    constructor() {
        this.detailCollection = []
        this.normalTotalSum = 0
        this.specialTotalSum = 0
        this.irregularTotalSum = 0
    }

    public clear = ():void => {
        this.detailCollection = []
    }

    public add = (detail:Detail) => {
        this.detailCollection.push(detail)
    }

    public summrize = () => {

        this.normalTotalSum = 0
        this.specialTotalSum = 0
        this.irregularTotalSum = 0

        this.detailCollection.map((detail: Detail) => {
            if (detail.detailType && detail.price) {
                switch (detail.detailType) {
                    case DetailTypeMap.NORMAL:
                        this.normalTotalSum += detail.price
                        break;
                    case DetailTypeMap.SPECIAL:
                        this.specialTotalSum += detail.price
                        break;
                    case DetailTypeMap.IRREGULAR:
                        this.irregularTotalSum += detail.price
                        break;
                }
            }
        })

        document.getElementById('normal-total-sum')!.innerHTML = this.normalTotalSum > 0 ? String(this.normalTotalSum) : ''
        document.getElementById('special-total-sum')!.innerHTML = this.specialTotalSum > 0 ? String(this.specialTotalSum) : ''
        document.getElementById('irregular-total-sum')!.innerHTML = this.irregularTotalSum > 0 ? String(this.irregularTotalSum) : ''
    }
}