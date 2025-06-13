import { OrderItem } from "./orderItem.dto"
export interface ReceiptDto{
    id : string,
    orderDate: Date,
    total: number,
    orderItems : OrderItem[]
}