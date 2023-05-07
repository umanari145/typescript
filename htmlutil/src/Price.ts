import { DiscountType, DiscountTypeMap } from "./DiscountType";

export class Price {

    private _regularPrice: number
    private _discountType: DiscountType
    private _discountValue: number|undefined

    constructor(regular_price:number, discountType: DiscountType, discountValue?: string) {
        this._regularPrice = regular_price
        this._discountType = discountType
        this._discountValue = (discountValue) ? Number(discountValue) : undefined
    }

    public calcDiscountedPrice = ():number|null => {
        if (this._discountValue) {
            switch (this._discountType) {
                case DiscountTypeMap.PRICE:
                    return this._regularPrice - this._discountValue
                case DiscountTypeMap.RATE:
                    return this._regularPrice * (100 - this._discountValue) / 100
                case DiscountTypeMap.NONE:
                    return this._regularPrice
            }
        }
        return null
    }
}