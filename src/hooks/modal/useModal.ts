import useModalStore from '@/shared/store/modal';
import { ReactElement } from 'react';
import { ModalAlertTypeOption, ModalConfirmTypeOption } from '@/types/common';

export const useModal = () => {
  const { showModal, hideModal, setChildElem, setAlertTypeOption, setConfirmTypeOption } = useModalStore();

  class MagicModal {
    /**
     * 컴포넌트를 모달로 출력합니다. 모달로 띄우고자 하는 컴포넌트를 전달합니다.
     * usage: MagicModal.fire(<SomeComponent />);
     * @param elem 컴포넌트
     */
    static fire(elem: ReactElement) {
      setChildElem(elem);
      showModal();
    }

    /**
     * 모달을 닫습니다.
     */
    static destroy() {
      hideModal();
    }

    /**
     * 일반 알림 모달을 출력합니다.
     * usage: MagicModal.alert({content: '안녕하세요'});
     * usage: MagicModal.alert({content: '안녕하세요', showButton: false, timeout: 2000});
     * @param option
     */
    static alert(option: ModalAlertTypeOption) {
      setAlertTypeOption(option);
      showModal();
    }

    /**
     * 확인 모달을 출력합니다.
     * usage: MagicModal.confirm({ content: '안녕하세요', confirmButtonCallback: () => {alert('yes!!')} });
     * @param option
     */
    static confirm(option: ModalConfirmTypeOption) {
      setConfirmTypeOption(option);
      showModal();
    }
  }

  return { MagicModal };
};
