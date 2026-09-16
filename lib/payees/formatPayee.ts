import type { Payee } from '@/types/payee';

/**
 * Masks all but the last four digits for display. Anything shorter than five
 * digits is masked entirely rather than shown, so a short or malformed value
 * can never leak in full.
 */
export function maskAccountNumber(accountNumber: string): string {
  const digits = accountNumber.replace(/\D/g, '');
  if (digits.length <= 4) return '•'.repeat(digits.length);
  return `••••${digits.slice(-4)}`;
}

/**
 * The label to show for a payee. Falls back to the institution's account name
 * when the customer has not set a nickname, or has cleared it to blank.
 */
export function payeeDisplayName(payee: Payee): string {
  return payee.nickname?.trim() || payee.accountName;
}
