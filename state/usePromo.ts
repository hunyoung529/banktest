import { create } from 'zustand';

interface PromoState {
  open: boolean;
  never: boolean;
  setOpen: (open: boolean) => void;
  setNever: (never: boolean) => void;
}

export const usePromo = create<PromoState>((set) => ({
  open: false,
  never: false,
  setOpen: (open) => set({ open }),
  setNever: (never) => set({ never, open: false }),
}));
