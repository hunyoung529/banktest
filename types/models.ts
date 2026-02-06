import { z } from 'zod';

export const AccountSchema = z.object({
  id: z.string(),
  name: z.string(),
  number: z.string(),
  type: z.string(),
  balance: z.number(),
  bank: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const TransactionSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  type: z.enum(['deposit', 'withdrawal', 'transfer']),
  amount: z.number(),
  description: z.string(),
  category: z.string().optional(),
  date: z.date(),
  createdAt: z.date(),
});

export type Account = z.infer<typeof AccountSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
