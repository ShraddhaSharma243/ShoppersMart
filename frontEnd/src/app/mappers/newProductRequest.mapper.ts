import { FormGroup } from "@angular/forms";
import { NewProductRequestDto } from "../dtos/newProductRequest.dto";

export function mapToNewProductRequestDto(entryForm: FormGroup<any>): NewProductRequestDto {
    return {
        name: entryForm.get('name') ?.value ?? '',
        category: String(entryForm.get('category')?.value),
        isImported: Boolean(entryForm.get('isImported')?.value),
        price: Number(entryForm.get('price')?.value ?? 0),
        quantityInStock: Number(entryForm.get('quantity')?.value ?? 0)
    }
}