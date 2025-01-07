// toastStore.ts
import { create } from 'zustand';

type ToastState = {
  message: string | null;
  severity: 'success' | 'danger' | 'primary' | 'warning' | 'neutral' | null;
  showToast: (message: string, severity: 'success' | 'danger' | 'primary' | 'warning' | 'neutral') => void;
  hideToast: () => void;
};

export const useToastStore = create<ToastState>(set => ({
  message: null,
  severity: null,
  showToast: (message, severity) => set({ message, severity }),
  hideToast: () => set({ message: null, severity: null }),
}));
