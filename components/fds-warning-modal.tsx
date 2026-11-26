'use client';

import { AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface FdsWarningModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
}

export function FdsWarningModal({ open, onOpenChange, onConfirm }: FdsWarningModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[340px] rounded-2xl p-6 text-center" showCloseButton={false}>
        <div className="flex justify-center pt-1">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>
        <DialogHeader className="pt-1">
          <DialogTitle className="text-base font-bold text-red-600 text-center">
            이상금융거래탐지시스템(FDS) 경고
          </DialogTitle>
        </DialogHeader>
        <div className="py-3 text-sm font-medium text-text-primary whitespace-pre-wrap leading-relaxed text-center">
          계좌 소유자 안전을 위해 앞으로 48시간동안 고액 출금을 제한합니다.
        </div>
        <div className="mt-2">
          <Button
            className="w-full h-11 rounded-xl text-sm font-semibold text-white"
            style={{ backgroundColor: 'rgb(25,118,243)' }}
            onClick={() => {
              onOpenChange(false);
              onConfirm?.();
            }}
          >
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
