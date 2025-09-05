import { TestBed } from '@angular/core/testing';

import { InvestmentCalculator } from './investment-calculator';

describe('InvestmentCalculator', () => {
  let service: InvestmentCalculator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentCalculator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
