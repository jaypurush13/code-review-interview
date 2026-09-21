/**
 * The expense categories captured in the application's expenses step. The
 * customer enters a monthly amount against each one.
 */
export const EXPENSE_CATEGORIES = [
  'housing',
  'groceries',
  'transport',
  'utilities',
  'insurance',
  'other',
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

/**
 * Monthly amounts keyed by category, in dollars. A category is absent when the
 * customer has not answered it yet — which is not the same as answering zero.
 */
export type ExpenseAmounts = Partial<Record<ExpenseCategory, number>>;

export interface LoanApplication {
  id: string;
  userId: string;
  expenses: ExpenseAmounts;
  updatedAt: string;
}

export const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  housing: 'Rent or mortgage repayments',
  groceries: 'Groceries',
  transport: 'Transport and fuel',
  utilities: 'Utilities',
  insurance: 'Insurance',
  other: 'Other regular expenses',
};
