import React from 'react';
import useModalStore from '@/shared/store/modal';
import styles from './styles/DefaultModal.module.css';

const ConfirmModal = () => {
  const { hideModal, confirmTypeOption } = useModalStore();

  const handleClickCancel = () => {
    if (confirmTypeOption.cancelButtonCallback) confirmTypeOption.cancelButtonCallback();
    hideModal();
  };

  const handleClickConfirm = () => {
    if (confirmTypeOption.confirmButtonCallback) confirmTypeOption.confirmButtonCallback();
    hideModal();
  };

  return (
    <div className={styles.container}>
      <span>{confirmTypeOption.content}</span>
      <div className={styles['confirm-button-container']}>
        <button className={styles.cancel} onClick={handleClickCancel}>
          {confirmTypeOption.cancelButtonText}
        </button>
        <button className={styles.confirm} onClick={handleClickConfirm}>
          {confirmTypeOption.confirmButtonText}
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
