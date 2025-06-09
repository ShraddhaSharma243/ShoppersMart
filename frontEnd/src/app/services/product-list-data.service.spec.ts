import { TestBed } from '@angular/core/testing';

import { ProductListDataService } from './product-list-data.service';

describe('ProductListDataService', () => {
  let service: ProductListDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductListDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
