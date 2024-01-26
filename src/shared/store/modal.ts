import { create } from 'zustand';
import { ReactElement } from 'react';
import { ModalAlertTypeOption, ModalConfirmTypeOption } from '@/types/common';

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
  useModalState.setState(state => ({ modalList: state.modalList?.filter(modal => modal.id !== id) }));
};

export const hideConfirm = (id: string) => {
  useModalState.setState(state => ({ confirmList: state.confirmList?.filter(confirm => confirm.id !== id) }));
};

export const hideAlert = (id: string) => {
  useModalState.setState(state => ({ alertList: state.alertList?.filter(alert => alert.id !== id) }));
};

export default useModalState;
