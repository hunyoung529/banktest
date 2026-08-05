'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface RestrictedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RestrictedModal({ open, onOpenChange }: RestrictedModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[340px] rounded-2xl p-6 text-center" showCloseButton={false}>
        <DialogHeader className="pt-2">
          <DialogTitle className="text-base font-bold text-text-primary text-center">
            안내
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 text-sm font-medium text-text-primary whitespace-pre-wrap leading-relaxed text-center">
          죄송합니다. 해당 계좌는 사고신고 계좌로 거래가 불가합니다. 자세한 사항은 해당은행 고객센터로 문의하시기 바랍니다.{'\n\n'}[A0002/419])[EACO04795/16.85-03]
        </div>
        <div className="mt-2">
          <Button
            className="w-full h-11 rounded-xl text-sm font-semibold text-white"
            style={{ backgroundColor: 'rgb(25,118,243)' }}
            onClick={() => onOpenChange(false)}
          >
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
