'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MessageSquare, Mic, Home, ChevronDown, Check, Send, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  getComputedBalanceByAccountId, 
  getTransactionsByAccountId, 
  setTransactionsOverrideByAccountId, 
  type Transaction 
} from '@/lib/account-data';
import { formatCurrency } from '@/lib/format';

type Step = 1 | 2 | 4 | 5; // step 3 (보낼까요?) 제거

const BANKS = [
  '신한은행', '제주은행', '국민은행', '기업은행', '농협', '산업은행', 
  '수협', '신협', '우리', '하나', '한국씨티', '카카오뱅크', 
  '케이뱅크', '토스뱅크', '경남은행', '광주은행'
];

function toDateString(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd}`;
}

function toTimeString(d: Date): string {
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

export default function TransferPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [bankModalOpen, setBankModalOpen] = useState(false);

  // 2단계 (금액 입력)
  const [amountStr, setAmountStr] = useState('');
  const balance = useMemo(() => getComputedBalanceByAccountId('1'), []);

  // 메모 고정값: 내통장메모 '전효빈', 받는분메모 '정훈영'
  const recipientMemo = '정훈영';
  const myMemo = '전효빈';

  // 4단계 (비밀번호 4자리)
  const [password, setPassword] = useState<string[]>([]);
  const [passwordError, setPasswordError] = useState(false);
  
  // 로딩창 상태
  const [loading, setLoading] = useState(false);

  // 계좌번호는 01036035868, 신한은행인 경우 전효빈으로 고정
  const recipientName = useMemo(() => {
    if (accountNumber === '01036035868' && selectedBank === '신한은행') {
      return '전효빈';
    }
    return '받는분';
  }, [accountNumber, selectedBank]);

  // 1단계 은행 선택 검증 핸들러
  const handleSelectBank = (bank: string) => {
    setSelectedBank(bank);
    setBankModalOpen(false);
    
    if (accountNumber) {
      if (accountNumber !== '01036035868' || bank !== '신한은행') {
        alert('계좌를 확인해 주세요');
        return;
      }
      setStep(2);
    } else {
      if (bank !== '신한은행') {
        alert('계좌를 확인해 주세요');
      }
    }
  };

  // 1단계 다음 버튼 핸들러
  const handleNextStep = () => {
    if (!accountNumber || !selectedBank) {
      alert('계좌번호와 은행을 모두 입력해 주세요.');
      return;
    }
    if (accountNumber !== '01036035868' || selectedBank !== '신한은행') {
      alert('계좌를 확인해 주세요');
      return;
    }
    setStep(2);
  };

  // 계좌번호 입력 핸들러
  const handleAccountNumberChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '');
    setAccountNumber(cleaned);
    
    if (cleaned.length >= 11 && selectedBank) {
      if (cleaned !== '01036035868' || selectedBank !== '신한은행') {
        alert('계좌를 확인해 주세요');
      } else {
        setStep(2);
      }
    }
  };

  // 키패드 입력 처리 (Step 2)
  const handleKeyPressStep2 = (key: string) => {
    if (key === 'back') {
      setAmountStr((prev) => prev.slice(0, -1));
    } else if (key === 'done') {
      if (!amountStr || Number(amountStr) === 0) return;
      if (Number(amountStr) > balance) {
        alert('잔액이 부족합니다.');
        return;
      }
      setStep(4); // 3단계를 건너뛰고 바로 비밀번호(4단계) 화면으로 이동
    } else {
      if (amountStr.length >= 12) return;
      if (amountStr === '' && key === '0') return;
      setAmountStr((prev) => prev + key);
    }
  };

  // 비밀번호 입력 처리 (Step 4)
  const handlePasswordPress = (num: string) => {
    setPasswordError(false);
    if (password.length >= 4) return;
    
    const nextPassword = [...password, num];
    setPassword(nextPassword);

    if (nextPassword.length === 4) {
      const pwStr = nextPassword.join('');
      if (pwStr === '5973') {
        // 로딩 1초 실행 후 이체 완료
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          executeTransfer();
        }, 1000);
      } else {
        setTimeout(() => {
          setPasswordError(true);
          setPassword([]);
        }, 150);
      }
    }
  };

  const handlePasswordBackspace = () => {
    setPassword((prev) => prev.slice(0, -1));
  };

  // 이체 실행 및 내역 저장
  const executeTransfer = () => {
    const transferAmount = Number(amountStr);
    const now = new Date();
    
    const newTx: Transaction = {
      id: `1-transfer-${now.getTime()}`,
      date: toDateString(now),
      time: toTimeString(now),
      channel: '모바일',
      recipient: recipientName,
      type: '출금',
      amount: transferAmount,
    };

    try {
      const currentTxs = getTransactionsByAccountId('1');
      setTransactionsOverrideByAccountId('1', [newTx, ...currentTxs]);
    } catch (e) {
      console.error(e);
    }

    setStep(5);
  };

  const handleQuickAdd = (value: number) => {
    const currentAmount = Number(amountStr) || 0;
    const nextAmount = currentAmount + value;
    if (nextAmount > balance) {
      setAmountStr(String(balance));
    } else {
      setAmountStr(String(nextAmount));
    }
  };

  const handleFullAmount = () => {
    setAmountStr(String(balance));
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setAccountNumber('');
      setSelectedBank('');
      setAmountStr('');
    } else if (step === 4) {
      setStep(2);
      setPassword([]);
      setPasswordError(false);
    } else if (step === 5) {
      router.push('/');
    } else {
      router.push('/');
    }
  };

  const formatAmountDisplay = (str: string) => {
    if (!str) return '';
    return Number(str).toLocaleString();
  };

  return (
    <div className="min-h-screen max-w-[430px] mx-auto bg-white relative flex flex-col justify-between overflow-x-hidden">
      
      {/* Header */}
      {step !== 5 && (
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 shrink-0 bg-white">
          <button type="button" onClick={handleBack} className="p-1 hover:opacity-75">
            <ChevronLeft className="w-6 h-6 text-text-primary" />
          </button>
          <div className="flex items-center gap-4 text-text-primary">
            <button type="button" className="hover:opacity-75">
              <MessageSquare className="w-5 h-5" />
            </button>
            <button type="button" className="hover:opacity-75">
              <Mic className="w-5 h-5" />
            </button>
            <button type="button" onClick={() => router.push('/')} className="hover:opacity-75">
              <Home className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        
        {/* Step 1: 누구에게 보낼까요? */}
        {step === 1 && (
          <div className="px-6 pt-8 flex-1 flex flex-col justify-between pb-10">
            <div>
              <h1 className="text-2xl font-bold text-text-primary mb-10 leading-tight">
                누구에게 보낼까요?
              </h1>

              <div className="space-y-8">
                <div className="relative border-b border-gray-200 focus-within:border-brand py-2">
                  <input
                    type="text"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    value={accountNumber}
                    onChange={(e) => handleAccountNumberChange(e.target.value)}
                    placeholder="계좌번호 직접 입력"
                    className="w-full text-lg outline-none placeholder:text-gray-400 bg-transparent text-text-primary"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setBankModalOpen(true)}
                  className="w-full flex justify-between items-center border-b border-gray-200 py-3 text-left"
                >
                  <span className={`text-lg ${selectedBank ? 'text-text-primary font-semibold' : 'text-gray-400'}`}>
                    {selectedBank || '은행 또는 증권사 선택'}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            <Button
              onClick={handleNextStep}
              className="w-full h-12 rounded-xl text-sm font-semibold mt-12 text-white transition active:scale-95"
              style={{ backgroundColor: 'rgb(25,118,243)' }}
            >
              다음
            </Button>
          </div>
        )}

        {/* Step 2: 얼마를 보낼까요? */}
        {step === 2 && (
          <div className="px-6 pt-8 flex-1 flex flex-col justify-between pb-4">
            <div>
              <div className="mb-8">
                <div className="text-2xl font-bold text-text-primary leading-tight">
                  <span className="text-brand mr-1" style={{ color: 'rgb(25,118,243)' }}>{recipientName}</span>님께
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {selectedBank} {accountNumber}
                </div>
                <div className="text-2xl font-bold text-text-primary mt-1">
                  얼마를 보낼까요?
                </div>
              </div>

              <div className="min-h-[60px] flex items-center justify-center border-b border-gray-100 py-4 mb-6">
                {amountStr ? (
                  <div className="text-3xl font-bold text-text-primary">
                    {formatAmountDisplay(amountStr)} <span className="text-xl font-semibold text-gray-600">원</span>
                  </div>
                ) : (
                  <div className="text-xl text-gray-300">금액을 입력하세요</div>
                )}
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs text-gray-500 font-medium">출금계좌</div>
                  <div className="text-sm font-semibold text-text-primary mt-0.5">
                    저축예금 110-409-614904
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">잔액</div>
                  <div className="text-sm font-bold text-brand" style={{ color: 'rgb(25,118,243)' }}>
                    {formatCurrency(balance)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickAdd(10000)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-2.5 rounded-xl transition"
                >
                  +1만
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAdd(50000)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-2.5 rounded-xl transition"
                >
                  +5만
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAdd(100000)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-2.5 rounded-xl transition"
                >
                  +10만
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAdd(1000000)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-2.5 rounded-xl transition"
                >
                  +100만
                </button>
                <button
                  type="button"
                  onClick={handleFullAmount}
                  className="bg-blue-50 hover:bg-blue-100 text-brand text-xs font-semibold py-2.5 rounded-xl transition"
                  style={{ color: 'rgb(25,118,243)' }}
                >
                  전액
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: 비밀번호 입력 */}
        {step === 4 && (
          <div className="px-6 pt-12 flex-1 flex flex-col justify-between pb-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-6 h-6 text-brand" style={{ color: 'rgb(25,118,243)' }} />
              </div>
              <h2 className="text-xl font-bold text-text-primary">비밀번호를 입력해 주세요</h2>
              <p className="text-xs text-gray-400 mt-2">이체 비밀번호 4자리를 입력해 주세요 (5973)</p>

              <div className="flex justify-center gap-4 mt-8 mb-4">
                {[0, 1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className={`w-4.5 h-4.5 rounded-full border-2 transition-all duration-100 ${
                      password.length > idx
                        ? 'bg-brand border-brand scale-110'
                        : 'border-gray-300'
                    }`}
                    style={password.length > idx ? { backgroundColor: 'rgb(25,118,243)', borderColor: 'rgb(25,118,243)' } : undefined}
                  />
                ))}
              </div>

              {passwordError && (
                <div className="text-xs text-red-500 font-medium animate-bounce mt-3">
                  비밀번호가 올바르지 않습니다. 다시 입력해 주세요.
                </div>
              )}
            </div>

            <div className="bg-white p-4">
              <div className="grid grid-cols-3 gap-y-4 gap-x-6 max-w-[320px] mx-auto py-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handlePasswordPress(String(num))}
                    className="h-12 flex items-center justify-center text-xl font-semibold text-text-primary active:bg-gray-100 rounded-xl transition"
                  >
                    {num}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handlePasswordBackspace}
                  className="h-12 flex items-center justify-center text-lg font-semibold text-text-secondary active:bg-gray-100 rounded-xl transition"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => handlePasswordPress('0')}
                  className="h-12 flex items-center justify-center text-xl font-semibold text-text-primary active:bg-gray-100 rounded-xl transition"
                >
                  0
                </button>
                <div className="h-12" />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: 이체 완료 */}
        {step === 5 && (
          <div className="flex-1 flex flex-col justify-between bg-white overflow-y-auto">
            <div className="flex justify-end items-center px-4 py-3 shrink-0">
              <div className="flex items-center gap-4 text-text-primary">
                <button type="button" onClick={() => router.push('/')} className="hover:opacity-75">
                  <Home className="w-5 h-5 text-gray-700" />
                </button>
                <button type="button" className="hover:opacity-75 text-gray-700 font-bold text-lg">
                  ≡
                </button>
              </div>
            </div>

            <div className="px-6 pt-4 text-center shrink-0">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100 relative">
                <Send className="w-7 h-7 text-brand" style={{ color: 'rgb(25,118,243)' }} />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              </div>
              <h2 className="text-xl font-extrabold text-brand" style={{ color: 'rgb(25,118,243)' }}>
                이체가 완료되었습니다.
              </h2>
            </div>

            <div className="px-6 py-6 shrink-0">
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-xs text-gray-400 font-medium">받는분</span>
                    <div className="text-right">
                      <div className="text-sm font-bold text-text-primary">☆ {recipientName}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{selectedBank} / {accountNumber}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 font-medium">이체금액</span>
                    <span className="text-base font-bold text-brand" style={{ color: 'rgb(25,118,243)' }}>
                      {formatAmountDisplay(amountStr)}원
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 font-medium">수수료</span>
                    <span className="text-xs font-semibold text-gray-600">면제</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 font-medium">받는통장메모</span>
                    <span className="text-xs font-semibold text-gray-600">{recipientMemo}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 font-medium">내통장메모</span>
                    <span className="text-xs font-semibold text-gray-600">{myMemo}</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-400 font-medium">출금계좌</span>
                    <span className="text-xs font-semibold text-gray-600">신한 / 110-409-614904</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sharing SNS */}
            <div className="px-6 py-2 flex justify-center gap-10 shrink-0">
              <button type="button" className="flex flex-col items-center gap-1.5 hover:opacity-85">
                <div className="w-11 h-11 bg-orange-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-orange-700" />
                </div>
                <span className="text-[10px] text-gray-500 font-medium">메시지카드</span>
              </button>
              
              <button type="button" className="flex flex-col items-center gap-1.5 hover:opacity-85">
                <div className="w-11 h-11 bg-yellow-300 rounded-full flex items-center justify-center">
                  <span className="text-xs font-black text-yellow-900">TALK</span>
                </div>
                <span className="text-[10px] text-gray-500 font-medium">카카오톡</span>
              </button>

              <button type="button" className="flex flex-col items-center gap-1.5 hover:opacity-85">
                <div className="w-11 h-11 bg-slate-100 rounded-full flex items-center justify-center">
                  <Send className="w-5 h-5 text-slate-700" />
                </div>
                <span className="text-[10px] text-gray-500 font-medium">문자</span>
              </button>
            </div>

            <div className="px-6 py-6 flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setAccountNumber('');
                  setSelectedBank('');
                  setAmountStr('');
                  setPassword([]);
                }}
                className="w-1/2 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition"
              >
                이체계속하기
              </button>
              <button
                type="button"
                onClick={() => router.push('/')}
                className="w-1/2 h-12 rounded-xl text-white font-bold text-sm transition shadow-md hover:opacity-95"
                style={{ backgroundColor: 'rgb(25,118,243)' }}
              >
                확인
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Step 2 Keypad */}
      {step === 2 && (
        <div className="bg-gray-50 border-t border-gray-100 p-4 shrink-0">
          <div className="grid grid-cols-3 gap-y-4 gap-x-6 max-w-[360px] mx-auto py-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleKeyPressStep2(String(num))}
                className="h-12 flex items-center justify-center text-xl font-semibold text-text-primary active:bg-gray-200 rounded-xl transition"
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleKeyPressStep2('back')}
              className="h-12 flex items-center justify-center text-lg font-semibold text-text-secondary active:bg-gray-200 rounded-xl transition"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => handleKeyPressStep2('0')}
              className="h-12 flex items-center justify-center text-xl font-semibold text-text-primary active:bg-gray-200 rounded-xl transition"
            >
              0
            </button>
            <button
              type="button"
              onClick={() => handleKeyPressStep2('done')}
              className={`h-12 flex items-center justify-center text-base font-bold rounded-xl transition ${
                amountStr ? 'text-brand' : 'text-gray-300 pointer-events-none'
              }`}
              style={amountStr ? { color: 'rgb(25,118,243)' } : undefined}
            >
              완료
            </button>
          </div>
        </div>
      )}

      {/* Bank Modal */}
      {bankModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center">
          <div className="absolute inset-0" onClick={() => setBankModalOpen(false)} />
          
          <div className="w-full max-w-[430px] bg-white rounded-t-3xl z-10 max-h-[75vh] flex flex-col animate-in slide-in-from-bottom duration-200">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-3 shrink-0" />
            
            <div className="px-5 pb-3 flex justify-between items-center border-b border-gray-100 shrink-0">
              <h2 className="text-base font-bold text-text-primary">은행 선택</h2>
              <button
                type="button"
                onClick={() => setBankModalOpen(false)}
                className="text-sm font-semibold text-text-secondary hover:text-text-primary"
              >
                닫기
              </button>
            </div>

            <div className="overflow-y-auto p-5 grid grid-cols-3 gap-3">
              {BANKS.map((bank) => (
                <button
                  key={bank}
                  type="button"
                  onClick={() => handleSelectBank(bank)}
                  className={`py-3.5 px-2 text-center rounded-xl text-sm font-semibold border transition ${
                    selectedBank === bank
                      ? 'border-brand bg-blue-50/50 text-brand font-bold'
                      : 'border-gray-100 bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                  style={selectedBank === bank ? { borderColor: 'rgb(25,118,243)', color: 'rgb(25,118,243)' } : undefined}
                >
                  {bank}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 1초 대기 로딩 오버레이 */}
      {loading && (
        <div className="fixed inset-0 bg-black/35 z-55 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border-4 border-gray-200 border-t-brand animate-spin" style={{ borderTopColor: 'rgb(25,118,243)' }} />
        </div>
      )}

    </div>
  );
}
