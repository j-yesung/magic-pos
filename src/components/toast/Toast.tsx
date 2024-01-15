import React from 'react';
import styles from './styles/Toast.module.css';
import clsx from 'clsx';
import useToastStore from '@/shared/store/toast';

const Toast = () => {
  const { toastList } = useToastStore();
  return (
    <div className={styles.toastOverlay}>
      <div className={styles.toastPositionTopRight}>
        {toastList.map(item => (
          <div key={item.id} className={clsx(styles.toastContainer, item.animation ? styles[item.animation] : '')}>
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toast;
