import { create } from 'zustand';

interface ThemeState {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const useThemeStore = create<ThemeState>(set => ({
  darkMode: localStorage.getItem('darkMode') === 'true', // Initialize state from local storage
  toggleDarkMode: () => {
    set(state => {
      const newDarkMode = !state.darkMode;
      localStorage.setItem('darkMode', newDarkMode.toString()); // Save state to local storage
      return { darkMode: newDarkMode };
    });
  },
}));

export default useThemeStore;
