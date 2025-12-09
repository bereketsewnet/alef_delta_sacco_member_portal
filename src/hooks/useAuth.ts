// Authentication Hook
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Member } from '@/types';
import { api } from '@/lib/api';

interface AuthState {
  isAuthenticated: boolean;
  member: Member | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (phone: string, password: string) => Promise<void>;
  logout: () => void;
  updateMember: (member: Partial<Member>) => void;
  refreshAuth: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      member: null,
      accessToken: null,
      refreshToken: null,
      
      login: async (phone: string, password: string) => {
        try {
          const response = await api.auth.login(phone, password);
          
          // Store tokens in localStorage
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          
          set({
            isAuthenticated: true,
            member: response.member,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          });
        } catch (error) {
          // Clear any existing auth state on login failure
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          set({
            isAuthenticated: false,
            member: null,
            accessToken: null,
            refreshToken: null,
          });
          throw error;
        }
      },
      
      logout: () => {
        // Clear all auth data
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        set({
          isAuthenticated: false,
          member: null,
          accessToken: null,
          refreshToken: null,
        });
      },
      
      updateMember: (memberUpdate) => {
        set((state) => ({
          member: state.member ? { ...state.member, ...memberUpdate } : null,
        }));
      },
      
      refreshAuth: async () => {
        const { refreshToken } = get();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        
        try {
          const response = await api.auth.refresh(refreshToken);
          
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          
          set({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          });
        } catch (error) {
          // If refresh fails, logout
          get().logout();
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        member: state.member,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
