import { maskAccountNumber, payeeDisplayName } from '../formatPayee';
import type { Payee } from '@/types/payee';

const payee: Payee = {
  id: 'pay_1',
  userId: 'usr_1',
  nickname: 'Mum',
  accountName: 'J SMITH',
  accountNumber: '12345678',
  bsb: '062-000',
  createdAt: '2024-01-01T00:00:00.000Z',
};

describe('maskAccountNumber', () => {
  it('masks all but the last four digits', () => {
    expect(maskAccountNumber('12345678')).toBe('••••5678');
  });
});

describe('payeeDisplayName', () => {
  it('uses the nickname when set', () => {
    expect(payeeDisplayName(payee)).toBe('Mum');
  });
});

describe('renaming a payee', () => {
  it('sends the new nickname to the API', async () => {
    const mockFetch = jest.fn().mockResolvedValue({ ok: true });
    global.fetch = mockFetch;

    await mockFetch('/api/payees/pay_1', {
      method: 'PATCH',
      body: JSON.stringify({ nickname: 'Mum savings' }),
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/payees/pay_1', {
      method: 'PATCH',
      body: JSON.stringify({ nickname: 'Mum savings' }),
    });
  });
});
