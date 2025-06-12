import { ProductDto } from "../dtos/product.dto";
import { OrderRequestDto } from "../dtos/orderRequest.dto";

export function mapToOrderRequestDto(productDto : ProductDto): OrderRequestDto{
 return {
    productId: productDto.id, 
    quantity:productDto.quantityOrdered,
 }
}  