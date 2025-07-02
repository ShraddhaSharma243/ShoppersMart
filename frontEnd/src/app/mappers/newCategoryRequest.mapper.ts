import { FormGroup } from "@angular/forms";
import { NewCategoryRequestDto } from "../dtos/newCategoryRequest.dto";

export function mapToNewCategoryRequestDto(form: FormGroup<any>) : NewCategoryRequestDto {
    return {
        name: form.get('name')?.value ?? ''
    };
}