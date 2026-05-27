import { create } from 'zustand';

interface MobileState {
  isOpen: boolean;
  setOpenState: (state: boolean) => void;
}

export const useMobileStore = create<MobileState>((set) => ({
  isOpen: false,
  // 모달을 닫을 때: 상태를 false로 변경
  setOpenState: (state) => set({ isOpen: state }),
}));
