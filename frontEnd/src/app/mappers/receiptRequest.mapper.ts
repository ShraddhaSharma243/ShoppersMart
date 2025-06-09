import { ProductDto } from "../dtos/product.dto";
import { ReceiptRequestDto } from "../dtos/receiptRequest.dto";

export function mapToReceiptRequestDto(productDto : ProductDto): ReceiptRequestDto{
 return {
    id: productDto.id, 
    quantityOrdered:productDto.quantityOrdered,
 }
}  