import React from 'react';
import useModalStore from '@/shared/store/modal';
import styles from './styles/DefaultModal.module.css';
import { ModalConfirmTypeOption } from '@/types/common';

const ConfirmModal = ({ confirmOption }: { confirmOption: ModalConfirmTypeOption }) => {
  const { hideConfirm } = useModalStore();

  const handleClickCancel = () => {
    if (confirmOption.cancelButtonCallback) confirmOption.cancelButtonCallback();
    hideConfirm(confirmOption.id ?? '');
  };

  const handleClickConfirm = () => {
    if (confirmOption.confirmButtonCallback) confirmOption.confirmButtonCallback();
    hideConfirm(confirmOption.id ?? '');
  };

  return (
    <div className={styles.container}>
      <span>{confirmOption.content}</span>
      <div className={styles['confirm-button-container']}>
        <button className={styles.cancel} onClick={handleClickCancel}>
          {confirmOption.cancelButtonText}
        </button>
        <button className={styles.confirm} onClick={handleClickConfirm}>
          {confirmOption.confirmButtonText}
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
