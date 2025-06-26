import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { mapToNewProductRequestDto } from '../../mappers/newProductRequest.mapper';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'new-product-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-product-form.component.html',
  styleUrl: './new-product-form.component.css'
})

export class NewProductEntryFormComponent {
  private formBuilder = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);
  submitResponseSuccessMessage = "";
  errors: string[] = [];
  readonly categories = this.categoryService.getCategories();
  form = this.formBuilder.group({
    name: ['', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.pattern(/^[a-zA-Z-'\s]+$/)
      ]
    }
    ],
    category: [this.categories, {
      validators: [Validators.required]
    }],
    isImported: [false],
    price: [0, {
      validators: [Validators.required,
      Validators.min(0.01),
      Validators.pattern(/^\d+(\.\d{1,2})?$/),
      ]
    }],
    quantity: [1, {
      validators: [Validators.required,
      Validators.min(1),
      ]
    }]
  });

  ngOnInit() {
    this.categories.subscribe(categories => {
      if (categories.length > 0) {
        this.form.get('category')?.setValue(categories[0].name);
      }
    });
  }

  onSubmit() {
    this.submitResponseSuccessMessage = "";
    if (this.isFormValid()) {
      const newProductRequest = mapToNewProductRequestDto(this.form);
     this.productService.submit(newProductRequest).subscribe({
        next: () => {
          this.submitResponseSuccessMessage = "Product submitted successfully";
          this.form.reset();
        },
        error: (error) => {
          this.errors.push("Error submitting product: " + error);
        }
      });
    }
  }

  private isFormValid() {
    this.errors =[];
    if (this.form.invalid) {
      this.errors.push("Please correct the errors in the form before submitting.");
      if (this.nameIsInvaild) {
        this.errors.push("Name is invalid.");
      }
      if (this.CategoryIsInvalid) {
        this.errors.push("Category is required.");
      }
      if (this.priceIsInvalid) {
        this.errors.push("Price is invalid.");
      }
      if (this.quantityIsInvalid) {
        this.errors.push("Quantity is invalid.");
      }
    }
    return this.errors.length === 0;
  }

  get nameIsInvaild() {
    return (
      this.form.controls.name.errors?.['required'] ||
      this.form.controls.name.errors?.['minlength'] ||
      this.form.controls.name.errors?.['maxlength'] ||
      this.form.controls.name.errors?.['pattern']
    );
  }
  get CategoryIsInvalid() {
    return (
      this.form.controls.category.invalid ||
      this.form.controls.category.errors?.['required']
    )
  }
  get priceIsInvalid() {
    return (
      this.form.controls.price.invalid ||
      this.form.controls.price.errors?.['required'] ||
      this.form.controls.price.errors?.['min'] ||
      this.form.controls.price.errors?.['pattern']
    );
  }
  get quantityIsInvalid() {
    return (
      this.form.controls.quantity.invalid ||
      this.form.controls.quantity.errors?.['required'] ||
      this.form.controls.quantity.errors?.['min']
    );
  }
}