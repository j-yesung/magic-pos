import React, { useEffect } from 'react';
import useModalStore from '@/shared/store/modal';
import styles from './styles/DefaultModal.module.css';

const AlertModal = () => {
  const { hideModal, alertTypeOption } = useModalStore();

  useEffect(() => {
    if (alertTypeOption.timeout) {
      setTimeout(() => {
        hideModal();
      }, alertTypeOption.timeout);
    }
  });

  return (
    <div className={styles.container}>
      <span>{alertTypeOption.content}</span>
      {alertTypeOption.showButton && <button onClick={hideModal}>{alertTypeOption.buttonText}</button>}
    </div>
  );
};

export default AlertModal;
