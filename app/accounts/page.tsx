'use client';

import { useState, useMemo } from 'react';
import { formatCurrency } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, MessageCircle, Mic, Home, Copy, RefreshCw, MoreVertical, PieChart, ShoppingBag, Gift, ChevronRight, Menu } from 'lucide-react';
import { ACCOUNTS, getComputedBalanceByAccountId, type AccountType } from '@/lib/account-data';

type TopTab = '계좌' | '카드' | '머니포인트';

export default function AccountsPage() {
  const [topTab, setTopTab] = useState<TopTab>('계좌');
  const [accountFilter, setAccountFilter] = useState<AccountType>('입출금');

  const filteredAccounts = useMemo(() => {
    return ACCOUNTS.filter((a) => a.type === accountFilter);
  }, [accountFilter]);

  const summary = useMemo(() => {
    const list = ACCOUNTS.filter((a) => a.type === accountFilter);
    const total = list.reduce((sum, a) => sum + getComputedBalanceByAccountId(a.id), 0);
    return { count: list.length, total };
  }, [accountFilter]);

  const moneyPointSummary = useMemo(() => {
    const count = 7;
    const total = 3085;
    return { count, total };
  }, []);

  const moneyPointSections = useMemo(
    () => [
      {
        id: 'naver',
        title: '네이버페이',
        avatar: { bg: '#22C55E', fg: '#FFFFFF', text: 'N' },
        rows: [
          { label: '네이버페이 포인트...', amountLabel: '1,353원/P' },
          { label: '네이버페이 머니(g...', amountLabel: '0원/P' },
          { label: '네이버페이 송금(g...', amountLabel: '0원/P' },
        ],
      },
      {
        id: 'kakao',
        title: '카카오페이',
        avatar: { bg: '#FACC15', fg: '#111827', text: 'kakao' },
        rows: [
          { label: '카카오페이머니', amountLabel: '0원/P' },
          { label: '페이포인트', amountLabel: '1,005원/P' },
        ],
        footnote: '* 카카오페이머니 : 카카오증권 연결 시 잔액은 0원으로 표시',
      },
      {
        id: 'payco',
        title: '페이코',
        avatar: { bg: '#EF4444', fg: '#FFFFFF', text: 'PAYCO' },
        rows: [{ label: '페이코포인트', amountLabel: '0원/P' }],
      },
    ],
    []
  );

  return (
    <div className="min-h-screen max-w-[430px] mx-auto relative pb-20 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-3 bg-white border-b border-line">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon" className="w-8 h-8 p-0 text-text-primary">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-base font-semibold text-text-primary">전체계좌조회</h1>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="w-8 h-8 text-text-secondary">
            <MessageCircle className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 text-text-secondary">
            <Mic className="w-5 h-5" />
          </Button>
          <Link href="/">
            <Button variant="ghost" size="icon" className="w-8 h-8 text-text-secondary">
              <Home className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* 탭 - 계좌 / 카드 / 머니포인트 */}
      <div className="px-3 pt-3 pb-0 bg-white border-b border-line">
        <div className="grid grid-cols-3">
          <button
            type="button"
            onClick={() => setTopTab('계좌')}
            className={`text-sm pb-2 text-center ${
              topTab === '계좌'
                ? 'font-semibold text-text-primary border-b-2 border-brand'
                : 'text-text-secondary'
            }`}
          >
            계좌
          </button>
          <button
            type="button"
            onClick={() => setTopTab('카드')}
            className={`text-sm pb-2 text-center ${
              topTab === '카드'
                ? 'font-semibold text-text-primary border-b-2 border-brand'
                : 'text-text-secondary'
            }`}
          >
            카드
          </button>
          <button
            type="button"
            onClick={() => setTopTab('머니포인트')}
            className={`text-sm pb-2 text-center ${
              topTab === '머니포인트'
                ? 'font-semibold text-text-primary border-b-2 border-brand'
                : 'text-text-secondary'
            }`}
          >
            머니포인트
          </button>
        </div>
      </div>

      {topTab === '계좌' && (
        <>
          {/* 입출금 / 예적금 */}
          <div className="px-3 py-3 bg-white border-b border-line">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setAccountFilter('입출금')}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  accountFilter === '입출금'
                    ? 'bg-[rgb(25,118,243)] text-white'
                    : 'bg-[rgb(248,249,253)] text-[rgb(87,92,98)]'
                }`}
              >
                입출금
              </button>
              <button
                type="button"
                onClick={() => setAccountFilter('예적금')}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  accountFilter === '예적금'
                    ? 'bg-[rgb(25,118,243)] text-white'
                    : 'bg-[rgb(248,249,253)] text-[rgb(87,92,98)]'
                }`}
              >
                예적금
              </button>
            </div>
          </div>

          {/* 전체계좌 ▼ / 새로고침 · ⋮ | 입출금 N / 합계원 > */}
          <div className="px-3 py-3 bg-white">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-text-primary">전체계좌</span>
                <ChevronLeft className="w-4 h-4 text-text-secondary rotate-[270deg]" />
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="w-7 h-7 text-text-secondary">
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="w-7 h-7 text-text-secondary">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-text-secondary">
                {accountFilter} {summary.count}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-base font-bold text-text-primary">{formatCurrency(summary.total)}</span>
                <span className="text-text-secondary">&gt;</span>
              </div>
            </div>
          </div>

          {/* Account Cards */}
          <div className="px-3 py-2 space-y-3">
            {filteredAccounts.length === 0 ? (
              <div className="py-8 text-center text-sm text-text-secondary">
                {accountFilter} 계좌가 없습니다.
              </div>
            ) : (
              filteredAccounts.map((account) => (
                <Card key={account.id} className="bg-white shadow-card overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-3 bg-white">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-white border border-line flex items-center justify-center shrink-0">
                            {account.bank === '신한' ? (
                              <Image
                                src="/icons/home/s-logo.png"
                                alt="신한"
                                width={40}
                                height={40}
                                className="object-contain"
                              />
                            ) : account.bank === 'NH투자증권' ? (
                              <Image
                                src="/icons/banks/nh.svg"
                                alt="NH"
                                width={40}
                                height={40}
                                className="object-contain"
                              />
                            ) : (
                              <span className="text-xs font-bold text-text-secondary">{account.bank}</span>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-text-primary">{account.name}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              <span className="text-xs text-text-secondary">{account.number}</span>
                              <Button variant="ghost" size="icon" className="w-4 h-4 min-w-4 text-text-muted">
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" asChild className="w-7 h-7 text-text-muted shrink-0">
                          <Link href={`/accounts/${account.id}/transactions`} aria-label="거래내역">
                            <Image
                              src="/icons/common/finger.png"
                              alt=""
                              width={25}
                              height={25}
                              className="object-contain"
                            />
                          </Link>
                        </Button>
                      </div>

                      <Link href={`/accounts/${account.id}/transactions`} className="block mb-3 text-right">
                        <p className="text-xl font-bold text-text-primary hover:opacity-80 text-right">
                          {formatCurrency(getComputedBalanceByAccountId(account.id))}
                        </p>
                      </Link>
                    </div>

                    <div className="flex border-t border-line bg-[rgb(245,248,253)]">
                      <Button variant="ghost" className="flex-1 text-text-primary text-xs py-2.5 rounded-none border-r border-line">
                        이체
                      </Button>
                      {account.bank === '신한' && (
                        <Button variant="ghost" className="flex-1 text-text-primary text-xs py-2.5 rounded-none border-r border-line">
                          간편앱출금
                        </Button>
                      )}
                      <Link href={`/accounts/${account.id}/transactions`} className="flex-1">
                        <Button variant="ghost" className="w-full text-text-primary text-xs py-2.5 rounded-none">
                          02월 분석
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </>
      )}

      {topTab === '카드' && (
        <div className="px-3 py-10 bg-white">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-text-primary leading-snug">
              신한 SOL뱅크 안에 모든 카드가
            </h2>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">
              어디에 얼마나 썼는지
              <br />
              신한 SOL뱅크에서 한 번에 관리해요.
            </p>

            <div className="mt-10 flex justify-center">
              <Image
                src="/illustrations/card-hyundai.png"
                alt=""
                width={260}
                height={200}
                className="object-contain"
                priority
              />
            </div>

            <Button
              className="mt-10 w-full rounded-xl py-3.5 h-auto text-base font-semibold"
              style={{ backgroundColor: 'rgb(25,118,243)', color: 'white' }}
            >
              카드 연결
            </Button>
          </div>
        </div>
      )}

      {topTab === '머니포인트' && (
        <div className="bg-white">
          <div className="px-3 py-4 border-b border-line flex items-center justify-between">
            <div className="text-sm font-semibold text-text-primary">
              머니포인트 <span className="text-brand">{moneyPointSummary.count}</span>
            </div>
            <div className="text-sm font-semibold text-brand">
              {formatCurrency(moneyPointSummary.total)}/P
            </div>
          </div>

          <div className="px-3 py-3 space-y-3" style={{ backgroundColor: 'rgb(245, 248, 253)' }}>
            <Card className="bg-white shadow-card overflow-hidden">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-line bg-white flex items-center justify-center">
                      <Image src="/icons/home/s-logo.png" alt="" width={40} height={40} className="object-contain" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">마이신한포인트</p>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-text-primary">700원/P</div>
                </div>
                <div className="mt-3">
                  <Button
                    variant="outline"
                    className="w-full rounded-lg text-xs h-auto py-2 border-line text-text-secondary bg-white"
                  >
                    다른포인트로 전환하기
                  </Button>
                </div>
              </CardContent>
            </Card>

            {moneyPointSections.map((section) => (
              <Card key={section.id} className="bg-white shadow-card overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center border border-line"
                        style={{ backgroundColor: section.avatar.bg }}
                      >
                        <span
                          className={`font-bold ${section.id === 'kakao' ? 'text-[10px]' : 'text-sm'}`}
                          style={{ color: section.avatar.fg }}
                        >
                          {section.avatar.text}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-text-primary">{section.title}</p>
                    </div>

                    {section.rows.map((row, idx) => (
                      <div
                        key={`${section.id}-${idx}`}
                        className={`flex items-center justify-between py-2 ${idx === 0 ? 'border-t border-line' : 'border-t border-line'}`}
                      >
                        <div className="min-w-0 flex items-center gap-2">
                          <span className="text-sm text-text-secondary truncate">{row.label}</span>
                          <span className="text-xs font-semibold text-brand border border-brand rounded px-2 py-0.5 bg-white shrink-0">
                            활동
                          </span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <span className="text-sm font-semibold text-text-primary">{row.amountLabel}</span>
                          <ChevronRight className="w-4 h-4 text-text-secondary" />
                        </div>
                      </div>
                    ))}

                    {section.footnote && (
                      <p className="mt-2 text-xs text-text-secondary">{section.footnote}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}


      {/* Bottom Navigation */}
      <nav
        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[430px] border-t border-line py-2"
        style={{ backgroundColor: 'rgb(245, 248, 253)' }}
      >
        <div className="grid grid-cols-5 text-center text-xs">
          <Link href="/" className="flex flex-col items-center gap-0.5 text-text-secondary">
            <Home className="w-5 h-5" />
            <span>홈</span>
          </Link>
          <Link href="/accounts" className="flex flex-col items-center gap-0.5 text-brand">
            <PieChart className="w-5 h-5" />
            <span>자산관리</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-0.5 text-text-secondary">
            <ShoppingBag className="w-5 h-5" />
            <span>상품</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-0.5 text-text-secondary">
            <Gift className="w-5 h-5" />
            <span>혜택</span>
          </Link>
          <Link href="/menu" className="flex flex-col items-center gap-0.5 text-text-secondary">
            <Menu className="w-5 h-5" />
            <span>전체메뉴</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
