'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeft, MessageCircle, Mic, Home, ChevronUp, PieChart, ShoppingBag, Gift, Menu } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { getAccountById, getComputedBalanceByAccountId, getTransactionsByAccountId } from '@/lib/account-data';
import { formatCurrency } from '@/lib/format';

export default function AccountManagePage() {
  const params = useParams();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const accountId = typeof params.id === 'string' ? params.id : params.id?.[0];
  const account = useMemo(() => (accountId ? getAccountById(accountId) : undefined), [accountId]);

  const baseInfo = useMemo(() => {
    if (!account) return null;

    if (account.id === '4') {
      return {
        rate: '연 3.1% (변동금리)',
        joinDate: '2022.03.14',
        branch: '디지털금융센터',
        note:
          '해당 적용이율은 주택청약종합저축의 기간별 이율이며, 청년 주택드림 청약통장 적용이율은 추후 해지시점 무주택증빙서류 제출 시 적용가능함',
      };
    }

    if (account.id === '5') {
      return {
        rate: '연 3.65% (상품별 상이)',
        joinDate: '2025.09.25',
        branch: '디지털금융센터',
        note: '해당 계좌의 적용이율/수익률 및 운용현황은 상품별 기준에 따라 달라질 수 있습니다.',
      };
    }

    if (account.id === '6') {
      return {
        rate: '연 6.0% (상품별 상이)',
        joinDate: '2025.09.25',
        branch: '디지털금융센터',
        note: '해당 계좌의 적용이율/혜택은 가입조건 및 유지요건에 따라 달라질 수 있습니다.',
      };
    }

    return {
      rate: '연 0.0% (상품별 상이)',
      joinDate: '-',
      branch: '-',
      note: '',
    };
  }, [account]);

  const accordionSections = useMemo(() => {
    const sections = [{ title: '이체정보' }, { title: '계좌 인사이트' }, { title: '관리 정보' }];
    if (account?.id === '4') return [{ title: '청약 정보' }, ...sections];
    return sections;
  }, [account?.id]);

  const cheongyak = useMemo(() => {
    if (!account) return null;
    if (account.id !== '4') return null;
    const txs = getTransactionsByAccountId(account.id);
    const deposits = txs.filter((t) => t.type === '입금');
    const count = deposits.length;
    const recognizedAmount = getComputedBalanceByAccountId(account.id);
    const lastDepositDate = deposits.length > 0 ? deposits[0].date : baseInfo?.joinDate ?? '-';
    return {
      depositCount: count,
      lastDepositDate,
      recognizedCount: count,
      recognizedAmount,
    };
  }, [account, baseInfo?.joinDate]);

  const manageItems = useMemo(() => {
    const items = ['상품설명', '통장사본보기', '계좌별명 설정', '바로가기 등록'];
    if (account?.id === '4') {
      items.push('소득공제신청/해제(청약계좌)', '청약납입증명서발급');
    }
    return items;
  }, [account?.id]);

  function renderSectionContent(title: string) {
    if (title === '청약 정보') {
      return (
        <div className="mt-3 pb-2">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">청약 납입회차</span>
              <span className="text-text-primary">{cheongyak?.depositCount ?? 0}회</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">최종납입 약정일자</span>
              <span className="text-text-primary">{cheongyak?.lastDepositDate ?? '-'}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-line">
            <div className="text-sm font-semibold text-text-primary mb-3">
              청약 지역별 순위 정보 안내(청약종합저축)
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">청약지역명</span>
                <span className="text-text-primary">서울</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">순위기산일</span>
                <span className="text-text-primary">{baseInfo?.joinDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">청약가능최대평형</span>
                <span className="text-text-primary">85㎡이하</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">민영주택 1순위 발생일</span>
                <span className="text-text-primary">2024.06.03</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">국민주택 1순위 발생일</span>
                <span className="text-text-primary">2023.03.14</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">국민주택 납입인정 회차</span>
                <span className="text-text-primary">{cheongyak?.recognizedCount ?? 0}회</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">국민주택 납입인정 금액</span>
                <span className="text-text-primary">{formatCurrency(cheongyak?.recognizedAmount ?? 0)}</span>
              </div>
            </div>

            <div className="mt-4 text-xs text-text-secondary leading-relaxed space-y-2">
              <p>* 1순위 정보는 "12개월"기준으로 산출되었음.</p>
              <p>* 조정대상지역 및 투기과열지구 1순위는 24개월이 적용됨에 유의!</p>
              <p>* 청약 예·부금, 저축에서 종합저축으로 전환한 계좌는 전환 신규 일까지의 입주자모집공고일이 유예진 것에 대해 청약할 수 없으므로 전환 은입산출이 되지 않습니다.</p>
              <p>* 매월 순차적으로 도래하는 납입약정일이 2024.11.01 이후인 건부터 국민주택 월납입금액 최대 25만원 한도로 납입인정됨.</p>
            </div>
          </div>
        </div>
      );
    }

    if (title === '이체정보') {
      return (
        <div className="mt-3 pb-2">
          <div className="border-t border-line">
            <div className="flex items-center justify-between py-4 text-sm">
              <span className="text-text-primary">자동이체</span>
              <span className="text-text-secondary">등록하기 &gt;</span>
            </div>
          </div>
        </div>
      );
    }

    if (title === '계좌 인사이트') {
      return (
        <div className="mt-3 pb-2">
          <div className="bg-[rgb(248,249,253)] rounded-xl p-4 text-sm text-text-secondary">
            조회 내용이 없어요.
          </div>
        </div>
      );
    }

    if (title === '관리 정보') {
      return (
        <div className="mt-3 pb-2">
          <div className="space-y-4">
            {manageItems.map((label) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <span className="text-text-primary font-medium">{label}</span>
                <span className="text-text-secondary">&gt;</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="mt-2 text-xs text-text-secondary pb-2">
        (펼친 내용)
      </div>
    );
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
    <div className="min-h-screen bg-white max-w-[430px] mx-auto relative pb-20">
      {/* Header - 뒤로가기, 계좌관리, 알림/마이크/홈 */}
      <div className="flex items-center justify-between px-3 py-3 bg-white border-b border-line">
        <div className="flex items-center gap-2">
          <Link href={`/accounts/${params.id}/transactions`}>
            <Button variant="ghost" size="icon" className="w-8 h-8 p-0 text-text-primary">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-base font-semibold text-text-primary">계좌관리</h1>
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

      <div className="px-3 py-4 space-y-4">
        {/* 계좌 요약 카드 */}
        <Card className="bg-white shadow-card border border-line">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white font-bold text-lg shrink-0">
                S
              </div>
              <div>
                <h2 className="text-base font-semibold text-text-primary leading-tight">
                  {account.name}
                </h2>
                <p className="text-sm text-text-secondary mt-1">{account.number.replace(/^.*\s/, '')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 계좌 기본정보 */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-2">계좌 기본정보</h3>
          <div className="border-t border-line pt-2 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">적용이율</span>
              <span className="text-text-primary">{baseInfo?.rate}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">가입일</span>
              <span className="text-text-primary">{baseInfo?.joinDate}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">계좌관리점</span>
              <span className="text-text-primary">{baseInfo?.branch}</span>
            </div>
          </div>
          {baseInfo?.note ? (
            <div className="mt-3 p-3 bg-gray-100 rounded-lg">
              <p className="text-xs text-text-secondary leading-relaxed">{baseInfo.note}</p>
            </div>
          ) : null}
        </div>

        {/* 아코디언 섹션 */}
        <div className="border-t border-line pt-2">
          {accordionSections.map((section, index) => (
            <div
              key={section.title}
              className="border-b border-line py-3"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between text-left text-sm font-medium text-text-primary"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {section.title}
                <ChevronUp
                  className={`w-4 h-4 text-text-secondary transition-transform ${
                    openIndex === index ? '' : 'rotate-180'
                  }`}
                />
              </button>
              {openIndex === index && (
                renderSectionContent(section.title)
              )}
            </div>
          ))}
        </div>
      </div>

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
