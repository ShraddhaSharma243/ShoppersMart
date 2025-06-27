import { PurchasedItem } from "./orderItem.dto"
export interface ReceiptDto{
    id : string,
    orderDate: Date,
    total: number,
    purchasedItems : PurchasedItem[]
}