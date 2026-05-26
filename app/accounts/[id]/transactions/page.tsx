'use client';

import { formatCurrency } from '@/lib/format';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, MessageCircle, BarChart3, Home, ChevronDown, PieChart, ShoppingBag, Gift, Menu, Search, Check } from 'lucide-react';
import { useParams } from 'next/navigation';
import { getAccountById, getComputedBalanceByAccountId, getTransactionsByAccountId, isAdminUnlocked, setTransactionsOverrideByAccountId, type Transaction } from '@/lib/account-data';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export default function TransactionsPage() {
  const params = useParams();
  const accountId = typeof params.id === 'string' ? params.id : params.id?.[0];

  const account = useMemo(() => (accountId ? getAccountById(accountId) : undefined), [accountId]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [admin, setAdmin] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ date: '', time: '', channel: '모바일', recipient: '', type: '출금' as Transaction['type'], amount: '' });

  const [filterType, setFilterType] = useState<'전체' | '입금' | '출금'>('전체');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    setAdmin(isAdminUnlocked());
  }, []);

  useEffect(() => {
    setTransactions(accountId ? getTransactionsByAccountId(accountId) : []);
  }, [accountId]);

  const filteredTransactions = useMemo(() => {
    if (filterType === '전체') return transactions;
    return transactions.filter((tx) => tx.type === filterType);
  }, [transactions, filterType]);

  /** 날짜별 그룹 (첫 번째 이미지 형식) */
  const byDate = useMemo(() => {
    const map: Record<string, typeof transactions> = {};
    for (const tx of filteredTransactions) {
      if (!map[tx.date]) map[tx.date] = [];
      map[tx.date].push(tx);
    }
    return Object.entries(map).sort(([a], [b]) => b.localeCompare(a));
  }, [filteredTransactions]);

  function persist(next: Transaction[]) {
    if (!accountId) return;
    setTransactions(next);
    setTransactionsOverrideByAccountId(accountId, next);
  }

  function handleDelete(txId: string) {
    persist(transactions.filter((t) => t.id !== txId));
  }

  function handleOpenAdd() {
    setForm({ date: '', time: '', channel: '모바일', recipient: '', type: '출금', amount: '' });
    setAddOpen(true);
  }

  function handleAdd() {
    if (!accountId) return;
    if (!form.date || !form.time || !form.amount) return;

    const newTx: Transaction = {
      id: `${accountId}-${Date.now()}`,
      date: form.date,
      time: form.time,
      channel: form.channel || '모바일',
      recipient: form.recipient || '-',
      type: form.type,
      amount: Number(form.amount),
    };

    persist([newTx, ...transactions]);
    setAddOpen(false);
  }

  if (!account) {
    return (
      <div className="min-h-screen bg-white max-w-[430px] mx-auto flex items-center justify-center">
        <p className="text-text-secondary">계좌를 찾을 수 없습니다.</p>
        <Link href="/accounts" className="text-brand ml-2">전체계좌로</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-[430px] mx-auto relative pb-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-3 bg-white border-b border-line">
        <div className="flex items-center gap-2">
          <Link href="/accounts">
            <Button variant="ghost" size="icon" className="w-8 h-8 p-0 text-text-primary">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-base font-semibold text-text-primary">거래내역조회</h1>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="w-8 h-8 text-text-secondary">
            <MessageCircle className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 text-text-secondary">
            <BarChart3 className="w-5 h-5" />
          </Button>
          <Link href="/">
            <Button variant="ghost" size="icon" className="w-8 h-8 text-text-secondary">
              <Home className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* 계좌 정보 - 밝은 파란 배경 (첫 번째 이미지) */}
      <div className="px-3 py-4 bg-[#D7ECFF]">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white border border-line flex items-center justify-center shrink-0">
            {account.bank === '신한' ? (
              <Image src="/icons/home/s-logo.png" alt="신한" width={40} height={40} className="object-contain" />
            ) : account.bank === 'NH투자증권' ? (
              <Image src="/icons/banks/nh.svg" alt="NH" width={40} height={40} className="object-contain" />
            ) : (
              <span className="text-xs font-bold text-text-secondary">{account.bank}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm font-semibold text-text-primary leading-snug">
                {account.type} | {account.name}
              </span>
              <ChevronDown className="w-5 h-5 text-text-secondary shrink-0 mt-0.5" />
            </div>
            <p className="text-sm text-text-secondary mt-3 underline">
              {account.number}
            </p>
          </div>
        </div>

        <p className="text-[32px] font-bold text-text-primary mb-4 tracking-tight">
          {formatCurrency(getComputedBalanceByAccountId(account.id))}
        </p>

        <div className="flex gap-3">
          <Button
            className="flex-1 rounded-xl py-3 h-auto text-sm font-semibold"
            style={{ backgroundColor: 'rgb(154, 205, 255)', color: 'rgb(14, 16, 20)' }}
          >
            입금
          </Button>
          <Button
            className="flex-1 rounded-xl py-3 h-auto text-sm font-semibold"
            style={{ backgroundColor: 'rgb(154, 205, 255)', color: 'rgb(14, 16, 20)' }}
            onClick={() => setFilterOpen(true)}
          >
            계좌관리
          </Button>
        </div>
      </div>

      {/* 필터 - 검색 + 기간/정렬 + 조회기간/건수 + 잔액 토글 */}
      <div className="bg-white border-b border-line">
        <div className="px-3 py-3">
          <div className="flex items-center justify-between">
            <button type="button" className="p-0 text-text-secondary" aria-label="검색">
              <Search className="w-5 h-5" />
            </button>
            <button type="button" className="flex items-center gap-1 text-sm text-text-secondary">
              3개월・전체・최신순
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="px-3 pb-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">
              2026.02.01~ 2026.05.26
            </span>
            <button
              type="button"
              className="w-14 h-7 rounded-full relative"
              style={{ backgroundColor: 'rgb(196, 204, 214)' }}
              aria-label="잔액 표시 토글"
            >
              <span
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] font-semibold"
                style={{ color: 'rgb(255,255,255)' }}
              >
                잔액
              </span>
              <span className="absolute left-0.5 top-0.5 w-6 h-6 bg-white rounded-full shadow" />
            </button>
          </div>
        </div>
      </div>

      {/* 거래 목록 - 날짜 그룹, 스샷 레이아웃(상단 메타: 시간 | 채널, 본문: 거래명, 우측: 출금/입금 + 금액) */}
      <div className="px-3 py-2 bg-white">
        {admin && (
          <div className="pb-2">
            <Button
              className="w-full h-10 rounded-xl text-sm font-semibold"
              style={{ backgroundColor: 'rgb(25,118,243)', color: 'rgb(255,255,255)' }}
              onClick={handleOpenAdd}
            >
              거래 추가
            </Button>
          </div>
        )}
        {byDate.map(([date, list]) => (
          <div key={date} className="mb-6">
            <div className="pt-2 pb-2 border-b border-line">
              <h3 className="text-sm font-semibold text-text-secondary">{date}</h3>
            </div>
            {list.map((tx) => (
              <div key={tx.id} className="py-4 border-b border-line last:border-b-0 flex justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-text-muted">
                    {tx.time} <span className="mx-1">|</span> {tx.channel}
                  </p>
                  <p className="mt-1 text-[15px] font-semibold text-text-primary truncate">{tx.recipient}</p>
                </div>
                <div className="text-right shrink-0">
                  <p
                    className="text-xs font-semibold"
                    style={tx.type === '입금' ? { color: 'rgb(225, 29, 72)' } : { color: 'rgb(25,118,243)' }}
                  >
                    {tx.type}
                  </p>
                  <p
                    className="mt-1 text-[18px] font-bold"
                    style={tx.type === '입금' ? { color: 'rgb(225, 29, 72)' } : { color: 'rgb(25,118,243)' }}
                  >
                    {formatCurrency(tx.amount)}
                  </p>
                  {admin && (
                    <button
                      type="button"
                      className="mt-2 text-xs"
                      style={{ color: 'rgb(225, 29, 72)' }}
                      onClick={() => handleDelete(tx.id)}
                    >
                      삭제
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
        {transactions.length === 0 && (
          <div className="py-8 text-center text-sm text-text-secondary">
            거래 내역이 없습니다.
          </div>
        )}
      </div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="rounded-2xl" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-text-primary">거래 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              value={form.date}
              onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
              placeholder="날짜 (예: 2026.02.06)"
            />
            <Input
              value={form.time}
              onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
              placeholder="시간 (예: 19:50:35)"
            />
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={form.type === '입금' ? 'default' : 'outline'}
                className="h-10 rounded-xl text-sm font-semibold"
                style={form.type === '입금' ? { backgroundColor: 'rgb(225, 29, 72)', color: 'rgb(255,255,255)' } : undefined}
                onClick={() => setForm((p) => ({ ...p, type: '입금' }))}
              >
                입금
              </Button>
              <Button
                variant={form.type === '출금' ? 'default' : 'outline'}
                className="h-10 rounded-xl text-sm font-semibold"
                style={form.type === '출금' ? { backgroundColor: 'rgb(25,118,243)', color: 'rgb(255,255,255)' } : undefined}
                onClick={() => setForm((p) => ({ ...p, type: '출금' }))}
              >
                출금
              </Button>
            </div>
            <Input
              inputMode="numeric"
              value={form.amount}
              onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))}
              placeholder="금액 (숫자만)"
            />
            <Input
              value={form.channel}
              onChange={(e) => setForm((p) => ({ ...p, channel: e.target.value }))}
              placeholder="채널 (예: 모바일)"
            />
            <Input
              value={form.recipient}
              onChange={(e) => setForm((p) => ({ ...p, recipient: e.target.value }))}
              placeholder="상대방"
            />
            <Button
              className="w-full h-11 rounded-xl text-sm font-semibold"
              style={{ backgroundColor: 'rgb(25,118,243)', color: 'rgb(255,255,255)' }}
              onClick={handleAdd}
            >
              추가
            </Button>
            <Button
              variant="ghost"
              className="w-full h-11 rounded-xl text-sm font-semibold text-text-secondary"
              onClick={() => setAddOpen(false)}
            >
              취소
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Sheet Filter Popup */}
      {filterOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-[1px]"
          onClick={() => setFilterOpen(false)}
        >
          <div 
            className="bg-white w-full max-w-[430px] rounded-t-[24px] px-6 pt-4 pb-8 shadow-2xl animate-in slide-in-from-bottom duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grab Handle */}
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
            
            <h3 className="text-lg font-bold text-text-primary mb-5 text-center">
              조회 조건 선택
            </h3>
            
            <div className="space-y-2">
              {[
                { type: '전체', label: '전체 내역' },
                { type: '입금', label: '입금 내역만' },
                { type: '출금', label: '출금 내역만' }
              ].map((item) => {
                const isSelected = filterType === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    className="w-full flex items-center justify-between py-4 px-5 rounded-2xl text-[15px] font-semibold transition-all duration-200"
                    style={
                      isSelected
                        ? { backgroundColor: 'rgb(215, 236, 255)', color: 'rgb(25, 118, 243)' }
                        : { backgroundColor: 'rgb(248, 249, 253)', color: 'rgb(75, 85, 99)' }
                    }
                    onClick={() => {
                      setFilterType(item.type as any);
                      setFilterOpen(false);
                    }}
                  >
                    <span>{item.label}</span>
                    {isSelected && <Check className="w-5 h-5 text-brand" />}
                  </button>
                );
              })}
            </div>
            
            <Button
              className="w-full mt-6 py-4 h-auto rounded-2xl text-sm font-semibold text-text-secondary bg-gray-100 hover:bg-gray-200"
              onClick={() => setFilterOpen(false)}
            >
              닫기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
