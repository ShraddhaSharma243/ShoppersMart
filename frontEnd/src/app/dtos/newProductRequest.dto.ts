export interface NewProductRequestDto{
    name: string;
    category: string;
    isImported: boolean,
    price: number,
    quantityInStock: number
}