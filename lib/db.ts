import type { Payee } from '@/types/payee';

/**
 * Thin stand-in for the generated Prisma client. The real client is wired up in
 * `lib/prisma.ts` on the deployed app; this keeps the exercise runnable offline.
 */
export interface PayeeDelegate {
  findMany(args: { where: { userId: string } }): Promise<Payee[]>;
  update(args: {
    where: { id: string };
    data: Partial<Pick<Payee, 'nickname'>>;
  }): Promise<Payee>;
  updateMany(args: {
    where: { id: string; userId: string };
    data: Partial<Pick<Payee, 'nickname'>>;
  }): Promise<{ count: number }>;
  delete(args: { where: { id: string } }): Promise<Payee>;
  deleteMany(args: {
    where: { id: string; userId: string };
  }): Promise<{ count: number }>;
}

export const db: { payee: PayeeDelegate } = {
  payee: {
    findMany: async () => [],
    update: async () => {
      throw new Error('not implemented in the exercise stub');
    },
    updateMany: async () => ({ count: 1 }),
    delete: async () => {
      throw new Error('not implemented in the exercise stub');
    },
    deleteMany: async () => ({ count: 1 }),
  },
};
