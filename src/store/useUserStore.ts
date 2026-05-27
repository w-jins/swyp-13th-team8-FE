import { create } from 'zustand';

interface UserState {
  isLoggedIn: boolean;
  userInfo: { userId: number | null; name: string; email: string; profileImageUrl: string };
  setUserInfo: (info: { userId: number | null; name: string; email: string; profileImageUrl: string }) => void;
}

// 유저의 상태를 저장하는 코드
export const useUserStore = create<UserState>((set) => ({
  isLoggedIn: false,
  userInfo: { userId: null, name: '', email: '', profileImageUrl: '' },
  setUserInfo: (info) =>
    set({
      isLoggedIn: !!info,
      userInfo: info,
    }),
}));
