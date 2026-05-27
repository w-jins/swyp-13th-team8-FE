import { create } from 'zustand';

/**
 * 모달 사용하는 곳의 이름을 정의하고 GlobalModal 의 renderModal 안에 조건을 적어줘야합니다!.
 */
export type ModalType = 'LOGIN' | 'JOIN' | 'INSURANCE' | 'WITHDRAW' | 'DELETE' | 'LOADING' | 'LOGOUT' | null;

interface ModalState {
  isOpen: boolean;
  modalType: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  modalType: null,

  // 모달을 열 때: 어떤 모달을 열지 이름(type)을 받아서 상태를 업데이트
  openModal: (type) => set({ isOpen: true, modalType: type }),

  // 모달을 닫을 때: 상태를 false로 변경
  closeModal: () => set({ isOpen: false, modalType: null }),
}));
