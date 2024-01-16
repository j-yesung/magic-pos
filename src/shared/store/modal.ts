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
  modalList?: ModalElement[] | null;
  alertList?: ModalAlertTypeOption[] | null;
  confirmList?: ModalConfirmTypeOption[] | null;
  addChildElem: (elem: ModalElement) => void;
  addAlert: (elem: ModalAlertTypeOption) => void;
  addConfirm: (elem: ModalConfirmTypeOption) => void;
  hideModal: (id: string) => void;
  hideConfirm: (id: string) => void;
  hideAlert: (id: string) => void;
}

const useModalStore = create<ModalState>()(set => ({
  // 모달 기본 옵션
  addChildElem: elem => set(state => ({ modalList: [...(state.modalList ?? []), elem] })),
  addAlert: elem => set(state => ({ alertList: [...(state.alertList ?? []), elem] })),
  addConfirm: elem => set(state => ({ confirmList: [...(state.confirmList ?? []), elem] })),
  hideModal: (id: string) => set(state => ({ modalList: state.modalList?.filter(modal => modal.id !== id) })),
  hideConfirm: (id: string) => set(state => ({ confirmList: state.confirmList?.filter(confirm => confirm.id !== id) })),
  hideAlert: (id: string) => set(state => ({ alertList: state.alertList?.filter(alert => alert.id !== id) })),
}));

export default useModalStore;
