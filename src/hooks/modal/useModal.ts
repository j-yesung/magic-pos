import useModalStore from '@/shared/store/modal';
import { ReactElement } from 'react';
import { ModalAlertTypeOption } from '@/types/common';
import AlertModal from '@/components/modal/default/AlertModal';

export const useModal = () => {
  const { showModal, hideModal, setChildElem, setAlertTypeOption } = useModalStore();

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

    static alert(option: ModalAlertTypeOption) {
      setAlertTypeOption(option);
      showModal();
    }
  }

  return { MagicModal };
};
