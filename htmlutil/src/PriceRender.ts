import { type DiscountType, DiscountTypeMap } from "./DiscountType"
import { Price } from "./Price"

export class PriceRender {
    
    constructor() {

    }

    public start = ():void => {
        const discount_types = document.querySelectorAll<HTMLInputElement>('.discount_type')
        discount_types.forEach((ele: HTMLInputElement) => {
            ele.addEventListener('change', this.changeValidDiscountType)
        } )

        const discount_values = document.querySelectorAll<HTMLInputElement>('.discount_value')
        discount_values.forEach((ele: HTMLInputElement) => {
            ele.addEventListener('keypress', this.calcDiscount)
            ele.addEventListener('keydown', this.calcDiscount)
            ele.addEventListener('keyup', this.calcDiscount)
        } )
    }

    private changeValidDiscountType = (e: Event):void => {
        const discount_type_radio_element = e.currentTarget as HTMLInputElement | null
        const selected_discount_type_value = discount_type_radio_element?.value as DiscountType
        const total_elements = discount_type_radio_element?.parentElement?.parentElement
        total_elements?.querySelectorAll<HTMLDivElement>('.discount_type_node')
            .forEach((discount_element: HTMLDivElement) => {
                const discount_type_value = discount_element.querySelector<HTMLInputElement>('.discount_type')?.value
                if (discount_type_value === selected_discount_type_value) {
                    const discount_value = discount_element.querySelector('.discount_value') as HTMLInputElement | null
                    if (discount_value) discount_value.disabled = false
                } else {
                    const non_selected_element = discount_element.querySelector('.discount_value') as HTMLInputElement | null
                    if (non_selected_element) {
                        non_selected_element.value = ''
                        non_selected_element.disabled = true
                    }
                } 
            })
        this.makePriceCalc(selected_discount_type_value)
    }

    private calcDiscount =  (e: Event):void => {
        const discount_value_element = e.currentTarget as HTMLInputElement | null

        const discount_type_element = discount_value_element?.parentElement?.querySelector('.discount_type') as HTMLInputElement | null
        if (discount_type_element?.checked) {
            const discount_type = discount_type_element.value as DiscountType
            const discount_value = discount_value_element?.value
            if (this.validValueCheck(discount_type, discount_value)) {
                this.makePriceCalc(discount_type, discount_value)
            }
        }
    }

    private validValueCheck = (discount_type: DiscountType, discount_value?:string): boolean => {
        if (!discount_value || isNaN(Number(discount_value))) {
            return false
        } 

        const converted_number = Number(discount_value)

        if (converted_number < 0) {
            return false;
        }

        switch (discount_type) {
            case DiscountTypeMap.RATE:
                if (converted_number > 100) {
                    return false
                }
                break;
            case DiscountTypeMap.PRICE:
                const regular_price = this.getRegularPrice()
                if (converted_number > regular_price) {
                    return false
                }
                break;
        }
        return true;
    }

    private makePriceCalc = (discount_type:DiscountType, discount_value?: string):void => {
        
        document.getElementById('discounted_price')!.innerHTML = ''

        const price = new Price(
            this.getRegularPrice(),
            discount_type,
            discount_value
        )

        const discounted_price = price.calcDiscountedPrice()
        document.getElementById('discounted_price')!.innerHTML = discounted_price ? String(discounted_price) : ''

    }

    private getRegularPrice = ():number => {
        return Number(document.getElementById('regular_price')!.innerHTML)
    }
}
