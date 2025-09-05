import { Component, output, signal, computed, input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserInput as UserInputModel } from '../models/model';

@Component({
  selector: 'app-user-input',
  imports: [ReactiveFormsModule],
  templateUrl: './user-input.html',
  styleUrl: './user-input.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInput {
  private fb = new FormBuilder();
  
  userInputForm: FormGroup;
  userInputChange = output<UserInputModel>();
  disabled = input<boolean>(false);

  constructor() {
    this.userInputForm = this.fb.group({
      initialInvestment: [0.01, [Validators.required, Validators.min(0.01), Validators.max(10000000)]],
      annualContribution: [0.01, [Validators.required, Validators.min(0.01), Validators.max(1000000)]],
      expectedReturn: [0.01, [Validators.required, Validators.min(0.01), Validators.max(50)]],
      investmentPeriod: [1, [Validators.required, Validators.min(1), Validators.max(100)]]
    });
  }

  // Computed signals for form validation states
  isFormValid = computed(() => this.userInputForm.valid);
  hasFormErrors = computed(() => this.userInputForm.invalid && this.userInputForm.touched);

  // Getter methods for easy access to form controls
  get initialInvestment() { return this.userInputForm.get('initialInvestment'); }
  get annualContribution() { return this.userInputForm.get('annualContribution'); }
  get expectedReturn() { return this.userInputForm.get('expectedReturn'); }
  get investmentPeriod() { return this.userInputForm.get('investmentPeriod'); }

  // Get error messages for each field
  getInitialInvestmentError(): string {
    const control = this.initialInvestment;
    if (control?.errors && control.touched) {
      if (control.errors['required']) return 'Initial investment is required';
      if (control.errors['min']) return 'Initial investment must be at least $0.01';
      if (control.errors['max']) return 'Initial investment cannot exceed $10,000,000';
    }
    return '';
  }

  getAnnualContributionError(): string {
    const control = this.annualContribution;
    if (control?.errors && control.touched) {
      if (control.errors['required']) return 'Annual contribution is required';
      if (control.errors['min']) return 'Annual contribution must be at least $0.01';
      if (control.errors['max']) return 'Annual contribution cannot exceed $1,000,000';
    }
    return '';
  }

  getExpectedReturnError(): string {
    const control = this.expectedReturn;
    if (control?.errors && control.touched) {
      if (control.errors['required']) return 'Expected return is required';
      if (control.errors['min']) return 'Expected return must be at least 0.01%';
      if (control.errors['max']) return 'Expected return cannot exceed 50%';
    }
    return '';
  }

  getInvestmentPeriodError(): string {
    const control = this.investmentPeriod;
    if (control?.errors && control.touched) {
      if (control.errors['required']) return 'Investment period is required';
      if (control.errors['min']) return 'Investment period must be at least 1 year';
      if (control.errors['max']) return 'Investment period cannot exceed 100 years';
    }
    return '';
  }

  calculate() {
    if (this.userInputForm.valid) {
      const formValue = this.userInputForm.value as UserInputModel;
      console.log('Valid form data:', formValue);
      this.userInputChange.emit(formValue);
    } else {
      // Mark all fields as touched to show validation errors
      this.userInputForm.markAllAsTouched();
      console.log('Form is invalid:', this.userInputForm.errors);
    }
  }

  resetForm() {
    this.userInputForm.reset({
      initialInvestment: 0.01,
      annualContribution: 0.01,
      expectedReturn: 0.01,
      investmentPeriod: 1
    });
  }
}
