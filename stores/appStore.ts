import { create } from "zustand";
import { devtools } from "zustand/middleware";


interface appState {
  latestPrompt: string;
  user: any | null;
  setLatestPrompt: (prompt: React.ChangeEvent<HTMLInputElement>) => void;
  setUser: (user: any) => void;
}

const useAppStore = create<appState>()(
  devtools(
    (set) => ({
      latestPrompt: '',
      user: null,
      setLatestPrompt: (prompt) =>
        set(() => ({ latestPrompt: prompt.target.value })),
      setUser: (user) =>
        set(() => ({ user })),
    }),
    { name: 'appStore' },
  ),
);

export default useAppStore;