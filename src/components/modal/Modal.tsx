import React, { useRef } from 'react';
import styles from './styles/Modal.module.css';
import clsx from 'clsx';
import useModalStore from '@/shared/store/modal';
import AlertModal from '@/components/modal/default/AlertModal';
import ConfirmModal from '@/components/modal/default/ConfirmModal';

/**
 * 모달 컴포넌트
 * 레이어 순서는 Alert > Confirm > Component 순 입니다.
 * @constructor
 */
const Modal = () => {
  const { modalList, alertList, confirmList, hideAlert, hideModal } = useModalStore();
  // 모달 바깥쪽 Ref 지정
  const overlayRef = useRef(null);

  const handleClickOverlay = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      if (alertList && alertList.length > 0) {
        hideAlert(alertList.shift()?.id ?? '');
      } else if (confirmList && confirmList.length > 0) {
        hideAlert(confirmList.shift()?.id ?? '');
      } else if (modalList && modalList?.length > 0) {
        hideModal(modalList.shift()?.id ?? '');
      }
    }
  };

  return (
    <>
      {((modalList && modalList?.length > 0) ||
        (alertList && alertList?.length > 0) ||
        (confirmList && confirmList?.length > 0)) && (
        <div className={styles['modal-overlay']} onClick={handleClickOverlay} ref={overlayRef}>
          {modalList?.map(modal => (
            <div key={modal.id} className={clsx(styles['modal-container'], styles['modal-position-center'])}>
              {modal.child}
            </div>
          ))}
          {confirmList?.map(confirm => (
            <div key={confirm.id} className={clsx(styles['modal-container'], styles['modal-position-center'])}>
              <ConfirmModal confirmOption={confirm} />
            </div>
          ))}
          {alertList?.map(alert => (
            <div key={alert.id} className={clsx(styles['modal-container'], styles['modal-position-center'])}>
              <AlertModal alert={alert} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Modal;
