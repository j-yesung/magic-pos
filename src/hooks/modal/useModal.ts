import useModalStore from '@/shared/store/modal';
import { ReactElement } from 'react';
import { ModalAlertTypeOption, ModalConfirmTypeOption } from '@/types/common';
import { nanoid } from 'nanoid';

export const useModal = () => {
  const { addChildElem, addAlert, addConfirm } = useModalStore();

  class MagicModal {
    /**
     * 컴포넌트를 모달로 출력합니다. 모달로 띄우고자 하는 컴포넌트를 전달합니다.
     * usage: MagicModal.fire(<SomeComponent />);
     * @param elem 컴포넌트
     */
    static fire(elem: ReactElement) {
      const id = nanoid();
      addChildElem({ id, child: elem, type: 'component', show: true });
    }

    /**
     * 확인 모달을 출력합니다.
     * usage: MagicModal.confirm({ content: '안녕하세요', confirmButtonCallback: () => {alert('yes!!')} });
     * @param option
     */
    static confirm(option: ModalConfirmTypeOption) {
      const id = nanoid();
      addConfirm({ ...option, id });
    }

    /**
     * 일반 알림 모달을 출력합니다.
     * usage: MagicModal.alert({content: '안녕하세요'});
     * usage: MagicModal.alert({content: '안녕하세요', showButton: false, timeout: 2000});
     * @param option
     */
    static alert(option: ModalAlertTypeOption) {
      const id = nanoid();
      addAlert({ ...option, id });
    }
  }

  return { MagicModal };
};
