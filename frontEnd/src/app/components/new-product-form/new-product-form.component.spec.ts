import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductEntryFormComponent } from './new-product-form.component';

describe('InventoryFormComponent', () => {
  let component: NewProductEntryFormComponent;
  let fixture: ComponentFixture<NewProductEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewProductEntryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProductEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
