// Authentication Hook
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Member } from '@/types';
import { api } from '@/lib/api';

interface AuthState {
  isAuthenticated: boolean;
  member: Member | null;
  accessToken: string | null;
  login: (phone: string, password: string) => Promise<void>;
  logout: () => void;
  updateMember: (member: Partial<Member>) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      member: null,
      accessToken: null,
      
      login: async (phone: string, password: string) => {
        const response = await api.auth.login(phone, password);
        localStorage.setItem('accessToken', response.accessToken);
        set({
          isAuthenticated: true,
          member: response.member,
          accessToken: response.accessToken,
        });
      },
      
      logout: () => {
        localStorage.removeItem('accessToken');
        set({
          isAuthenticated: false,
          member: null,
          accessToken: null,
        });
      },
      
      updateMember: (memberUpdate) => {
        set((state) => ({
          member: state.member ? { ...state.member, ...memberUpdate } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        member: state.member,
        accessToken: state.accessToken,
      }),
    }
  )
);
