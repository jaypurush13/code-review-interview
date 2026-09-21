import type { ExpenseAmounts, LoanApplication } from '@/types/expenses';

/**
 * Thin stand-in for the generated Prisma client. The real client is wired up in
 * `lib/prisma.ts` on the deployed app; this keeps the exercise runnable offline.
 */
export interface ApplicationDelegate {
  findUnique(args: {
    where: { id: string };
  }): Promise<LoanApplication | null>;
  update(args: {
    where: { id: string };
    data: { expenses: ExpenseAmounts };
  }): Promise<LoanApplication>;
  updateMany(args: {
    where: { id: string; userId: string };
    data: { expenses: ExpenseAmounts };
  }): Promise<{ count: number }>;
}

const stub: LoanApplication = {
  id: 'app_00000000',
  userId: 'usr_00000000',
  expenses: {},
  updatedAt: '2026-01-01T00:00:00.000Z',
};

export const db: { application: ApplicationDelegate } = {
  application: {
    findUnique: async () => stub,
    update: async () => stub,
    updateMany: async () => ({ count: 1 }),
  },
};
