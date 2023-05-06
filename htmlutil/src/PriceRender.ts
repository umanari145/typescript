import { DiscountType } from "./DiscountType"

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
    }

    private calcDiscount =  (e: Event):void => {
    }
}