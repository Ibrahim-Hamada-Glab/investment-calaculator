import { Component, input, ChangeDetectionStrategy, computed } from '@angular/core';
import { InvestmentResult } from '../models/model';
import { CommonModule } from '@angular/common';
import { InvestmentChart } from '../investment-chart/investment-chart';

@Component({
  selector: 'app-investment-report',
  imports: [CommonModule, InvestmentChart],
  templateUrl: './investment-report.html',
  styleUrl: './investment-report.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestmentReport {
  investmentResults = input.required<InvestmentResult[]>();
  
  // Computed properties for better performance
  totalInvestment = computed(() => {
    const results = this.investmentResults();
    return results.length > 0 ? results[results.length - 1].InvestmentCapital : 0;
  });
  
  totalInterest = computed(() => {
    const results = this.investmentResults();
    return results.length > 0 ? results[results.length - 1].TotalInterest : 0;
  });
  
  finalValue = computed(() => {
    const results = this.investmentResults();
    return results.length > 0 ? results[results.length - 1].InvestmentValue : 0;
  });
  
  totalReturn = computed(() => {
    const investment = this.totalInvestment();
    const interest = this.totalInterest();
    return investment > 0 ? (interest / investment) * 100 : 0;
  });
}
