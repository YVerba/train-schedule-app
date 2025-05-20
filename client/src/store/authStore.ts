import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login, signup } from "@/lib/api";

type AuthStore = {
  token: string | null;
  email: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      email: null,

      login: async (email, password) => {
        const token = await login(email, password);
        set({ token, email });
      },

      signup: async (email, password) => {
        const token = await signup(email, password);
        set({ token, email });
      },

      logout: () => set({ token: null, email: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
