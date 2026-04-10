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
    { id: '1-20260410-11', date: '2026.04.10', time: '19:08:44', channel: 'CMS지급', recipient: 'SK인텔릭스요금', type: '출금', amount: 17000 },
    { id: '1-20260410-1', date: '2026.04.10', time: '18:30:12', channel: 'FB자동', recipient: '와이제이하우', type: '출금', amount: 44000 },
    { id: '1-20260410-2', date: '2026.04.10', time: '18:29:33', channel: '이체', recipient: '라힘컴퍼니', type: '출금', amount: 296000 },
    { id: '1-20260410-12', date: '2026.04.10', time: '18:03:00', channel: '자동이체', recipient: '통신SKB6527845508', type: '출금', amount: 55000 },
    { id: '1-20260410-3', date: '2026.04.10', time: '18:01:05', channel: '모바일', recipient: '정훈영', type: '출금', amount: 100000 },
    { id: '1-20260410-4', date: '2026.04.10', time: '17:58:35', channel: '모바일', recipient: '정훈영', type: '출금', amount: 100000 },
    { id: '1-20260410-5', date: '2026.04.10', time: '17:56:01', channel: '모바일', recipient: '정훈영', type: '출금', amount: 700000 },
    { id: '1-20260410-7', date: '2026.04.10', time: '14:05:46', channel: '오픈뱅킹', recipient: '신한오픈전효빈', type: '출금', amount: 200000 },
    { id: '1-20260410-8', date: '2026.04.10', time: '15:37:33', channel: '지로', recipient: '한국토지주택공사', type: '출금', amount: 218715 },
    { id: '1-20260410-10', date: '2026.04.10', time: '15:45:15', channel: '펌뱅킹 이체', recipient: '(주)탑앤스카우트', type: '입금', amount: 2030580 },
    { id: '1-20260310-1', date: '2026.03.10', time: '18:30:12', channel: 'FB자동', recipient: '와이제이하우', type: '출금', amount: 44000 },
    { id: '1-20260310-2', date: '2026.03.10', time: '18:29:33', channel: '이체', recipient: '라힘컴퍼니', type: '출금', amount: 296000 },
    { id: '1-20260310-3', date: '2026.03.10', time: '18:01:05', channel: '모바일', recipient: '정훈영', type: '출금', amount: 100000 },
    { id: '1-20260310-4', date: '2026.03.10', time: '17:58:35', channel: '모바일', recipient: '정훈영', type: '출금', amount: 100000 },
    { id: '1-20260310-5', date: '2026.03.10', time: '17:56:01', channel: '모바일', recipient: '정훈영', type: '출금', amount: 700000 },
    { id: '1-20260310-7', date: '2026.03.10', time: '16:57:46', channel: '오픈뱅킹', recipient: '신한오픈전효빈', type: '출금', amount: 250000 },
    { id: '1-20260310-8', date: '2026.03.10', time: '15:37:33', channel: '지로', recipient: '한국토지주택공사', type: '출금', amount: 218715 },
    { id: '1-20260310-10', date: '2026.03.10', time: '12:45:15', channel: '펌뱅킹 이체', recipient: '(주)탑앤스카우트', type: '입금', amount: 2030580 },
    { id: '1-20260307-1', date: '2026.03.07', time: '17:29:08', channel: '펌뱅킹출금', recipient: '롯데 G-car', type: '출금', amount: 41940 },
    { id: '1-20260307-2', date: '2026.03.07', time: '15:32:05', channel: 'ATM출금', recipient: 'ATM현금', type: '출금', amount: 100000 },
    { id: '1-20260225-1', date: '2026.02.25', time: '09:00:00', channel: '모바일', recipient: '정훈영', type: '출금', amount: 700000 },
    { id: '1-20260225-2', date: '2026.02.25', time: '09:00:00', channel: '모바일', recipient: '정훈영', type: '출금', amount: 100000 },
    { id: '1-20260225-3', date: '2026.02.25', time: '09:00:00', channel: '모바일', recipient: '정훈영', type: '출금', amount: 100000 },
    { id: '1-20260210-1', date: '2026.02.10', time: '18:30:12', channel: 'FB자동', recipient: '와이제이하우', type: '출금', amount: 44000 },
    { id: '1-20260210-2', date: '2026.02.10', time: '18:29:33', channel: '이체', recipient: '라힘컴퍼니', type: '출금', amount: 296000 },
    { id: '1-20260210-3', date: '2026.02.10', time: '15:37:33', channel: '지로', recipient: '한국토지주택공사', type: '출금', amount: 218715 },
    { id: '1-2026-02-08-in', date: '2026.02.08', time: '09:32:53', channel: '타행모바일뱅킹', recipient: '전효빈', type: '입금', amount: 2000000 },
    { id: '1-2026-02-05-out', date: '2026.02.05', time: '19:50:35', channel: '모바일', recipient: '정훈영', type: '출금', amount: 10000 },
    { id: '1-1', date: '2025.01.24', time: '12:39:37', channel: '모바일', recipient: '정훈영', type: '입금', amount: 100000 },
    { id: '1-2', date: '2024.12.20', time: '16:12:53', channel: '모바일', recipient: '정훈영', type: '입금', amount: 100000 },
    { id: '1-3', date: '2024.11.15', time: '14:20:00', channel: '모바일', recipient: '정훈영', type: '입금', amount: 50000 },
    { id: '1-4', date: '2024.10.10', time: '09:12:10', channel: '모바일', recipient: '정훈영', type: '입금', amount: 50000 },
    { id: '1-555', date: '2024.10.10', time: '09:12:10', channel: '모바일', recipient: '정훈영', type: '출금', amount: 1100000 },
  ],
  '2': [
    /*
    { id: '2-w-ybj-1', date: '2026.04.04', time: '16:15:13', channel: '모바일', recipient: '여병준', type: '출금', amount: 10128800 },
    { id: '2-w-jhy-1', date: '2026.04.02', time: '13:10:05', channel: '오픈뱅킹 이체', recipient: '정훈영', type: '입금', amount: 3000000 },
    { id: '2-w-jhy-6', date: '2026.04.02', time: '12:12:15', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 22000 },
    { id: '2-w-lyi-1', date: '2026.04.04', time: '12:30:15', channel: '타행모바일뱅킹', recipient: '이용익', type: '입금', amount: 5000000 },
    { id: '2-cp-12', date: '2026.03.28', time: '18:26:29', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 19400 },
    { id: '2-gen-1', date: '2026.03.26', time: '11:53:39', channel: '펌뱅킹 이체', recipient: '정해나', type: '입금', amount: 2000000 },
    { id: '2-w-jy-0', date: '2026.03.25', time: '09:15:00', channel: '모바일', recipient: '정영상', type: '출금', amount: 3000000 },
    { id: '2-cp-11', date: '2026.03.24', time: '21:33:21', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 19000 },
    { id: '2-w-woori-0', date: '2026.03.24', time: '09:07:07', channel: '펌뱅킹 이체', recipient: '우리금융저축', type: '출금', amount: 381120 },
    { id: '2-cp-10', date: '2026.03.21', time: '22:24:52', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 29700 },
    { id: '2-cp-9', date: '2026.03.19', time: '17:28:08', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 18400 },
    { id: '2-cp-8', date: '2026.03.17', time: '23:31:23', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 28700 },
    { id: '2-w-yms-0', date: '2026.03.17', time: '16:20:25', channel: '오픈뱅킹 이체', recipient: '기업 윤명선', type: '출금', amount: 400000 },
    { id: '2-cp-7', date: '2026.03.13', time: '13:43:45', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 17800 },
    { id: '2-cp-6', date: '2026.03.12', time: '14:02:20', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 20200 },
    { id: '2-gen-2', date: '2026.03.11', time: '17:05:54', channel: '모바일이체', recipient: '조신자', type: '입금', amount: 4000000 },
    { id: '2-cp-5', date: '2026.03.10', time: '23:20:04', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 27600 },
    { id: '2-w-ski-0', date: '2026.03.10', time: '19:08:44', channel: 'CMS지급', recipient: 'SK인텔릭스요금', type: '출금', amount: 17000 },
    { id: '2-w-yj-0', date: '2026.03.10', time: '18:30:12', channel: 'FB자동', recipient: '와이제이하우', type: '출금', amount: 88000 },
    { id: '2-w-rh-0', date: '2026.03.10', time: '18:29:33', channel: 'FB자동', recipient: '라힘컴퍼니', type: '출금', amount: 516000 },
    { id: '2-w-skt-0', date: '2026.03.10', time: '18:03:00', channel: '자동이체', recipient: '통신SKB6527845508', type: '출금', amount: 55000 },
    { id: '2-cp-4', date: '2026.03.09', time: '21:15:28', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 14700 },
    { id: '2-gen-3', date: '2026.03.08', time: '13:57:18', channel: '타행모바일뱅킹', recipient: '조신자', type: '입금', amount: 2500000 },
    { id: '2-cp-3', date: '2026.03.08', time: '13:17:01', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 19000 },
    { id: '2-cp-2', date: '2026.03.07', time: '14:11:26', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 24300 },
    { id: '2-gen-4', date: '2026.03.05', time: '10:41:56', channel: '타행모바일뱅킹', recipient: '조신자', type: '입금', amount: 3500000 },
    { id: '2-cp-1', date: '2026.03.04', time: '19:16:44', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 29500 },
    { id: '2-cp-0', date: '2026.03.03', time: '20:17:12', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 33800 },
    { id: '2-w-hkc-0', date: '2026.03.01', time: '10:15:00', channel: 'CMS지급', recipient: '한국캐피탈(주)', type: '출금', amount: 883200 },
    { id: '2-w-lh-0', date: '2026.03.01', time: '10:00:00', channel: '지로', recipient: '한국토지주택공사', type: '출금', amount: 467800 },
    { id: '2-cp-25', date: '2026.02.27', time: '12:07:06', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 19800 },
    { id: '2-cp-24', date: '2026.02.26', time: '23:08:25', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 27700 },
    { id: '2-w-ydw-1', date: '2026.02.26', time: '14:20:10', channel: '모바일', recipient: '윤도원', type: '출금', amount: 7800000 },
    { id: '2-cp-23', date: '2026.02.25', time: '19:14:09', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 21300 },
    { id: '2-w-jy-1', date: '2026.02.25', time: '09:15:00', channel: '모바일', recipient: '정영상', type: '출금', amount: 3000000 },
    { id: '2-w-woori-1', date: '2026.02.24', time: '09:05:34', channel: '펌뱅킹 이체', recipient: '우리금융저축', type: '출금', amount: 381120 },
    { id: '2-cp-22', date: '2026.02.23', time: '13:58:23', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 18100 },
    { id: '2-cp-21', date: '2026.02.22', time: '18:38:53', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 25800 },
    { id: '2-cp-20', date: '2026.02.21', time: '23:11:23', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 26500 },
    { id: '2-cp-19', date: '2026.02.18', time: '19:57:10', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 25300 },
    { id: '2-gen-5', date: '2026.02.18', time: '09:21:22', channel: '모바일이체', recipient: '이복만', type: '입금', amount: 2000000 },
    { id: '2-cp-18', date: '2026.02.17', time: '18:10:10', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 24200 },
    { id: '2-w-yms-1', date: '2026.02.17', time: '17:24:13', channel: '오픈뱅킹 이체', recipient: '기업 윤명선', type: '출금', amount: 400000 },
    { id: '2-gen-6', date: '2026.02.16', time: '14:08:20', channel: '모바일이체', recipient: '노민호', type: '입금', amount: 3500000 },
    { id: '2-cp-17', date: '2026.02.13', time: '13:32:52', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 18400 },
    { id: '2-w-hbm-1', date: '2026.02.12', time: '14:28:27', channel: '체크카드', recipient: '하이봄성형외과', type: '출금', amount: 2000000 },
    { id: '2-cp-16', date: '2026.02.12', time: '13:21:45', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 21100 },
    { id: '2-gen-7', date: '2026.02.12', time: '13:14:12', channel: '모바일이체', recipient: '이복만', type: '입금', amount: 3500000 },
    { id: '2-w-ski-1', date: '2026.02.10', time: '19:01:01', channel: 'CMS지급', recipient: 'SK인텔릭스요금', type: '출금', amount: 17000 },
    { id: '2-w-yj-1', date: '2026.02.10', time: '18:30:12', channel: 'FB자동', recipient: '와이제이하우', type: '출금', amount: 88000 },
    { id: '2-w-rh-1', date: '2026.02.10', time: '18:29:33', channel: 'FB자동', recipient: '라힘컴퍼니', type: '출금', amount: 516000 },
    { id: '2-w-skt-1', date: '2026.02.10', time: '18:08:01', channel: '자동이체', recipient: '통신SKB6527845508', type: '출금', amount: 55000 },
    { id: '2-cp-15', date: '2026.02.05', time: '19:49:24', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 21700 },
    { id: '2-gen-8', date: '2026.02.05', time: '11:50:57', channel: '펌뱅킹 이체', recipient: '정해나', type: '입금', amount: 4000000 },
    { id: '2-cp-14', date: '2026.02.03', time: '11:17:45', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 23500 },
    { id: '2-cp-13', date: '2026.02.01', time: '14:51:51', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 28300 },
    { id: '2-w-hkc-1', date: '2026.02.01', time: '10:15:00', channel: 'CMS지급', recipient: '한국캐피탈(주)', type: '출금', amount: 883200 },
    { id: '2-w-lh-1', date: '2026.02.01', time: '10:00:00', channel: '지로', recipient: '한국토지주택공사', type: '출금', amount: 467800 },
    { id: '2-w-ybj-2', date: '2026.01.28', time: '09:44:28', channel: '모바일', recipient: '여병준', type: '출금', amount: 12152000 },
    { id: '2-cp-38', date: '2026.01.27', time: '14:25:53', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 22900 },
    { id: '2-w-jy-2', date: '2026.01.25', time: '09:15:00', channel: '모바일', recipient: '정영상', type: '출금', amount: 3000000 },
    { id: '2-cp-37', date: '2026.01.24', time: '23:30:36', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 14800 },
    { id: '2-w-woori-2', date: '2026.01.24', time: '09:09:55', channel: '펌뱅킹 이체', recipient: '우리금융저축', type: '출금', amount: 381120 },
    { id: '2-cp-36', date: '2026.01.22', time: '18:10:06', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 16000 },
    { id: '2-cp-35', date: '2026.01.20', time: '13:20:33', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 28700 },
    { id: '2-gen-9', date: '2026.01.19', time: '15:28:56', channel: '모바일이체', recipient: '노민호', type: '입금', amount: 3000000 },
    { id: '2-cp-34', date: '2026.01.18', time: '17:33:45', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 15100 },
    { id: '2-w-yms-2', date: '2026.01.17', time: '17:35:35', channel: '오픈뱅킹 이체', recipient: '기업 윤명선', type: '출금', amount: 400000 },
    { id: '2-gen-10', date: '2026.01.17', time: '12:14:37', channel: '모바일이체', recipient: '이복만', type: '입금', amount: 4000000 },
    { id: '2-cp-33', date: '2026.01.16', time: '21:31:43', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 20000 },
    { id: '2-cp-32', date: '2026.01.14', time: '23:06:25', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 18300 },
    { id: '2-w-ski-2', date: '2026.01.10', time: '19:03:49', channel: 'CMS지급', recipient: 'SK인텔릭스요금', type: '출금', amount: 17000 },
    { id: '2-w-yj-2', date: '2026.01.10', time: '18:30:12', channel: 'FB자동', recipient: '와이제이하우', type: '출금', amount: 88000 },
    { id: '2-w-rh-2', date: '2026.01.10', time: '18:29:33', channel: 'FB자동', recipient: '라힘컴퍼니', type: '출금', amount: 516000 },
    { id: '2-w-skt-2', date: '2026.01.10', time: '18:03:01', channel: '자동이체', recipient: '통신SKB6527845508', type: '출금', amount: 55000 },
    { id: '2-cp-31', date: '2026.01.10', time: '11:16:16', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 32700 },
    { id: '2-cp-30', date: '2026.01.09', time: '23:12:42', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 32600 },
    { id: '2-cp-29', date: '2026.01.08', time: '11:34:40', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 18200 },
    { id: '2-gen-11', date: '2026.01.07', time: '17:14:34', channel: '모바일이체', recipient: '정경철', type: '입금', amount: 3000000 },
    { id: '2-cp-28', date: '2026.01.06', time: '21:45:58', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 13300 },
    { id: '2-gen-12', date: '2026.01.06', time: '16:56:13', channel: '모바일이체', recipient: '정경철', type: '입금', amount: 2500000 },
    { id: '2-cp-27', date: '2026.01.05', time: '18:33:46', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 24900 },
    { id: '2-w-ydw-2', date: '2026.01.04', time: '11:10:05', channel: '모바일', recipient: '윤도원', type: '출금', amount: 6200000 },
    { id: '2-cp-26', date: '2026.01.02', time: '13:12:06', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 26000 },
    { id: '2-w-hkc-2', date: '2026.01.01', time: '10:15:00', channel: 'CMS지급', recipient: '한국캐피탈(주)', type: '출금', amount: 883200 },
    { id: '2-w-lh-2', date: '2026.01.01', time: '10:00:00', channel: '지로', recipient: '한국토지주택공사', type: '출금', amount: 467800 },
    { id: '2-cp-51', date: '2025.12.25', time: '19:36:39', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 14000 },
    { id: '2-w-jy-3', date: '2025.12.25', time: '09:15:00', channel: '모바일', recipient: '정영상', type: '출금', amount: 3000000 },
    { id: '2-gen-13', date: '2025.12.24', time: '14:21:03', channel: '타행모바일뱅킹', recipient: '조신자', type: '입금', amount: 3000000 },
    { id: '2-cp-50', date: '2025.12.24', time: '12:21:08', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 27700 },
    { id: '2-w-woori-3', date: '2025.12.24', time: '09:08:42', channel: '펌뱅킹 이체', recipient: '우리금융저축', type: '출금', amount: 381120 },
    { id: '2-cp-49', date: '2025.12.22', time: '19:50:59', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 25600 },
    { id: '2-cp-48', date: '2025.12.19', time: '18:56:52', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 19500 },
    { id: '2-gen-14', date: '2025.12.19', time: '11:50:15', channel: '모바일이체', recipient: '노민호', type: '입금', amount: 2000000 },
    { id: '2-gen-15', date: '2025.12.17', time: '16:14:11', channel: '모바일이체', recipient: '조신자', type: '입금', amount: 3500000 },
    { id: '2-w-yms-3', date: '2025.12.17', time: '16:10:18', channel: '오픈뱅킹 이체', recipient: '기업 윤명선', type: '출금', amount: 400000 },
    { id: '2-cp-47', date: '2025.12.17', time: '11:36:04', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 30300 },
    { id: '2-cp-46', date: '2025.12.16', time: '14:49:12', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 33200 },
    { id: '2-cp-45', date: '2025.12.15', time: '11:10:49', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 29300 },
    { id: '2-cp-44', date: '2025.12.12', time: '23:52:06', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 26600 },
    { id: '2-w-ski-3', date: '2025.12.10', time: '19:02:15', channel: 'CMS지급', recipient: 'SK인텔릭스요금', type: '출금', amount: 17000 },
    { id: '2-w-yj-3', date: '2025.12.10', time: '18:30:12', channel: 'FB자동', recipient: '와이제이하우', type: '출금', amount: 88000 },
    { id: '2-w-rh-3', date: '2025.12.10', time: '18:29:33', channel: 'FB자동', recipient: '라힘컴퍼니', type: '출금', amount: 516000 },
    { id: '2-w-skt-3', date: '2025.12.10', time: '18:08:30', channel: '자동이체', recipient: '통신SKB6527845508', type: '출금', amount: 55000 },
    { id: '2-cp-43', date: '2025.12.09', time: '22:22:03', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 16500 },
    { id: '2-cp-42', date: '2025.12.08', time: '13:27:30', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 22400 },
    { id: '2-cp-41', date: '2025.12.06', time: '11:02:09', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 13000 },
    { id: '2-cp-40', date: '2025.12.03', time: '19:44:45', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 18700 },
    { id: '2-gen-16', date: '2025.12.03', time: '10:06:33', channel: '펌뱅킹 이체', recipient: '정해나', type: '입금', amount: 3500000 },
    { id: '2-cp-39', date: '2025.12.02', time: '11:05:21', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 22100 },
    { id: '2-w-hkc-3', date: '2025.12.01', time: '10:15:00', channel: 'CMS지급', recipient: '한국캐피탈(주)', type: '출금', amount: 883200 },
    { id: '2-w-lh-3', date: '2025.12.01', time: '10:00:00', channel: '지로', recipient: '한국토지주택공사', type: '출금', amount: 467800 },
    { id: '2-cp-64', date: '2025.11.25', time: '18:35:25', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 19100 },
    { id: '2-w-jy-4', date: '2025.11.25', time: '09:15:00', channel: '모바일', recipient: '정영상', type: '출금', amount: 3000000 },
    { id: '2-w-woori-4', date: '2025.11.24', time: '09:05:08', channel: '펌뱅킹 이체', recipient: '우리금융저축', type: '출금', amount: 381120 },
    { id: '2-cp-63', date: '2025.11.23', time: '20:20:59', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 19900 },
    { id: '2-cp-62', date: '2025.11.22', time: '21:47:08', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 16800 },
    { id: '2-cp-61', date: '2025.11.20', time: '23:30:08', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 29700 },
    { id: '2-cp-60', date: '2025.11.19', time: '11:33:15', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 24200 },
    { id: '2-gen-17', date: '2025.11.18', time: '09:41:42', channel: '모바일이체', recipient: '정경철', type: '입금', amount: 3000000 },
    { id: '2-w-yms-4', date: '2025.11.17', time: '16:12:36', channel: '오픈뱅킹 이체', recipient: '기업 윤명선', type: '출금', amount: 400000 },
    { id: '2-gen-18', date: '2025.11.16', time: '13:24:20', channel: '모바일이체', recipient: '주형준', type: '입금', amount: 4000000 },
    { id: '2-cp-59', date: '2025.11.15', time: '23:54:04', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 25300 },
    { id: '2-cp-58', date: '2025.11.11', time: '19:50:08', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 26100 },
    { id: '2-gen-19', date: '2025.11.11', time: '17:37:57', channel: '타행모바일뱅킹', recipient: '조신자', type: '입금', amount: 3500000 },
    { id: '2-cp-57', date: '2025.11.10', time: '22:43:03', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 34100 },
    { id: '2-w-ski-4', date: '2025.11.10', time: '19:01:57', channel: 'CMS지급', recipient: 'SK인텔릭스요금', type: '출금', amount: 17000 },
    { id: '2-w-yj-4', date: '2025.11.10', time: '18:30:12', channel: 'FB자동', recipient: '와이제이하우', type: '출금', amount: 88000 },
    { id: '2-w-rh-4', date: '2025.11.10', time: '18:29:33', channel: 'FB자동', recipient: '라힘컴퍼니', type: '출금', amount: 516000 },
    { id: '2-w-skt-4', date: '2025.11.10', time: '18:02:00', channel: '자동이체', recipient: '통신SKB6527845508', type: '출금', amount: 55000 },
    { id: '2-cp-56', date: '2025.11.09', time: '19:32:45', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 13000 },
    { id: '2-cp-55', date: '2025.11.07', time: '20:02:37', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 32300 },
    { id: '2-cp-54', date: '2025.11.05', time: '23:53:59', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 15300 },
    { id: '2-cp-53', date: '2025.11.03', time: '19:24:44', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 29000 },
    { id: '2-gen-20', date: '2025.11.03', time: '13:47:50', channel: '모바일이체', recipient: '이복만', type: '입금', amount: 3000000 },
    { id: '2-cp-52', date: '2025.11.02', time: '17:29:19', channel: '펌뱅킹 이체', recipient: '쿠팡이츠', type: '출금', amount: 29000 },
    { id: '2-w-hkc-4', date: '2025.11.01', time: '10:15:00', channel: 'CMS지급', recipient: '한국캐피탈(주)', type: '출금', amount: 883200 },
    { id: '2-w-lh-4', date: '2025.11.01', time: '10:00:00', channel: '지로', recipient: '한국토지주택공사', type: '출금', amount: 467800 },
    */
  ],
  '3': [],
  '4': [
    { id: '4-20260310-6', date: '2026.04.10', time: '18:01:05', channel: '모바일', recipient: '정훈영', type: '입금', amount: 100000 },
    { id: '4-20260310-1', date: '2026.03.10', time: '18:01:05', channel: '모바일', recipient: '정훈영', type: '입금', amount: 100000 },
    ...buildCheongyakDeposits(),
  ],
  '5': [
    { id: '5-20260310-5', date: '2026.04.10', time: '17:58:35', channel: '모바일', recipient: '정훈영', type: '입금', amount: 100000 },
    { id: '5-20260310-1', date: '2026.03.10', time: '17:58:35', channel: '모바일', recipient: '정훈영', type: '입금', amount: 100000 },
    { id: '5-2025-09', date: '2025.09.25', time: '09:00:00', channel: '모바일', recipient: '정훈영', type: '입금', amount: 100000 },
    { id: '5-2025-10', date: '2025.10.25', time: '09:00:00', channel: '모바일', recipient: '정훈영', type: '입금', amount: 100000 },
    { id: '5-2025-11', date: '2025.11.25', time: '09:00:00', channel: '모바일', recipient: '정훈영', type: '입금', amount: 100000 },
    { id: '5-2025-12', date: '2025.12.25', time: '09:00:00', channel: '모바일', recipient: '정훈영', type: '입금', amount: 100000 },
    { id: '5-2026-01', date: '2026.01.25', time: '09:00:00', channel: '모바일', recipient: '정훈영', type: '입금', amount: 100000 },
  ],
  '6': [
    { id: '6-20260310-22', date: '2026.04.10', time: '17:56:01', channel: '모바일', recipient: '정훈영', type: '입금', amount: 700000 },
    { id: '6-20260310-1', date: '2026.03.10', time: '17:56:01', channel: '모바일', recipient: '정훈영', type: '입금', amount: 700000 },
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
