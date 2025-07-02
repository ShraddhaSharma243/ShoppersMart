import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { mapToNewCategoryRequestDto } from '../../mappers/newCategoryRequest.mapper';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-new-category',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css'
})
export class NewCategoryComponent {
  errors: string[] = [];
  private formBuilder = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private ERROR_INVALID_NAME = "Name is required. Name must be between 3 and 255 characters and can only contain letters and spaces.";
  private SUCCESS_MESSAGE_CATEGORY_SUCCESSFULLY_CREATED = "Category created successfully.";
  successMessage: string = "";

  onSubmit() {
    this.successMessage = "";
    this.errors = [];
    if (this.isNameInvalid) {
      this.errors.push(this.ERROR_INVALID_NAME);
      return;
    }
    
    const request = mapToNewCategoryRequestDto(this.form);
    this.categoryService.submit(request).subscribe({
      next: () => {
        this.successMessage = this.SUCCESS_MESSAGE_CATEGORY_SUCCESSFULLY_CREATED;
        this.form.reset();
      },
      error: (error) => {
        this.errors.push(error);
      }
    });
  }

  form = this.formBuilder.group({
    name: ['', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]
    }]
  });

  get isNameInvalid() {
    const nameControl = this.form.get('name');
    return (
      !!nameControl && (
        nameControl.errors?.['required'] ||
        nameControl.errors?.['minlength'] ||
        nameControl.errors?.['maxlength'] ||
        nameControl.errors?.['pattern']
      )
    );
  }
}


