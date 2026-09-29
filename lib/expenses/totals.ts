import type { ExpenseAmounts } from '@/types/expenses';

/**
 * Sums the monthly amounts the customer has entered. Categories they have not
 * answered yet are absent from the record and are skipped, so an unanswered
 * category does not contribute to the total.
 */
export function sumExpenses(amounts: ExpenseAmounts): number {
  return Object.values(amounts).reduce<number>(
    (total, amount) => total + (amount ?? 0),
    0,
  );
}

/**
 * Formats a dollar amount for display. Whole dollars only — cents add noise to
 * a monthly budget summary without helping the customer.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(amount);
}
