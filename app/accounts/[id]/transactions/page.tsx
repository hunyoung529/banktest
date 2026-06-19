'use client';

import { formatCurrency } from '@/lib/format';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, MessageCircle, BarChart3, Home, ChevronDown, PieChart, ShoppingBag, Gift, Menu, Search, Check, X, Pencil, MessageSquare, Mail, Copy, Smile } from 'lucide-react';
import { useParams } from 'next/navigation';
import { getAccountById, getComputedBalanceByAccountId, getTransactionsByAccountId, isAdminUnlocked, setTransactionsOverrideByAccountId, clearTransactionsOverrideByAccountId, TRANSACTIONS_BY_ACCOUNT, type Transaction } from '@/lib/account-data';
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

  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [memoValue, setMemoValue] = useState<string>('');

  const txBalances = useMemo(() => {
    const balanceMap: Record<string, number> = {};
    if (transactions.length === 0) return balanceMap;

    const base = account?.baseBalance ?? 0;
    let currentBalance = base;

    // transactions 배열의 역순(가장 뒤에 있는 원소가 가장 과거 거래)으로 잔액을 누적 계산하되,
    // 사용자가 명시적으로 지정한 거래 후 잔액들을 정확한 고정값으로 세팅하고 연동합니다.
    for (let i = transactions.length - 1; i >= 0; i--) {
      const tx = transactions[i];

      if (tx.id === '1-20260526-160145') {
        currentBalance = 5002011;
      } else if (tx.id === '1-20260526-151306') {
        currentBalance = 2011;
      } else if (tx.id === '1-20260526-151241') {
        currentBalance = 2002011;
      } else if (tx.id === '1-20260526-151216') {
        currentBalance = 3802011;
      } else if (tx.id === '1-20260511-103408') {
        currentBalance = 20058000;
      } else if (tx.id === '1-20260511-103759') {
        currentBalance = 18058000;
      } else if (tx.id === '1-20260511-103928') {
        currentBalance = 15258000;
      } else if (tx.id === '1-20260511-113917') {
        currentBalance = 18558000;
      } else if (tx.id === '1-20260429-161116') {
        currentBalance = 4153990;
      } else if (tx.id === '1-20260429-155910') {
        currentBalance = 6003990;
      } else if (tx.id === '1-20260429-155720') {
        currentBalance = 7953990;
      } else if (tx.id === '1-20260417-154401') {
        currentBalance = 2009948;
      } else if (tx.id === '1-20260417-153246') {
        currentBalance = 3309948;
      } else if (tx.id === '1-20260413-105730') {
        currentBalance = 3686637;
      } else if (tx.id === '1-20260410-160825') {
        currentBalance = 2205889;
      } else if (tx.id === '2-w-dg-1') {
        currentBalance = 610773;
      } else if (tx.id === '2-w-dg-2') {
        currentBalance = 1210773;
      } else if (tx.id === '2-w-dg-3') {
        currentBalance = 3010773;
      } else if (tx.id === '2-w-wch-1') {
        currentBalance = 15608000;
      } else if (tx.id === '2-w-dg-4') {
        currentBalance = 13008000;
      } else if (tx.id === '2-w-dg-5') {
        currentBalance = 14608000;
      } else if (tx.id === '2-w-dg-6') {
        currentBalance = 16608000;
      } else if (tx.id.startsWith('2-w-jhy-')) {
        const num = Number(tx.id.replace('2-w-jhy-', ''));
        if (num >= 11) {
          currentBalance = 610773;
        } else {
          if (tx.type === '입금') {
            currentBalance += tx.amount;
          } else {
            currentBalance -= tx.amount;
          }
        }
      } else {
        if (tx.type === '입금') {
          currentBalance += tx.amount;
        } else {
          currentBalance -= tx.amount;
        }
      }
      balanceMap[tx.id] = currentBalance;
    }

    return balanceMap;
  }, [transactions, account]);

  const handleSaveMemo = (newMemoValue: string) => {
    if (!selectedTx) return;
    const trimmed = newMemoValue.trim().slice(0, 20); // 최대 20자 제한
    const updatedTx = { ...selectedTx, memo: trimmed };
    setSelectedTx(updatedTx);

    const nextTxs = transactions.map((t) => (t.id === selectedTx.id ? updatedTx : t));
    persist(nextTxs);
  };

  const handleTxClick = (tx: Transaction) => {
    setSelectedTx(tx);
    setMemoValue(tx.memo || '');
  };

  const getChannelDisplayName = (channel: string) => {
    if (channel === '모바일') return '타행모바일뱅킹';
    if (channel === '체크카드') return '체크카드';
    if (channel === '펌뱅킹 이체') return '펌뱅킹이체';
    if (channel === '오픈뱅킹 이체') return '오픈뱅킹이체';
    return channel;
  };

  const handleCopyTxInfo = () => {
    if (!selectedTx) return;
    const balance = txBalances[selectedTx.id] !== undefined ? formatCurrency(txBalances[selectedTx.id]) : '';
    const textToCopy = `[거래 내역 상세]
상대방: ${selectedTx.recipient}
거래일시: ${selectedTx.date} ${selectedTx.time}
거래구분: ${getChannelDisplayName(selectedTx.channel)}
거래금액: ${formatCurrency(selectedTx.amount)}
거래 후 잔액: ${balance}
메모: ${selectedTx.memo || '없음'}`;

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert("거래 내역이 클립보드에 복사되었습니다.");
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  useEffect(() => {
    setAdmin(isAdminUnlocked());
  }, []);

  useEffect(() => {
    if (accountId) {
      if (typeof window !== 'undefined') {
        const staticTxs = TRANSACTIONS_BY_ACCOUNT[accountId] || [];
        const staticHash = JSON.stringify(staticTxs.map(t => t.id));
        const storedHash = window.localStorage.getItem(`tx_static_hash_${accountId}`);

        if (storedHash !== staticHash) {
          clearTransactionsOverrideByAccountId(accountId);
          window.localStorage.setItem(`tx_static_hash_${accountId}`, staticHash);
        }
      }
      setTransactions(getTransactionsByAccountId(accountId));
    } else {
      setTransactions([]);
    }
  }, [accountId]);

  const filteredTransactions = useMemo(() => {
    let list = transactions;
    if (accountId === '1') {
      list = list.filter((tx) => tx.date >= '2026.01.01');
    }
    if (filterType === '전체') return list;
    return list.filter((tx) => tx.type === filterType);
  }, [transactions, filterType, accountId]);

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
              {filteredTransactions.length > 0
                ? `${filteredTransactions[filteredTransactions.length - 1].date}~${filteredTransactions[0].date}`
                : '2026.02.27~2026.06.15'}
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
              <div
                key={tx.id}
                className="py-4 px-2 -mx-2 border-b border-line last:border-b-0 flex justify-between gap-3 hover:bg-gray-50/80 transition-colors cursor-pointer rounded-xl"
                onClick={() => handleTxClick(tx)}
              >
                <div className="min-w-0 flex flex-col justify-center">
                  <p className="text-xs text-text-muted">
                    {tx.time} <span className="mx-1">|</span> {tx.channel}
                  </p>
                  <p className="mt-1 text-[15px] font-semibold text-text-primary truncate">{tx.recipient}</p>
                  {tx.memo && (
                    <div className="mt-1.5 flex items-center">
                      <span className="text-[11px] text-text-secondary bg-gray-100 px-2 py-0.5 rounded-md font-medium truncate max-w-[200px]">
                        {tx.memo}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0 flex flex-col justify-center items-end">
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
                      className="mt-2 text-xs relative z-10"
                      style={{ color: 'rgb(225, 29, 72)' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(tx.id);
                      }}
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

      {/* 상세 보기 오버레이 */}
      {selectedTx && (
        <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white z-50 flex flex-col h-screen overflow-hidden animate-in slide-in-from-right duration-300 shadow-2xl">
          {/* 헤더 */}
          <div className="flex items-center justify-between px-6 pt-6 pb-2 shrink-0">
            <h2 className="text-xl font-bold text-gray-900">거래내역상세</h2>
            <button
              onClick={() => setSelectedTx(null)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="상세창 닫기"
            >
              <X className="w-7 h-7 text-gray-800" strokeWidth={1.8} />
            </button>
          </div>

          {/* 본문 내용 (비율 고정 단일 뷰포트 배치) */}
          <div className="flex-1 flex flex-col pt-4 overflow-hidden">
            <div>
              {/* 상대방 이름 */}
              <div className="px-6 pb-2 text-left shrink-0">
                <h3 className="text-[26px] font-bold text-gray-900 leading-tight">
                  {selectedTx.recipient}
                </h3>
              </div>

              {/* 메모 입력창 */}
              <div className="px-6 py-2 shrink-0">
                <div className="flex items-center justify-between px-5 py-4 bg-white border border-[#D1D5DB] rounded-[16px] focus-within:border-blue-500 transition-all">
                  <input
                    type="text"
                    placeholder="메모입력(최대 20글자)"
                    maxLength={20}
                    value={memoValue}
                    onChange={(e) => setMemoValue(e.target.value)}
                    onBlur={() => handleSaveMemo(memoValue)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.currentTarget.blur();
                      }
                    }}
                    className="w-full bg-transparent outline-none text-base text-gray-800 placeholder-[#9CA3AF] font-medium"
                  />
                  <Pencil className="w-5 h-5 text-gray-700 shrink-0 ml-2" strokeWidth={1.8} />
                </div>
              </div>

              {/* 구분선 (짙은 회색의 두꺼운 실선) */}
              <div className="mx-6 mt-8 mb-6 h-[1.5px] bg-[#9CA3AF] shrink-0" />

              {/* 상세 내역 표 */}
              <div className="px-6 space-y-4 shrink-0 border-b border-gray-100 pb-5">
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] text-[15px] font-medium">거래일시</span>
                  <span className="text-gray-900 font-medium text-[15px] tracking-tight">
                    {selectedTx.date} {selectedTx.time}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] text-[15px] font-medium">거래구분</span>
                  <span className="text-gray-900 font-medium text-[15px]">
                    {getChannelDisplayName(selectedTx.channel)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] text-[15px] font-medium">거래금액</span>
                  <span
                    className="font-bold text-[15px] tracking-tight"
                    style={selectedTx.type === '입금' ? { color: '#EF4444' } : { color: '#0070ED' }}
                  >
                    {formatCurrency(selectedTx.amount)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] text-[15px] font-medium">거래 후 잔액</span>
                  <span className="text-gray-900 font-medium text-[15px] tracking-tight">
                    {txBalances[selectedTx.id] !== undefined ? formatCurrency(txBalances[selectedTx.id]) : '0원'}
                  </span>
                </div>
                <div className="flex justify-end pt-1">
                  <span
                    onClick={() => {
                      alert(`"${selectedTx.recipient}" 검색 링크를 클릭했습니다.`);
                    }}
                    className="underline text-[#9CA3AF] text-[13px] font-medium cursor-pointer hover:text-gray-600"
                  >
                    &apos;{selectedTx.recipient}&apos; 검색
                  </span>
                </div>
              </div>
            </div>

            {/* 하단 영역 (아이콘 행 + 확인 버튼) - mt-auto와 좁혀진 마진으로 원본과 비율 통일 */}
            <div className="mt-auto shrink-0 flex flex-col pb-8">
              {/* 하단 아이콘 행 */}
              <div className="mx-6">
                <div className="flex justify-around items-center">
                  {/* 메시지카드 */}
                  <button className="flex flex-col items-center gap-2 group">
                    <div className="w-14 h-14 rounded-full bg-[#F0F5FD] flex items-center justify-center hover:bg-[#E2EEFC] transition-colors shadow-sm">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 5.82 2 10.5C2 13.4 3.7 15.93 6.3 17.3L5.1 21.7C5 22.1 5.4 22.4 5.7 22.2L10.8 18.8C11.2 18.9 11.6 19 12 19C17.52 19 22 15.18 22 10.5C22 5.82 17.52 2 12 2Z" fill="#0070ED" />
                        <text x="12" y="13" fill="white" fontSize="6" fontWeight="bold" textAnchor="middle">TALK</text>
                      </svg>
                    </div>
                    <span className="text-[13px] font-medium text-gray-700">메시지카드</span>
                  </button>

                  {/* 문자 */}
                  <button className="flex flex-col items-center gap-2 group">
                    <div className="w-14 h-14 rounded-full bg-[#F0F5FD] flex items-center justify-center hover:bg-[#E2EEFC] transition-colors shadow-sm">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#0070ED" />
                      </svg>
                    </div>
                    <span className="text-[13px] font-medium text-gray-700">문자</span>
                  </button>

                  {/* 내역복사 */}
                  <button
                    onClick={handleCopyTxInfo}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#F0F5FD] flex items-center justify-center hover:bg-[#E2EEFC] transition-colors shadow-sm">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="#0070ED" />
                      </svg>
                    </div>
                    <span className="text-[13px] font-medium text-gray-700">내역복사</span>
                  </button>

                  {/* 스토리뱅크 */}
                  <button className="flex flex-col items-center gap-2 group">
                    <div className="w-14 h-14 rounded-full bg-[#F0F5FD] flex items-center justify-center hover:bg-[#E2EEFC] transition-colors shadow-sm">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12C19.8 12 20.5 11.5 21 10.7C21.7 9.5 21.7 7.7 21 6.5C20.2 5.2 18.6 4.3 16.7 4.3C15.2 4.3 13.9 4.9 13 5.8" stroke="#0070ED" strokeWidth="2" strokeLinecap="round" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 6C7.03 6 3 9.36 3 13.5C3 15.36 3.8 17.05 5.15 18.29C4.8 19.84 4.1 21.05 4.05 21.13C3.9 21.43 4.15 21.77 4.48 21.69C5.7 21.4 7.6 20.65 8.7 19.98C9.75 20.32 10.86 20.5 12 20.5C16.97 20.5 21 17.14 21 13.5C21 9.36 16.97 6 12 6ZM8 13.5C8 12.95 8.45 12.5 9 12.5C9.55 12.5 10 12.95 10 13.5C10 14.05 9.55 14.5 9 14.5C8.45 14.5 8 14.05 8 13.5ZM12 14.5C11.45 14.5 11 14.05 11 13.5C11 12.95 11.45 12.5 12 12.5C12.55 12.5 13 12.95 13 13.5C13 14.05 12.55 14.5 12 14.5ZM15 13.5C15 12.95 15.45 12.5 16 12.5C16.55 12.5 17 12.95 17 13.5C17 14.05 16.55 14.5 16 14.5C15.45 14.5 15 14.05 15 13.5Z" fill="#0070ED" />
                      </svg>
                    </div>
                    <span className="text-[13px] font-medium text-gray-700">스토리뱅크</span>
                  </button>
                </div>
              </div>

              {/* 최하단 확인 버튼 */}
              <div className="px-6 mt-5">
                <Button
                  onClick={() => setSelectedTx(null)}
                  className="w-full bg-[#0070ED] hover:bg-[#005CC7] text-white py-4.5 h-auto rounded-[16px] font-bold text-[17px] transition-colors shadow-sm"
                >
                  확인
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
