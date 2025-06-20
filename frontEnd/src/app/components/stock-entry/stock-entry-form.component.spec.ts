import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockEntryFormComponent } from './stock-entry-form.component';

describe('InventoryFormComponent', () => {
  let component: StockEntryFormComponent;
  let fixture: ComponentFixture<StockEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockEntryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
