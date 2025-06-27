import { ReceiptDto } from "../dtos/receipt.dto";

export function mapToReceiptDto(orderResponse: any): ReceiptDto {
    return {
        id: orderResponse.id,
        orderDate: orderResponse.orderDate,
        total: orderResponse.total,
        purchasedItems: orderResponse.orderItems.map((orderItem: { name: string; category: string; isImported: boolean; price: number; quantity: number; tax: number; subTotal: number; }) => ({
            name: orderItem.name,
            category: orderItem.category,
            isImported: orderItem.isImported,
            price: orderItem.price,
            quantity: orderItem.quantity,
            tax: Math.round(orderItem.tax * 100) / 100,
            subTotal: orderItem.subTotal
        })
        )
    }
}