import { ProductDto } from "../dtos/product.dto";
import { ReceiptRequestDto } from "../dtos/receiptRequest.dto";

export function mapToReceiptRequestDto(productDto : ProductDto): ReceiptRequestDto{
 return {
    productId: productDto.id, 
    quantity:productDto.quantityOrdered,
 }
}  