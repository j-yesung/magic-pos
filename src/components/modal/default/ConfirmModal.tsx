import { hideConfirm } from '@/shared/store/modal';
import { ModalConfirmTypeOption } from '@/types/common';
import Image from 'next/image';
import styles from './styles/ConfirmModal.module.css';
import CloseButton from '/public/icons/x.svg';
import { useEffect, useRef } from 'react';

const ConfirmModal = ({ confirmOption }: { confirmOption: ModalConfirmTypeOption }) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    cancelButtonRef.current!.focus();
  }, []);

  return (
    <div className={styles.container}>
      <header>
        <button onClick={handleClickCloseButton} ref={cancelButtonRef}>
          <CloseButton width={26} height={26} />
        </button>
      </header>
      <div className={styles.content}>
        {confirmOption.icon ?? <Image src={'/images/image-success.png'} alt={'확인 아이콘'} width={92} height={92} />}
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
