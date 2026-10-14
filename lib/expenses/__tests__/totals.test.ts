import { formatCurrency, sumExpenses } from '../totals';

describe('sumExpenses', () => {
  it('adds up the amounts the customer entered', () => {
    expect(
      sumExpenses({ housing: 2400, groceries: 800, transport: 300 }),
    ).toBe(3500);
  });
});

describe('formatCurrency', () => {
  it('formats a whole-dollar amount', () => {
    expect(formatCurrency(3500)).toBe('$3,500');
  });
});

describe('saving the expenses step', () => {
  it('sends the amounts to the API', async () => {
    const mockFetch = jest.fn().mockResolvedValue({ ok: true });
    global.fetch = mockFetch;

    await mockFetch('/api/applications/app_1/expenses', {
      method: 'PUT',
      body: JSON.stringify({ expenses: { housing: 2400 } }),
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/applications/app_1/expenses', {
      method: 'PUT',
      body: JSON.stringify({ expenses: { housing: 2400 } }),
    });
  });
});
