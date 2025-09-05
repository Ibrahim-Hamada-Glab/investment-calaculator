import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentReport } from './investment-report';

describe('InvestmentReport', () => {
  let component: InvestmentReport;
  let fixture: ComponentFixture<InvestmentReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
