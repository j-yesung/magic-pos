import React, { useRef } from 'react';
import styles from './styles/Modal.module.css';
import clsx from 'clsx';
import useModalState, { hideAlert, hideModal } from '@/shared/store/modal';
import AlertModal from '@/components/modal/default/AlertModal';
import ConfirmModal from '@/components/modal/default/ConfirmModal';

/**
 * 모달 컴포넌트
 * 레이어 순서는 Alert > Confirm > Component 순 입니다.
 * @constructor
 */
const Modal = () => {
  const { modalList, alertList, confirmList } = useModalState();
  // 모달 바깥쪽 Ref 지정
  const overlayRef = useRef(null);

  const handleClickOverlay = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      if (alertList && alertList?.length > 0) {
        hideAlert(alertList.pop()?.id ?? '');
      } else if (confirmList && confirmList?.length > 0) {
        hideAlert(confirmList.pop()?.id ?? '');
      } else if (modalList && modalList?.length > 0) {
        hideModal(modalList.pop()?.id ?? '');
      }
    }
  };

  return (
    <>
      {((modalList && modalList.length > 0) ||
        (alertList && alertList.length > 0) ||
        (confirmList && confirmList.length > 0)) && (
        <div className={styles['modal-overlay']} onClick={handleClickOverlay} ref={overlayRef}>
          {modalList?.map(modal => (
            <div
              key={modal.id}
              className={clsx(styles.modalContainer, styles.modalPositionCenter, styles.customZIndex, {
                [styles.opacity10]: (alertList && alertList?.length > 0) || (confirmList && confirmList.length > 0),
              })}
            >
              {React.cloneElement(modal.child, { modalId: modal.id })}
            </div>
          ))}
          {confirmList?.map(confirm => (
            <div
              key={confirm.id}
              className={clsx(styles.modalContainer, styles.modalPositionCenter, styles.confirmZIndex, {
                [styles.opacity10]: alertList && alertList.length > 0,
              })}
            >
              <ConfirmModal confirmOption={confirm} />
            </div>
          ))}
          {alertList?.map(alert => (
            <div key={alert.id} className={clsx(styles.modalContainer, styles.modalPositionCenter, styles.alertZIndex)}>
              <AlertModal alert={alert} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Modal;
