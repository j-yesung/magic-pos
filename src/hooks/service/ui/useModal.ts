import { addAlert, addChildElem, addConfirm, hideAlert, hideConfirm, hideModal } from '@/shared/store/modal';
import { ModalAlertTypeOption, ModalConfirmTypeOption } from '@/types/common';
import { nanoid } from 'nanoid';
import { ReactElement } from 'react';
import { animate } from 'framer-motion';

export const useModal = () => {
  class MagicModal {
    /**
     * 컴포넌트를 모달로 출력합니다. 모달로 띄우고자 하는 컴포넌트를 전달합니다.
     * usage: MagicModal.fire(<SomeComponent />);
     *
     * 커스텀 모달에서 닫기 이벤트를 주고싶은 경우, 컴포넌트에서 modalId를 props로 받아온 후, hideModal 호출
     * const SomeModal = ({ modalId }: { modalId?: string }) => {
     *   const { MagicModal } = useModal();
     *
     *   const handler = () => {
     *     MagicModal.hide(modalId ?? '');
     *   };
     *
     * @param elem 컴포넌트
     */
    static fire(elem: ReactElement) {
      const id = nanoid();
      addChildElem({ id, child: elem, type: 'component', show: true });
      return id;
    }

    /**
     * 확인 모달을 출력합니다.
     * usage: MagicModal.confirm({ content: '안녕하세요', confirmButtonCallback: () => {alert('yes!!')} });
     * @param option
     */
    static confirm(option: Omit<ModalConfirmTypeOption, 'id'>) {
      const id = nanoid();
      addConfirm({ ...option, id });
      return id;
    }

    /**
     * 일반 알림 모달을 출력합니다.
     * usage: MagicModal.alert({content: '안녕하세요'});
     * usage: MagicModal.alert({content: '안녕하세요', showButton: false, timeout: 2000});
     * @param option
     */
    static alert(option: Omit<ModalAlertTypeOption, 'id'>) {
      const id = nanoid();
      addAlert({ ...option, id });
      return id;
    }

    static hide(id: string) {
      hideAlert(id);
      hideModal(id);
      hideConfirm(id);
    }
  }

  return { MagicModal };
};
