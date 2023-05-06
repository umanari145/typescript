
export const DiscountTypeMap = {
    PRICE: "1",
    RATE: "2",
    NONE: "3"
} as const;
   
export type DiscountType = typeof DiscountTypeMap[keyof typeof DiscountTypeMap];
