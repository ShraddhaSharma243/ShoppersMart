export interface ProductDto{
    id : string;
    name: string;
    category: string;
    isImported: string; 
    price: number;
    quantityInStock: number;
    quantityOrdered: number;
    subTotal: number;
    isAddedToTheCart: boolean;
}