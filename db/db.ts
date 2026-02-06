import Dexie, { Table } from 'dexie';
import { Account, Transaction } from '@/types/models';

export class BankDatabase extends Dexie {
  accounts!: Table<Account>;
  transactions!: Table<Transaction>;

  constructor() {
    super('BankDatabase');
    this.version(1).stores({
      accounts: 'id, name, number, type, bank',
      transactions: 'id, accountId, type, amount, date',
    });
  }
}

export const db = new BankDatabase();
