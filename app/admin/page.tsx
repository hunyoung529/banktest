'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  ACCOUNTS,
  clearTransactionsOverrideByAccountId,
  getComputedBalanceByAccountId,
  getTransactionsByAccountId,
  isAdminUnlocked,
  setAdminUnlocked,
  setTransactionsOverrideByAccountId,
  type Transaction,
} from '@/lib/account-data';
import { formatCurrency } from '@/lib/format';

type TxForm = {
  id?: string;
  date: string;
  time: string;
  channel: string;
  recipient: string;
  type: Transaction['type'];
  amount: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [selectedId, setSelectedId] = useState<string>('1');
  const [txs, setTxs] = useState<Transaction[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState<TxForm>({
    date: '',
    time: '',
    channel: '모바일',
    recipient: '',
    type: '출금',
    amount: '',
  });

  const accounts = useMemo(() => ACCOUNTS, []);
  const selectedAccount = useMemo(() => accounts.find((a) => a.id === selectedId), [accounts, selectedId]);

  useEffect(() => {
    const ok = isAdminUnlocked();
    if (!ok) {
      router.replace('/menu');
      return;
    }
    setReady(true);
  }, [router]);

  useEffect(() => {
    if (!ready) return;
    setTxs(getTransactionsByAccountId(selectedId));
  }, [ready, selectedId]);

  function persist(next: Transaction[]) {
    setTxs(next);
    setTransactionsOverrideByAccountId(selectedId, next);
  }

  function handleDelete(id: string) {
    persist(txs.filter((t) => t.id !== id));
  }

  function openAdd() {
    setForm({ date: '', time: '', channel: '모바일', recipient: '', type: '출금', amount: '' });
    setAddOpen(true);
  }

  function openEdit(tx: Transaction) {
    setForm({
      id: tx.id,
      date: tx.date,
      time: tx.time,
      channel: tx.channel,
      recipient: tx.recipient,
      type: tx.type,
      amount: String(tx.amount),
    });
    setEditOpen(true);
  }

  function submitAdd() {
    if (!form.date || !form.time || !form.amount) return;

    const newTx: Transaction = {
      id: `${selectedId}-${Date.now()}`,
      date: form.date,
      time: form.time,
      channel: form.channel || '모바일',
      recipient: form.recipient || '-',
      type: form.type,
      amount: Number(form.amount),
    };

    persist([newTx, ...txs]);
    setAddOpen(false);
  }

  function submitEdit() {
    if (!form.id) return;
    if (!form.date || !form.time || !form.amount) return;

    const next = txs.map((t) =>
      t.id === form.id
        ? {
            ...t,
            date: form.date,
            time: form.time,
            channel: form.channel || '모바일',
            recipient: form.recipient || '-',
            type: form.type,
            amount: Number(form.amount),
          }
        : t
    );

    persist(next);
    setEditOpen(false);
  }

  function resetToDefault() {
    clearTransactionsOverrideByAccountId(selectedId);
    setTxs(getTransactionsByAccountId(selectedId));
  }

  if (!ready || !selectedAccount) {
    return <div className="min-h-screen max-w-[430px] mx-auto bg-white" />;
  }

  function handleCloseAdmin() {
    setAdminUnlocked(false);
    router.push('/');
  }

  return (
    <div className="min-h-screen max-w-[430px] mx-auto bg-white pb-20">
      <div className="px-4 py-4 border-b border-line bg-white">
        <div className="flex items-center justify-between">
          <div className="text-base font-semibold text-text-primary">거래내역 관리</div>
          <div className="flex items-center gap-3">
            <Link href="/menu" className="text-sm font-semibold text-brand">
              전체메뉴
            </Link>
            <button type="button" className="text-sm font-semibold text-text-secondary" onClick={handleCloseAdmin}>
              닫기
            </button>
          </div>
        </div>
        <div className="mt-3">
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full h-11 rounded-xl border border-line px-3 text-sm"
          >
            {accounts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.type} | {a.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm text-text-secondary">{selectedAccount.number}</div>
          <div className="text-base font-bold text-text-primary">{formatCurrency(getComputedBalanceByAccountId(selectedId))}</div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button
            className="h-11 rounded-xl text-sm font-semibold"
            style={{ backgroundColor: 'rgb(25,118,243)', color: 'rgb(255,255,255)' }}
            onClick={openAdd}
          >
            거래 추가
          </Button>
          <Button variant="outline" className="h-11 rounded-xl text-sm font-semibold" onClick={resetToDefault}>
            원복
          </Button>
        </div>
      </div>

      <div className="px-4 py-4">
        {txs.length === 0 ? (
          <div className="py-10 text-center text-sm text-text-secondary">거래 내역이 없습니다.</div>
        ) : (
          <div className="space-y-2">
            {txs.map((tx) => (
              <div key={tx.id} className="border border-line rounded-xl p-3 bg-white">
                <div className="flex items-start justify-between gap-3">
                  <button type="button" className="text-left flex-1" onClick={() => openEdit(tx)}>
                    <div className="text-xs text-text-secondary">
                      {tx.date} {tx.time}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-text-primary">{tx.channel}</div>
                    <div className="text-sm text-text-secondary">{tx.recipient}</div>
                  </button>
                  <div className="text-right shrink-0">
                    <div
                      className="text-sm font-semibold"
                      style={tx.type === '입금' ? { color: 'rgb(225, 29, 72)' } : { color: 'rgb(25,118,243)' }}
                    >
                      {tx.type}
                    </div>
                    <div
                      className="text-base font-bold mt-0.5"
                      style={tx.type === '입금' ? { color: 'rgb(225, 29, 72)' } : { color: 'rgb(25,118,243)' }}
                    >
                      {formatCurrency(tx.amount)}
                    </div>
                    <button
                      type="button"
                      className="mt-2 text-xs"
                      style={{ color: 'rgb(225, 29, 72)' }}
                      onClick={() => handleDelete(tx.id)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="rounded-2xl" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-text-primary">거래 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} placeholder="날짜 (예: 2026.02.06)" />
            <Input value={form.time} onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))} placeholder="시간 (예: 19:50:35)" />
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
            <Input inputMode="numeric" value={form.amount} onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))} placeholder="금액 (숫자만)" />
            <Input value={form.channel} onChange={(e) => setForm((p) => ({ ...p, channel: e.target.value }))} placeholder="채널 (예: 모바일)" />
            <Input value={form.recipient} onChange={(e) => setForm((p) => ({ ...p, recipient: e.target.value }))} placeholder="상대방" />
            <Button
              className="w-full h-11 rounded-xl text-sm font-semibold"
              style={{ backgroundColor: 'rgb(25,118,243)', color: 'rgb(255,255,255)' }}
              onClick={submitAdd}
            >
              추가
            </Button>
            <Button variant="ghost" className="w-full h-11 rounded-xl text-sm font-semibold text-text-secondary" onClick={() => setAddOpen(false)}>
              취소
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="rounded-2xl" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-text-primary">거래 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} placeholder="날짜 (예: 2026.02.06)" />
            <Input value={form.time} onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))} placeholder="시간 (예: 19:50:35)" />
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
            <Input inputMode="numeric" value={form.amount} onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))} placeholder="금액 (숫자만)" />
            <Input value={form.channel} onChange={(e) => setForm((p) => ({ ...p, channel: e.target.value }))} placeholder="채널 (예: 모바일)" />
            <Input value={form.recipient} onChange={(e) => setForm((p) => ({ ...p, recipient: e.target.value }))} placeholder="상대방" />
            <Button
              className="w-full h-11 rounded-xl text-sm font-semibold"
              style={{ backgroundColor: 'rgb(25,118,243)', color: 'rgb(255,255,255)' }}
              onClick={submitEdit}
            >
              저장
            </Button>
            <Button variant="ghost" className="w-full h-11 rounded-xl text-sm font-semibold text-text-secondary" onClick={() => setEditOpen(false)}>
              취소
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
