import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { mapTostockItemRequestDto } from '../../mappers/stockItemRequest.mapper';

@Component({
  selector: 'app-inventory-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './stock-entry-form.component.html',
  styleUrl: './stock-entry-form.component.css'
})

export class StockEntryFormComponent {
  private formBuilder = inject(FormBuilder);
  private stockService = inject(StockService);
  submitResponseSuccessMessage = "";
  errors: string[] = [];
  readonly categories = this.stockService.getCategories();
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
      const stockItemRequest = mapTostockItemRequestDto(this.form);
      this.stockService.submit(stockItemRequest).subscribe({
        next: () => {
          this.submitResponseSuccessMessage = "Product submitted successfully";
          this.form.reset();
        },
        error: (error) => {
          this.errors.push("Error submitting product: " + error.message);
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