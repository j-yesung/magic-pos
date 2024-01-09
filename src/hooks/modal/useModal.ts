import useModalStore from '@/shared/store/modal';
import { createPortal } from 'react-dom';
import { ReactElement } from 'react';

export const useModal = () => {
  const { showModal, setChildElem } = useModalStore();

  class MagicModal {
    constructor() {}

    static fire(elem: ReactElement) {
      setChildElem(elem);
      showModal();
    }
  }

  return { MagicModal };
};
