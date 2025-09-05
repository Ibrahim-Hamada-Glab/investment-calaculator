import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { UserInput } from "./user-input/user-input";
import { InvestmentResult, UserInput as UserInputModel } from "./models/model";
import { InvestmentCalculator } from './services/investment-calculator';
import { InvestmentReport } from "./investment-report/investment-report";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, UserInput, InvestmentReport],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private investmentCalculator = inject(InvestmentCalculator);
  
  protected readonly title = signal('Investment Calculator');
  showInvestmentReport = signal(false);
  isLoading = signal(false);
  
  investmentResults = signal<InvestmentResult[]>([]);
  
  async userInputChange(userInput: UserInputModel) {
    try {
      this.isLoading.set(true);
      console.log('Calculating investment for:', userInput);
      
      // Simulate async calculation for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const results = this.investmentCalculator.calculate(userInput);
      this.investmentResults.set(results);
      this.showInvestmentReport.set(true);
    } catch (error) {
      console.error('Error calculating investment:', error);
      // Handle error appropriately
    } finally {
      this.isLoading.set(false);
    }
  }
}
