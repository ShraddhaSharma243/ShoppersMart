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
  submitResponseErrorMessage = "";
  readonly categories = [
    { id: 1, name: 'Food' },
    { id: 2, name: 'Enytertainment' },
    { id: 3, name: 'Misc' },
    { id: 4, name: 'Clothing' },
  ];
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
    category: [this.categories[0].id],
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

  onSubmit() {
    if (this.form.invalid) {
      this.submitResponseErrorMessage = "Please correct the errors in the form before submitting.";
      if (this.nameIsInvaild) {
        this.submitResponseErrorMessage += "</br> Name is invalid.";
      }
      if (this.priceIsInvalid) {
        this.submitResponseErrorMessage += "\n Price is invalid.";
      }
      if (this.quantityIsInvalid) {
        this.submitResponseErrorMessage += "\n Quantity is invalid.";
      }
      return;
    }
    const stockItemRequest = mapTostockItemRequestDto(this.form);
    this.stockService.submit(stockItemRequest).subscribe({
      next: () => {
        this.submitResponseSuccessMessage = "Product submitted successfully";
        this.form.reset();
      },
      error: (error) => {
        this.submitResponseErrorMessage = "Error submitting product: " + error.message;
      }
    });
  }

  get nameIsInvaild() {
    return (
      (this.form.controls.name.errors?.['required'] ||
        this.form.controls.name.errors?.['minlength'] ||
        this.form.controls.name.errors?.['maxlength'] ||
        this.form.controls.name.errors?.['pattern']) &&
      this.form.controls.name.touched
    );
  }
  get priceIsInvalid() {
    return (
      (this.form.controls.price.invalid ||
        this.form.controls.price.errors?.['required'] ||
        this.form.controls.price.errors?.['min'] ||
        this.form.controls.price.errors?.['pattern']) &&
      this.form.controls.price.touched
    );
  }
  get quantityIsInvalid() {
    return (
      (this.form.controls.quantity.invalid ||
        this.form.controls.quantity.errors?.['required'] ||
        this.form.controls.quantity.errors?.['min']) &&
      this.form.controls.quantity.touched
    );
  }
}