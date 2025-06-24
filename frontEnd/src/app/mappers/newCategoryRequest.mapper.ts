import { FormGroup } from "@angular/forms";
import { NewCategoryRequestDto } from "../dtos/newCategoryRequest.dto";

export function mapToNewCategoryRequestDto(newCategoryForm: FormGroup<any>) : NewCategoryRequestDto {
    return {
        name: newCategoryForm.get('name')?.value ?? ''
    };
}