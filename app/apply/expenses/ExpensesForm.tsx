'use client';

import { useState } from 'react';
import { formatCurrency, sumExpenses } from '@/lib/expenses/totals';
import {
  CATEGORY_LABELS,
  EXPENSE_CATEGORIES,
  type ExpenseAmounts,
  type ExpenseCategory,
} from '@/types/expenses';

interface ExpensesFormProps {
  applicationId: string;
  initialExpenses: ExpenseAmounts;
}

export function ExpensesForm({
  applicationId,
  initialExpenses,
}: ExpensesFormProps) {
  const [amounts, setAmounts] = useState<ExpenseAmounts>(initialExpenses);
  const [errors, setErrors] = useState<Partial<Record<ExpenseCategory, string>>>(
    {},
  );
  const [saving, setSaving] = useState(false);

  const total = sumExpenses(amounts);

  function handleChange(category: ExpenseCategory, value: string) {
    setAmounts({ ...amounts, [category]: parseFloat(value) });
  }

  function validate() {
    const next: Partial<Record<ExpenseCategory, string>> = {};

    for (const category of EXPENSE_CATEGORIES) {
      const amount = amounts[category];
      if (amount !== undefined && amount < 0) {
        next[category] = 'Enter an amount of $0 or more.';
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    setSaving(true);

    await fetch(`/api/applications/${applicationId}/expenses`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ expenses: amounts }),
    });

    setSaving(false);
    window.location.href = '/apply/review';
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Your monthly expenses</legend>

        {EXPENSE_CATEGORIES.map((category) => (
          <div key={category}>
            <label htmlFor={`expense-${category}`}>
              {CATEGORY_LABELS[category]}
            </label>
            <input
              id={`expense-${category}`}
              type="text"
              inputMode="decimal"
              value={amounts[category] ?? ''}
              onChange={(event) => handleChange(category, event.target.value)}
            />
            {errors[category] && <span>{errors[category]}</span>}
          </div>
        ))}
      </fieldset>

      <p aria-live="polite">
        Total monthly expenses: {formatCurrency(total)}
      </p>

      <button type="submit">Save and continue</button>
    </form>
  );
}
