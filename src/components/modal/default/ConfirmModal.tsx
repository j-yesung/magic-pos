import React from 'react';
import useModalStore from '@/shared/store/modal';
import styles from './styles/ConfirmModal.module.css';
import { ModalConfirmTypeOption } from '@/types/common';
import { IoClose } from 'react-icons/io5';
import Image from 'next/image';

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

  const handleClickCloseButton = () => {
    hideConfirm(confirmOption.id ?? '');
  };

  return (
    <div className={styles.container}>
      <header>
        <button onClick={handleClickCloseButton}>
          <IoClose size={24} />
        </button>
      </header>
      <div className={styles.content}>
        <Image src={'/images/image-success.png'} alt={'확인 아이콘'} width={92} height={92} />
        <p>{confirmOption.content}</p>
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.cancel} onClick={handleClickCancel}>
          {confirmOption.cancelButtonText ?? '취소'}
        </button>
        <button className={styles.confirm} onClick={handleClickConfirm}>
          {confirmOption.confirmButtonText ?? '확인'}
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
