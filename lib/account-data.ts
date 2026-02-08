/** 계좌 타입 */
export type AccountType = '입출금' | '예적금' | '대출';

export interface Account {
  id: string;
  name: string;
  number: string;
  balance: number;
  bank: string;
  type: AccountType;
}

export interface Transaction {
  id: string;
  date: string;
  time: string;
  channel: string;
  recipient: string;
  type: '입금' | '출금';
  amount: number;
}

function toDateString(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd}`;
}

function buildCheongyakDeposits(): Transaction[] {
  const start = new Date(2022, 2, 25);
  const end = new Date(2026, 0, 25);

  const txs: Transaction[] = [];
  const cursor = new Date(start);

  while (cursor <= end) {
    const idx = txs.length;
    const amount = idx < 4 ? 20000 : 100000;
    const date = toDateString(cursor);
    txs.push({
      id: `4-${date.replaceAll('.', '')}`,
      date,
      time: '09:05:00',
      channel: '모바일',
      recipient: '정훈영',
      type: '입금',
      amount,
    });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return txs.sort((a, b) => b.date.localeCompare(a.date));
}

const ADMIN_UNLOCKED_KEY = 'admin_unlocked';
const TX_OVERRIDE_PREFIX = 'tx_override_';

/** 전체 계좌 목록 - 입출금 3개 + 예적금 1개(청년 주택드림) */
export const ACCOUNTS: Account[] = [
  {
    id: '1',
    name: '저축예금',
    number: '신한 110-409-614904',
    balance: 0,
    bank: '신한',
    type: '입출금',
  },
  {
    id: '2',
    name: '다이어트성공',
    number: '신한 110-507-968600',
    balance: 0,
    bank: '신한',
    type: '입출금',
  },
  {
    id: '3',
    name: 'QV CMA계좌',
    number: 'NH투자증권 20701504066',
    balance: 0,
    bank: 'NH투자증권',
    type: '입출금',
  },
  {
    id: '4',
    name: '청년 주택드림 청약통장(근로소득자용)',
    number: '신한 223-108-233062',
    balance: 4380000,
    bank: '신한',
    type: '예적금',
  },
  {
    id: '5',
    name: '개인형 IRP',
    number: '신한 223-120-345679',
    balance: 500000,
    bank: '신한',
    type: '예적금',
  },
  {
    id: '6',
    name: '청년도약계좌',
    number: '신한 223-121-987654',
    balance: 3500000,
    bank: '신한',
    type: '예적금',
  },
];

/** 계좌별 거래내역 - 첫 번째 이미지 형식 통일 (날짜 그룹, 시간/모바일/상대방, 입금·금액) */
export const TRANSACTIONS_BY_ACCOUNT: Record<string, Transaction[]> = {
  '1': [
    { id: '1-2026-02-08-in', date: '2026.02.08', time: '09:32:53', channel: '타행모바일뱅킹', recipient: '전효빈', type: '입금', amount: 2000000 },
    { id: '1-2026-02-05-out', date: '2026.02.05', time: '19:50:35', channel: '모바일', recipient: '정훈영', type: '출금', amount: 10000 },
    { id: '1-1', date: '2025.01.24', time: '12:39:37', channel: '모바일', recipient: '정훈영', type: '입금', amount: 100000 },
    { id: '1-2', date: '2024.12.20', time: '16:12:53', channel: '모바일', recipient: '정훈영', type: '입금', amount: 100000 },
    { id: '1-3', date: '2024.11.15', time: '14:20:00', channel: '모바일', recipient: '정훈영', type: '입금', amount: 50000 },
    { id: '1-4', date: '2024.10.10', time: '09:12:10', channel: '모바일', recipient: '정훈영', type: '입금', amount: 50000 },
  ],
  '2': [],
  '3': [],
  '4': buildCheongyakDeposits(),
  '5': [
    { id: '5-2025-09', date: '2025.09.25', time: '09:00:00', channel: '모바일', recipient: '정훈영', type: '입금', amount: 100000 },
    { id: '5-2025-10', date: '2025.10.25', time: '09:00:00', channel: '모바일', recipient: '정훈영', type: '입금', amount: 100000 },
    { id: '5-2025-11', date: '2025.11.25', time: '09:00:00', channel: '모바일', recipient: '정훈영', type: '입금', amount: 100000 },
    { id: '5-2025-12', date: '2025.12.25', time: '09:00:00', channel: '모바일', recipient: '정훈영', type: '입금', amount: 100000 },
    { id: '5-2026-01', date: '2026.01.25', time: '09:00:00', channel: '모바일', recipient: '정훈영', type: '입금', amount: 100000 },
  ],
  '6': [
    { id: '6-2026-01-700', date: '2026.01.25', time: '09:00:00', channel: '모바일', recipient: '정훈영', type: '입금', amount: 700000 },
    { id: '6-2025-12-700', date: '2025.12.25', time: '09:00:00', channel: '모바일', recipient: '정훈영', type: '입금', amount: 700000 },
    { id: '6-2025-11-700', date: '2025.11.25', time: '09:00:00', channel: '모바일', recipient: '정훈영', type: '입금', amount: 700000 },
    { id: '6-2025-10-700', date: '2025.10.25', time: '09:00:00', channel: '모바일', recipient: '정훈영', type: '입금', amount: 700000 },
    { id: '6-2025-09-700', date: '2025.09.25', time: '09:00:00', channel: '모바일', recipient: '정훈영', type: '입금', amount: 700000 },
  ],
};

/** 홈 메인 계좌 (입출금 저축예금 = id 1) */
export const HOME_MAIN_ACCOUNT_ID = '1';

export function getAccountById(id: string): Account | undefined {
  return ACCOUNTS.find((a) => a.id === id);
}

export function getTransactionsByAccountId(accountId: string): Transaction[] {
  if (typeof window !== 'undefined') {
    const raw = window.localStorage.getItem(`${TX_OVERRIDE_PREFIX}${accountId}`);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) return parsed as Transaction[];
      } catch {
        // ignore
      }
    }
  }

  return TRANSACTIONS_BY_ACCOUNT[accountId] ?? [];
}

export function getComputedBalanceByAccountId(accountId: string): number {
  const account = getAccountById(accountId);
  if (!account) return 0;

  const txs = getTransactionsByAccountId(accountId);

  if (account.type === '입출금') {
    return txs.reduce((sum, tx) => sum + (tx.type === '입금' ? tx.amount : -tx.amount), 0);
  }

  if (txs.length > 0) {
    return txs.reduce((sum, tx) => sum + (tx.type === '입금' ? tx.amount : -tx.amount), 0);
  }

  return account.balance;
}

export function isAdminUnlocked(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(ADMIN_UNLOCKED_KEY) === 'true';
}

export function setAdminUnlocked(unlocked: boolean): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ADMIN_UNLOCKED_KEY, unlocked ? 'true' : 'false');
}

export function setTransactionsOverrideByAccountId(accountId: string, txs: Transaction[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(`${TX_OVERRIDE_PREFIX}${accountId}`, JSON.stringify(txs));
}

export function clearTransactionsOverrideByAccountId(accountId: string): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(`${TX_OVERRIDE_PREFIX}${accountId}`);
}
