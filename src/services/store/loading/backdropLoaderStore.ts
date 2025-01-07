import { create } from 'zustand';

type BackdropState = {
  open: boolean;
  showBackdrop: () => void;
  hideBackdrop: () => void;
};

export const useBackdropStore = create<BackdropState>(set => ({
  open: false,
  showBackdrop: () => set({ open: true }),
  hideBackdrop: () => set({ open: false }),
}));
