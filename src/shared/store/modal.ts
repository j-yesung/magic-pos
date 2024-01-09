import { create } from 'zustand';
import { ReactElement } from 'react';
import { ModalAlertTypeOption } from '@/types/common';

/**
 * 모달의 상태를 관리합니다.
 */

const DEFAULT_ALERT_TYPE_OPTION: ModalAlertTypeOption = { content: '', showButton: true, buttonText: '확인' };

interface ModalState {
  show: boolean;
  type: 'component' | 'alert';
  childElem?: ReactElement | null;
  setChildElem: (elem: ReactElement | null) => void;
  showModal: () => void;
  hideModal: () => void;
  toggleModal: () => void;
  alertTypeOption: ModalAlertTypeOption;
  setAlertTypeOption: (option: ModalAlertTypeOption) => void;
}

const useModalStore = create<ModalState>()(set => ({
  // 모달 기본 옵션
  show: false,
  type: 'component',
  setChildElem: elem => set(() => ({ childElem: elem, type: 'component' })),
  showModal: () => set(() => ({ show: true })),
  hideModal: () => set(() => ({ show: false, childElem: null })),
  toggleModal: () => set(state => ({ show: !state.show })),
  // 모달 알림 창 관련
  alertTypeOption: DEFAULT_ALERT_TYPE_OPTION,
  setAlertTypeOption: (option: ModalAlertTypeOption) =>
    set(() => ({ alertTypeOption: { ...DEFAULT_ALERT_TYPE_OPTION, ...option }, type: 'alert' })),
}));

export default useModalStore;
