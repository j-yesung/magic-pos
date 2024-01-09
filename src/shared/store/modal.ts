import { create } from 'zustand';
import { ReactElement } from 'react';

/**
 * 모달의 상태를 관리합니다.
 */

interface ModalState {
  show: boolean;
  childElem?: ReactElement;
  setChildElem: (elem: ReactElement) => void;
  showModal: () => void;
  hideModal: () => void;
  toggleModal: () => void;
}

const useModalStore = create<ModalState>()(set => ({
  show: false,
  setChildElem: elem => set(() => ({ childElem: elem })),
  showModal: () => set(() => ({ show: true })),
  hideModal: () => set(() => ({ show: false })),
  toggleModal: () => set(state => ({ show: !state.show })),
}));

export default useModalStore;
