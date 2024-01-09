import React, { useRef } from 'react';
import styles from './styles/Modal.module.css';
import clsx from 'clsx';
import useModalStore from '@/shared/store/modal';
import AlertModal from '@/components/modal/default/AlertModal';
import ConfirmModal from '@/components/modal/default/ConfirmModal';

const Modal = () => {
  const { show, childElem, hideModal, type } = useModalStore();
  // 모달 바깥쪽 Ref 지정
  const overlayRef = useRef(null);

  const handleClickOverlay = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      hideModal();
    }
  };

  let child = childElem;

  switch (type) {
    case 'alert':
      child = <AlertModal />;
      break;
    case 'confirm':
      child = <ConfirmModal />;
  }

  return (
    <>
      {show && (
        <div className={styles['modal-overlay']} onClick={handleClickOverlay} ref={overlayRef}>
          <div className={clsx(styles['modal-container'], styles['modal-position-center'])}>{child}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
