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

    readonly id:string
    price: number|undefined
    detailType: DetailType|undefined

    constructor(detailId: string, price: number) {
        this.id = detailId
        this.price = price
    }

    public update = (properties: { price?: number; detailType?: DetailType }): void => {
        if (properties.price) {
            this.price = properties.price
        }

        if (properties.detailType) {
            this.detailType = properties.detailType
        }
    }
}