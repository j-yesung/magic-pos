import React from 'react';
import styles from '../styles/confirmModal.module.css';
import Alert from '/public/icons/alert-circle.svg';
const Body = () => {
  return (
    <div className={styles.body}>
      <div>
        <Alert width={48} height={48} />
      </div>
      <div>
        <p className={styles.bodyText}>플랫폼을 삭제할까요?</p>
      </div>
    </div>
  );
};

export default React.memo(Body);
