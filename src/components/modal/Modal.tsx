import React, { useRef } from 'react';
import styles from './styles/Modal.module.css';
import clsx from 'clsx';
import useModalState, { hideAlert, hideConfirm, hideModal } from '@/shared/store/modal';
import AlertModal from '@/components/modal/default/AlertModal';
import ConfirmModal from '@/components/modal/default/ConfirmModal';
import { animate, motion } from 'framer-motion';
import ModalContent from '@/components/modal/ModalContent';

/**
 * 모달 컴포넌트
 * 레이어 순서는 Alert > Confirm > Component 순 입니다.
 * @constructor
 */
const Modal = () => {
  const { modalList, alertList, confirmList } = useModalState();
  // 모달 바깥쪽 Ref 지정
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClickOverlay = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      let id = '';
      if (alertList && alertList?.length > 0) {
        id = alertList.pop()?.id ?? '';
        setTimeout(() => {
          hideAlert(id);
        }, 150);
      } else if (confirmList && confirmList?.length > 0) {
        id = confirmList.pop()?.id ?? '';
        setTimeout(() => {
          hideConfirm(id);
        }, 150);
      } else if (modalList && modalList?.length > 0) {
        id = modalList.pop()?.id ?? '';
        setTimeout(() => {
          hideModal(id);
        }, 150);
      }
      if (id !== '') {
        animate(document.getElementById(id)!, { scale: [1, 0], opacity: [1, 0] }, { duration: 0.15 });
      }
    }
  };

  return (
    <>
      {((modalList && modalList.length > 0) ||
        (alertList && alertList.length > 0) ||
        (confirmList && confirmList.length > 0)) && (
        <motion.div
          className={styles['modal-overlay']}
          onClick={handleClickOverlay}
          ref={overlayRef}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 0.3 }}
        >
          {modalList?.map(modal => (
            <ModalContent
              key={modal.id}
              id={modal.id}
              className={
                (alertList && alertList?.length > 0) || (confirmList && confirmList.length > 0) ? styles.opacity10 : ''
              }
            >
              {React.cloneElement(modal.child, { modalId: modal.id })}
            </ModalContent>
          ))}
          {confirmList?.map(confirm => (
            <ModalContent
              key={confirm.id}
              id={confirm.id}
              className={alertList && alertList.length > 0 ? styles.opacity10 : ''}
            >
              <ConfirmModal confirmOption={confirm} />
            </ModalContent>
          ))}
          {alertList?.map(alert => (
            <ModalContent id={alert.id} key={alert.id}>
              <AlertModal alert={alert} />
            </ModalContent>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default Modal;
