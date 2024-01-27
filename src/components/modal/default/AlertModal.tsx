import React, { useEffect } from 'react';
import styles from './styles/DefaultModal.module.css';
import { ModalAlertTypeOption } from '@/types/common';
import { hideAlert } from '@/shared/store/modal';

const AlertModal = ({ alert }: { alert: ModalAlertTypeOption }) => {
  useEffect(() => {
    if (alert.timeout) {
      setTimeout(() => {
        hideAlert(alert.id ?? '');
      }, alert.timeout);
    }
  });

  return (
    <div className={styles.container}>
      <p>{alert.content}</p>
      {alert.showButton && <button onClick={hideAlert.bind(null, alert.id ?? '')}>{alert.buttonText ?? '확인'}</button>}
    </div>
  );
};

export default AlertModal;
