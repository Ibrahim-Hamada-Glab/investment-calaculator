interface UserInput {
    initialInvestment: number;
    annualContribution: number;
    expectedReturn: number;
    investmentPeriod: number;
}
interface InvestmentResult {
    year: number;
    InvestmentValue: number;
    Interest: number;
    TotalInterest: number;
    InvestmentCapital: number;
}

export type { UserInput, InvestmentResult };
