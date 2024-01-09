import React, { useRef } from 'react';
import styles from './styles/Modal.module.css';
import clsx from 'clsx';
import useModalStore from '@/shared/store/modal';

const Modal = () => {
  const { show, childElem, hideModal } = useModalStore();
  // 모달 바깥쪽 Ref 지정
  const overlayRef = useRef(null);

  const handleClickOverlay = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      hideModal();
    }
  };

  return (
    <>
      {show && (
        <div className={styles['modal-overlay']} onClick={handleClickOverlay} ref={overlayRef}>
          <div className={clsx(styles['modal-container'], styles['modal-position-center'])}>{childElem}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
