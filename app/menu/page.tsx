'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, PieChart, ShoppingBag, Gift, Search, Menu } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { isAdminUnlocked, setAdminUnlocked } from '@/lib/account-data';

type ViewState = 'idle' | 'loading' | 'error';

export default function MenuPage() {
  const router = useRouter();
  const [view, setView] = useState<ViewState>('idle');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const quickMenus = useMemo(
    () => [
      { id: 'all-accounts', label: '전체계좌 조회', href: '/accounts' },
      { id: 'transfer', label: '계좌이체' },
      { id: 'auto-transfer', label: '자동이체' },
      { id: 'settings', label: '설정/인증' },
      { id: 'call', label: '전화상담' },
      { id: 'security', label: '보안게시판' },
      { id: 'join', label: '참여마당' },
      { id: 'idea', label: '칭찬/불만/제안 아이디어' },
    ],
    []
  );

  function handleUnavailableClick() {
    setView('loading');
    window.setTimeout(() => {
      setView('error');
    }, 900);
  }

  useEffect(() => {
    setUnlocked(isAdminUnlocked());
  }, []);

  function handleOpenSettings() {
    setPassword('');
    setPasswordError(false);
    setSettingsOpen(true);
  }

  function handleSubmitPassword() {
    if (password === '58326248') {
      setAdminUnlocked(true);
      setUnlocked(true);
      setSettingsOpen(false);
      setPassword('');
      setPasswordError(false);
      return;
    }

    setPasswordError(true);
  }

  function handleSettingsOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      if (unlocked) {
        setAdminUnlocked(false);
        setUnlocked(false);
      }
      setPassword('');
      setPasswordError(false);
    }
    setSettingsOpen(nextOpen);
  }

  if (view === 'loading') {
    return (
      <div className="min-h-screen max-w-[430px] mx-auto bg-white flex items-center justify-center">
        <div
          className="w-14 h-14 rounded-full border-4 border-gray-200 border-t-gray-500 animate-spin"
          aria-label="로딩"
        />
      </div>
    );
  }

  if (view === 'error') {
    return (
      <div className="min-h-screen max-w-[430px] mx-auto bg-white flex flex-col items-center justify-center px-6">
        <p className="text-base font-medium text-text-primary text-center">서비스 연결이 불안정합니다.</p>
        <p className="mt-2 text-base font-medium text-text-primary text-center">인터넷 연결을 확인해주세요.</p>
        <Button
          className="mt-8 w-full h-12 rounded-xl text-sm font-semibold"
          style={{ backgroundColor: 'rgb(25,118,243)', color: 'rgb(255,255,255)' }}
          onClick={() => router.push('/')}
        >
          확인
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-[430px] mx-auto relative pb-20 bg-[rgb(245,248,253)]">
      <div className="px-4 pt-6 pb-5 bg-[rgb(245,248,253)]">
        <div className="flex items-center justify-between">
          <div className="text-[22px] font-bold text-text-primary leading-tight">
            정훈영님 <span className="font-bold">&gt;</span>
          </div>
          <button type="button" className="text-sm font-semibold text-brand" onClick={handleOpenSettings}>
            설정/인증
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs text-text-secondary">최근접속 2026.02.06 16:07:09</div>
          <Button variant="outline" className="h-8 px-3 text-xs text-text-secondary border-line bg-white rounded-lg">
            로그아웃
          </Button>
        </div>

        <div className="mt-5 bg-white rounded-2xl border border-[rgb(153,161,173)] px-4 py-3 flex items-center gap-2">
          <span className="text-sm text-text-secondary flex-1">상품, 메뉴, 혜택 등을 검색해보세요.</span>
          <Search className="w-5 h-5 text-text-secondary" />
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="text-sm font-semibold text-text-secondary mb-3">새로 나온 메뉴</div>
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleUnavailableClick}
            className="w-full bg-[rgb(238,243,249)] rounded-2xl py-4 px-4 text-left"
          >
            <div className="flex items-center justify-between">
              <div className="text-base font-semibold text-text-primary">고용산재보험료 과납금 찾기</div>
              <span className="text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded-full">NEW</span>
            </div>
          </button>
          <button
            type="button"
            onClick={handleUnavailableClick}
            className="w-full bg-[rgb(238,243,249)] rounded-2xl py-4 px-4 text-left"
          >
            <div className="flex items-center justify-between">
              <div className="text-base font-semibold text-text-primary">신한 20+ 뛰어요</div>
              <span className="text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded-full">NEW</span>
            </div>
          </button>
        </div>

        <div className="mt-7 text-sm font-semibold text-text-secondary mb-3">최근 이용 메뉴</div>
        <button
          type="button"
          onClick={handleUnavailableClick}
          className="w-full bg-[rgb(238,243,249)] rounded-2xl py-4 px-4 text-left"
        >
          <div className="flex items-center justify-between">
            <div className="text-base font-semibold text-text-primary">고용산재보험료 과납금 찾기</div>
            <span className="text-text-muted">☆</span>
          </div>
        </button>
      </div>

      <div className="h-3 bg-[rgb(235,240,246)]" />

      <div className="px-4 py-5 bg-white">
        <div className="text-sm font-semibold text-text-secondary mb-4">자주쓰는 메뉴</div>
        <div className="space-y-6">
          {quickMenus.map((m) => {
            const common = 'block w-full text-left text-[18px] font-semibold text-text-primary';

            if ('href' in m && m.href) {
              return (
                <Link key={m.id} href={m.href} className={common}>
                  {m.label}
                </Link>
              );
            }

            return (
              <button key={m.id} type="button" onClick={handleUnavailableClick} className={common}>
                {m.label}
              </button>
            );
          })}
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
          <Link href="/accounts" className="flex flex-col items-center gap-0.5 text-text-secondary">
            <PieChart className="w-5 h-5" />
            <span>자산관리</span>
          </Link>
          <button type="button" onClick={handleUnavailableClick} className="flex flex-col items-center gap-0.5 text-text-secondary">
            <ShoppingBag className="w-5 h-5" />
            <span>상품</span>
          </button>
          <button type="button" onClick={handleUnavailableClick} className="flex flex-col items-center gap-0.5 text-text-secondary">
            <Gift className="w-5 h-5" />
            <span>혜택</span>
          </button>
          <div className="flex flex-col items-center gap-0.5 text-brand">
            <Menu className="w-5 h-5" />
            <span>전체메뉴</span>
          </div>
        </div>
      </nav>

      <Dialog open={settingsOpen} onOpenChange={handleSettingsOpenChange}>
        <DialogContent className="rounded-2xl" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-text-primary">설정/인증</DialogTitle>
          </DialogHeader>

          {unlocked ? (
            <div className="space-y-3">
              <div className="text-sm text-text-secondary">편집 모드가 활성화되어 있습니다.</div>
              <Button
                className="w-full h-11 rounded-xl text-sm font-semibold"
                style={{ backgroundColor: 'rgb(25,118,243)', color: 'rgb(255,255,255)' }}
                onClick={() => {
                  setSettingsOpen(false);
                  router.push('/admin');
                }}
              >
                거래내역 관리로 이동
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력"
              />
              {passwordError && (
                <div className="text-xs" style={{ color: 'rgb(225, 29, 72)' }}>
                  비밀번호가 올바르지 않습니다.
                </div>
              )}
              <Button
                className="w-full h-11 rounded-xl text-sm font-semibold"
                style={{ backgroundColor: 'rgb(25,118,243)', color: 'rgb(255,255,255)' }}
                onClick={handleSubmitPassword}
              >
                확인
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            className="w-full h-11 rounded-xl text-sm font-semibold text-text-secondary"
            onClick={() => handleSettingsOpenChange(false)}
          >
            닫기
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
