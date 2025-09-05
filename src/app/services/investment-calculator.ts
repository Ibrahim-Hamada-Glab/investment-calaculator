import { Injectable } from '@angular/core';
import { UserInput, InvestmentResult } from '../models/model';

/**
 * Service responsible for calculating investment projections
 * Handles compound interest calculations with annual contributions
 */
@Injectable({
  providedIn: 'root'
})
export class InvestmentCalculator {

  /**
   * Calculates investment projection over the specified period
   * @param userInput - User input parameters for calculation
   * @returns Array of yearly investment results
   * @throws Error if input validation fails
   */
  calculate(userInput: UserInput): InvestmentResult[] {
    this.validateInput(userInput);
    
    const investmentResults: InvestmentResult[] = [];
    const investmentRate = userInput.expectedReturn / 100;
    
    // Calculate first year
    const firstYearInterest = investmentRate * userInput.initialInvestment;
    const firstYearCapital = userInput.initialInvestment + userInput.annualContribution;
    const firstYearTotalInterest = firstYearInterest;
    const firstYearValue = firstYearCapital + firstYearInterest;
    
    investmentResults.push({
      year: 1,
      InvestmentValue: this.roundToTwoDecimals(firstYearValue),
      Interest: this.roundToTwoDecimals(firstYearInterest),
      TotalInterest: this.roundToTwoDecimals(firstYearTotalInterest),
      InvestmentCapital: this.roundToTwoDecimals(firstYearCapital),
    });
    
    // Calculate remaining years
    for (let i = 1; i < userInput.investmentPeriod; i++) {
      const previousYear = investmentResults[i - 1];
      const yearInterest = investmentRate * previousYear.InvestmentValue;
      const yearTotalInterest = previousYear.TotalInterest + yearInterest;
      const yearCapital = previousYear.InvestmentCapital + userInput.annualContribution;
      const yearValue = yearCapital + yearTotalInterest;
      
      investmentResults.push({
        year: i + 1,
        InvestmentValue: this.roundToTwoDecimals(yearValue),
        Interest: this.roundToTwoDecimals(yearInterest),
        TotalInterest: this.roundToTwoDecimals(yearTotalInterest),
        InvestmentCapital: this.roundToTwoDecimals(yearCapital),
      });
    }
     
    return investmentResults;
  }

  /**
   * Validates user input parameters
   * @param userInput - Input to validate
   * @throws Error if validation fails
   */
  private validateInput(userInput: UserInput): void {
    if (!userInput) {
      throw new Error('User input is required');
    }

    if (userInput.initialInvestment < 0) {
      throw new Error('Initial investment cannot be negative');
    }

    if (userInput.annualContribution < 0) {
      throw new Error('Annual contribution cannot be negative');
    }

    if (userInput.expectedReturn < 0 || userInput.expectedReturn > 100) {
      throw new Error('Expected return must be between 0% and 100%');
    }

    if (userInput.investmentPeriod < 1 || userInput.investmentPeriod > 100) {
      throw new Error('Investment period must be between 1 and 100 years');
    }

    // Check for reasonable limits to prevent calculation overflow
    if (userInput.initialInvestment > 100000000) {
      throw new Error('Initial investment too large (max $100,000,000)');
    }

    if (userInput.annualContribution > 10000000) {
      throw new Error('Annual contribution too large (max $10,000,000)');
    }
  }

  /**
   * Rounds number to 2 decimal places
   * @param value - Number to round
   * @returns Rounded number
   */
  private roundToTwoDecimals(value: number): number {
    return Math.round(value * 100) / 100;
  }

  /**
   * Calculates total return percentage
   * @param totalInvestment - Total amount invested
   * @param totalInterest - Total interest earned
   * @returns Return percentage
   */
  calculateTotalReturn(totalInvestment: number, totalInterest: number): number {
    if (totalInvestment === 0) return 0;
    return this.roundToTwoDecimals((totalInterest / totalInvestment) * 100);
  }

  /**
   * Calculates compound interest for a given principal and rate
   * @param principal - Initial amount
   * @param rate - Annual interest rate (as decimal)
   * @param time - Time period in years
   * @returns Compound interest amount
   */
  calculateCompoundInterest(principal: number, rate: number, time: number): number {
    return principal * Math.pow(1 + rate, time) - principal;
  }
}
