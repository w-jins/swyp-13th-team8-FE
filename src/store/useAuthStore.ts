import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isNewUser: boolean;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setIsNewUser: (isNew: boolean) => void;
  clearToken: () => void;
}

// Zustand 로 token 저장
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isNewUser: false,
      // 엑세스 토큰 설정
      setAccessToken: (token: string) => {
        set({ accessToken: token });
      },
      // 리프레쉬 토큰 설정
      setRefreshToken: (token: string) => {
        set({ refreshToken: token });
      },
      // 새로운 유저인지에 대한 설정
      setIsNewUser: (isNew: boolean) => {
        set({ isNewUser: isNew });
      },
      // 로그아웃 시 토큰 초기화
      clearToken: () => set({ accessToken: null, refreshToken: null, isNewUser: false }),
    }),
    { name: 'token' }, // 로컬 스토리지에 저장될 키
  ),
);
