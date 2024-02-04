import { create } from 'zustand';
import { ReactElement } from 'react';
import { ModalAlertTypeOption, ModalConfirmTypeOption } from '@/types/common';
import { animate } from 'framer-motion';

/**
 * 모달의 상태를 관리합니다.
 */

type ModalType = 'component' | 'alert' | 'confirm';

interface ModalElement {
  id: string;
  show: boolean;
  child: ReactElement;
  type: ModalType;
}

interface ModalState {
  modalList?: ModalElement[];
  alertList?: ModalAlertTypeOption[];
  confirmList?: ModalConfirmTypeOption[];
}

const useModalState = create<ModalState>()(() => ({
  modalList: [],
  alertList: [],
  confirmList: [],
}));

export const addChildElem = (elem: ModalElement) => {
  useModalState.setState(state => ({ modalList: [...(state.modalList ?? []), elem] }));
};

export const addAlert = (elem: ModalAlertTypeOption) => {
  useModalState.setState(state => ({ alertList: [...(state.alertList ?? []), elem] }));
};

export const addConfirm = (elem: ModalConfirmTypeOption) => {
  useModalState.setState(state => ({ confirmList: [...(state.confirmList ?? []), elem] }));
};

export const hideModal = (id: string) => {
  setTimeout(() => {
    useModalState.setState(state => ({ modalList: state.modalList?.filter(modal => modal.id !== id) }));
  }, 150);
  animate(document.getElementById(id)!, { scale: [1, 0], opacity: [1, 0] }, { duration: 0.15 });
};

export const hideConfirm = (id: string) => {
  setTimeout(() => {
    useModalState.setState(state => ({ confirmList: state.confirmList?.filter(confirm => confirm.id !== id) }));
  }, 150);
  animate(document.getElementById(id)!, { scale: [1, 0], opacity: [1, 0] }, { duration: 0.15 });
};

export const hideAlert = (id: string) => {
  setTimeout(() => {
    useModalState.setState(state => ({ alertList: state.alertList?.filter(alert => alert.id !== id) }));
  }, 150);
  animate(document.getElementById(id)!, { scale: [1, 0], opacity: [1, 0] }, { duration: 0.15 });
};

export default useModalState;
