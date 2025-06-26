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
  submitResponseSuccessMessage: string = "";

  onSubmit() {
    this.submitResponseSuccessMessage = "";
    this.errors = [];
    if (this.isCategoryNameInValid) {
      this.errors.push("Category name is invalid. It must be between 3 and 255 characters long, contain only letters and spaces, and cannot be empty.");
      return;
    }
    
    const newCategoryRequest = mapToNewCategoryRequestDto(this.newCategoryForm);
    this.categoryService.submitCategory(newCategoryRequest).subscribe({
      next: () => {
        this.submitResponseSuccessMessage = "Category created successfully.";
        this.newCategoryForm.reset();
      },
      error: (error) => {
        this.errors.push(error);
      }
    });
  }

  newCategoryForm = this.formBuilder.group({
    name: ['', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]
    }]
  });

  get isCategoryNameInValid() {
    const nameControl = this.newCategoryForm.get('name');
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


