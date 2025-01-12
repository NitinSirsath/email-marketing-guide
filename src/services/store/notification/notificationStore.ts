// src/services/store/notificationStore.ts
import { create } from "zustand";

interface NotificationState {
  showNotification: boolean;
  activateNotification: () => void;
  deactivateNotification: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  showNotification: false,
  activateNotification: () => set({ showNotification: true }),
  deactivateNotification: () => set({ showNotification: false }),
}));
