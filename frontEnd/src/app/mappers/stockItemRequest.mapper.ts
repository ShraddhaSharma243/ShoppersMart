import { FormGroup } from "@angular/forms";
import { StockRequestDto } from "../dtos/stockRequest.dto";

export function mapTostockItemRequestDto(entryForm: FormGroup<any>): StockRequestDto {
    return {
        name: entryForm.get('name') ?.value ?? '',
        category: String(entryForm.get('category')?.value),
        isImported: Boolean(entryForm.get('isImported')?.value),
        price: Number(entryForm.get('price')?.value ?? 0),
        quantityInStock: Number(entryForm.get('quantity')?.value ?? 0)
    }
}