// authStore.js

import { create } from "zustand";

type authStoreStae = {
  isLoggedIn: boolean;
  setLoggedIn: () => void;
  setLoggedOut: () => void;
};

export const useAuthStore = create<authStoreStae>((set) => ({
  isLoggedIn: !!localStorage.getItem("userToken"),
  setLoggedIn: () => set({ isLoggedIn: true }),
  setLoggedOut: () => set({ isLoggedIn: false }),
}));
