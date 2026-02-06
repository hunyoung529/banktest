'use client';

import { usePromo } from '@/state/usePromo';
import { formatCurrency } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Link from 'next/link';
import Image from 'next/image';
import {
  MessageSquare,
  ChevronRight,
  BellRing,
  Home as HomeIcon,
  PieChart,
  Gift,
  Menu,
  Copy,
  ShoppingBag,
} from 'lucide-react';
import { getComputedBalanceByAccountId } from '@/lib/account-data';

export default function Home() {
  const { open, setOpen, never, setNever } = usePromo();

  return (
    <div
      className="min-h-screen max-w-[430px] mx-auto relative pb-20"
      style={{ background: 'linear-gradient(180deg, rgb(255,255,255) 0%, rgb(255,255,255) 90px, rgb(245, 248, 253) 220px, rgb(245, 248, 253) 100%)' }}
    >
      {/* Header Navigation - M 로고 + 정훈영님, 검색/챗봇 */}
      <div className="flex justify-between items-center px-3 py-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 relative shrink-0">
            <Image src="/icons/home/m-logo.png" alt="M" width={36} height={36} className="object-contain" />
          </div>
          <span className="text-base font-semibold text-text-primary">정훈영님</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-0.5">
            <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 text-text-secondary p-0">
              <Image src="/icons/home/search.png" alt="검색" width={24} height={24} className="object-contain" />
            </Button>
            <span className="text-xs text-text-secondary">검색</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 text-text-secondary">
              <MessageSquare className="w-5 h-5" />
            </Button>
            <span className="text-xs text-text-secondary">챗봇</span>
          </div>
        </div>
      </div>

      {/* Main Account Card */}
      <Card className="mx-3 p-4 mb-4 shadow-card bg-white">
        <CardContent className="p-0">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 relative shrink-0 rounded-full overflow-hidden bg-brand flex items-center justify-center">
                <Image src="/icons/home/s-logo.png" alt="신한" width={40} height={40} className="object-contain p-1" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-text-primary">입출금 저축예금</h2>
                <div className="flex items-center text-xs text-text-secondary mt-0.5">
                  <span>신한 110-409-614904</span>
                  <Button variant="ghost" size="icon" className="w-4 h-4 ml-1 text-text-muted">
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
            <Button variant="outline" className="text-xs text-text-secondary h-auto py-1 px-2 rounded-md border-line">
              설정
            </Button>
          </div>
          <div className="mb-4">
            <Link href="/accounts/1/transactions" className="hover:opacity-80">
              <span className="text-2xl font-bold text-text-primary">
                {formatCurrency(getComputedBalanceByAccountId('1'))}
              </span>
            </Link>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1 text-sm font-semibold py-2 h-auto rounded-md" style={{backgroundColor: '#E3F2FD', color: '#1976F3'}}>
              돈보내기
            </Button>
            <Button className="flex-1 text-sm font-semibold py-2 h-auto rounded-md" style={{backgroundColor: '#E3F2FD', color: '#1976F3'}}>
              급여클럽+
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security/Promo Section */}
      <Card className="mx-3 p-3 mb-4 shadow-card bg-white">
        <CardContent className="p-0 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 relative shrink-0">
              <Image src="/icons/home/lock-shield.png" alt="" width={20} height={20} className="object-contain" />
            </div>
            <span className="text-sm text-text-primary">지켜요 (금융사기 예방)</span>
          </div>
          <ChevronRight className="w-4 h-4 text-text-muted" />
        </CardContent>
      </Card>

      {/* Action Grid - 3x2 (6개) - 제공 아이콘 사용 */}
      <div className="grid grid-cols-2 gap-2 mx-3 mb-4">
        <Link href="/accounts" className="block">
          <Card className="p-3 flex flex-col items-center justify-center text-center shadow-card h-24 bg-white">
            <div className="w-10 h-10 relative mb-1">
              <Image src="/icons/home/search.png" alt="" width={40} height={40} className="object-contain" />
            </div>
            <span className="text-xs text-text-primary">전체계좌조회</span>
          </Card>
        </Link>
        <Card className="p-3 flex flex-col items-center justify-center text-center shadow-card h-24 bg-white">
          <div className="w-10 h-10 relative mb-1">
            <Image src="/icons/home/send-money.png" alt="" width={40} height={40} className="object-contain" />
          </div>
          <span className="text-xs text-text-primary">돈보내기</span>
        </Card>
        <Card className="p-3 flex flex-col items-center justify-center text-center shadow-card h-24 bg-white">
          <div className="w-10 h-10 relative mb-1">
            <Image src="/icons/home/product-join.png" alt="" width={40} height={40} className="object-contain" />
          </div>
          <span className="text-xs text-text-primary">상품가입</span>
        </Card>
        <Card className="p-3 flex flex-col items-center justify-center text-center shadow-card h-24 bg-white">
          <div className="w-10 h-10 relative mb-1">
            <Image src="/icons/home/atm.png" alt="" width={40} height={40} className="object-contain" />
          </div>
          <span className="text-xs text-text-primary">ATM 돈찾기</span>
        </Card>
        <Card className="p-3 flex flex-col items-center justify-center text-center shadow-card h-24 bg-white">
          <div className="w-10 h-10 relative mb-1">
            <Image src="/icons/home/bill.png" alt="" width={40} height={40} className="object-contain" />
          </div>
          <span className="text-xs text-text-primary">공과금내기</span>
        </Card>
        <Card className="p-3 flex flex-col items-center justify-center text-center shadow-card h-24 bg-white">
          <Image src="/icons/home/accident.png" alt="" width={40} height={40} className="object-contain" />
          <span className="text-xs text-text-primary">사고신고</span>
        </Card>

        <Card className="p-3 flex flex-col items-center justify-center text-center shadow-card h-24 bg-white">
          <Image src="/icons/home/s-logo.png" alt="" width={40} height={40} className="object-contain" />
          <span className="text-xs text-text-primary">신한인증서</span>
        </Card>
        <Card className="p-3 flex flex-col items-center justify-center text-center shadow-card h-24 bg-white">
          <Image src="/icons/home/lock-shield.png" alt="" width={40} height={40} className="object-contain" />
          <span className="text-xs text-text-primary">보안서비스</span>
        </Card>
        <Card className="p-3 flex flex-col items-center justify-center text-center shadow-card h-24 bg-white">
          <Image src="/icons/home/verify.png" alt="" width={40} height={40} className="object-contain" />
          <span className="text-xs text-text-primary">SOL뱅크</span>
        </Card>
        <Card className="p-3 flex flex-col items-center justify-center text-center shadow-card h-24 bg-white">
          <Image src="/icons/home/opinion.png" alt="" width={40} height={40} className="object-contain" />
          <span className="text-xs text-text-primary">의견 말하기</span>
        </Card>
      </div>

      <div className="mx-3 mb-6 flex justify-center">
        <Button
          variant="ghost"
          className="h-11 px-6 rounded-full text-sm font-semibold text-text-secondary"
          style={{ backgroundColor: 'rgb(232, 236, 242)' }}
        >
          기본 홈
        </Button>
      </div>

      {/* Promotion Dialog */}
      <Dialog open={open && !never} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-text-primary">
              새로운 프로모션!
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 text-sm text-text-secondary">
            <p>지금 바로 참여하고 특별한 혜택을 받으세요!</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setNever(true)}
              className="text-sm text-text-secondary"
            >
              다시 보지 않기
            </Button>
            <Button onClick={() => setOpen(false)} className="bg-brand text-text-inverse text-sm">
              확인
            </Button>
            </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[430px] border-t border-line py-2" style={{ backgroundColor: 'rgb(245, 248, 253)' }}>
        <div className="grid grid-cols-5 text-center text-xs">
          <div className="flex flex-col items-center gap-0.5 text-brand">
            <HomeIcon className="w-5 h-5" />
            <span>홈</span>
          </div>
          <Link href="#" className="flex flex-col items-center gap-0.5 text-text-secondary">
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
