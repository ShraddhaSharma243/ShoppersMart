export interface StockRequestDto{
    name: string;
    category: string;
    isImported: boolean,
    price: number,
    quantityInStock: number
}